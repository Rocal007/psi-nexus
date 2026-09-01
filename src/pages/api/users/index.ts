import type { APIRoute } from 'astro';
import { 
  getAllUserProfiles, 
  saveUserProfile, 
  getDatabaseStats, 
  type UserProfileRecord 
} from '../../../lib/db/sqlite';
import { UserManagementAgent } from '../../../lib/db/userManagementAgent';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || undefined;
    const sunSign = url.searchParams.get('sunSign') || undefined;
    const role = url.searchParams.get('role') || undefined;
    const tag = url.searchParams.get('tag') || undefined;
    const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!, 10) : undefined;
    const offset = url.searchParams.get('offset') ? parseInt(url.searchParams.get('offset')!, 10) : undefined;

    const users = getAllUserProfiles({ query, sunSign, role, tag, limit, offset });
    const stats = getDatabaseStats();

    return new Response(JSON.stringify({
      success: true,
      count: users.length,
      data: users,
      stats
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Serverfehler beim Abrufen der Benutzer'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const validation = UserManagementAgent.validateProfileData(body);

    if (!validation.isValid || !validation.sanitizedProfile) {
      return new Response(JSON.stringify({
        success: false,
        errors: validation.errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sanitized = validation.sanitizedProfile;
    const now = new Date().toISOString();
    const id = body.id || 'usr-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);

    const record: UserProfileRecord = {
      id,
      name: sanitized.name!,
      email: body.email ? String(body.email).trim() : undefined,
      role: body.role || 'client',
      tags: body.tags ? String(body.tags).trim() : undefined,
      notes: body.notes ? String(body.notes).trim() : undefined,
      birthDate: sanitized.birthDate!,
      birthTime: sanitized.birthTime!,
      cityName: sanitized.cityName!,
      latitude: sanitized.latitude!,
      longitude: sanitized.longitude!,
      timezone: sanitized.timezone!,
      houseSystem: sanitized.houseSystem || 'placidus',
      sunSign: body.sunSign || undefined,
      moonSign: body.moonSign || undefined,
      ascendantSign: body.ascendantSign || undefined,
      lifePathNumber: typeof body.lifePathNumber === 'number' ? body.lifePathNumber : undefined,
      isCurrent: body.isCurrent ? 1 : 0,
      createdAt: body.createdAt || now,
      updatedAt: now
    };

    const saved = saveUserProfile(record);

    return new Response(JSON.stringify({
      success: true,
      message: 'Benutzerprofil erfolgreich im Backend gespeichert.',
      data: saved
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Serverfehler beim Speichern des Benutzers'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
