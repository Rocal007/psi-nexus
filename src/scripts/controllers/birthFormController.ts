/**
 * Birth Form & Profile Switcher Client Controller (Industrial Gold Standard)
 * Encapsulates geocoding autocomplete, profile switching, local storage sync, and DOM event coordination.
 */

import { geocodeCity } from '../../lib/geo/geocode';
import { saveClientProfile, getClientProfiles, getActiveProfile, clearActiveProfile, deleteClientProfile, type SavedProfile } from '../../lib/db/profileStore';

export function initBirthFormController(): void {
  const cityInput = document.getElementById('citySearch') as HTMLInputElement;
  const dropdown = document.getElementById('cityDropdown') as HTMLDivElement;
  const latInput = document.getElementById('latitude') as HTMLInputElement;
  const lngInput = document.getElementById('longitude') as HTMLInputElement;
  const tzInput = document.getElementById('timezone') as HTMLInputElement;

  const toggleFormBtn = document.getElementById('toggleFormBtn');
  const newProfileBtn = document.getElementById('newProfileBtn');
  const deleteCurrentProfileBtn = document.getElementById('deleteCurrentProfileBtn');
  const closeFormBtn = document.getElementById('closeFormBtn');
  const formContainer = document.getElementById('formContainer');
  const activeProfileSummaryCard = document.getElementById('activeProfileSummaryCard');
  const loader = document.getElementById('cosmicCalculationLoader');
  const form = document.getElementById('astroForm') as HTMLFormElement;

  loader?.addEventListener('click', () => {
    loader.classList.remove('opacity-100');
    loader.classList.add('opacity-0', 'pointer-events-none');
  });

  const savedProfilesBtn = document.getElementById('savedProfilesBtn');
  const savedProfilesMenu = document.getElementById('savedProfilesMenu');
  const savedProfilesList = document.getElementById('savedProfilesList');
  const profileCountBadge = document.getElementById('profileCountBadge');
  const formSavedProfilesBanner = document.getElementById('formSavedProfilesBanner');
  const formProfileCountText = document.getElementById('formProfileCountText');
  const formQuickProfilesList = document.getElementById('formQuickProfilesList');

  let debounceTimer: any = null;

  // Delete Profile Handler
  function handleDeleteProfile(pid: string, profileName: string) {
    const confirmed = window.confirm(`Möchtest du das Seelen-Profil "${profileName}" wirklich aus deiner lokalen Datenbank löschen?`);
    if (!confirmed) return;

    const active = getActiveProfile();
    const wasActive = active && active.id === pid;

    deleteClientProfile(pid);

    if (wasActive) {
      clearActiveProfile();
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
      openCreationMode();
    } else {
      renderSavedProfiles();
    }
  }

  // Open creation mode (resets form and reveals creation prompt)
  function openCreationMode() {
    const nameEl = document.getElementById('userName') as HTMLInputElement;
    if (nameEl) nameEl.value = '';
    const dateEl = document.getElementById('birthDate') as HTMLInputElement;
    if (dateEl) dateEl.value = '';
    const cityEl = document.getElementById('citySearch') as HTMLInputElement;
    if (cityEl) cityEl.value = '';

    activeProfileSummaryCard?.classList.add('hidden');
    formContainer?.classList.remove('hidden');
    closeFormBtn?.classList.add('hidden');

    const soulDossierContainer = document.getElementById('soulDossierContainer');
    if (soulDossierContainer) soulDossierContainer.classList.add('hidden');
    const questionSection = document.getElementById('question-section');
    if (questionSection) questionSection.classList.add('hidden');

    // Update hero prompt
    const heroWelcomePrompt = document.getElementById('heroWelcomePrompt');
    if (heroWelcomePrompt) heroWelcomePrompt.classList.remove('hidden');
    const heroActiveDetails = document.getElementById('heroActiveProfileDetails');
    if (heroActiveDetails) heroActiveDetails.classList.add('hidden');
    const heroPills = document.getElementById('heroIdentityPillsBar');
    if (heroPills) heroPills.classList.add('hidden');
    const heroDetails = document.getElementById('heroDetails');
    if (heroDetails) heroDetails.classList.add('hidden');
    const matrixPending = document.getElementById('matrixPendingBanner');
    if (matrixPending) matrixPending.classList.remove('hidden');
    const heroName = document.getElementById('heroName');
    if (heroName) heroName.innerHTML = '<span>Entschlüssle dein <span class="cosmic-gold-gradient">Kosmisches Seelenbuch</span></span>';

    formContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nameEl?.focus();
  }

  const unknownTimeCheckbox = document.getElementById('unknownTimeCheckbox') as HTMLInputElement;
  const unknownTimeNotice = document.getElementById('unknownTimeNotice');
  const birthTimeBadge = document.getElementById('birthTimeBadge');
  const birthTimeStandardHint = document.getElementById('birthTimeStandardHint');
  const birthTimeInput = document.getElementById('birthTime') as HTMLInputElement;
  let lastKnownTime = birthTimeInput?.value || '12:00';

  function setUnknownTimeState(isUnknown: boolean) {
    if (unknownTimeCheckbox) unknownTimeCheckbox.checked = isUnknown;
    if (isUnknown) {
      if (birthTimeInput) {
        if (birthTimeInput.value && birthTimeInput.value !== '12:00') {
          lastKnownTime = birthTimeInput.value;
        }
        birthTimeInput.value = '12:00';
        birthTimeInput.classList.add('opacity-50');
      }
      if (birthTimeBadge) {
        birthTimeBadge.textContent = '(12:00 Uhr Solar)';
        birthTimeBadge.className = 'text-[10px] text-amber-400 font-bold';
      }
      unknownTimeNotice?.classList.remove('hidden');
      birthTimeStandardHint?.classList.add('hidden');
    } else {
      if (birthTimeInput) {
        birthTimeInput.value = lastKnownTime || '12:00';
        birthTimeInput.classList.remove('opacity-50');
      }
      if (birthTimeBadge) {
        birthTimeBadge.textContent = '(Exakte Minute)';
        birthTimeBadge.className = 'text-[10px] text-cyan-400 font-bold';
      }
      unknownTimeNotice?.classList.add('hidden');
      birthTimeStandardHint?.classList.remove('hidden');
    }
  }

  unknownTimeCheckbox?.addEventListener('change', () => {
    setUnknownTimeState(unknownTimeCheckbox.checked);
  });

  // Sync form fields with active profile or URL params
  function syncFormWithActiveProfile() {
    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has('birthDate') || params.has('name');
    const active = hasParams ? getActiveProfile() : null;

    const dateEl = document.getElementById('birthDate') as HTMLInputElement;
    const timeEl = document.getElementById('birthTime') as HTMLInputElement;
    const nameEl = document.getElementById('userName') as HTMLInputElement;
    const houseEl = document.getElementById('houseSystem') as HTMLSelectElement;

    const birthDate = params.get('birthDate') || active?.birthDate || '';
    const birthTime = params.get('birthTime') || active?.birthTime || '12:00';
    const cityName = params.get('cityName') || active?.cityName || '';
    const lat = params.get('latitude') || active?.latitude?.toString() || '48.2082';
    const lng = params.get('longitude') || active?.longitude?.toString() || '16.3738';
    const tz = params.get('timezone') || active?.timezone || 'Europe/Vienna';
    const name = params.get('name') || active?.name || '';
    const houseSystem = params.get('houseSystem') || active?.houseSystem || 'placidus';
    const isUnknown = params.get('unknownTime') === 'true' || Boolean(active?.isUnknownTime);

    if (dateEl) dateEl.value = birthDate;
    if (timeEl) {
      timeEl.value = birthTime;
      lastKnownTime = birthTime;
    }
    if (cityInput) cityInput.value = cityName;
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
    if (tzInput) tzInput.value = tz;
    if (nameEl) nameEl.value = name;
    if (houseEl) houseEl.value = houseSystem;

    setUnknownTimeState(isUnknown);
  }

  // Toggle Form visibility
  function openForm() {
    syncFormWithActiveProfile();
    formContainer?.classList.remove('hidden');
    formContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeForm() {
    if (activeProfileSummaryCard && !activeProfileSummaryCard.classList.contains('hidden')) {
      formContainer?.classList.add('hidden');
    }
  }

  toggleFormBtn?.addEventListener('click', () => {
    if (formContainer?.classList.contains('hidden')) {
      openForm();
    } else {
      closeForm();
    }
  });

  newProfileBtn?.addEventListener('click', openCreationMode);
  closeFormBtn?.addEventListener('click', closeForm);

  deleteCurrentProfileBtn?.addEventListener('click', () => {
    const active = getActiveProfile();
    const currentName = active?.name || 'Aktuelles Profil';
    if (active) {
      handleDeleteProfile(active.id, currentName);
    } else {
      clearActiveProfile();
      openCreationMode();
    }
  });

  window.addEventListener('astro_open_profile_creator', openCreationMode);
  window.addEventListener('astro_active_profile_cleared', openCreationMode);
  window.addEventListener('astro_sync_form_inputs', syncFormWithActiveProfile);

  // Refresh Saved Profiles in UI
  function renderSavedProfiles() {
    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has('birthDate') || params.has('name');
    const profiles = getClientProfiles();
    const active = hasParams ? getActiveProfile() : null;
    const currentActiveId = active?.id;

    if (profileCountBadge) {
      profileCountBadge.textContent = profiles.length.toString();
    }
    if (formProfileCountText) {
      formProfileCountText.textContent = profiles.length.toString();
    }

    if (formSavedProfilesBanner && formQuickProfilesList) {
      if (profiles.length > 0) {
        formSavedProfilesBanner.classList.remove('hidden');
        formQuickProfilesList.innerHTML = profiles.slice(0, 5).map(p => `
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-xs shadow-sm transition-all">
            <button
              type="button"
              class="quick-saved-profile-btn flex items-center gap-1 cursor-pointer hover:text-white font-semibold"
              data-id="${p.id}"
              title="Profil ${p.name || ''} laden"
            >
              <span>👤</span>
              <span>${p.name || 'Profil'} (${p.birthDate.slice(0, 4)})</span>
            </button>
            <button
              type="button"
              class="quick-delete-profile-btn text-slate-400 hover:text-rose-400 p-0.5 rounded cursor-pointer text-xs ml-0.5"
              data-id="${p.id}"
              data-name="${p.name || 'Profil'}"
              title="Profil löschen"
            >
              ✕
            </button>
          </div>
        `).join('');

        formQuickProfilesList.querySelectorAll('.quick-saved-profile-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            const pid = target.dataset.id;
            const found = profiles.find(x => x.id === pid);
            if (found) {
              applyProfileValues(found);
            }
          });
        });

        formQuickProfilesList.querySelectorAll('.quick-delete-profile-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = e.currentTarget as HTMLElement;
            const pid = target.dataset.id;
            const pname = target.dataset.name || 'Profil';
            if (pid) handleDeleteProfile(pid, pname);
          });
        });
      } else {
        formSavedProfilesBanner.classList.add('hidden');
      }
    }

    if (savedProfilesList) {
      if (profiles.length === 0) {
        savedProfilesList.innerHTML = '<div class="px-3 py-2 text-xs text-slate-400">Keine weiteren Profile gespeichert.</div>';
        return;
      }

      savedProfilesList.innerHTML = profiles.map(p => `
        <div class="saved-profile-row w-full p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between gap-2 transition-all group">
          <button
            type="button"
            class="saved-profile-select-btn flex-1 text-left min-w-0 cursor-pointer"
            data-id="${p.id}"
            title="Dieses Profil auswählen"
          >
            <div class="font-bold text-white group-hover:text-amber-300 transition-colors truncate text-xs flex items-center gap-1.5">
              <span>👤</span>
              <span class="truncate">${p.name || 'Edle Seele'}</span>
              ${p.id === currentActiveId ? '<span class="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-normal shrink-0">Aktiv</span>' : ''}
            </div>
            <div class="text-[10px] text-slate-400 font-mono mt-0.5 truncate">${p.birthDate} ${p.isUnknownTime ? '(12h)' : '• ' + p.birthTime} • ${p.cityName}</div>
          </button>

          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="saved-profile-choose-btn text-amber-300 font-mono text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/30 border border-amber-500/20 transition-all cursor-pointer"
              data-id="${p.id}"
              title="Dieses Profil laden"
            >
              Laden ➔
            </button>
            <button
              type="button"
              class="saved-profile-delete-btn text-slate-400 hover:text-rose-300 hover:bg-rose-500/20 p-1.5 rounded-lg border border-transparent hover:border-rose-500/30 transition-all cursor-pointer text-xs"
              data-id="${p.id}"
              data-name="${p.name || 'Profil'}"
              title="Profil unwiderruflich löschen"
            >
              🗑️
            </button>
          </div>
        </div>
      `).join('');

      savedProfilesList.querySelectorAll('.saved-profile-select-btn, .saved-profile-choose-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const pid = target.dataset.id;
          const found = profiles.find(x => x.id === pid);
          if (found) {
            applyProfileValues(found);
            savedProfilesMenu?.classList.add('hidden');
          }
        });
      });

      savedProfilesList.querySelectorAll('.saved-profile-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const target = e.currentTarget as HTMLElement;
          const pid = target.dataset.id;
          const pname = target.dataset.name || 'Profil';
          if (pid) handleDeleteProfile(pid, pname);
        });
      });
    }

    // Populate Mode Select Panel (Tab 2: Profil auswählen)
    const selectPanelList = document.getElementById('selectPanelProfilesList');
    const selectPanelCount = document.getElementById('selectPanelProfileCount');
    const selectPanelNoHint = document.getElementById('selectPanelNoProfilesHint');

    if (selectPanelCount) selectPanelCount.textContent = profiles.length.toString();

    if (selectPanelList && selectPanelNoHint) {
      if (profiles.length === 0) {
        selectPanelList.innerHTML = '';
        selectPanelNoHint.classList.remove('hidden');
      } else {
        selectPanelNoHint.classList.add('hidden');
        selectPanelList.innerHTML = profiles.map(p => `
          <div class="p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-white/10 hover:border-amber-500/50 transition-all text-left space-y-2 group shadow-md flex flex-col justify-between">
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xl">👤</span>
                ${p.id === currentActiveId ? '<span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Aktives Profil</span>' : '<span class="text-[9px] font-mono text-slate-400">Gespeichert</span>'}
              </div>
              <div class="font-bold text-white group-hover:text-amber-300 text-sm transition-colors truncate">
                ${p.name || 'Edle Seele'}
              </div>
              <p class="text-[11px] text-slate-300 leading-snug">
                🗓️ ${p.birthDate} • ${p.isUnknownTime ? '12:00 Uhr (Solar)' : p.birthTime + ' Uhr'}<br>
                📍 ${p.cityName}
              </p>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
              <button
                type="button"
                class="select-panel-load-btn text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer flex items-center gap-1"
                data-id="${p.id}"
              >
                <span>Laden & Fragen ➔</span>
              </button>
              <button
                type="button"
                class="select-panel-delete-btn text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer text-xs"
                data-id="${p.id}"
                data-name="${p.name || 'Profil'}"
                title="Profil löschen"
              >
                🗑️
              </button>
            </div>
          </div>
        `).join('');

        selectPanelList.querySelectorAll('.select-panel-load-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            const pid = target.dataset.id;
            const found = profiles.find(x => x.id === pid);
            if (found) {
              applyProfileValues(found);
            }
          });
        });

        selectPanelList.querySelectorAll('.select-panel-delete-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = e.currentTarget as HTMLElement;
            const pid = target.dataset.id;
            const pname = target.dataset.name || 'Profil';
            if (pid) handleDeleteProfile(pid, pname);
          });
        });
      }
    }
  }

  // Toggle saved profiles dropdown
  savedProfilesBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    savedProfilesMenu?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!savedProfilesMenu?.contains(e.target as Node) && !savedProfilesBtn?.contains(e.target as Node)) {
      savedProfilesMenu?.classList.add('hidden');
    }
  });

  // Form Mode Tabs (1. Profil eingeben vs. 2. Profil auswählen)
  const tabModeEnter = document.getElementById('tabModeEnter');
  const tabModeSelect = document.getElementById('tabModeSelect');
  const panelModeEnter = document.getElementById('panelModeEnter');
  const panelModeSelect = document.getElementById('panelModeSelect');

  function setFormMode(mode: 'enter' | 'select') {
    if (mode === 'enter') {
      tabModeEnter?.classList.add('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'shadow-sm');
      tabModeEnter?.classList.remove('border-transparent', 'text-slate-400');
      tabModeSelect?.classList.remove('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'shadow-sm');
      tabModeSelect?.classList.add('border-transparent', 'text-slate-400');

      panelModeEnter?.classList.remove('hidden');
      panelModeSelect?.classList.add('hidden');
    } else {
      tabModeSelect?.classList.add('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'shadow-sm');
      tabModeSelect?.classList.remove('border-transparent', 'text-slate-400');
      tabModeEnter?.classList.remove('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'shadow-sm');
      tabModeEnter?.classList.add('border-transparent', 'text-slate-400');

      panelModeSelect?.classList.remove('hidden');
      panelModeEnter?.classList.add('hidden');
      renderSavedProfiles();
    }
  }

  tabModeEnter?.addEventListener('click', () => setFormMode('enter'));
  tabModeSelect?.addEventListener('click', () => setFormMode('select'));

  renderSavedProfiles();
  syncFormWithActiveProfile();
  window.addEventListener('astro_profiles_updated', renderSavedProfiles);

  // Apply values and calculate with cosmic loader
  function applyProfileValues(values: {
    birthDate: string;
    birthTime: string;
    isUnknownTime?: boolean;
    cityName: string;
    latitude: number;
    longitude: number;
    timezone: string;
    name: string;
    houseSystem: 'placidus' | 'equal';
  }) {
    if (loader) {
      loader.classList.remove('opacity-0', 'pointer-events-none');
      loader.classList.add('opacity-100');
    }

    saveClientProfile(values);

    const dateEl = document.getElementById('birthDate') as HTMLInputElement;
    const timeEl = document.getElementById('birthTime') as HTMLInputElement;
    const nameEl = document.getElementById('userName') as HTMLInputElement;
    const houseEl = document.getElementById('houseSystem') as HTMLSelectElement;
    if (dateEl) dateEl.value = values.birthDate;
    if (timeEl) timeEl.value = values.birthTime;
    if (cityInput) cityInput.value = values.cityName;
    if (latInput) latInput.value = values.latitude.toString();
    if (lngInput) lngInput.value = values.longitude.toString();
    if (tzInput) tzInput.value = values.timezone;
    if (nameEl) nameEl.value = values.name;
    if (houseEl) houseEl.value = values.houseSystem;

    setUnknownTimeState(Boolean(values.isUnknownTime));

    const summaryName = document.getElementById('summaryPersonName');
    const summaryDetails = document.getElementById('summaryDetails');
    const summaryInitials = document.getElementById('summaryInitials');
    if (summaryName) summaryName.textContent = values.name || 'Edle Seele';
    if (summaryInitials) summaryInitials.textContent = values.name ? values.name.charAt(0).toUpperCase() : '✦';
    if (summaryDetails) {
      const timeDisplay = values.isUnknownTime ? 'Solar 12:00 Uhr (Zeit unb.)' : `${values.birthTime} Uhr`;
      summaryDetails.innerHTML = `<span>🗓️ ${values.birthDate}, ${timeDisplay}</span><span>•</span><span>📍 ${values.cityName}</span><span>•</span><span class="text-amber-300 font-mono">(${values.houseSystem})</span>`;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('birthDate', values.birthDate);
    url.searchParams.set('birthTime', values.birthTime);
    url.searchParams.set('cityName', values.cityName);
    url.searchParams.set('latitude', values.latitude.toString());
    url.searchParams.set('longitude', values.longitude.toString());
    url.searchParams.set('timezone', values.timezone);
    url.searchParams.set('houseSystem', values.houseSystem);
    if (values.isUnknownTime) {
      url.searchParams.set('unknownTime', 'true');
    } else {
      url.searchParams.delete('unknownTime');
    }
    if (values.name) {
      url.searchParams.set('name', values.name);
    } else {
      url.searchParams.delete('name');
    }
    window.history.replaceState({}, '', url.toString());

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('astro_recalculate_chart', { detail: values }));
      if (loader) {
        loader.classList.remove('opacity-100');
        loader.classList.add('opacity-0', 'pointer-events-none');
      }
      activeProfileSummaryCard?.classList.remove('hidden');
      closeFormBtn?.classList.remove('hidden');
      formContainer?.classList.add('hidden');
      activeProfileSummaryCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 450);

    setTimeout(() => {
      if (loader && !loader.classList.contains('opacity-0')) {
        loader.classList.remove('opacity-100');
        loader.classList.add('opacity-0', 'pointer-events-none');
      }
    }, 1200);
  }

  // Submit handler
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateEl = document.getElementById('birthDate') as HTMLInputElement;
    const timeEl = document.getElementById('birthTime') as HTMLInputElement;
    const nameEl = document.getElementById('userName') as HTMLInputElement;
    const houseEl = document.getElementById('houseSystem') as HTMLSelectElement;

    const isUnknown = unknownTimeCheckbox ? unknownTimeCheckbox.checked : false;
    const rawTime = timeEl?.value?.trim() || '';
    let birthTime = isUnknown ? '12:00' : (rawTime || '12:00');
    if (!isUnknown && birthTime.length === 4 && birthTime[1] === ':') {
      birthTime = '0' + birthTime;
    }

    applyProfileValues({
      birthDate: dateEl?.value || '1990-05-15',
      birthTime: birthTime,
      isUnknownTime: isUnknown,
      cityName: cityInput?.value || 'Wien',
      latitude: parseFloat(latInput?.value || '48.2082'),
      longitude: parseFloat(lngInput?.value || '16.3738'),
      timezone: tzInput?.value || 'Europe/Vienna',
      name: nameEl?.value || '',
      houseSystem: (houseEl?.value === 'equal' ? 'equal' : 'placidus') as any
    });
  });

  // City Autocomplete handling
  if (cityInput && dropdown) {
    cityInput.addEventListener('input', () => {
      const q = cityInput.value.trim();
      if (q.length < 2) {
        dropdown.classList.add('hidden');
        return;
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const results = await geocodeCity(q);
        if (results.length === 0) {
          dropdown.classList.add('hidden');
          return;
        }

        dropdown.innerHTML = results.map(city => `
          <button
            type="button"
            class="city-option w-full text-left px-4 py-2.5 hover:bg-amber-500/20 hover:text-amber-200 text-slate-200 text-xs flex items-center justify-between border-b border-white/5 last:border-0 transition-colors cursor-pointer"
            data-name="${city.name}"
            data-lat="${city.lat}"
            data-lng="${city.lng}"
            data-tz="${city.timezone}"
          >
            <span class="font-medium">${city.name}</span>
            <span class="text-slate-400 text-[11px]">${city.country}</span>
          </button>
        `).join('');

        dropdown.classList.remove('hidden');

        dropdown.querySelectorAll('.city-option').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const target = e.currentTarget as HTMLElement;
            cityInput.value = target.dataset.name || '';
            latInput.value = target.dataset.lat || '48.2082';
            lngInput.value = target.dataset.lng || '16.3738';
            tzInput.value = target.dataset.tz || 'Europe/Vienna';
            dropdown.classList.add('hidden');
          });
        });
      }, 200);
    });

    document.addEventListener('click', (e) => {
      if (!cityInput.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  // Presets handling
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const dateEl = document.getElementById('birthDate') as HTMLInputElement;
      const timeEl = document.getElementById('birthTime') as HTMLInputElement;
      const nameEl = document.getElementById('userName') as HTMLInputElement;

      if (dateEl) dateEl.value = target.dataset.date || '';
      if (timeEl) timeEl.value = target.dataset.time || '';
      if (cityInput) cityInput.value = target.dataset.city || '';
      if (latInput) latInput.value = target.dataset.lat || '';
      if (lngInput) lngInput.value = target.dataset.lng || '';
      if (tzInput) tzInput.value = target.dataset.tz || '';
      if (nameEl) nameEl.value = target.dataset.name || '';

      applyProfileValues({
        birthDate: target.dataset.date || '1990-05-15',
        birthTime: target.dataset.time || '14:30',
        isUnknownTime: false,
        cityName: target.dataset.city || 'Wien',
        latitude: parseFloat(target.dataset.lat || '48.2082'),
        longitude: parseFloat(target.dataset.lng || '16.3738'),
        timezone: target.dataset.tz || 'Europe/Vienna',
        name: target.dataset.name || '',
        houseSystem: 'placidus'
      });
    });
  });
}
