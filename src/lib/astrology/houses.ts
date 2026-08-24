import { degreeToSignAndPos } from './ephemeris';
import type { ZodiacSign } from './constants';
import * as Astronomy from 'astronomy-engine';

export interface CalculatedHouse {
  number: number; // 1..12
  cuspLongitude: number; // 0..360
  sign: ZodiacSign;
  degreeInSign: number;
  degreeString: string;
}

export interface CalculatedAngles {
  ascendant: {
    longitude: number;
    sign: ZodiacSign;
    degreeInSign: number;
    degreeString: string;
  };
  midheaven: {
    longitude: number;
    sign: ZodiacSign;
    degreeInSign: number;
    degreeString: string;
  };
  descendant: {
    longitude: number;
    sign: ZodiacSign;
    degreeInSign: number;
    degreeString: string;
  };
  imumCoeli: {
    longitude: number;
    sign: ZodiacSign;
    degreeInSign: number;
    degreeString: string;
  };
}

export interface HouseCalculationResult {
  houses: CalculatedHouse[];
  angles: CalculatedAngles;
  cusps: number[]; // 12 elements
  system: 'placidus' | 'equal';
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function normalizeDegree(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// Convert UTC date to Julian Day
export function dateToJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// Obliquity of the Ecliptic
export function getObliquity(julianDay: number): number {
  const T = (julianDay - 2451545.0) / 36525.0;
  return 23.4392911 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

// Exact standard Placidus formula
function placidusExact(ramcOffsetDeg: number, factor: number, ramcDeg: number, latDeg: number, epsDeg: number): number {
  const r = normalizeDegree(ramcDeg + ramcOffsetDeg) * DEG2RAD;
  const epsRad = epsDeg * DEG2RAD;
  const p = Math.atan(Math.tan(latDeg * DEG2RAD) * factor);
  
  const Y = Math.sin(r);
  const X = Math.cos(r) * Math.cos(epsRad) - Math.tan(p) * Math.sin(epsRad);
  return normalizeDegree(Math.atan2(Y, X) * RAD2DEG);
}

// Calculate Ascendant, MC, and Houses
export function calculateHouses(
  utcDate: Date,
  geoLatitude: number,
  geoLongitude: number,
  system: 'placidus' | 'equal' = 'placidus'
): HouseCalculationResult {
  const jd = dateToJulianDay(utcDate);
  const time = Astronomy.MakeTime(utcDate);
  const gmst = Astronomy.SiderealTime(time) * 15; // Greenwich Sidereal Time in degrees
  const ramc = normalizeDegree(gmst + geoLongitude);
  const eps = getObliquity(jd);

  const ramcRad = ramc * DEG2RAD;
  const epsRad = eps * DEG2RAD;
  const latRad = geoLatitude * DEG2RAD;

  // Calculate MC (Medium Coeli)
  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * RAD2DEG;
  mc = normalizeDegree(mc);

  // Calculate Ascendant (AC): Y = cos(RAMC), X = -sin(RAMC)*cos(eps) - tan(lat)*sin(eps)
  const Y = Math.cos(ramcRad);
  const X = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let asc = Math.atan2(Y, X) * RAD2DEG;
  asc = normalizeDegree(asc);

  const ic = normalizeDegree(mc + 180);
  const dc = normalizeDegree(asc + 180);

  const cusps: number[] = new Array(12);

  if (system === 'equal') {
    for (let i = 0; i < 12; i++) {
      cusps[i] = normalizeDegree(asc + i * 30);
    }
  } else {
    // Placidus House calculation
    if (Math.abs(geoLatitude) > 66.5) {
      for (let i = 0; i < 12; i++) {
        cusps[i] = normalizeDegree(asc + i * 30);
      }
    } else {
      cusps[0] = asc; // 1st House cusp (AC)
      cusps[1] = placidusExact(120, 2 / 3, ramc, geoLatitude, eps); // 2nd house
      cusps[2] = placidusExact(150, 1 / 3, ramc, geoLatitude, eps); // 3rd house
      cusps[3] = ic;  // 4th House cusp (IC)
      cusps[4] = normalizeDegree(placidusExact(30, 1 / 3, ramc, geoLatitude, eps) + 180); // 5th house
      cusps[5] = normalizeDegree(placidusExact(60, 2 / 3, ramc, geoLatitude, eps) + 180); // 6th house
      cusps[6] = dc;  // 7th House cusp (DC)
      cusps[7] = normalizeDegree(cusps[1] + 180); // 8th house
      cusps[8] = normalizeDegree(cusps[2] + 180); // 9th house
      cusps[9] = mc;  // 10th House cusp (MC)
      cusps[10] = placidusExact(30, 1 / 3, ramc, geoLatitude, eps); // 11th house
      cusps[11] = placidusExact(60, 2 / 3, ramc, geoLatitude, eps); // 12th house
    }
  }

  const ascPos = degreeToSignAndPos(asc);
  const mcPos = degreeToSignAndPos(mc);
  const dcPos = degreeToSignAndPos(dc);
  const icPos = degreeToSignAndPos(ic);

  const houses: CalculatedHouse[] = cusps.map((cuspLon, idx) => {
    const pos = degreeToSignAndPos(cuspLon);
    return {
      number: idx + 1,
      cuspLongitude: cuspLon,
      sign: pos.sign,
      degreeInSign: pos.degreeInSign,
      degreeString: pos.degreeString
    };
  });

  return {
    houses,
    cusps,
    system,
    angles: {
      ascendant: {
        longitude: asc,
        sign: ascPos.sign,
        degreeInSign: ascPos.degreeInSign,
        degreeString: ascPos.degreeString
      },
      midheaven: {
        longitude: mc,
        sign: mcPos.sign,
        degreeInSign: mcPos.degreeInSign,
        degreeString: mcPos.degreeString
      },
      descendant: {
        longitude: dc,
        sign: dcPos.sign,
        degreeInSign: dcPos.degreeInSign,
        degreeString: dcPos.degreeString
      },
      imumCoeli: {
        longitude: ic,
        sign: icPos.sign,
        degreeInSign: icPos.degreeInSign,
        degreeString: icPos.degreeString
      }
    }
  };
}
