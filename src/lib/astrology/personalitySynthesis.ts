// Personality Synthesis & Core Essence Generator
// Neurodidactic Birkenbihl Model for Instant Soul Profiling

import type { CompleteNatalChart } from './engine';

export interface PersonalitySummary {
  archetypeName: string;
  shortEssence: string;
  personalityMantra: string;
  
  // 4 Core Identity Pillars
  corePillars: {
    sunPillar: {
      title: string;
      sign: string;
      symbol: string;
      description: string;
      keyTrait: string;
    };
    moonPillar: {
      title: string;
      sign: string;
      symbol: string;
      description: string;
      needs: string;
    };
    ascendantPillar: {
      title: string;
      sign: string;
      symbol: string;
      description: string;
      firstImpression: string;
    };
    mindPillar: {
      title: string;
      sign: string;
      symbol: string;
      description: string;
      thinkingStyle: string;
    };
  };

  // Top 3 Soul Superpowers
  superpowers: Array<{
    icon: string;
    name: string;
    detail: string;
  }>;

  // Growth & Shadow Mastery
  growthKeys: Array<{
    icon: string;
    challenge: string;
    masteryKey: string;
  }>;

  // Birkenbihl Communication & Social Dynamics
  socialInteractionCode: {
    howToConnect: string;
    whatToAvoid: string;
    optimalLearningMode: string;
  };

  // Element & Energy Footprint
  elementalDominanceText: string;
  lifePathResonance: string;
}

