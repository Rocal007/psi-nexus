import type { SavedProfile } from './profileStore';
import { 
  getClientProfiles, 
  saveClientProfile, 
  getActiveProfile, 
  deleteClientProfile,
  normalizeTimeString 
} from './profileStore';

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

import { validateBirthProfileInputDTO, Result } from '../dto';

/**
 * UserManagementAgent - Orchestriert Benutzer- & Seelen-Profile,
 * Mehrbenutzer-Dynamiken, SQLite Backend-Synchronisation, DSGVO-Exporte
 * und neurodidaktische Profil-Führung (NEXUS-Standard).
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
  // CLIENT PERSISTENCE, EXPORT & IMPORT
  // ==========================================

  /**
   * Führt einen Sync durch (lokale Persistenz Bestätigung)
   */
  public static async syncWithBackend(): Promise<{ success: boolean; syncedCount: number; serverProfiles: SavedProfile[]; stats?: any; error?: string }> {
    const profiles = getClientProfiles();
    return {
      success: true,
      syncedCount: profiles.length,
      serverProfiles: profiles
    };
  }

  /**
   * Löst den Download des JSON- oder CSV-Exports aus (Browser native)
   */
  public static triggerExportDownload(format: 'json' | 'csv' = 'json') {
    if (typeof window === 'undefined') return;
    const profiles = getClientProfiles();
    let blob: Blob;
    let filename: string;

    if (format === 'json') {
      const data: ProfileExportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        count: profiles.length,
        profiles
      };
      blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      filename = `nexus_profiles_export_${new Date().toISOString().slice(0, 10)}.json`;
    } else {
      const headers = ['ID', 'Name', 'Geburtsdatum', 'Geburtszeit', 'Ort', 'Breitengrad', 'Längengrad', 'Zeitzone', 'Häusersystem'];
      const rows = profiles.map(p => [
        p.id,
        `"${(p.name || '').replace(/"/g, '""')}"`,
        p.birthDate,
        p.birthTime,
        `"${(p.cityName || '').replace(/"/g, '""')}"`,
        p.latitude,
        p.longitude,
        p.timezone,
        p.houseSystem
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      filename = `nexus_profiles_export_${new Date().toISOString().slice(0, 10)}.csv`;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Importiert Profile aus einer Datei (Upload)
   */
  public static async uploadImportFile(file: File): Promise<{ success: boolean; importedCount: number; errors?: string[] }> {
    try {
      const content = await file.text();
      let importedCount = 0;
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        const list: any[] = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.profiles) ? parsed.profiles : []);
        for (const item of list) {
          if (item.birthDate && item.cityName) {
            saveClientProfile(item);
            importedCount++;
          }
        }
      }
      return { success: true, importedCount };
    } catch (e: any) {
      return { success: false, importedCount: 0, errors: [e.message || 'Dateifehler beim Importieren'] };
    }
  }
}
