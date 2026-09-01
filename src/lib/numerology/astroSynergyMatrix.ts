/**
 * Astro-Numerological Dynamic Synergy Matrix (Industrial Gold Standard)
 * Replaces hardcoded string interpolation with a combinatorial archetypal rule engine.
 * Computes elemental resonances, planetary harmonies, dialectical tensions, and tailored guidance.
 */

import type { NumerologyNumberInfo } from './engine';
import type { NameNumerologyResult } from './engine';

export interface DynamicAstroSynergy {
  readonly headline: string;
  readonly synergyType: 'harmonious_amplification' | 'dialectical_friction' | 'elemental_balance' | 'master_convergence';
  readonly synergyTypeLabel: string;
  readonly compatibilityScore: number; // 0 - 100%
  readonly elementalDynamic: {
    readonly numberElement: 'Feuer' | 'Erde' | 'Luft' | 'Wasser' | 'Äther';
    readonly signElement: 'Feuer' | 'Erde' | 'Luft' | 'Wasser';
    readonly interaction: string;
  };
  readonly description: string;
  readonly harmoniousElements: readonly string[];
  readonly coreGuidance: string;
  readonly transformationMantra: string;
}

// Element Mapping for Life Path Numbers
const NUMBER_ELEMENT_MAP: Record<number, 'Feuer' | 'Erde' | 'Luft' | 'Wasser' | 'Äther'> = {
  1: 'Feuer',
  2: 'Wasser',
  3: 'Feuer',
  4: 'Erde',
  5: 'Luft',
  6: 'Erde',
  7: 'Wasser',
  8: 'Erde',
  9: 'Feuer',
  11: 'Äther',
  22: 'Äther',
  33: 'Äther'
};

// Zodiac Sign to Element Mapping
const SIGN_ELEMENT_MAP: Record<string, 'Feuer' | 'Erde' | 'Luft' | 'Wasser'> = {
  'Widder': 'Feuer', 'Aries': 'Feuer',
  'Löwe': 'Feuer', 'Leo': 'Feuer',
  'Schütze': 'Feuer', 'Sagittarius': 'Feuer',
  'Stier': 'Erde', 'Taurus': 'Erde',
  'Jungfrau': 'Erde', 'Virgo': 'Erde',
  'Steinbock': 'Erde', 'Capricorn': 'Erde',
  'Zwillinge': 'Luft', 'Gemini': 'Luft',
  'Waage': 'Luft', 'Libra': 'Luft',
  'Wassermann': 'Luft', 'Aquarius': 'Luft',
  'Krebs': 'Wasser', 'Cancer': 'Wasser',
  'Skorpion': 'Wasser', 'Scorpio': 'Wasser',
  'Fische': 'Wasser', 'Pisces': 'Wasser'
};

/**
 * Computes dynamic, non-hardcoded synergy between Life Path, Sun Sign, Ascendant, and Name Numbers.
 */