const SIGN_ARCHETYPES: Record<string, { sunName: string; sunEssence: string; trait: string; superpower: string; challenge: string; mastery: string }> = {
  aries: {
    sunName: 'Der dynamische Pionier & Impulsgeber',
    sunEssence: 'Ein mutiger Schöpferwille mit unaufhaltsamer Tatkraft. Geht voran, wo noch niemand war.',
    trait: 'Entschlossenheit, Spontaneität und unverfälschte Begeisterungskraft.',
    superpower: 'Pioniergeist & Mut zur schnellen Entscheidung',
    challenge: 'Ungeduld bei verlangsamten Prozessen und Reaktivität bei Widerständen.',
    mastery: 'Innehalten vor der Tat: Die feurige Energie gezielt und ausdauernd bündeln.'
  },
  taurus: {
    sunName: 'Der beständige Fels & Schöpfer wahrer Werte',
    sunEssence: 'Tiefe Verwurzelung, Sinn für Qualität, Schönheit und unerschütterliche Loyalität.',
    trait: 'Ruhepol, praktischer Scharfsinn und bedingungslose Verlässlichkeit.',
    superpower: 'Manifestationskraft, Geduld & Sinn für bleibende Werte',
    challenge: 'Festhalten an Gewohntem und Widerstand gegen plötzliche Veränderungen.',
    mastery: 'Hingabe an den Wandel: Erkennen, dass wahre Stabilität im Inneren ruht.'
  },
  gemini: {
    sunName: 'Der vielseitige Brückenbauer & Denker',
    sunEssence: 'Wissbegierig, kommunikativ und meisterhaft im Verknüpfen von scheinbar Getrenntem.',
    trait: 'Geistige Flexibilität, Humor und rasche Auffassungsgabe.',
    superpower: 'Vernetztes Denken, Sprachgewandtheit & Leichtigkeit',
    challenge: 'Zersplitterung durch zu viele Ideen und oberflächliche Unruhe.',
    mastery: 'Fokussierte Tiefe: Gedankenwelten mit dem Herzen verbinden.'
  },
  cancer: {
    sunName: 'Der einfühlsame Seelen-Beschützer & Intuitive',
    sunEssence: 'Tiefes emotionales Feingefühl, liebevolle Fürsorge und ein unfehlbarer innerer Kompass.',
    trait: 'Empathie, seelische Tiefe und ein warmherziger Beschützerinstinkt.',
    superpower: 'Hellfühlige Intuition & Schaffung von emotionaler Geborgenheit',
    challenge: 'Rückzug in den Panzer bei Kränkung und übermäßiges Festhalten an der Vergangenheit.',
    mastery: 'Gesunde seelische Abgrenzung: Die eigene Sensibilität als Stärke zelebrieren.'
  },
  leo: {
    sunName: 'Der charismatische Herzens-Führer & Schöpfer',
    sunEssence: 'Strahlende Präsenz, Großzügigkeit und die Gabe, Mitmenschen mit Herzenswärme zu inspirieren.',
    trait: 'Charisma, Stolz, Schöpferkraft und warmherzige Loyalität.',
    superpower: 'Leuchtkraft, inspirierende Führungsqualität & Großmut',
    challenge: 'Verletzlichkeit bei mangelnder Anerkennung und egozentrische Verhärtung.',
    mastery: 'Dienen aus wahrer Größe: Anerkennung aus dem eigenen inneren Licht schöpfen.'
  },
  virgo: {
    sunName: 'Der präzise Analytiker & Heiler',
    sunEssence: 'Liebe zum Detail, methodische Klarheit und das Streben, Dinge in ihre vollkommene Ordnung zu bringen.',
    trait: 'Sorgfalt, Hilfsbereitschaft und messerscharfe Beobachtungsgabe.',
    superpower: 'Analytische Brillanz, Ordnungssinn & heilsame Struktur',
    challenge: 'Überkritischer Perfektionismus und innerer Selbstzweifel.',
    mastery: 'Barmherzigkeit mit dem Unvollkommenen: Das große Ganze über dem Detail nicht vergessen.'
  },
  libra: {
    sunName: 'Der ästhetische Diplomat & Harmonie-Künstler',
    sunEssence: 'Feines Gespür für Gerechtigkeit, zwischenmenschliche Balance und vollendete Schönheit.',
    trait: 'Taktgefühl, diplomatisches Geschick und ästhetische Raffinesse.',
    superpower: 'Konfliktlösung, Beziehungsfähigkeit & ästhetische Harmonie',
    challenge: 'Entscheidungsschwäche aus Angst vor Disharmonie oder Ablehnung.',
    mastery: 'Klare innere Positionierung: Disharmonie aushalten, um echte Wahrheit zu finden.'
  },
  scorpio: {
    sunName: 'Der tiefgründige Seelen-Alchemist & Wandler',
    sunEssence: 'Unbestechlicher Wahrheitsdrang, magnetische Intensität und die Fähigkeit zur tiefen Wandlung.',
    trait: 'Willenskraft, Loyalität bis in die Tiefe und psychologischer Röntgenblick.',
    superpower: 'Unbeugsame Regenerationskraft & psychologische Einsicht',
    challenge: 'Kontrollbedürfnis, Misstrauen und Festhalten an alten Grollen.',
    mastery: 'Verzeihen und bedingungsloses Vertrauen in den Fluss des Lebens.'
  },
  sagittarius: {
    sunName: 'Der visionäre Sinnsucher & Freiheits-Pionier',
    sunEssence: 'Optimismus, Weitblick und ein unstillbarer Durst nach Wahrheit, Weisheit und Horizonterweiterung.',
    trait: 'Begeisterung, Großzügigkeit und philosophischer Humor.',
    superpower: 'Visionäre Weitsicht, Lebensmut & inspirierender Optimismus',
    challenge: 'Belehrungstendenzen und Ungeduld bei alltäglichen Routinen.',
    mastery: 'Geduldige Verankerung: Große Visionen Schritt für Schritt im Hier und Jetzt erden.'
  },
  capricorn: {
    sunName: 'Der weise Meister & strategische Baumeister',
    sunEssence: 'Ausdauer, Integrität und die Fähigkeit, selbst die steilsten Gipfel mit Disziplin zu erklimmen.',
    trait: 'Pflichtbewusstsein, Belastbarkeit und unverrückbare Verlässlichkeit.',
    superpower: 'Strategische Weitsicht, Disziplin & Meisterung der Materie',
    challenge: 'Härte gegen sich selbst und Vernachlässigung der eigenen Gefühlswelt.',
    mastery: 'Herzenswärme und Leichtigkeit zulassen: Erfolg an innerem Frieden messen.'
  },
  aquarius: {
    sunName: 'Der visionäre Reformer & Freigeist',
    sunEssence: 'Originell, unabhängig und seiner Zeit stets voraus. Sucht nach Erneuerung zum Wohle aller.',
    trait: 'Originalität, Humanismus und unkonventionelles Denken.',
    superpower: 'Innovationskraft, geistige Unabhängigkeit & Gemeinschaftssinn',
    challenge: 'Emotionale Distanzierung und rebellische Abkehr um des Widerspruchs willen.',
    mastery: 'Die Brücke vom kühlen Kopf zum warmen Herzen: Echte menschliche Nähe wagen.'
  },
  pisces: {
    sunName: 'Der mystische Träumer & universelle Heiler',
    sunEssence: 'Grenzenloses Mitgefühl, künstlerische Feinfühligkeit und Verbindung zum kosmischen Urquell.',
    trait: 'Empathie, Fantasie und ein tiefes Urvertrauen in die Seele.',
    superpower: 'Universelles Mitgefühl, Medialität & künstlerische Schöpfungskraft',
    challenge: 'Flucht vor der rauen irdischen Realität und mangelnde Grenzziehung.',
    mastery: 'Klare Erdung und Selbstfürsorge: Die eigene Sensibilität schützend umarmen.'
  }
};

