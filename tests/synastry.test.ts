import { describe, it, expect } from 'vitest';
import { generateNatalChart, type ChartInput } from '../src/lib/astrology/engine';
import { calculateSynastry, calculateFamilyMatrix, calculateDynamicRelationshipMotto, calculateDynamicPairGemstone } from '../src/lib/astrology/synastry';
import { ZODIAC_SIGNS } from '../src/lib/astrology/constants';

describe('Partner Synastrie-Score-Berechnung & Aspekt-Kategorisierung', () => {
  const chartInputA: ChartInput = {
    name: 'Romeo Montague',
    birthDate: '1990-07-23', // Sun Leo (Fire), Moon Leo/Virgo
    birthTime: '06:30',
    cityName: 'Verona',
    latitude: 45.4384,
    longitude: 10.9916,
    timezone: 'Europe/Rome',
    houseSystem: 'placidus'
  };

  const chartInputB: ChartInput = {
    name: 'Julia Capulet',
    birthDate: '1992-03-25', // Sun Aries (Fire), Moon Sag (Fire)
    birthTime: '18:15',
    cityName: 'Verona',
    latitude: 45.4384,
    longitude: 10.9916,
    timezone: 'Europe/Rome',
    houseSystem: 'placidus'
  };

  const chartInputC: ChartInput = {
    name: 'Child Capulet',
    birthDate: '2020-11-10', // Sun Scorpio (Water)
    birthTime: '10:00',
    cityName: 'Verona',
    latitude: 45.4384,
    longitude: 10.9916,
    timezone: 'Europe/Rome',
    houseSystem: 'placidus'
  };

  const chartA = generateNatalChart(chartInputA);
  const chartB = generateNatalChart(chartInputB);
  const chartC = generateNatalChart(chartInputC);

  it('should calculate complete synastry analysis with all required sections', () => {
    const synastry = calculateSynastry(chartA, chartB);

    expect(synastry.personA.name).toBe('Romeo Montague');
    expect(synastry.personB.name).toBe('Julia Capulet');
    expect(synastry.personA.sunSign).toBeDefined();
    expect(synastry.personB.sunSign).toBeDefined();
    expect(synastry.scores).toBeDefined();
    expect(synastry.aspects).toBeDefined();
    expect(synastry.composite).toBeDefined();
    expect(synastry.numerologySynergy).toBeDefined();
  });

  it('should ensure all synastry sub-scores and overall score are within bounds [0..100]', () => {
    const synastry = calculateSynastry(chartA, chartB);
    const { scores } = synastry;

    expect(scores.overallScore).toBeGreaterThanOrEqual(0);
    expect(scores.overallScore).toBeLessThanOrEqual(100);

    expect(scores.emotionalHarmony.score).toBeGreaterThanOrEqual(0);
    expect(scores.emotionalHarmony.score).toBeLessThanOrEqual(100);
    expect(scores.emotionalHarmony.level).toBeTruthy();
    expect(scores.emotionalHarmony.description).toBeTruthy();

    expect(scores.passionAndChemistry.score).toBeGreaterThanOrEqual(0);
    expect(scores.passionAndChemistry.score).toBeLessThanOrEqual(100);
    expect(scores.passionAndChemistry.level).toBeTruthy();
    expect(scores.passionAndChemistry.description).toBeTruthy();

    expect(scores.mindAndCommunication.score).toBeGreaterThanOrEqual(0);
    expect(scores.mindAndCommunication.score).toBeLessThanOrEqual(100);
    expect(scores.mindAndCommunication.level).toBeTruthy();
    expect(scores.mindAndCommunication.description).toBeTruthy();

    expect(scores.karmicBondAndStability.score).toBeGreaterThanOrEqual(0);
    expect(scores.karmicBondAndStability.score).toBeLessThanOrEqual(100);
    expect(scores.karmicBondAndStability.level).toBeTruthy();
    expect(scores.karmicBondAndStability.description).toBeTruthy();
  });

  it('should properly categorize synastry aspects into emotion, passion, mind, and karma', () => {
    const synastry = calculateSynastry(chartA, chartB);

    expect(synastry.aspects.length).toBeGreaterThan(0);

    const validCategories = new Set(['emotion', 'passion', 'mind', 'karma']);
    const validNatures = new Set(['harmonious', 'dynamic', 'karmic', 'magnetic']);

    for (const asp of synastry.aspects) {
      expect(validCategories.has(asp.category)).toBe(true);
      expect(validNatures.has(asp.nature)).toBe(true);
      expect(asp.symbol).toBeTruthy();
      expect(asp.headline).toBeTruthy();
      expect(asp.esotericMeaning).toBeTruthy();
      expect(asp.birkenbihlTip).toBeTruthy();
      expect(asp.orb).toBeGreaterThanOrEqual(0);
      expect(asp.orb).toBeLessThanOrEqual(8.0);
    }
  });

  it('should sort synastry aspects by orb ascending (tightest orb first)', () => {
    const synastry = calculateSynastry(chartA, chartB);

    for (let i = 1; i < synastry.aspects.length; i++) {
      expect(synastry.aspects[i].orb).toBeGreaterThanOrEqual(synastry.aspects[i - 1].orb);
    }
  });

  it('should grant element compatibility bonus when Sun signs share the same element', () => {
    // Both Romeo (Leo: Fire) and Julia (Aries: Fire) have Fire Sun signs
    const synastry = calculateSynastry(chartA, chartB);

    expect(chartA.synthesis.sun.planet.sign.element).toBe('Feuer');
    expect(chartB.synthesis.sun.planet.sign.element).toBe('Feuer');
    expect(synastry.scores.overallScore).toBeGreaterThanOrEqual(75);
    expect(synastry.scores.archetype).toBeTruthy();
    expect(synastry.scores.tagline).toBeTruthy();
  });

  it('should compute valid numerology synergy for pair life paths', () => {
    const synastry = calculateSynastry(chartA, chartB);
    const { numerologySynergy } = synastry;

    expect(numerologySynergy.lifePathSum).toBeGreaterThanOrEqual(1);
    expect(numerologySynergy.lifePathSum).toBeLessThanOrEqual(33);
    expect(numerologySynergy.lifePathArchetype).toContain(`Schwingungs-Zahl ${numerologySynergy.lifePathSum}`);
    expect(numerologySynergy.harmonyDescription).toBeTruthy();
    expect(numerologySynergy.affirmation).toBeTruthy();
  });
});

