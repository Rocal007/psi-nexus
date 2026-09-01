export interface NumerologyNumberInfo {
  number: number;
  isMaster: boolean;
  name: string;
  archetype: string;
  rulingPlanet: string;
  zodiacResonance: string;
  meaning: string;
  soulMission: string;
  shadow: string;
  dailyGift: string;
}

export const NUMEROLOGY_MEANINGS: Record<number, NumerologyNumberInfo> = {
  1: {
    number: 1,
    isMaster: false,
    name: 'Die Urschöpferkraft (Der Pionier)',
    archetype: 'Der Schöpfer & Anführer',
    rulingPlanet: 'Sonne (☉)',
    zodiacResonance: 'Widder / Löwe',
    meaning: 'Unabhängigkeit, Führungsstärke, Innovation, Pioniergeist und unbändige Selbstbehauptung.',
    soulMission: 'Den Mut aufbringen, neue Wege zu ebnen, eigenständig voranzugehen und die eigene Schöpferkraft als Vorbild zu leben.',
    shadow: 'Egozentrik, Dominanzstreben, Ungeduld und die Furcht vor Abhängigkeit.',
    dailyGift: 'Entscheidungsfreude und die Fähigkeit, aus dem Nichts neue Impulse zu gebären.'
  },
  2: {
    number: 2,
    isMaster: false,
    name: 'Die Urharmonie (Der Vermittler)',
    archetype: 'Der Diplomat & Seelenpartner',
    rulingPlanet: 'Mond (☽)',
    zodiacResonance: 'Krebs / Waage',
    meaning: 'Empathie, Kooperation, Feinfühligkeit, Harmonie und das feine Gespür für Zwischenmenschliches.',
    soulMission: 'Brücken zwischen Gegensätzen bauen, Frieden stiften und die heilende Kraft von Geduld und Fürsorge verkörpern.',
    shadow: 'Überanpassung, Konfliktangst, Selbstaufgabe und emotionale Überempfindlichkeit.',
    dailyGift: 'Tiefes intuitives Zuhören und die Kunst, andere Menschen in ihrer Essenz zu sehen.'
  },
  3: {
    number: 3,
    isMaster: false,
    name: 'Der Ausdruck & die Freude (Der Schöpfer)',
    archetype: 'Der Künstler & Bote',
    rulingPlanet: 'Jupiter (♃)',
    zodiacResonance: 'Zwillinge / Schütze',
    meaning: 'Kreativität, Optimismus, Wortgewandtheit, Lebensfreude und schöpferische Selbstentfaltung.',
    soulMission: 'Die Welt mit Inspiration, Humor und Wahrheit zu erhellen; Gedanken in lebendige Kunst und Sprache verwandeln.',
    shadow: 'Zersplitterung, Oberflächlichkeit, Drama-Sucht und das Flüchten vor tiefen Gefühlen.',
    dailyGift: 'Ansteckende Lebensbegeisterung und die Gabe, komplexe Dinge freudvoll zu vermitteln.'
  },
  4: {
    number: 4,
    isMaster: false,
    name: 'Das Fundament & die Ordnung (Der Baumeister)',
    archetype: 'Der Verankerer & Hüter',
    rulingPlanet: 'Erde / Saturn (♄)',
    zodiacResonance: 'Stier / Steinbock / Jungfrau',
    meaning: 'Stabilität, Disziplin, Verlässlichkeit, Gründlichkeit und handfeste Manifestation in der irdischen Realität.',
    soulMission: 'Dauerhafte Werte schaffen, tragfähige Fundamente bauen und das Geistige in greifbare Struktur bringen.',
    shadow: 'Sturheit, Kälte, Kontrollzwang und Angst vor unvorhersehbaren Veränderungen.',
    dailyGift: 'Unerschütterliche Ausdauer und meisterhafte Präzision bei der Verwirklichung großer Pläne.'
  },
  5: {
    number: 5,
    isMaster: false,
    name: 'Die Freiheit & der Wandel (Der Abenteurer)',
    archetype: 'Der Freiheitsbote & Alchemist',
    rulingPlanet: 'Merkur (☿)',
    zodiacResonance: 'Zwillinge / Wassermann',
    meaning: 'Flexibilität, Vielseitigkeit, Freiheitsdrang, Neugier und die magnetische Freude an Veränderung.',
    soulMission: 'Grenzen sprengen, Dogmen hinterfragen, Erfahrungen sammeln und Menschen zur Freiheit inspirieren.',
    shadow: 'Rastlosigkeit, Unverbindlichkeit, Flucht in Süchte und Angst vor tiefer Bindung.',
    dailyGift: 'Blitzschnelle Anpassungsgabe und magnetische Anziehungskraft in neuen Situationen.'
  },
  6: {
    number: 6,
    isMaster: false,
    name: 'Die Herzensliebe & Fürsorge (Der Heiler)',
    archetype: 'Der Hüter der Familie & Ästhet',
    rulingPlanet: 'Venus (♀)',
    zodiacResonance: 'Stier / Waage / Krebs',
    meaning: 'Bedingungslose Liebe, Fürsorge, Harmoniebedürfnis, Schönheit und seelische Verantwortung.',
    soulMission: 'Einen geschützten Raum der Heilung, Geborgenheit und ästhetischen Schönheit für andere erschaffen.',
    shadow: 'Einmischung unter dem Deckmantel der Fürsorge, Märtyrertum und Perfektionszwang.',
    dailyGift: 'Wärmende Herzenspräsenz und die natürliche Fähigkeit, Räume zu harmonisieren.'
  },
  7: {
    number: 7,
    isMaster: false,
    name: 'Die Weisheit & die Mystik (Der Denker)',
    archetype: 'Der spirituelle Forscher & Einsiedler',
    rulingPlanet: 'Neptun (♆) / Uranus (♅)',
    zodiacResonance: 'Jungfrau / Skorpion / Fische',
    meaning: 'Tiefgründigkeit, Spiritualität, Analyse, Intuition, Wahrheitssuche und meditative Stille.',
    soulMission: 'Hinter die Schleier der Illusion blicken, die verborgenen kosmischen Gesetze erforschen und wahre Weisheit lehren.',
    shadow: 'Zynismus, unnahbare Kälte, Isolation, Hochmut und Angst vor emotionaler Nähe.',
    dailyGift: 'Messerscharfer Verstand gepaart mit tiefgreifender mystischer Einsicht.'
  },
  8: {
    number: 8,
    isMaster: false,
    name: 'Die Macht & die Fülle (Der Meister)',
    archetype: 'Der Souverän & Stratege',
    rulingPlanet: 'Saturn (♄) / Pluto (♇)',
    zodiacResonance: 'Skorpion / Steinbock',
    meaning: 'Finanzielle & geistige Meisterschaft, Souveränität, Effizienz, Gerechtigkeit und Karma-Ausgleich.',
    soulMission: 'Verantwortung für große Ressourcen übernehmen und materielle Macht in den Dienst des Gemeinwohls stellen.',
    shadow: 'Materialismus, Machtmissbrauch, Gier und die unbewusste Angst vor Ohnmacht.',
    dailyGift: 'Großes strategisches Geschick und die Fähigkeit, immense Energien erfolgreich zu leiten.'
  },
  9: {
    number: 9,
    isMaster: false,
    name: 'Die Vollendung & das Mitgefühl (Der Weise)',
    archetype: 'Der Weltbürger & Humanist',
    rulingPlanet: 'Mars (♂) / Neptun (♆)',
    zodiacResonance: 'Schütze / Fische',
    meaning: 'Universelle Liebe, Weisheit, Selbstlosigkeit, Loslassen, Transformation und kosmische Weite.',
    soulMission: 'Alte Zyklen vollenden, Vorurteile auflösen und die Menschheit an die bedingungslose Einheit allen Lebens erinnern.',
    shadow: 'Märtyrerkomplex, Bitterkeit über die Grausamkeit der Welt und Realitätsflucht.',
    dailyGift: 'Umfassendes Mitgefühl, Charisma und die Kunst des heilsamen Loslassens.'
  },
  11: {
    number: 11,
    isMaster: true,
    name: 'Die Meisterzahl der Intuition (Der Erleuchtete)',
    archetype: 'Der spirituelle Bote & Visionär',
    rulingPlanet: 'Uranus (♅) / Mond (☽)',
    zodiacResonance: 'Wassermann / Skorpion',
    meaning: 'Hochsensitive Wahrnehmung, visionäre Eingebungen, Kanal für höhere Weisheit und energetische Leuchtkraft.',
    soulMission: 'Als spiritueller Katalysator wirken und Menschen durch reine Lichtfrequenzen und Wahrheit aufrütteln.',
    shadow: 'Nervöse Überreizung, Selbstzweifel und das Gefühl, von den eigenen Visionen überwältigt zu werden.',
    dailyGift: 'Hellwissen, revolutionäre Geistesblitze und magnetische spirituelle Anziehung.'
  },
  22: {
    number: 22,
    isMaster: true,
    name: 'Die Meisterzahl des Manifestierens (Der Meister-Baumeister)',
    archetype: 'Der kosmische Architekt',
    rulingPlanet: 'Pluto (♇) / Erde',
    zodiacResonance: 'Steinbock / Stier',
    meaning: 'Die Verbindung aus höchster geistiger Vision und meisterhafter irdischer Umsetzungskraft.',
    soulMission: 'Große, weltverändernde Projekte und Systeme errichten, die Generationen überdauern und der Menschheit dienen.',
    shadow: 'Vernichtender Leistungsdruck, Furcht vor dem Scheitern auf großer Bühne.',
    dailyGift: 'Die unbegrenzte Kraft, utopische Visionen in reale, funktionierende Institutionen zu verwandeln.'
  },
  33: {
    number: 33,
    isMaster: true,
    name: 'Die Meisterzahl des Christus-Bewusstseins (Der Meister-Lehrer)',
    archetype: 'Der heilsame Erlöser & Weltenlehrer',
    rulingPlanet: 'Neptun (♆) / Venus (♀)',
    zodiacResonance: 'Fische / Krebs / Löwe',
    meaning: 'Reine bedingungslose Liebe, höchste Dienstbereitschaft, spirituelles Heilen und allumfassende Hingabe.',
    soulMission: 'Die Erhebung des menschlichen Bewusstseins durch gelebte Herzensgüte und heilsame Weisheit.',
    shadow: 'Komplette Aufopferung bis zum physischen Kollaps; Heiland-Komplex.',
    dailyGift: 'Die Frequenz reiner göttlicher Liebe, die andere Menschen augenblicklich heilt und beruhigt.'
  }
};

