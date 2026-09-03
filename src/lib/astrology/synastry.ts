import type { CompleteNatalChart, EnrichedPlanet } from './engine';
import type { ZodiacSign } from './constants';
import { degreeToSignAndPos } from './ephemeris';

export interface SynastryAspect {
  planetA: EnrichedPlanet;
  planetB: EnrichedPlanet;
  aspectType: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
  aspectName: string;
  symbol: string;
  orb: number;
  exactAngle: number;
  nature: 'harmonious' | 'dynamic' | 'karmic' | 'magnetic';
  category: 'emotion' | 'passion' | 'mind' | 'karma';
  color: string;
  headline: string;
  esotericMeaning: string;
  birkenbihlTip: string;
}

export interface SynastryScores {
  overallScore: number; // 0..100
  archetype: string;
  tagline: string;
  emotionalHarmony: {
    score: number;
    level: string;
    description: string;
  };
  passionAndChemistry: {
    score: number;
    level: string;
    description: string;
  };
  mindAndCommunication: {
    score: number;
    level: string;
    description: string;
  };
  karmicBondAndStability: {
    score: number;
    level: string;
    description: string;
  };
}

export interface CompositePlanet {
  id: string;
  name: string;
  symbol: string;
  longitude: number;
  degreeString: string;
  sign: ZodiacSign;
  color: string;
  interpretation: string;
}

export interface CompositeChartResult {
  sun: CompositePlanet;
  moon: CompositePlanet;
  ascendant: CompositePlanet;
  midheaven: CompositePlanet;
  venus: CompositePlanet;
  mars: CompositePlanet;
  jupiter: CompositePlanet;
  saturn: CompositePlanet;
  sharedSoulPurpose: string;
  relationshipMotto: string;
  pairGemstone: {
    name: string;
    chakra: string;
    effect: string;
  };
}

export interface SynastryAnalysisResult {
  personA: {
    name: string;
    sunSign: string;
    moonSign: string;
    ascendantSign: string;
    lifePath: number;
  };
  personB: {
    name: string;
    sunSign: string;
    moonSign: string;
    ascendantSign: string;
    lifePath: number;
  };
  scores: SynastryScores;
  aspects: SynastryAspect[];
  composite: CompositeChartResult;
  numerologySynergy: {
    lifePathSum: number;
    lifePathArchetype: string;
    harmonyDescription: string;
    affirmation: string;
  };
}

export interface FamilyMemberRole {
  name: string;
  sunSign: string;
  moonSign: string;
  ascendantSign: string;
  element: string;
  soulRoleTitle: string;
  roleIcon: string;
  giftToFamily: string;
  growthTrigger: string;
}

export interface FamilyMatrixResult {
  memberCount: number;
  members: FamilyMemberRole[];
  elementBalance: {
    fire: number;
    earth: number;
    air: number;
    water: number;
    dominantElement: string;
    missingOrWeakElement: string;
  };
  familyDynamicHeadline: string;
  familyKarmaLesson: string;
  birkenbihlCommunicationCode: string;
  familySoulMotto: string;
}

// Helpers for Midpoints
export function calculateMidpointLongitude(lon1: number, lon2: number): number {
  let diff = Math.abs(lon1 - lon2);
  let mid: number;
  if (diff <= 180) {
    mid = (lon1 + lon2) / 2;
  } else {
    mid = (lon1 + lon2) / 2 + 180;
  }
  return ((mid % 360) + 360) % 360;
}

