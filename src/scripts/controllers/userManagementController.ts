/**
 * User Management & Authentication Client Controller (Industrial Gold Standard)
 * Handles client-side user administration, SQLite sync, session logins, search/filtering, and DSGVO export/import.
 */

import { UserManagementAgent } from '../../lib/db/userManagementAgent';
import { getClientProfiles, getActiveProfile, type SavedProfile } from '../../lib/db/profileStore';
import { searchCities } from '../../lib/geo/cities';

export function initUserManagementController(): void {
  const modal = document.getElementById('userManagementModal');
  const container = document.getElementById('userModalContainer');
  const backdrop = document.getElementById('userModalBackdrop');
  const closeBtn = document.getElementById('btnCloseUserModal');
  const syncBtn = document.getElementById('btnModalSyncBackend');
  const syncSpinner = document.getElementById('syncSpinner');
  const syncStatusText = document.getElementById('syncStatusText');

  // Login Elements
  const btnToggleLogin = document.getElementById('btnToggleLoginSection');
  const loginSection = document.getElementById('userManagerLoginSection');
  const btnCancelLogin = document.getElementById('btnCancelLoginForm');
  const loginBtnIcon = document.getElementById('loginBtnIcon');
  const loginBtnText = document.getElementById('loginBtnText');
  const loginActiveSessionBanner = document.getElementById('loginActiveSessionBanner');
  const loginSessionUserName = document.getElementById('loginSessionUserName');
  const loginSessionRole = document.getElementById('loginSessionRole');
  const btnLogoutUser = document.getElementById('btnLogoutUser');
  const loginProfileSelect = document.getElementById('loginProfileSelect') as HTMLSelectElement;
  const btnLoginSelectProfile = document.getElementById('btnLoginSelectProfile');
  const loginCredentialsForm = document.getElementById('loginCredentialsForm') as HTMLFormElement;
  const loginEmailOrName = document.getElementById('loginEmailOrName') as HTMLInputElement;
  const loginPin = document.getElementById('loginPin') as HTMLInputElement;

  // User Form Elements
  const toggleFormBtn = document.getElementById('btnToggleAddUserForm');
  const formSection = document.getElementById('userManagerFormSection');
  const form = document.getElementById('userManagerForm') as HTMLFormElement;
  const cancelFormBtn = document.getElementById('btnCancelUserForm');
  const formHeaderTitle = document.getElementById('formHeaderTitle');
  const formSubmitBtnText = document.getElementById('formSubmitBtnText');

  const formUserId = document.getElementById('formUserId') as HTMLInputElement;
  const formUserName = document.getElementById('formUserName') as HTMLInputElement;
  const formUserRole = document.getElementById('formUserRole') as HTMLSelectElement;
  const formUserTags = document.getElementById('formUserTags') as HTMLInputElement;
  const formUserBirthDate = document.getElementById('formUserBirthDate') as HTMLInputElement;
  const formUserBirthTime = document.getElementById('formUserBirthTime') as HTMLInputElement;
  const formUserUnknownTime = document.getElementById('formUserUnknownTime') as HTMLInputElement;
  const formUserCity = document.getElementById('formUserCity') as HTMLInputElement;
  const formUserHouseSystem = document.getElementById('formUserHouseSystem') as HTMLSelectElement;
  const formUserNotes = document.getElementById('formUserNotes') as HTMLInputElement;

  // Search and Filter Elements
  const searchInput = document.getElementById('userSearchInput') as HTMLInputElement;
  const filterSunSign = document.getElementById('userFilterSunSign') as HTMLSelectElement;
  const filterRole = document.getElementById('userFilterRole') as HTMLSelectElement;

  const usersList = document.getElementById('usersListContainer');
  const emptyState = document.getElementById('usersEmptyState');

  const statTotalUsers = document.getElementById('statTotalUsers');
  const statActiveUser = document.getElementById('statActiveUser');
  const statElements = document.getElementById('statElements');

  const btnExportJson = document.getElementById('btnExportJson');
  const btnExportCsv = document.getElementById('btnExportCsv');
  const inputImportJson = document.getElementById('inputImportJson') as HTMLInputElement;

  let backendProfilesCache: SavedProfile[] = [];

  function updateAuthStatusUI() {
    const session = UserManagementAgent.getAuthSession();
    const active = getActiveProfile();

    if (session) {
      if (loginBtnIcon) loginBtnIcon.textContent = '👤';
      if (loginBtnText) loginBtnText.textContent = session.userName;
      if (loginActiveSessionBanner) loginActiveSessionBanner.classList.remove('hidden');
      if (loginSessionUserName) loginSessionUserName.textContent = session.userName;
      if (loginSessionRole) loginSessionRole.textContent = session.role.toUpperCase();
    } else if (active) {
      if (loginBtnIcon) loginBtnIcon.textContent = '👤';
      if (loginBtnText) loginBtnText.textContent = active.name;
      if (loginActiveSessionBanner) loginActiveSessionBanner.classList.remove('hidden');
      if (loginSessionUserName) loginSessionUserName.textContent = active.name;
      if (loginSessionRole) loginSessionRole.textContent = (active.role || 'Klient').toUpperCase();
    } else {
      if (loginBtnIcon) loginBtnIcon.textContent = '🔑';
      if (loginBtnText) loginBtnText.textContent = 'Einloggen';
      if (loginActiveSessionBanner) loginActiveSessionBanner.classList.add('hidden');
    }
  }

  function openModal() {
    if (!modal || !container) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
    updateAuthStatusUI();
    loadAndRenderUsers();
  }

  function closeModal() {
    if (!modal || !container) return;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
    document.body.style.overflow = '';
    hideForm();
    hideLogin();
  }

  function toggleLoginSection() {
    if (!loginSection) return;
    if (loginSection.classList.contains('hidden')) {
      loginSection.classList.remove('hidden');
      hideForm();
      populateLoginProfileDropdown();
      loginSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      hideLogin();
    }
  }

  function hideLogin() {
    if (!loginSection) return;
    loginSection.classList.add('hidden');
  }

  function populateLoginProfileDropdown() {
    if (!loginProfileSelect) return;
    const profiles = getClientProfiles();
    const active = getActiveProfile();

    loginProfileSelect.innerHTML = '<option value="">-- Profil auswählen --</option>' + 
      profiles.map(p => `
        <option value="${p.id}" ${active?.id === p.id ? 'selected' : ''}>
          ${p.name} (${p.birthDate} • ${p.cityName}) ${p.sunSign ? '☉ ' + p.sunSign : ''}
        </option>
      `).join('');
  }

  function showForm(isEdit = false, user?: any) {
    if (!formSection) return;
    hideLogin();
    formSection.classList.remove('hidden');
    if (isEdit && user) {
      if (formHeaderTitle) formHeaderTitle.innerHTML = `<span>✏️</span><span>Profil bearbeiten: ${user.name}</span>`;
      if (formSubmitBtnText) formSubmitBtnText.textContent = 'Änderungen speichern';
      formUserId.value = user.id;
      formUserName.value = user.name || '';
      formUserRole.value = user.role || 'client';
      formUserTags.value = user.tags || '';
      formUserBirthDate.value = user.birthDate || '';
      formUserBirthTime.value = user.birthTime || '12:00';
      formUserUnknownTime.checked = Boolean(user.isUnknownTime);
      formUserCity.value = user.cityName || '';
      formUserHouseSystem.value = user.houseSystem || 'placidus';
      formUserNotes.value = user.notes || '';
    } else {
      if (formHeaderTitle) formHeaderTitle.innerHTML = `<span>✨</span><span>Neues Seelen-Profil anlegen (SQLite Backend)</span>`;
      if (formSubmitBtnText) formSubmitBtnText.textContent = 'Profil im Backend speichern';
      form.reset();
      formUserId.value = '';
      formUserBirthTime.value = '12:00';
    }
    formSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideForm() {
    if (!formSection) return;
    formSection.classList.add('hidden');
    form.reset();
    formUserId.value = '';
  }

  async function loadAndRenderUsers() {
    const q = searchInput?.value || '';
    const sun = filterSunSign?.value || '';
    const rol = filterRole?.value || '';

    const serverUsers = await UserManagementAgent.fetchBackendUsers({
      query: q,
      sunSign: sun,
      role: rol
    });

    const localProfiles = getClientProfiles();
    const active = getActiveProfile();

    const usersToRender: SavedProfile[] = serverUsers.length > 0 ? serverUsers : localProfiles.map(p => ({
      ...p,
      role: p.role || 'client',
      tags: p.tags || '',
      notes: p.notes || '',
      email: p.email || '',
      updatedAt: p.updatedAt || new Date().toISOString()
    }));

    backendProfilesCache = usersToRender;

    // Render Stats
    const summary = UserManagementAgent.getClusterSummary();
    if (statTotalUsers) statTotalUsers.textContent = usersToRender.length.toString();
    if (statActiveUser) statActiveUser.textContent = active?.name || 'Keines';
    if (statElements) {
      statElements.innerHTML = `
        <span class="text-red-400 font-bold" title="Feuer">F:${summary.elementalBreakdown.fire}</span>
        <span class="text-emerald-400 font-bold" title="Erde">E:${summary.elementalBreakdown.earth}</span>
        <span class="text-cyan-300 font-bold" title="Luft">L:${summary.elementalBreakdown.air}</span>
        <span class="text-blue-400 font-bold" title="Wasser">W:${summary.elementalBreakdown.water}</span>
      `;
    }

    updateAuthStatusUI();
    populateLoginProfileDropdown();

    if (!usersList || !emptyState) return;

    if (usersToRender.length === 0) {
      usersList.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    const activeId = active?.id;

    usersList.innerHTML = usersToRender.map(u => {
      const isActive = u.id === activeId;
      const initial = u.name ? u.name.charAt(0).toUpperCase() : '✦';
      const roleBadge = u.role === 'admin' 
        ? '<span class="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-mono uppercase">Admin</span>'
        : u.role === 'member'
          ? '<span class="px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9px] font-mono uppercase">Partner</span>'
          : u.role === 'family'
            ? '<span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono uppercase">Familie</span>'
            : '<span class="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[9px] font-mono uppercase">Klient</span>';

      return `
        <div class="user-row p-3.5 sm:p-4 hover:bg-white/[0.04] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group ${isActive ? 'bg-amber-500/[0.07] border-l-4 border-amber-400' : ''}" data-user-id="${u.id}">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="w-10 h-10 rounded-2xl ${isActive ? 'bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-white/10 text-amber-300'} flex items-center justify-center font-bold text-base shrink-0">
              ${initial}
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  ${u.name}
                </h4>
                ${roleBadge}
                ${isActive ? '<span class="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-black tracking-wider uppercase shadow-sm">★ AKTIV / EINGELOGGT</span>' : ''}
              </div>

              <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 flex-wrap">
                <span>📅 ${u.birthDate} (${u.birthTime || '12:00'})</span>
                <span>•</span>
                <span>📍 ${u.cityName || 'Unbekannt'}</span>
                ${u.sunSign ? `<span class="text-amber-300 font-medium">☉ ${u.sunSign}</span>` : ''}
                ${u.lifePathNumber ? `<span class="text-purple-300 font-mono">🔢 LW ${u.lifePathNumber}</span>` : ''}
              </div>

              ${u.tags ? `<div class="text-[10px] text-slate-500 mt-0.5 truncate">🏷️ ${u.tags}</div>` : ''}
            </div>
          </div>

          <div class="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              class="btn-activate-user px-3 py-1.5 rounded-xl ${isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'} text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              data-user-id="${u.id}"
              title="Dieses Seelen-Profil als aktives Chart laden und einloggen"
            >
              <span>${isActive ? '✓ Aktiv' : '⚡ Einloggen'}</span>
            </button>

            <button
              type="button"
              class="btn-synastry-user px-2.5 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all cursor-pointer"
              data-user-id="${u.id}"
              title="In Partner-Synastrie vergleichen"
            >
              <span>💞 Synastrie</span>
            </button>

            <button
              type="button"
              class="btn-edit-user p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition-all cursor-pointer"
              data-user-id="${u.id}"
              title="Profil bearbeiten"
            >
              ✏️
            </button>

            <button
              type="button"
              class="btn-delete-user p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 text-xs transition-all cursor-pointer"
              data-user-id="${u.id}"
              data-user-name="${u.name}"
              title="Profil löschen"
            >
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');

    usersList.querySelectorAll('.btn-activate-user').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const uid = (e.currentTarget as HTMLElement).getAttribute('data-user-id');
        if (uid) {
          await UserManagementAgent.login({ profileId: uid });
          closeModal();
          window.location.reload();
        }
      });
    });

    usersList.querySelectorAll('.btn-synastry-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uid = (e.currentTarget as HTMLElement).getAttribute('data-user-id');
        if (uid) {
          closeModal();
          const synTab = document.querySelector('.tab-btn[data-tab-target="synastry"]') as HTMLElement;
          if (synTab) synTab.click();
          const selB = document.getElementById('synastryPartnerBSelect') as HTMLSelectElement;
          if (selB) {
            selB.value = uid;
            selB.dispatchEvent(new Event('change'));
          }
        }
      });
    });

    usersList.querySelectorAll('.btn-edit-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const uid = (e.currentTarget as HTMLElement).getAttribute('data-user-id');
        const user = backendProfilesCache.find(u => u.id === uid);
        if (user) {
          showForm(true, user);
        }
      });
    });

    usersList.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const uid = (e.currentTarget as HTMLElement).getAttribute('data-user-id');
        const uname = (e.currentTarget as HTMLElement).getAttribute('data-user-name') || 'dieses Profil';
        if (uid && window.confirm(`Möchtest du das Seelen-Profil "${uname}" wirklich unwiderruflich aus SQLite und dem lokalen Speicher löschen?`)) {
          UserManagementAgent.removeProfile(uid);
          await UserManagementAgent.deleteFromBackend(uid);
          loadAndRenderUsers();
        }
      });
    });
  }

  btnToggleLogin?.addEventListener('click', toggleLoginSection);
  btnCancelLogin?.addEventListener('click', hideLogin);

  btnLoginSelectProfile?.addEventListener('click', async () => {
    const pid = loginProfileSelect?.value;
    if (!pid) {
      alert('Bitte wähle ein Profil aus.');
      return;
    }
    const res = await UserManagementAgent.login({ profileId: pid });
    if (res.success) {
      hideLogin();
      closeModal();
      window.location.reload();
    } else {
      alert(res.error || 'Login fehlgeschlagen');
    }
  });

  loginCredentialsForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailOrName = loginEmailOrName?.value.trim();
    const pin = loginPin?.value.trim();

    const res = await UserManagementAgent.login({ emailOrName, pin });
    if (res.success) {
      hideLogin();
      closeModal();
      window.location.reload();
    } else {
      alert(res.error || 'Anmeldung fehlgeschlagen: Kein passendes Profil gefunden.');
    }
  });

  btnLogoutUser?.addEventListener('click', () => {
    UserManagementAgent.logout();
    updateAuthStatusUI();
    loadAndRenderUsers();
    if (syncStatusText) syncStatusText.textContent = 'Abgemeldet';
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityQuery = formUserCity.value.trim();
    const geoMatches = searchCities(cityQuery);
    const geo = geoMatches.length > 0 ? geoMatches[0] : { lat: 48.2082, lng: 16.3738, timezone: 'Europe/Vienna' };

    const uid = formUserId.value.trim() || undefined;
    const profileData = {
      id: uid,
      name: formUserName.value.trim(),
      role: formUserRole.value as any,
      tags: formUserTags.value.trim(),
      notes: formUserNotes.value.trim(),
      birthDate: formUserBirthDate.value.trim(),
      birthTime: formUserUnknownTime.checked ? '12:00' : formUserBirthTime.value.trim(),
      isUnknownTime: formUserUnknownTime.checked,
      cityName: formUserCity.value.trim(),
      latitude: geo.lat,
      longitude: geo.lng,
      timezone: geo.timezone || 'Europe/Vienna',
      houseSystem: formUserHouseSystem.value as any
    };

    try {
      UserManagementAgent.upsertProfile(profileData);
      await UserManagementAgent.saveToBackend(profileData);
      hideForm();
      loadAndRenderUsers();
      if (syncStatusText) syncStatusText.textContent = `Gespeichert in SQLite (${new Date().toLocaleTimeString()})`;
    } catch (err: any) {
      alert(`Fehler beim Speichern: ${err.message}`);
    }
  });

  syncBtn?.addEventListener('click', async () => {
    if (syncSpinner) syncSpinner.classList.add('animate-spin');
    if (syncStatusText) syncStatusText.textContent = 'Synchronisiere mit SQLite Backend...';

    const result = await UserManagementAgent.syncWithBackend();

    if (syncSpinner) syncSpinner.classList.remove('animate-spin');

    if (result.success) {
      if (syncStatusText) syncStatusText.textContent = `Erfolgreich synchronisiert (${result.syncedCount} Profile) um ${new Date().toLocaleTimeString()}`;
      loadAndRenderUsers();
    } else {
      if (syncStatusText) syncStatusText.textContent = `Sync-Hinweis: ${result.error || 'Fehler'}`;
    }
  });

  toggleFormBtn?.addEventListener('click', () => {
    if (formSection?.classList.contains('hidden')) {
      showForm(false);
    } else {
      hideForm();
    }
  });

  cancelFormBtn?.addEventListener('click', hideForm);

  searchInput?.addEventListener('input', () => loadAndRenderUsers());
  filterSunSign?.addEventListener('change', () => loadAndRenderUsers());
  filterRole?.addEventListener('change', () => loadAndRenderUsers());

  btnExportJson?.addEventListener('click', () => UserManagementAgent.triggerExportDownload('json'));
  btnExportCsv?.addEventListener('click', () => UserManagementAgent.triggerExportDownload('csv'));

  inputImportJson?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const res = await UserManagementAgent.uploadImportFile(file);
      if (res.success) {
        alert(`Erfolg: ${res.importedCount} Profile importiert.`);
        loadAndRenderUsers();
      } else {
        alert(`Import fehlgeschlagen: ${(res.errors || []).join(', ')}`);
      }
      (e.target as HTMLInputElement).value = '';
    }
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal?.classList.contains('opacity-0')) {
      closeModal();
    }
  });

  window.addEventListener('astro_open_user_manager', openModal);
  window.addEventListener('astro_open_login', () => {
    openModal();
    toggleLoginSection();
  });
  window.addEventListener('astro_profiles_updated', () => {
    if (!modal?.classList.contains('opacity-0')) {
      loadAndRenderUsers();
    }
  });
  window.addEventListener('astro_user_logged_in', () => {
    updateAuthStatusUI();
  });
  window.addEventListener('astro_user_logged_out', () => {
    updateAuthStatusUI();
  });
}
