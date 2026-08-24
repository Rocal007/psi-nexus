export interface CityInfo {
  name: string;
  country: string;
  countryCode: string;
  admin?: string; // Bundesland / State
  lat: number;
  lng: number;
  timezone: string;
}

export const POPULAR_CITIES: CityInfo[] = [
  // Österreich
  { name: 'Wien', country: 'Österreich', countryCode: 'AT', admin: 'Wien', lat: 48.2082, lng: 16.3738, timezone: 'Europe/Vienna' },
  { name: 'Graz', country: 'Österreich', countryCode: 'AT', admin: 'Steiermark', lat: 47.0707, lng: 15.4395, timezone: 'Europe/Vienna' },
  { name: 'Linz', country: 'Österreich', countryCode: 'AT', admin: 'Oberösterreich', lat: 48.3064, lng: 14.2858, timezone: 'Europe/Vienna' },
  { name: 'Salzburg', country: 'Österreich', countryCode: 'AT', admin: 'Salzburg', lat: 47.8095, lng: 13.0550, timezone: 'Europe/Vienna' },
  { name: 'Innsbruck', country: 'Österreich', countryCode: 'AT', admin: 'Tirol', lat: 47.2692, lng: 11.4041, timezone: 'Europe/Vienna' },
  { name: 'Klagenfurt', country: 'Österreich', countryCode: 'AT', admin: 'Kärnten', lat: 46.6247, lng: 14.3053, timezone: 'Europe/Vienna' },
  { name: 'Villach', country: 'Österreich', countryCode: 'AT', admin: 'Kärnten', lat: 46.6111, lng: 13.8558, timezone: 'Europe/Vienna' },
  { name: 'Wels', country: 'Österreich', countryCode: 'AT', admin: 'Oberösterreich', lat: 48.1567, lng: 14.0247, timezone: 'Europe/Vienna' },
  { name: 'Sankt Pölten', country: 'Österreich', countryCode: 'AT', admin: 'Niederösterreich', lat: 48.2044, lng: 15.6229, timezone: 'Europe/Vienna' },
  { name: 'Dornbirn', country: 'Österreich', countryCode: 'AT', admin: 'Vorarlberg', lat: 47.4125, lng: 9.7417, timezone: 'Europe/Vienna' },
  { name: 'Bregenz', country: 'Österreich', countryCode: 'AT', admin: 'Vorarlberg', lat: 47.5031, lng: 9.7471, timezone: 'Europe/Vienna' },
  { name: 'Eisenstadt', country: 'Österreich', countryCode: 'AT', admin: 'Burgenland', lat: 47.8450, lng: 16.5233, timezone: 'Europe/Vienna' },
  { name: 'Baden bei Wien', country: 'Österreich', countryCode: 'AT', admin: 'Niederösterreich', lat: 48.0069, lng: 16.2308, timezone: 'Europe/Vienna' },
  { name: 'Wiener Neustadt', country: 'Österreich', countryCode: 'AT', admin: 'Niederösterreich', lat: 47.8150, lng: 16.2464, timezone: 'Europe/Vienna' },
  { name: 'Steyr', country: 'Österreich', countryCode: 'AT', admin: 'Oberösterreich', lat: 48.0427, lng: 14.4213, timezone: 'Europe/Vienna' },
  { name: 'Feldkirch', country: 'Österreich', countryCode: 'AT', admin: 'Vorarlberg', lat: 47.2372, lng: 9.5986, timezone: 'Europe/Vienna' },
  { name: 'Leoben', country: 'Österreich', countryCode: 'AT', admin: 'Steiermark', lat: 47.3800, lng: 15.0933, timezone: 'Europe/Vienna' },
  { name: 'Krems an der Donau', country: 'Österreich', countryCode: 'AT', admin: 'Niederösterreich', lat: 48.4092, lng: 15.6142, timezone: 'Europe/Vienna' },

  // Deutschland
  { name: 'Berlin', country: 'Deutschland', countryCode: 'DE', admin: 'Berlin', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin' },
  { name: 'München', country: 'Deutschland', countryCode: 'DE', admin: 'Bayern', lat: 48.1351, lng: 11.5820, timezone: 'Europe/Berlin' },
  { name: 'Hamburg', country: 'Deutschland', countryCode: 'DE', admin: 'Hamburg', lat: 53.5511, lng: 9.9937, timezone: 'Europe/Berlin' },
  { name: 'Köln', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 50.9375, lng: 6.9603, timezone: 'Europe/Berlin' },
  { name: 'Frankfurt am Main', country: 'Deutschland', countryCode: 'DE', admin: 'Hessen', lat: 50.1109, lng: 8.6821, timezone: 'Europe/Berlin' },
  { name: 'Stuttgart', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 48.7758, lng: 9.1829, timezone: 'Europe/Berlin' },
  { name: 'Düsseldorf', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.2277, lng: 6.7735, timezone: 'Europe/Berlin' },
  { name: 'Leipzig', country: 'Deutschland', countryCode: 'DE', admin: 'Sachsen', lat: 51.3397, lng: 12.3731, timezone: 'Europe/Berlin' },
  { name: 'Dortmund', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.5136, lng: 7.4653, timezone: 'Europe/Berlin' },
  { name: 'Essen', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.4556, lng: 7.0116, timezone: 'Europe/Berlin' },
  { name: 'Bremen', country: 'Deutschland', countryCode: 'DE', admin: 'Bremen', lat: 53.0793, lng: 8.8017, timezone: 'Europe/Berlin' },
  { name: 'Dresden', country: 'Deutschland', countryCode: 'DE', admin: 'Sachsen', lat: 51.0504, lng: 13.7373, timezone: 'Europe/Berlin' },
  { name: 'Hannover', country: 'Deutschland', countryCode: 'DE', admin: 'Niedersachsen', lat: 52.3759, lng: 9.7320, timezone: 'Europe/Berlin' },
  { name: 'Nürnberg', country: 'Deutschland', countryCode: 'DE', admin: 'Bayern', lat: 49.4521, lng: 11.0767, timezone: 'Europe/Berlin' },
  { name: 'Duisburg', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.4344, lng: 6.7623, timezone: 'Europe/Berlin' },
  { name: 'Bochum', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.4818, lng: 7.2162, timezone: 'Europe/Berlin' },
  { name: 'Wuppertal', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.2562, lng: 7.1508, timezone: 'Europe/Berlin' },
  { name: 'Bielefeld', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 52.0302, lng: 8.5325, timezone: 'Europe/Berlin' },
  { name: 'Bonn', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 50.7374, lng: 7.0982, timezone: 'Europe/Berlin' },
  { name: 'Münster', country: 'Deutschland', countryCode: 'DE', admin: 'Nordrhein-Westfalen', lat: 51.9607, lng: 7.6261, timezone: 'Europe/Berlin' },
  { name: 'Karlsruhe', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 49.0069, lng: 8.4037, timezone: 'Europe/Berlin' },
  { name: 'Mannheim', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 49.4875, lng: 8.4660, timezone: 'Europe/Berlin' },
  { name: 'Augsburg', country: 'Deutschland', countryCode: 'DE', admin: 'Bayern', lat: 48.3705, lng: 10.8978, timezone: 'Europe/Berlin' },
  { name: 'Wiesbaden', country: 'Deutschland', countryCode: 'DE', admin: 'Hessen', lat: 50.0782, lng: 8.2398, timezone: 'Europe/Berlin' },
  { name: 'Freiburg im Breisgau', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 47.9990, lng: 7.8421, timezone: 'Europe/Berlin' },
  { name: 'Regensburg', country: 'Deutschland', countryCode: 'DE', admin: 'Bayern', lat: 49.0134, lng: 12.1016, timezone: 'Europe/Berlin' },
  { name: 'Passau', country: 'Deutschland', countryCode: 'DE', admin: 'Bayern', lat: 48.5665, lng: 13.4312, timezone: 'Europe/Berlin' },
  { name: 'Ulm', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 48.4011, lng: 9.9876, timezone: 'Europe/Berlin' },
  { name: 'Heidelberg', country: 'Deutschland', countryCode: 'DE', admin: 'Baden-Württemberg', lat: 49.3988, lng: 8.6724, timezone: 'Europe/Berlin' },

  // Schweiz
  { name: 'Zürich', country: 'Schweiz', countryCode: 'CH', admin: 'Zürich', lat: 47.3769, lng: 8.5417, timezone: 'Europe/Zurich' },
  { name: 'Genf', country: 'Schweiz', countryCode: 'CH', admin: 'Genf', lat: 46.2044, lng: 6.1432, timezone: 'Europe/Zurich' },
  { name: 'Basel', country: 'Schweiz', countryCode: 'CH', admin: 'Basel-Stadt', lat: 47.5596, lng: 7.5886, timezone: 'Europe/Zurich' },
  { name: 'Bern', country: 'Schweiz', countryCode: 'CH', admin: 'Bern', lat: 46.9480, lng: 7.4474, timezone: 'Europe/Zurich' },
  { name: 'Lausanne', country: 'Schweiz', countryCode: 'CH', admin: 'Waadt', lat: 46.5197, lng: 6.6323, timezone: 'Europe/Zurich' },
  { name: 'Luzern', country: 'Schweiz', countryCode: 'CH', admin: 'Luzern', lat: 47.0502, lng: 8.3093, timezone: 'Europe/Zurich' },
  { name: 'St. Gallen', country: 'Schweiz', countryCode: 'CH', admin: 'St. Gallen', lat: 47.4245, lng: 9.3767, timezone: 'Europe/Zurich' },
  { name: 'Lugano', country: 'Schweiz', countryCode: 'CH', admin: 'Tessin', lat: 46.0037, lng: 8.9511, timezone: 'Europe/Zurich' },
  { name: 'Winterthur', country: 'Schweiz', countryCode: 'CH', admin: 'Zürich', lat: 47.4999, lng: 8.7241, timezone: 'Europe/Zurich' },

  // Weitere Weltmetropolen
  { name: 'London', country: 'Großbritannien', countryCode: 'GB', admin: 'England', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { name: 'Paris', country: 'Frankreich', countryCode: 'FR', admin: 'Île-de-France', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Rom', country: 'Italien', countryCode: 'IT', admin: 'Latium', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome' },
  { name: 'Madrid', country: 'Spanien', countryCode: 'ES', admin: 'Madrid', lat: 40.4168, lng: -3.7038, timezone: 'Europe/Madrid' },
  { name: 'Amsterdam', country: 'Niederlande', countryCode: 'NL', admin: 'Nordholland', lat: 52.3676, lng: 4.9041, timezone: 'Europe/Amsterdam' },
  { name: 'Brüssel', country: 'Belgien', countryCode: 'BE', admin: 'Brüssel', lat: 50.8503, lng: 4.3517, timezone: 'Europe/Brussels' },
  { name: 'New York', country: 'USA', countryCode: 'US', admin: 'New York', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'USA', countryCode: 'US', admin: 'Kalifornien', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', admin: 'Tokyo', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australien', countryCode: 'AU', admin: 'New South Wales', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Buenos Aires', country: 'Argentinien', countryCode: 'AR', admin: 'Buenos Aires', lat: -34.6037, lng: -58.3816, timezone: 'America/Argentina/Buenos_Aires' }
];

export function searchCities(query: string, limit = 8): CityInfo[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();

  return POPULAR_CITIES.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.country.toLowerCase().includes(q) ||
    (c.admin && c.admin.toLowerCase().includes(q))
  ).slice(0, limit);
}
