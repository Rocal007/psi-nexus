import { describe, it, expect } from 'vitest';
import { calculateHumanDesignChart } from '../src/lib/humandesign/engine';
import { HumanDesignAgent } from '../src/lib/humandesign/agent';

describe('Human Design Engine (Bodygraph Invariance)', () => {
  const sampleInput = {
    name: 'Ra Uru Hu',
    birthDate: '1948-04-09',
    birthTime: '20:05',
    cityName: 'Montreal',
    latitude: 45.5017,
    longitude: -73.5673,
    timezone: 'America/Toronto'
  };

  it('should compute valid energy type and authority', () => {
    const hd = calculateHumanDesignChart(sampleInput);

    expect(['Manifestor', 'Generator', 'ManifestingGenerator', 'Projector', 'Reflector']).toContain(hd.energyType.type);
    expect(hd.profile.code).toMatch(/^[1-6]\/[1-6]$/);
    expect(hd.authority.germanName).toBeDefined();
    expect(hd.definedCenters).toBeInstanceOf(Array);
  });

  it('should generate conscious and unconscious activations for all 13 planetary bodies', () => {
    const hd = calculateHumanDesignChart(sampleInput);

    expect(hd.designActivations.length).toBe(13);
    expect(hd.personalityActivations.length).toBe(13);

    for (const act of hd.personalityActivations) {
      expect(act.gate).toBeGreaterThanOrEqual(1);
      expect(act.gate).toBeLessThanOrEqual(64);
      expect(act.line).toBeGreaterThanOrEqual(1);
      expect(act.line).toBeLessThanOrEqual(6);
    }
  });

  it('should yield actionable neurodidactic insights via HumanDesignAgent', () => {
    const hd = calculateHumanDesignChart(sampleInput);
    const response = HumanDesignAgent.answerInquiry(hd, 'decision');

    expect(response.headline).toBeDefined();
    expect(response.analysis).toBeDefined();
    expect(response.birkenbihlProtocol.length).toBeGreaterThan(0);
    expect(response.practicalAction).toBeDefined();
  });
});
