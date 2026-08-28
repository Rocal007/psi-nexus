import * as Astronomy from 'astronomy-engine';
import { degreeToSignAndPos } from '../astrology/ephemeris';
import type { HDActivation, HDPlanetId } from './types';

// The canonical sequence of 64 gates in the Human Design Mandala starting from 0°00'00" Aries
export const MANDALA_GATE_ORDER: number[] = [
  25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12,
  15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47, 6,
  46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11,
  10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30, 55, 37, 63, 22, 36
];

export const GATE_SPAN_DEG = 360.0 / 64.0; // 5.625 degrees
export const LINE_SPAN_DEG = GATE_SPAN_DEG / 6.0; // 0.9375 degrees = 56' 15"
export const COLOR_SPAN_DEG = LINE_SPAN_DEG / 6.0; // ~0.15625 degrees
export const TONE_SPAN_DEG = COLOR_SPAN_DEG / 6.0; // ~0.0260416 degrees
export const BASE_SPAN_DEG = TONE_SPAN_DEG / 5.0; // ~0.0052083 degrees

export interface GateCalculationResult {
  gate: number;
  line: number;
  color: number;
  tone: number;
  base: number;
  degreeInGate: number;
  gateIndex: number;
}

// Map any 0..360 longitude to its exact Gate, Line, Color, Tone, Base
export function longitudeToGateInfo(longitude: number): GateCalculationResult {
  const normLon = ((longitude % 360) + 360) % 360;
  const gateIndex = Math.floor(normLon / GATE_SPAN_DEG);
  const gate = MANDALA_GATE_ORDER[gateIndex];

  const degreeInGate = normLon - gateIndex * GATE_SPAN_DEG;
  const line = Math.min(6, Math.floor(degreeInGate / LINE_SPAN_DEG) + 1);

  const degreeInLine = degreeInGate - (line - 1) * LINE_SPAN_DEG;
  const color = Math.min(6, Math.floor(degreeInLine / COLOR_SPAN_DEG) + 1);

  const degreeInColor = degreeInLine - (color - 1) * COLOR_SPAN_DEG;
  const tone = Math.min(6, Math.floor(degreeInColor / TONE_SPAN_DEG) + 1);

  const degreeInTone = degreeInColor - (tone - 1) * TONE_SPAN_DEG;
  const base = Math.min(5, Math.floor(degreeInTone / BASE_SPAN_DEG) + 1);

  return {
    gate,
    line,
    color,
    tone,
    base,
    degreeInGate,
    gateIndex
  };
}

// Calculate Mean North Node
function calculateNorthNode(julianDay: number): number {
  const T = (julianDay - 2451545.0) / 36525.0;
  let omega = 125.04452222 - 1934.1362608 * T + 0.0020708 * T * T + (T * T * T) / 450000.0;
  return ((omega % 360) + 360) % 360;
}

// Get Sun Longitude at given Date
export function getSunLongitudeAt(date: Date): number {
  const time = Astronomy.MakeTime(date);
  const sunPos = Astronomy.SunPosition(time);
  return ((sunPos.elon % 360) + 360) % 360;
}

// Astronomical root finder: Find the exact UTC time when the Sun was 88 degrees before birth Sun
export function calculateDesignUtcDate(utcBirthDate: Date): Date {
  const birthSunLon = getSunLongitudeAt(utcBirthDate);
  const targetDesignSunLon = ((birthSunLon - 88.0) % 360 + 360) % 360;

  // Initial estimate: 88 degrees solar arc is approx ~89.3 days prior to birth
  let currentMs = utcBirthDate.getTime() - 89.3 * 86400000;

  // High precision Newton-Raphson iteration
  for (let i = 0; i < 20; i++) {
    const currentSunLon = getSunLongitudeAt(new Date(currentMs));
    let diff = currentSunLon - targetDesignSunLon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (Math.abs(diff) < 1e-7) {
      break;
    }

    // Solar speed is roughly 0.9856 deg/day = 0.9856 / 86400000 deg/ms
    const correctionMs = (diff / 0.985607) * 86400000;
    currentMs -= correctionMs;
  }

  return new Date(currentMs);
}