// 1. Dynamic Relationship Motto based on Element combinations
export function calculateDynamicRelationshipMotto(compSun: ZodiacSign, compMoon: ZodiacSign): string {
  const sunEl = compSun.element;
  const moonEl = compMoon.element;
  const key = `${sunEl}-${moonEl}`;

  const mottoMatrix: Record<string, string> = {
    'Feuer-Feuer': `„Zwei Flammen, ein kosmisches Leuchtfeuer – unsere Liebe brennt mit unbändigem Pioniergeist (${compSun.name}), mutiger Herzenskraft und purer Schöpferfreude (${compMoon.name}).“`,
    'Feuer-Erde': `„Vision trifft auf fruchtbaren Boden – wir verwandeln feurige Begeisterung (${compSun.name}) in meisterhafte Realität und bauen ein unerschütterliches Seelenfundament (${compMoon.name}).“`,
    'Feuer-Luft': `„Der Atem, der das Schöpferfeuer entfacht – wir beflügeln einander mit grenzenlosen Ideen (${compSun.name}), geistiger Freiheit und geteilter Lebenslust (${compMoon.name}).“`,
    'Feuer-Wasser': `„Alchemistische Herzensglut – im Zusammentreffen von mutiger Tatkraft (${compSun.name}) und tiefer Seelenberührung (${compMoon.name}) heilen, transformieren und erneuern wir einander.“`,
    'Erde-Feuer': `„Aus tiefem Urgestein bricht strahlendes Schöpferlicht – wir schenken kühnen Träumen (${compSun.name}) verlässliche Struktur, Schutz und dauerhaften Glanz (${compMoon.name}).“`,
    'Erde-Erde': `„Zwei Wurzeln, ein ewiger Seelenbaum – im Rhythmus der Natur (${compSun.name}) schenken wir einander bedingungslose Geborgenheit, treue Verlässlichkeit und bleibende Werte (${compMoon.name}).“`,
    'Erde-Luft': `„Geerdete Weisheit im freien Dialog – wir verbinden pragmatische Meisterschaft (${compSun.name}) mit geistiger Klarheit und visionärer Weite (${compMoon.name}).“`,
    'Erde-Wasser': `„Fruchtbare Oase des Lebens – wo beständige Verlässlichkeit (${compSun.name}) auf nährende Herzenswärme (${compMoon.name}) trifft, erblüht unsere Liebe in tiefer seelischer Harmonie.“`,
    'Luft-Feuer': `„Ein göttlicher Funke, der den Horizont erleuchtet – durch geistige Inspiration (${compSun.name}) und mutigen Vorwärtsdrang (${compMoon.name}) eröffnen wir einander neue Dimensionen.“`,
    'Luft-Erde': `„Geistige Klarheit findet sichere Wurzeln – wir schenken visionären Gedanken (${compSun.name}) greifbare Gestalt, geordnete Harmonie und dauerhaften Halt (${compMoon.name}).“`,
    'Luft-Luft': `„Zwei Seelen im selben kosmischen Wind – in geistiger Freiheit, heiterer Leichtigkeit (${compSun.name}) und philosophischer Tiefe (${compMoon.name}) verstehen wir uns ohne Worte.“`,
    'Luft-Wasser': `„Poesie zwischen Geist und Seelentiefe – feinsinniges Denken (${compSun.name}) verschmilzt mit intuitiver Herzensweisheit (${compMoon.name}) zu einem unendlichen Strom des Mitgefühls.“`,
    'Wasser-Feuer': `„Ozeanische Tiefe entfacht innere Glut – wir ergründen die Mysterien der Seele (${compSun.name}) mit dem wärmenden Licht unbändiger Hingabe und Treue (${compMoon.name}).“`,
    'Wasser-Erde': `„Ein klarer Seelenquell, geborgen im Schoß der Erde – wir nähren einander mit instinktivem Schutz (${compSun.name}), emotionaler Wahrheit und verlässlicher Zärtlichkeit (${compMoon.name}).“`,
    'Wasser-Luft': `„Sanfte Brise über tiefem Gewässer – wir übersetzen tiefste Gefühle (${compSun.name}) in verständnisvollen Dialog und schenken einander seelische Klarheit (${compMoon.name}).“`,
    'Wasser-Wasser': `„Vollkommene Seelenverschmelzung – im Ozean bedingungsloser Liebe (${compSun.name} & ${compMoon.name}) bedarf es keiner Masken, denn unsere Herzen schlagen im selben ewigen Takt.“`
  };

  return mottoMatrix[key] || `„In Liebe verbunden, im Geiste frei – wir erschaffen miteinander einen geschützten Raum für gegenseitiges Erblühen.“`;
}

