import type { SavedProfile } from './profileStore';
import { 
  getClientProfiles, 
  saveClientProfile, 
  getActiveProfile, 
  deleteClientProfile,
  normalizeTimeString 
} from './profileStore';
import { validateBirthProfileInputDTO, Result } from '../dto';

export interface UserClusterSummary {
  totalProfiles: number;
  activeProfile: SavedProfile | null;
  elementalBreakdown: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  sunSignDistribution: Record<string, number>;
  lifePathDistribution: Record<number, number>;
  roleDistribution: Record<string, number>;
  profiles: SavedProfile[];
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedProfile?: Partial<SavedProfile>;
}

export interface ProfileExportData {
  version: string;
  exportedAt: string;
  count: number;
  profiles: SavedProfile[];
}

export interface AuthSession {
  userId: string;
  userName: string;
  role: string;
  token: string;
  loginTime: string;
}

const ELEMENT_MAP: Record<string, 'fire' | 'earth' | 'air' | 'water'> = {
  'Widder': 'fire', 'Löwe': 'fire', 'Schütze': 'fire',
  'Aries': 'fire', 'Leo': 'fire', 'Sagittarius': 'fire',
  'Stier': 'earth', 'Jungfrau': 'earth', 'Steinbock': 'earth',
  'Taurus': 'earth', 'Virgo': 'earth', 'Capricorn': 'earth',
  'Zwillinge': 'air', 'Waage': 'air', 'Wassermann': 'air',
  'Gemini': 'air', 'Libra': 'air', 'Aquarius': 'air',
  'Krebs': 'water', 'Skorpion': 'water', 'Fische': 'water',
  'Cancer': 'water', 'Scorpio': 'water', 'Pisces': 'water'
};

/**
 * UserManagementAgent - Orchestriert Benutzer- & Seelen-Profile,
 * Authentifizierung (Login/Logout), SQLite Backend-Synchronisation,
 * DSGVO-Exporte und neurodidaktische Profil-Führung (NEXUS-Standard).
 */
export class UserManagementAgent {
  /**
   * Validiert und bereinigt Eingabedaten über die standardisierte DTO-Schicht
   */
  public static validateProfileData(data: {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    isUnknownTime?: boolean;
    cityName?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    houseSystem?: 'placidus' | 'equal';
  }): ProfileValidationResult {
    const rawCandidate = {
      name: data.name?.trim(),
      birthDate: data.birthDate?.trim() || '',
      birthTime: normalizeTimeString(data.birthTime, data.isUnknownTime),
      isUnknownTime: Boolean(data.isUnknownTime),
      cityName: data.cityName?.trim() || 'Wien',
      latitude: typeof data.latitude === 'number' ? data.latitude : 48.2082,
      longitude: typeof data.longitude === 'number' ? data.longitude : 16.3738,
      timezone: data.timezone?.trim() || 'Europe/Vienna',
      houseSystem: data.houseSystem || 'placidus'
    };

    const result = validateBirthProfileInputDTO(rawCandidate);

    if (Result.isErr(result)) {
      return {
        isValid: false,
        errors: result.error.errors.map(e => `${e.field}: ${e.message}`),
        sanitizedProfile: undefined
      };
    }

    return {
      isValid: true,
      errors: [],
      sanitizedProfile: {
        name: result.value.name,
        birthDate: result.value.birthDate,
        birthTime: result.value.birthTime,
        isUnknownTime: result.value.isUnknownTime,
        cityName: result.value.cityName,
        latitude: result.value.latitude,
        longitude: result.value.longitude,
        timezone: result.value.timezone,
        houseSystem: result.value.houseSystem
      }
    };
  }

  /**
   * Liefert eine zusammenfassende Übersicht über alle Benutzer-Profile
   */
  public static getClusterSummary(): UserClusterSummary {
    const profiles = getClientProfiles();
    const active = getActiveProfile();

    const sunSignDistribution: Record<string, number> = {};
    const lifePathDistribution: Record<number, number> = {};
    const roleDistribution: Record<string, number> = {};
    const elementalBreakdown = { fire: 0, earth: 0, air: 0, water: 0 };

    profiles.forEach(p => {
      if (p.sunSign) {
        sunSignDistribution[p.sunSign] = (sunSignDistribution[p.sunSign] || 0) + 1;
        const elem = ELEMENT_MAP[p.sunSign];
        if (elem) elementalBreakdown[elem]++;
      }
      if (p.lifePathNumber) {
        lifePathDistribution[p.lifePathNumber] = (lifePathDistribution[p.lifePathNumber] || 0) + 1;
      }
      const r = p.role || 'client';
      roleDistribution[r] = (roleDistribution[r] || 0) + 1;
    });

    return {
      totalProfiles: profiles.length,
      activeProfile: active,
      elementalBreakdown,
      sunSignDistribution,
      lifePathDistribution,
      roleDistribution,
      profiles
    };
  }

