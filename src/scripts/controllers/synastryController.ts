/**
 * Synastry & Family Matrix Interactive Controller
 * Manages mode switching, client profile dropdowns, and dynamic DOM updates.
 */

import { getClientProfiles } from '../../lib/db/profileStore';
import { generateNatalChart } from '../../lib/astrology/engine';
import { calculateSynastry, calculateFamilyMatrix } from '../../lib/astrology/synastry';

export function initSynastryController(): void {
  const modePartnerBtn = document.getElementById('synastryModePartnerBtn');
  const modeFamilyBtn = document.getElementById('synastryModeFamilyBtn');
  const partnerView = document.getElementById('partnerSynastryView');
  const familyView = document.getElementById('familyMatrixView');
  const selectA = document.getElementById('synastrySelectPersonA') as HTMLSelectElement | null;
  const selectB = (document.getElementById('synastryPartnerBSelect') || document.getElementById('synastrySelectPersonB')) as HTMLSelectElement | null;
  const partnerRow = document.getElementById('partnerSelectorsRow');
  const btnCalculate = document.getElementById('btnCalculateSynastry');

  if (!modePartnerBtn || !modeFamilyBtn || !partnerView || !familyView) return;

  // Toggle Modes
  modePartnerBtn.addEventListener('click', () => {
    modePartnerBtn.className = 'px-5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] cursor-pointer';
    modeFamilyBtn.className = 'px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer';
    partnerView.classList.remove('hidden');
    familyView.classList.add('hidden');
    if (partnerRow) partnerRow.classList.remove('hidden');
  });

  modeFamilyBtn.addEventListener('click', () => {
    modeFamilyBtn.className = 'px-5 py-2 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)] cursor-pointer';
    modePartnerBtn.className = 'px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer';
    familyView.classList.remove('hidden');
    partnerView.classList.add('hidden');
    if (partnerRow) partnerRow.classList.add('hidden');
    recalcFamilyMatrix();
  });

  function populateProfileDropdowns(): void {
    const profiles = getClientProfiles();
    if (!selectA || !selectB) return;

    const currentParams = new URLSearchParams(window.location.search);
    const activeName = currentParams.get('name') || 'Aktives Profil';

    let optionsA = `<option value="active">${activeName} (Aktives Profil)</option>`;
    let optionsB = '';

    profiles.forEach(p => {
      optionsA += `<option value="${p.id}">${p.name} (${p.birthDate} • ${p.cityName})</option>`;
      optionsB += `<option value="${p.id}">${p.name} (${p.birthDate} • ${p.cityName})</option>`;
    });

    if (profiles.length === 0) {
      optionsB = `<option value="partner_default">Seelenpartner (Muster-Vergleich)</option>`;
    }

    selectA.innerHTML = optionsA;
    selectB.innerHTML = optionsB;
  }

  populateProfileDropdowns();
  window.addEventListener('astro_profiles_updated', populateProfileDropdowns);

  function recalcSynastry(): void {
    const profiles = getClientProfiles();
    const params = new URLSearchParams(window.location.search);
    
    const chartA = generateNatalChart({
      birthDate: params.get('birthDate') || '1991-05-05',
      birthTime: params.get('birthTime') || '13:00',
      cityName: params.get('cityName') || 'Wien',
      latitude: parseFloat(params.get('latitude') || '48.2082'),
      longitude: parseFloat(params.get('longitude') || '16.3738'),
      timezone: params.get('timezone') || 'Europe/Vienna',
      name: params.get('name') || 'Edle Seele',
      houseSystem: (params.get('houseSystem') === 'equal' ? 'equal' : 'placidus') as any
    });

    const selBVal = selectB?.value;
    let chartB = chartA;
    const foundB = profiles.find(p => p.id === selBVal);

    if (foundB) {
      chartB = generateNatalChart({
        birthDate: foundB.birthDate,
        birthTime: foundB.birthTime,
        cityName: foundB.cityName,
        latitude: foundB.latitude,
        longitude: foundB.longitude,
        timezone: foundB.timezone,
        name: foundB.name,
        houseSystem: foundB.houseSystem || 'placidus'
      });
    } else {
      // Mock partner if only 1 profile exists
      chartB = {
        ...chartA,
        input: {
          ...chartA.input,
          name: 'Seelenpartner',
          birthDate: '1992-03-12',
          birthTime: '08:45',
          cityName: 'Salzburg'
        }
      };
    }

    const res = calculateSynastry(chartA, chartB);

    const archTitle = document.getElementById('synastryArchetypeTitle');
    if (archTitle) archTitle.textContent = res.scores.archetype;
    const ovScore = document.getElementById('synastryOverallScore');
    if (ovScore) ovScore.textContent = `${res.scores.overallScore}%`;
    const ovBar = document.getElementById('synastryOverallBar');
    if (ovBar) ovBar.style.width = `${res.scores.overallScore}%`;
    const tag = document.getElementById('synastryTagline');
    if (tag) tag.textContent = `"${res.scores.tagline}"`;

    const scoreEmo = document.getElementById('synScoreEmo');
    if (scoreEmo) scoreEmo.textContent = `${res.scores.emotionalHarmony.score}%`;
    const barEmo = document.getElementById('synBarEmo');
    if (barEmo) barEmo.style.width = `${res.scores.emotionalHarmony.score}%`;
    const descEmo = document.getElementById('synDescEmo');
    if (descEmo) descEmo.textContent = res.scores.emotionalHarmony.description;

    const scorePass = document.getElementById('synScorePass');
    if (scorePass) scorePass.textContent = `${res.scores.passionAndChemistry.score}%`;
    const barPass = document.getElementById('synBarPass');
    if (barPass) barPass.style.width = `${res.scores.passionAndChemistry.score}%`;
    const descPass = document.getElementById('synDescPass');
    if (descPass) descPass.textContent = res.scores.passionAndChemistry.description;

    const scoreMind = document.getElementById('synScoreMind');
    if (scoreMind) scoreMind.textContent = `${res.scores.mindAndCommunication.score}%`;
    const barMind = document.getElementById('synBarMind');
    if (barMind) barMind.style.width = `${res.scores.mindAndCommunication.score}%`;
    const descMind = document.getElementById('synDescMind');
    if (descMind) descMind.textContent = res.scores.mindAndCommunication.description;

    const scoreKarm = document.getElementById('synScoreKarm');
    if (scoreKarm) scoreKarm.textContent = `${res.scores.karmicBondAndStability.score}%`;
    const barKarm = document.getElementById('synBarKarm');
    if (barKarm) barKarm.style.width = `${res.scores.karmicBondAndStability.score}%`;
    const descKarm = document.getElementById('synDescKarm');
    if (descKarm) descKarm.textContent = res.scores.karmicBondAndStability.description;

    // Composite DOM
    const cSunPos = document.getElementById('compSunPos');
    if (cSunPos) cSunPos.textContent = `${res.composite.sun.sign.name} (${res.composite.sun.degreeString})`;
    const cSunDesc = document.getElementById('compSunDesc');
    if (cSunDesc) cSunDesc.textContent = res.composite.sun.interpretation;

    const cMoonPos = document.getElementById('compMoonPos');
    if (cMoonPos) cMoonPos.textContent = `${res.composite.moon.sign.name} (${res.composite.moon.degreeString})`;
    const cMoonDesc = document.getElementById('compMoonDesc');
    if (cMoonDesc) cMoonDesc.textContent = res.composite.moon.interpretation;

    const cAcPos = document.getElementById('compAcPos');
    if (cAcPos) cAcPos.textContent = `${res.composite.ascendant.sign.name} (${res.composite.ascendant.degreeString})`;
    const cAcDesc = document.getElementById('compAcDesc');
    if (cAcDesc) cAcDesc.textContent = res.composite.ascendant.interpretation;

    const cPurp = document.getElementById('compPurposeDesc');
    if (cPurp) cPurp.textContent = res.composite.sharedSoulPurpose;
    const cStoneN = document.getElementById('compStoneName');
    if (cStoneN) cStoneN.textContent = res.composite.pairGemstone.name;
    const cStoneD = document.getElementById('compStoneDesc');
    if (cStoneD) cStoneD.textContent = res.composite.pairGemstone.effect;

    // Aspects DOM
    const aspCount = document.getElementById('synAspectCount');
    if (aspCount) aspCount.textContent = `${res.aspects.length} Aspekte berechnet`;

    const aspList = document.getElementById('synAspectsList');
    if (aspList) {
      aspList.innerHTML = res.aspects.slice(0, 10).map(asp => `
        <div class="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all">
          <div class="space-y-1">
            <div class="flex items-center gap-2 font-bold text-sm text-white">
              <span class="px-2 py-0.5 rounded text-xs border" style="color: ${asp.color}; border-color: ${asp.color}40; background: ${asp.color}15">
                ${asp.symbol} ${asp.aspectName}
              </span>
              <span>${asp.headline}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${asp.esotericMeaning}</p>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded shrink-0">
            Orb: ${asp.orb.toFixed(1)}°
          </span>
        </div>
      `).join('');
    }
  }

  function recalcFamilyMatrix(): void {
    const profiles = getClientProfiles();
    const charts = profiles.map(p => generateNatalChart({
      birthDate: p.birthDate,
      birthTime: p.birthTime,
      cityName: p.cityName,
      latitude: p.latitude,
      longitude: p.longitude,
      timezone: p.timezone,
      name: p.name,
      houseSystem: p.houseSystem || 'placidus'
    }));

    if (charts.length === 0) return;

    const fam = calculateFamilyMatrix(charts);
    const famHead = document.getElementById('famHeadline');
    if (famHead) famHead.textContent = fam.familyDynamicHeadline;
    const badge = document.getElementById('famMemberCountBadge');
    if (badge) badge.textContent = `${fam.memberCount} Familienmitglieder analysiert`;

    const pFire = document.getElementById('famPctFire');
    if (pFire) pFire.textContent = `${fam.elementBalance.fire}%`;
    const pEarth = document.getElementById('famPctEarth');
    if (pEarth) pEarth.textContent = `${fam.elementBalance.earth}%`;
    const pAir = document.getElementById('famPctAir');
    if (pAir) pAir.textContent = `${fam.elementBalance.air}%`;
    const pWater = document.getElementById('famPctWater');
    if (pWater) pWater.textContent = `${fam.elementBalance.water}%`;

    const karmaD = document.getElementById('famKarmaDesc');
    if (karmaD) karmaD.textContent = fam.familyKarmaLesson;
    const codeD = document.getElementById('famCodeDesc');
    if (codeD) codeD.textContent = fam.birkenbihlCommunicationCode;
  }

  selectA?.addEventListener('change', recalcSynastry);
  selectB?.addEventListener('change', recalcSynastry);
  btnCalculate?.addEventListener('click', recalcSynastry);
  window.addEventListener('astro_recalculate_chart', recalcSynastry);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSynastryController);
} else {
  initSynastryController();
}