// 2. Dynamic Pair Gemstone based on Sun & Venus Element/Sign
export function calculateDynamicPairGemstone(compSun: ZodiacSign, compVenus: ZodiacSign): {
  name: string;
  chakra: string;
  effect: string;
} {
  const sunEl = compSun.element;
  const venEl = compVenus.element;
  const pairKey = `${sunEl}-${venEl}`;

  const gemstoneMatrix: Record<string, { name: string; chakra: string; effect: string }> = {
    'Feuer-Feuer': {
      name: 'Karneol & Roter Granat',
      chakra: 'Manipura & Muladhara (Solarplexus- & Wurzelchakra)',
      effect: 'Entfacht vitale Leidenschaft, schützt die schöpferische Strahlkraft des Paares und schenkt mutige Tatkraft für gemeinsame Herzensprojekte.'
    },
    'Feuer-Erde': {
      name: 'Tigerauge & Roter Jaspis',
      chakra: 'Manipura & Wurzelchakra',
      effect: 'Verbindet leidenschaftliche Begeisterung mit geerdeter Beständigkeit und schützt vor energetischer Verausgabung im Beziehungsalltag.'
    },
    'Feuer-Luft': {
      name: 'Sonnenstein & Citrin',
      chakra: 'Solarplexus- & Sakralchakra',
      effect: 'Schenkt ansteckende Lebensfreude, beflügelt geistige Visionen und bringt strahlenden Optimismus in gemeinsame Unternehmungen.'
    },
    'Feuer-Wasser': {
      name: 'Rhodochrosit & Feuerachat',
      chakra: 'Anahata (Herzchakra) & Sakralchakra',
      effect: 'Harmonisiert emotionale Intensität, wandelt ungestüme Leidenschaft in alchemistische Herzenswärme und schenkt seelischen Frieden.'
    },
    'Erde-Erde': {
      name: 'Smaragd & Malachit',
      chakra: 'Anahata (Herzchakra) & Wurzelchakra',
      effect: 'Schenkt unerschütterliche Loyalität, nährt die gemeinsame Erdung und zieht materielle wie emotionale Fülle in eure Verbindung.'
    },
    'Erde-Feuer': {
      name: 'Pyrit & Granat',
      chakra: 'Solarplexus- & Wurzelchakra',
      effect: 'Katalysiert die greifbare Manifestation eurer Träume und schützt das Paar vor äußeren Zweifeln und Entmutigung.'
    },
    'Erde-Luft': {
      name: 'Grüner Aventurin & Chrysokoll',
      chakra: 'Herz- & Halschakra',
      effect: 'Fördert ruhige, sachliche Herzenskommunikation, balanciert Gedankenkreisen und festigt ein harmonisches Zusammenleben.'
    },
    'Erde-Wasser': {
      name: 'Jade & Grüner Turmalin',
      chakra: 'Herz- & Sakralchakra',
      effect: 'Nährt instinktives Vertrauen, schenkt seelische Fruchtbarkeit und schützt den gemeinsamen Erholungs- und Heilungsraum.'
    },
    'Luft-Luft': {
      name: 'Aquamarin & Lapislazuli',
      chakra: 'Vishuddha & Ajna (Hals- & Stirnchakra)',
      effect: 'Klärt den geistigen Austausch, schützt vor Missverständnissen und öffnet die Ebene für telepathische Seelenverbundenheit.'
    },
    'Luft-Feuer': {
      name: 'Citrin & Bergkristall',
      chakra: 'Solarplexus- & Kronenchakra',
      effect: 'Beflügelt schöpferische Inspiration, schenkt Klarheit in Zukunftsplänen und vertreibt jegliche Schwere aus der Partnerschaft.'
    },
    'Luft-Erde': {
      name: 'Moosachat & Blauer Chalcedon',
      chakra: 'Herz- & Halschakra',
      effect: 'Verbindet geistige Beweglichkeit mit praktischer Vernunft und fördert geduldigen, wohlwollenden Austausch.'
    },
    'Luft-Wasser': {
      name: 'Amethyst & Blauer Topas',
      chakra: 'Kronen- & Halschakra',
      effect: 'Verbindet intuitive Seeleneindrücke mit klarer, liebevoller Ausdruckskraft und beruhigt das Nervensystem beider Partner.'
    },
    'Wasser-Wasser': {
      name: 'Rosenquarz & Rhodonit',
      chakra: 'Anahata (Herzchakra) & Sakralchakra',
      effect: 'Öffnet den gemeinsamen Herzraum für bedingungslose Liebe, heilt vergangene Seelenwunden und schenkt tiefste Geborgenheit.'
    },
    'Wasser-Feuer': {
      name: 'Rosenquarz & Rubin',
      chakra: 'Herz- & Wurzelchakra',
      effect: 'Vereint zarte seelische Hingabe mit feuriger magnetischer Anziehung und errichtet ein starkes energetisches Schutzfeld.'
    },
    'Wasser-Erde': {
      name: 'Mondstein & Smaragd',
      chakra: 'Sakral- & Herzchakra',
      effect: 'Erdet tiefe Emotionen, fördert gegenseitige Fürsorge und schenkt beständige, sanft nährende Zärtlichkeit.'
    },
    'Wasser-Luft': {
      name: 'Larimar & Selenit',
      chakra: 'Hals- & Kronenchakra',
      effect: 'Löst emotionale Spannungen sanft auf, fördert friedvollen Seelendialog und verbindet das Paar mit höheren Schwingungsebenen.'
    }
  };

  return gemstoneMatrix[pairKey] || {
    name: 'Rosenquarz & Bergkristall',
    chakra: 'Anahata (Herzchakra)',
    effect: 'Öffnet den gemeinsamen Herzraum für bedingungslose Liebe, klärt Missverständnisse und stärkt loyale Treue.'
  };
}

// 3. Dynamic Composite Interpretations
function getCompositeVenusInterpretation(sign: ZodiacSign): string {
  const map: Record<string, string> = {
    Feuer: `In ${sign.name} (${sign.element}): Eure Liebe brennt mit lebendiger Begeisterung, feuriger Romantik und geteilter Abenteuerlust. Ihr nährt eure Verbindung, wenn ihr einander Raum für mutige Entfaltung und freie Schöpferkraft schenkt.`,
    Erde: `In ${sign.name} (${sign.element}): Eure Liebe basiert auf gelebter Zuverlässigkeit, sinnlicher Geborgenheit und dauerhaften Werten. In ${sign.name} zeigt sich Zuneigung in realen Taten, Fürsorge und unerschütterlichem Zusammenhalt.`,
    Luft: `In ${sign.name} (${sign.element}): Eure Liebe erblüht im inspirierenden Dialog, heiterer Leichtigkeit und gegenseitiger geistiger Wertschätzung. Eine tiefe ästhetische und philosophische Harmonie verbindet eure Herzen.`,
    Wasser: `In ${sign.name} (${sign.element}): Eure Liebe wurzelt in tiefem intuitivem Mitgefühl, seelischer Verschmelzung und wortlosem Verstehen. Ihr berührt einander auf der feinstofflichen Herzensebene und schenkt euch gegenseitige Heilung.`
  };
  return map[sign.element] || `Die Ästhetik, Zärtlichkeit und seelische Anziehungskraft eurer Verbindung im Zeichen ${sign.name}.`;
}