describe('Dynamische Komposit-Motto- & Paarstein-Generierung', () => {
  const chartInputA: ChartInput = {
    name: 'Cosmic Soul A',
    birthDate: '1988-11-15',
    birthTime: '04:20',
    cityName: 'Vienna',
    latitude: 48.2082,
    longitude: 16.3738,
    timezone: 'Europe/Vienna',
    houseSystem: 'placidus'
  };

  const chartInputB: ChartInput = {
    name: 'Cosmic Soul B',
    birthDate: '1991-04-12',
    birthTime: '14:50',
    cityName: 'Vienna',
    latitude: 48.2082,
    longitude: 16.3738,
    timezone: 'Europe/Vienna',
    houseSystem: 'placidus'
  };

  const chartA = generateNatalChart(chartInputA);
  const chartB = generateNatalChart(chartInputB);
  const synastry = calculateSynastry(chartA, chartB);

  it('should generate all 8 composite planetary midpoints with valid signs and degree strings', () => {
    const { composite } = synastry;

    const bodies = [
      composite.sun,
      composite.moon,
      composite.ascendant,
      composite.midheaven,
      composite.venus,
      composite.mars,
      composite.jupiter,
      composite.saturn
    ];

    for (const body of bodies) {
      expect(body.id).toBeTruthy();
      expect(body.name).toBeTruthy();
      expect(body.symbol).toBeTruthy();
      expect(body.longitude).toBeGreaterThanOrEqual(0);
      expect(body.longitude).toBeLessThan(360);
      expect(body.sign).toBeDefined();
      expect(body.sign.name).toBeTruthy();
      expect(body.degreeString).toMatch(/^\d{1,2}°\s\d{2}'$/);
      expect(body.interpretation).toBeTruthy();
    }
  });

  it('should dynamically formulate shared soul purpose based on partner signs and composite sign', () => {
    const { composite } = synastry;

    expect(composite.sharedSoulPurpose).toContain(chartA.synthesis.sun.planet.sign.name);
    expect(composite.sharedSoulPurpose).toContain(chartB.synthesis.sun.planet.sign.name);
    expect(composite.sharedSoulPurpose).toContain(composite.sun.sign.name);
  });

  it('should generate empowering relationship motto and pair gemstone', () => {
    const { composite } = synastry;

    expect(composite.relationshipMotto).toBeTruthy();
    expect(composite.relationshipMotto.length).toBeGreaterThan(10);
    expect(composite.relationshipMotto).toContain('„');

    expect(composite.pairGemstone).toBeDefined();
    expect(composite.pairGemstone.name).toBeTruthy();
    expect(composite.pairGemstone.chakra).toBeTruthy();
    expect(composite.pairGemstone.effect).toBeTruthy();

    // Verify composite planet interpretations are dynamic
    expect(composite.venus.interpretation).toContain(composite.venus.sign.name);
    expect(composite.mars.interpretation).toContain(composite.mars.sign.name);
    expect(composite.jupiter.interpretation).toContain(composite.jupiter.sign.name);
    expect(composite.saturn.interpretation).toContain(composite.saturn.sign.name);
  });

  it('should compute valid relationship mottos for all element combinations', () => {
    const aries = ZODIAC_SIGNS.find(s => s.id === 'aries')!; // Fire
    const taurus = ZODIAC_SIGNS.find(s => s.id === 'taurus')!; // Earth
    const gemini = ZODIAC_SIGNS.find(s => s.id === 'gemini')!; // Air
    const cancer = ZODIAC_SIGNS.find(s => s.id === 'cancer')!; // Water

    const mottoFireFire = calculateDynamicRelationshipMotto(aries, aries);
    const mottoFireEarth = calculateDynamicRelationshipMotto(aries, taurus);
    const mottoAirWater = calculateDynamicRelationshipMotto(gemini, cancer);
    const mottoWaterWater = calculateDynamicRelationshipMotto(cancer, cancer);

    expect(mottoFireFire).toContain('Flammen');
    expect(mottoFireEarth).toContain('Vision trifft auf fruchtbaren Boden');
    expect(mottoAirWater).toContain('Poesie zwischen Geist und Seelentiefe');
    expect(mottoWaterWater).toContain('Vollkommene Seelenverschmelzung');
  });

  it('should compute tailored pair gemstones for diverse element pairings', () => {
    const aries = ZODIAC_SIGNS.find(s => s.id === 'aries')!; // Fire
    const taurus = ZODIAC_SIGNS.find(s => s.id === 'taurus')!; // Earth
    const gemini = ZODIAC_SIGNS.find(s => s.id === 'gemini')!; // Air
    const cancer = ZODIAC_SIGNS.find(s => s.id === 'cancer')!; // Water

    const fireFire = calculateDynamicPairGemstone(aries, aries);
    const earthEarth = calculateDynamicPairGemstone(taurus, taurus);
    const waterWater = calculateDynamicPairGemstone(cancer, cancer);
    const airAir = calculateDynamicPairGemstone(gemini, gemini);

    expect(fireFire.name).toBe('Karneol & Roter Granat');
    expect(earthEarth.name).toBe('Smaragd & Malachit');
    expect(waterWater.name).toBe('Rosenquarz & Rhodonit');
    expect(airAir.name).toBe('Aquamarin & Lapislazuli');
  });
});

describe('Familien-Matrix Mehrpersonen-Synergie (Family Matrix)', () => {
  const chartA = generateNatalChart({
    name: 'Parent 1',
    birthDate: '1980-05-10', // Sun Taurus (Earth)
    birthTime: '08:00',
    cityName: 'Hamburg',
    latitude: 53.5511,
    longitude: 9.9937,
    timezone: 'Europe/Berlin'
  });

  const chartB = generateNatalChart({
    name: 'Parent 2',
    birthDate: '1982-08-15', // Sun Leo (Fire)
    birthTime: '14:30',
    cityName: 'Hamburg',
    latitude: 53.5511,
    longitude: 9.9937,
    timezone: 'Europe/Berlin'
  });

  const chartC = generateNatalChart({
    name: 'Child 1',
    birthDate: '2010-01-20', // Sun Aquarius (Air)
    birthTime: '19:00',
    cityName: 'Hamburg',
    latitude: 53.5511,
    longitude: 9.9937,
    timezone: 'Europe/Berlin'
  });

  it('should gracefully handle empty chart list for family matrix', () => {
    const result = calculateFamilyMatrix([]);
    expect(result.memberCount).toBe(0);
    expect(result.members.length).toBe(0);
    expect(result.elementBalance.fire).toBe(25);
    expect(result.familySoulMotto).toBeTruthy();
  });

  it('should calculate accurate element distribution and assign archetypal roles for all family members', () => {
    const matrix = calculateFamilyMatrix([chartA, chartB, chartC]);

    expect(matrix.memberCount).toBe(3);
    expect(matrix.members.length).toBe(3);

    // Sum of element percentages should be approximately 100%
    const { fire, earth, air, water } = matrix.elementBalance;
    expect(fire + earth + air + water).toBeGreaterThanOrEqual(98);
    expect(fire + earth + air + water).toBeLessThanOrEqual(102);

    expect(matrix.elementBalance.dominantElement).toBeTruthy();
    expect(matrix.elementBalance.missingOrWeakElement).toBeTruthy();

    for (const member of matrix.members) {
      expect(member.name).toBeTruthy();
      expect(member.sunSign).toBeTruthy();
      expect(member.moonSign).toBeTruthy();
      expect(member.ascendantSign).toBeTruthy();
      expect(member.soulRoleTitle).toBeTruthy();
      expect(member.roleIcon).toBeTruthy();
      expect(member.giftToFamily).toBeTruthy();
      expect(member.growthTrigger).toBeTruthy();
    }

    expect(matrix.familyDynamicHeadline).toBeTruthy();
    expect(matrix.familyKarmaLesson).toBeTruthy();
    expect(matrix.birkenbihlCommunicationCode).toBeTruthy();
    expect(matrix.familySoulMotto).toBeTruthy();
  });
});
