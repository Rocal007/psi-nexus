/**
 * Tab Navigation & Client Recalculation Controller
 * Coordinates folder tabs, stepper journey, identity pills, live calculations and custom event handling.
 */

import { generateNatalChart, type ChartInput } from '../../lib/astrology/engine';
import { updateDomWithChart } from '../liveEngine';
import { getActiveProfile } from '../../lib/db/profileStore';

export function initTabNavigation(): void {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const stepButtons = document.querySelectorAll('.soul-step-btn');
  const panels = document.querySelectorAll('.tab-content-panel');
  const navButtons = document.querySelectorAll('.tab-nav-btn');
  const heroPills = document.querySelectorAll('.hero-identity-pill');

  function getDynamicScrollOffset(): number {
    const header = document.querySelector('header');
    const folderTabs = document.getElementById('folderTabsContainer');
    let totalOffset = 0;
    if (header) {
      totalOffset += header.offsetHeight;
    }
    if (folderTabs) {
      totalOffset += folderTabs.offsetHeight;
    }
    // Add 32px safety buffer so headers, badges, borders and subtitles are 100% visible and unclipped
    return Math.max(190, totalOffset + 32);
  }

  function scrollToTarget(el: HTMLElement | null, extraOffset = 0) {
    if (!el) return;
    requestAnimationFrame(() => {
      const offset = getDynamicScrollOffset() + extraOffset;
      const rect = el.getBoundingClientRect();
      const targetTop = window.pageYOffset + rect.top - offset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });
    });
  }

  function switchTab(targetId: string, shouldScroll = true, subTargetId = '') {
    // Update FolderTabs
    tabButtons.forEach(btn => {
      const btnTarget = btn.getAttribute('data-tab-target');
      if (btnTarget === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Stepper buttons
    stepButtons.forEach(btn => {
      const btnTarget = btn.getAttribute('data-step-target');
      if (btnTarget === targetId) {
        btn.classList.add('scale-[1.02]');
      } else {
        btn.classList.remove('scale-[1.02]');
      }
    });

    // Show/Hide Panels
    panels.forEach(panel => {
      if (targetId === 'all') {
        panel.classList.add('active');
      } else {
        if (panel.id === `panel-${targetId}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      }
    });

    // Smooth scroll to relevant content with full readability & zero overflow clipping
    if (shouldScroll) {
      setTimeout(() => {
        if (subTargetId) {
          const subEl = document.getElementById(subTargetId);
          if (subEl) {
            scrollToTarget(subEl, 0);
            return;
          }
        }

        if (targetId === 'all') {
          const folderTabs = document.getElementById('folderTabsContainer');
          scrollToTarget(folderTabs, 0);
        } else {
          const activePanel = document.getElementById(`panel-${targetId}`);
          const folderTabs = document.getElementById('folderTabsContainer');
          if (activePanel) {
            scrollToTarget(activePanel, 0);
          } else if (folderTabs) {
            scrollToTarget(folderTabs, 0);
          }
        }
      }, 60);
    }
  }

  // Folder Tab Buttons Click
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-target') || 'radix';
      switchTab(target, true);
    });
  });

  // Stepper Journey Buttons Click
  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-step-target') || 'radix';
      switchTab(target, true);
    });
  });

  // Next / Previous Gate Navigation Buttons Click
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-switch-to') || 'radix';
      switchTab(target, true);
    });
  });

  // Hero Identity Pills Click (Instant jump to gate or angle)
  heroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const gate = pill.getAttribute('data-pill-gate') || 'radix';
      const subtarget = pill.getAttribute('data-pill-subtarget') || '';
      switchTab(gate, true, subtarget);
    });
  });

  // Header Active Person summary badge click -> smooth scroll to personality summary
  const headerPersonBadge = document.getElementById('headerActivePersonBadge');
  headerPersonBadge?.addEventListener('click', (e) => {
    e.preventDefault();
    const summarySection = document.getElementById('personalitySummarySection');
    if (summarySection) {
      scrollToTarget(summarySection, 120);
    }
  });

  // Header Birkenbihl link click -> smooth scroll to decoder
  const decoderHeaderLink = document.getElementById('decoderToggleHeader');
  decoderHeaderLink?.addEventListener('click', (e) => {
    e.preventDefault();
    const decoderEl = document.getElementById('birkenbihlDecoderWidget');
    if (decoderEl) {
      scrollToTarget(decoderEl, 120);
    }
  });
}

export function runLiveCalculation(): void {
  const dateEl = document.getElementById('birthDate') as HTMLInputElement;
  const timeEl = document.getElementById('birthTime') as HTMLInputElement;
  const cityEl = document.getElementById('citySearch') as HTMLInputElement;
  const latEl = document.getElementById('latitude') as HTMLInputElement;
  const lngEl = document.getElementById('longitude') as HTMLInputElement;
  const tzEl = document.getElementById('timezone') as HTMLInputElement;
  const nameEl = document.getElementById('userName') as HTMLInputElement;
  const sysEl = document.getElementById('houseSystem') as HTMLSelectElement;

  if (!dateEl || !timeEl) return;

  const input: ChartInput = {
    birthDate: dateEl.value || '1990-05-15',
    birthTime: timeEl.value || '14:30',
    cityName: cityEl?.value || 'Wien',
    latitude: parseFloat(latEl?.value || '48.2082'),
    longitude: parseFloat(lngEl?.value || '16.3738'),
    timezone: tzEl?.value || 'Europe/Vienna',
    name: nameEl?.value || '',
    houseSystem: (sysEl?.value === 'equal' ? 'equal' : 'placidus') as 'placidus' | 'equal'
  };

  const chart = generateNatalChart(input);
  updateDomWithChart(chart);

  // Update URL without full page reload
  const url = new URL(window.location.href);
  url.searchParams.set('birthDate', input.birthDate);
  url.searchParams.set('birthTime', input.birthTime);
  url.searchParams.set('cityName', input.cityName);
  url.searchParams.set('latitude', input.latitude.toString());
  url.searchParams.set('longitude', input.longitude.toString());
  url.searchParams.set('timezone', input.timezone);
  url.searchParams.set('houseSystem', input.houseSystem || 'placidus');
  if (input.name) url.searchParams.set('name', input.name);
  else url.searchParams.delete('name');
  window.history.replaceState({}, '', url.toString());
}

export function initTabController(): void {
  const setup = () => {
    initTabNavigation();

    // Check if URL parameters exist or if an active profile is stored in DB/localStorage
    const params = new URLSearchParams(window.location.search);
    const activeProfile = getActiveProfile();

    if (params.has('birthDate') || params.has('name')) {
      const initialInput: ChartInput = {
        birthDate: params.get('birthDate') || '1991-05-05',
        birthTime: params.get('birthTime') || '13:00',
        cityName: params.get('cityName') || 'Wien',
        latitude: parseFloat(params.get('latitude') || '48.2082'),
        longitude: parseFloat(params.get('longitude') || '16.3738'),
        timezone: params.get('timezone') || 'Europe/Vienna',
        name: params.get('name') || '',
        houseSystem: (params.get('houseSystem') === 'equal' ? 'equal' : 'placidus') as any
      };
      const chart = generateNatalChart(initialInput);
      updateDomWithChart(chart);
    } else {
      // App is opened fresh without a profile: ensure creation form is open and start page is clean
      const formContainer = document.getElementById('formContainer');
      if (formContainer) formContainer.classList.remove('hidden');
      const summaryCard = document.getElementById('activeProfileSummaryCard');
      if (summaryCard) summaryCard.classList.add('hidden');
      const questionSection = document.getElementById('question-section');
      if (questionSection) questionSection.classList.add('hidden');
      const soulDossierContainer = document.getElementById('soulDossierContainer');
      if (soulDossierContainer) soulDossierContainer.classList.add('hidden');
    }

    window.addEventListener('astro_recalculate_chart', (e: any) => {
      const input: ChartInput = e.detail;
      if (input) {
        const chart = generateNatalChart(input);
        updateDomWithChart(chart);
      }
    });

    const form = document.getElementById('astroForm') || document.getElementById('birthForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        runLiveCalculation();
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}