function getCompositeMarsInterpretation(sign: ZodiacSign): string {
  const map: Record<string, string> = {
    Feuer: `In ${sign.name} (${sign.element}): Eure gemeinsame Handlungsenergie ist von mutigem Pioniergeist, feuriger Tatkraft und Entschlossenheit getragen. Konflikte klärt ihr direkt, aufrichtig und ohne langes Zögern.`,
    Erde: `In ${sign.name} (${sign.element}): Eure Umsetzungskraft zeichnet sich durch zähe Ausdauer, handwerkliche Meisterschaft und pragmatische Zielstrebigkeit aus. Gemeinsame Pläne setzt ihr mit unerschütterlichem Durchhaltewillen um.`,
    Luft: `In ${sign.name} (${sign.element}): Eure Dynamik entfaltet sich in ideenreichen Projekten, strategischem Weitblick und konstruktivem Dialog. Meinungsverschiedenheiten meistert ihr durch sachliche Reflexion.`,
    Wasser: `In ${sign.name} (${sign.element}): Eure Handlungen werden von instinktiver Seelenkraft, Fürsorge und intuitivem Schutzinstinkt gelenkt. Ihr kämpft loyal füreinander und handelt im Einklang mit eurer emotionalen Wahrheit.`
  };
  return map[sign.element] || `Die gemeinsame Umsetzungsenergie, Willenskraft und Dynamik bei Projekten im Zeichen ${sign.name}.`;
}

function getCompositeJupiterInterpretation(sign: ZodiacSign): string {
  const map: Record<string, string> = {
    Feuer: `In ${sign.name} (${sign.element}): Euer größtes Glückspotenzial entfaltet sich durch weite Reisen, visionäre Projekte und ansteckenden Optimismus. Ihr inspiriert einander, über alte Begrenzungen mutig hinauszuwachsen.`,
    Erde: `In ${sign.name} (${sign.element}): Glück und Fülle materialisieren sich in eurer Verbindung durch Naturverbundenheit, Wohlstand und das Ernten meisterhafter Lebensfrüchte. Stabilität schenkt euch spirituelle Weite.`,
    Luft: `In ${sign.name} (${sign.element}): Seelisches Wachstum und Horizonterweiterung erlebt ihr durch philosophischen Austausch, gemeinsames Lernen und ein weltoffenes, freies Bewusstsein.`,
    Wasser: `In ${sign.name} (${sign.element}): Höchste kosmische Gnade und Seelenwachstum fließen durch bedingungsloses Mitgefühl, mystische Tiefe und die gemeinsame Gabe tiefgreifender seelischer Heilung.`
  };
  return map[sign.element] || `Das gemeinsame Glückspotenzial, seelische Expansion und Erkenntnisreichtum im Zeichen ${sign.name}.`;
}

function getCompositeSaturnInterpretation(sign: ZodiacSign): string {
  const map: Record<string, string> = {
    Feuer: `In ${sign.name} (${sign.element}): Euer karmischer Reifeauftrag besteht darin, feurigen Enthusiasmus mit geduldiger Disziplin zu veredeln und unerschütterliche Loyalität zu gemeinsamen Idealen zu wahren.`,
    Erde: `In ${sign.name} (${sign.element}): Ein unerschütterliches Fundament aus unendlicher Treue, verlässlichen Alltagsstrukturen und materieller Sicherheit gibt eurer Partnerschaft zeitlose Beständigkeit.`,
    Luft: `In ${sign.name} (${sign.element}): Tragfähige Verbindlichkeit wächst durch absolute Ehrlichkeit, klare Vereinbarungen und geistige Reife im respektvollen, transparenten Dialog.`,
    Wasser: `In ${sign.name} (${sign.element}): Eure Stabilität gründet auf gegenseitigem emotionalen Schutz, karmischer Seelenloyalität und dem Errichten sicherer Grenzen gegen störende Einflüsse von außen.`
  };
  return map[sign.element] || `Die tragende Stabilität, Treue, Verbindlichkeit und karmische Reife im Zeichen ${sign.name}.`;
}

