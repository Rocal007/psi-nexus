import * as Astronomy from 'astronomy-engine';
import { ZODIAC_SIGNS, CELESTIAL_BODIES, type ZodiacSign } from './constants';

export interface CalculatedPlanet {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  type: string;
  color: string;
  longitude: number; // 0..360
  sign: ZodiacSign;
  degreeInSign: number; // 0..29.999
  degreeString: string; // e.g. "14° 23'"
  house: number; // 1..12
  isRetrograde: boolean;
  speed: number; // deg/day
  esotericMeaning: string;
}

// Convert absolute degree to Sign + Degree/Minute
export function degreeToSignAndPos(longitude: number): { sign: ZodiacSign; degreeInSign: number; degreeString: string } {
  let normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const sign = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
  const degreeInSign = normalized - signIndex * 30;
  const deg = Math.floor(degreeInSign);
  const min = Math.floor((degreeInSign - deg) * 60);
  const sec = Math.floor(((degreeInSign - deg) * 60 - min) * 60);
  const degreeString = `${deg}° ${min.toString().padStart(2, '0')}'`;

  return { sign, degreeInSign, degreeString };
}

// Calculate Mean North Node (Rahu)
function calculateNorthNode(julianDay: number): number {
  const T = (julianDay - 2451545.0) / 36525.0;
  let omega = 125.04452222 - 1934.1362608 * T + 0.0020708 * T * T + (T * T * T) / 450000.0;
  return ((omega % 360) + 360) % 360;
}

// Calculate Mean Lunar Apogee (Lilith / Black Moon)
function calculateLilith(julianDay: number): number {
  const T = (julianDay - 2451545.0) / 36525.0;
  let lilith = 83.35324312 + 4069.0137287 * T - 0.01032 * T * T - (T * T * T) / 80053.0;
  return ((lilith % 360) + 360) % 360;
}

// Calculate Chiron approximation
function calculateChiron(julianDay: number): number {
  // Chiron epoch J2000 elements
  const T = (julianDay - 2451545.0) / 36525.0;
  const d = julianDay - 2451545.0;
  const n = 360.0 / (50.76 * 365.25); // mean motion deg/day
  let M = 217.5 + n * d; // Mean anomaly
  M = ((M % 360) + 360) % 360;
  const e = 0.383;
  const rad = Math.PI / 180;
  // Approximate Equation of Center
  const E = M + (2 * e - (e * e * e) / 4) * Math.sin(M * rad) * (180 / Math.PI) + (5 / 4) * e * e * Math.sin(2 * M * rad) * (180 / Math.PI);
  const w = 339.6; // argument of perihelion + ascending node
  let lon = E + w;
  return ((lon % 360) + 360) % 360;
}

// Determine which house a planetary longitude belongs to
export function determineHouse(longitude: number, houseCusps: number[]): number {
  const lon = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const cuspCurrent = houseCusps[i];
    const cuspNext = houseCusps[(i + 1) % 12];

    if (cuspCurrent < cuspNext) {
      if (lon >= cuspCurrent && lon < cuspNext) {
        return i + 1;
      }
    } else {
      // Wraps around 360/0 degrees
      if (lon >= cuspCurrent || lon < cuspNext) {
        return i + 1;
      }
    }
  }
  return 1;
}

