/**
 * Radix Wheel & Astrological Chart SVG Renderer (Industrial Gold Standard)
 * High-performance SVG generation, aspect matrix calculations, and interactive event binding.
 */

import type { CompleteNatalChart } from '../../lib/astrology/engine';
import { ZODIAC_SIGNS } from '../../lib/astrology/constants';

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

export function renderRadixSvg(chart: CompleteNatalChart): void {
  const { housesResult } = chart;
  const asc = housesResult.angles.ascendant.longitude;
  const mc = housesResult.angles.midheaven.longitude;

  function lonToSvgAngle(lon: number): number {
    const diff = lon - asc;
    const angle = 180 - diff;
    return ((angle % 360) + 360) % 360;
  }

  const center = 350;
  const rOuter = 320;
  const rZodiacInner = 265;
  const rHouses = 210;
  const rPlanets = 175;
  const rAspects = 135;

  const svg = document.getElementById('radixSvg');
  if (!svg) return;

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

export function setupSvgInteractions(): void {
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

export function renderCardinalAngles(chart: CompleteNatalChart): void {
  const { housesResult } = chart;
  const acCard = document.getElementById('cardAC');
  if (acCard) acCard.innerHTML = `<div class="font-bold text-cyan-300"><span>AC</span> Aszendent (1. Haus)</div><div class="text-white font-medium">${housesResult.angles.ascendant.sign.name} (${housesResult.angles.ascendant.degreeString})</div><div class="text-slate-400 text-[11px]">Auftreten & Seelentor</div>`;

  const mcCard = document.getElementById('cardMC');
  if (mcCard) mcCard.innerHTML = `<div class="font-bold text-amber-300"><span>MC</span> Medium Coeli (10. Haus)</div><div class="text-white font-medium">${housesResult.angles.midheaven.sign.name} (${housesResult.angles.midheaven.degreeString})</div><div class="text-slate-400 text-[11px]">Berufung & Lebensziel</div>`;

  const dcCard = document.getElementById('cardDC');
  if (dcCard) dcCard.innerHTML = `<div class="font-bold text-rose-300"><span>DC</span> Deszendent (7. Haus)</div><div class="text-white font-medium">${housesResult.angles.descendant.sign.name} (${housesResult.angles.descendant.degreeString})</div><div class="text-slate-400 text-[11px]">Begegnung & Partnerschaft</div>`;

  const icCard = document.getElementById('cardIC');
  if (icCard) icCard.innerHTML = `<div class="font-bold text-indigo-300"><span>IC</span> Imum Coeli (4. Haus)</div><div class="text-white font-medium">${housesResult.angles.imumCoeli.sign.name} (${housesResult.angles.imumCoeli.degreeString})</div><div class="text-slate-400 text-[11px]">Wurzeln & Seelenheimat</div>`;
}

export function renderElementsBalance(chart: CompleteNatalChart): void {
  const { balance } = chart;
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
}

export function renderPlanetsTable(chart: CompleteNatalChart): void {
  const planetsTableBody = document.getElementById('planetsTableBody');
  if (!planetsTableBody) return;

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

export function renderAspectMatrix(chart: CompleteNatalChart): void {
  const aspectCountBadge = document.getElementById('aspectCountBadge');
  if (aspectCountBadge) aspectCountBadge.textContent = `${chart.aspects.length} Aspekte aktiv`;

  const aspectListContainer = document.getElementById('aspectListContainer');
  if (!aspectListContainer) return;

  aspectListContainer.innerHTML = chart.aspects.map(item => `
    <div class="p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-900/90 border border-white/10 hover:border-amber-500/40 transition-all flex flex-wrap items-center justify-between gap-2.5 shadow-md group">
      <div class="flex flex-wrap items-center gap-2 min-w-0 flex-1">
        <div class="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm shrink-0" style="color: ${item.planet1.color}">
          <span class="text-base leading-none">${item.planet1.symbol}</span>
          <span>${item.planet1.name}</span>
        </div>

        <div
          class="px-2.5 py-1 rounded-lg text-xs font-bold border inline-flex items-center gap-1 shrink-0 font-tech shadow-sm"
          style="color: ${item.definition.color}; border-color: ${item.definition.color}50; background-color: ${item.definition.color}18"
        >
          <span class="text-sm leading-none">${item.definition.symbol}</span>
          <span>${item.definition.name}</span>
        </div>

        <div class="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm shrink-0" style="color: ${item.planet2.color}">
          <span class="text-base leading-none">${item.planet2.symbol}</span>
          <span>${item.planet2.name}</span>
        </div>
      </div>

      <div class="shrink-0">
        <span class="text-xs font-mono font-bold text-slate-300 bg-white/5 group-hover:bg-amber-500/10 group-hover:text-amber-300 group-hover:border-amber-500/30 px-2.5 py-1 rounded-lg border border-white/10 transition-colors block">
          Orb ${item.orb.toFixed(1)}°
        </span>
      </div>
    </div>
  `).join('');
}
