import { describe, it, expect } from 'vitest';
import { generateNatalChart, type ChartInput } from '../src/lib/astrology/engine';
import { calculateHouses } from '../src/lib/astrology/houses';
import { localToUtcDate } from '../src/lib/geo/geocode';

describe('Astrology Calculation Engine (Invariance & Fixpoint)', () => {
  const sampleInput: ChartInput = {
    name: 'Johannes Kepler',
    birthDate: '1985-03-21',
    birthTime: '12:00',
    cityName: 'Graz',
    latitude: 47.0707,
    longitude: 15.4395,
    timezone: 'Europe/Vienna',
    houseSystem: 'placidus'
  };

  it('should calculate UTC date correctly with timezone offset', () => {
    const utc = localToUtcDate('1985-03-21', '12:00', 'Europe/Vienna');
    expect(utc).toBeInstanceOf(Date);
    expect(utc.getUTCHours()).toBe(11); // CET is UTC+1 in March 21
  });

  it('should calculate 12 houses and cardinal angles', () => {
    const utc = localToUtcDate(sampleInput.birthDate, sampleInput.birthTime, sampleInput.timezone);
    const houses = calculateHouses(utc, sampleInput.latitude, sampleInput.longitude, 'placidus');

    expect(houses.cusps.length).toBe(12);
    expect(houses.angles.ascendant).toBeDefined();
    expect(houses.angles.midheaven).toBeDefined();
    expect(houses.angles.descendant).toBeDefined();
    expect(houses.angles.imumCoeli).toBeDefined();
  });

  it('should generate a complete natal chart with planets, aspects, and balances', () => {
    const chart = generateNatalChart(sampleInput);

    expect(chart.planets.length).toBeGreaterThanOrEqual(10);
    expect(chart.aspects).toBeDefined();
    expect(chart.balance.dominantElement).toBeDefined();
    expect(chart.balance.dominantModality).toBeDefined();
    expect(chart.synthesis.sun.planet.sign.name).toBeDefined();
    expect(chart.synthesis.moon.planet.sign.name).toBeDefined();
    expect(chart.synthesis.ascendant.sign.name).toBeDefined();
  });

  it('should enforce idempotency on repeated calculations', () => {
    const chart1 = generateNatalChart(sampleInput);
    const chart2 = generateNatalChart(sampleInput);

    expect(chart1.synthesis.sun.planet.longitude).toEqual(chart2.synthesis.sun.planet.longitude);
    expect(chart1.housesResult.angles.ascendant.longitude).toEqual(chart2.housesResult.angles.ascendant.longitude);
    expect(chart1.aspects.length).toEqual(chart2.aspects.length);
  });
});