  /**
   * Erstellt oder aktualisiert ein Profil im Client-Store
   */
  public static upsertProfile(profile: Omit<SavedProfile, 'id' | 'updatedAt'> & { id?: string }): SavedProfile {
    const validation = this.validateProfileData(profile);
    if (!validation.isValid) {
      throw new Error(`Profil-Validierung fehlgeschlagen: ${validation.errors.join(', ')}`);
    }

    return saveClientProfile({
      ...profile,
      name: validation.sanitizedProfile?.name || profile.name,
      birthDate: validation.sanitizedProfile?.birthDate || profile.birthDate,
      birthTime: validation.sanitizedProfile?.birthTime || profile.birthTime,
      isUnknownTime: validation.sanitizedProfile?.isUnknownTime ?? profile.isUnknownTime,
      cityName: validation.sanitizedProfile?.cityName || profile.cityName,
      latitude: validation.sanitizedProfile?.latitude ?? profile.latitude,
      longitude: validation.sanitizedProfile?.longitude ?? profile.longitude,
      timezone: validation.sanitizedProfile?.timezone || profile.timezone,
      houseSystem: validation.sanitizedProfile?.houseSystem || profile.houseSystem
    });
  }

  /**
   * Wechselt das aktive Profil im Client
   */
  public static switchActiveProfile(profileId: string): SavedProfile | null {
    if (typeof window === 'undefined') return null;
    const profiles = getClientProfiles();
    const target = profiles.find(p => p.id === profileId);
    if (!target) return null;

    localStorage.setItem('astro_nexus_current_profile_id', target.id);
    window.dispatchEvent(new CustomEvent('astro_profiles_updated', { detail: target }));
    return target;
  }

  /**
   * Löscht ein Profil im Client
   */
  public static removeProfile(profileId: string): boolean {
    return deleteClientProfile(profileId);
  }

  // ==========================================
  // AUTHENTICATION & LOGIN
  // ==========================================

