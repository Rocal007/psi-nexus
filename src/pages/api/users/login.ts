import type { APIRoute } from 'astro';
import { getClientProfiles, type SavedProfile } from '../../../lib/db/profileStore';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { profileId, emailOrName } = body;

    let user: SavedProfile | null = null;
    const all = getClientProfiles();

    if (profileId) {
      user = all.find((u: SavedProfile) => u.id === profileId) || null;
    } else if (emailOrName && emailOrName.trim()) {
      const q = emailOrName.trim().toLowerCase();
      user = all.find((u: SavedProfile) => 
        (u.email && u.email.toLowerCase() === q) || 
        (u.name && u.name.toLowerCase() === q) ||
        u.id.toLowerCase() === q
      ) || null;
    }

    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Kein passendes Benutzerprofil für diese Anmeldedaten gefunden.'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sessionToken = 'nexus-session-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);

    return new Response(JSON.stringify({
      success: true,
      message: `Erfolgreich angemeldet als ${user.name}`,
      token: sessionToken,
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Login-Fehler'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
