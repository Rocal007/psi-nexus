import type { APIRoute } from 'astro';
import { getAllUserProfiles } from '../../../lib/db/sqlite';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const format = (url.searchParams.get('format') || 'json').toLowerCase();
    const users = getAllUserProfiles();
    const now = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      const headers = [
        'ID', 'Name', 'Email', 'Rolle', 'Tags', 'Geburtsdatum', 'Geburtszeit',
        'Stadt', 'Breitengrad', 'Laengengrad', 'Zeitzone', 'Haussystem',
        'Sternzeichen', 'Mondzeichen', 'Aszendent', 'Lebensweg', 'Notizen', 'ErstelltAm', 'AktualisiertAm'
      ];

      const csvRows = [headers.join(',')];

      for (const u of users) {
        const row = [
          `"${u.id}"`,
          `"${(u.name || '').replace(/"/g, '""')}"`,
          `"${(u.email || '').replace(/"/g, '""')}"`,
          `"${u.role || 'client'}"`,
          `"${(u.tags || '').replace(/"/g, '""')}"`,
          `"${u.birthDate}"`,
          `"${u.birthTime}"`,
          `"${(u.cityName || '').replace(/"/g, '""')}"`,
          u.latitude,
          u.longitude,
          `"${u.timezone}"`,
          `"${u.houseSystem}"`,
          `"${u.sunSign || ''}"`,
          `"${u.moonSign || ''}"`,
          `"${u.ascendantSign || ''}"`,
          u.lifePathNumber || '',
          `"${(u.notes || '').replace(/"/g, '""')}"`,
          `"${u.createdAt}"`,
          `"${u.updatedAt}"`
        ];
        csvRows.push(row.join(','));
      }

      const csvContent = csvRows.join('\r\n');

      return new Response(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="nexus_users_export_${now}.csv"`
        }
      });
    }

    // Default: JSON Export
    const payload = {
      nexusVersion: 'V2.0-SUPREMACY',
      exportDate: new Date().toISOString(),
      recordCount: users.length,
      users
    };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="nexus_users_export_${now}.json"`
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Exportfehler'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