// Pythagorean letter value table
const PYTHAGOREAN_TABLE: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y', 'Ä', 'Ö', 'Ü']);

function normalizeText(text: string): string {
  return text
    .toUpperCase()
    .replace(/Ä/g, 'AE')
    .replace(/Ö/g, 'OE')
    .replace(/Ü/g, 'UE')
    .replace(/ß/g, 'SS')
    .replace(/[^A-Z]/g, '');
}

export function reduceToNumerology(num: number, allowMaster = true): number {
  if (allowMaster && (num === 11 || num === 22 || num === 33)) {
    return num;
  }
  if (num <= 9) return num;

  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }

  if (allowMaster && (sum === 11 || sum === 22 || sum === 33)) {
    return sum;
  }
  return sum > 9 ? reduceToNumerology(sum, allowMaster) : sum;
}

export function calculateLifePathNumber(birthDate: string): NumerologyNumberInfo {
  // YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const reducedDay = reduceToNumerology(day, true);
  const reducedMonth = reduceToNumerology(month, true);
  const reducedYear = reduceToNumerology(year, true);

  const total = reducedDay + reducedMonth + reducedYear;
  const lifePath = reduceToNumerology(total, true);

  return NUMEROLOGY_MEANINGS[lifePath] || NUMEROLOGY_MEANINGS[1];
}

