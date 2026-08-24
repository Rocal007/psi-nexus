import type { CompleteNatalChart } from '../lib/astrology/engine';
import { ZODIAC_SIGNS } from '../lib/astrology/constants';
import { CONSTELLATIONS, type ConstellationData } from '../lib/astrology/constellations';
import { generatePersonalGemstones } from '../lib/astrology/gemstones';
import { calculateCurrentMoonCalendar } from '../lib/astrology/moonCalendar';
import { generateProfileWisdom } from '../lib/numerology/profileWisdom';
import { calculateAstrocartography } from '../lib/astrology/astrocartography';
import { calculatePersonalAngelResonance } from '../lib/numerology/angelNumbers';
import { generatePersonalitySummary } from '../lib/astrology/personalitySynthesis';
import { analyzeShadowHealthDialectic } from '../lib/astrology/shadowHealthDialectic';

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

export function updateDomWithChart(chart: CompleteNatalChart) {
  const { synthesis, housesResult, balance, input, numerology } = chart;
  const asc = housesResult.angles.ascendant.longitude;
  const mc = housesResult.angles.midheaven.longitude;

  function lonToSvgAngle(lon: number): number {
    let diff = lon - asc;
    let angle = 180 - diff;
    return ((angle % 360) + 360) % 360;
  }

  const center = 350;
  const rOuter = 320;
  const rZodiacInner = 265;
  const rHouses = 210;
  const rPlanets = 175;
  const rAspects = 135;

  const formattedDate = new Date(`${input.birthDate}T${input.birthTime}`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // 1. Update Title & Hero Badges
  const heroName = document.getElementById('heroName');
  if (heroName) {
    heroName.innerHTML = input.name
      ? `<span><span class="cosmic-gold-gradient">${input.name}s</span> Kosmisches Seelenbuch</span>`
      : '<span>Dein <span class="cosmic-gold-gradient">Kosmisches Seelenbuch</span></span>';
  }

  // Toggle Welcome Onboarding vs Active Profile Hero Sections
  const heroWelcomePrompt = document.getElementById('heroWelcomePrompt');
  if (heroWelcomePrompt) heroWelcomePrompt.classList.add('hidden');

  const heroActiveDetails = document.getElementById('heroActiveProfileDetails');
  if (heroActiveDetails) heroActiveDetails.classList.remove('hidden');

  const heroPills = document.getElementById('heroIdentityPillsBar');
  if (heroPills) heroPills.classList.remove('hidden');

  const heroDetails = document.getElementById('heroDetails');
  if (heroDetails) heroDetails.classList.remove('hidden');

  const matrixPending = document.getElementById('matrixPendingBanner');
  if (matrixPending) matrixPending.classList.add('hidden');

  // Update Individual Personality Summary in Header / Hero
  const pSummary = generatePersonalitySummary(chart);
  const heroArchetypeTitle = document.getElementById('heroArchetypeTitle');
  if (heroArchetypeTitle) heroArchetypeTitle.textContent = pSummary.archetypeName;

  const heroPersonalitySummary = document.getElementById('heroPersonalitySummary');
  if (heroPersonalitySummary) heroPersonalitySummary.textContent = pSummary.shortEssence;

  const heroPersonalityMantra = document.getElementById('heroPersonalityMantra');
  if (heroPersonalityMantra) heroPersonalityMantra.textContent = pSummary.personalityMantra;

  // Header Active Person Badge
  const headerPersonBadge = document.getElementById('headerActivePersonBadge');
  if (headerPersonBadge) headerPersonBadge.classList.remove('hidden');

  const headerPersonName = document.getElementById('headerPersonName');
  if (headerPersonName) headerPersonName.textContent = input.name || 'Edle Seele';

  const headerPersonSigns = document.getElementById('headerPersonSigns');
  if (headerPersonSigns) {
    headerPersonSigns.textContent = `☉ ${synthesis.sun.planet.sign.name} • ☽ ${synthesis.moon.planet.sign.name} • ↑ ${synthesis.ascendant.sign.name}`;
  }

  if (heroDetails) {
    heroDetails.innerHTML = `
      <span>📍 ${input.cityName}</span>
      <span>•</span>
      <span>🗓️ ${formattedDate}, ${input.birthTime} Uhr</span>
      <span>•</span>
      <span>🌐 UTC: ${chart.utcDate.toUTCString().slice(17, 22)} Uhr</span>
      <span>•</span>
      <span class="text-amber-400/90 font-medium">Häuser: ${input.houseSystem === 'equal' ? 'Equal' : 'Placidus'}</span>
    `;
  }

  const sunPill = document.getElementById('pillSun') || document.getElementById('heroSunPill');
  if (sunPill) {
    sunPill.innerHTML = `<span class="text-amber-400 text-sm">☉ Sonne:</span> <span class="text-white font-black">${synthesis.sun.planet.sign.name}</span> <span class="text-amber-300 font-mono text-[11px]">(${synthesis.sun.planet.degreeString})</span> <span class="text-amber-400 text-base">${synthesis.sun.planet.sign.symbol}</span>`;
  }

  const moonPill = document.getElementById('pillMoon') || document.getElementById('heroMoonPill');
  if (moonPill) {
    moonPill.innerHTML = `<span class="text-slate-300 text-sm">☽ Mond:</span> <span class="text-white font-black">${synthesis.moon.planet.sign.name}</span> <span class="text-slate-300 font-mono text-[11px]">(${synthesis.moon.planet.degreeString})</span> <span class="text-slate-300 text-base">${synthesis.moon.planet.sign.symbol}</span>`;
  }

  const ascPill = document.getElementById('pillAsc') || document.getElementById('heroAscPill');
  if (ascPill) {
    ascPill.innerHTML = `<span class="text-cyan-400 text-sm">↑ AC:</span> <span class="text-white font-black">${synthesis.ascendant.sign.name}</span> <span class="text-cyan-300 font-mono text-[11px]">(${synthesis.ascendant.degreeString})</span> <span class="text-cyan-400 text-base">${housesResult.angles.ascendant.sign.symbol}</span>`;
  }

  const mcPill = document.getElementById('pillMc') || document.getElementById('heroMcPill');
  if (mcPill) {
    mcPill.innerHTML = `<span class="text-purple-400 text-sm">❖ MC:</span> <span class="text-white font-black">${synthesis.midheaven.sign.name}</span> <span class="text-purple-300 font-mono text-[11px]">(${synthesis.midheaven.degreeString})</span> <span class="text-purple-400 text-base">${housesResult.angles.midheaven.sign.symbol}</span>`;
  }

  const lifePathPill = document.getElementById('pillLifePath');
  if (lifePathPill) {
    lifePathPill.innerHTML = `<span class="text-yellow-400 text-sm">🔢 Lebenszahl:</span> <span class="text-white font-black">${numerology.lifePath.number}</span> <span class="text-yellow-300 text-[11px]">(${numerology.lifePath.archetype})</span>`;
  }

  // 2. Update Person Soul Sidebar (Left Sticky Column)
  const sidebarPersonName = document.getElementById('sidebarPersonName');
  if (sidebarPersonName) sidebarPersonName.textContent = input.name || 'Edle Seele';
  const sidebarInitials = document.getElementById('sidebarInitials');
  if (sidebarInitials) sidebarInitials.textContent = input.name ? input.name.charAt(0).toUpperCase() : '✦';
  const sidebarCity = document.getElementById('sidebarCity');
  if (sidebarCity) sidebarCity.textContent = `📍 ${input.cityName}`;
  const sidebarDate = document.getElementById('sidebarDate');
  if (sidebarDate) sidebarDate.textContent = input.birthDate;

  const sidebarSun = document.getElementById('sidebarSun');
  if (sidebarSun) sidebarSun.textContent = synthesis.sun.planet.sign.name;
  const sidebarMoon = document.getElementById('sidebarMoon');
  if (sidebarMoon) sidebarMoon.textContent = synthesis.moon.planet.sign.name;
  const sidebarAsc = document.getElementById('sidebarAsc');
  if (sidebarAsc) sidebarAsc.textContent = synthesis.ascendant.sign.name;
  const sidebarMc = document.getElementById('sidebarMc');
  if (sidebarMc) sidebarMc.textContent = synthesis.midheaven.sign.name;

  const sidebarLifePath = document.getElementById('sidebarLifePath');
  if (sidebarLifePath) sidebarLifePath.textContent = `Zahl ${numerology.lifePath.number} (${numerology.lifePath.archetype})`;
  
  const personalStones = generatePersonalGemstones(chart);
  const sidebarGemstone = document.getElementById('sidebarGemstone');
  if (sidebarGemstone) sidebarGemstone.textContent = personalStones.sunStone.name.split('&')[0];
  
  const personalAngel = calculatePersonalAngelResonance(numerology.lifePath.number, synthesis.sun.planet.sign.name);
  const sidebarAngel = document.getElementById('sidebarAngel');
  if (sidebarAngel) sidebarAngel.textContent = personalAngel.primaryAngelNumber.number.split(' ')[0];

  const sidebarDomElement = document.getElementById('sidebarDomElement');
  if (sidebarDomElement) sidebarDomElement.textContent = `Dominant: ${balance.dominantElement}`;

  const sbBarFire = document.getElementById('sidebarBar_fire');
  if (sbBarFire) sbBarFire.style.width = `${Math.max(5, balance.elements.fire.percentage)}%`;
  const sbBarEarth = document.getElementById('sidebarBar_earth');
  if (sbBarEarth) sbBarEarth.style.width = `${Math.max(5, balance.elements.earth.percentage)}%`;
  const sbBarAir = document.getElementById('sidebarBar_air');
  if (sbBarAir) sbBarAir.style.width = `${Math.max(5, balance.elements.air.percentage)}%`;
  const sbBarWater = document.getElementById('sidebarBar_water');
  if (sbBarWater) sbBarWater.style.width = `${Math.max(5, balance.elements.water.percentage)}%`;

  // 3. Update Active Profile Summary Card
  const summaryPersonName = document.getElementById('summaryPersonName');
  if (summaryPersonName) summaryPersonName.textContent = input.name || 'Edle Seele';
  const summaryInitials = document.getElementById('summaryInitials');
  if (summaryInitials) summaryInitials.textContent = input.name ? input.name.charAt(0).toUpperCase() : '✦';
  const summaryDetails = document.getElementById('summaryDetails');
  if (summaryDetails) {
    summaryDetails.innerHTML = `<span>🗓️ ${input.birthDate}, ${input.birthTime} Uhr</span><span>•</span><span>📍 ${input.cityName}</span><span>•</span><span class="text-amber-300 font-mono">(${input.houseSystem || 'placidus'})</span>`;
  }

  // 4. Update Radix SVG
  const svg = document.getElementById('radixSvg');
  if (svg) {
    const slicesHtml = ZODIAC_SIGNS.map(sign => {
      const startAngle = lonToSvgAngle(sign.startDegree + 30);
      const endAngle = lonToSvgAngle(sign.startDegree);
      const midAngle = lonToSvgAngle(sign.startDegree + 15);
      const glyphPos = polarToCartesian(center, center, (rOuter + rZodiacInner) / 2, midAngle);
      const pathD = `${describeArc(center, center, rOuter, startAngle, endAngle)} L ${polarToCartesian(center, center, rZodiacInner, startAngle).x} ${polarToCartesian(center, center, rZodiacInner, startAngle).y} ${describeArc(center, center, rZodiacInner, endAngle, startAngle)} Z`;
      return `
        <g class="zodiac-slice transition-opacity hover:opacity-100 opacity-90 cursor-pointer">
          <path d="${pathD}" fill="${sign.bgColor}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
          <text x="${glyphPos.x}" y="${glyphPos.y + 7}" font-size="22" font-weight="bold" fill="${sign.color}" text-anchor="middle" filter="url(#cosmicGlow)">
            ${sign.symbol}
          </text>
        </g>
      `;
    }).join('');

    const aspectsHtml = chart.aspects.map(asp => {
      const a1 = lonToSvgAngle(asp.planet1.longitude);
      const a2 = lonToSvgAngle(asp.planet2.longitude);
      const p1 = polarToCartesian(center, center, rAspects, a1);
      const p2 = polarToCartesian(center, center, rAspects, a2);
      const strokeW = Math.max(0.8, 2.5 - asp.orb * 0.25);
      const strokeOp = Math.max(0.35, 0.9 - asp.orb * 0.08);
      return `
        <line
          x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"
          stroke="${asp.definition.color}" stroke-width="${strokeW}" stroke-opacity="${strokeOp}"
          class="aspect-line transition-all duration-300 hover:stroke-amber-300 hover:stroke-width-2 cursor-pointer"
          data-p1="${asp.planet1.id}" data-p2="${asp.planet2.id}"
          data-tooltip="${asp.planet1.name} ${asp.definition.name} ${asp.planet2.name} (Orb: ${asp.orb.toFixed(1)}°)"
        />
      `;
    }).join('');

    const housesHtml = housesResult.cusps.map((cuspLon, idx) => {
      const angle = lonToSvgAngle(cuspLon);
      const p1 = polarToCartesian(center, center, rHouses, angle);
      const p2 = polarToCartesian(center, center, rZodiacInner, angle);
      const isAngle = idx === 0 || idx === 9 || idx === 6 || idx === 3;
      const labelPos = polarToCartesian(center, center, (rHouses + rAspects) / 2, lonToSvgAngle(cuspLon + 15));
      return `
        <g>
          <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"
            stroke="${isAngle ? '#eab308' : 'rgba(255, 255, 255, 0.2)'}"
            stroke-width="${isAngle ? '2.2' : '0.8'}"
            stroke-dasharray="${isAngle ? 'none' : '3 3'}"
          />
          <text x="${labelPos.x}" y="${labelPos.y + 4}" font-size="11" font-weight="bold"
            fill="${isAngle ? '#fbbf24' : 'rgba(148, 163, 184, 0.7)'}" text-anchor="middle">
            ${idx + 1}
          </text>
        </g>
      `;
    }).join('');

    const mcAngle = lonToSvgAngle(mc);
    const mcP1 = polarToCartesian(center, center, rHouses, mcAngle);
    const mcP2 = polarToCartesian(center, center, rOuter + 8, mcAngle);
    const mcText = polarToCartesian(center, center, rOuter + 24, mcAngle);
    const mcHtml = `
      <g>
        <line x1="${mcP1.x}" y1="${mcP1.y}" x2="${mcP2.x}" y2="${mcP2.y}" stroke="#f59e0b" stroke-width="2.5" />
        <text x="${mcText.x}" y="${mcText.y + 5}" font-size="13" font-weight="900" fill="#f59e0b" text-anchor="middle">MC</text>
      </g>
    `;

    const acHtml = `
      <g>
        <line x1="${center - rZodiacInner - 12}" y1="${center}" x2="${center - rHouses}" y2="${center}" stroke="#f59e0b" stroke-width="3" />
        <polygon points="${center - rOuter - 10},${center} ${center - rOuter + 2},${center - 6} ${center - rOuter + 2},${center + 6}" fill="#f59e0b" />
        <text x="${center - rOuter - 18}" y="${center + 5}" font-size="14" font-weight="900" fill="#f59e0b" text-anchor="end">AC</text>
      </g>
    `;

    const sortedPlanets = [...chart.planets].sort((a, b) => a.longitude - b.longitude);
    const planetsHtml = sortedPlanets.map(p => {
      const baseAngle = lonToSvgAngle(p.longitude);
      const pPos = polarToCartesian(center, center, rPlanets, baseAngle);
      const markerPos = polarToCartesian(center, center, rHouses, baseAngle);
      return `
        <g class="planet-marker group cursor-pointer transition-transform duration-200"
           data-id="${p.id}"
           data-tooltip="${p.symbol} ${p.name} in ${p.sign.name} (${p.degreeString}) – ${p.house}. Haus">
          <line x1="${markerPos.x}" y1="${markerPos.y}" x2="${pPos.x}" y2="${pPos.y}" stroke="${p.color}" stroke-width="1" stroke-opacity="0.5" />
          <circle cx="${pPos.x}" cy="${pPos.y}" r="15" fill="#0b0e1e" stroke="${p.color}" stroke-width="1.5" />
          <text x="${pPos.x}" y="${pPos.y + 6}" font-size="16" font-weight="bold" fill="${p.color}" text-anchor="middle" filter="url(#cosmicGlow)">
            ${p.symbol}
          </text>
          ${p.isRetrograde ? `<text x="${pPos.x + 11}" y="${pPos.y - 7}" font-size="9" font-weight="bold" fill="#ef4444">℞</text>` : ''}
        </g>
      `;
    }).join('');

    svg.innerHTML = `
      <defs>
        <radialGradient id="cosmosCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.6" />
          <stop offset="70%" stop-color="#0f172a" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#070913" stop-opacity="0.95" />
        </radialGradient>
        <filter id="cosmicGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="${center}" cy="${center}" r="${rOuter + 8}" fill="#0b0e1e" stroke="rgba(234, 179, 8, 0.3)" stroke-width="1.5" />
      <circle cx="${center}" cy="${center}" r="${rOuter}" fill="url(#cosmosCenterGrad)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      ${slicesHtml}
      <circle cx="${center}" cy="${center}" r="${rZodiacInner}" fill="none" stroke="rgba(234, 179, 8, 0.4)" stroke-width="1.5" />
      <circle cx="${center}" cy="${center}" r="${rHouses}" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" stroke-dasharray="2 4" />
      <circle cx="${center}" cy="${center}" r="${rAspects}" fill="#060914" stroke="rgba(99, 102, 241, 0.3)" stroke-width="1" />
      <g id="aspectLinesGroup" class="aspect-lines">${aspectsHtml}</g>
      ${housesHtml}
      ${acHtml}
      ${mcHtml}
      ${planetsHtml}
      <circle cx="${center}" cy="${center}" r="6" fill="#f59e0b" filter="url(#cosmicGlow)" />
      <circle cx="${center}" cy="${center}" r="14" fill="none" stroke="rgba(234, 179, 8, 0.4)" stroke-width="1" />
    `;
    setupSvgInteractions();
  }

  // 5. Update 4 Cardinal Angles Cards
  const acCard = document.getElementById('cardAC');
  if (acCard) acCard.innerHTML = `<div class="font-bold text-cyan-300"><span>AC</span> Aszendent (1. Haus)</div><div class="text-white font-medium">${housesResult.angles.ascendant.sign.name} (${housesResult.angles.ascendant.degreeString})</div><div class="text-slate-400 text-[11px]">Auftreten & Seelentor</div>`;

  const mcCard = document.getElementById('cardMC');
  if (mcCard) mcCard.innerHTML = `<div class="font-bold text-amber-300"><span>MC</span> Medium Coeli (10. Haus)</div><div class="text-white font-medium">${housesResult.angles.midheaven.sign.name} (${housesResult.angles.midheaven.degreeString})</div><div class="text-slate-400 text-[11px]">Berufung & Lebensziel</div>`;

  const dcCard = document.getElementById('cardDC');
  if (dcCard) dcCard.innerHTML = `<div class="font-bold text-rose-300"><span>DC</span> Deszendent (7. Haus)</div><div class="text-white font-medium">${housesResult.angles.descendant.sign.name} (${housesResult.angles.descendant.degreeString})</div><div class="text-slate-400 text-[11px]">Begegnung & Partnerschaft</div>`;

  const icCard = document.getElementById('cardIC');
  if (icCard) icCard.innerHTML = `<div class="font-bold text-indigo-300"><span>IC</span> Imum Coeli (4. Haus)</div><div class="text-white font-medium">${housesResult.angles.imumCoeli.sign.name} (${housesResult.angles.imumCoeli.degreeString})</div><div class="text-slate-400 text-[11px]">Wurzeln & Seelenheimat</div>`;

  // 6. Update Element & Modality Balance
  const elDomBadge = document.getElementById('elDomBadge');
  if (elDomBadge) elDomBadge.textContent = `Dominant: ${balance.dominantElement}`;
  const modDomBadge = document.getElementById('modDomBadge');
  if (modDomBadge) modDomBadge.textContent = `Modus: ${balance.dominantModality}`;

  const elBars = ['fire', 'earth', 'air', 'water'] as const;
  elBars.forEach(el => {
    const valEl = document.getElementById(`elVal_${el}`);
    const barEl = document.getElementById(`elBar_${el}`);
    if (valEl) valEl.textContent = `${balance.elements[el].percentage}% (${balance.elements[el].count} Körper)`;
    if (barEl) (barEl as HTMLElement).style.width = `${Math.max(5, balance.elements[el].percentage)}%`;
  });

  const modCard = document.getElementById('modVal_cardinal');
  if (modCard) modCard.innerHTML = `<div class="text-xs text-slate-400 mb-1">Kardinal (Beginn)</div><div class="text-lg font-bold text-amber-300">${balance.modalities.cardinal.percentage}%</div><div class="text-[10px] text-slate-500">${balance.modalities.cardinal.count} Planeten</div>`;
  const modFix = document.getElementById('modVal_fixed');
  if (modFix) modFix.innerHTML = `<div class="text-xs text-slate-400 mb-1">Fix (Bewahrung)</div><div class="text-lg font-bold text-emerald-300">${balance.modalities.fixed.percentage}%</div><div class="text-[10px] text-slate-500">${balance.modalities.fixed.count} Planeten</div>`;
  const modMut = document.getElementById('modVal_mutable');
  if (modMut) modMut.innerHTML = `<div class="text-xs text-slate-400 mb-1">Veränderlich (Wandlung)</div><div class="text-lg font-bold text-cyan-300">${balance.modalities.mutable.percentage}%</div><div class="text-[10px] text-slate-500">${balance.modalities.mutable.count} Planeten</div>`;

  // 7. Update Planets Table
  const planetsTableBody = document.getElementById('planetsTableBody');
  if (planetsTableBody) {
    planetsTableBody.innerHTML = chart.planets.map(p => `
      <tr class="hover:bg-white/[0.04] transition-colors group">
        <td class="py-3 px-3">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-base bg-white/5 border border-white/10" style="color: ${p.color}">
              ${p.symbol}
            </span>
            <span class="font-semibold text-slate-200">${p.name}</span>
          </div>
        </td>
        <td class="py-3 px-3">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-base" style="color: ${p.sign.color}">${p.sign.symbol}</span>
            <span class="text-slate-300 font-medium">${p.sign.name}</span>
          </div>
        </td>
        <td class="py-3 px-3 font-mono text-xs text-slate-300">${p.degreeString}</td>
        <td class="py-3 px-3">
          <span class="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            ${p.house}. Haus
          </span>
        </td>
        <td class="py-3 px-3">
          <span class="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border ${p.dignity.badgeColor}">
            ${p.dignity.label}
          </span>
        </td>
        <td class="py-3 px-3">
          ${p.isRetrograde ? `
            <span class="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded">
              <span>℞</span> Rückläufig
            </span>
          ` : `<span class="text-xs text-slate-500">Direkt</span>`}
        </td>
      </tr>
    `).join('');
  }

  // 8. Update Aspect Matrix
  const aspectCountBadge = document.getElementById('aspectCountBadge');
  if (aspectCountBadge) aspectCountBadge.textContent = `${chart.aspects.length} Aspekte aktiv`;

  const aspectListContainer = document.getElementById('aspectListContainer');
  if (aspectListContainer) {
    aspectListContainer.innerHTML = chart.aspects.map(item => `
      <div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all">
        <div class="flex items-center gap-2.5">
          <div class="flex items-center gap-1 font-bold text-sm" style="color: ${item.planet1.color}">
            <span class="text-base">${item.planet1.symbol}</span>
            <span>${item.planet1.name}</span>
          </div>
          <div class="px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1"
               style="color: ${item.definition.color}; border-color: ${item.definition.color}40; background-color: ${item.definition.color}15">
            <span>${item.definition.symbol}</span>
            <span>${item.definition.name}</span>
          </div>
          <div class="flex items-center gap-1 font-bold text-sm" style="color: ${item.planet2.color}">
            <span class="text-base">${item.planet2.symbol}</span>
            <span>${item.planet2.name}</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono text-slate-300 bg-black/40 px-2 py-0.5 rounded">
            Orb: ${item.orb.toFixed(1)}°
          </span>
        </div>
      </div>
    `).join('');
  }

  // 9. Update Esoteric Dossier (Sun, Moon, AC, Nodes, Chiron, Lilith)
  const dSunTitle = document.getElementById('dossierSunTitle');
  if (dSunTitle) dSunTitle.innerHTML = `<span>Sonne in ${synthesis.sun.planet.sign.name}</span> <span class="text-amber-400">${synthesis.sun.planet.sign.symbol}</span>`;
  const dSunMotto = document.getElementById('dossierSunMotto');
  if (dSunMotto) dSunMotto.textContent = synthesis.sun.planet.esotericSign.soulMotto;
  const dSunInsight = document.getElementById('dossierSunInsight');
  if (dSunInsight) dSunInsight.textContent = synthesis.sun.insight;
  const dSunPurpose = document.getElementById('dossierSunPurpose');
  if (dSunPurpose) dSunPurpose.textContent = synthesis.sun.planet.esotericSign.soulPurpose;
  const dSunDeg = document.getElementById('dossierSunDeg');
  if (dSunDeg) dSunDeg.textContent = synthesis.sun.planet.degreeString;

  const dMoonTitle = document.getElementById('dossierMoonTitle');
  if (dMoonTitle) dMoonTitle.innerHTML = `<span>Mond in ${synthesis.moon.planet.sign.name}</span> <span class="text-slate-300">${synthesis.moon.planet.sign.symbol}</span>`;
  const dMoonMotto = document.getElementById('dossierMoonMotto');
  if (dMoonMotto) dMoonMotto.textContent = synthesis.moon.planet.esotericSign.soulMotto;
  const dMoonInsight = document.getElementById('dossierMoonInsight');
  if (dMoonInsight) dMoonInsight.textContent = synthesis.moon.insight;
  const dMoonKey = document.getElementById('dossierMoonKey');
  if (dMoonKey) dMoonKey.textContent = synthesis.moon.planet.esotericSign.healingKey;
  const dMoonDeg = document.getElementById('dossierMoonDeg');
  if (dMoonDeg) dMoonDeg.textContent = synthesis.moon.planet.degreeString;

  const dAscTitle = document.getElementById('dossierAscTitle');
  if (dAscTitle) dAscTitle.innerHTML = `<span>Aszendent ${synthesis.ascendant.sign.name}</span> <span class="text-cyan-400">${housesResult.angles.ascendant.sign.symbol}</span>`;
  const dAscRay = document.getElementById('dossierAscRay');
  if (dAscRay) dAscRay.textContent = synthesis.ascendant.sign.esotericRay;
  const dAscInsight = document.getElementById('dossierAscInsight');
  if (dAscInsight) dAscInsight.textContent = synthesis.ascendant.insight;
  const dAscRuler = document.getElementById('dossierAscRuler');
  if (dAscRuler) dAscRuler.textContent = synthesis.ascendant.sign.esotericRulerDescription;
  const dAscDeg = document.getElementById('dossierAscDeg');
  if (dAscDeg) dAscDeg.textContent = synthesis.ascendant.degreeString;

  const dNodeTitle = document.getElementById('dossierNodeTitle');
  if (dNodeTitle) dNodeTitle.textContent = synthesis.northNode.deutung.title;
  const dNodeOrigin = document.getElementById('dossierNodeOrigin');
  if (dNodeOrigin) dNodeOrigin.textContent = synthesis.northNode.deutung.karmicOrigin;
  const dNodeLeap = document.getElementById('dossierNodeLeap');
  if (dNodeLeap) dNodeLeap.textContent = synthesis.northNode.deutung.evolutionaryLeap;
  const dNodeTask = document.getElementById('dossierNodeTask');
  if (dNodeTask) dNodeTask.textContent = synthesis.northNode.deutung.integrationTask;

  const dChironTitle = document.getElementById('dossierChironTitle');
  if (dChironTitle) dChironTitle.textContent = `Chiron in ${synthesis.chiron.planet.sign.name} (${synthesis.chiron.planet.house}. Haus)`;
  const dChironWound = document.getElementById('dossierChironWound');
  if (dChironWound) dChironWound.textContent = synthesis.chiron.deutung.wound;
  const dChironMed = document.getElementById('dossierChironMed');
  if (dChironMed) dChironMed.textContent = synthesis.chiron.deutung.medicine;

  const dLilithTitle = document.getElementById('dossierLilithTitle');
  if (dLilithTitle) dLilithTitle.textContent = `Lilith in ${synthesis.lilith.planet.sign.name} (${synthesis.lilith.planet.house}. Haus)`;
  const dLilithShadow = document.getElementById('dossierLilithShadow');
  if (dLilithShadow) dLilithShadow.textContent = synthesis.lilith.deutung.shadow;
  const dLilithPower = document.getElementById('dossierLilithPower');
  if (dLilithPower) dLilithPower.textContent = synthesis.lilith.deutung.power;

  // 10. Update 3 Life Pillars (Beziehung, Beruf, Persönliche Erfüllung)
  const { lifePillars } = chart;
  const stelliumsContainer = document.getElementById('stelliumsContainer');
  if (stelliumsContainer) {
    if (lifePillars.specialConfigurations.stelliums.length > 0) {
      stelliumsContainer.innerHTML = lifePillars.specialConfigurations.stelliums.map(st => `
        <div class="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                Stellium in ${st.targetName}
              </span>
              <span class="text-xs text-slate-300 font-medium">
                (${st.planets.length} Gestirne vereint)
              </span>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono text-amber-200">
              ${st.planets.map(p => `
                <span class="px-2 py-0.5 rounded bg-white/5 border border-white/10" style="color: ${p.color}">
                  ${p.symbol} ${p.name}
                </span>
              `).join('')}
            </div>
          </div>
          <p class="text-sm text-slate-200 leading-relaxed italic">"${st.esotericMeaning}"</p>
        </div>
      `).join('');
    } else {
      stelliumsContainer.innerHTML = '';
    }
  }

  const relHeadline = document.getElementById('relHeadline');
  if (relHeadline) relHeadline.textContent = lifePillars.relationships.headline;
  const relCoreTheme = document.getElementById('relCoreTheme');
  if (relCoreTheme) relCoreTheme.textContent = lifePillars.relationships.coreTheme;
  const relStrengths = document.getElementById('relStrengths');
  if (relStrengths) {
    relStrengths.innerHTML = lifePillars.relationships.strengths.map(s => `<li class="leading-relaxed">${s}</li>`).join('');
  }
  const relTrigger = document.getElementById('relTrigger');
  if (relTrigger) relTrigger.textContent = lifePillars.relationships.soulPartnerTrigger;

  const carHeadline = document.getElementById('carHeadline');
  if (carHeadline) carHeadline.textContent = lifePillars.career.headline;
  const carVocation = document.getElementById('carVocation');
  if (carVocation) carVocation.textContent = lifePillars.career.vocationType;
  const carStrengths = document.getElementById('carStrengths');
  if (carStrengths) {
    carStrengths.innerHTML = lifePillars.career.coreStrengths.map(s => `<li class="leading-relaxed">${s}</li>`).join('');
  }
  const carStrategy = document.getElementById('carStrategy');
  if (carStrategy) carStrategy.textContent = lifePillars.career.growthStrategy;

  const fulHeadline = document.getElementById('fulHeadline');
  if (fulHeadline) fulHeadline.textContent = lifePillars.personalFulfillment.headline;
  const fulSoulDrive = document.getElementById('fulSoulDrive');
  if (fulSoulDrive) fulSoulDrive.textContent = lifePillars.personalFulfillment.soulDrive;
  const fulPeaceKey = document.getElementById('fulPeaceKey');
  if (fulPeaceKey) fulPeaceKey.textContent = lifePillars.personalFulfillment.innerPeaceKey;
  const fulDailyStep = document.getElementById('fulDailyStep');
  if (fulDailyStep) fulDailyStep.textContent = lifePillars.personalFulfillment.dailyActionStep;

  // 11. Update Numerology & Full Name Analysis (Tor IV)
  const numLifePathNumber = document.getElementById('numLifePathNumber');
  if (numLifePathNumber) numLifePathNumber.textContent = numerology.lifePath.number.toString();
  const numLifePathArchetype = document.getElementById('numLifePathArchetype');
  if (numLifePathArchetype) numLifePathArchetype.textContent = numerology.lifePath.archetype;
  const numLifePathPlanet = document.getElementById('numLifePathPlanet');
  if (numLifePathPlanet) numLifePathPlanet.textContent = `Herrscher: ${numerology.lifePath.rulingPlanet}`;
  const numLifePathResonance = document.getElementById('numLifePathResonance');
  if (numLifePathResonance) numLifePathResonance.textContent = `Resonanz: ${numerology.lifePath.zodiacResonance}`;
  const numLifePathName = document.getElementById('numLifePathName');
  if (numLifePathName) numLifePathName.textContent = numerology.lifePath.name;
  const numLifePathMeaning = document.getElementById('numLifePathMeaning');
  if (numLifePathMeaning) numLifePathMeaning.textContent = numerology.lifePath.meaning;
  const numLifePathMission = document.getElementById('numLifePathMission');
  if (numLifePathMission) numLifePathMission.textContent = numerology.lifePath.soulMission;
  const numLifePathGift = document.getElementById('numLifePathGift');
  if (numLifePathGift) numLifePathGift.textContent = numerology.lifePath.dailyGift;

  const numExprNum = document.getElementById('numExprNum');
  if (numExprNum) numExprNum.textContent = numerology.nameNumbers.expression.number.toString();
  const numExprArchetype = document.getElementById('numExprArchetype');
  if (numExprArchetype) numExprArchetype.textContent = numerology.nameNumbers.expression.archetype;
  const numExprMeaning = document.getElementById('numExprMeaning');
  if (numExprMeaning) numExprMeaning.textContent = numerology.nameNumbers.expression.meaning;

  const numSoulNum = document.getElementById('numSoulNum');
  if (numSoulNum) numSoulNum.textContent = numerology.nameNumbers.soulUrge.number.toString();
  const numSoulArchetype = document.getElementById('numSoulArchetype');
  if (numSoulArchetype) numSoulArchetype.textContent = numerology.nameNumbers.soulUrge.archetype;
  const numSoulMeaning = document.getElementById('numSoulMeaning');
  if (numSoulMeaning) numSoulMeaning.textContent = numerology.nameNumbers.soulUrge.meaning;

  const numPersNum = document.getElementById('numPersNum');
  if (numPersNum) numPersNum.textContent = numerology.nameNumbers.personality.number.toString();
  const numPersArchetype = document.getElementById('numPersArchetype');
  if (numPersArchetype) numPersArchetype.textContent = numerology.nameNumbers.personality.archetype;
  const numPersMeaning = document.getElementById('numPersMeaning');
  if (numPersMeaning) numPersMeaning.textContent = numerology.nameNumbers.personality.meaning;

  const numMatNum = document.getElementById('numMatNum');
  if (numMatNum) numMatNum.textContent = numerology.nameNumbers.maturity.number.toString();
  const numMatArchetype = document.getElementById('numMatArchetype');
  if (numMatArchetype) numMatArchetype.textContent = numerology.nameNumbers.maturity.archetype;
  const numMatMeaning = document.getElementById('numMatMeaning');
  if (numMatMeaning) numMatMeaning.textContent = numerology.nameNumbers.maturity.meaning;

  const numFullNameSpan = document.getElementById('numFullNameSpan');
  if (numFullNameSpan) numFullNameSpan.textContent = input.name || 'Edle Seele';

  const numLetterTilesWrapper = document.getElementById('numLetterTilesWrapper');
  if (numLetterTilesWrapper) {
    if (numerology.nameNumbers.letters.length > 0) {
      numLetterTilesWrapper.innerHTML = `
        <div class="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Buchstaben-Schwingungs-Muster (${numerology.nameNumbers.letters.length} Buchstaben)</span>
          <span class="text-amber-300">Pythagoräisches System (1–9)</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${numerology.nameNumbers.letters.map(lv => `
            <div class="p-2.5 rounded-2xl border text-center transition-all hover:scale-110 flex flex-col items-center justify-center min-w-[44px] ${
              lv.isVowel
                ? 'bg-pink-500/15 border-pink-500/40 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.15)]'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
            }" title="${lv.char} = Zahl ${lv.value} (${lv.typeLabel})">
              <span class="text-base font-black leading-none">${lv.char}</span>
              <span class="text-[10px] font-mono font-bold mt-1 text-amber-300">${lv.value}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      numLetterTilesWrapper.innerHTML = '';
    }
  }

  const numDominantGiftsList = document.getElementById('numDominantGiftsList');
  if (numDominantGiftsList) {
    if (numerology.nameNumbers.dominantGifts.length > 0) {
      numDominantGiftsList.innerHTML = numerology.nameNumbers.dominantGifts.map(g => `
        <div class="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-xs">
              ${g.digit}
            </span>
            <span class="text-slate-200">${g.meaning}</span>
          </div>
          <span class="text-[10px] font-mono text-emerald-300/80 shrink-0">({g.count}x im Namen)</span>
        </div>
      `).join('');
    } else {
      numDominantGiftsList.innerHTML = '<p class="text-xs text-slate-400">Ausgeglichene Frequenzverteilung über alle Schwingungen.</p>';
    }
  }

  const numKarmicLessonsList = document.getElementById('numKarmicLessonsList');
  if (numKarmicLessonsList) {
    if (numerology.nameNumbers.karmicLessons.length > 0) {
      numKarmicLessonsList.innerHTML = numerology.nameNumbers.karmicLessons.map(les => `
        <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-0.5">
          <div class="flex items-center justify-between font-bold text-amber-300">
            <span class="flex items-center gap-1.5">
              <span class="w-5 h-5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] flex items-center justify-center">
                ${les.digit}
              </span>
              ${les.name}
            </span>
          </div>
          <p class="text-slate-300 text-[11px] leading-snug">${les.advice}</p>
        </div>
      `).join('');
    } else {
      numKarmicLessonsList.innerHTML = '<p class="text-xs text-emerald-400 font-semibold">✦ Vollständiges Schwingungsspektrum: Keine fehlenden Zahlen im Namen!</p>';
    }
  }

  const numSynergyTitle = document.getElementById('numSynergyTitle');
  if (numSynergyTitle) numSynergyTitle.textContent = `Seelen-Harmonie: Name (${numerology.nameNumbers.expression.number}) ↔ Lebensweg (${numerology.lifePath.number})`;
  const numSynergyRelation = document.getElementById('numSynergyRelation');
  if (numSynergyRelation) numSynergyRelation.textContent = numerology.nameNumbers.nameSynergy.relationType;
  const numSynergyScore = document.getElementById('numSynergyScore');
  if (numSynergyScore) numSynergyScore.textContent = `${numerology.nameNumbers.nameSynergy.harmonyScore}%`;
  const numSynergyBar = document.getElementById('numSynergyBar');
  if (numSynergyBar) numSynergyBar.style.width = `${numerology.nameNumbers.nameSynergy.harmonyScore}%`;
  const numSynergyExplanation = document.getElementById('numSynergyExplanation');
  if (numSynergyExplanation) numSynergyExplanation.textContent = numerology.nameNumbers.nameSynergy.explanation;
  const numSynergyAffirmation = document.getElementById('numSynergyAffirmation');
  if (numSynergyAffirmation) numSynergyAffirmation.textContent = numerology.nameNumbers.nameSynergy.affirmation;

  // 12. Update Angel Numbers Section (Tor V)
  const angelRes = calculatePersonalAngelResonance(numerology.lifePath.number, synthesis.sun.planet.sign.name);
  const angelMainNumber = document.getElementById('angelMainNumber');
  if (angelMainNumber) angelMainNumber.textContent = angelRes.primaryAngelNumber.number.split(' ')[0];
  const angelMainHeadline = document.getElementById('angelMainHeadline');
  if (angelMainHeadline) angelMainHeadline.textContent = angelRes.primaryAngelNumber.headline;
  const angelMainRuler = document.getElementById('angelMainRuler');
  if (angelMainRuler) angelMainRuler.textContent = `Herrscher: ${angelRes.primaryAngelNumber.rulingPlanet}`;
  const angelMainResonance = document.getElementById('angelMainResonance');
  if (angelMainResonance) angelMainResonance.textContent = `Resonanz: Lebenswegzahl ${angelRes.lifePathNumber}`;
  const angelMainIcon = document.getElementById('angelMainIcon');
  if (angelMainIcon) angelMainIcon.textContent = angelRes.primaryAngelNumber.icon;
  const angelMainGuidance = document.getElementById('angelMainGuidance');
  if (angelMainGuidance) angelMainGuidance.textContent = angelRes.guidance;
  const angelLoveTwinFlame = document.getElementById('angelLoveTwinFlame');
  if (angelLoveTwinFlame) angelLoveTwinFlame.textContent = angelRes.primaryAngelNumber.loveAndTwinFlame;
  const angelImmediateAction = document.getElementById('angelImmediateAction');
  if (angelImmediateAction) angelImmediateAction.textContent = angelRes.primaryAngelNumber.immediateAction;

  // 13. Update Moon & Wisdom Section (Tor VIII)
  const moonCal = calculateCurrentMoonCalendar(new Date(), chart.input.cityName);
  const wisdom = generateProfileWisdom(chart, moonCal);
  const soulMottoTitle = document.getElementById('soulMottoTitle');
  if (soulMottoTitle) soulMottoTitle.textContent = wisdom.grandSoulMotto.title;
  const soulMottoFormula = document.getElementById('soulMottoFormula');
  if (soulMottoFormula) soulMottoFormula.textContent = wisdom.grandSoulMotto.astrologicalFormula;
  const soulMottoText = document.getElementById('soulMottoText');
  if (soulMottoText) soulMottoText.textContent = wisdom.grandSoulMotto.motto.replace(/[„“]/g, '');
  const soulMottoEssence = document.getElementById('soulMottoEssence');
  if (soulMottoEssence) soulMottoEssence.textContent = wisdom.grandSoulMotto.essence;
  const soulMottoSubline = document.getElementById('soulMottoSubline');
  if (soulMottoSubline) soulMottoSubline.textContent = wisdom.grandSoulMotto.subline;

  // 14. Update Gemstones (Tor VII)
  const personalGemstonesGrid = document.getElementById('personalGemstonesContainer');
  if (personalGemstonesGrid) {
    const pStones = generatePersonalGemstones(chart);
    const stoneList = [
      { key: '1. Kern-Vitalität (☉ Sonne)', st: pStones.sunStone, border: 'border-amber-500/40', badge: 'text-amber-300 bg-amber-500/20 border-amber-500/40' },
      { key: '2. Seelenfrieden & Intuition (☽ Mond)', st: pStones.moonStone, border: 'border-indigo-500/40', badge: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/40' },
      { key: '3. Seelentor & Charisma (↑ AC)', st: pStones.ascendantStone, border: 'border-cyan-500/40', badge: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40' },
      { key: '4. Ur-Wunde & Heilsames (⚷ Chiron)', st: pStones.chironStone, border: 'border-emerald-500/40', badge: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40' },
      { key: '5. Element-Ausgleich & Harmonisierung', st: pStones.elementBalanceStone, border: 'border-rose-500/40', badge: 'text-rose-300 bg-rose-500/20 border-rose-500/40' },
      { key: '6. Seelen-Evolution (☊ Nordknoten)', st: pStones.karmicStone, border: 'border-purple-500/40', badge: 'text-purple-300 bg-purple-500/20 border-purple-500/40' }
    ];

    personalGemstonesGrid.innerHTML = stoneList.map(item => `
      <div class="cosmic-glass-gold rounded-3xl p-6 border ${item.border} flex flex-col justify-between space-y-5 shadow-2xl relative overflow-hidden">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] uppercase tracking-widest font-extrabold text-slate-300">${item.key}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.badge}">
              ${item.st.chakra}
            </span>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">${item.st.iconEmoji}</span>
              <h4 class="text-lg font-black text-white">${item.st.name}</h4>
            </div>
            <div class="text-xs text-amber-300/80 font-medium mt-0.5">${item.st.role}</div>
            <div class="text-[11px] text-slate-400 font-mono mt-0.5">Mineral: ${item.st.mineralFamily}</div>
          </div>

          <div class="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div class="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>🎯</span> Seelisches Bedürfnis:
            </div>
            <p class="text-xs text-slate-200 leading-relaxed">${item.st.primaryNeed}</p>
          </div>

          <div class="space-y-1.5 text-xs text-slate-300">
            <div class="font-bold text-white flex items-center gap-1">
              <span>🔍</span> Warum & Wieso (Kosmische Resonanz):
            </div>
            <p class="leading-relaxed text-slate-300">${item.st.whyAndReason}</p>
          </div>

          <div class="space-y-1 text-xs">
            <div class="font-bold text-amber-300">✨ Was er konkret unterstützt:</div>
            <ul class="space-y-1 text-slate-300 text-[11px]">
              ${item.st.supportEffects.map((eff: string) => `
                <li class="flex items-start gap-1.5">
                  <span class="text-amber-400">✓</span>
                  <span>${eff}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 15. Update Astrocartography Geo-Chart (Tor X)
  const geoBirthCityText = document.getElementById('geoBirthCityText');
  if (geoBirthCityText) geoBirthCityText.textContent = input.cityName;

  const geoBirthPin = document.getElementById('geoBirthPin');
  if (geoBirthPin) {
    const x = ((input.longitude + 180) / 360) * 1000;
    const y = ((90 - input.latitude) / 180) * 500;
    geoBirthPin.innerHTML = `
      <circle cx="${x}" cy="${y}" r="12" fill="none" stroke="#eab308" stroke-width="2" class="animate-ping" />
      <circle cx="${x}" cy="${y}" r="5" fill="#eab308" filter="url(#geoGlow)" />
      <text x="${x}" y="${y - 14}" fill="#fde047" font-size="11" font-weight="900" text-anchor="middle" filter="url(#geoGlow)">
        ★ ${input.cityName}
      </text>
    `;
  }

  const geoData = calculateAstrocartography(chart);
  const geoDomainSummariesGrid = document.getElementById('geoDomainSummariesGrid');
  if (geoDomainSummariesGrid) {
    geoDomainSummariesGrid.innerHTML = `
      <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5 flex flex-col justify-between shadow-xl">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>💼</span> Beruf & Erfolg
            </span>
            <span class="text-base text-amber-400">☉ ♃</span>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${geoData.domainSummaries.career.summary}</p>
        </div>
        <div class="pt-2 border-t border-white/10 text-xs">
          <span class="text-slate-400 text-[10px] uppercase font-mono block">Top-Kraftorte:</span>
          <div class="font-bold text-amber-300 flex flex-wrap gap-1 mt-0.5">
            ${geoData.domainSummaries.career.bestPlaces.map(p => `<span class="px-2 py-0.5 rounded bg-black/40 border border-amber-500/30">${p}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-pink-500/10 border border-pink-500/30 space-y-2.5 flex flex-col justify-between shadow-xl">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
              <span>💖</span> Liebe & Partnerschaft
            </span>
            <span class="text-base text-pink-400">♀ ☽</span>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${geoData.domainSummaries.love.summary}</p>
        </div>
        <div class="pt-2 border-t border-white/10 text-xs">
          <span class="text-slate-400 text-[10px] uppercase font-mono block">Top-Kraftorte:</span>
          <div class="font-bold text-pink-300 flex flex-wrap gap-1 mt-0.5">
            ${geoData.domainSummaries.love.bestPlaces.map(p => `<span class="px-2 py-0.5 rounded bg-black/40 border border-pink-500/30">${p}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-slate-500/15 border border-slate-400/30 space-y-2.5 flex flex-col justify-between shadow-xl">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <span>🏡</span> Seelenheimat & Ruhe
            </span>
            <span class="text-base text-slate-300">☽-IC</span>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${geoData.domainSummaries.home.summary}</p>
        </div>
        <div class="pt-2 border-t border-white/10 text-xs">
          <span class="text-slate-400 text-[10px] uppercase font-mono block">Top-Kraftorte:</span>
          <div class="font-bold text-slate-200 flex flex-wrap gap-1 mt-0.5">
            ${geoData.domainSummaries.home.bestPlaces.map(p => `<span class="px-2 py-0.5 rounded bg-black/40 border border-slate-400/30">${p}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5 flex flex-col justify-between shadow-xl">
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <span>✨</span> Spiritualität & Heilung
            </span>
            <span class="text-base text-emerald-400">⚷ ♆ ♅</span>
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${geoData.domainSummaries.spirit.summary}</p>
        </div>
        <div class="pt-2 border-t border-white/10 text-xs">
          <span class="text-slate-400 text-[10px] uppercase font-mono block">Top-Kraftorte:</span>
          <div class="font-bold text-emerald-300 flex flex-wrap gap-1 mt-0.5">
            ${geoData.domainSummaries.spirit.bestPlaces.map(p => `<span class="px-2 py-0.5 rounded bg-black/40 border border-emerald-500/30">${p}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 16. Update Profile-Homogeneous Background Constellations
  updateBackgroundConstellations(chart);

  // 17. Update Personality Summary Section
  updatePersonalitySummary(chart);

  // 18. Update Shadow Health & Positive Dialectic Section
  updateShadowHealthDialectic(chart);
}

function renderConstellationGroupHtml(c: ConstellationData, colorHex: string, glowFilter: string, tagLabel: string) {
  const starsHtml = c.stars.map((s, idx) => {
    const isAlpha = idx === 0;
    return `
      <g>
        <circle cx="${s.x}" cy="${s.y}" r="${isAlpha ? s.size + 1.5 : s.size + 0.5}" fill="${isAlpha ? '#ffffff' : colorHex}" filter="url(#${glowFilter})" class="${isAlpha ? 'animate-celestial-pulse' : 'animate-star-twinkle'}" />
        ${s.name ? `<text x="${s.x + 5}" y="${s.y - 4}" fill="${colorHex}" font-size="8" font-family="'Cinzel', serif" font-weight="700" opacity="0.85">${s.name}</text>` : ''}
      </g>
    `;
  }).join('');

  const linesHtml = c.lines.map(l => {
    const s1 = c.stars[l.from];
    const s2 = c.stars[l.to];
    if (!s1 || !s2) return '';
    return `<line x1="${s1.x}" y1="${s1.y}" x2="${s2.x}" y2="${s2.y}" stroke="${colorHex}" stroke-width="1.3" stroke-dasharray="4 2" stroke-opacity="0.5" />`;
  }).join('');

  return `
    ${linesHtml}
    ${starsHtml}
    <text x="50" y="112" fill="${colorHex}" font-size="10" font-family="'Cinzel', serif" font-weight="800" text-anchor="middle" letter-spacing="2">
      ${tagLabel}: ${c.latinName.toUpperCase()} (${c.symbol})
    </text>
  `;
}

export function updateBackgroundConstellations(chart: CompleteNatalChart) {
  const sunId = chart.synthesis.sun.planet.sign.id;
  const moonId = chart.synthesis.moon.planet.sign.id;
  const ascId = chart.housesResult.angles.ascendant.sign.id;

  const sunConst = CONSTELLATIONS.find(c => c.id === sunId) || CONSTELLATIONS[0];
  const moonConst = CONSTELLATIONS.find(c => c.id === moonId) || CONSTELLATIONS[1];
  const ascConst = CONSTELLATIONS.find(c => c.id === ascId) || CONSTELLATIONS[2];

  const bgSun = document.getElementById('bgConstellationSun');
  if (bgSun) bgSun.innerHTML = renderConstellationGroupHtml(sunConst, '#f59e0b', 'starGlowBright', '☉ SONNE');

  const bgMoon = document.getElementById('bgConstellationMoon');
  if (bgMoon) bgMoon.innerHTML = renderConstellationGroupHtml(moonConst, '#818cf8', 'stardustGlow', '☽ MOND');

  const bgAsc = document.getElementById('bgConstellationAsc');
  if (bgAsc) bgAsc.innerHTML = renderConstellationGroupHtml(ascConst, '#06b6d4', 'starGlowBright', '↑ ASZENDENT');
}

export function updatePersonalitySummary(chart: CompleteNatalChart) {
  const p = generatePersonalitySummary(chart);
  const personName = chart.input.name || 'Edle Seele';

  const nameEl = document.getElementById('personalityPersonName');
  if (nameEl) nameEl.textContent = personName;

  const elemTag = document.getElementById('personalityElementTag');
  if (elemTag) elemTag.textContent = `${chart.balance.dominantElement}-Dominanz`;

  const lifePathTag = document.getElementById('personalityLifePathTag');
  if (lifePathTag) lifePathTag.textContent = `Lebensweg ${chart.numerology.lifePath.number}`;

  const archetypeTitle = document.getElementById('personalityArchetypeTitle');
  if (archetypeTitle) archetypeTitle.textContent = p.archetypeName;

  const shortEssence = document.getElementById('personalityShortEssence');
  if (shortEssence) shortEssence.textContent = p.shortEssence;

  const mantraText = document.getElementById('personalityMantraText');
  if (mantraText) mantraText.textContent = p.personalityMantra;

  // Pillars
  const pillarSunSign = document.getElementById('pillarSunSign');
  if (pillarSunSign) pillarSunSign.textContent = p.corePillars.sunPillar.sign;
  const pillarSunDesc = document.getElementById('pillarSunDesc');
  if (pillarSunDesc) pillarSunDesc.textContent = p.corePillars.sunPillar.description;
  const pillarSunTrait = document.getElementById('pillarSunTrait');
  if (pillarSunTrait) pillarSunTrait.textContent = p.corePillars.sunPillar.keyTrait;

  const pillarMoonSign = document.getElementById('pillarMoonSign');
  if (pillarMoonSign) pillarMoonSign.textContent = p.corePillars.moonPillar.sign;
  const pillarMoonDesc = document.getElementById('pillarMoonDesc');
  if (pillarMoonDesc) pillarMoonDesc.textContent = p.corePillars.moonPillar.description;
  const pillarMoonNeeds = document.getElementById('pillarMoonNeeds');
  if (pillarMoonNeeds) pillarMoonNeeds.textContent = p.corePillars.moonPillar.needs;

  const pillarAscSign = document.getElementById('pillarAscSign');
  if (pillarAscSign) pillarAscSign.textContent = p.corePillars.ascendantPillar.sign;
  const pillarAscDesc = document.getElementById('pillarAscDesc');
  if (pillarAscDesc) pillarAscDesc.textContent = p.corePillars.ascendantPillar.description;
  const pillarAscImpression = document.getElementById('pillarAscImpression');
  if (pillarAscImpression) pillarAscImpression.textContent = p.corePillars.ascendantPillar.firstImpression;

  const pillarMindSign = document.getElementById('pillarMindSign');
  if (pillarMindSign) pillarMindSign.textContent = p.corePillars.mindPillar.sign;
  const pillarMindDesc = document.getElementById('pillarMindDesc');
  if (pillarMindDesc) pillarMindDesc.textContent = p.corePillars.mindPillar.description;
  const pillarMindStyle = document.getElementById('pillarMindStyle');
  if (pillarMindStyle) pillarMindStyle.textContent = p.corePillars.mindPillar.thinkingStyle;

  // Superpowers
  const superpowersContainer = document.getElementById('personalitySuperpowersList');
  if (superpowersContainer) {
    superpowersContainer.innerHTML = p.superpowers.map(s => `
      <div class="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <span class="text-base shrink-0 mt-0.5">${s.icon}</span>
        <div class="text-xs leading-relaxed">
          <span class="font-bold text-white block">${s.name}</span>
          <span class="text-slate-300 font-lato">${s.detail}</span>
        </div>
      </div>
    `).join('');
  }

  // Growth
  const growthContainer = document.getElementById('personalityGrowthList');
  if (growthContainer) {
    growthContainer.innerHTML = p.growthKeys.map(g => `
      <div class="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs leading-relaxed">
        <div class="flex items-center gap-1.5 font-semibold text-rose-300">
          <span>${g.icon}</span>
          <span>Herausforderung: ${g.challenge}</span>
        </div>
        <div class="text-emerald-300 pl-5 font-medium font-lato">
          ➔ <strong>Schlüssel:</strong> ${g.masteryKey}
        </div>
      </div>
    `).join('');
  }

  // Social / Birkenbihl
  const connectEl = document.getElementById('personalityConnectText');
  if (connectEl) connectEl.textContent = p.socialInteractionCode.howToConnect;
  const avoidEl = document.getElementById('personalityAvoidText');
  if (avoidEl) avoidEl.textContent = p.socialInteractionCode.whatToAvoid;
}

export function updateShadowHealthDialectic(chart: CompleteNatalChart) {
  const analysis = analyzeShadowHealthDialectic(chart);

  const vulnBadge = document.getElementById('healthVulnerabilityBadge');
  if (vulnBadge) vulnBadge.innerHTML = `<span>🩺</span> <span>Fokus: ${analysis.primaryVulnerability}</span>`;

  const guidanceText = document.getElementById('healthGuidanceText');
  if (guidanceText) guidanceText.textContent = analysis.overallDialecticGuidance;

  const countBadge = document.getElementById('healthChallengesCount');
  if (countBadge) countBadge.textContent = `${analysis.challenges.length} Kern-Herausforderungen`;

  const container = document.getElementById('healthChallengesContainer');
  if (container) {
    container.innerHTML = analysis.challenges.map(item => `
      <div class="p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-4 hover:border-rose-500/40 transition-all shadow-lg flex flex-col justify-between">
        <div class="space-y-2 border-b border-white/10 pb-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-2.5 py-1 rounded-xl bg-white/5 border text-xs font-bold font-tech flex items-center gap-1.5 ${item.categoryColor}">
              <span>${item.categoryIcon}</span>
              <span>${item.categoryLabel}</span>
            </span>
            <span class="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
              ${item.aspectTrigger}
            </span>
          </div>
          <h4 class="text-base font-bold text-white leading-snug font-cinzel">
            ${item.title}
          </h4>
        </div>

        <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1 text-xs leading-relaxed">
          <div class="font-bold text-rose-300 flex items-center gap-1.5">
            <span>⚠️</span>
            <span>Schattenmuster / Unbewusste Reaktion:</span>
          </div>
          <p class="text-slate-200 font-lato">
            ${item.shadowDescription}
          </p>
          <div class="text-[11px] text-rose-300/80 pt-0.5">
            <strong>Betroffene Organe / Rhythmen:</strong> ${item.psychosomaticOrgan}
          </div>
        </div>

        <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs leading-relaxed">
          <div class="font-bold text-emerald-300 flex items-center gap-1.5">
            <span>✨</span>
            <span>Positive Dialektik & Verborgene Gabe:</span>
          </div>
          <p class="text-emerald-100 font-medium font-lato">
            ${item.positiveDialectic.hiddenGift}
          </p>
          <div class="text-slate-300 text-[11px] font-lato pt-0.5">
            ➔ <strong>Transformations-Schlüssel:</strong> ${item.positiveDialectic.transformationPrinciple}
          </div>
        </div>

        <div class="space-y-1.5 text-xs pt-1">
          <div class="font-bold text-amber-300 text-[11px] uppercase tracking-wider font-tech flex items-center gap-1">
            <span>🛠️</span>
            <span>Konkrete Lösungs- & Verhaltenshebel:</span>
          </div>
          <ul class="space-y-1 text-slate-300 font-lato list-disc pl-4 text-[11px]">
            ${item.positiveDialectic.actionProtocol.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>

        <div class="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1 text-xs">
          <div class="text-[10px] uppercase font-bold text-purple-300 font-tech">Transformations-Mantra:</div>
          <blockquote class="font-cormorant italic text-sm text-purple-100 font-medium">
            ${item.positiveDialectic.neurodidacticMantra}
          </blockquote>
          <div class="text-[10px] text-cyan-300/80 font-mono pt-1">
            💎 <strong>Heilstein-Unterstützung:</strong> ${item.positiveDialectic.healingElement}
          </div>
        </div>
      </div>
    `).join('');
  }

  const organContainer = document.getElementById('healthOrganMapContainer');
  if (organContainer) {
    organContainer.innerHTML = analysis.organAnatomy.map(organ => `
      <div class="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20 space-y-2.5 hover:border-cyan-500/40 transition-all text-xs">
        <div class="flex items-center justify-between border-b border-white/10 pb-2">
          <span class="font-bold text-cyan-300 font-tech">${organ.zodiacSign}</span>
        </div>
        <div>
          <span class="text-slate-400 text-[10px] uppercase font-tech block">Körperregion:</span>
          <span class="text-white font-medium">${organ.bodyRegion}</span>
        </div>
        <div>
          <span class="text-rose-400 text-[10px] uppercase font-tech block">Mögliche Schwachstelle:</span>
          <span class="text-slate-300 font-lato">${organ.potentialWeakness}</span>
        </div>
        <div>
          <span class="text-emerald-400 text-[10px] uppercase font-tech block">Ganzheitliche Stärkung:</span>
          <span class="text-slate-300 font-lato">${organ.holisticStrengthening}</span>
        </div>
        <div class="pt-1 text-[11px] text-amber-200/80 italic font-cormorant border-t border-white/5">
          »${organ.symbolicMeaning}«
        </div>
      </div>
    `).join('');
  }
}

function setupSvgInteractions() {
  const tooltip = document.getElementById('radixTooltip');
  const svg = document.getElementById('radixSvg');
  const aspectLines = document.querySelectorAll('.aspect-line') as NodeListOf<SVGLineElement>;
  const planetMarkers = document.querySelectorAll('.planet-marker');

  if (tooltip && svg) {
    const showTooltip = (text: string, e: MouseEvent) => {
      tooltip.textContent = text;
      tooltip.classList.remove('hidden');
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tooltip.style.left = `${x + 10}px`;
      tooltip.style.top = `${y - 30}px`;
    };

    const hideTooltip = () => {
      tooltip.classList.add('hidden');
    };

    planetMarkers.forEach(el => {
      el.addEventListener('mouseenter', (e: any) => {
        const text = el.getAttribute('data-tooltip') || '';
        const planetId = el.getAttribute('data-id');
        showTooltip(text, e);

        if (planetId) {
          aspectLines.forEach(line => {
            const p1 = line.getAttribute('data-p1');
            const p2 = line.getAttribute('data-p2');
            if (p1 === planetId || p2 === planetId) {
              line.style.strokeWidth = '2.8px';
              line.style.strokeOpacity = '1';
            } else {
              line.style.strokeOpacity = '0.1';
            }
          });
        }
      });

      el.addEventListener('mousemove', (e: any) => {
        const text = el.getAttribute('data-tooltip') || '';
        showTooltip(text, e);
      });

      el.addEventListener('mouseleave', () => {
        hideTooltip();
        aspectLines.forEach(line => {
          line.style.strokeWidth = '';
          line.style.strokeOpacity = '';
        });
      });
    });

    aspectLines.forEach(line => {
      line.addEventListener('mouseenter', (e: any) => {
        const text = line.getAttribute('data-tooltip') || '';
        showTooltip(text, e);
      });
      line.addEventListener('mousemove', (e: any) => {
        const text = line.getAttribute('data-tooltip') || '';
        showTooltip(text, e);
      });
      line.addEventListener('mouseleave', () => {
        hideTooltip();
      });
    });
  }
}
