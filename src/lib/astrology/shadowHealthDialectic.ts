// Psychosomatic Astrology & Positive Dialectic Shadow Transformation Engine
// Compliant with C.G. Jung Analytical Psychology, Astrological Anatomy & Vera F. Birkenbihl Neurodidactics
import type { CompleteNatalChart } from './engine';

export interface HealthShadowChallenge {
  id: string;
  category: 'addiction' | 'anxiety' | 'nutrition' | 'stress' | 'vitality';
  categoryLabel: string;
  categoryIcon: string;
  categoryColor: string;
  aspectTrigger: string;
  title: string;
  shadowDescription: string;
  psychosomaticOrgan: string;
  positiveDialectic: {
    hiddenGift: string;
    transformationPrinciple: string;
    actionProtocol: string[];
    neurodidacticMantra: string;
    healingElement: string;
  };
}

export interface OrganAnatomyItem {
  zodiacSign: string;
  bodyRegion: string;
  potentialWeakness: string;
  holisticStrengthening: string;
  symbolicMeaning: string;
}

export interface ShadowHealthAnalysis {
  challenges: HealthShadowChallenge[];
  organAnatomy: OrganAnatomyItem[];
  primaryVulnerability: string;
  overallDialecticGuidance: string;
}

// Classical Astrological Anatomy (Klassische Astromedizinische Organ-Zuordnungen)
export const ZODIAC_ORGAN_MAP: Record<string, { body: string; weakness: string; remedy: string; meaning: string }> = {
  aries: {
    body: 'Kopf, Gehirn, Augen, Schädelknochen & Nebennieren',
    weakness: 'Spannungskopfschmerz, Migräne, Entzündungen, Überreizung, Zähneknirschen (Bruxismus).',
    remedy: 'Kopfhautmassagen, Magnesium, regelmäßige Ausdauerpausen, Reizreduktion am Abend.',
    meaning: 'Impulsivität, ungeduldiger Durchsetzungswille, Wutstau oder ungelebte Schöpferkraft.'
  },
  taurus: {
    body: 'Hals, Schilddrüse, Kehlkopf, Stimmbänder & Nacken',
    weakness: 'Nackenverspannungen, Schilddrüsendysbalance, Heiserkeit, Schluckbeschwerden, Trägheit.',
    remedy: 'Singen, Summen (Vagusnerv-Aktivierung), Wärmeanwendungen, sanftes Dehnen, Ingwer.',
    meaning: 'Festhalten an Altem, Angst vor materiellem Verlust, unausgesprochene Bedürfnisse.'
  },
  gemini: {
    body: 'Lunge, Bronchien, Schultern, Arme, Hände & Nervensystem',
    weakness: 'Flache Atmung, nervöse Unruhe, Bronchialreizungen, Karpaltunnelsyndrom, Schlaflosigkeit.',
    remedy: 'Tiefe Pranayama-Atemübungen, digitale Entgiftungstage, Melissen- & Lavendeltee.',
    meaning: 'Gedankenkarussell, mentale Reizüberflutung, mangelnde Erdung durch ständiges Multitasking.'
  },
  cancer: {
    body: 'Magen, Schleimhäute, Brust, Leber/Galle-Reflexe & Verdauungssäfte',
    weakness: 'Magenbrennen, Reizmagen, emotionales Essen, Völlegefühl, hormonelle Schwankungen.',
    remedy: 'Warme, bekömmliche Mahlzeiten (Suppen, Hafer), Kamille, emotionale Tagebuchführung.',
    meaning: 'Unverarbeitete Kränkungen, emotionale Schutzpanzer, Bedürfnis nach Geborgenheit.'
  },
  leo: {
    body: 'Herz, Kreislauf, Brustwirbelsäule & Aorta',
    weakness: 'Blutdruckschwankungen, Herzklopfen bei Stress, Haltungsschäden im oberen Rücken.',
    remedy: 'Herzkreislauf-Ausdauersport im aeroben Bereich, Weißdorn, bewusstes Loslassen von Leistungsdruck.',
    meaning: 'Überforderung durch Perfektionismus, gekränkter Stolz, Angst vor Kontrollverlust.'
  },
  virgo: {
    body: 'Dünndarm, Mikrobiom, Milz, vegetative Bauch-Nerven & Stoffwechsel',
    weakness: 'Reizdarmsyndrom, Nahrungsmittelunverträglichkeiten, Perfektions-Stress, Hypochondrie.',
    remedy: 'Probiotika, Bitterstoffe (Artischocke, Löwenzahn), feste Essenszeiten, Achtsamkeitspraxis.',
    meaning: 'Übermäßige Selbstkritik, Kontrollzwang über Details, Sorgen um die Zukunft.'
  },
  libra: {
    body: 'Nieren, Nebennieren, Lendenwirbelsäule & Hautstoffwechsel',
    weakness: 'Nierensteine, trockene Haut, hormonelle Dysbalance, Lendenwirbelschmerzen.',
    remedy: 'Ausreichend reines Quellwasser trinken, Goldruten-Tee, ausgewogene Nährstoffe, basische Bäder.',
    meaning: 'Harmoniesucht, Unterdrückung eigener Konflikte, Angst vor Abweisung in Partnerschaften.'
  },
  scorpio: {
    body: 'Fortpflanzungsorgane, Ausscheidungsorgane, Dickdarm & Beckenboden',
    weakness: 'Chronische Unterleibsbeschwerden, Hämorrhoiden, hormonelle Stauungen, Toxinspeicher.',
    remedy: 'Beckenbodengymnastik, Entgiftungskuren (Mariendistel), Vergebungsrituale, Saunagänge.',
    meaning: 'Festhalten an Groll, Kontrollbedürfnis, emotionale Fixierung, unverarbeitete Traumata.'
  },
  sagittarius: {
    body: 'Leber, Galle, Hüften, Oberschenkel & Ischiasnerv',
    weakness: 'Fettleber, Stoffwechselüberlastung durch Völlerei, Hüftdysplasie, Ischiasreizung.',
    remedy: 'Intervallfasten, Bitterkräuter, Ausdauersport (Wandern, Reiten), Reduktion von Zucker/Alkohol.',
    meaning: 'Grenzenlosigkeit, Übertreibung, Realitätsflucht durch Genusssucht oder Dogmatismus.'
  },
  capricorn: {
    body: 'Skelett, Knochen, Zähne, Knie, Gelenke & Hautbarriere',
    weakness: 'Arthrose, Knieschmerzen, Karies, Hautekzeme, chronische Muskelverspannungen.',
    remedy: 'Vitamin D3/K2, Calcium/Magnesium, Kälteanwendungen, Yoga für Gelenke, Entlastungstage.',
    meaning: 'Übermäßige Härte gegen sich selbst, chronische Pflichtüberlastung, Angst vor Versagen.'
  },
  aquarius: {
    body: 'Unterschenkel, Waden, Knöchel, peripheres Nervensystem & Venen',
    weakness: 'Wadenkrämpfe, Krampfadern, Restless-Legs-Syndrom, nervöse Erschöpfung.',
    remedy: 'Wechselduschen, Beine hochlagern, Magnesium, Ausdauertraining, Erdungsrituale im Freien.',
    meaning: 'Getrenntheit von Gefühlen, übermäßige Abstraktion, Reizüberflutung durch Technik.'
  },
  pisces: {
    body: 'Füße, Zehen, Lymphsystem, Zirbeldrüse & Immunsystem',
    weakness: 'Ödeme, schwaches Immunsystem, Infektanfälligkeit, Fußschmerzen, Schlafsucht/Schlaflosigkeit.',
    remedy: 'Fußreflexzonenmassage, Lymphdrainage, Sonnenlicht am Morgen, Stärkung der seelischen Abgrenzung.',
    meaning: 'Übermäßige Durchlässigkeit für Fremdenergien, Flucht in Illusionen oder Betäubungsmittel.'
  }
};