// Synastry Calculation Function
export function calculateSynastry(
  chartA: CompleteNatalChart,
  chartB: CompleteNatalChart
): SynastryAnalysisResult {
  const nameA = chartA.input.name || 'Person A';
  const nameB = chartB.input.name || 'Person B';

  const aspects: SynastryAspect[] = [];

  // Compare each planet in A with each planet in B
  const planetsA = [...chartA.planets];
  const planetsB = [...chartB.planets];

  planetsA.forEach(pA => {
    planetsB.forEach(pB => {
      let diff = Math.abs(pA.longitude - pB.longitude);
      if (diff > 180) diff = 360 - diff;

      // Conjunction (0°, orb 8°)
      if (diff <= 8.0) {
        aspects.push(buildSynastryAspect(pA, pB, 'conjunction', 'Konjunktion', '☌', diff, '#eab308', 'harmonious', nameA, nameB));
      }
      // Opposition (180°, orb 8°)
      else if (Math.abs(diff - 180) <= 8.0) {
        aspects.push(buildSynastryAspect(pA, pB, 'opposition', 'Opposition', '☍', Math.abs(diff - 180), '#f43f5e', 'magnetic', nameA, nameB));
      }
      // Trine (120°, orb 7°)
      else if (Math.abs(diff - 120) <= 7.0) {
        aspects.push(buildSynastryAspect(pA, pB, 'trine', 'Trigon', '△', Math.abs(diff - 120), '#10b981', 'harmonious', nameA, nameB));
      }
      // Square (90°, orb 7°)
      else if (Math.abs(diff - 90) <= 7.0) {
        aspects.push(buildSynastryAspect(pA, pB, 'square', 'Quadrat', '□', Math.abs(diff - 90), '#f97316', 'dynamic', nameA, nameB));
      }
      // Sextile (60°, orb 5°)
      else if (Math.abs(diff - 60) <= 5.0) {
        aspects.push(buildSynastryAspect(pA, pB, 'sextile', 'Sextil', '⚹', Math.abs(diff - 60), '#06b6d4', 'harmonious', nameA, nameB));
      }
    });
  });

  // Calculate Sub-Scores
  let emoWeight = 70;
  let passWeight = 65;
  let mindWeight = 72;
  let karmWeight = 68;

  aspects.forEach(asp => {
    const boost = Math.max(2, 8 - asp.orb);
    if (asp.category === 'emotion') {
      emoWeight += asp.nature === 'harmonious' || asp.nature === 'magnetic' ? boost * 1.5 : -boost * 0.8;
    } else if (asp.category === 'passion') {
      passWeight += asp.nature === 'magnetic' || asp.nature === 'harmonious' ? boost * 1.6 : boost * 0.5;
    } else if (asp.category === 'mind') {
      mindWeight += asp.nature === 'harmonious' ? boost * 1.4 : -boost * 0.7;
    } else if (asp.category === 'karma') {
      karmWeight += boost * 1.5;
    }
  });

  // Element Compatibility Bonus
  const sunSunSame = chartA.synthesis.sun.planet.sign.element === chartB.synthesis.sun.planet.sign.element;
  const sunMoonMatch = chartA.synthesis.sun.planet.sign.id === chartB.synthesis.moon.planet.sign.id ||
                       chartB.synthesis.sun.planet.sign.id === chartA.synthesis.moon.planet.sign.id;

  if (sunSunSame) {
    emoWeight += 8;
    mindWeight += 6;
  }
  if (sunMoonMatch) {
    emoWeight += 14;
    karmWeight += 10;
  }

  const emoScore = Math.min(99, Math.max(42, Math.round(emoWeight)));
  const passScore = Math.min(99, Math.max(38, Math.round(passWeight)));
  const mindScore = Math.min(99, Math.max(40, Math.round(mindWeight)));
  const karmScore = Math.min(99, Math.max(45, Math.round(karmWeight)));

  const overall = Math.round((emoScore * 0.3 + passScore * 0.25 + mindScore * 0.25 + karmScore * 0.2));

  let archetype = 'Seelenpartner-Bund (Tiefes Vertrauen & Gegenseitige Reifung)';
  let tagline = 'Eine seelische Resonanz, die auf gegenseitigem Respekt und harmonischer Ergänzung aufbaut.';

  if (overall >= 90 || sunMoonMatch) {
    archetype = '🌟 Dualseelen-Symbiose (Alchemistische Vereinigung)';
    tagline = 'Außergewöhnlich hohe karmische & seelische Anziehung. Ihr spiegelt einander die tiefsten Seelenpotenziale.';
  } else if (passScore > 85 && emoScore < 70) {
    archetype = '🔥 Magnetische Anziehung & Katalysator-Liebe';
    tagline = 'Intensive Anziehungskraft und hohe Leidenschaft, die bewusste emotionale Erdung erfordert.';
  } else if (karmScore > 85) {
    archetype = '⚓ Karmischer Seelenvertrag (Schicksalhafte Reifung)';
    tagline = 'Starke gemeinsame Aufgaben aus früheren Zyklen. Diese Beziehung schenkt unzerbrechliche Beständigkeit.';
  }

  // Composite Chart Calculation
  const compSunLon = calculateMidpointLongitude(chartA.synthesis.sun.planet.longitude, chartB.synthesis.sun.planet.longitude);
  const compMoonLon = calculateMidpointLongitude(chartA.synthesis.moon.planet.longitude, chartB.synthesis.moon.planet.longitude);
  const compAcLon = calculateMidpointLongitude(chartA.housesResult.angles.ascendant.longitude, chartB.housesResult.angles.ascendant.longitude);
  const compMcLon = calculateMidpointLongitude(chartA.housesResult.angles.midheaven.longitude, chartB.housesResult.angles.midheaven.longitude);

  const compSunPos = degreeToSignAndPos(compSunLon);
  const compMoonPos = degreeToSignAndPos(compMoonLon);
  const compAcPos = degreeToSignAndPos(compAcLon);
  const compMcPos = degreeToSignAndPos(compMcLon);

  const compVenusLon = calculateMidpointLongitude(
    (chartA.planets.find(p => p.id === 'Venus') || chartA.planets[3] || chartA.planets[0]).longitude,
    (chartB.planets.find(p => p.id === 'Venus') || chartB.planets[3] || chartB.planets[0]).longitude
  );
  const compVenusPos = degreeToSignAndPos(compVenusLon);

  const compMarsLon = calculateMidpointLongitude(
    (chartA.planets.find(p => p.id === 'Mars') || chartA.planets[4] || chartA.planets[0]).longitude,
    (chartB.planets.find(p => p.id === 'Mars') || chartB.planets[4] || chartB.planets[0]).longitude
  );
  const compMarsPos = degreeToSignAndPos(compMarsLon);

  const compJupiterLon = calculateMidpointLongitude(
    (chartA.planets.find(p => p.id === 'Jupiter') || chartA.planets[5] || chartA.planets[0]).longitude,
    (chartB.planets.find(p => p.id === 'Jupiter') || chartB.planets[5] || chartB.planets[0]).longitude
  );
  const compJupiterPos = degreeToSignAndPos(compJupiterLon);

  const compSaturnLon = calculateMidpointLongitude(
    (chartA.planets.find(p => p.id === 'Saturn') || chartA.planets[6] || chartA.planets[0]).longitude,
    (chartB.planets.find(p => p.id === 'Saturn') || chartB.planets[6] || chartB.planets[0]).longitude
  );
  const compSaturnPos = degreeToSignAndPos(compSaturnLon);

  const composite: CompositeChartResult = {
    sun: {
      id: 'sun',
      name: 'Komposit-Sonne',
      symbol: '☉',
      longitude: compSunLon,
      degreeString: compSunPos.degreeString,
      sign: compSunPos.sign,
      color: '#f59e0b',
      interpretation: `Das gemeinsame Herzstück eurer Partnerschaft leuchtet im Zeichen ${compSunPos.sign.name}. Ihr strahlt als Paar am stärksten, wenn ihr gemeinsame Werte von ${compSunPos.sign.element}-Qualität verwirklicht.`
    },
    moon: {
      id: 'moon',
      name: 'Komposit-Mond',
      symbol: '☽',
      longitude: compMoonLon,
      degreeString: compMoonPos.degreeString,
      sign: compMoonPos.sign,
      color: '#cbd5e1',
      interpretation: `Euer Beziehungs-Gefühlskern schwingt in ${compMoonPos.sign.name}. Hier findet ihr emotionale Geborgenheit und stilles Verständnis ohne viele Worte.`
    },
    ascendant: {
      id: 'ascendant',
      name: 'Komposit-Aszendent',
      symbol: '↑',
      longitude: compAcLon,
      degreeString: compAcPos.degreeString,
      sign: compAcPos.sign,
      color: '#06b6d4',
      interpretation: `Wie die Außenwelt euch als Paar wahrnimmt: Aszendent ${compAcPos.sign.name} verleiht eurer Beziehung eine einladende, inspirierende Aura.`
    },
    midheaven: {
      id: 'midheaven',
      name: 'Komposit-MC',
      symbol: '❖',
      longitude: compMcLon,
      degreeString: compMcPos.degreeString,
      sign: compMcPos.sign,
      color: '#a855f7',
      interpretation: `Euer gemeinsames Lebensziel (MC in ${compMcPos.sign.name}): Ihr seid dazu berufen, gemeinsam etwas Dauerhaftes und Bereicherndes zu erschaffen.`
    },
    venus: {
      id: 'venus',
      name: 'Komposit-Venus',
      symbol: '♀',
      longitude: compVenusLon,
      degreeString: compVenusPos.degreeString,
      sign: compVenusPos.sign,
      color: '#ec4899',
      interpretation: getCompositeVenusInterpretation(compVenusPos.sign)
    },
    mars: {
      id: 'mars',
      name: 'Komposit-Mars',
      symbol: '♂',
      longitude: compMarsLon,
      degreeString: compMarsPos.degreeString,
      sign: compMarsPos.sign,
      color: '#ef4444',
      interpretation: getCompositeMarsInterpretation(compMarsPos.sign)
    },
    jupiter: {
      id: 'jupiter',
      name: 'Komposit-Jupiter',
      symbol: '♃',
      longitude: compJupiterLon,
      degreeString: compJupiterPos.degreeString,
      sign: compJupiterPos.sign,
      color: '#fbbf24',
      interpretation: getCompositeJupiterInterpretation(compJupiterPos.sign)
    },
    saturn: {
      id: 'saturn',
      name: 'Komposit-Saturn',
      symbol: '♄',
      longitude: compSaturnLon,
      degreeString: compSaturnPos.degreeString,
      sign: compSaturnPos.sign,
      color: '#e2e8f0',
      interpretation: getCompositeSaturnInterpretation(compSaturnPos.sign)
    },
    sharedSoulPurpose: `Als Paar vereint ihr das Licht von ${chartA.synthesis.sun.planet.sign.name} und ${chartB.synthesis.sun.planet.sign.name} zu einer kraftvollen Komposit-Sonne in ${compSunPos.sign.name}. Ihr seid gemeinsam stärker als die Summe eurer Einzelteile.`,
    relationshipMotto: calculateDynamicRelationshipMotto(compSunPos.sign, compMoonPos.sign),
    pairGemstone: calculateDynamicPairGemstone(compSunPos.sign, compVenusPos.sign)
  };

  // Numerology Pair Calculation
  const lpA = chartA.numerology.lifePath.number;
  const lpB = chartB.numerology.lifePath.number;
  let lpSum = lpA + lpB;
  while (lpSum > 9 && lpSum !== 11 && lpSum !== 22 && lpSum !== 33) {
    lpSum = lpSum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
  }

  const numerologySynergy = {
    lifePathSum: lpSum,
    lifePathArchetype: `Schwingungs-Zahl ${lpSum} (Gemeinsamer Beziehungs-Pfad)`,
    harmonyDescription: `Die Kombination aus Lebensweg ${lpA} (${nameA}) und Lebensweg ${lpB} (${nameB}) schwingt auf der Meisterfrequenz ${lpSum}. Diese Zahl fordert und fördert konstruktives Miteinander und gemeinsame Meilensteine.`,
    affirmation: `„Wir ehren die Einzigartigkeit des anderen und wachsen täglich an unserer gemeinsamen Liebe.“`
  };

  return {
    personA: {
      name: nameA,
      sunSign: chartA.synthesis.sun.planet.sign.name,
      moonSign: chartA.synthesis.moon.planet.sign.name,
      ascendantSign: chartA.housesResult.angles.ascendant.sign.name,
      lifePath: lpA
    },
    personB: {
      name: nameB,
      sunSign: chartB.synthesis.sun.planet.sign.name,
      moonSign: chartB.synthesis.moon.planet.sign.name,
      ascendantSign: chartB.housesResult.angles.ascendant.sign.name,
      lifePath: lpB
    },
    scores: {
      overallScore: overall,
      archetype,
      tagline,
      emotionalHarmony: {
        score: emoScore,
        level: emoScore >= 85 ? 'Höchste Herzensresonanz' : emoScore >= 70 ? 'Harmonisch & Nährend' : 'Wachstumsorientiert',
        description: emoScore >= 85
          ? 'Gefühle fließen ungehindert; ihr versteht die emotionale Sprache des anderen intuitiv.'
          : 'Gute emotionale Basis, die durch ehrliche Gespräche vertieft wird.'
      },
      passionAndChemistry: {
        score: passScore,
        level: passScore >= 85 ? 'Elektrisierende Anziehung' : passScore >= 70 ? 'Warme Leidenschaft' : 'Sanfte Vertrautheit',
        description: passScore >= 85
          ? 'Starke körperliche und energetische Faszination; intensive Funken im Alltag.'
          : 'Ausgewogene Balance zwischen Anziehung und verlässlicher Ruhe.'
      },
      mindAndCommunication: {
        score: mindScore,
        level: mindScore >= 85 ? 'Telepathische Verständigung' : mindScore >= 70 ? 'Klarer Gedankenaustausch' : 'Ergänzende Sichtweisen',
        description: mindScore >= 85
          ? 'Ihr beendet die Sätze des anderen; gemeinsame Ideen sprudeln mühelos.'
          : 'Konstruktive Dialoge und inspirierender Meinungsaustausch.'
      },
      karmicBondAndStability: {
        score: karmScore,
        level: karmScore >= 85 ? 'Uralter Seelenvertrag' : karmScore >= 70 ? 'Treue & Feste Wurzeln' : 'Offener Entwicklungsraum',
        description: karmScore >= 85
          ? 'Diese Begegnung war vorherbestimmt; ihr tragt ein tiefes Gefühl von „Heimkommen“ in euch.'
          : 'Verlässliche Stabilität mit Raum für individuelle Freiheit.'
      }
    },
    aspects: aspects.sort((a, b) => a.orb - b.orb),
    composite,
    numerologySynergy
  };
}