export function calculateBirthdayNumber(birthDate: string): { day: number; reduced: number; info: NumerologyNumberInfo } {
  const dayStr = birthDate.split('-')[2];
  const day = parseInt(dayStr, 10);
  const reduced = reduceToNumerology(day, true);
  return {
    day,
    reduced,
    info: NUMEROLOGY_MEANINGS[reduced] || NUMEROLOGY_MEANINGS[1]
  };
}

export interface LetterVibration {
  char: string;
  value: number;
  isVowel: boolean;
  typeLabel: string;
}

export interface DominantNameGift {
  digit: number;
  count: number;
  meaning: string;
}

export interface KarmicNameLesson {
  digit: number;
  name: string;
  advice: string;
}

export interface NameSynergyCheck {
  harmonyScore: number;
  relationType: string;
  explanation: string;
  affirmation: string;
}

export interface NameNumerologyResult {
  rawName: string;
  letters: LetterVibration[];
  expression: NumerologyNumberInfo; // Namenszahl (all letters)
  soulUrge: NumerologyNumberInfo;   // Herzzahl / Seelendrang (vowels)
  personality: NumerologyNumberInfo;// Persönlichkeitszahl (consonants)
  maturity: NumerologyNumberInfo;   // Reifezahl (LifePath + Expression)
  dominantGifts: DominantNameGift[];
  karmicLessons: KarmicNameLesson[];
  nameSynergy: NameSynergyCheck;
}