export function analyzeShadowHealthDialectic(chart: CompleteNatalChart): ShadowHealthAnalysis {
  const { planets, aspects, synthesis } = chart;
  const challenges: HealthShadowChallenge[] = [];

  const sunSign = synthesis.sun.planet.sign.id;
  const moonSign = synthesis.moon.planet.sign.id;
  const ascSign = chart.housesResult.angles.ascendant.sign.id;

  const neptune = planets.find(p => p.id === 'Neptune');
  const saturn = planets.find(p => p.id === 'Saturn');
  const pluto = planets.find(p => p.id === 'Pluto');
  const mars = planets.find(p => p.id === 'Mars');
  const moon = planets.find(p => p.id === 'Moon');
  const uranus = planets.find(p => p.id === 'Uranus');
  const chiron = planets.find(p => p.id === 'Chiron');
  const lilith = planets.find(p => p.id === 'Lilith');

  // 1. Check for Addiction / Escapism / Substance Patterns (Neptun / Mond / 12. Haus / Fische)
  const neptuneHardAspects = aspects.filter(a => 
    (a.planet1.id === 'Neptune' || a.planet2.id === 'Neptune') && 
    ['square', 'opposition', 'conjunction'].includes(a.aspectType)
  );

  if (neptuneHardAspects.length > 0 || moonSign === 'pisces' || sunSign === 'pisces') {
    challenges.push({
      id: 'shadow_escapism',
      category: 'addiction',
      categoryLabel: 'Sucht- & Fluchtmuster',
      categoryIcon: '🍷',
      categoryColor: 'from-purple-500 to-indigo-600 border-purple-500/40 text-purple-300',
      aspectTrigger: neptuneHardAspects.length > 0 
        ? `${neptuneHardAspects[0].planet1.name} ${neptuneHardAspects[0].definition.name} ${neptuneHardAspects[0].planet2.name}` 
        : 'Fische-Mond / Hohe Feinfühligkeits-Resonanz',
      title: 'Fluchtimpulse, Betäubung & Grenzdurchlässigkeit',
      shadowDescription: 'Neigung, bei seelischer Überlastung oder Reizüberflutung in Betäubungsmittel (Zucker, Alkohol, Medien, Schlafen, Rückzug) zu flüchten, um die raue Realität nicht spüren zu müssen.',
      psychosomaticOrgan: 'Immunsystem, Zirbeldrüse, Leber & Lymphfluss',
      positiveDialectic: {
        hiddenGift: 'Außergewöhnliche seelische Empathie, Medialität, hohe künstlerische Inspiration und Verbundenheit mit der geistigen Welt.',
        transformationPrinciple: 'Vom unbewussten Betäuben zur bewussten Transzendenz: Die feinstoffliche Begabung durch Meditation, Musik, Kunst und bewusste Naturzeiten erden.',
        actionProtocol: [
          'Klare energetische Schutzgrenzen setzen („Nein“ sagen lernen ohne Schuldgefühl).',
          'Tägliche Erdung: Barfußlaufen auf Naturboden, Meersalzbäder und warme Mahlzeiten.',
          'Kreativer Ausdruck als Katalysator: Gefühle in Musik, Schreiben oder Kunst kanalisieren statt verdrängen.'
        ],
        neurodidacticMantra: '»Ich bin vollkommen geschützt. Meine Sensibilität ist keine Schwäche, sondern mein heiligster Kompass.«',
        healingElement: 'Amethyst & Bergkristall (zur Klärung des Geistes)'
      }
    });
  }

  // 2. Check for Anxiety / Control / Panic Patterns (Saturn / Pluto / Mond / 8. Haus)
  const saturnPlutoHardAspects = aspects.filter(a => 
    ((a.planet1.id === 'Saturn' && (a.planet2.id === 'Moon' || a.planet2.id === 'Sun')) ||
     (a.planet1.id === 'Pluto' && (a.planet2.id === 'Moon' || a.planet2.id === 'Sun' || a.planet2.id === 'Ascendant')) ||
     (a.planet2.id === 'Saturn' && (a.planet1.id === 'Moon' || a.planet1.id === 'Sun')) ||
     (a.planet2.id === 'Pluto' && (a.planet1.id === 'Moon' || a.planet1.id === 'Sun' || a.planet1.id === 'Ascendant'))) &&
    ['square', 'opposition', 'conjunction'].includes(a.aspectType)
  );

  if (saturnPlutoHardAspects.length > 0 || moonSign === 'capricorn' || moonSign === 'scorpio') {
    challenges.push({
      id: 'shadow_anxiety',
      category: 'anxiety',
      categoryLabel: 'Angst, Kontrolle & Panikmuster',
      categoryIcon: '⚡',
      categoryColor: 'from-amber-500 to-rose-600 border-rose-500/40 text-rose-300',
      aspectTrigger: saturnPlutoHardAspects.length > 0 
        ? `${saturnPlutoHardAspects[0].planet1.name} ${saturnPlutoHardAspects[0].definition.name} ${saturnPlutoHardAspects[0].planet2.name}` 
        : 'Skorpion-/Steinbock-Mond Matrix (Tiefenkontrolle)',
      title: 'Existenzangst, Perfektionismus & Kontrollzwänge',
      shadowDescription: 'Angst vor Ohnmacht, Ablehnung oder Kontrollverlust führt zu innerer Starre, Katastrophendenken, Zähneknirschen und Misstrauen gegenüber dem Lebensfluss.',
      psychosomaticOrgan: 'Nebennieren (Cortisol/Adrenalin), Herzrhythmus, Skelett & Nacken',
      positiveDialectic: {
        hiddenGift: 'Unerschütterliche Krisenfestigkeit, tiefe seelische Transformationskraft und meisterhafte Führungskompetenz.',
        transformationPrinciple: 'Vom Zwang zur Kontrolle zur Hingabe an das Urvertrauen: Wahre Stärke entsteht nicht durch Absicherung, sondern durch die Gewissheit, jede Welle reiten zu können.',
        actionProtocol: [
          '4-7-8 Atemtechnik zur sofortigen Beruhigung des Sympathikus-Nervs bei Angstwellen.',
          'Schatten-Tagebuch: „Was ist das absolut Schlimmste, das passieren könnte – und warum bin ich stark genug, es zu meistern?“',
          'Muskelentspannung nach Jacobson und warme Magnesiumbäder am Abend.'
        ],
        neurodidacticMantra: '»Ich lasse den Zwang zur Kontrolle los und vertraue der unendlichen Weisheit des Lebens.«',
        healingElement: 'Schwarzer Turmalin (Schörl) & Rauchquarz'
      }
    });
  }

  // 3. Check for Nutrition / Eating / Digestive Patterns (Mond / Venus / Jupiter / 6. Haus)
  const nutritionAspects = aspects.filter(a =>
    ((a.planet1.id === 'Moon' && (a.planet2.id === 'Venus' || a.planet2.id === 'Jupiter')) ||
     (a.planet2.id === 'Moon' && (a.planet1.id === 'Venus' || a.planet1.id === 'Jupiter'))) &&
    ['square', 'opposition'].includes(a.aspectType)
  );

  if (nutritionAspects.length > 0 || moonSign === 'taurus' || moonSign === 'cancer' || moonSign === 'virgo') {
    challenges.push({
      id: 'shadow_nutrition',
      category: 'nutrition',
      categoryLabel: 'Essverhalten & Magen-Darm',
      categoryIcon: '🍎',
      categoryColor: 'from-emerald-500 to-amber-600 border-amber-500/40 text-amber-300',
      aspectTrigger: nutritionAspects.length > 0 
        ? `${nutritionAspects[0].planet1.name} ${nutritionAspects[0].definition.name} ${nutritionAspects[0].planet2.name}` 
        : `${ZODIAC_ORGAN_MAP[moonSign]?.body.split(',')[0]} Resonanz`,
      title: 'Emotionales Essen, Heißhunger & Verdauungs-Stress',
      shadowDescription: 'Nahrung wird als seelischer Tröster, Belohnung oder Betäubung eingesetzt; bei Stress reagiert das vegetative Nervensystem im Magen oder Dünndarm mit Blähungen, Reizdarm oder Unverträglichkeiten.',
      psychosomaticOrgan: 'Magen, Dünndarm, Mikrobiom & Gallenfluss',
      positiveDialectic: {
        hiddenGift: 'Tief ausgeprägter Sinn für Genuss, gesunde Nährstoffe, Instinkt für biologische Rhythmen und Fürsorge für den eigenen Körper.',
        transformationPrinciple: 'Vom Schlingen zur Achtsamkeit: Essen als heiligen Akt der Selbstliebe zelebrieren und seelischen Hunger mit Liebe statt mit Zucker stillen.',
        actionProtocol: [
          'Die „Halte-ein-Regel“ vor jedem Bissen: 3 tiefe Atemzüge nehmen und fragen: „Habe ich echten Hunger oder sehne ich mich nach einer Umarmung?“',
          'Bitterstoffe vor den Mahlzeiten (Löwenzahn, Schafgarbe) zur Unterstützung der Leber-Galle-Sekretion.',
          'Kein Essen vor Bildschirmen; achtsames Kauen (mindestens 20-30 Mal pro Bissen).'
        ],
        neurodidacticMantra: '»Ich nähre meinen Körper mit reiner Liebe, Achtsamkeit und Dankbarkeit.«',
        healingElement: 'Karneol & Citrin (zur Stärkung des Solarplexus)'
      }
    });
  }

  // 4. Check for Stress, Burnout & Inflammation Patterns (Mars / Uranus / Widder)
  const stressAspects = aspects.filter(a =>
    ((a.planet1.id === 'Mars' && (a.planet2.id === 'Uranus' || a.planet2.id === 'Mercury')) ||
     (a.planet2.id === 'Mars' && (a.planet1.id === 'Uranus' || a.planet1.id === 'Mercury'))) &&
    ['square', 'opposition', 'conjunction'].includes(a.aspectType)
  );

  if (stressAspects.length > 0 || sunSign === 'aries' || sunSign === 'gemini') {
    challenges.push({
      id: 'shadow_stress',
      category: 'stress',
      categoryLabel: 'Burnout, Nervosität & Entzündung',
      categoryIcon: '🔥',
      categoryColor: 'from-red-500 to-amber-600 border-red-500/40 text-red-300',
      aspectTrigger: stressAspects.length > 0
        ? `${stressAspects[0].planet1.name} ${stressAspects[0].definition.name} ${stressAspects[0].planet2.name}`
        : 'Widder/Zwillinge-Dynamik (Mentale Hochspannung)',
      title: 'Nervöse Reizüberflutung, Entzündungsdrang & Burnout',
      shadowDescription: 'Ständige innere Getriebenheit, Unfähigkeit abzuschalten, Neigung zu Hitzewallungen, impulsiven Wutausbrüchen oder rascher Erschöpfung durch Daueranspannung.',
      psychosomaticOrgan: 'Zentrales Nervensystem, Gehirn, Blutdruck & Nebennieren',
      positiveDialectic: {
        hiddenGift: 'Genialer Erfindergeist, revolutionäre Innovationskraft, blitzschnelle Reaktionsfähigkeit und Begeisterung.',
        transformationPrinciple: 'Vom Verheizen der Lebenskraft zur rhythmischen Kraftentfaltung: Dynamische Power-Phasen mit radikalen Ruheoasen abwechseln.',
        actionProtocol: [
          'Feste Entspannungs-Inseln im Kalender blockieren, die genauso unantastbar sind wie Geschäftstermine.',
          'Körperliche Entladung: Intensives Intervalltraining oder Boxen, um aufgestautes Adrenalin physiologisch abzubauen.',
          'Adaptogene Kräuter: Ashwagandha oder Rosenwurz zur Regulierung des Cortisolspiegels.'
        ],
        neurodidacticMantra: '»In der absoluten Stille liegt meine gewaltigste Schöpferkraft.«',
        healingElement: 'Lapislazuli & Sodalith (zur Kühlung des Nervensystems)'
      }
    });
  }

  // Ensure we always have at least 3 high-impact challenges based on Sun, Moon, Ascendant
  if (challenges.length < 3) {
    const sunOrganInfo = ZODIAC_ORGAN_MAP[sunSign] || ZODIAC_ORGAN_MAP['taurus'];
    challenges.push({
      id: 'shadow_vitality',
      category: 'vitality',
      categoryLabel: 'Konstitutionelle Vitalität',
      categoryIcon: '🌿',
      categoryColor: 'from-emerald-500 to-cyan-600 border-cyan-500/40 text-cyan-300',
      aspectTrigger: `Sonne im ${synthesis.sun.planet.sign.name} (${synthesis.sun.planet.degreeString})`,
      title: `Konstitutionelle Seelen-Aufgabe: ${sunOrganInfo.body.split(',')[0]} Balance`,
      shadowDescription: sunOrganInfo.weakness,
      psychosomaticOrgan: sunOrganInfo.body,
      positiveDialectic: {
        hiddenGift: `Geprägt durch ${synthesis.sun.planet.sign.name}: ${sunOrganInfo.meaning}`,
        transformationPrinciple: sunOrganInfo.remedy,
        actionProtocol: [
          `Gezielte Unterstützung für ${sunOrganInfo.body.split(',')[0]} in die tägliche Morgenroutine einbinden.`,
          `Auf Körpersignale hören, bevor Schmerz als letztes Warnsignal entsteht.`,
          `Seelische Ursache annehmen: ${sunOrganInfo.meaning}`
        ],
        neurodidacticMantra: '»Mein Körper ist der Tempel meiner Seele. Ich heile durch vollkommenes Bewusstsein.«',
        healingElement: 'Smaragd & Aventurin'
      }
    });
  }

  // Organ Anatomy Map for Sun, Moon, Ascendant, 6th House
  const organAnatomy: OrganAnatomyItem[] = [
    {
      zodiacSign: `☉ Sonne in ${synthesis.sun.planet.sign.name}`,
      bodyRegion: ZODIAC_ORGAN_MAP[sunSign]?.body || 'Körperkern',
      potentialWeakness: ZODIAC_ORGAN_MAP[sunSign]?.weakness || 'Erschöpfung',
      holisticStrengthening: ZODIAC_ORGAN_MAP[sunSign]?.remedy || 'Regelmäßige Erholung',
      symbolicMeaning: ZODIAC_ORGAN_MAP[sunSign]?.meaning || 'Ausdruck des Lebenswillens'
    },
    {
      zodiacSign: `☽ Mond in ${synthesis.moon.planet.sign.name}`,
      bodyRegion: ZODIAC_ORGAN_MAP[moonSign]?.body || 'Vegetatives Nervensystem',
      potentialWeakness: ZODIAC_ORGAN_MAP[moonSign]?.weakness || 'Emotionale Schwankungen',
      holisticStrengthening: ZODIAC_ORGAN_MAP[moonSign]?.remedy || 'Seelenhygiene',
      symbolicMeaning: ZODIAC_ORGAN_MAP[moonSign]?.meaning || 'Seelische Geborgenheit'
    },
    {
      zodiacSign: `↑ Aszendent in ${chart.housesResult.angles.ascendant.sign.name}`,
      bodyRegion: ZODIAC_ORGAN_MAP[ascSign]?.body || 'Äußere Konstitution',
      potentialWeakness: ZODIAC_ORGAN_MAP[ascSign]?.weakness || 'Spannungszustände',
      holisticStrengthening: ZODIAC_ORGAN_MAP[ascSign]?.remedy || 'Bewegung & Haltung',
      symbolicMeaning: ZODIAC_ORGAN_MAP[ascSign]?.meaning || 'Auftreten und Abgrenzung'
    }
  ];

  const primaryVulnerability = `${ZODIAC_ORGAN_MAP[sunSign]?.body.split(',')[0]} (Sonne) & ${ZODIAC_ORGAN_MAP[moonSign]?.body.split(',')[0]} (Mond)`;
  const overallDialecticGuidance = `Jeder gesundheitliche oder seelische Schattenpunkt birgt exakt den Keim deiner größten Schöpferkraft. Nicht das Symptom bekämpfen, sondern die seelische Botschaft dekodieren und durch positive Dialektik in gelebte Seelenstärke verwandeln.`;

  return {
    challenges,
    organAnatomy,
    primaryVulnerability,
    overallDialecticGuidance
  };
}