function buildSynastryAspect(
  pA: EnrichedPlanet,
  pB: EnrichedPlanet,
  type: SynastryAspect['aspectType'],
  aspectName: string,
  symbol: string,
  orb: number,
  color: string,
  nature: SynastryAspect['nature'],
  nameA: string,
  nameB: string
): SynastryAspect {
  let category: SynastryAspect['category'] = 'mind';

  if (pA.id === 'sun' || pA.id === 'moon' || pB.id === 'sun' || pB.id === 'moon' || pA.id === 'venus' || pB.id === 'venus') {
    if ((pA.id === 'venus' && pB.id === 'mars') || (pA.id === 'mars' && pB.id === 'venus') || (pA.id === 'lilith' || pB.id === 'lilith')) {
      category = 'passion';
    } else {
      category = 'emotion';
    }
  }
  if (pA.id === 'mercury' || pB.id === 'mercury' || pA.id === 'jupiter' || pB.id === 'jupiter') {
    category = 'mind';
  }
  if (pA.id === 'saturn' || pB.id === 'saturn' || pA.id === 'northNode' || pB.id === 'northNode' || pA.id === 'chiron' || pB.id === 'chiron') {
    category = 'karma';
  }

  const headline = `${pA.name} (${nameA}) ${symbol} ${pB.name} (${nameB})`;
  const esotericMeaning = `${pA.name} in ${pA.sign.name} trifft auf ${pB.name} in ${pB.sign.name}. Diese Schwingung erzeugt einen ${nature === 'harmonious' ? 'harmonisch fließenden' : nature === 'magnetic' ? 'magnetisch anziehenden' : 'dynamisch aktivierenden'} Kraftstrom.`;
  const birkenbihlTip = `Achte darauf, wie ihr im Alltag auf die Impulse dieser Planeten reagiert: Schafft Raum für Wertschätzung statt vorschneller Interpretation.`;

  return {
    planetA: pA,
    planetB: pB,
    aspectType: type,
    aspectName,
    symbol,
    orb,
    exactAngle: Math.round(pA.longitude - pB.longitude),
    nature,
    category,
    color,
    headline,
    esotericMeaning,
    birkenbihlTip
  };
}

