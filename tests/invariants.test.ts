import { describe, it, expect } from 'vitest';
import { calculateMidpointLongitude } from '../src/lib/astrology/synastry';
import { degreeToSignAndPos, calculatePlanetaryPositions } from '../src/lib/astrology/ephemeris';
import { validateBirthProfileInputDTO } from '../src/lib/dto/birthProfile.dto';
import { Result } from '../src/lib/dto/result';
import { generateNatalChart, type ChartInput } from '../src/lib/astrology/engine';
import { ALL_HD_GATES } from '../src/lib/humandesign/gatesData';
import { HD_CENTERS, ALL_CENTER_IDS } from '../src/lib/humandesign/centers';
import { MANDALA_GATE_ORDER, longitudeToGateInfo } from '../src/lib/humandesign/mandala';
import {
  reduceToNumerology,
  calculateNameNumerology,
  calculateLifePathNumber
} from '../src/lib/numerology/engine';

describe('Invariant 1: Halbsummen über den 0°-Widderpunkt (Midpoint Wrap-around)', () => {
  it('should correctly calculate midpoints across the 0° Aries boundary (358° and 2°)', () => {
    // Distance across 0 is 4° (358 to 360 is 2°, 0 to 2 is 2°). Midpoint is 0° (or 360° mod 360 = 0).
    const mid1 = calculateMidpointLongitude(358, 2);
    expect(mid1).toBe(0);

    const mid2 = calculateMidpointLongitude(2, 358);
    expect(mid2).toBe(0);
  });

  it('should be symmetric for any pair of longitudes: mid(A, B) === mid(B, A)', () => {
    const testPairs: [number, number][] = [
      [350, 10],
      [10, 350],
      [355, 5],
      [15, 45],
      [180, 200],
      [270, 90],
      [359, 1],
      [0.5, 359.5]
    ];

    for (const [lonA, lonB] of testPairs) {
      const midAB = calculateMidpointLongitude(lonA, lonB);
      const midBA = calculateMidpointLongitude(lonB, lonA);
      expect(midAB).toBeCloseTo(midBA, 6);
    }
  });

  it('should calculate shortest arc midpoint across 0° for asymmetric angles (e.g. 350° and 20° -> 5°)', () => {
    // Shortest arc between 350° and 20° is 30° (10° in Pisces + 20° in Aries).
    // Midpoint is 350 + 15 = 365 -> 5° Aries.
    const mid = calculateMidpointLongitude(350, 20);
    expect(mid).toBe(5);

    const midReverse = calculateMidpointLongitude(20, 350);
    expect(midReverse).toBe(5);
  });

  it('should calculate midpoint for large arcs across the zodiac (340° and 40° -> 10°)', () => {
    const mid = calculateMidpointLongitude(340, 40);
    expect(mid).toBe(10);
  });

  it('should always return a longitude normalized strictly within [0, 360)', () => {
    for (let lon1 = 0; lon1 < 360; lon1 += 37) {
      for (let lon2 = 0; lon2 < 360; lon2 += 43) {
        const mid = calculateMidpointLongitude(lon1, lon2);
        expect(mid).toBeGreaterThanOrEqual(0);
        expect(mid).toBeLessThan(360);
      }
    }
  });

  it('should correctly format sign and degree position across 0° boundary', () => {
    const pos0 = degreeToSignAndPos(0);
    expect(pos0.sign.id).toBe('aries');
    expect(pos0.degreeInSign).toBe(0);
    expect(pos0.degreeString).toBe("0° 00'");

    const pos359 = degreeToSignAndPos(359.99);
    expect(pos359.sign.id).toBe('pisces');
    expect(pos359.degreeInSign).toBeCloseTo(29.99, 1);

    const pos360 = degreeToSignAndPos(360);
    expect(pos360.sign.id).toBe('aries');
    expect(pos360.degreeInSign).toBe(0);
  });
});

