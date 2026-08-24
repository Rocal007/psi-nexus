import { ASPECTS, type AspectDefinition } from './constants';
import type { CalculatedPlanet } from './ephemeris';

export interface CalculatedAspect {
  planet1: CalculatedPlanet;
  planet2: CalculatedPlanet;
  aspectType: string;
  definition: AspectDefinition;
  exactAngle: number;
  actualDiff: number;
  orb: number; // actual difference minus target angle
  isApplying: boolean;
}

export function calculateAspects(planets: CalculatedPlanet[]): CalculatedAspect[] {
  const aspects: CalculatedAspect[] = [];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];

      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) {
        diff = 360 - diff;
      }

      for (const [key, def] of Object.entries(ASPECTS)) {
        // Luminaries get +1.5 orb allowance
        const orbAllowance = (p1.id === 'Sun' || p1.id === 'Moon' || p2.id === 'Sun' || p2.id === 'Moon')
          ? def.orb + 1.5
          : def.orb;

        const orb = Math.abs(diff - def.angle);
        if (orb <= orbAllowance) {
          // Check applying vs separating
          const speedDiff = p1.speed - p2.speed;
          const isApplying = speedDiff !== 0 && (p1.longitude < p2.longitude ? speedDiff > 0 : speedDiff < 0);

          aspects.push({
            planet1: p1,
            planet2: p2,
            aspectType: key,
            definition: def,
            exactAngle: def.angle,
            actualDiff: diff,
            orb: Math.round(orb * 100) / 100,
            isApplying
          });
          break; // only match the closest aspect definition
        }
      }
    }
  }

  // Sort aspects by tightest orb
  return aspects.sort((a, b) => a.orb - b.orb);
}
