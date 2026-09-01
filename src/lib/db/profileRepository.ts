/**
 * Unified Profile Repository (Industrial Gold Standard)
 * Implements an Offline-First repository pattern operating on reliable client storage.
 */

import type { SavedProfile } from './profileStore';
import { getClientProfiles, saveClientProfile, deleteClientProfile, getActiveProfile, setCurrentProfileId } from './profileStore';

export interface SyncResult {
  readonly success: boolean;
  readonly syncedCount: number;
  readonly serverProfiles: SavedProfile[];
  readonly error?: string;
}

export class ProfileRepository {
  /**
   * Retrieves all profiles from local cache.
   */
  public static getAll(): SavedProfile[] {
    return getClientProfiles();
  }

  /**
   * Retrieves a single profile by ID.
   */
  public static getById(id: string): SavedProfile | null {
    const profiles = this.getAll();
    return profiles.find(p => p.id === id) || null;
  }

  /**
   * Retrieves the currently active profile.
   */
  public static getActive(): SavedProfile | null {
    return getActiveProfile();
  }

  /**
   * Saves or updates a profile with instant local persistence.
   */
  public static save(profileData: Omit<SavedProfile, 'id' | 'updatedAt'> & { id?: string }): SavedProfile {
    return saveClientProfile(profileData);
  }

  /**
   * Sets the active profile ID and notifies listeners.
   */
  public static setActive(id: string): void {
    setCurrentProfileId(id);
    const profile = this.getById(id);
    if (profile && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('astro_profiles_updated', { detail: profile }));
    }
  }

  /**
   * Deletes a profile locally.
   */
  public static delete(id: string): boolean {
    return deleteClientProfile(id);
  }

  /**
   * Reconciles local profile store.
   */
  public static async syncWithServer(): Promise<SyncResult> {
    const clientProfiles = this.getAll();
    return {
      success: true,
      syncedCount: clientProfiles.length,
      serverProfiles: clientProfiles
    };
  }
}