const KARMIC_LESSON_INFO: Record<number, { name: string; advice: string }> = {
  1: { name: 'Eigenständigkeit & Mut', advice: 'Lerne, dir selbst bedingungslos zu vertrauen und Initiative zu ergreifen, ohne auf Bestätigung von außen zu warten.' },
  2: { name: 'Geduld & Diplomatie', advice: 'Entwickle Feingefühl im Miteinander, lerne zuzuhören und vermeide vorschnelle Urteile bei emotionalen Spannungen.' },
  3: { name: 'Selbstausdruck & Freude', advice: 'Traue dich, deine Gefühle, Gedanken und Kreativität offen zu teilen, ohne Angst vor Kritik zu haben.' },
  4: { name: 'Struktur & Ausdauer', advice: 'Schaffe Ordnung in deinem Alltag, baue verlässliche Routinen auf und vollende begonnene Vorhaben diszipliniert.' },
  5: { name: 'Freiheit & Flexibilität', advice: 'Lerne, Veränderungen als willkommene Impulse zu begrüßen und dich aus starren Gewohnheiten zu befreien.' },
  6: { name: 'Verantwortung & Herzenswärme', advice: 'Pflege harmonische Beziehungen, ohne dich selbst aufzuopfern oder die Lasten anderer ungefragt zu tragen.' },
  7: { name: 'Spiritualität & Vertrauen', advice: 'Nimm dir Zeit für Stille und Meditation; vertraue deiner inneren Weisheit über den reinen Verstand hinaus.' },
  8: { name: 'Souveränität & Fülle', advice: 'Erkenne deinen irdischen Selbstwert; lerne, materiellen Erfolg und ethische Integrität in Einklang zu bringen.' },
  9: { name: 'Mitgefühl & Loslassen', advice: 'Übe Vergebung und loslassende Hingabe; öffne dein Herz für das Wohl des großen Ganzen.' }
};

