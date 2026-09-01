import type { SavedProfile } from './profileStore';
import { 
  getClientProfiles, 
  saveClientProfile, 
  getActiveProfile, 
  getCurrentProfileId, 
  clearActiveProfile, 
  deleteClientProfile,
  normalizeTimeString 
} from './profileStore';

export interface UserClusterSummary {
  totalProfiles: number;
  activeProfile: SavedProfile | null;
  elementalBreakdown: Record<string, number>;
  sunSignDistribution: Record<string, number>;
  lifePathDistribution: Record<number, number>;
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

/**
 * UserManagementAgent - Orchestriert Benutzer- & Seelen-Profile,
 * Mehrbenutzer-Dynamiken, DSGVO-konforme Exporte und Profil-Validierungen
 * im Einklang mit der NEXUS-Spezifikation.
 */
export class UserManagementAgent {
  /**
   * Validiert und bereinigt die Eingabedaten für ein Profil
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
    const errors: string[] = [];

    if (!data.name || !data.name.trim()) {
      errors.push('Name darf nicht leer sein.');
    }

    if (!data.birthDate || !data.birthDate.trim()) {
      errors.push('Geburtsdatum ist erforderlich.');
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(data.birthDate.trim())) {
        errors.push('Ungültiges Datumsformat (Erwartet: YYYY-MM-DD).');
      }
    }

    if (data.latitude !== undefined && (isNaN(data.latitude) || data.latitude < -90 || data.latitude > 90)) {
      errors.push('Breitengrad (Latitude) muss zwischen -90 und 90 liegen.');
    }

    if (data.longitude !== undefined && (isNaN(data.longitude) || data.longitude < -180 || data.longitude > 180)) {
      errors.push('Längengrad (Longitude) muss zwischen -180 und 180 liegen.');
    }

    const sanitizedTime = normalizeTimeString(data.birthTime, data.isUnknownTime);

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedProfile: {
        name: data.name?.trim(),
        birthDate: data.birthDate?.trim(),
        birthTime: sanitizedTime,
        isUnknownTime: Boolean(data.isUnknownTime),
        cityName: data.cityName?.trim() || 'Wien, Österreich',
        latitude: typeof data.latitude === 'number' ? data.latitude : 48.2082,
        longitude: typeof data.longitude === 'number' ? data.longitude : 16.3738,
        timezone: data.timezone?.trim() || 'Europe/Vienna',
        houseSystem: data.houseSystem || 'placidus'
      }
    };
  }

  /**
   * Liefert eine zusammenfassende Übersicht über alle gespeicherten Benutzer-Profile
   */
  public static getClusterSummary(): UserClusterSummary {
    const profiles = getClientProfiles();
    const active = getActiveProfile();

    const sunSignDistribution: Record<string, number> = {};
    const lifePathDistribution: Record<number, number> = {};

    profiles.forEach(p => {
      if (p.sunSign) {
        sunSignDistribution[p.sunSign] = (sunSignDistribution[p.sunSign] || 0) + 1;
      }
      if (p.lifePathNumber) {
        lifePathDistribution[p.lifePathNumber] = (lifePathDistribution[p.lifePathNumber] || 0) + 1;
      }
    });

    return {
      totalProfiles: profiles.length,
      activeProfile: active,
      elementalBreakdown: {},
      sunSignDistribution,
      lifePathDistribution,
      profiles
    };
  }

  /**
   * Erstellt oder aktualisiert ein Profil sicher über den Agenten
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
   * Wechselt das aktive Benutzerprofil
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
   * Löscht ein Profil sicher
   */
  public static removeProfile(profileId: string): boolean {
    return deleteClientProfile(profileId);
  }

  /**
   * DSGVO-Datenexport aller Profile als JSON
   */
  public static exportProfilesAsJson(): string {
    const profiles = getClientProfiles();
    const exportPayload: ProfileExportData = {
      version: 'NEXUS-V1.0',
      exportedAt: new Date().toISOString(),
      count: profiles.length,
      profiles
    };
    return JSON.stringify(exportPayload, null, 2);
  }

  /**
   * Importiert Profile aus einem JSON-Export
   */
  public static importProfilesFromJson(jsonStr: string): { importedCount: number; errors: string[] } {
    const errors: string[] = [];
    let importedCount = 0;

    try {
      const parsed = JSON.parse(jsonStr);
      const profileList: SavedProfile[] = Array.isArray(parsed) 
        ? parsed 
        : Array.isArray(parsed.profiles) 
          ? parsed.profiles 
          : [];

      if (profileList.length === 0) {
        errors.push('Keine gültigen Profile im Import gefunden.');
        return { importedCount: 0, errors };
      }

      profileList.forEach((raw, idx) => {
        const val = this.validateProfileData(raw);
        if (val.isValid && val.sanitizedProfile) {
          saveClientProfile({
            id: raw.id,
            name: val.sanitizedProfile.name!,
            birthDate: val.sanitizedProfile.birthDate!,
            birthTime: val.sanitizedProfile.birthTime!,
            isUnknownTime: val.sanitizedProfile.isUnknownTime,
            cityName: val.sanitizedProfile.cityName!,
            latitude: val.sanitizedProfile.latitude!,
            longitude: val.sanitizedProfile.longitude!,
            timezone: val.sanitizedProfile.timezone!,
            houseSystem: val.sanitizedProfile.houseSystem || 'placidus',
            sunSign: raw.sunSign,
            moonSign: raw.moonSign,
            ascendantSign: raw.ascendantSign,
            lifePathNumber: raw.lifePathNumber
          });
          importedCount++;
        } else {
          errors.push(`Profil #${idx + 1} (${raw.name || 'Unbekannt'}) übersprungen: ${val.errors.join(', ')}`);
        }
      });
    } catch (e: any) {
      errors.push(`Fehler beim Parsen der JSON-Daten: ${e.message || String(e)}`);
    }

    return { importedCount, errors };
  }
}
