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
  const lilith = planets.find(p => p.id === 'Lilith' || p.id.toLowerCase() === 'lilith') || planets[12] || planets[0];
  const chiron = planets.find(p => p.id === 'Chiron' || p.id.toLowerCase() === 'chiron') || planets[11] || planets[0];
  const descSign = housesResult.angles.descendant.sign;

  const relationshipStrengths = [
    `Venus in ${venus.sign.name} (${venus.house}. Haus): Verleiht dir eine unverwechselbare Anziehungskraft, geprägt von ${venus.sign.keywords[0]} und ${venus.sign.keywords[1]}.`,
    `Deszendent in ${descSign.name}: Im Partner suchst du die bewusste Ergänzung durch ${descSign.keywords.slice(0, 2).join(' und ')}.`,
    `Mars in ${mars.sign.name}: Deine leidenschaftliche Antriebskraft drückt sich durch ${mars.sign.keywords[0]} aus.`
  ];

  // Dynamic Relationship Challenges derived from Moon, Lilith, and Chiron
  const moonEl = moon.sign.element;
  const moonChallenge = moonEl === 'Feuer'
    ? `Gefahr von Ungeduld und emotionaler Reaktivität (Mond in ${moon.sign.name}): Das intensive Bedürfnis nach Autonomie kann das Gegenüber unvorbereitet treffen.`
    : moonEl === 'Erde'
    ? `Festhalten an Kontrollmustern (Mond in ${moon.sign.name}): Das ausgeprägte Sicherheitsbedürfnis hemmt gelegentlich die spontane seelische Hingabe.`
    : moonEl === 'Luft'
    ? `Intellektualisierung von Gefühlen (Mond in ${moon.sign.name}): Emotionen werden analysiert statt durchfühlt, was unbewusst Distanz im partnerschaftlichen Dialog erzeugt.`
    : `Überempfindlichkeit und Rückzugstendenzen (Mond in ${moon.sign.name}): Tief sitzende seelische Schwingungen können zu vorschnellen Schutzmauern führen.`;

  const lilithChallenge = `Lilith in ${lilith.sign.name} (${lilith.sign.keywords.slice(0, 2).join(' / ')}): Ein kompromissloser Autonomie-Reflex erfordert Achtsamkeit, Unabhängigkeit nicht als Flucht vor echter Intimität einzusetzen.`;
  const chironChallenge = `Chirons Urwunde in ${chiron.sign.name}: Mahnt davor, alte seelische Verletzungen auf den Partner zu projizieren oder unbewusst Erlösung im Außen zu suchen.`;

  const relationshipChallenges = [
    moonChallenge,
    lilithChallenge,
    chironChallenge
  ];

  // Dynamic Soul Partner Trigger derived from Chiron, Lilith, and Moon
  const dynamicSoulPartnerTrigger = `Dein Seelenpartner berührt deine Chiron-Urwunde im Zeichen ${chiron.sign.name} (${chiron.sign.keywords.slice(0, 2).join(' / ')}) und entfacht die transformative Schöpferkraft von Lilith in ${lilith.sign.name}: Er fordert dich liebevoll heraus, alte Schutzpanzer abzulegen, deine emotionale Wahrheit (Mond in ${moon.sign.name}) ungeschminkt zu zeigen und deine ungezähmte Authentizität mutig zu leben.`;

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

  // Dynamic Shadow to Integrate derived from Lilith, Chiron, and Dominant Element
  const domEl = balance.dominantElement;
  const dynamicShadowToIntegrate = domEl === 'Feuer'
    ? `Die Furcht vor Ohnmacht oder Nicht-Gesehenwerden: Integriere Sanftmut und die Gewissheit, dass dein inneres Licht (Lilith in ${lilith.sign.name}) auch in Momenten der Stille und Verletzlichkeit unantastbar strahlt.`
    : domEl === 'Erde'
    ? `Das ängstliche Klammern an Kontrolle und Perfektionismus: Lass die Angst vor dem Unvorhersehbaren los und vertraue auf die angeborene Resilienz deiner Seele (Lilith in ${lilith.sign.name}, Chiron in ${chiron.sign.name}).`
    : domEl === 'Luft'
    ? `Die Flucht vor emotionaler Rohheit in kühle Theorie oder endlose Gedankenschleifen: Erlaube dir, Gefühle unmittelbar im Körper zu verankern und echte Seelennähe zuzulassen (Lilith in ${lilith.sign.name}).`
    : `Die Furcht vor seelischer Überwältigung oder Verlassenwerden: Wandle emotionale Schutzmechanismen in souveräne Seelenautonomie und bedingungslose Selbstannahme (Lilith in ${lilith.sign.name}, Chiron in ${chiron.sign.name}).`;

  // Dynamic Daily Action Step derived from Dominant Element and Moon Sign
  const dynamicDailyActionStep = domEl === 'Feuer'
    ? `Nimm dir täglich 10 Minuten für eine dynamische Atem- oder Bewegungsmeditation: Zentriere dein feuriges Schöpferfeuer (Mond in ${moon.sign.name}) und handle aus der strahlenden Mitte deines Herzens.`
    : domEl === 'Erde'
    ? `Praktiziere täglich einen achtsamen Erdungs-Moment – einen Spaziergang in der Natur, Barfußgehen oder Stillekontemplation –, um das Urvertrauen deines ${moon.sign.name}-Monds zu vertiefen.`
    : domEl === 'Luft'
    ? `Gönne dir täglich 10 Minuten digitales Fasten und freies Reflektions-Journaling, um den mentalen Raum zu klären und die Weisheit deines ${moon.sign.name}-Monds klar zu empfangen.`
    : `Erschaffe dir täglich ein geschütztes Ritual mit Wasser, beruhigender Musik oder stiller Einkehr, um seelische Resonanzen zu klären und dein inneres Heiligtum (☽ ${moon.sign.name}) zu nähren.`;

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
      soulPartnerTrigger: dynamicSoulPartnerTrigger
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
      shadowToIntegrate: dynamicShadowToIntegrate,
      dailyActionStep: dynamicDailyActionStep
    }
  };
}
