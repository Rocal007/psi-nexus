import type { CompleteNatalChart } from './engine';

export interface PowerPlaceInfo {
  id: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  planetId: string;
  planetName: string;
  planetSymbol: string;
  lineType: 'MC' | 'IC' | 'AC' | 'DC';
  lineTypeName: string;
  lifeDomain: 'career' | 'love' | 'home' | 'spirit';
  lifeDomainLabel: string;
  colorHex: string;
  headline: string;
  coreEffect: string;
  practicalTips: string[];
  recommendation: 'Reise & Inspiration' | 'Karriere & Business' | 'Liebe & Begegnung' | 'Rückzug & Seelenfrieden' | 'Spirituelle Transformation';
}

export interface PlanetaryLine {
  planetId: string;
  planetName: string;
  planetSymbol: string;
  lineType: 'MC' | 'IC'; // Meridian lines (vertical)
  longitudeDegree: number; // -180 to 180 on world map
  colorHex: string;
  lifeDomain: 'career' | 'love' | 'home' | 'spirit';
  description: string;
}

export interface AstrocartographyData {
  birthLocation: {
    cityName: string;
    latitude: number;
    longitude: number;
  };
  lines: PlanetaryLine[];
  powerPlaces: PowerPlaceInfo[];
  domainSummaries: {
    career: { headline: string; bestPlaces: string[]; summary: string };
    love: { headline: string; bestPlaces: string[]; summary: string };
    home: { headline: string; bestPlaces: string[]; summary: string };
    spirit: { headline: string; bestPlaces: string[]; summary: string };
  };
}