const MOON_NEEDS: Record<string, { desc: string; need: string }> = {
  aries: { desc: 'Braucht direkte Aktionen, Freiheit und schnelle emotionale Verarbeitung.', need: 'Selbstbestimmung & Bewegung' },
  taurus: { desc: 'Findet Seelenruhe in stabiler Gemütlichkeit, Sinnlichkeit und Naturverbundenheit.', need: 'Sicherheit, Beständigkeit & Genuss' },
  gemini: { desc: 'Verarbeitet Gefühle am liebsten durch Gespräche, Austausch und Lesen.', need: 'Geistiger Austausch & Abwechslung' },
  cancer: { desc: 'Sucht tiefe emotionale Geborgenheit, familiäre Wärme und ein geschütztes Nest.', need: 'Geborgenheit & echtes Vertrauen' },
  leo: { desc: 'Blüht auf bei liebevoller Wertschätzung, kreativem Ausdruck und Lebensfreude.', need: 'Anerkennung, Wärme & Herzlichkeit' },
  virgo: { desc: 'Fühlt sich wohl, wenn Ordnung herrscht, der Alltag funktioniert und man nützlich sein kann.', need: 'Struktur, Klarheit & Gesundheit' },
  libra: { desc: 'Benötigt friedliche, ästhetische Harmonie und partnerschaftlichen Austausch.', need: 'Frieden, Schönheit & Partnerschaft' },
  scorpio: { desc: 'Verlangt nach absoluter Ehrlichkeit, seelischer Tiefe und vertrauter Verschwiegenheit.', need: 'Tiefe Wahrhaftigkeit & Loyalität' },
  sagittarius: { desc: 'Braucht weite Horizonte, Zuversicht, Humor und emotionale Freiheit.', need: 'Freiraum, Sinnsuche & Optimismus' },
  capricorn: { desc: 'Behält Gefühle gern unter Kontrolle; blüht auf bei Respekt und Pflichterfüllung.', need: 'Stabilität, Respekt & Selbstbeherrschung' },
  aquarius: { desc: 'Braucht geistigen Freiraum und Verständnis für die eigene Einzigartigkeit.', need: 'Unabhängigkeit & Gleichgesinnte' },
  pisces: { desc: 'Schwingt tief mit der Umgebung mit; braucht Rückzugszeiten in Stille und Musik.', need: 'Seelenruhe, Mitgefühl & Rückzugsorte' }
};

