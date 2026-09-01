/**
 * Esoteric Dossier & Soul Profile Renderer (Industrial Gold Standard)
 * Neurodidactic updates for Birkenbihl Decoder, Numerology, Life Pillars, Gemstones, Shadow Health, and Astrocartography.
 */

import type { CompleteNatalChart } from '../../lib/astrology/engine';
import { CONSTELLATIONS, type ConstellationData } from '../../lib/astrology/constellations';
import { generatePersonalGemstones } from '../../lib/astrology/gemstones';
import { calculateCurrentMoonCalendar } from '../../lib/astrology/moonCalendar';
import { generateProfileWisdom } from '../../lib/numerology/profileWisdom';
import { calculateAstrocartography } from '../../lib/astrology/astrocartography';
import { calculatePersonalAngelResonance } from '../../lib/numerology/angelNumbers';
import { generatePersonalitySummary } from '../../lib/astrology/personalitySynthesis';
import { analyzeShadowHealthDialectic } from '../../lib/astrology/shadowHealthDialectic';

export function renderHeroAndSummaryBadges(chart: CompleteNatalChart): void {
  const { synthesis, housesResult, input, numerology } = chart;
  const formattedDate = new Date(`${input.birthDate}T${input.birthTime}`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const heroName = document.getElementById('heroName');
  if (heroName) {
    heroName.innerHTML = input.name
      ? `<span><span class="cosmic-gold-gradient">${input.name}s</span> Kosmisches Seelenbuch</span>`
      : '<span>Dein <span class="cosmic-gold-gradient">Kosmisches Seelenbuch</span></span>';
  }

  const heroWelcomePrompt = document.getElementById('heroWelcomePrompt');
  if (heroWelcomePrompt) heroWelcomePrompt.classList.add('hidden');

  const heroActiveDetails = document.getElementById('heroActiveProfileDetails');
  if (heroActiveDetails) heroActiveDetails.classList.remove('hidden');

  const heroPills = document.getElementById('heroIdentityPillsBar');
  if (heroPills) heroPills.classList.remove('hidden');

  const heroDetails = document.getElementById('heroDetails');
  if (heroDetails) {
    heroDetails.classList.remove('hidden');
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

  const matrixPending = document.getElementById('matrixPendingBanner');
  if (matrixPending) matrixPending.classList.add('hidden');

  const questionSection = document.getElementById('question-section');
  if (questionSection) questionSection.classList.remove('hidden');

  const soulDossierContainer = document.getElementById('soulDossierContainer');
  if (soulDossierContainer) soulDossierContainer.classList.remove('hidden');

  const pSummary = generatePersonalitySummary(chart);
  const heroArchetypeTitle = document.getElementById('heroArchetypeTitle');
  if (heroArchetypeTitle) heroArchetypeTitle.textContent = pSummary.archetypeName;

  const heroPersonalitySummary = document.getElementById('heroPersonalitySummary');
  if (heroPersonalitySummary) heroPersonalitySummary.textContent = pSummary.shortEssence;

  const heroPersonalityMantra = document.getElementById('heroPersonalityMantra');
  if (heroPersonalityMantra) heroPersonalityMantra.textContent = pSummary.personalityMantra;

  const headerPersonBadge = document.getElementById('headerActivePersonBadge');
  if (headerPersonBadge) {
    headerPersonBadge.classList.remove('hidden');
    headerPersonBadge.classList.add('flex');
  }

  const headerPersonName = document.getElementById('headerPersonName');
  if (headerPersonName) headerPersonName.textContent = input.name || 'Edle Seele';

  const headerPersonSigns = document.getElementById('headerPersonSigns');
  if (headerPersonSigns) {
    headerPersonSigns.textContent = `☉ ${synthesis.sun.planet.sign.name} • ☽ ${synthesis.moon.planet.sign.name} • ↑ ${synthesis.ascendant.sign.name}`;
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

  const summaryPersonName = document.getElementById('summaryPersonName');
  if (summaryPersonName) summaryPersonName.textContent = input.name || 'Edle Seele';
  const summaryInitials = document.getElementById('summaryInitials');
  if (summaryInitials) summaryInitials.textContent = input.name ? input.name.charAt(0).toUpperCase() : '✦';
  const summaryDetails = document.getElementById('summaryDetails');
  if (summaryDetails) {
    summaryDetails.innerHTML = `<span>🗓️ ${input.birthDate}, ${input.birthTime} Uhr</span><span>•</span><span>📍 ${input.cityName}</span><span>•</span><span class="text-amber-300 font-mono">(${input.houseSystem || 'placidus'})</span>`;
  }
}

export function renderPersonSidebar(chart: CompleteNatalChart): void {
  const { synthesis, balance, input, numerology } = chart;
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
}

export function renderEsotericDossier(chart: CompleteNatalChart): void {
  const { synthesis, housesResult } = chart;
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
}

export function renderLifePillars(chart: CompleteNatalChart): void {
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
}

export function renderNumerologySection(chart: CompleteNatalChart): void {
  const { numerology, input } = chart;
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

  const numSynHeadline = document.getElementById('numSynHeadline');
  if (numSynHeadline) numSynHeadline.textContent = numerology.astroSynergy.headline;
  const numSynDescription = document.getElementById('numSynDescription');
  if (numSynDescription) numSynDescription.textContent = numerology.astroSynergy.description;
  const numSynGuidance = document.getElementById('numSynGuidance');
  if (numSynGuidance) numSynGuidance.textContent = numerology.astroSynergy.coreGuidance;
}

export function renderAngelNumbers(chart: CompleteNatalChart): void {
  const { numerology, synthesis } = chart;
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
}

export function renderMoonAndWisdom(chart: CompleteNatalChart): void {
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
}

export function renderPersonalGemstones(chart: CompleteNatalChart): void {
  const personalGemstonesGrid = document.getElementById('personalGemstonesContainer');
  if (!personalGemstonesGrid) return;

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

export function renderAstrocartography(chart: CompleteNatalChart): void {
  const { input } = chart;
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
  if (!geoDomainSummariesGrid) return;

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

export function updateBackgroundConstellations(chart: CompleteNatalChart): void {
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

export function updatePersonalitySummary(chart: CompleteNatalChart): void {
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

export function updateShadowHealthDialectic(chart: CompleteNatalChart): void {
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
            <span>Verborgene Gabe & Seelenpotenzial:</span>
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
