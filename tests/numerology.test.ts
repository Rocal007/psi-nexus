import { describe, it, expect } from 'vitest';
import { generateCompleteNumerology, calculateLifePathNumber } from '../src/lib/numerology/engine';
import { calculatePersonalAngelResonance } from '../src/lib/numerology/angelNumbers';

describe('Pythagorean Numerology & Angel Resonances', () => {
  it('should calculate life path number correctly and handle master numbers', () => {
    // 1991-05-05 -> 1+9+9+1 = 20 -> 2; 5; 5 -> 2 + 5 + 5 = 12 -> 3
    const lp = calculateLifePathNumber('1991-05-05');
    expect(lp.number).toBe(3);
    expect(lp.archetype).toBeDefined();

    // Master number test: 1989-11-20 -> 1+9+8+9=27->9; 11; 20->2 -> 9+11+2 = 22
    const masterLp = calculateLifePathNumber('1989-11-20');
    expect(masterLp.number).toBe(22);
    expect(masterLp.isMaster).toBe(true);
  });

  it('should calculate full name Pythagorean expressions and vowels/consonants breakdown', () => {
    const num = generateCompleteNumerology('Alexander', '1991-05-05', 'Stier', 'Jungfrau');
    expect(num.nameNumbers.expression.number).toBeGreaterThanOrEqual(1);
    expect(num.nameNumbers.soulUrge.number).toBeGreaterThanOrEqual(1);
    expect(num.nameNumbers.personality.number).toBeGreaterThanOrEqual(1);
    expect(num.nameNumbers.letters.length).toBe('Alexander'.length);
  });

  it('should compute dynamic, non-hardcoded astro-numerology synergy with elemental interactions', () => {
    // Life Path 1 (Feuer) + Widder (Feuer) -> Harmonious Amplification
    const numFireFire = generateCompleteNumerology('Hero', '2000-01-09', 'Widder', 'Löwe');
    expect(numFireFire.astroSynergy.synergyType).toBe('harmonious_amplification');
    expect(numFireFire.astroSynergy.compatibilityScore).toBeGreaterThanOrEqual(90);
    expect(numFireFire.astroSynergy.elementalDynamic.numberElement).toBe('Feuer');
    expect(numFireFire.astroSynergy.transformationMantra).toBeDefined();

    // Life Path 1 (Feuer) + Krebs (Wasser) -> Dialectical Friction
    const numFireWater = generateCompleteNumerology('Hero', '2000-01-09', 'Krebs', 'Skorpion');
    expect(numFireWater.astroSynergy.synergyType).toBe('dialectical_friction');
    expect(numFireWater.astroSynergy.compatibilityScore).toBe(74);

    // Life Path 22 (Äther / Master) -> Master Convergence
    const numMaster = generateCompleteNumerology('Architect', '1989-11-20', 'Steinbock', 'Stier');
    expect(numMaster.astroSynergy.synergyType).toBe('master_convergence');
    expect(numMaster.astroSynergy.compatibilityScore).toBe(95);
  });
});
