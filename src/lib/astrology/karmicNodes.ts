import { degreeToSignAndPos, determineHouse } from './ephemeris';
import type { ZodiacSign } from './constants';
import type { HouseCalculationResult } from './houses';

export interface CalculatedSpecialPoint {
  id: string;
  name: string;
  symbol: string;
  longitude: number;
  sign: ZodiacSign;
  degreeInSign: number;
  degreeString: string;
  house: number;
  type: 'karmic_node' | 'fortune' | 'vertex' | 'shadow_healing';
  color: string;
  themeTitle: string;
  potentialDescription: string;
  lifeChallengeDescription: string;
  actionRecommendation: string;
}

export interface KarmicNodesMatrix {
  northNode: CalculatedSpecialPoint;
  southNode: CalculatedSpecialPoint;
  partOfFortune: CalculatedSpecialPoint;
  vertex: CalculatedSpecialPoint;
  antiVertex: CalculatedSpecialPoint;
  chiron: CalculatedSpecialPoint;
  lilith: CalculatedSpecialPoint;
  thematicHighlights: {
    category: string;
    badge: string;
    color: string;
    pointsInvolved: string[];
    headline: string;
    coreInsight: string;
    practicalAction: string;
  }[];
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function normalizeDegree(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// Calculate Vertex (Schicksalstor)
export function calculateVertex(
  ramcDeg: number,
  geoLatitude: number,
  obliquityDeg: number,
  houseCusps: number[]
): { vertex: CalculatedSpecialPoint; antiVertex: CalculatedSpecialPoint } {
  const ramcVx = normalizeDegree(ramcDeg + 180) * DEG2RAD;
  const coLat = (90 - geoLatitude) * DEG2RAD;
  const epsRad = obliquityDeg * DEG2RAD;

  const Y = Math.cos(ramcVx);
  const X = -Math.sin(ramcVx) * Math.cos(epsRad) - Math.tan(coLat) * Math.sin(epsRad);
  let vxLon = normalizeDegree(Math.atan2(Y, X) * RAD2DEG);
  let antiVxLon = normalizeDegree(vxLon + 180);

  const vxPos = degreeToSignAndPos(vxLon);
  const antiPos = degreeToSignAndPos(antiVxLon);

  const vxHouse = houseCusps.length === 12 ? determineHouse(vxLon, houseCusps) : 5;
  const antiHouse = houseCusps.length === 12 ? determineHouse(antiVxLon, houseCusps) : 11;

  const vertex: CalculatedSpecialPoint = {
    id: 'Vertex',
    name: 'Vertex (Das Schicksalstor)',
    symbol: 'Vx',
    longitude: vxLon,
    sign: vxPos.sign,
    degreeInSign: vxPos.degreeInSign,
    degreeString: vxPos.degreeString,
    house: vxHouse,
    type: 'vertex',
    color: '#a855f7',
    themeTitle: `Schicksalhafte Wendepunkte & Seelenverabredungen in ${vxPos.sign.name} (${vxHouse}. Haus)`,
    potentialDescription: `Der Vertex markiert den Punkt magischer Synchronizitäten und schicksalhafter Begegnungen. In ${vxPos.sign.name} wirst du durch unvorhergesehene Lebensereignisse genau dorthin geführt, wo deine Seele wachsen muss.`,
    lifeChallengeDescription: `Ereignisse fühlen sich oft größer an als der eigene Wille – die Herausforderung ist, die kosmische Führung anzunehmen statt sich ängstlich zu widersetzen.`,
    actionRecommendation: `Achte besonders auf Menschen und Gelegenheiten, die plötzlich in dein Leben treten; sie tragen wichtige Einweihungsschlüssel für deinen Weg in sich.`
  };

  const antiVertex: CalculatedSpecialPoint = {
    id: 'AntiVertex',
    name: 'Antivertex (Der innere Auslöser)',
    symbol: 'AVx',
    longitude: antiVxLon,
    sign: antiPos.sign,
    degreeInSign: antiPos.degreeInSign,
    degreeString: antiPos.degreeString,
    house: antiHouse,
    type: 'vertex',
    color: '#8b5cf6',
    themeTitle: `Die innere Reife in ${antiPos.sign.name} (${antiHouse}. Haus)`,
    potentialDescription: `Die bewusste Motivation und die innere Haltung, die nötig ist, um die schicksalhaften Tore des Vertex zu durchschreiten.`,
    lifeChallengeDescription: `Alte Verhaltensmuster in ${antiPos.sign.name} zu verfeinern und eigenverantwortlich zu leben.`,
    actionRecommendation: `Handle aus deiner inneren Mitte, bevor das Leben durch äußere Umstände Korrekturen erzwingt.`
  };

  return { vertex, antiVertex };
}

// Calculate Part of Fortune (Glückspunkt / Pars Fortunae)
export function calculatePartOfFortune(
  ascendantDeg: number,
  sunDeg: number,
  moonDeg: number,
  sunHouse: number,
  houseCusps: number[]
): CalculatedSpecialPoint {
  // Day chart if Sun is in houses 7..12 (above horizon)
  const isDayChart = sunHouse >= 7 && sunHouse <= 12;
  let fortuneLon = isDayChart
    ? normalizeDegree(ascendantDeg + moonDeg - sunDeg)
    : normalizeDegree(ascendantDeg + sunDeg - moonDeg);

  const pos = degreeToSignAndPos(fortuneLon);
  const house = houseCusps.length === 12 ? determineHouse(fortuneLon, houseCusps) : 9;

  return {
    id: 'Fortune',
    name: 'Glückspunkt (Pars Fortunae)',
    symbol: '⊕',
    longitude: fortuneLon,
    sign: pos.sign,
    degreeInSign: pos.degreeInSign,
    degreeString: pos.degreeString,
    house,
    type: 'fortune',
    color: '#fbbf24',
    themeTitle: `Tor zu wahrer Lebensfülle & Seelenblüte in ${pos.sign.name} (${house}. Haus)`,
    potentialDescription: `Der Glückspunkt ist der harmonische Schnittpunkt aus Körper (AC), Geist (☉) und Seele (☽). In ${pos.sign.name} im ${house}. Haus fließt dir das Glück am leichtesten zu, wenn du die Qualitäten von ${pos.sign.name} (${pos.sign.keywords.slice(0, 2).join(', ')}) authentisch verkörperst.`,
    lifeChallengeDescription: `Glück nicht im rastlosen Jagen nach äußeren Statussymbolen suchen, sondern im Auskosten der eigenen Seelenfreude.`,
    actionRecommendation: `Widme dich regelmäßig Aktivitäten im ${house}. Haus – hier liegt deine Quelle natürlicher Regeneration und irdischer Fülle.`
  };
}

// Master Function to Generate all Nodal / Focal Points and Themes
export function generateKarmicNodesMatrix(
  housesResult: HouseCalculationResult,
  sunDeg: number,
  sunHouse: number,
  moonDeg: number,
  nodeDeg: number,
  chironDeg: number,
  lilithDeg: number,
  geoLatitude: number,
  obliquityDeg: number,
  ramcDeg: number
): KarmicNodesMatrix {
  const cusps = housesResult.cusps;
  const ascDeg = housesResult.angles.ascendant.longitude;

  // 1. Nodes (Rahu & Ketu)
  const northPos = degreeToSignAndPos(nodeDeg);
  const southLon = normalizeDegree(nodeDeg + 180);
  const southPos = degreeToSignAndPos(southLon);
  const northHouse = cusps.length === 12 ? determineHouse(nodeDeg, cusps) : 5;
  const southHouse = cusps.length === 12 ? determineHouse(southLon, cusps) : 11;

  const northNode: CalculatedSpecialPoint = {
    id: 'NorthNode',
    name: 'Nördlicher Mondknoten (Rahu)',
    symbol: '☊',
    longitude: nodeDeg,
    sign: northPos.sign,
    degreeInSign: northPos.degreeInSign,
    degreeString: northPos.degreeString,
    house: northHouse,
    type: 'karmic_node',
    color: '#facc15',
    themeTitle: `Evolutionärer Seelenauftrag in ${northPos.sign.name} (${northHouse}. Haus)`,
    potentialDescription: `Das große unberührte Wachstumspotenzial deiner Seele: Hier liegt deine Zukunft, deine größte Meisterschaft und der Quantensprung deines Bewusstseins.`,
    lifeChallengeDescription: `Angst vor dem Neuland und der Widerstand, die gewohnten Routinen der Vergangenheit loszulassen.`,
    actionRecommendation: `Übe dich bewusst in den Tugenden von ${northPos.sign.name} (${northPos.sign.keywords.join(', ')}). Jeder Schritt in dieses Feld wird vom Kosmos reich belohnt.`
  };

  const southNode: CalculatedSpecialPoint = {
    id: 'SouthNode',
    name: 'Südlicher Mondknoten (Ketu)',
    symbol: '☋',
    longitude: southLon,
    sign: southPos.sign,
    degreeInSign: southPos.degreeInSign,
    degreeString: southPos.degreeString,
    house: southHouse,
    type: 'karmic_node',
    color: '#f87171',
    themeTitle: `Karmische Herkunft & Altes Muster in ${southPos.sign.name} (${southHouse}. Haus)`,
    potentialDescription: `Mitgebrachte Meisterschaft, unbewusste Instinkte und Fähigkeiten aus vergangenen Zyklen.`,
    lifeChallengeDescription: `Falle der Stagnation: Das Verharren in alten Überlebensmustern, Bequemlichkeit oder emotionaler Abhängigkeit in ${southPos.sign.name}.`,
    actionRecommendation: `Nutze die positiven Talente von ${southPos.sign.name} als Werkzeug, aber richte dein Ziel unerschütterlich auf den Nordknoten aus!`
  };

  // 2. Vertex & AntiVertex
  const { vertex, antiVertex } = calculateVertex(ramcDeg, geoLatitude, obliquityDeg, cusps);

  // 3. Part of Fortune
  const partOfFortune = calculatePartOfFortune(ascDeg, sunDeg, moonDeg, sunHouse, cusps);

  // 4. Chiron (Wounded Healer)
  const chironPos = degreeToSignAndPos(chironDeg);
  const chironHouse = cusps.length === 12 ? determineHouse(chironDeg, cusps) : 11;
  const chiron: CalculatedSpecialPoint = {
    id: 'Chiron',
    name: 'Chiron (Der Heilschlüssel)',
    symbol: '⚷',
    longitude: chironDeg,
    sign: chironPos.sign,
    degreeInSign: chironPos.degreeInSign,
    degreeString: chironPos.degreeString,
    house: chironHouse,
    type: 'shadow_healing',
    color: '#10b981',
    themeTitle: `Die Urwunde als Tor zur Heilkraft in ${chironPos.sign.name} (${chironHouse}. Haus)`,
    potentialDescription: `Die tiefste seelische Verletzlichkeit wandelt sich bei bewusster Annahme in deine stärkste empathische Weisheit und Begabung für andere.`,
    lifeChallengeDescription: `Gefühl der Unzulänglichkeit oder existentiellen Zurückweisung im Bereich von ${chironPos.sign.name}.`,
    actionRecommendation: `Höre auf, gegen den Schmerz anzukämpfen – halte ihn mit Mitgefühl und werde zum weisen Wegweiser für Mitmenschen.`
  };

  // 5. Lilith (Black Moon)
  const lilithPos = degreeToSignAndPos(lilithDeg);
  const lilithHouse = cusps.length === 12 ? determineHouse(lilithDeg, cusps) : 5;
  const lilith: CalculatedSpecialPoint = {
    id: 'Lilith',
    name: 'Lilith (Der Schwarze Mond)',
    symbol: '⚸',
    longitude: lilithDeg,
    sign: lilithPos.sign,
    degreeInSign: lilithPos.degreeInSign,
    degreeString: lilithPos.degreeString,
    house: lilithHouse,
    type: 'shadow_healing',
    color: '#ec4899',
    themeTitle: `Unbezähmbare Seelen-Autonomie in ${lilithPos.sign.name} (${lilithHouse}. Haus)`,
    potentialDescription: `Radikale Wahrhaftigkeit, Ur-Instinkte, Ablehnung fauler Kompromisse und absolute spirituelle Freiheit.`,
    lifeChallengeDescription: `Verdrängung oder Wut über gesellschaftliche Tabus und das Gefühl, wegen der eigenen Authentizität verstoßen zu werden.`,
    actionRecommendation: `Integriere deine wilde, ursprüngliche Kraft ohne Scham: Sei unbestechlich du selbst!`
  };

  // Thematic Highlights
  const thematicHighlights = [
    {
      category: 'Karmisches Wachstum',
      badge: 'Lebensaufgabe',
      color: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      pointsInvolved: ['☊ Nordknoten', '☋ Südknoten'],
      headline: `Vom vertrauten ${southPos.sign.name}-Muster zur ${northPos.sign.name}-Meisterschaft`,
      coreInsight: `Deine Seele löst alte Anhaftungen im ${southHouse}. Haus auf, um im ${northHouse}. Haus schöpferische Autonomie und neue Führungsqualitäten zu erlangen.`,
      practicalAction: `Wähle bei Zweifeln immer den Weg, der den Werten von ${northPos.sign.name} entspricht – auch wenn es Mut erfordert!`
    },
    {
      category: 'Schicksal & Synchronizität',
      badge: 'Schicksalstor',
      color: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      pointsInvolved: ['Vx Vertex', 'AVx Antivertex'],
      headline: `Schicksalhafte Weichenstellungen durch ${vertex.sign.name}`,
      coreInsight: `Wichtige Lebenswenden ereignen sich im ${vertex.house}. Haus. Begegnungen in diesem Feld tragen das Siegel seelischer Bestimmung.`,
      practicalAction: `Vertraue unvorhergesehenen Impulsen und halte dein Herz für plötzliche Lebenswendungen offen.`
    },
    {
      category: 'Irdische Fülle & Erfüllung',
      badge: 'Glücksquelle',
      color: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
      pointsInvolved: ['⊕ Glückspunkt'],
      headline: `Die Entfaltung von ${partOfFortune.sign.name} im ${partOfFortune.house}. Haus`,
      coreInsight: `Wahre Zufriedenheit und materieller wie seelischer Wohlstand blühen auf, wenn du die Tugenden von ${partOfFortune.sign.name} im Alltag verankerst.`,
      practicalAction: `Gestalte dein Wirken im ${partOfFortune.house}. Haus mit Freude, Geduld und kompromissloser Qualität.`
    },
    {
      category: 'Heilung & Schattenalchemie',
      badge: 'Ur-Heilung',
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      pointsInvolved: ['⚷ Chiron', '⚸ Lilith'],
      headline: `Heilungsportal: ${chiron.sign.name}-Urwunde & ${lilith.sign.name}-Urkraft`,
      coreInsight: `Deine größte seelische Verletzlichkeit (${chiron.sign.name}) und deine ungezähmte Kraft (${lilith.sign.name}) bilden zusammen das stärkste Transformationszentrum deines Charts.`,
      practicalAction: `Erkenne: Du musst nicht fehlerfrei sein, um wertvoll zu sein. Deine Authentizität ist deine stärkste Medizin.`
    }
  ];

  return {
    northNode,
    southNode,
    partOfFortune,
    vertex,
    antiVertex,
    chiron,
    lilith,
    thematicHighlights
  };
}