  /**
   * Loggt einen Benutzer über Profil-Auswahl oder Anmeldedaten ein
   */
  public static async login(credentials: { profileId?: string; emailOrName?: string; pin?: string }): Promise<{ success: boolean; message: string; user?: SavedProfile; error?: string }> {
    if (typeof window === 'undefined') return { success: false, message: '', error: 'Nur im Browser ausführbar' };

    try {
      // 1. Try server login endpoint if online
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      }).catch(() => null);

      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          const profile = this.switchActiveProfile(json.user.id);
          const session: AuthSession = {
            userId: json.user.id,
            userName: json.user.name,
            role: json.user.role || 'client',
            token: json.token,
            loginTime: new Date().toISOString()
          };
          localStorage.setItem('nexus_auth_session', JSON.stringify(session));
          window.dispatchEvent(new CustomEvent('astro_user_logged_in', { detail: session }));
          return { success: true, message: json.message, user: profile || json.user };
        }
      }

      // 2. Client-side local fallback
      const profiles = getClientProfiles();
      let match: SavedProfile | undefined;

      if (credentials.profileId) {
        match = profiles.find(p => p.id === credentials.profileId);
      } else if (credentials.emailOrName) {
        const q = credentials.emailOrName.trim().toLowerCase();
        match = profiles.find(p => 
          (p.email && p.email.toLowerCase() === q) || 
          p.name.toLowerCase() === q ||
          p.id.toLowerCase() === q
        );
      }

      if (match) {
        this.switchActiveProfile(match.id);
        const session: AuthSession = {
          userId: match.id,
          userName: match.name,
          role: match.role || 'client',
          token: 'local-session-' + Date.now(),
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('nexus_auth_session', JSON.stringify(session));
        window.dispatchEvent(new CustomEvent('astro_user_logged_in', { detail: session }));
        return { success: true, message: `Lokal angemeldet als ${match.name}`, user: match };
      }

      return { success: false, message: '', error: 'Kein passendes Benutzerprofil gefunden.' };
    } catch (e: any) {
      return { success: false, message: '', error: e.message || 'Login-Fehler' };
    }
  }

  /**
   * Loggt den aktuellen Benutzer aus
   */
  public static logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('nexus_auth_session');
    window.dispatchEvent(new CustomEvent('astro_user_logged_out'));
  }

  /**
   * Gibt die aktuelle Login-Sitzung zurück
   */
  public static getAuthSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem('nexus_auth_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // ==========================================
  // BACKEND SYNCHRONISATION & REST API
  // ==========================================

  /**
   * Führt einen bidirektionalen Sync zwischen Client LocalStorage und SQLite-Backend durch
   */
  public static async syncWithBackend(): Promise<{ success: boolean; syncedCount: number; serverProfiles: SavedProfile[]; stats?: any; error?: string }> {
    if (typeof window === 'undefined') {
      return { success: false, syncedCount: 0, serverProfiles: [], error: 'Nur im Browser ausführbar' };
    }

    try {
      const clientProfiles = getClientProfiles();
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientProfiles })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.success && Array.isArray(json.serverProfiles)) {
        const mappedProfiles: SavedProfile[] = json.serverProfiles.map((sp: any) => ({
          id: sp.id,
          name: sp.name,
          email: sp.email,
          role: sp.role,
          tags: sp.tags,
          notes: sp.notes,
          birthDate: sp.birthDate,
          birthTime: sp.birthTime,
          cityName: sp.cityName,
          latitude: sp.latitude,
          longitude: sp.longitude,
          timezone: sp.timezone,
          houseSystem: sp.houseSystem,
          sunSign: sp.sunSign,
          moonSign: sp.moonSign,
          ascendantSign: sp.ascendantSign,
          lifePathNumber: sp.lifePathNumber,
          updatedAt: sp.updatedAt
        }));

        localStorage.setItem('astro_nexus_saved_profiles_v1', JSON.stringify(mappedProfiles));
        
        const serverCurrent = json.serverProfiles.find((p: any) => p.isCurrent === 1);
        if (serverCurrent) {
          localStorage.setItem('astro_nexus_current_profile_id', serverCurrent.id);
        }

        window.dispatchEvent(new CustomEvent('astro_profiles_updated', { detail: mappedProfiles }));
        window.dispatchEvent(new CustomEvent('astro_backend_synced', { detail: json }));

        return {
          success: true,
          syncedCount: json.syncedCount || 0,
          serverProfiles: mappedProfiles,
          stats: json.stats
        };
      }

      return { success: false, syncedCount: 0, serverProfiles: [], error: 'Unerwartetes Server-Antwortformat' };
    } catch (e: any) {
      console.warn('Backend Sync Notice:', e.message);
      return { success: false, syncedCount: 0, serverProfiles: [], error: e.message || String(e) };
    }
  }

  /**
   * Lädt alle Benutzer aus dem SQLite Backend
   */
  public static async fetchBackendUsers(filter: { query?: string; sunSign?: string; role?: string } = {}): Promise<SavedProfile[]> {
    try {
      const params = new URLSearchParams();
      if (filter.query) params.set('query', filter.query);
      if (filter.sunSign) params.set('sunSign', filter.sunSign);
      if (filter.role) params.set('role', filter.role);

      const res = await fetch(`/api/users?${params.toString()}`);
      if (!res.ok) return [];
      const json = await res.json();
      return json.success && Array.isArray(json.data) ? json.data : [];
    } catch (e) {
      console.error('Fetch backend users error:', e);
      return [];
    }
  }

  /**
   * Speichert ein Profil im Backend
   */
  public static async saveToBackend(profileData: Partial<SavedProfile>): Promise<SavedProfile | null> {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (e) {
      console.error('Save to backend error:', e);
      return null;
    }
  }

  /**
   * Löscht ein Profil aus dem Backend
   */
  public static async deleteFromBackend(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (e) {
      console.error('Delete from backend error:', e);
      return false;
    }
  }

  /**
   * Aktiviert ein Profil im Backend
   */
  public static async activateInBackend(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'activate' })
      });
      return res.ok;
    } catch (e) {
      console.error('Activate in backend error:', e);
      return false;
    }
  }

  /**
   * Löst den Download des JSON- oder CSV-Exports aus
   */
  public static triggerExportDownload(format: 'json' | 'csv' = 'json') {
    if (typeof window === 'undefined') return;
    window.location.href = `/api/users/export?format=${format}`;
  }

  /**
   * Importiert Profile aus einer Datei (Upload)
   */
  public static async uploadImportFile(file: File): Promise<{ success: boolean; importedCount: number; errors?: string[] }> {
    try {
      const content = await file.text();
      const parsed = JSON.parse(content);
      
      const res = await fetch('/api/users/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });

      const json = await res.json();
      if (json.success) {
        await this.syncWithBackend();
      }
      return json;
    } catch (e: any) {
      return { success: false, importedCount: 0, errors: [e.message || 'Dateifehler'] };
    }
  }
}
