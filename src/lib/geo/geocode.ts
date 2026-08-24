import { searchCities, type CityInfo, POPULAR_CITIES } from './cities';

export interface GeocodedLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

// Calculate exact UTC Date from Local Date/Time string and IANA Timezone
export function localToUtcDate(dateStr: string, timeStr: string, timezone: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  // We can calculate the exact UTC offset for that specific local instant in the specified timezone
  // Create an initial guess in UTC
  const guessUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Determine timezone offset at that instant using Intl
  const offsetMinutes = getTimezoneOffset(guessUtc, timezone);

  // Apply the offset (Local = UTC + offset, so UTC = Local - offset)
  return new Date(guessUtc.getTime() - offsetMinutes * 60 * 1000);
}

// Get Timezone offset in minutes for a given instant and timezone ID
export function getTimezoneOffset(date: Date, timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const parts = formatter.formatToParts(date);
    const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);

    const year = getPart('year');
    const month = getPart('month');
    const day = getPart('day');
    let hour = getPart('hour');
    if (hour === 24) hour = 0;
    const minute = getPart('minute');

    const localizedDate = Date.UTC(year, month - 1, day, hour, minute);
    const originalDate = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    );

    return Math.round((localizedDate - originalDate) / 60000);
  } catch {
    // Fallback: Default to Central European Time (+60 min or +120 min)
    return 60;
  }
}

// Online lookup via OpenStreetMap Nominatim with local fallback
export async function geocodeCity(query: string): Promise<GeocodedLocation[]> {
  const localMatches = searchCities(query);
  if (localMatches.length > 0) {
    return localMatches.map(c => ({
      name: c.admin ? `${c.name} (${c.admin})` : c.name,
      country: c.country,
      lat: c.lat,
      lng: c.lng,
      timezone: c.timezone
    }));
  }

  // If query is longer and no local match, fetch from OpenStreetMap Nominatim
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'EsotericAstroChartApp/1.0'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const name = item.name || item.display_name.split(',')[0];
          const country = item.address?.country || '';
          const countryCode = (item.address?.country_code || 'at').toUpperCase();

          // Approximate timezone by longitude & country
          let tz = 'Europe/Vienna';
          if (countryCode === 'DE') tz = 'Europe/Berlin';
          else if (countryCode === 'CH') tz = 'Europe/Zurich';
          else if (countryCode === 'GB') tz = 'Europe/London';
          else if (countryCode === 'US') tz = lng < -100 ? 'America/Los_Angeles' : 'America/New_York';

          return {
            name: `${name} ${item.address?.state ? `(${item.address.state})` : ''}`.trim(),
            country,
            lat,
            lng,
            timezone: tz
          };
        });
      }
    }
  } catch {
    // Return default Vienna if error
  }

  return [
    {
      name: 'Wien',
      country: 'Österreich',
      lat: 48.2082,
      lng: 16.3738,
      timezone: 'Europe/Vienna'
    }
  ];
}