describe('Invariant 2: DTO-Validierung bei extremen Koordinaten (Boundary Tests)', () => {
  const baseProfile = {
    name: 'Polar Explorer',
    birthDate: '1990-06-15',
    birthTime: '12:00',
    cityName: 'Station Alpha',
    timezone: 'UTC',
    houseSystem: 'equal' as const
  };

  it('should accept valid North Pole boundary coordinates (lat = 90, lon = 0)', () => {
    const result = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 90,
      longitude: 0
    });
    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value.latitude).toBe(90);
      expect(result.value.longitude).toBe(0);
    }
  });

  it('should accept valid South Pole boundary coordinates (lat = -90, lon = 0)', () => {
    const result = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: -90,
      longitude: 0
    });
    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value.latitude).toBe(-90);
      expect(result.value.longitude).toBe(0);
    }
  });

  it('should accept valid Date Line boundary coordinates (lon = 180 and lon = -180)', () => {
    const resPos = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 0,
      longitude: 180
    });
    expect(Result.isOk(resPos)).toBe(true);

    const resNeg = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 0,
      longitude: -180
    });
    expect(Result.isOk(resNeg)).toBe(true);
  });

  it('should accept all 4 extreme coordinate corners', () => {
    const corners: [number, number][] = [
      [90, 180],
      [90, -180],
      [-90, 180],
      [-90, -180]
    ];

    for (const [lat, lon] of corners) {
      const res = validateBirthProfileInputDTO({
        ...baseProfile,
        latitude: lat,
        longitude: lon
      });
      expect(Result.isOk(res)).toBe(true);
    }
  });

  it('should reject coordinates exceeding latitude bounds (> 90 or < -90)', () => {
    const resOver = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 90.0001,
      longitude: 0
    });
    expect(Result.isErr(resOver)).toBe(true);
    if (Result.isErr(resOver)) {
      expect(resOver.error.errors.some(e => e.field === 'latitude')).toBe(true);
    }

    const resUnder = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: -90.0001,
      longitude: 0
    });
    expect(Result.isErr(resUnder)).toBe(true);
    if (Result.isErr(resUnder)) {
      expect(resUnder.error.errors.some(e => e.field === 'latitude')).toBe(true);
    }
  });

  it('should reject coordinates exceeding longitude bounds (> 180 or < -180)', () => {
    const resOver = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 0,
      longitude: 180.0001
    });
    expect(Result.isErr(resOver)).toBe(true);
    if (Result.isErr(resOver)) {
      expect(resOver.error.errors.some(e => e.field === 'longitude')).toBe(true);
    }

    const resUnder = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: 0,
      longitude: -180.0001
    });
    expect(Result.isErr(resUnder)).toBe(true);
    if (Result.isErr(resUnder)) {
      expect(resUnder.error.errors.some(e => e.field === 'longitude')).toBe(true);
    }
  });

  it('should reject NaN and non-number coordinate values', () => {
    const resNaN = validateBirthProfileInputDTO({
      ...baseProfile,
      latitude: NaN,
      longitude: 10
    });
    expect(Result.isErr(resNaN)).toBe(true);
  });
});

describe('Invariant 3: Schaltjahre & Datums-Invariante (Calendar Bounds)', () => {
  const validCoords = {
    name: 'Cal Tester',
    birthTime: '12:00',
    cityName: 'Berlin',
    latitude: 52.52,
    longitude: 13.405,
    timezone: 'Europe/Berlin'
  };

  it('should accept valid leap year date: 2000-02-29 (divisible by 400)', () => {
    const res = validateBirthProfileInputDTO({
      ...validCoords,
      birthDate: '2000-02-29'
    });
    expect(Result.isOk(res)).toBe(true);
  });

  it('should accept valid standard leap year date: 2024-02-29', () => {
    const res = validateBirthProfileInputDTO({
      ...validCoords,
      birthDate: '2024-02-29'
    });
    expect(Result.isOk(res)).toBe(true);
  });

  it('should reject invalid non-leap year date: 2023-02-29 with ValidationError', () => {
    const res = validateBirthProfileInputDTO({
      ...validCoords,
      birthDate: '2023-02-29'
    });
    expect(Result.isErr(res)).toBe(true);
    if (Result.isErr(res)) {
      expect(res.error.errors.some(e => e.field === 'birthDate')).toBe(true);
    }
  });

  it('should reject century non-leap year: 1900-02-29 (divisible by 100 but not 400)', () => {
    const res = validateBirthProfileInputDTO({
      ...validCoords,
      birthDate: '1900-02-29'
    });
    expect(Result.isErr(res)).toBe(true);
    if (Result.isErr(res)) {
      expect(res.error.errors.some(e => e.field === 'birthDate')).toBe(true);
    }
  });

  it('should reject impossible dates: 2024-02-30 and 30-day month overflows (e.g. 2023-04-31)', () => {
    const invalidDates = [
      '2024-02-30',
      '2023-04-31', // April has 30 days
      '2023-06-31', // June has 30 days
      '2023-09-31', // September has 30 days
      '2023-11-31', // November has 30 days
      '2023-13-01', // Month 13 does not exist
      '2023-00-10'  // Month 0 does not exist
    ];

    for (const d of invalidDates) {
      const res = validateBirthProfileInputDTO({
        ...validCoords,
        birthDate: d
      });
      expect(Result.isErr(res)).toBe(true);
      if (Result.isErr(res)) {
        expect(res.error.errors.some(e => e.field === 'birthDate')).toBe(true);
      }
    }
  });
});