const ASC_IMPRESSIONS: Record<string, { desc: string; impression: string }> = {
  aries: { desc: 'Tritt mutig, direkt und energisch auf.', impression: 'Dynamisch, unerschrocken und führungsstark' },
  taurus: { desc: 'Wirkt ruhig, souverän, geerdet und natürlich anziehend.', impression: 'Verlässlich, gelassen und qualitätsbewusst' },
  gemini: { desc: 'Erscheint lebhaft, neugierig, charmant und wortgewandt.', impression: 'Aufgeweckt, kontaktfreudig und geistreich' },
  cancer: { desc: 'Strahlt Sanftheit, Empathie und instinktive Fürsorge aus.', impression: 'Einfühlsam, nahbar und warmherzig' },
  leo: { desc: 'Betritt den Raum mit natürlicher Autorität, Glanz und Herzenswärme.', impression: 'Souverän, charismatisch und präsent' },
  virgo: { desc: 'Wirkt aufmerksam, gepflegt, sachlich und scharfsinnig.', impression: 'Präzise, hilfsbereit und diskret' },
  libra: { desc: 'Besticht durch Eleganz, Höflichkeit, Takt und einladende Ausstrahlung.', impression: 'Harmonisch, gewinnend und stilvoll' },
  scorpio: { desc: 'Strahlt geheimnisvolle Tiefe, Durchdringung und innere Macht aus.', impression: 'Faszinierend, intensiv und unbestechlich' },
  sagittarius: { desc: 'Tritt optimistisch, weltgewandt, humorvoll und offen auf.', impression: 'Inspirierend, lebensfroh und weitblickend' },
  capricorn: { desc: 'Wirkt reif, kompetent, würdevoll und diszipliniert.', impression: 'Ernsthaft, verlässlich und autoritär' },
  aquarius: { desc: 'Erscheint unkonventionell, originell, geistreich und frei.', impression: 'Innovativ, unnahbar-freundlich und visionär' },
  pisces: { desc: 'Strahlt träumerische Zartheit, Weichheit und sanfte Güte aus.', impression: 'Geheimnisvoll, feinfühlig und poetisch' }
};

