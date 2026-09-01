import type { APIRoute } from 'astro';
import { 
  getUserProfileById, 
  saveUserProfile, 
  deleteUserProfile, 
  setCurrentUserProfile,
  type UserProfileRecord 
} from '../../../lib/db/sqlite';
import { UserManagementAgent } from '../../../lib/db/userManagementAgent';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Keine ID angegeben' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = getUserProfileById(id);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Benutzer nicht gefunden' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Keine ID angegeben' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existing = getUserProfileById(id);
    if (!existing) {
      return new Response(JSON.stringify({ success: false, error: 'Benutzer nicht gefunden' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();

    // Check if only activating
    if (body.action === 'activate') {
      setCurrentUserProfile(id);
      const updated = getUserProfileById(id);
      return new Response(JSON.stringify({ success: true, data: updated }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validation = UserManagementAgent.validateProfileData({
      name: body.name ?? existing.name,
      birthDate: body.birthDate ?? existing.birthDate,
      birthTime: body.birthTime ?? existing.birthTime,
      isUnknownTime: body.isUnknownTime,
      cityName: body.cityName ?? existing.cityName,
      latitude: body.latitude ?? existing.latitude,
      longitude: body.longitude ?? existing.longitude,
      timezone: body.timezone ?? existing.timezone,
      houseSystem: body.houseSystem ?? existing.houseSystem
    });

    if (!validation.isValid || !validation.sanitizedProfile) {
      return new Response(JSON.stringify({ success: false, errors: validation.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sanitized = validation.sanitizedProfile;
    const now = new Date().toISOString();

    const updatedRecord: UserProfileRecord = {
      ...existing,
      name: sanitized.name!,
      email: body.email !== undefined ? body.email : existing.email,
      role: body.role !== undefined ? body.role : existing.role,
      tags: body.tags !== undefined ? body.tags : existing.tags,
      notes: body.notes !== undefined ? body.notes : existing.notes,
      birthDate: sanitized.birthDate!,
      birthTime: sanitized.birthTime!,
      cityName: sanitized.cityName!,
      latitude: sanitized.latitude!,
      longitude: sanitized.longitude!,
      timezone: sanitized.timezone!,
      houseSystem: sanitized.houseSystem || 'placidus',
      sunSign: body.sunSign !== undefined ? body.sunSign : existing.sunSign,
      moonSign: body.moonSign !== undefined ? body.moonSign : existing.moonSign,
      ascendantSign: body.ascendantSign !== undefined ? body.ascendantSign : existing.ascendantSign,
      lifePathNumber: body.lifePathNumber !== undefined ? body.lifePathNumber : existing.lifePathNumber,
      isCurrent: body.isCurrent !== undefined ? (body.isCurrent ? 1 : 0) : existing.isCurrent,
      updatedAt: now
    };

    saveUserProfile(updatedRecord);

    return new Response(JSON.stringify({
      success: true,
      message: 'Benutzerprofil erfolgreich aktualisiert',
      data: updatedRecord
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Keine ID angegeben' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const deleted = deleteUserProfile(id);
    if (!deleted) {
      return new Response(JSON.stringify({ success: false, error: 'Benutzer konnte nicht gefunden oder gelöscht werden' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Benutzer erfolgreich gelöscht',
      deletedId: id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