describe('Invariant 4: Ephemeriden-Idempotenz und Unveränderlichkeit', () => {
  const utcDate = new Date(Date.UTC(1989, 10, 9, 18, 53, 0)); // Berlin Wall Fall: 1989-11-09 18:53 UTC

  it('should produce identical planetary positions on repeated calls (pure idempotency)', () => {
    const run1 = calculatePlanetaryPositions(utcDate);
    const run2 = calculatePlanetaryPositions(utcDate);

    expect(run1.length).toBe(run2.length);
    for (let i = 0; i < run1.length; i++) {
      expect(run1[i].id).toBe(run2[i].id);
      expect(run1[i].longitude).toBe(run2[i].longitude);
      expect(run1[i].speed).toBe(run2[i].speed);
      expect(run1[i].isRetrograde).toBe(run2[i].isRetrograde);
      expect(run1[i].sign.id).toBe(run2[i].sign.id);
      expect(run1[i].degreeString).toBe(run2[i].degreeString);
    }
  });

  it('should satisfy planetary domain invariants for all 13 celestial bodies', () => {
    const planets = calculatePlanetaryPositions(utcDate);
    expect(planets.length).toBe(13);

    const requiredBodies = [
      'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
      'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
      'NorthNode', 'Chiron', 'Lilith'
    ];

    for (const bodyId of requiredBodies) {
      const planet = planets.find(p => p.id === bodyId);
      expect(planet).toBeDefined();
      if (!planet) continue;

      // 0 <= longitude < 360
      expect(planet.longitude).toBeGreaterThanOrEqual(0);
      expect(planet.longitude).toBeLessThan(360);

      // 0 <= degreeInSign < 30
      expect(planet.degreeInSign).toBeGreaterThanOrEqual(0);
      expect(planet.degreeInSign).toBeLessThan(30);

      // Sign must correspond to longitude / 30
      const expectedSignIndex = Math.floor(planet.longitude / 30);
      const signDegrees = expectedSignIndex * 30;
      expect(planet.longitude).toBeGreaterThanOrEqual(signDegrees);
      expect(planet.longitude).toBeLessThan(signDegrees + 30);

      // House must be in 1..12
      expect(planet.house).toBeGreaterThanOrEqual(1);
      expect(planet.house).toBeLessThanOrEqual(12);

      // Degree string format XX° YY'
      expect(planet.degreeString).toMatch(/^\d{1,2}°\s\d{2}'$/);
    }
  });

  it('should not mutate input date object or houses array', () => {
    const testDate = new Date(Date.UTC(2022, 6, 15, 14, 30, 0));
    const originalTime = testDate.getTime();
    const mockHouses = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const housesCopy = [...mockHouses];

    calculatePlanetaryPositions(testDate, mockHouses);

    expect(testDate.getTime()).toBe(originalTime);
    expect(mockHouses).toEqual(housesCopy);
  });

  it('should generate complete chart idempotently with fixed outputs', () => {
    const input: ChartInput = {
      name: 'Deterministic Test',
      birthDate: '1995-08-24',
      birthTime: '08:45',
      cityName: 'Munich',
      latitude: 48.1351,
      longitude: 11.582,
      timezone: 'Europe/Berlin',
      houseSystem: 'placidus'
    };

    const chart1 = generateNatalChart(input);
    const chart2 = generateNatalChart(input);

    expect(chart1.synthesis.sun.planet.longitude).toBe(chart2.synthesis.sun.planet.longitude);
    expect(chart1.synthesis.moon.planet.longitude).toBe(chart2.synthesis.moon.planet.longitude);
    expect(chart1.housesResult.angles.ascendant.longitude).toBe(chart2.housesResult.angles.ascendant.longitude);
    expect(chart1.aspects.length).toBe(chart2.aspects.length);
    expect(chart1.balance.dominantElement).toBe(chart2.balance.dominantElement);
    expect(chart1.numerology.lifePath.number).toBe(chart2.numerology.lifePath.number);
  });
});

describe('Invariant 5: Human Design Tore-Invariante (64 Gates & Centers)', () => {
  it('should contain exactly 64 gates in ALL_HD_GATES from 1 to 64', () => {
    const gateKeys = Object.keys(ALL_HD_GATES).map(k => parseInt(k, 10));
    expect(gateKeys.length).toBe(64);

    for (let i = 1; i <= 64; i++) {
      expect(ALL_HD_GATES[i]).toBeDefined();
      expect(ALL_HD_GATES[i].gate).toBe(i);
    }
  });

  it('should ensure all 64 gates have non-empty I-Ging names, symbols, keynotes, and gifts', () => {
    for (let i = 1; i <= 64; i++) {
      const gate = ALL_HD_GATES[i];
      expect(gate.iChingName).toBeTruthy();
      expect(gate.hexagramSymbol).toBeTruthy();
      expect(gate.keynote).toBeTruthy();
      expect(gate.lightGift).toBeTruthy();
      expect(gate.shadowFrequency).toBeTruthy();
      expect(gate.siddhicPotential).toBeTruthy();
      expect(ALL_CENTER_IDS).toContain(gate.center);
    }
  });

  it('should enforce bidirectional consistency between gates and HD centers', () => {
    // 1. Every gate must be listed in its center's gates array
    for (let i = 1; i <= 64; i++) {
      const gate = ALL_HD_GATES[i];
      const centerInfo = HD_CENTERS[gate.center];
      expect(centerInfo).toBeDefined();
      expect(centerInfo.gates).toContain(gate.gate);
    }

    // 2. Sum of all center gates must equal 64 and contain no duplicates
    const allCenterGates: number[] = [];
    for (const centerId of ALL_CENTER_IDS) {
      const center = HD_CENTERS[centerId];
      allCenterGates.push(...center.gates);
    }

    expect(allCenterGates.length).toBe(64);
    const uniqueGates = new Set(allCenterGates);
    expect(uniqueGates.size).toBe(64);
    for (let i = 1; i <= 64; i++) {
      expect(uniqueGates.has(i)).toBe(true);
    }
  });

  it('should verify MANDALA_GATE_ORDER contains exactly 64 unique gates forming a valid permutation', () => {
    expect(MANDALA_GATE_ORDER.length).toBe(64);
    const uniqueMandalaGates = new Set(MANDALA_GATE_ORDER);
    expect(uniqueMandalaGates.size).toBe(64);

    for (let i = 1; i <= 64; i++) {
      expect(uniqueMandalaGates.has(i)).toBe(true);
    }
  });

  it('should map any longitude [0..360) to valid gate (1..64), line (1..6), color (1..6), tone (1..6), base (1..5)', () => {
    const testAngles = [0, 0.001, 5.625, 45, 90, 180, 270, 359.999];

    for (const lon of testAngles) {
      const info = longitudeToGateInfo(lon);
      expect(info.gate).toBeGreaterThanOrEqual(1);
      expect(info.gate).toBeLessThanOrEqual(64);
      expect(info.line).toBeGreaterThanOrEqual(1);
      expect(info.line).toBeLessThanOrEqual(6);
      expect(info.color).toBeGreaterThanOrEqual(1);
      expect(info.color).toBeLessThanOrEqual(6);
      expect(info.tone).toBeGreaterThanOrEqual(1);
      expect(info.tone).toBeLessThanOrEqual(6);
      expect(info.base).toBeGreaterThanOrEqual(1);
      expect(info.base).toBeLessThanOrEqual(5);
    }
  });
});

describe('Invariant 6: Pythagoräische Namensreduktion auf Invarianz (Case & German Umlauts)', () => {
  it('should be invariant under case changes (uppercase, lowercase, mixed case)', () => {
    const lower = calculateNameNumerology('albert einstein', 5);
    const upper = calculateNameNumerology('ALBERT EINSTEIN', 5);
    const mixed = calculateNameNumerology('AlBeRt EiNsTeIn', 5);

    expect(lower.expression.number).toBe(upper.expression.number);
    expect(lower.soulUrge.number).toBe(upper.soulUrge.number);
    expect(lower.personality.number).toBe(upper.personality.number);

    expect(mixed.expression.number).toBe(upper.expression.number);
    expect(mixed.soulUrge.number).toBe(upper.soulUrge.number);
    expect(mixed.personality.number).toBe(upper.personality.number);
  });

  it('should be invariant between German umlauts (Ä, Ö, Ü) and their standard expansions (AE, OE, UE)', () => {
    // Müller vs Mueller vs MÜLLER vs MUELLER
    const muellerUmlaut = calculateNameNumerology('Müller', 3);
    const muellerExpanded = calculateNameNumerology('Mueller', 3);
    const muellerUpper = calculateNameNumerology('MÜLLER', 3);
    const muellerLower = calculateNameNumerology('müller', 3);

    expect(muellerUmlaut.expression.number).toBe(muellerExpanded.expression.number);
    expect(muellerUmlaut.soulUrge.number).toBe(muellerExpanded.soulUrge.number);
    expect(muellerUmlaut.personality.number).toBe(muellerExpanded.personality.number);

    expect(muellerUpper.expression.number).toBe(muellerExpanded.expression.number);
    expect(muellerLower.expression.number).toBe(muellerExpanded.expression.number);

    // Jürgen vs Juergen
    const juergenUmlaut = calculateNameNumerology('Jürgen', 7);
    const juergenExpanded = calculateNameNumerology('Juergen', 7);
    expect(juergenUmlaut.expression.number).toBe(juergenExpanded.expression.number);
    expect(juergenUmlaut.soulUrge.number).toBe(juergenExpanded.soulUrge.number);
    expect(juergenUmlaut.personality.number).toBe(juergenExpanded.personality.number);

    // Schröder vs Schroeder
    const schroederUmlaut = calculateNameNumerology('Schröder', 8);
    const schroederExpanded = calculateNameNumerology('Schroeder', 8);
    expect(schroederUmlaut.expression.number).toBe(schroederExpanded.expression.number);
    expect(schroederUmlaut.soulUrge.number).toBe(schroederExpanded.soulUrge.number);
    expect(schroederUmlaut.personality.number).toBe(schroederExpanded.personality.number);
  });

  it('should be invariant between German ß and SS', () => {
    const grossEszett = calculateNameNumerology('Groß', 1);
    const grossDoubleS = calculateNameNumerology('Gross', 1);
    const grossUpper = calculateNameNumerology('GROSS', 1);

    expect(grossEszett.expression.number).toBe(grossDoubleS.expression.number);
    expect(grossEszett.soulUrge.number).toBe(grossDoubleS.soulUrge.number);
    expect(grossEszett.personality.number).toBe(grossDoubleS.personality.number);
    expect(grossUpper.expression.number).toBe(grossDoubleS.expression.number);

    const straussEszett = calculateNameNumerology('Strauß', 6);
    const straussDoubleS = calculateNameNumerology('Strauss', 6);
    expect(straussEszett.expression.number).toBe(straussDoubleS.expression.number);
  });

  it('should preserve Master numbers 11, 22, 33 when allowMaster is true and reduce them when false', () => {
    expect(reduceToNumerology(11, true)).toBe(11);
    expect(reduceToNumerology(22, true)).toBe(22);
    expect(reduceToNumerology(33, true)).toBe(33);

    expect(reduceToNumerology(11, false)).toBe(2);
    expect(reduceToNumerology(22, false)).toBe(4);
    expect(reduceToNumerology(33, false)).toBe(6);
  });

  it('should satisfy idempotency for reduceToNumerology: f(f(x)) === f(x)', () => {
    const testValues = [1, 9, 10, 11, 19, 22, 33, 44, 99, 1989, 2024];

    for (const val of testValues) {
      const reducedOnce = reduceToNumerology(val, true);
      const reducedTwice = reduceToNumerology(reducedOnce, true);
      expect(reducedTwice).toBe(reducedOnce);
    }
  });

  it('should calculate life path number invariantly across different date formats or repetitions', () => {
    const lp1 = calculateLifePathNumber('1991-05-05');
    const lp2 = calculateLifePathNumber('1991-05-05');
    expect(lp1.number).toBe(3);
    expect(lp1.number).toBe(lp2.number);
    expect(lp1.name).toBe(lp2.name);
  });
});