export function calculateNameNumerology(fullName: string, lifePathNum: number): NameNumerologyResult {
  const clean = normalizeText(fullName);

  if (!clean || clean.length === 0) {
    const defaultExpr = NUMEROLOGY_MEANINGS[1];
    const defaultSoul = NUMEROLOGY_MEANINGS[1];
    const defaultPers = NUMEROLOGY_MEANINGS[1];
    const defaultMat = NUMEROLOGY_MEANINGS[reduceToNumerology(lifePathNum + 1, true)];

    return {
      rawName: fullName || 'Seelen-Reisende(r)',
      letters: [],
      expression: defaultExpr,
      soulUrge: defaultSoul,
      personality: defaultPers,
      maturity: defaultMat,
      dominantGifts: [],
      karmicLessons: [],
      nameSynergy: {
        harmonyScore: 85,
        relationType: 'Gleichklang der Seelenkräfte',
        explanation: 'Dein Name resoniert kraftvoll mit deinem übergeordneten Lebensweg.',
        affirmation: 'Ich ehre meine angeborene Schwingung und wandle meinen Namen in lebendige Tatkraft.'
      }
    };
  }

  let totalSum = 0;
  let vowelSum = 0;
  let consonantSum = 0;
  const letters: LetterVibration[] = [];
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const val = PYTHAGOREAN_TABLE[char] || 0;
    const isVowel = VOWELS.has(char);
    totalSum += val;

    if (val >= 1 && val <= 9) {
      digitCounts[val] = (digitCounts[val] || 0) + 1;
    }

    if (isVowel) {
      vowelSum += val;
    } else {
      consonantSum += val;
    }

    letters.push({
      char,
      value: val,
      isVowel,
      typeLabel: isVowel ? 'Herzzahl (Seele)' : 'Persönlichkeit (Aura)'
    });
  }

  const exprNum = reduceToNumerology(totalSum, true);
  const soulNum = reduceToNumerology(vowelSum, true);
  const persNum = reduceToNumerology(consonantSum, true);
  const matNum = reduceToNumerology(lifePathNum + exprNum, true);

  // Calculate Dominant Gifts (Counts >= 3 or top frequencies)
  const sortedDigits = Object.entries(digitCounts)
    .map(([d, c]) => ({ digit: parseInt(d, 10), count: c }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count);

  const maxCount = sortedDigits[0]?.count || 0;
  const dominantGifts: DominantNameGift[] = sortedDigits
    .filter(item => item.count >= Math.max(2, maxCount - 1))
    .slice(0, 3)
    .map(item => ({
      digit: item.digit,
      count: item.count,
      meaning: NUMEROLOGY_MEANINGS[item.digit]?.dailyGift || 'Verstärkte Schwingungsfrequenz im Namen.'
    }));

  // Calculate Karmic Lessons (Digits with count === 0)
  const karmicLessons: KarmicNameLesson[] = Object.entries(digitCounts)
    .filter(([_, count]) => count === 0)
    .map(([d]) => {
      const digit = parseInt(d, 10);
      const info = KARMIC_LESSON_INFO[digit] || { name: `Lektion ${digit}`, advice: 'Seelenwachstum durch bewusste Übung.' };
      return {
        digit,
        name: info.name,
        advice: info.advice
      };
    })
    .slice(0, 3);

  // Calculate Name Synergy with Life Path
  const isDirectMatch = exprNum === lifePathNum || soulNum === lifePathNum;
  const isComplementary = Math.abs(exprNum - lifePathNum) % 2 === 0;
  const harmonyScore = isDirectMatch ? 98 : (isComplementary ? 92 : 86);
  
  let relationType = 'Vollkommener Seelen-Gleichklang';
  let explanation = `Deine Namenszahl ${exprNum} (${NUMEROLOGY_MEANINGS[exprNum]?.archetype}) verstärkt die Mission deiner Lebenswegzahl ${lifePathNum} unmittelbar. Du drückst im Außen exakt das aus, wozu deine Seele inkarniert ist.`;

  if (!isDirectMatch) {
    if (isComplementary) {
      relationType = 'Komplementäre Seelen-Balance';
      explanation = `Dein Name (${exprNum}) schenkt dir wertvolle Werkzeuge, die deinen Geburts-Lebensweg (${lifePathNum}) harmonisch ergänzen und erden.`;
    } else {
      relationType = 'Dynamischer Entwicklungs-Katalysator';
      explanation = `Zwischen deinem Namen (${exprNum}) und deinem Lebensweg (${lifePathNum}) entsteht eine produktive Reibungsenergie, die dich zu ständigem Wachstum und Vielseitigkeit antreibt.`;
    }
  }

  const affirmation = `„Mit der Schwingung meines Namens (${fullName}) aktiviere ich meine Gaben als ${NUMEROLOGY_MEANINGS[exprNum]?.archetype} und wandle meine Lebensaufgabe in sichtbaren Erfolg.“`;

  return {
    rawName: fullName,
    letters,
    expression: NUMEROLOGY_MEANINGS[exprNum] || NUMEROLOGY_MEANINGS[1],
    soulUrge: NUMEROLOGY_MEANINGS[soulNum] || NUMEROLOGY_MEANINGS[1],
    personality: NUMEROLOGY_MEANINGS[persNum] || NUMEROLOGY_MEANINGS[1],
    maturity: NUMEROLOGY_MEANINGS[matNum] || NUMEROLOGY_MEANINGS[1],
    dominantGifts,
    karmicLessons,
    nameSynergy: {
      harmonyScore,
      relationType,
      explanation,
      affirmation
    }
  };
}

import { calculateDynamicAstroSynergy, type DynamicAstroSynergy } from './astroSynergyMatrix';

export interface CompleteNumerologyProfile {
  fullName: string;
  lifePath: NumerologyNumberInfo;
  birthday: { day: number; reduced: number; info: NumerologyNumberInfo };
  nameNumbers: NameNumerologyResult;
  astroSynergy: DynamicAstroSynergy;
}

export function generateCompleteNumerology(
  fullName: string,
  birthDate: string,
  sunSign: string,
  ascendantSign: string
): CompleteNumerologyProfile {
  const lifePath = calculateLifePathNumber(birthDate);
  const birthday = calculateBirthdayNumber(birthDate);
  const nameNumbers = calculateNameNumerology(fullName, lifePath.number);
  const astroSynergy = calculateDynamicAstroSynergy(lifePath, nameNumbers, sunSign, ascendantSign);

  return {
    fullName: fullName || 'Seelen-Reisende(r)',
    lifePath,
    birthday,
    nameNumbers,
    astroSynergy
  };
}
