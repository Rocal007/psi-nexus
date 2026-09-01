import type { APIRoute } from 'astro';
import { 
  getAllUserProfiles, 
  saveUserProfile, 
  getDatabaseStats, 
  type UserProfileRecord 
} from '../../../lib/db/sqlite';
import { UserManagementAgent } from '../../../lib/db/userManagementAgent';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const clientProfiles = Array.isArray(body.clientProfiles) ? body.clientProfiles : [];

    let syncedCount = 0;
    const errors: string[] = [];

    // Upsert each client profile into SQLite
    for (const cp of clientProfiles) {
      try {
        const val = UserManagementAgent.validateProfileData(cp);
        if (val.isValid && val.sanitizedProfile) {
          const sanitized = val.sanitizedProfile;
          const now = new Date().toISOString();
          const record: UserProfileRecord = {
            id: cp.id || 'usr-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
            name: sanitized.name!,
            email: cp.email || undefined,
            role: cp.role || 'client',
            tags: cp.tags || undefined,
            notes: cp.notes || undefined,
            birthDate: sanitized.birthDate!,
            birthTime: sanitized.birthTime!,
            cityName: sanitized.cityName!,
            latitude: sanitized.latitude!,
            longitude: sanitized.longitude!,
            timezone: sanitized.timezone!,
            houseSystem: sanitized.houseSystem || 'placidus',
            sunSign: cp.sunSign || undefined,
            moonSign: cp.moonSign || undefined,
            ascendantSign: cp.ascendantSign || undefined,
            lifePathNumber: typeof cp.lifePathNumber === 'number' ? cp.lifePathNumber : undefined,
            isCurrent: cp.isCurrent ? 1 : 0,
            createdAt: cp.createdAt || cp.updatedAt || now,
            updatedAt: cp.updatedAt || now
          };
          saveUserProfile(record);
          syncedCount++;
        }
      } catch (err: any) {
        errors.push(`Fehler bei Profil ${cp.name || cp.id}: ${err.message}`);
      }
    }

    // Return the full consolidated SQLite user list to sync back to client
    const serverProfiles = getAllUserProfiles();
    const stats = getDatabaseStats();

    return new Response(JSON.stringify({
      success: true,
      message: `${syncedCount} Profile erfolgreich mit der SQLite-Datenbank synchronisiert.`,
      syncedCount,
      serverProfiles,
      stats,
      errors: errors.length > 0 ? errors : undefined
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Serverfehler bei der Synchronisation'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
