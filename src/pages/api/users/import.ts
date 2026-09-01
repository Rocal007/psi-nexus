import type { APIRoute } from 'astro';
import { saveUserProfile, getAllUserProfiles, type UserProfileRecord } from '../../../lib/db/sqlite';
import { UserManagementAgent } from '../../../lib/db/userManagementAgent';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const rawList = Array.isArray(body) 
      ? body 
      : Array.isArray(body.users) 
        ? body.users 
        : Array.isArray(body.profiles) 
          ? body.profiles 
          : [];

    if (rawList.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Keine gültigen Profile im Import-Payload gefunden.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let importedCount = 0;
    const errors: string[] = [];
    const now = new Date().toISOString();

    for (let i = 0; i < rawList.length; i++) {
      const item = rawList[i];
      const validation = UserManagementAgent.validateProfileData(item);
      if (validation.isValid && validation.sanitizedProfile) {
        const sanitized = validation.sanitizedProfile;
        const record: UserProfileRecord = {
          id: item.id || 'usr-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
          name: sanitized.name!,
          email: item.email ? String(item.email).trim() : undefined,
          role: item.role || 'client',
          tags: item.tags ? String(item.tags).trim() : undefined,
          notes: item.notes ? String(item.notes).trim() : undefined,
          birthDate: sanitized.birthDate!,
          birthTime: sanitized.birthTime!,
          cityName: sanitized.cityName!,
          latitude: sanitized.latitude!,
          longitude: sanitized.longitude!,
          timezone: sanitized.timezone!,
          houseSystem: sanitized.houseSystem || 'placidus',
          sunSign: item.sunSign || undefined,
          moonSign: item.moonSign || undefined,
          ascendantSign: item.ascendantSign || undefined,
          lifePathNumber: typeof item.lifePathNumber === 'number' ? item.lifePathNumber : undefined,
          isCurrent: item.isCurrent ? 1 : 0,
          createdAt: item.createdAt || now,
          updatedAt: now
        };
        saveUserProfile(record);
        importedCount++;
      } else {
        errors.push(`Datensatz #${i + 1} (${item.name || 'Unbekannt'}): ${validation.errors.join(', ')}`);
      }
    }

    const updatedUsers = getAllUserProfiles();

    return new Response(JSON.stringify({
      success: true,
      message: `${importedCount} von ${rawList.length} Profilen erfolgreich importiert.`,
      importedCount,
      totalUsers: updatedUsers.length,
      errors: errors.length > 0 ? errors : undefined
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Importfehler'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
