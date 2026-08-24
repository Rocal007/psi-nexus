import type { EnrichedPlanet } from './engine';
import type { CalculatedAspect } from './aspects';
import type { HouseCalculationResult } from './houses';
import type { ElementModalityBalance } from './dignities';

export interface StelliumInfo {
  type: 'sign' | 'house';
  targetName: string; // e.g. "Steinbock" or "5. Haus"
  planets: EnrichedPlanet[];
  esotericMeaning: string;
  relationshipImpact: string;
  careerImpact: string;
  fulfillmentImpact: string;
}

export interface AspectPatternInfo {
  type: 't_square' | 'grand_trine' | 'yod' | 'grand_cross' | 'mystic_rectangle';
  name: string;
  focalPlanet?: EnrichedPlanet;
  planets: EnrichedPlanet[];
  description: string;
  lifeEffect: string;
}

export interface LifePillarsAnalysis {
  specialConfigurations: {
    stelliums: StelliumInfo[];
    patterns: AspectPatternInfo[];
  };
  relationships: {
    headline: string;
    coreTheme: string;
    strengths: string[];
    challenges: string[];
    soulPartnerTrigger: string;
  };
  career: {
    headline: string;
    vocationType: string;
    coreStrengths: string[];
    idealWorkEnvironment: string;
    growthStrategy: string;
  };
  personalFulfillment: {
    headline: string;
    soulDrive: string;
    innerPeaceKey: string;
    shadowToIntegrate: string;
    dailyActionStep: string;
  };
}