// Calculate HD Planetary Activations for 13 bodies
export function calculateHDPlanetaryActivations(utcDate: Date): HDActivation[] {
  const time = Astronomy.MakeTime(utcDate);
  const jd = time.ut;
  const timePlusHour = Astronomy.MakeTime(new Date(utcDate.getTime() + 3600 * 1000));

  // 1. Sun
  const sunPos = Astronomy.SunPosition(time);
  const sunLon = ((sunPos.elon % 360) + 360) % 360;
  const sunGate = longitudeToGateInfo(sunLon);
  const sunSign = degreeToSignAndPos(sunLon);

  // 2. Earth (exactly opposite Sun)
  const earthLon = ((sunLon + 180) % 360 + 360) % 360;
  const earthGate = longitudeToGateInfo(earthLon);
  const earthSign = degreeToSignAndPos(earthLon);

  // 3. Moon
  const moonPos = Astronomy.EclipticGeoMoon(time);
  const moonLon = ((moonPos.lon % 360) + 360) % 360;
  const moonGate = longitudeToGateInfo(moonLon);
  const moonSign = degreeToSignAndPos(moonLon);

  // 4. North Node
  const nodeLon = calculateNorthNode(jd);
  const nodeGate = longitudeToGateInfo(nodeLon);
  const nodeSign = degreeToSignAndPos(nodeLon);

  // 5. South Node (opposite North Node)
  const southNodeLon = ((nodeLon + 180) % 360 + 360) % 360;
  const southNodeGate = longitudeToGateInfo(southNodeLon);
  const southNodeSign = degreeToSignAndPos(southNodeLon);

  // Other Planets
  const otherPlanets: Array<{ id: HDPlanetId; name: string; symbol: string; body: Astronomy.Body }> = [
    { id: 'Mercury', name: 'Merkur', symbol: '☿', body: Astronomy.Body.Mercury },
    { id: 'Venus', name: 'Venus', symbol: '♀', body: Astronomy.Body.Venus },
    { id: 'Mars', name: 'Mars', symbol: '♂', body: Astronomy.Body.Mars },
    { id: 'Jupiter', name: 'Jupiter', symbol: '♃', body: Astronomy.Body.Jupiter },
    { id: 'Saturn', name: 'Saturn', symbol: '♄', body: Astronomy.Body.Saturn },
    { id: 'Uranus', name: 'Uranus', symbol: '♅', body: Astronomy.Body.Uranus },
    { id: 'Neptune', name: 'Neptun', symbol: '♆', body: Astronomy.Body.Neptune },
    { id: 'Pluto', name: 'Pluto', symbol: '♇', body: Astronomy.Body.Pluto }
  ];

  const results: HDActivation[] = [
    {
      planetId: 'Sun',
      planetName: 'Sonne',
      symbol: '☉',
      longitude: sunLon,
      gate: sunGate.gate,
      line: sunGate.line,
      color: sunGate.color,
      tone: sunGate.tone,
      base: sunGate.base,
      isRetrograde: false,
      signName: sunSign.sign.name,
      signSymbol: sunSign.sign.symbol,
      degreeString: sunSign.degreeString
    },
    {
      planetId: 'Earth',
      planetName: 'Erde',
      symbol: '⊕',
      longitude: earthLon,
      gate: earthGate.gate,
      line: earthGate.line,
      color: earthGate.color,
      tone: earthGate.tone,
      base: earthGate.base,
      isRetrograde: false,
      signName: earthSign.sign.name,
      signSymbol: earthSign.sign.symbol,
      degreeString: earthSign.degreeString
    },
    {
      planetId: 'Moon',
      planetName: 'Mond',
      symbol: '☽',
      longitude: moonLon,
      gate: moonGate.gate,
      line: moonGate.line,
      color: moonGate.color,
      tone: moonGate.tone,
      base: moonGate.base,
      isRetrograde: false,
      signName: moonSign.sign.name,
      signSymbol: moonSign.sign.symbol,
      degreeString: moonSign.degreeString
    },
    {
      planetId: 'NorthNode',
      planetName: 'Nördl. Mondknoten',
      symbol: '☊',
      longitude: nodeLon,
      gate: nodeGate.gate,
      line: nodeGate.line,
      color: nodeGate.color,
      tone: nodeGate.tone,
      base: nodeGate.base,
      isRetrograde: true,
      signName: nodeSign.sign.name,
      signSymbol: nodeSign.sign.symbol,
      degreeString: nodeSign.degreeString
    },
    {
      planetId: 'SouthNode',
      planetName: 'Südl. Mondknoten',
      symbol: '☋',
      longitude: southNodeLon,
      gate: southNodeGate.gate,
      line: southNodeGate.line,
      color: southNodeGate.color,
      tone: southNodeGate.tone,
      base: southNodeGate.base,
      isRetrograde: true,
      signName: southNodeSign.sign.name,
      signSymbol: southNodeSign.sign.symbol,
      degreeString: southNodeSign.degreeString
    }
  ];

  for (const item of otherPlanets) {
    const vec = Astronomy.GeoVector(item.body, time, false);
    const ecl = Astronomy.Ecliptic(vec);
    const lon = ((ecl.elon % 360) + 360) % 360;

    const vecNext = Astronomy.GeoVector(item.body, timePlusHour, false);
    const eclNext = Astronomy.Ecliptic(vecNext);
    const lonNext = ((eclNext.elon % 360) + 360) % 360;

    let diff = lonNext - lon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const isRetrograde = diff < 0;

    const gateInfo = longitudeToGateInfo(lon);
    const signInfo = degreeToSignAndPos(lon);

    results.push({
      planetId: item.id,
      planetName: item.name,
      symbol: item.symbol,
      longitude: lon,
      gate: gateInfo.gate,
      line: gateInfo.line,
      color: gateInfo.color,
      tone: gateInfo.tone,
      base: gateInfo.base,
      isRetrograde,
      signName: signInfo.sign.name,
      signSymbol: signInfo.sign.symbol,
      degreeString: signInfo.degreeString
    });
  }

  return results;
}
