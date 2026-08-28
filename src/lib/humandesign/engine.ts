import { localToUtcDate } from '../geo/geocode';
import { calculateDesignUtcDate, calculateHDPlanetaryActivations } from './mandala';
import { ALL_CENTER_IDS, HD_CENTERS } from './centers';
import { ALL_HD_CHANNELS } from './channels';
import { getProfileInfo } from './profiles';
import { determineIncarnationCross } from './incarnationCrosses';
import { ENERGY_TYPES_DATA, AUTHORITIES_DATA } from './interpretations';
import type {
  HDChartData,
  HDCenterId,
  HDChannel,
  HDEnergyType,
  HDAuthority,
  HDDefinitionType,
  HDVariableArrows
} from './types';

export interface HDChartInput {
  name?: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  cityName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export function calculateHumanDesignChart(input: HDChartInput): HDChartData {
  const utcBirthDate = localToUtcDate(input.birthDate, input.birthTime, input.timezone);
  const utcDesignDate = calculateDesignUtcDate(utcBirthDate);
  const daysDifference = (utcBirthDate.getTime() - utcDesignDate.getTime()) / (1000 * 60 * 60 * 24);

  // 1. Calculate Conscious (Personality / Black) and Unconscious (Design / Red) activations
  const personalityActivations = calculateHDPlanetaryActivations(utcBirthDate);
  const designActivations = calculateHDPlanetaryActivations(utcDesignDate);

  // 2. Build Active Gates Map
  const activeGates: Record<number, { conscious: boolean; unconscious: boolean; lines: number[] }> = {};

  for (const act of personalityActivations) {
    if (!activeGates[act.gate]) {
      activeGates[act.gate] = { conscious: true, unconscious: false, lines: [act.line] };
    } else {
      activeGates[act.gate].conscious = true;
      if (!activeGates[act.gate].lines.includes(act.line)) {
        activeGates[act.gate].lines.push(act.line);
      }
    }
  }

  for (const act of designActivations) {
    if (!activeGates[act.gate]) {
      activeGates[act.gate] = { conscious: false, unconscious: true, lines: [act.line] };
    } else {
      activeGates[act.gate].unconscious = true;
      if (!activeGates[act.gate].lines.includes(act.line)) {
        activeGates[act.gate].lines.push(act.line);
      }
    }
  }

  // 3. Evaluate 36 Channels
  const definedChannels: HDChannel[] = [];
  const definedCentersSet = new Set<HDCenterId>();

  for (const ch of ALL_HD_CHANNELS) {
    const g1 = activeGates[ch.gate1];
    const g2 = activeGates[ch.gate2];

    if (g1 && g2) {
      let state: 'conscious' | 'unconscious' | 'both' = 'conscious';
      const isG1Con = g1.conscious;
      const isG1Unc = g1.unconscious;
      const isG2Con = g2.conscious;
      const isG2Unc = g2.unconscious;

      if ((isG1Con || isG2Con) && (isG1Unc || isG2Unc)) {
        state = 'both';
      } else if (isG1Unc && isG2Unc) {
        state = 'unconscious';
      } else {
        state = 'conscious';
      }

      definedChannels.push({
        ...ch,
        activationState: state
      });

      definedCentersSet.add(ch.center1);
      definedCentersSet.add(ch.center2);
    }
  }

  const definedCenters = ALL_CENTER_IDS.filter(id => definedCentersSet.has(id));
  const undefinedCenters = ALL_CENTER_IDS.filter(id => !definedCentersSet.has(id));

  // 4. Graph Adjacency for Motors & Connections
  const adj = new Map<HDCenterId, Set<HDCenterId>>();
  ALL_CENTER_IDS.forEach(id => adj.set(id, new Set()));

  definedChannels.forEach(ch => {
    adj.get(ch.center1)?.add(ch.center2);
    adj.get(ch.center2)?.add(ch.center1);
  });

  // BFS Reachability Checker
  function isConnected(from: HDCenterId, to: HDCenterId): boolean {
    if (!definedCentersSet.has(from) || !definedCentersSet.has(to)) return false;
    if (from === to) return true;

    const visited = new Set<HDCenterId>([from]);
    const queue = [from];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (curr === to) return true;

      for (const neighbor of adj.get(curr) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return false;
  }

  // Helper: Is any Motor connected to Throat?
  const motors: HDCenterId[] = ['sacral', 'solarPlexus', 'heart', 'root'];
  const isAnyMotorConnectedToThroat = motors.some(m => isConnected(m, 'throat'));

  // 5. Determine Energy Type
  let typeKey: HDEnergyType = 'Reflector';

  if (definedCentersSet.has('sacral')) {
    if (isAnyMotorConnectedToThroat) {
      typeKey = 'ManifestingGenerator';
    } else {
      typeKey = 'Generator';
    }
  } else {
    if (isAnyMotorConnectedToThroat) {
      typeKey = 'Manifestor';
    } else if (definedCenters.length > 0) {
      typeKey = 'Projector';
    } else {
      typeKey = 'Reflector';
    }
  }

  const energyType = ENERGY_TYPES_DATA[typeKey];

  // 6. Determine Inner Authority
  let authorityKey: HDAuthority = 'lunar';

  if (definedCentersSet.has('solarPlexus')) {
    authorityKey = 'emotional';
  } else if (definedCentersSet.has('sacral')) {
    authorityKey = 'sacral';
  } else if (definedCentersSet.has('spleen')) {
    authorityKey = 'splenic';
  } else if (definedCentersSet.has('heart')) {
    if (isConnected('heart', 'throat')) {
      authorityKey = 'ego_manifested';
    } else {
      authorityKey = 'ego_projected';
    }
  } else if (definedCentersSet.has('gCenter') && isConnected('gCenter', 'throat')) {
    authorityKey = 'self_projected';
  } else if (definedCentersSet.has('ajna') || definedCentersSet.has('head')) {
    authorityKey = 'mental';
  } else {
    authorityKey = 'lunar';
  }

  const authority = AUTHORITIES_DATA[authorityKey];

  // 7. Determine Profile
  const pSun = personalityActivations.find(a => a.planetId === 'Sun') || personalityActivations[0];
  const pEarth = personalityActivations.find(a => a.planetId === 'Earth') || personalityActivations[1];
  const dSun = designActivations.find(a => a.planetId === 'Sun') || designActivations[0];
  const dEarth = designActivations.find(a => a.planetId === 'Earth') || designActivations[1];

  const profile = getProfileInfo(pSun.line, dSun.line);

  // 8. Definition Calculation (Connected Components)
  let definitionType: HDDefinitionType = 'None';
  let definitionLabel = 'Keine Definition (Reflektor)';
  let definitionDesc = 'Alle 9 Zentren sind offen. Vollkommene Flexibilität und kosmisches Barometer.';

  if (definedCenters.length > 0) {
    const visited = new Set<HDCenterId>();
    let componentsCount = 0;

    for (const centerId of definedCenters) {
      if (!visited.has(centerId)) {
        componentsCount++;
        const q = [centerId];
        visited.add(centerId);

        while (q.length > 0) {
          const c = q.shift()!;
          for (const neighbor of adj.get(c) || []) {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              q.push(neighbor);
            }
          }
        }
      }
    }

    if (componentsCount === 1) {
      definitionType = 'Single';
      definitionLabel = 'Einfache Definition (Single Definition)';
      definitionDesc = 'Alle definierten Zentren sind lückenlos miteinander verbunden. Autarkes, ganzheitliches Energiefließen.';
    } else if (componentsCount === 2) {
      definitionType = 'Split';
      definitionLabel = 'Geteilte Definition (Split Definition)';
      definitionDesc = 'Zwei getrennte Energie-Inseln. Zieht Partner und Menschen an, die als energetische Brücke fungieren.';
    } else if (componentsCount === 3) {
      definitionType = 'TripleSplit';
      definitionLabel = 'Dreifach geteilte Definition (Triple Split)';
      definitionDesc = 'Drei getrennte Energie-Zentren-Gruppen. Braucht verschiedene soziale Umfelder und Bewegung.';
    } else {
      definitionType = 'QuadrupleSplit';
      definitionLabel = 'Vierfach geteilte Definition (Quadruple Split)';
      definitionDesc = 'Vier eigenständige energetische Systeme. Hohe Anpassungsfähigkeit und reiche Vielfalt.';
    }
  }

  // 9. Incarnation Cross
  const incarnationCross = determineIncarnationCross(
    pSun.gate,
    pSun.line,
    pEarth.gate,
    dSun.gate,
    dEarth.gate,
    profile.code
  );

  // 10. Variables / PHS (The 4 Arrows)
  const dNodes = designActivations.find(a => a.planetId === 'NorthNode') || designActivations[3];
  const pNodes = personalityActivations.find(a => a.planetId === 'NorthNode') || personalityActivations[3];

  const variables: HDVariableArrows = {
    digestion: {
      direction: dSun.tone <= 3 ? 'left' : 'right',
      tone: dSun.tone,
      color: dSun.color,
      label: dSun.tone <= 3 ? 'Aktiv / Fokussiert (◀ Links)' : 'Passiv / Empfangend (▶ Rechts)',
      description: dSun.tone <= 3
        ? 'Strukturierte Ernährung und selektive Reizaufnahme unterstützen deine Gehirnleistung optimal.'
        : 'Sanfte, intuitive Nahrungsaufnahme und lockere Umgebungen nähren dein Nervensystem.'
    },
    environment: {
      direction: dNodes.tone <= 3 ? 'left' : 'right',
      tone: dNodes.tone,
      color: dNodes.color,
      label: dNodes.tone <= 3 ? 'Beobachtend / Aktiv (◀ Links)' : 'Eingebettet / Passiv (▶ Rechts)',
      description: dNodes.tone <= 3
        ? 'Du wirkst aktiv auf deine Räume und gestaltest deine Umgebung kontrolliert.'
        : 'Du lässt dich von der Atmosphäre deiner Orte inspirieren und aufladen.'
    },
    perspective: {
      direction: pNodes.tone <= 3 ? 'left' : 'right',
      tone: pNodes.tone,
      color: pNodes.color,
      label: pNodes.tone <= 3 ? 'Fokussierter Blick (◀ Links)' : 'Peripherer Weitblick (▶ Rechts)',
      description: pNodes.tone <= 3
        ? 'Du erfasst Details und spezifische Fakten mit hoher Konzentration.'
        : 'Du nimmst das gesamte Bild ganzheitlich und intuitiv aus dem Augenwinkel wahr.'
    },
    motivation: {
      direction: pSun.tone <= 3 ? 'left' : 'right',
      tone: pSun.tone,
      color: pSun.color,
      label: pSun.tone <= 3 ? 'Strategischer Geist (◀ Links)' : 'Rezeptiver Geist (▶ Rechts)',
      description: pSun.tone <= 3
        ? 'Dein Verstand liebt logische Pläne, Strukturen und zielgerichtete Schritte.'
        : 'Dein Geist ist ein offener Ozean für kosmische Inspiration ohne starre Schubladen.'
    }
  };

  // 11. Synthesis & Birkenbihl Protocol
  const personName = input.name || 'Edle Seele';
  const deconditioningProtocol = undefinedCenters.map(cId => {
    const cInfo = HD_CENTERS[cId];
    return `[${cInfo.germanName}] ${cInfo.deconditioningKey}`;
  });

  const synthesis = {
    summary: `${personName} ist ein ${energyType.germanTitle} mit ${authority.germanName} und dem Profil ${profile.code} (${profile.germanName}). Das Lebenswerk entfaltet sich unter dem ${incarnationCross.name}.`,
    quantumGift: `${energyType.signature} durch das Meistern der Strategie: ${energyType.strategy}.`,
    notSelfDanger: `Gefahr von ${energyType.notSelfTheme} bei übermäßigem Verstandes-Handeln ohne Beachtung der inneren Autorität.`,
    deconditioningProtocol
  };

  return {
    input,
    utcBirthDate,
    utcDesignDate,
    daysDifference,
    personalityActivations,
    designActivations,
    activeGates,
    definedCenters,
    undefinedCenters,
    definedChannels,
    energyType,
    authority,
    profile,
    definition: {
      type: definitionType,
      label: definitionLabel,
      description: definitionDesc
    },
    incarnationCross,
    variables,
    synthesis
  };
}
