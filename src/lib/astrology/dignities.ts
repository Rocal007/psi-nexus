import type { CalculatedPlanet } from './ephemeris';

export interface DignityInfo {
  state: 'domicile' | 'exaltation' | 'detriment' | 'fall' | 'peregrine';
  label: string;
  badgeColor: string;
  description: string;
}

export interface ElementModalityBalance {
  elements: {
    fire: { count: number; percentage: number; planets: string[] };
    earth: { count: number; percentage: number; planets: string[] };
    air: { count: number; percentage: number; planets: string[] };
    water: { count: number; percentage: number; planets: string[] };
  };
  modalities: {
    cardinal: { count: number; percentage: number; planets: string[] };
    fixed: { count: number; percentage: number; planets: string[] };
    mutable: { count: number; percentage: number; planets: string[] };
  };
  dominantElement: string;
  dominantModality: string;
}

// Classical rulerships & exaltations
const DOMICILES: Record<string, string[]> = {
  Sun: ['leo'],
  Moon: ['cancer'],
  Mercury: ['gemini', 'virgo'],
  Venus: ['taurus', 'libra'],
  Mars: ['aries', 'scorpio'],
  Jupiter: ['sagittarius', 'pisces'],
  Saturn: ['capricorn', 'aquarius'],
  Uranus: ['aquarius'],
  Neptune: ['pisces'],
  Pluto: ['scorpio']
};

const EXALTATIONS: Record<string, string> = {
  Sun: 'aries',
  Moon: 'taurus',
  Mercury: 'virgo',
  Venus: 'pisces',
  Mars: 'capricorn',
  Jupiter: 'cancer',
  Saturn: 'libra',
  Uranus: 'scorpio',
  Neptune: 'cancer',
  Pluto: 'leo'
};

const DETRIMENTS: Record<string, string[]> = {
  Sun: ['aquarius'],
  Moon: ['capricorn'],
  Mercury: ['sagittarius', 'pisces'],
  Venus: ['scorpio', 'aries'],
  Mars: ['libra', 'taurus'],
  Jupiter: ['gemini', 'virgo'],
  Saturn: ['cancer', 'leo'],
  Uranus: ['leo'],
  Neptune: ['virgo'],
  Pluto: ['taurus']
};

const FALLS: Record<string, string> = {
  Sun: 'libra',
  Moon: 'scorpio',
  Mercury: 'pisces',
  Venus: 'virgo',
  Mars: 'cancer',
  Jupiter: 'capricorn',
  Saturn: 'aries',
  Uranus: 'taurus',
  Neptune: 'capricorn',
  Pluto: 'aquarius'
};

export function getPlanetDignity(planetId: string, signId: string): DignityInfo {
  if (DOMICILES[planetId]?.includes(signId)) {
    return {
      state: 'domicile',
      label: 'Domizil (Heimat)',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Der Planet steht in seinem ureigenen Herrschaftszeichen und entfaltet seine reinste Schöpferkraft.'
    };
  }
  if (EXALTATIONS[planetId] === signId) {
    return {
      state: 'exaltation',
      label: 'Erhöhung',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description: 'Der Planet wirkt mit besonderer Würde, erhabenem Ausdruck und edler Frequenz.'
    };
  }
  if (DETRIMENTS[planetId]?.includes(signId)) {
    return {
      state: 'detriment',
      label: 'Exil',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      description: 'Der Planet steht im Gegenzeichen und muss neue, unkonventionelle Wege zur Entfaltung finden.'
    };
  }
  if (FALLS[planetId] === signId) {
    return {
      state: 'fall',
      label: 'Fall',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description: 'Hier ist besondere Bewusstheit und seelische Meisterschaft gefordert, um die Energie zu verfeinern.'
    };
  }

  return {
    state: 'peregrine',
    label: 'Neutral',
    badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
    description: 'Der Planet wirkt flexibel durch die Farbgebung des Zeichens.'
  };
}

export function calculateElementModalityBalance(planets: CalculatedPlanet[]): ElementModalityBalance {
  const elements = {
    fire: { count: 0, percentage: 0, planets: [] as string[] },
    earth: { count: 0, percentage: 0, planets: [] as string[] },
    air: { count: 0, percentage: 0, planets: [] as string[] },
    water: { count: 0, percentage: 0, planets: [] as string[] }
  };

  const modalities = {
    cardinal: { count: 0, percentage: 0, planets: [] as string[] },
    fixed: { count: 0, percentage: 0, planets: [] as string[] },
    mutable: { count: 0, percentage: 0, planets: [] as string[] }
  };

  const corePlanets = planets.filter(p => ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].includes(p.id));
  const total = corePlanets.length || 1;

  for (const p of corePlanets) {
    const el = p.sign.element;
    const mod = p.sign.modality;

    if (el === 'Feuer') { elements.fire.count++; elements.fire.planets.push(p.name); }
    if (el === 'Erde') { elements.earth.count++; elements.earth.planets.push(p.name); }
    if (el === 'Luft') { elements.air.count++; elements.air.planets.push(p.name); }
    if (el === 'Wasser') { elements.water.count++; elements.water.planets.push(p.name); }

    if (mod === 'Kardinal') { modalities.cardinal.count++; modalities.cardinal.planets.push(p.name); }
    if (mod === 'Fix') { modalities.fixed.count++; modalities.fixed.planets.push(p.name); }
    if (mod === 'Veränderlich') { modalities.mutable.count++; modalities.mutable.planets.push(p.name); }
  }

  elements.fire.percentage = Math.round((elements.fire.count / total) * 100);
  elements.earth.percentage = Math.round((elements.earth.count / total) * 100);
  elements.air.percentage = Math.round((elements.air.count / total) * 100);
  elements.water.percentage = Math.round((elements.water.count / total) * 100);

  modalities.cardinal.percentage = Math.round((modalities.cardinal.count / total) * 100);
  modalities.fixed.percentage = Math.round((modalities.fixed.count / total) * 100);
  modalities.mutable.percentage = Math.round((modalities.mutable.count / total) * 100);

  let dominantElement = 'Feuer';
  let maxEl = elements.fire.count;
  if (elements.earth.count > maxEl) { dominantElement = 'Erde'; maxEl = elements.earth.count; }
  if (elements.air.count > maxEl) { dominantElement = 'Luft'; maxEl = elements.air.count; }
  if (elements.water.count > maxEl) { dominantElement = 'Wasser'; maxEl = elements.water.count; }

  let dominantModality = 'Kardinal';
  let maxMod = modalities.cardinal.count;
  if (modalities.fixed.count > maxMod) { dominantModality = 'Fix'; maxMod = modalities.fixed.count; }
  if (modalities.mutable.count > maxMod) { dominantModality = 'Veränderlich'; maxMod = modalities.mutable.count; }

  return {
    elements,
    modalities,
    dominantElement,
    dominantModality
  };
}