// 2. Family Matrix Calculation (3+ Profiles)
export function calculateFamilyMatrix(charts: CompleteNatalChart[]): FamilyMatrixResult {
  if (charts.length === 0) {
    return {
      memberCount: 0,
      members: [],
      elementBalance: { fire: 25, earth: 25, air: 25, water: 25, dominantElement: 'Ausgeglichen', missingOrWeakElement: 'Keines' },
      familyDynamicHeadline: 'Keine Profile ausgewählt',
      familyKarmaLesson: 'Füge Profile hinzu, um die Familien-Karmamatrix zu berechnen.',
      birkenbihlCommunicationCode: 'Verständnis beginnt mit aufmerksamem Zuhören.',
      familySoulMotto: 'Familie ist der geschützte Hafen der Seele.'
    };
  }

  let fireCount = 0;
  let earthCount = 0;
  let airCount = 0;
  let waterCount = 0;

  const members: FamilyMemberRole[] = charts.map((c, idx) => {
    const sunEl = c.synthesis.sun.planet.sign.element;
    const moonEl = c.synthesis.moon.planet.sign.element;

    if (sunEl === 'Feuer') fireCount += 2;
    else if (sunEl === 'Erde') earthCount += 2;
    else if (sunEl === 'Luft') airCount += 2;
    else if (sunEl === 'Wasser') waterCount += 2;

    if (moonEl === 'Feuer') fireCount += 1;
    else if (moonEl === 'Erde') earthCount += 1;
    else if (moonEl === 'Luft') airCount += 1;
    else if (moonEl === 'Wasser') waterCount += 1;

    let soulRoleTitle = 'Der intuitive Seelen-Vermittler';
    let roleIcon = '🕊️';
    let giftToFamily = 'Bringt Einfühlungsvermögen und Herzenswärme in die Gruppe.';
    let growthTrigger = 'Lernt gesunde emotionale Grenzen zu setzen.';

    if (sunEl === 'Feuer') {
      soulRoleTitle = 'Der visionäre Impulsgeber & Mutmacher';
      roleIcon = '🔥';
      giftToFamily = 'Begeistert die Familie für neue Abenteuer und schenkt Optimismus.';
      growthTrigger = 'Geduld üben, wenn andere mehr Bedenkzeit brauchen.';
    } else if (sunEl === 'Erde') {
      soulRoleTitle = 'Der verlässliche Fels in der Brandung';
      roleIcon = '🏔️';
      giftToFamily = 'Schenkt Struktur, Geborgenheit, Sicherheit und irdische Fürsorge.';
      growthTrigger = 'Flexibel bleiben bei spontanen Planänderungen.';
    } else if (sunEl === 'Luft') {
      soulRoleTitle = 'Der ideenreiche Brückenbauer & Denker';
      roleIcon = '🌬️';
      giftToFamily = 'Löst Konflikte mit logischer Klarheit und bringt Humor & Leichtigkeit.';
      growthTrigger = 'Gefühle nicht nur analysieren, sondern voll durchfühlen.';
    }

    return {
      name: c.input.name || `Mitglied ${idx + 1}`,
      sunSign: c.synthesis.sun.planet.sign.name,
      moonSign: c.synthesis.moon.planet.sign.name,
      ascendantSign: c.housesResult.angles.ascendant.sign.name,
      element: sunEl,
      soulRoleTitle,
      roleIcon,
      giftToFamily,
      growthTrigger
    };
  });

  const totalPoints = fireCount + earthCount + airCount + waterCount || 1;
  const firePct = Math.round((fireCount / totalPoints) * 100);
  const earthPct = Math.round((earthCount / totalPoints) * 100);
  const airPct = Math.round((airCount / totalPoints) * 100);
  const waterPct = Math.round((waterCount / totalPoints) * 100);

  const elementsArray = [
    { name: 'Feuer', pct: firePct },
    { name: 'Erde', pct: earthPct },
    { name: 'Luft', pct: airPct },
    { name: 'Wasser', pct: waterPct }
  ].sort((a, b) => b.pct - a.pct);

  const dominant = elementsArray[0].name;
  const missing = elementsArray[elementsArray.length - 1].name;

  return {
    memberCount: charts.length,
    members,
    elementBalance: {
      fire: firePct,
      earth: earthPct,
      air: airPct,
      water: waterPct,
      dominantElement: `${dominant} (${elementsArray[0].pct}%)`,
      missingOrWeakElement: `${missing} (${elementsArray[elementsArray.length - 1].pct}%)`
    },
    familyDynamicHeadline: `Dominantes Familienfeld: ${dominant}-Energie`,
    familyKarmaLesson: `Die Familie reift daran, das fehlende Element (${missing}) bewusst durch gemeinsame Rituale, Naturerlebnisse und offene Kommunikation zu nähren.`,
    birkenbihlCommunicationCode: `Birkenbihl-Schlüssel: Verbindet Vorwissen (was jedes Familienmitglied von Natur aus braucht) mit gehirngerechten Vereinbarungen statt starrer Regeln.`,
    familySoulMotto: `„Gemeinsam sind wir ein unerschütterlicher Kreis aus Licht, Liebe und beständigem Zusammenhalt.“`
  };
}