export function generatePersonalitySummary(chart: CompleteNatalChart): PersonalitySummary {
  const sunSign = chart.synthesis.sun.planet.sign;
  const moonSign = chart.synthesis.moon.planet.sign;
  const ascSign = chart.housesResult.angles.ascendant.sign;
  const mercuryPlanet = chart.planets.find(p => p.id === 'mercury') || chart.planets[2];

  const sunData = SIGN_ARCHETYPES[sunSign.id] || SIGN_ARCHETYPES['taurus'];
  const moonData = MOON_NEEDS[moonSign.id] || MOON_NEEDS['cancer'];
  const ascData = ASC_IMPRESSIONS[ascSign.id] || ASC_IMPRESSIONS['leo'];
  const mercuryData = SIGN_ARCHETYPES[mercuryPlanet.sign.id] || SIGN_ARCHETYPES['gemini'];

  // Compound Archetype Name
  const archetypeName = `${sunData.sunName} mit ${moonSign.name}-Gefühlstiefe & ${ascSign.name}-Seelentor`;
  const shortEssence = `${sunData.sunEssence} Im seelischen Kern: ${moonData.desc} Nach außen wirkt das Auftreten ${ascData.impression.toLowerCase()}.`;

  // Superpowers
  const superpowers = [
    {
      icon: '☀️',
      name: sunData.superpower,
      detail: `Geprägt durch die ${sunSign.name}-Sonne: Schöpferische Willenskraft, gepaart mit ${sunData.trait.toLowerCase()}`
    },
    {
      icon: '🌙',
      name: 'Emotionale Seelenkraft & Instinkt',
      detail: `Geprägt durch den ${moonSign.name}-Mond: ${moonData.desc} Schafft inneren Halt durch ${moonData.need.toLowerCase()}.`
    },
    {
      icon: '🧠',
      name: `Geistige Auffassung (${mercuryPlanet.sign.name})`,
      detail: `Merkur im ${mercuryPlanet.sign.name}: Ausgeprägte ${mercuryData.trait.toLowerCase()} – trifft Entscheidungen mit geistiger Klarheit.`
    }
  ];

  // Growth / Shadow
  const growthKeys = [
    {
      icon: '⚖️',
      challenge: sunData.challenge,
      masteryKey: sunData.mastery
    },
    {
      icon: '🌱',
      challenge: `Emotionale Überlastung, wenn das Grundbedürfnis nach »${moonData.need}« übergangen wird.`,
      masteryKey: `Regelmäßige Seelenhygiene und bewusste Rückzugsräume einplanen.`
    }
  ];

  // Birkenbihl Communication Code
  let howToConnect = '';
  let whatToAvoid = '';
  if (sunSign.element === 'Feuer') {
    howToConnect = 'Begeistere mit Visionen, sprich dynamisch und fokussiere dich auf Ziele und Taten.';
    whatToAvoid = 'Endlose Bedenkenträgerei, Zaudern und das Ausbremsen des Tatendrangs.';
  } else if (sunSign.element === 'Erde') {
    howToConnect = 'Biete konkrete Fakten, Verlässlichkeit, Struktur und einen spürbaren praktischen Nutzen.';
    whatToAvoid = 'Chaotische Hektik, unbegründete plötzliche Planänderungen und leere Versprechen.';
  } else if (sunSign.element === 'Luft') {
    howToConnect = 'Führe geistreiche Dialoge, erkläre logische Zusammenhänge und lass Raum für Ideen.';
    whatToAvoid = 'Starre Dogmen, emotionale Dramen und geistige Einengung.';
  } else {
    howToConnect = 'Sprich mit Herzenswärme, zeige aufrichtiges Verständnis und respektiere leise Zwischentöne.';
    whatToAvoid = 'Kalte Sachlichkeit, Druckausübung und das Ignorieren von Bauchgefühlen.';
  }

  // Dominant Elements Text
  const domElem = chart.balance.dominantElement || 'Erde';
  const elKey = domElem === 'Feuer' ? 'fire' : domElem === 'Erde' ? 'earth' : domElem === 'Luft' ? 'air' : 'water';
  const elPct = chart.balance.elements[elKey]?.percentage || 0;
  const elementalDominanceText = `Dominierendes Element ist ${domElem} (${elPct}%) – verleiht der Persönlichkeit ein stark ${domElem === 'Feuer' ? 'tatkräftiges, visionäres' : domElem === 'Erde' ? 'stabiles, pragmatisches' : domElem === 'Luft' ? 'reflektiertes, kommunikatives' : 'einfühlsames, tiefgründiges'} Grundtemperament.`;

  // Personality Mantra
  const personalityMantra = `»Ich verbinde die schöpferische Kraft des ${sunSign.name} mit der Weisheit meines ${moonSign.name}-Herzens und schreite mit dem Mut des ${ascSign.name} voran.«`;

  return {
    archetypeName,
    shortEssence,
    personalityMantra,
    corePillars: {
      sunPillar: {
        title: 'Wesenskern & Wille',
        sign: `${sunSign.name} (${sunSign.symbol})`,
        symbol: '☉',
        description: sunData.sunEssence,
        keyTrait: sunData.trait
      },
      moonPillar: {
        title: 'Seelenwelt & Herz',
        sign: `${moonSign.name} (${moonSign.symbol})`,
        symbol: '☽',
        description: moonData.desc,
        needs: moonData.need
      },
      ascendantPillar: {
        title: 'Auftreten & Seelentor',
        sign: `${ascSign.name} (${ascSign.symbol})`,
        symbol: '↑',
        description: ascData.desc,
        firstImpression: ascData.impression
      },
      mindPillar: {
        title: 'Denkstil & Verstand',
        sign: `${mercuryPlanet.sign.name} (${mercuryPlanet.sign.symbol})`,
        symbol: '☿',
        description: `Denkt und kommuniziert im Stile des Zeichens ${mercuryPlanet.sign.name}.`,
        thinkingStyle: mercuryData.trait
      }
    },
    superpowers,
    growthKeys,
    socialInteractionCode: {
      howToConnect,
      whatToAvoid,
      optimalLearningMode: `Assoziative Wissensverknüpfung nach Birkenbihl mit ${domElem}-Schwerpunkt.`
    },
    elementalDominanceText,
    lifePathResonance: `Lebenswegzahl ${chart.numerology.lifePath.number} (»${chart.numerology.lifePath.name}«) verstärkt diesen Seelenplan um die Gabe: ${chart.numerology.lifePath.dailyGift}`
  };
}
