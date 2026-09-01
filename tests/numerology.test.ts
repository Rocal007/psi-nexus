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

  it('should calculate angel number resonance for given life path and sun sign', () => {
    const angel = calculatePersonalAngelResonance(7, 'Widder');
    expect(angel.primaryAngelNumber).toBeDefined();
    expect(angel.primaryAngelNumber.number).toContain('777');
    expect(angel.guidance).toBeDefined();
  });
});
