import { calculateHouses, type HouseCalculationResult } from './houses';
import { calculatePlanetaryPositions, type CalculatedPlanet } from './ephemeris';
import { calculateAspects, type CalculatedAspect } from './aspects';
import { calculateElementModalityBalance, getPlanetDignity, type ElementModalityBalance, type DignityInfo } from './dignities';
import { detectSpecialConfigurations, type LifePillarsAnalysis } from './specialConfigurations';
import { generateKarmicNodesMatrix, type KarmicNodesMatrix } from './karmicNodes';
import { generateCompleteNumerology, type CompleteNumerologyProfile } from '../numerology/engine';
import { localToUtcDate } from '../geo/geocode';
import { ESOTERIC_SIGNS, type EsotericSignInterpretation } from '../interpretations/signs';
import { NORTH_NODE_DEUTUNGEN, CHIRON_DEUTUNGEN, LILITH_DEUTUNGEN } from '../interpretations/karmic';
import { getSunSignInsight, getMoonSignInsight, getAscendantInsight, HOUSES_INFO } from '../interpretations/planets';
import * as Astronomy from 'astronomy-engine';

export interface ChartInput {
  name?: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  cityName: string;
  countryName?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  houseSystem?: 'placidus' | 'equal';
}

export interface EnrichedPlanet extends CalculatedPlanet {
  dignity: DignityInfo;
  esotericSign: EsotericSignInterpretation;
}

export interface CompleteNatalChart {
  input: ChartInput;
  utcDate: Date;
  housesResult: HouseCalculationResult;
  planets: EnrichedPlanet[];
  aspects: CalculatedAspect[];
  balance: ElementModalityBalance;
  lifePillars: LifePillarsAnalysis;
  numerology: CompleteNumerologyProfile;
  karmicNodes: KarmicNodesMatrix;
  synthesis: {
    sun: {
      planet: EnrichedPlanet;
      insight: string;
    };
    moon: {
      planet: EnrichedPlanet;
      insight: string;
    };
    ascendant: {
      sign: EsotericSignInterpretation;
      degreeString: string;
      insight: string;
    };
    midheaven: {
      sign: EsotericSignInterpretation;
      degreeString: string;
      insight: string;
    };
    northNode: {
      planet: EnrichedPlanet;
      deutung: typeof NORTH_NODE_DEUTUNGEN[string];
    };
    chiron: {
      planet: EnrichedPlanet;
      deutung: typeof CHIRON_DEUTUNGEN[string];
    };
    lilith: {
      planet: EnrichedPlanet;
      deutung: typeof LILITH_DEUTUNGEN[string];
    };
  };
}

export function generateNatalChart(input: ChartInput): CompleteNatalChart {
  const houseSystem = input.houseSystem || 'placidus';
  const utcDate = localToUtcDate(input.birthDate, input.birthTime, input.timezone);

  // 1. Calculate Houses & Angles
  const housesResult = calculateHouses(utcDate, input.latitude, input.longitude, houseSystem);

  // 2. Calculate Planets
  const rawPlanets = calculatePlanetaryPositions(utcDate, housesResult.cusps);

  // 3. Enrich Planets with Dignities & Esoteric Sign Info
  const planets: EnrichedPlanet[] = rawPlanets.map(p => {
    const dignity = getPlanetDignity(p.id, p.sign.id);
    const esotericSign = ESOTERIC_SIGNS[p.sign.id] || ESOTERIC_SIGNS['aries'];
    return {
      ...p,
      dignity,
      esotericSign
    };
  });

  // 4. Calculate Aspects
  const aspects = calculateAspects(planets);

  // 5. Calculate Elements & Modalities
  const balance = calculateElementModalityBalance(planets);

  // 6. Detect Stelliums, Aspect Patterns & 3 Life Pillars
  const lifePillars = detectSpecialConfigurations(planets, aspects, housesResult, balance);

  const sunPlanet = planets.find(p => p.id === 'Sun') || planets[0];
  const moonPlanet = planets.find(p => p.id === 'Moon') || planets[1];
  const nodePlanet = planets.find(p => p.id === 'NorthNode') || planets[10];
  const chironPlanet = planets.find(p => p.id === 'Chiron') || planets[11];
  const lilithPlanet = planets.find(p => p.id === 'Lilith') || planets[12];

  const ascSign = ESOTERIC_SIGNS[housesResult.angles.ascendant.sign.id] || ESOTERIC_SIGNS['aries'];
  const mcSign = ESOTERIC_SIGNS[housesResult.angles.midheaven.sign.id] || ESOTERIC_SIGNS['capricorn'];

  // 7. Calculate Karmic Nodes Matrix (North/South Node, Fortune, Vertex, Chiron, Lilith)
  const time = Astronomy.MakeTime(utcDate);
  const gmst = Astronomy.SiderealTime(time) * 15;
  const ramc = ((gmst + input.longitude % 360) + 360) % 360;
  const jd = utcDate.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  const eps = 23.4392911 - 0.0130042 * T;

  const karmicNodes = generateKarmicNodesMatrix(
    housesResult,
    sunPlanet.longitude,
    sunPlanet.house,
    moonPlanet.longitude,
    nodePlanet.longitude,
    chironPlanet.longitude,
    lilithPlanet.longitude,
    input.latitude,
    eps,
    ramc
  );

  // 8. Generate Numerological Profile
  const numerology = generateCompleteNumerology(
    input.name || '',
    input.birthDate,
    sunPlanet.sign.name,
    ascSign.name
  );

  const synthesis = {
    sun: {
      planet: sunPlanet,
      insight: getSunSignInsight(sunPlanet.sign.id)
    },
    moon: {
      planet: moonPlanet,
      insight: getMoonSignInsight(moonPlanet.sign.id)
    },
    ascendant: {
      sign: ascSign,
      degreeString: housesResult.angles.ascendant.degreeString,
      insight: getAscendantInsight(ascSign.id)
    },
    midheaven: {
      sign: mcSign,
      degreeString: housesResult.angles.midheaven.degreeString,
      insight: `Dein Medium Coeli (MC) in ${mcSign.name} offenbart deine Berufung: Du bist berufen, die Qualitäten von ${mcSign.name} (${mcSign.element}, ${mcSign.soulMotto}) in dein öffentliches Wirken einzubringen.`
    },
    northNode: {
      planet: nodePlanet,
      deutung: NORTH_NODE_DEUTUNGEN[nodePlanet.sign.id] || NORTH_NODE_DEUTUNGEN['aries']
    },
    chiron: {
      planet: chironPlanet,
      deutung: CHIRON_DEUTUNGEN[chironPlanet.sign.id] || CHIRON_DEUTUNGEN['aries']
    },
    lilith: {
      planet: lilithPlanet,
      deutung: LILITH_DEUTUNGEN[lilithPlanet.sign.id] || LILITH_DEUTUNGEN['aries']
    }
  };

  return {
    input,
    utcDate,
    housesResult,
    planets,
    aspects,
    balance,
    lifePillars,
    numerology,
    karmicNodes,
    synthesis
  };
}
