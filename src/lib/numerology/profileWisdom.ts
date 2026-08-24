import type { CompleteNatalChart } from '../astrology/engine';
import type { MoonCalendarDayInfo } from '../astrology/moonCalendar';

export interface PersonalProfileWisdom {
  grandSoulMotto: {
    title: string;
    motto: string;
    subline: string;
    essence: string;
    astrologicalFormula: string;
  };
  dailySoulMantra: {
    dateString: string;
    mantra: string;
    encouragement: string;
    focusWord: string;
    affirmation: string;
  };
  threePillarsWisdom: {
    loveAndHeart: {
      motto: string;
      deepInsight: string;
      ruleOfLife: string;
    };
    vocationAndMastery: {
      motto: string;
      deepInsight: string;
      ruleOfLife: string;
    };
    innerPeaceAndHealing: {
      motto: string;
      deepInsight: string;
      ruleOfLife: string;
    };
  };
  karmicEvolutionWisdom: {
    dragonPathMotto: string;
    courageBooster: string;
  };
}

export function generateProfileWisdom(
  chart: CompleteNatalChart,
  moonCal: MoonCalendarDayInfo
): PersonalProfileWisdom {
  const sunSign = chart.synthesis.sun.planet.sign.name;
  const moonSign = chart.synthesis.moon.planet.sign.name;
  const ascSign = chart.housesResult.angles.ascendant.sign.name;
  const mcSign = chart.housesResult.angles.midheaven.sign.name;
  const lifePath = chart.numerology.lifePath.number;
  const lifePathArchetype = chart.numerology.lifePath.archetype;
  const userName = chart.input.name || 'Edle Seele';

  // 1. Generate Grand Soul Motto (Synthesis of Sun, Moon, AC, Life Path)
  const SUN_SOUL_ESSENCES: Record<string, string> = {
    aries: 'dem unbändigen Mut des Neubeginns',
    taurus: 'der unerschütterlichen Kraft irdischer Fülle',
    gemini: 'der brillanten Leichtigkeit des Geistes',
    cancer: 'der tiefen Weisheit des nährenden Herzens',
    leo: 'der königlichen Großmut reinen Schöpferfeuers',
    virgo: 'der heilenden Klarheit vollkommener Hingabe',
    libra: 'dem göttlichen Sinn für Harmonie und Wahrheit',
    scorpio: 'der schamanischen Schöpferkraft tiefster Wandlung',
    sagittarius: 'dem weiten Blick kosmischer Erkenntnis',
    capricorn: 'der meisterhaften Souveränität bleibender Werke',
    aquarius: 'der visionären Freiheit des neuen Zeitalters',
    pisces: 'der grenzenlosen Liebe universellen Mitgefühls'
  };

  const sunSignId = chart.synthesis.sun.planet.sign.id;
  const sunEssence = SUN_SOUL_ESSENCES[sunSignId] || 'schöpferischer Kraft';

  const grandSoulMottoText = `„Ich bin das Licht von ${sunSign}, das in der Geborgenheit von ${moonSign} ruht, durch das Tor von ${ascSign} kraftvoll in die Welt tritt und als ${lifePathArchetype} (Lebensweg ${lifePath}) sein unverwechselbares Meisterwerk erschafft.“`;

  const grandSoulMotto = {
    title: `Der Ewige Seelenanker von ${userName}`,
    motto: grandSoulMottoText,
    subline: `Deine ewige kosmische Signatur aus ☉ ${sunSign} • ☽ ${moonSign} • ↑ ${ascSign} • 🔢 Lebensweg ${lifePath}`,
    essence: `Du wurdest geboren, um die Welt mit ${sunEssence} zu bereichern. Deine Lebensaufgabe besteht nicht darin, dich anzupassen, sondern dein angeborenes kosmisches Erbe furchtlos und liebevoll zu verkörpern.`,
    astrologicalFormula: `☉ ${sunSign} + ☽ ${moonSign} + ↑ ${ascSign} ➔ Lebensweg ${lifePath} (${lifePathArchetype})`
  };

  // 2. Daily Soul Mantra & Encouragement (Tagesleitsatz abgestimmt auf aktuellen Mond)
  const todayMoonSign = moonCal.moonSign.name;
  const todayElement = moonCal.element;
  const todayPhase = moonCal.moonPhaseName;

  let dailyMantraText = '';
  let dailyEncouragement = '';
  let focusWord = 'KLARHEIT';

  if (todayElement === 'Feuer') {
    dailyMantraText = `„Heute entfache ich mein inneres Feuer: Ich gehe mutig den nächsten Schritt und vertraue meiner Schöpferkraft.“`;
    dailyEncouragement = `Der Mond in ${todayMoonSign} (Feuertag) schenkt dir dynamischen Rückenwind. Lass dich heute von keinem Zweifel bremsen; handle aus der Begeisterung deines Herzens.`;
    focusWord = 'MUT & TATKRAFT';
  } else if (todayElement === 'Erde') {
    dailyMantraText = `„Ich bin tief im Hier und Jetzt verwurzelt: Was ich heute mit Ruhe und Hingabe tue, trägt reiche Früchte.“`;
    dailyEncouragement = `Der Mond in ${todayMoonSign} (Erdtag) erdet dein Energiefeld. Ideal, um Ideen in feste Strukturen zu gießen und dir deiner wahren Werte bewusst zu werden.`;
    focusWord = 'STABILITÄT & FÜLLE';
  } else if (todayElement === 'Luft') {
    dailyMantraText = `„Mein Geist ist weit und frei: Ich öffne mich für frische Inspiration, freudigen Austausch und neue Horizonte.“`;
    dailyEncouragement = `Der Mond in ${todayMoonSign} (Lufttag) befreit von mentaler Schwere. Führe heute inspirierende Gespräche und vertraue deinen spontanen Geistesblitzen.`;
    focusWord = 'LEICHTIGKEIT & WEITBLICK';
  } else {
    dailyMantraText = `„Ich lausche der leisen Stimme meiner Intuition: In der Stille meines Herzens empfange ich alle Antworten.“`;
    dailyEncouragement = `Der Mond in ${todayMoonSign} (Wassertag) vertieft deine Feinfühligkeit. Nähre heute deine Seele, schütze deine Grenzen und gönne dir bewusste Momente der Einkehr.`;
    focusWord = 'SEELENFRIEDEN & INTUITION';
  }

  const dailySoulMantra = {
    dateString: moonCal.dateString,
    mantra: dailyMantraText,
    encouragement: dailyEncouragement,
    focusWord,
    affirmation: `„Ich ehre den Rhythmus des Kosmos (${todayPhase}, Mond in ${todayMoonSign}). Alles geschieht zu meinem höchsten Wohl.“`
  };

  // 3. Three Pillars Life Wisdom Maxims
  const threePillarsWisdom = {
    loveAndHeart: {
      motto: `„Wahre Liebe verlangt keine Selbstaufgabe, sondern die Feier zweier vollständiger Seelen.“`,
      deepInsight: `Mit deinem Mond in ${moonSign} blüht dein Herz auf, wenn du emotionale Sicherheit mit authentischer Wahrhaftigkeit verbindest. Suche Partner, die dein Licht nicht dimmen, sondern spiegeln.`,
      ruleOfLife: `Liebe dich selbst zuerst so tief, wie du es dir von der Welt ersehnst. Alles andere folgt als natürliches Echo.`
    },
    vocationAndMastery: {
      motto: `„Dein wahrer Beruf ist nicht das, was du tust, um zu überleben, sondern das, was du erschaffst, um die Welt zu erleuchten.“`,
      deepInsight: `Dein Medium Coeli in ${mcSign} und deine Lebenswegzahl ${lifePath} fordern dich auf, gesellschaftliche Meisterschaft zu erringen. Deine Gabe ist ein Geschenk an das Kollektiv.`,
      ruleOfLife: `Konzentriere dich auf Meisterschaft statt auf schnellen Beifall. Beständige Qualität ist unantastbar.`
    },
    innerPeaceAndHealing: {
      motto: `„Deine Seelenwunde ist kein Makel, sondern das Tor, durch das dein größtes Heilungslicht in die Welt strömt.“`,
      deepInsight: `Die Position von Chiron in ${chart.synthesis.chiron.planet.sign.name} zeigt: Wo du einst Schmerz empfunden hast, wirst du heute zum Heiler, Mentor und Zufluchtsort für andere Suchende.`,
      ruleOfLife: `Schließe Frieden mit deiner Geschichte. Jeder Umweg war eine Initiation in deine heutige Seelenweisheit.`
    }
  };

  const karmicEvolutionWisdom = {
    dragonPathMotto: `„Verlasse die verstaubte Gemütlichkeit der Vergangenheit und wage den Sprung in deine Zukunft (${chart.synthesis.northNode.deutung.title}).“`,
    courageBooster: `Dein Nordknoten in ${chart.synthesis.northNode.planet.sign.name} verspricht: Immer wenn du Angst vor dem nächsten Entwicklungsschritt spürst, ist genau dort dein größtes Seelenwachstum verborgen!`
  };

  return {
    grandSoulMotto,
    dailySoulMantra,
    threePillarsWisdom,
    karmicEvolutionWisdom
  };
}