// World cities benchmark database for relocation calculations
const BENCHMARK_CITIES = [
  { name: 'Wien', country: 'Österreich', lat: 48.2082, lng: 16.3738 },
  { name: 'Berlin', country: 'Deutschland', lat: 52.5200, lng: 13.4050 },
  { name: 'Zürich', country: 'Schweiz', lat: 47.3769, lng: 8.5417 },
  { name: 'Paris', country: 'Frankreich', lat: 48.8566, lng: 2.3522 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Rom', country: 'Italien', lat: 41.9028, lng: 12.4964 },
  { name: 'Madrid', country: 'Spanien', lat: 40.4168, lng: -3.7038 },
  { name: 'Lissabon', country: 'Portugal', lat: 38.7223, lng: -9.1393 },
  { name: 'Athen', country: 'Griechenland', lat: 37.9838, lng: 23.7275 },
  { name: 'Reykjavik', country: 'Island', lat: 64.1466, lng: -21.9426 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437 },
  { name: 'San Francisco', country: 'USA', lat: 37.7749, lng: -122.4194 },
  { name: 'Miami', country: 'USA', lat: 25.7617, lng: -80.1918 },
  { name: 'Vancouver', country: 'Kanada', lat: 49.2827, lng: -123.1207 },
  { name: 'Rio de Janeiro', country: 'Brasilien', lat: -22.9068, lng: -43.1729 },
  { name: 'Buenos Aires', country: 'Argentinien', lat: -34.6037, lng: -58.3816 },
  { name: 'Kairo', country: 'Ägypten', lat: 30.0444, lng: 31.2357 },
  { name: 'Kapstadt', country: 'Südafrika', lat: -33.9249, lng: 18.4241 },
  { name: 'Dubai', country: 'VAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Bali (Denpasar)', country: 'Indonesien', lat: -8.6705, lng: 115.2126 },
  { name: 'Singapur', country: 'Singapur', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokio', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681 },
  { name: 'Sydney', country: 'Australien', lat: -33.8688, lng: 151.2093 },
  { name: 'Auckland', country: 'Neuseeland', lat: -36.8485, lng: 174.7633 },
  { name: 'Honolulu', country: 'Hawaii / USA', lat: 21.3069, lng: -157.8583 }
];

export function calculateAstrocartography(chart: CompleteNatalChart): AstrocartographyData {
  const { planets, input, housesResult } = chart;
  const birthLng = input.longitude;
  const birthLat = input.latitude;
  const birthCity = input.cityName || 'Geburtsort';

  const lines: PlanetaryLine[] = [];

  // Define key planets and their dominant planetary line properties
  const planetConfig: Record<string, { domain: 'career' | 'love' | 'home' | 'spirit'; color: string; mcName: string; icName: string }> = {
    Sun: { domain: 'career', color: '#eab308', mcName: 'Sonne-MC (Zenit des Erfolgs)', icName: 'Sonne-IC (Innere Schöpferquelle)' },
    Moon: { domain: 'home', color: '#94a3b8', mcName: 'Mond-MC (Öffentliche Empathie)', icName: 'Mond-IC (Wahre Seelenheimat & Schutz)' },
    Venus: { domain: 'love', color: '#ec4899', mcName: 'Venus-MC (Ästhetischer Ruhm)', icName: 'Venus-IC (Herzensfrieden & Geborgenheit)' },
    Jupiter: { domain: 'career', color: '#f59e0b', mcName: 'Jupiter-MC (Großes Glück & Fülle)', icName: 'Jupiter-IC (Tiefe seelische Zufriedenheit)' },
    Mars: { domain: 'career', color: '#ef4444', mcName: 'Mars-MC (Mut, Tatkraft & Führung)', icName: 'Mars-IC (Verwurzelung der Lebenskraft)' },
    Mercury: { domain: 'career', color: '#38bdf8', mcName: 'Merkur-MC (Wissensfluss & Kommunikation)', icName: 'Merkur-IC (Geistige Erdung)' },
    Saturn: { domain: 'career', color: '#a855f7', mcName: 'Saturn-MC (Meisterschaft & Autorität)', icName: 'Saturn-IC (Struktur der Ahnen)' },
    Uranus: { domain: 'spirit', color: '#06b6d4', mcName: 'Uranus-MC (Innovation & Genialität)', icName: 'Uranus-IC (Befreiung von Altem)' },
    Neptune: { domain: 'spirit', color: '#6366f1', mcName: 'Neptun-MC (Künstlerische Inspiration)', icName: 'Neptun-IC (Mystische Seelenquelle)' },
    Pluto: { domain: 'spirit', color: '#8b5cf6', mcName: 'Pluto-MC (Tiefe Transformation & Macht)', icName: 'Pluto-IC (Karmische Wiedergeburt)' },
    Chiron: { domain: 'spirit', color: '#10b981', mcName: 'Chiron-MC (Heiler-Berufung)', icName: 'Chiron-IC (Ur-Heilung des Herzens)' }
  };

  // Calculate planetary meridian lines
  // The meridian (MC) of a planet occurs at longitude = birthLng + (planet.longitude - chart.housesResult.angles.midheaven.longitude)
  const chartMcLon = housesResult.angles.midheaven.longitude;

  planets.forEach(p => {
    const cfg = planetConfig[p.id];
    if (!cfg) return;

    let diffFromMc = p.longitude - chartMcLon;
    // Normalize to [-180, 180]
    let mcLineLng = birthLng + diffFromMc;
    while (mcLineLng > 180) mcLineLng -= 360;
    while (mcLineLng < -180) mcLineLng += 360;

    let icLineLng = mcLineLng + 180;
    while (icLineLng > 180) icLineLng -= 360;
    while (icLineLng < -180) icLineLng += 360;

    // Add MC Line
    lines.push({
      planetId: p.id,
      planetName: p.name,
      planetSymbol: p.symbol,
      lineType: 'MC',
      longitudeDegree: mcLineLng,
      colorHex: cfg.color,
      lifeDomain: cfg.domain,
      description: cfg.mcName
    });

    // Add IC Line
    lines.push({
      planetId: p.id,
      planetName: p.name,
      planetSymbol: p.symbol,
      lineType: 'IC',
      longitudeDegree: icLineLng,
      colorHex: cfg.color,
      lifeDomain: cfg.domain === 'career' ? 'home' : cfg.domain,
      description: cfg.icName
    });
  });

  // Calculate specific Power Places by comparing Benchmark Cities to Planetary Lines
  const powerPlaces: PowerPlaceInfo[] = [];

  BENCHMARK_CITIES.forEach(city => {
    // Find closest planetary line to this city's longitude
    let closestLine: PlanetaryLine | null = null;
    let minDistance = 999;

    lines.forEach(line => {
      let d = Math.abs(city.lng - line.longitudeDegree);
      if (d > 180) d = 360 - d;
      if (d < minDistance) {
        minDistance = d;
        closestLine = line;
      }
    });

    // If within 15 degrees longitude (approx orb of geographical influence)
    if (closestLine && minDistance <= 15) {
      const line: PlanetaryLine = closestLine;
      const isMc = line.lineType === 'MC';

      let headline = '';
      let coreEffect = '';
      let practicalTips: string[] = [];
      let recommendation: PowerPlaceInfo['recommendation'] = 'Reise & Inspiration';
      let lifeDomain: PowerPlaceInfo['lifeDomain'] = line.lifeDomain;

      if (line.planetId === 'Sun') {
        headline = isMc ? `Sonnen-Zenit: Dein Kraftort für maximale Sichtbarkeit & Lebensfreude` : `Sonnen-Wurzel: Ort der inneren Vitalität und Seelenruhe`;
        coreEffect = isMc ? `Hier steht deine Sonne im Zenit. Dein schöpferisches Charisma strahlt mühelos, Türen öffnen sich für geschäftliche Vorhaben und Führung.` : `Dieser Ort stärkt dein inneres Selbstvertrauen und regeneriert deine Lebensbatterien.`;
        practicalTips = isMc ? ['Ideal für wichtige Präsentationen und Verhandlungen', 'Öffentliche Auftritte glücken hier mit natürlicher Leichtigkeit', 'Fördert Großzügigkeit und Respekt'] : ['Perfekt für einen Erholungsurlaub', 'Stärkt die Verbindung zu deinen Wurzeln'];
        recommendation = isMc ? 'Karriere & Business' : 'Rückzug & Seelenfrieden';
        lifeDomain = isMc ? 'career' : 'home';
      } else if (line.planetId === 'Jupiter') {
        headline = isMc ? `Jupiter-Zenit: Das Tor zur finanziellen Fülle & Expansion` : `Jupiter-Wurzel: Tiefer seelischer Reichtum und Wohlgefühl`;
        coreEffect = `Hier wirkt der Große Wohltäter. Glückliche Fügungen, wohlwollende Förderer und horizonterweiternde Begegnungen sind an diesem Ort überdurchschnittlich häufig.`;
        practicalTips = ['Perfekt für Investitionen und Expansionspläne', 'Fördert Studien, Veröffentlichungen und Mentoren', 'Schenkt unerschütterlichen Optimismus'];
        recommendation = 'Karriere & Business';
        lifeDomain = 'career';
      } else if (line.planetId === 'Venus') {
        headline = isMc ? `Venus-Zenit: Ort der künstlerischen Anerkennung & Eleganz` : `Venus-Wurzel: Seelenpartnerschaft, Herzenswärme & Genuss`;
        coreEffect = `Hier schwingt das Prinzip der Liebe, Ästhetik und Harmonie. Begegnungen verlaufen von Herzen, zwischenmenschliche Brücken entstehen spontan.`;
        practicalTips = ['Magischer Ort für Liebesreisen und Hochzeiten', 'Inspiriert Kunst, Design, Mode und Architektur', 'Entspannt das Nervensystem spürbar'];
        recommendation = 'Liebe & Begegnung';
        lifeDomain = 'love';
      } else if (line.planetId === 'Moon') {
        headline = `Mond-Resonanz: Tiefe emotionale Geborgenheit & seelisches Ankommen`;
        coreEffect = `Hier beruhigt sich dein Gemüt. Du fühlst dich sofort „zuhause“, selbst wenn du noch nie zuvor da warst. Starker Zugang zu Träumen und Intuition.`;
        practicalTips = ['Ideal für einen Zweitwohnsitz oder längeren Rückzug', 'Nährt die seelische Regeneration bei Erschöpfung', 'Fördert familiäre Bindungen'];
        recommendation = 'Rückzug & Seelenfrieden';
        lifeDomain = 'home';
      } else if (line.planetId === 'Mercury') {
        headline = `Merkur-Fokus: Geistige Klarheit, Handel & intellektueller Austausch`;
        coreEffect = `Deine Auffassungsgabe läuft hier auf Hochtouren. Schreiben, Lernen, Netzwerken und geschäftlicher Handel fließen ohne kognitiven Widerstand.`;
        practicalTips = ['Bester Ort für Buchprojekte und Recherchen', 'Erleichtert das Knüpfen von Kontakten', 'Schenkt geistige Wendigkeit'];
        recommendation = 'Karriere & Business';
        lifeDomain = 'career';
      } else if (line.planetId === 'Chiron' || line.planetId === 'Neptune' || line.planetId === 'Uranus') {
        headline = `${line.planetName}-Portal: Spirituelle Bewusstseinserweiterung & Heilung`;
        coreEffect = `Ein kraftvoller Transformationsort. Tiefe Einsichten, Befreiung von alten Seelenmustern und Erwachen des höheren Bewusstseins.`;
        practicalTips = ['Ausgezeichnet für Yoga, Retreats und Meditation', 'Öffnet den Zugang zu übersinnlicher Inspiration', 'Löst alte emotionale Blockaden'];
        recommendation = 'Spirituelle Transformation';
        lifeDomain = 'spirit';
      } else {
        headline = `${line.planetName}-${line.lineType} Schwingungslinie`;
        coreEffect = `Aktiviert die archetypische Kraft von ${line.planetName} in deinem Leben.`;
        practicalTips = ['Achtsam die Dynamik dieses Ortes beobachten', 'Nutze die geballte Energie für konkrete Projekte'];
        recommendation = 'Reise & Inspiration';
      }

      powerPlaces.push({
        id: `place-${city.name.toLowerCase().replace(/[^a-z]/g, '')}`,
        cityName: city.name,
        country: city.country,
        latitude: city.lat,
        longitude: city.lng,
        planetId: line.planetId,
        planetName: line.planetName,
        planetSymbol: line.planetSymbol,
        lineType: line.lineType,
        lineTypeName: line.description,
        lifeDomain,
        lifeDomainLabel: lifeDomain === 'career' ? 'Beruf & Erfolg' : (lifeDomain === 'love' ? 'Liebe & Beziehung' : (lifeDomain === 'home' ? 'Seelenheimat' : 'Spiritualität')),
        colorHex: line.colorHex,
        headline,
        coreEffect,
        practicalTips,
        recommendation
      });
    }
  });

  // Filter top domain highlights
  const careerPlaces = powerPlaces.filter(p => p.lifeDomain === 'career').map(p => p.cityName).slice(0, 4);
  const lovePlaces = powerPlaces.filter(p => p.lifeDomain === 'love').map(p => p.cityName).slice(0, 4);
  const homePlaces = powerPlaces.filter(p => p.lifeDomain === 'home').map(p => p.cityName).slice(0, 4);
  const spiritPlaces = powerPlaces.filter(p => p.lifeDomain === 'spirit').map(p => p.cityName).slice(0, 4);

  return {
    birthLocation: {
      cityName: birthCity,
      latitude: birthLat,
      longitude: birthLng
    },
    lines,
    powerPlaces,
    domainSummaries: {
      career: {
        headline: 'Karriere, Finanzen & Öffentliche Sichtbarkeit (Sonne & Jupiter MC)',
        bestPlaces: careerPlaces.length > 0 ? careerPlaces : ['Wien', 'London', 'New York'],
        summary: 'Auf diesen Meridian-Linien erfährst du maximale berufliche Resonanz, Führungskraft und unternehmerischen Rückenwind.'
      },
      love: {
        headline: 'Liebe, Romantik & Seelenbegegnung (Venus & Mond Linien)',
        bestPlaces: lovePlaces.length > 0 ? lovePlaces : ['Paris', 'Rom', 'Bali'],
        summary: 'Orte mit Venus- und Mond-Einfluss öffnen dein Herz für tiefgehende Seelenpartnerschaften und genussvolle Sinnlichkeit.'
      },
      home: {
        headline: 'Seelenheimat, Ruhe & Verwurzelung (Mond & Venus IC)',
        bestPlaces: homePlaces.length > 0 ? homePlaces : ['Zürich', 'Salzburg', 'Kyoto'],
        summary: 'Hier beruhigt sich dein Nervensystem; ideale Kraftorte für Wohnsitze, Erholung und seelische Erdung.'
      },
      spirit: {
        headline: 'Spiritualität, Heilsames & Alchemie (Neptun, Uranus & Chiron)',
        bestPlaces: spiritPlaces.length > 0 ? spiritPlaces : ['Reykjavik', 'Kairo', 'Bali'],
        summary: 'Transformative Kraftzentren für Meditation, Bewusstseinsreisen und tiefe seelische Heilung.'
      }
    }
  };
}