// Main function to calculate all planets given a UTC Date and House Cusps
export function calculatePlanetaryPositions(utcDate: Date, houseCusps: number[] = []): CalculatedPlanet[] {
  const time = Astronomy.MakeTime(utcDate);
  const jd = time.ut; // Julian date

  // 1 hour later for retrograde & speed calculation
  const timePlusHour = Astronomy.MakeTime(new Date(utcDate.getTime() + 3600 * 1000));

  const standardBodies: Array<{ id: string; body: Astronomy.Body }> = [
    { id: 'Sun', body: Astronomy.Body.Sun },
    { id: 'Moon', body: Astronomy.Body.Moon },
    { id: 'Mercury', body: Astronomy.Body.Mercury },
    { id: 'Venus', body: Astronomy.Body.Venus },
    { id: 'Mars', body: Astronomy.Body.Mars },
    { id: 'Jupiter', body: Astronomy.Body.Jupiter },
    { id: 'Saturn', body: Astronomy.Body.Saturn },
    { id: 'Uranus', body: Astronomy.Body.Uranus },
    { id: 'Neptune', body: Astronomy.Body.Neptune },
    { id: 'Pluto', body: Astronomy.Body.Pluto }
  ];

  const results: CalculatedPlanet[] = [];

  for (const item of standardBodies) {
    const info = CELESTIAL_BODIES[item.id];
    let lon = 0;
    let lonNext = 0;

    if (item.id === 'Sun') {
      const sunPos = Astronomy.SunPosition(time);
      lon = sunPos.elon;
      const sunPosNext = Astronomy.SunPosition(timePlusHour);
      lonNext = sunPosNext.elon;
    } else if (item.id === 'Moon') {
      const moonPos = Astronomy.EclipticGeoMoon(time);
      lon = moonPos.lon;
      const moonPosNext = Astronomy.EclipticGeoMoon(timePlusHour);
      lonNext = moonPosNext.lon;
    } else {
      const vec = Astronomy.GeoVector(item.body, time, false);
      const ecl = Astronomy.Ecliptic(vec);
      lon = ecl.elon;

      const vecNext = Astronomy.GeoVector(item.body, timePlusHour, false);
      const eclNext = Astronomy.Ecliptic(vecNext);
      lonNext = eclNext.elon;
    }

    lon = ((lon % 360) + 360) % 360;
    lonNext = ((lonNext % 360) + 360) % 360;

    let diff = lonNext - lon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const isRetrograde = item.id !== 'Sun' && item.id !== 'Moon' && diff < 0;
    const speed = diff * 24; // degrees per day

    const { sign, degreeInSign, degreeString } = degreeToSignAndPos(lon);
    const house = houseCusps.length === 12 ? determineHouse(lon, houseCusps) : 1;

    results.push({
      id: item.id,
      name: info.name,
      nameEn: info.nameEn,
      symbol: info.symbol,
      type: info.type,
      color: info.color,
      longitude: lon,
      sign,
      degreeInSign,
      degreeString,
      house,
      isRetrograde,
      speed,
      esotericMeaning: info.esotericMeaning
    });
  }

  // Calculate North Node
  const nodeLon = calculateNorthNode(jd);
  const nodeLonNext = calculateNorthNode(jd + 1 / 24);
  const nodeDiff = nodeLonNext - nodeLon;
  const nodePos = degreeToSignAndPos(nodeLon);
  const nodeInfo = CELESTIAL_BODIES['NorthNode'];
  results.push({
    id: 'NorthNode',
    name: nodeInfo.name,
    nameEn: nodeInfo.nameEn,
    symbol: nodeInfo.symbol,
    type: nodeInfo.type,
    color: nodeInfo.color,
    longitude: nodeLon,
    sign: nodePos.sign,
    degreeInSign: nodePos.degreeInSign,
    degreeString: nodePos.degreeString,
    house: houseCusps.length === 12 ? determineHouse(nodeLon, houseCusps) : 1,
    isRetrograde: nodeDiff < 0,
    speed: nodeDiff * 24,
    esotericMeaning: nodeInfo.esotericMeaning
  });

  // Calculate Chiron
  const chironLon = calculateChiron(jd);
  const chironLonNext = calculateChiron(jd + 1 / 24);
  const chironDiff = chironLonNext - chironLon;
  const chironPos = degreeToSignAndPos(chironLon);
  const chironInfo = CELESTIAL_BODIES['Chiron'];
  results.push({
    id: 'Chiron',
    name: chironInfo.name,
    nameEn: chironInfo.nameEn,
    symbol: chironInfo.symbol,
    type: chironInfo.type,
    color: chironInfo.color,
    longitude: chironLon,
    sign: chironPos.sign,
    degreeInSign: chironPos.degreeInSign,
    degreeString: chironPos.degreeString,
    house: houseCusps.length === 12 ? determineHouse(chironLon, houseCusps) : 1,
    isRetrograde: chironDiff < 0,
    speed: chironDiff * 24,
    esotericMeaning: chironInfo.esotericMeaning
  });

  // Calculate Lilith
  const lilithLon = calculateLilith(jd);
  const lilithLonNext = calculateLilith(jd + 1 / 24);
  const lilithDiff = lilithLonNext - lilithLon;
  const lilithPos = degreeToSignAndPos(lilithLon);
  const lilithInfo = CELESTIAL_BODIES['Lilith'];
  results.push({
    id: 'Lilith',
    name: lilithInfo.name,
    nameEn: lilithInfo.nameEn,
    symbol: lilithInfo.symbol,
    type: lilithInfo.type,
    color: lilithInfo.color,
    longitude: lilithLon,
    sign: lilithPos.sign,
    degreeInSign: lilithPos.degreeInSign,
    degreeString: lilithPos.degreeString,
    house: houseCusps.length === 12 ? determineHouse(lilithLon, houseCusps) : 1,
    isRetrograde: lilithDiff < 0,
    speed: lilithDiff * 24,
    esotericMeaning: lilithInfo.esotericMeaning
  });

  return results;
}
