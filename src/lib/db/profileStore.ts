// Client-Side Profile & Local Database Synchronization Store

export interface SavedProfile {
  id: string;
  name: string;
  email?: string;
  role?: 'admin' | 'member' | 'client' | 'family' | 'guest';
  tags?: string;
  notes?: string;
  birthDate: string;
  birthTime: string;
  isUnknownTime?: boolean;
  cityName: string;
  latitude: number;
  longitude: number;
  timezone: string;
  houseSystem: 'placidus' | 'equal';
  sunSign?: string;
  moonSign?: string;
  ascendantSign?: string;
  lifePathNumber?: number;
  updatedAt: string;
}

const STORAGE_KEY = 'astro_nexus_saved_profiles_v1';
const CURRENT_ID_KEY = 'astro_nexus_current_profile_id';

export function getClientProfiles(): SavedProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading profiles from storage', e);
    return [];
  }
}

export function normalizeTimeString(timeStr?: string, isUnknown?: boolean): string {
  if (isUnknown) return '12:00';
  if (!timeStr || !timeStr.trim()) return '12:00';
  const clean = timeStr.trim();
  const parts = clean.split(':');
  if (parts.length >= 2) {
    const hours = parts[0].padStart(2, '0');
    const minutes = parts[1].padStart(2, '0').slice(0, 2);
    return `${hours}:${minutes}`;
  }
  return clean;
}

export function saveClientProfile(profile: Omit<SavedProfile, 'id' | 'updatedAt'> & { id?: string }): SavedProfile {
  const normalizedTime = normalizeTimeString(profile.birthTime, profile.isUnknownTime);
  const now = new Date().toISOString();

  if (typeof window === 'undefined') {
    return {
      ...profile,
      birthTime: normalizedTime,
      isUnknownTime: Boolean(profile.isUnknownTime),
      id: profile.id || 'temp-' + Date.now(),
      updatedAt: now
    };
  }

  const profiles = getClientProfiles();
  const id = profile.id || 'user-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);

  const existingIdx = profiles.findIndex(p => p.id === id || (p.name.toLowerCase() === profile.name.toLowerCase() && p.birthDate === profile.birthDate));

  const savedRecord: SavedProfile = {
    ...profile,
    birthTime: normalizedTime,
    isUnknownTime: Boolean(profile.isUnknownTime),
    id: existingIdx >= 0 ? profiles[existingIdx].id : id,
    updatedAt: now
  };

  if (existingIdx >= 0) {
    profiles[existingIdx] = savedRecord;
  } else {
    profiles.unshift(savedRecord);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  localStorage.setItem(CURRENT_ID_KEY, savedRecord.id);

  // Dispatch custom window event
  window.dispatchEvent(new CustomEvent('astro_profiles_updated', { detail: savedRecord }));

  return savedRecord;
}

export function getCurrentProfileId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CURRENT_ID_KEY);
}

export function setCurrentProfileId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENT_ID_KEY, id);
}

export function getActiveProfile(): SavedProfile | null {
  if (typeof window === 'undefined') return null;
  const currentId = getCurrentProfileId();
  const profiles = getClientProfiles();
  if (!currentId) return null;
  return profiles.find(p => p.id === currentId) || null;
}

export function clearActiveProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_ID_KEY);
  window.dispatchEvent(new CustomEvent('astro_active_profile_cleared'));
}

export function deleteClientProfile(id: string): boolean {
  if (typeof window === 'undefined') return false;
  let profiles = getClientProfiles();
  profiles = profiles.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  if (getCurrentProfileId() === id) {
    clearActiveProfile();
  }
  window.dispatchEvent(new CustomEvent('astro_profiles_updated', { detail: { id, deleted: true } }));
  return true;
}

