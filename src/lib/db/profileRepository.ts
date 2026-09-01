/**
 * Unified Profile Repository (Industrial Gold Standard)
 * Implements an Offline-First repository pattern reconciling LocalStorage L1-cache with Backend SQLite.
 */

import type { SavedProfile } from './profileStore';
import { getClientProfiles, saveClientProfile, deleteClientProfile, getActiveProfile, setCurrentProfileId } from './profileStore';
import { Result } from '../dto/result';

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
   * Saves or updates a profile with instant local persistence and background server synchronization.
   */
  public static save(profileData: Omit<SavedProfile, 'id' | 'updatedAt'> & { id?: string }): SavedProfile {
    const saved = saveClientProfile(profileData);
    
    // Background sync to server if in browser
    if (typeof window !== 'undefined') {
      this.syncSingleToServer(saved).catch(err => {
        console.warn('[ProfileRepository] Server sync background warning:', err);
      });
    }

    return saved;
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
   * Deletes a profile locally and schedules deletion on server.
   */
  public static delete(id: string): boolean {
    const success = deleteClientProfile(id);
    if (success && typeof window !== 'undefined') {
      fetch(`/api/users/${id}`, { method: 'DELETE' }).catch(err => {
        console.warn('[ProfileRepository] Failed to delete on server:', err);
      });
    }
    return success;
  }

  /**
   * Full two-way reconciliation between LocalStorage and SQLite backend.
   */
  public static async syncWithServer(): Promise<SyncResult> {
    if (typeof window === 'undefined') {
      return { success: false, syncedCount: 0, serverProfiles: [], error: 'SSR environment' };
    }

    try {
      const clientProfiles = this.getAll();
      const res = await fetch('/api/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientProfiles })
      });

      if (!res.ok) {
        throw new Error(`Sync API responded with status ${res.status}`);
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.serverProfiles)) {
        // Update local storage with consolidated server profiles if newer
        const serverList = data.serverProfiles as SavedProfile[];
        if (serverList.length > 0) {
          localStorage.setItem('astro_nexus_saved_profiles_v1', JSON.stringify(serverList));
          window.dispatchEvent(new CustomEvent('astro_profiles_synced', { detail: serverList }));
        }

        return {
          success: true,
          syncedCount: data.syncedCount || 0,
          serverProfiles: serverList
        };
      }

      return {
        success: false,
        syncedCount: 0,
        serverProfiles: [],
        error: data.error || 'Unknown sync response'
      };
    } catch (err: any) {
      return {
        success: false,
        syncedCount: 0,
        serverProfiles: [],
        error: err.message || 'Network error during profile sync'
      };
    }
  }

  private static async syncSingleToServer(profile: SavedProfile): Promise<void> {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
  }
}