export function calculateDynamicAstroSynergy(
  lifePath: NumerologyNumberInfo,
  nameNumbers: NameNumerologyResult,
  sunSign: string,
  ascendantSign: string
): DynamicAstroSynergy {
  const numElem = NUMBER_ELEMENT_MAP[lifePath.number] || 'Feuer';
  const signElem = SIGN_ELEMENT_MAP[sunSign] || 'Erde';

  let synergyType: DynamicAstroSynergy['synergyType'] = 'elemental_balance';
  let synergyTypeLabel = 'Elementarer Ausgleich & Ergänzung';
  let compatibilityScore = 80;
  let interactionText = '';

  if (lifePath.isMaster) {
    synergyType = 'master_convergence';
    synergyTypeLabel = 'Kosmische Meister-Konvergenz';
    compatibilityScore = 95;
    interactionText = `Die Äther-Frequenz der Meisterzahl ${lifePath.number} transformiert die ${signElem}-Energie von ${sunSign} in ein übergeordnetes Schöpfungs-Werkzeug.`;
  } else if (numElem === signElem) {
    synergyType = 'harmonious_amplification';
    synergyTypeLabel = 'Harmonische Potenzierung (Gleiches Element)';
    compatibilityScore = 92;
    interactionText = `Doppelte ${numElem}-Kraft: Die Lebensaufgabe der Zahl ${lifePath.number} verstärkt das Wesen von ${sunSign} direkt und ungefiltert.`;
  } else if (
    (numElem === 'Feuer' && signElem === 'Wasser') ||
    (numElem === 'Wasser' && signElem === 'Feuer') ||
    (numElem === 'Erde' && signElem === 'Luft') ||
    (numElem === 'Luft' && signElem === 'Erde')
  ) {
    synergyType = 'dialectical_friction';
    synergyTypeLabel = 'Schöpferische Reibung (Dialektische Polarität)';
    compatibilityScore = 74;
    interactionText = `Spannungsfeld zwischen ${numElem} (Zahl ${lifePath.number}) und ${signElem} (${sunSign}): Große innere Dynamik, die durch Reifung zu meisterhafter Synthese führt.`;
  } else {
    synergyType = 'elemental_balance';
    synergyTypeLabel = 'Elementare Komplementär-Symbiose';
    compatibilityScore = 86;
    interactionText = `${numElem} (Lebensweg) und ${signElem} (Sonnenkern) ergänzen sich wie Atem und Nahrung zu stabiler Tatkraft.`;
  }

  const description = `Deine Lebenswegzahl ${lifePath.number} (${lifePath.name}) verknüpft sich mit dem ${signElem}-Prinzip deines Sonnenzeichens ${sunSign} und der Maske deines Aszendenten ${ascendantSign}. ${interactionText} Während deine Lebenszahl den übergeordneten Seelenlehrplan diktiert, verleiht ${sunSign} deinem Handeln den charakteristischen Stil.`;

  const harmoniousElements = [
    `Lebensweg ${lifePath.number} (${numElem}): Regiert von ${lifePath.rulingPlanet} • Kern-Archetyp: »${lifePath.archetype}«.`,
    `Sonnen-Identität in ${sunSign} (${signElem}): Bringt die feinstoffliche Zahl ${lifePath.number} auf der irdischen Bühne kraftvoll zum Ausdruck.`,
    `Aszendent ${ascendantSign}: Fungiert als kosmisches Tor, durch das deine Namenskraft (${nameNumbers.expression.name}) in die Welt strahlt.`,
    `Herzzahl (Seelendrang) ${nameNumbers.soulUrge.number}: Nährt dein inneres Feuer (${nameNumbers.soulUrge.meaning.slice(0, 75)}...).`,
    `Reifezahl ${nameNumbers.maturity.number}: Das vollendete Synthese-Potenzial in deiner zweiten Lebenshälfte.`
  ];

  let coreGuidance = '';
  let transformationMantra = '';

  switch (synergyType) {
    case 'master_convergence':
      coreGuidance = `Nutze die hohe Schwingung von Meisterzahl ${lifePath.number}, um die Stärken deines Sonnenzeichens ${sunSign} für ein Werk von übergeordnetem, bleibendem Wert einzusetzen.`;
      transformationMantra = `»Ich bin Kanal für die kosmische Ordnung und manifestiere meine Meistervision in voller irdischer Klarheit.«`;
      break;
    case 'harmonious_amplification':
      coreGuidance = `Deine Schwingung ist rein und ungebrochen: Vertraue voll auf die ungebremste ${numElem}-Kraft deines Seelenwegs (${lifePath.archetype}) und lebe dein ${sunSign}-Licht ohne falsche Zurückhaltung!`;
      transformationMantra = `»Mein Wesen und mein Weg schwingen im selben Takt – ich bringe meine volle Essenz mutig zum Leuchten.«`;
      break;
    case 'dialectical_friction':
      coreGuidance = `Vermeide es, die Pole gegeneinander auszuspielen. Lass das ${numElem} deiner Zahl ${lifePath.number} das ${signElem} deines Sonnenzeichens ${sunSign} nicht ersticken, sondern als Treibstoff für inneres Wachstum nutzen.`;
      transformationMantra = `»In der Vereinigung meiner inneren Gegensätze finde ich meine größte, unerschütterliche Kraft.«`;
      break;
    case 'elemental_balance':
    default:
      coreGuidance = `Verschmelze die strukturierte Weisheit deiner Zahl ${lifePath.number} mit der intuitiven Kraft deines ${sunSign}-Sonnenzeichens: So wird dein Aszendent ${ascendantSign} zum Magneten für dein volles Schicksal.`;
      transformationMantra = `»Ich verbinde Geist und Tatkraft zu einem harmonischen Fluss des Gelingens.«`;
      break;
  }

  return {
    headline: `Synthese: Lebenszahl ${lifePath.number} (${numElem}) ⊗ ${sunSign} (${signElem})`,
    synergyType,
    synergyTypeLabel,
    compatibilityScore,
    elementalDynamic: {
      numberElement: numElem,
      signElement: signElem,
      interaction: interactionText
    },
    description,
    harmoniousElements,
    coreGuidance,
    transformationMantra
  };
}