export function detectSpecialConfigurations(
  planets: EnrichedPlanet[],
  aspects: CalculatedAspect[],
  housesResult: HouseCalculationResult,
  balance: ElementModalityBalance
): LifePillarsAnalysis {
  // 1. Detect Stelliums (3 or more planets in same sign or house)
  const stelliums: StelliumInfo[] = [];

  // By Sign
  const signGroups: Record<string, EnrichedPlanet[]> = {};
  planets.forEach(p => {
    signGroups[p.sign.name] = signGroups[p.sign.name] || [];
    signGroups[p.sign.name].push(p);
  });

  Object.entries(signGroups).forEach(([signName, group]) => {
    if (group.length >= 3) {
      stelliums.push({
        type: 'sign',
        targetName: `Zeichen ${signName}`,
        planets: group,
        esotericMeaning: `Massive Bündelung kosmischer Schöpferkraft im Zeichen ${signName}. Deine Seele hat hier einen gewaltigen Energieschwerpunkt gesetzt, der wie ein inneres Kraftwerk wirkt.`,
        relationshipImpact: `In Beziehungen forderst du kompromisslose Resonanz auf der Schwingungsebene von ${signName}. Halbe Sachen oder Oberflächlichkeit führen schnell zu Frustration.`,
        careerImpact: `Beruflich wirst du zur unangefochtenen Koryphäe, wenn du Projekte leitest, die exakt die Stärken von ${signName} verlangen.`,
        fulfillmentImpact: `Erfüllung findest du, wenn du diese konzentrierte Energie nicht unterdrückst, sondern ihr ein schöpferisches Ventil gibst.`
      });
    }
  });

  // By House
  const houseGroups: Record<number, EnrichedPlanet[]> = {};
  planets.forEach(p => {
    houseGroups[p.house] = houseGroups[p.house] || [];
    houseGroups[p.house].push(p);
  });

  const houseNames: Record<number, string> = {
    1: '1. Haus (Identität & Vitalität)',
    2: '2. Haus (Werte & Finanzen)',
    3: '3. Haus (Geist & Kommunikation)',
    4: '4. Haus (Heimat & Seelenwurzeln)',
    5: '5. Haus (Schöpferkraft, Herz & Romantik)',
    6: '6. Haus (Alltag, Meisterschaft & Gesundheit)',
    7: '7. Haus (Partnerschaft & Begegnung)',
    8: '8. Haus (Transformation & Seelentiefe)',
    9: '9. Haus (Weisheit & Lebenssinn)',
    10: '10. Haus (Berufung & Welterfolg)',
    11: '11. Haus (Visionen, Freunde & Netzwerke)',
    12: '12. Haus (Mystik, Stille & Transzendenz)'
  };

  Object.entries(houseGroups).forEach(([hNumStr, group]) => {
    const hNum = parseInt(hNumStr, 10);
    if (group.length >= 3) {
      stelliums.push({
        type: 'house',
        targetName: houseNames[hNum] || `${hNum}. Haus`,
        planets: group,
        esotericMeaning: `Ein außergewöhnliches Stellium im ${hNum}. Haus: Dieses Lebensfeld ist deine primäre kosmische Bühne der Meisterschaft und Einweihung.`,
        relationshipImpact: hNum === 5 || hNum === 7 || hNum === 8
          ? `Höchste Intensität in Liebe & Bindung: Beziehungen sind für dich kein Nebenschauplatz, sondern der tiefste Transformationskatalysator.`
          : `Dein Partner muss verstehen, dass dein Fokus stark durch dein Wirken im ${hNum}. Haus geprägt ist.`,
        careerImpact: `Beruflich fließt deine größte Schaffenskraft dorthin, wo die Themen des ${hNum}. Hauses im Zentrum stehen.`,
        fulfillmentImpact: `Wahre Seelenruhe stellt sich ein, wenn dieses Haus aktiv und selbstbestimmt gelebt wird.`
      });
    }
  });

  // 2. Detect Major Aspect Patterns
  const patterns: AspectPatternInfo[] = [];

  // Detect T-Square (Opposition + 2 Squares to Apex)
  for (const asp of aspects.filter(a => a.aspectType === 'Opposition')) {
    const enrichedP1 = planets.find(p => p.id === asp.planet1.id);
    const enrichedP2 = planets.find(p => p.id === asp.planet2.id);
    if (!enrichedP1 || !enrichedP2) continue;

    for (const p3 of planets) {
      if (p3.id === enrichedP1.id || p3.id === enrichedP2.id) continue;
      const sq1 = aspects.find(a => a.aspectType === 'Square' && ((a.planet1.id === enrichedP1.id && a.planet2.id === p3.id) || (a.planet2.id === enrichedP1.id && a.planet1.id === p3.id)));
      const sq2 = aspects.find(a => a.aspectType === 'Square' && ((a.planet1.id === enrichedP2.id && a.planet2.id === p3.id) || (a.planet2.id === enrichedP2.id && a.planet1.id === p3.id)));

      if (sq1 && sq2) {
        patterns.push({
          type: 't_square',
          name: `T-Kreuz (Spannungsdreieck) mit Fokusplanet ${p3.name}`,
          focalPlanet: p3,
          planets: [enrichedP1, enrichedP2, p3],
          description: `Ein hochenergetisches Spannungsgefüge zwischen ${enrichedP1.name}, ${enrichedP2.name} und ${p3.name}. Das T-Kreuz erzeugt enormen inneren Antrieb.`,
          lifeEffect: `Die immense Reibungsenergie drängt unaufhaltsam über den Spitzenplaneten (${p3.name}) nach außen. In der Krise liegt dein größter Geniestreich!`
        });
        break;
      }
    }
  }

  // Detect Grand Trine (3 planets with mutual trines)
  const trines = aspects.filter(a => a.aspectType === 'Trine');
  for (let i = 0; i < trines.length; i++) {
    for (let j = i + 1; j < trines.length; j++) {
      const t1 = trines[i];
      const t2 = trines[j];
      const common = [t1.planet1.id, t1.planet2.id].filter(id => [t2.planet1.id, t2.planet2.id].includes(id));
      if (common.length === 1) {
        const commonId = common[0];
        const otherId1 = t1.planet1.id === commonId ? t1.planet2.id : t1.planet1.id;
        const otherId2 = t2.planet1.id === commonId ? t2.planet2.id : t2.planet1.id;
        const t3 = trines.find(a => (a.planet1.id === otherId1 && a.planet2.id === otherId2) || (a.planet2.id === otherId1 && a.planet1.id === otherId2));
        if (t3) {
          const commonPlanet = planets.find(p => p.id === commonId);
          const other1 = planets.find(p => p.id === otherId1);
          const other2 = planets.find(p => p.id === otherId2);
          if (commonPlanet && other1 && other2) {
            patterns.push({
              type: 'grand_trine',
              name: `Großes Glücks-Trigon im Element ${commonPlanet.sign.element}`,
              planets: [commonPlanet, other1, other2],
              description: `Ein vollkommen geschlossenes Dreieck kosmischer Harmonie im Element ${commonPlanet.sign.element}.`,
              lifeEffect: `Müheloser Talentfluss, instinktives Gelingen und angeborene Seelengaben in den Bereichen dieses Elements.`
            });
          }
        }
      }
    }
  }

  // 3. Domain: RELATIONSHIPS (Beziehung & Liebe)
  const venus = planets.find(p => p.id === 'Venus') || planets[3];
  const mars = planets.find(p => p.id === 'Mars') || planets[4];
  const moon = planets.find(p => p.id === 'Moon') || planets[1];
  const descSign = housesResult.angles.descendant.sign;

  const relationshipStrengths = [
    `Venus in ${venus.sign.name} (${venus.house}. Haus): Verleiht dir eine unverwechselbare Anziehungskraft, geprägt von ${venus.sign.keywords[0]} und ${venus.sign.keywords[1]}.`,
    `Deszendent in ${descSign.name}: Im Partner suchst du die bewusste Ergänzung durch ${descSign.keywords.slice(0, 2).join(' und ')}.`,
    `Mars in ${mars.sign.name}: Deine leidenschaftliche Antriebskraft drückt sich durch ${mars.sign.keywords[0]} aus.`
  ];

  const relationshipChallenges = [
    `Gefahr, dass dein inneres Sicherheitsbedürfnis (Mond in ${moon.sign.name}) mit dem Wunsch nach Freiheit kollidiert.`,
    `Unbewusste Erwartungshaltung, dass der Partner die eigenen verborgenen Schatten heilen soll.`
  ];

  // 4. Domain: CAREER & VOCATION (Beruf & Berufung)
  const mcSign = housesResult.angles.midheaven.sign;
  const sun = planets.find(p => p.id === 'Sun') || planets[0];
  const saturn = planets.find(p => p.id === 'Saturn') || planets[6];

  const careerStrengths = [
    `Medium Coeli (MC) in ${mcSign.name}: Deine höchste sichtbare Berufung verlangt ${mcSign.keywords.slice(0, 3).join(', ')}.`,
    `Sonne im ${sun.house}. Haus: Deine vitale Schöpferkraft glänzt am stärksten, wenn du in diesem Lebensbereich Verantwortung übernimmst.`,
    `Saturn in ${saturn.sign.name} (${saturn.house}. Haus): Langfristige Meisterschaft und Durchhaltevermögen durch strukturierte Disziplin.`
  ];

  // 5. Domain: PERSONAL FULFILLMENT (Persönliche Erfüllung)
  const ascSign = housesResult.angles.ascendant.sign;
  const node = planets.find(p => p.id === 'NorthNode') || planets[10];
  const chiron = planets.find(p => p.id === 'Chiron') || planets[11];

  return {
    specialConfigurations: {
      stelliums,
      patterns
    },
    relationships: {
      headline: `Beziehungsdynamik: Zwischen ${venus.sign.name}-Hingabe und ${descSign.name}-Spiegelung`,
      coreTheme: `In Partnerschaften lebst du die Verbindung aus herzlicher Hingabe (${venus.sign.name}) und dem karmischen Wunsch nach wahrhafter Tiefe. Du suchst ein Gegenüber auf Augenhöhe, das deine emotionale Wahrheit (${moon.sign.name}) respektiert.`,
      strengths: relationshipStrengths,
      challenges: relationshipChallenges,
      soulPartnerTrigger: `Dein Seelenpartner aktiviert in dir den Mut, die eigene Verletzlichkeit zu zeigen und alte Schutzpanzer abzulegen.`
    },
    career: {
      headline: `Berufung & Erfolg: Die Meisterschaft des MC in ${mcSign.name}`,
      vocationType: `Führende(r) Gestalter(in) mit Fokus auf ${mcSign.name}-Qualitäten und ${sun.sign.name}-Schöpferkraft.`,
      coreStrengths: careerStrengths,
      idealWorkEnvironment: `Ein Umfeld mit hoher Eigenverantwortung, klarer Sinnhaftigkeit und Raum für souveräne Entscheidungen (${balance.dominantModality}e Grundstruktur).`,
      growthStrategy: `Bündele deine Kräfte auf dein zentrales Seelenziel (${mcSign.keywords.slice(0, 2).join(' & ')}) anstatt dich in Nebenschauplätzen zu verlieren.`
    },
    personalFulfillment: {
      headline: `Seelenplan & Erfüllung: Das Leuchten der ${sun.sign.name}-Sonne durch den ${ascSign.name}-Aszendenten`,
      soulDrive: `Dein tiefster Seelendrang ist es, die Schöpferkraft von ${sun.sign.name} als mutiges Vorbild (${ascSign.name}) in die Welt zu tragen.`,
      innerPeaceKey: `Innerer Friede stellt sich ein, wenn du dem Ruf deines Nordknotens in ${node.sign.name} folgst und den alten Schmerz von Chiron in ${chiron.sign.name} in Mitgefühl für andere verwandelst.`,
      shadowToIntegrate: `Die Angst vor Unvollkommenheit und die Tendenz, sich hinter einer unnahbaren Maske zu verstecken.`,
      dailyActionStep: `Nimm dir täglich 10 Minuten Stille, um dich mit deinem Seelen-Zentrum (☉) zu verbinden und aus der Fülle deines Herzens zu handeln.`
    }
  };
}
