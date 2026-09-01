/**
 * Human Design Bodygraph & AI Agent Renderer (Industrial Gold Standard)
 * Interactive Bodygraph SVG manipulation, 9 centers, 36 channels, 64 gates, and inquiry agent.
 */

import type { CompleteNatalChart } from '../../lib/astrology/engine';
import { calculateHumanDesignChart } from '../../lib/humandesign/engine';
import { HumanDesignAgent } from '../../lib/humandesign/agent';
import { HD_CENTERS, ALL_CENTER_IDS } from '../../lib/humandesign/centers';
import { ALL_HD_CHANNELS } from '../../lib/humandesign/channels';
import { getGateData } from '../../lib/humandesign/gatesData';
import type { HDChartData } from '../../lib/humandesign/types';

let activeHdChart: HDChartData | null = null;
let activeAgentPromptKey = 'decision';
let isHdAgentQueryListenerSet = false;

export function renderHumanDesign(chart: CompleteNatalChart): void {
  const hd = calculateHumanDesignChart({
    name: chart.input.name,
    birthDate: chart.input.birthDate,
    birthTime: chart.input.birthTime,
    cityName: chart.input.cityName,
    latitude: chart.input.latitude,
    longitude: chart.input.longitude,
    timezone: chart.input.timezone
  });

  activeHdChart = hd;

  // 1. Update Key Badges
  const typeBadge = document.getElementById('hdBadgeType');
  if (typeBadge) typeBadge.textContent = hd.energyType.title;

  const strategyBadge = document.getElementById('hdBadgeStrategy');
  if (strategyBadge) strategyBadge.textContent = hd.energyType.strategy;

  const authBadge = document.getElementById('hdBadgeAuthority');
  if (authBadge) authBadge.textContent = hd.authority.germanName.split('(')[0];

  const profileBadge = document.getElementById('hdBadgeProfile');
  if (profileBadge) profileBadge.textContent = `Profil ${hd.profile.code}`;

  const defBadge = document.getElementById('hdBadgeDefinition');
  if (defBadge) defBadge.textContent = hd.definition.label.split('(')[0];

  const crossBadge = document.getElementById('hdBadgeCross');
  if (crossBadge) {
    crossBadge.textContent = hd.incarnationCross.name;
    crossBadge.title = hd.incarnationCross.name;
  }

  // 2. Update 4 PHS Variables
  const varsGrid = document.getElementById('hdVariablesGrid');
  if (varsGrid) {
    varsGrid.innerHTML = `
      <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
        <div class="flex items-center justify-between font-bold text-amber-300">
          <span>🧠 Verdauung / Gehirn</span>
          <span class="font-mono">${hd.variables.digestion.direction === 'left' ? '◀ Links' : '▶ Rechts'}</span>
        </div>
        <div class="text-[11px] text-white font-medium">${hd.variables.digestion.label}</div>
        <p class="text-[10px] text-slate-300 leading-snug">${hd.variables.digestion.description}</p>
      </div>

      <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
        <div class="flex items-center justify-between font-bold text-emerald-300">
          <span>🏡 Umgebung / Kraftfeld</span>
          <span class="font-mono">${hd.variables.environment.direction === 'left' ? '◀ Links' : '▶ Rechts'}</span>
        </div>
        <div class="text-[11px] text-white font-medium">${hd.variables.environment.label}</div>
        <p class="text-[10px] text-slate-300 leading-snug">${hd.variables.environment.description}</p>
      </div>

      <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
        <div class="flex items-center justify-between font-bold text-cyan-300">
          <span>👁️ Perspektive / Sicht</span>
          <span class="font-mono">${hd.variables.perspective.direction === 'left' ? '◀ Links' : '▶ Rechts'}</span>
        </div>
        <div class="text-[11px] text-white font-medium">${hd.variables.perspective.label}</div>
        <p class="text-[10px] text-slate-300 leading-snug">${hd.variables.perspective.description}</p>
      </div>

      <div class="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
        <div class="flex items-center justify-between font-bold text-purple-300">
          <span>🎯 Motivation / Geist</span>
          <span class="font-mono">${hd.variables.motivation.direction === 'left' ? '◀ Links' : '▶ Rechts'}</span>
        </div>
        <div class="text-[11px] text-white font-medium">${hd.variables.motivation.label}</div>
        <p class="text-[10px] text-slate-300 leading-snug">${hd.variables.motivation.description}</p>
      </div>
    `;
  }

  // 3. Update Activations Tables
  const designList = document.getElementById('hdDesignActivationsList');
  if (designList) {
    designList.innerHTML = hd.designActivations.map(act => `
      <div class="flex items-center justify-between py-0.5 border-b border-white/5">
        <span class="text-slate-300 flex items-center gap-1">
          <span class="text-red-400 font-bold">${act.symbol}</span>
          <span class="text-[10px] text-slate-400">${act.planetName}</span>
        </span>
        <span class="font-bold text-red-300">
          Tor ${act.gate}.${act.line}
        </span>
      </div>
    `).join('');
  }

  const personalityList = document.getElementById('hdPersonalityActivationsList');
  if (personalityList) {
    personalityList.innerHTML = hd.personalityActivations.map(act => `
      <div class="flex items-center justify-between py-0.5 border-b border-white/5">
        <span class="text-slate-300 flex items-center gap-1">
          <span class="text-amber-400 font-bold">${act.symbol}</span>
          <span class="text-[10px] text-slate-400">${act.planetName}</span>
        </span>
        <span class="font-bold text-amber-300">
          Tor ${act.gate}.${act.line}
        </span>
      </div>
    `).join('');
  }

  // 4. Update 9 Centers Detailed List
  const centersContainer = document.getElementById('hdCentersDetailedList');
  if (centersContainer) {
    centersContainer.innerHTML = ALL_CENTER_IDS.map(cId => {
      const isDef = hd.definedCenters.includes(cId);
      const c = HD_CENTERS[cId];
      return `
        <div class="p-4 rounded-2xl border transition-all ${isDef ? 'bg-amber-950/15 border-amber-500/30' : 'bg-slate-900/40 border-white/10'}">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full ${isDef ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-slate-700 border border-white/20'}"></span>
              <span class="font-bold text-white text-sm">${c.germanName}</span>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-tech ${isDef ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-300 border border-white/10'}">
              ${isDef ? 'Definiert (Feste Energie)' : 'Offen / Undefiniert (Empfangend)'}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2.5">
            <div class="space-y-1">
              <span class="text-[10px] uppercase font-bold text-slate-400 font-tech block">
                ${isDef ? '🌟 Definierte Gabe:' : '💡 Weisheits-Potenzial:'}
              </span>
              <p class="text-slate-200 leading-relaxed font-lato">
                ${isDef ? c.definedGift : c.undefinedWisdom}
              </p>
            </div>

            <div class="space-y-1">
              <span class="text-[10px] uppercase font-bold text-rose-400 font-tech block">
                ${isDef ? '🔬 Biologische Verankerung:' : '⚠️ Nicht-Selbst Frage:'}
              </span>
              <p class="text-slate-300 leading-relaxed font-lato">
                ${isDef ? c.biologicalCorrelations.join(' • ') : c.notSelfQuestion}
              </p>
            </div>
          </div>

          ${!isDef ? `
            <div class="mt-2 pt-2 border-t border-white/5 text-[11px] text-emerald-300 flex items-start gap-1.5 font-lato">
              <span class="text-emerald-400 font-bold">➔ Entgiftung:</span>
              <span>${c.deconditioningKey}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // 5. Update Channels Detailed List
  const channelsContainer = document.getElementById('hdChannelsDetailedList');
  if (channelsContainer) {
    if (hd.definedChannels.length > 0) {
      channelsContainer.innerHTML = hd.definedChannels.map(ch => `
        <div class="p-4 rounded-2xl bg-white/[0.02] border border-amber-500/20 space-y-2 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                Kanal ${ch.id}
              </span>
              <span class="font-bold text-white text-sm">${ch.germanName}</span>
            </div>
            <span class="text-[10px] font-tech text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-lg">
              ${ch.circuitLabel}
            </span>
          </div>

          <div class="space-y-1.5 font-lato text-slate-200">
            <div><strong class="text-amber-300">Gabe:</strong> ${ch.quantumGifting}</div>
            <div><strong class="text-rose-400">Schatten:</strong> ${ch.shadowPattern}</div>
            <div><strong class="text-emerald-300">Meisterschaft:</strong> ${ch.masteryTheme}</div>
          </div>
        </div>
      `).join('');
    } else {
      channelsContainer.innerHTML = `
        <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 text-center font-lato">
          Keine fest definierten Kanäle (Reflektor-Matrix). Du erfährst alle 36 Kanäle flexibel durch Transite und Begegnungen.
        </div>
      `;
    }
  }

  // 6. Update Bodygraph SVG Elements (Centers, Channels & Gates)
  updateBodygraphSvgElements(hd);

  // 7. Update Agent Box Response
  renderHdAgentResponse(activeAgentPromptKey);

  // Setup Event Listener for prompt queries if not done yet
  if (!isHdAgentQueryListenerSet) {
    isHdAgentQueryListenerSet = true;
    window.addEventListener('hd-agent-query', (e: any) => {
      if (e.detail && e.detail.promptKey) {
        activeAgentPromptKey = e.detail.promptKey;
        renderHdAgentResponse(activeAgentPromptKey);
      }
    });
  }
}

export function updateBodygraphSvgElements(hd: HDChartData): void {
  // Update Centers
  ALL_CENTER_IDS.forEach(cId => {
    const isDef = hd.definedCenters.includes(cId);
    const info = HD_CENTERS[cId];
    const node = document.querySelector(`.hd-center-node[data-center-id="${cId}"]`);
    if (node) {
      const shape = node.querySelector('polygon, rect');
      const text = node.querySelector('text');
      if (shape) {
        shape.setAttribute('fill', isDef ? info.primaryColor : '#0f172a');
        shape.setAttribute('stroke', isDef ? '#fde047' : 'rgba(255,255,255,0.25)');
        shape.setAttribute('filter', isDef ? 'url(#hdCenterGlow)' : 'none');
      }
      if (text) {
        text.setAttribute('fill', isDef ? (cId === 'throat' || cId === 'sacral' || cId === 'root' || cId === 'solarPlexus' ? '#ffffff' : '#000000') : '#94a3b8');
      }
      node.setAttribute('data-tooltip', `${info.germanName}: ${isDef ? 'Definiert' : 'Offen'}`);
    }
  });

  // Update Channels
  ALL_HD_CHANNELS.forEach(ch => {
    const defCh = hd.definedChannels.find(c => c.id === ch.id);
    const item = document.querySelector(`.hd-channel-item[data-channel-id="${ch.id}"]`);
    if (item) {
      const isDef = !!defCh;
      const actState = defCh?.activationState || 'inactive';
      const mainLine = item.querySelector('line:last-child');
      if (mainLine) {
        let strokeColor = 'rgba(255, 255, 255, 0.08)';
        let strokeWidth = '3';
        if (isDef) {
          strokeWidth = '6';
          if (actState === 'both') strokeColor = 'url(#channelSplitGrad)';
          else if (actState === 'unconscious') strokeColor = '#ef4444';
          else strokeColor = '#f59e0b';
        }
        mainLine.setAttribute('stroke', strokeColor);
        mainLine.setAttribute('stroke-width', strokeWidth);
      }
    }
  });

  // Update Gate Pins
  for (let g = 1; g <= 64; g++) {
    const act = hd.activeGates[g];
    const pin = document.querySelector(`.hd-gate-pin[data-gate="${g}"]`);
    if (pin) {
      const circle = pin.querySelector('circle');
      const text = pin.querySelector('text');
      const isActive = !!act;
      const gateData = getGateData(g);

      let circleFill = 'rgba(15, 23, 42, 0.9)';
      let circleStroke = 'rgba(255, 255, 255, 0.2)';
      let textColor = '#64748b';
      let strokeW = '1';

      if (isActive) {
        strokeW = '2';
        if (act.conscious && act.unconscious) {
          circleFill = '#78350f';
          circleStroke = '#fbbf24';
          textColor = '#fef08a';
        } else if (act.unconscious) {
          circleFill = '#7f1d1d';
          circleStroke = '#ef4444';
          textColor = '#fca5a5';
        } else {
          circleFill = '#451a03';
          circleStroke = '#f59e0b';
          textColor = '#fde047';
        }
      }

      if (circle) {
        circle.setAttribute('fill', circleFill);
        circle.setAttribute('stroke', circleStroke);
        circle.setAttribute('stroke-width', strokeW);
        circle.setAttribute('r', isActive ? '8.5' : '6.5');
        circle.setAttribute('filter', isActive ? 'url(#hdGateGlow)' : 'none');
      }
      if (text) {
        text.setAttribute('fill', textColor);
        text.setAttribute('font-size', isActive ? '8' : '7');
      }
      pin.setAttribute('data-tooltip', `Tor ${g}: ${gateData.iChingName} (${gateData.keynote}) - ${isActive ? 'Aktiv' : 'Inaktiv'}`);
    }
  }
}

export function renderHdAgentResponse(promptKey: string): void {
  if (!activeHdChart) return;
  const resp = HumanDesignAgent.answerInquiry(activeHdChart, promptKey);

  const headline = document.getElementById('hdAgentRespHeadline');
  if (headline) headline.textContent = resp.headline;

  const analysis = document.getElementById('hdAgentRespAnalysis');
  if (analysis) analysis.textContent = resp.analysis;

  const protocol = document.getElementById('hdAgentRespProtocol');
  if (protocol) {
    protocol.innerHTML = resp.birkenbihlProtocol.map(step => `
      <li class="flex items-start gap-2">
        <span class="text-amber-400">✓</span>
        <span>${step}</span>
      </li>
    `).join('');
  }

  const mantra = document.getElementById('hdAgentRespMantra');
  if (mantra) mantra.textContent = resp.mantra;

  const practical = document.getElementById('hdAgentRespPractical');
  if (practical) {
    practical.innerHTML = `🎯 <strong>Sofort-Aktion:</strong> ${resp.practicalAction}`;
  }
}
