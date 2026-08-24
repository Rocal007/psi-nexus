import type { CompleteNatalChart } from './engine';

export interface HealingStone {
  name: string;
  mineralFamily: string;
  chakra: string;
  chakraColor: string;
  colorHex: string;
  gradientClass: string;
  iconEmoji: string;
  role: string; // e.g. "Dein Sonnen-Lebensstein", "Mond-Schutzstein"
  
  // Birkenbihl 4D Framework
  primaryNeed: string; // Seelisches Grundbedürfnis
  whyAndReason: string; // Warum & Wieso (Kosmische Resonanz)
  supportEffects: string[]; // Was er konkret unterstützt
  practicalApplication: string; // Alltags-Ritual & Anwendung
  cleansingMethod: string; // Energetische Reinigung & Aufladung
}

export interface GemstoneNeedCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  stones: {
    stoneName: string;
    briefEffect: string;
    idealFor: string;
    applicationTip: string;
  }[];
}

export interface PersonalGemstoneProfile {
  sunStone: HealingStone;
  moonStone: HealingStone;
  ascendantStone: HealingStone;
  chironStone: HealingStone;
  elementBalanceStone: HealingStone;
  karmicStone: HealingStone;
  needCategories: GemstoneNeedCategory[];
}

// 1. Sun Stones (Core Identity & Life Force)
const SUN_STONES: Record<string, Omit<HealingStone, 'role'>> = {
  aries: {
    name: 'Roter Jaspis',
    mineralFamily: 'Oxide / Quarz-Gruppe',
    chakra: 'Wurzelchakra (Muladhara)',
    chakraColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    colorHex: '#dc2626',
    gradientClass: 'from-red-600 to-amber-700',
    iconEmoji: '🔴',
    primaryNeed: 'Fokussierte Tatkraft ohne energetisches Ausbrennen.',
    whyAndReason: 'Deine Widder-Sonne trägt feurigen Pioniergeist in sich. Roter Jaspis stabilisiert dieses Feuer, erdet impulsive Energien und verhindert, dass du dich in tausend Projekten gleichzeitig verzehrst.',
    supportEffects: [
      'Gibt Ausdauer bei der Verwirklichung deiner Visionen',
      'Schützt vor impulsivem Handeln und Stress-Erschöpfung',
      'Stärkt deine natürliche Führungskraft und körperliche Vitalität'
    ],
    practicalApplication: 'Halte den Stein morgens für 2 Minuten in beiden Händen, atme tief in den Bauch und setze deinen Tagesfokus.',
    cleansingMethod: 'Einmal wöchentlich unter fließendem, lauwarmem Wasser entladen und in der sanften Morgensonne aufladen.'
  },
  taurus: {
    name: 'Smaragd & Rosenquarz',
    mineralFamily: 'Beryll & Quarz-Familie',
    chakra: 'Herzchakra (Anahata)',
    chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    colorHex: '#10b981',
    gradientClass: 'from-emerald-600 to-teal-800',
    iconEmoji: '💚',
    primaryNeed: 'Wahre Seelenfülle, Geborgenheit und Loslassen von materieller Angst.',
    whyAndReason: 'Als Stier-Sonne suchst du Beständigkeit und Sinnlichkeit. Der Smaragd verbindet deine Erdverbundenheit mit höherer Herzensweisheit, während Rosenquarz hilft, starre Festhaltemuster aufzulösen.',
    supportEffects: [
      'Fördert das Gefühl von innerem Reichtum und Gelassenheit',
      'Öffnet das Herz für bedingungslose Liebe und Partnerschaft',
      'Lindert Verspannungen im Nacken- und Kehlkopfbereich'
    ],
    practicalApplication: 'Trage den Smaragd auf Herzhöhe oder platziere einen Rosenquarz auf deinem Nachttisch.',
    cleansingMethod: 'Auf einem Bergkristall-Cluster entladen und im sanften Mondlicht regenerieren.'
  },
  gemini: {
    name: 'Citrin (Goldtopas-Quarz)',
    mineralFamily: 'Silikate / Quarz-Gruppe',
    chakra: 'Solarplexus & Stirnchakra',
    chakraColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    colorHex: '#f59e0b',
    gradientClass: 'from-amber-500 to-yellow-600',
    iconEmoji: '💛',
    primaryNeed: 'Geistige Zentrierung, Nervenruhe und Schutz vor Reizüberflutung.',
    whyAndReason: 'Deine Zwillinge-Sonne empfängt unzählige Impulse gleichzeitig. Der sonnige Citrin bündelt diese verstreuten Gedankenströme und transformiert intellektuelle Unruhe in strahlende Klarheit.',
    supportEffects: [
      'Schärft die Konzentrationsfähigkeit und Entscheidungsfreude',
      'Beruhigt das vegetative Nervensystem bei Informationsstress',
      'Unterstützt freudigen, charismatischen Redefluss'
    ],
    practicalApplication: 'Lege den Citrin beim Arbeiten oder Schreiben neben deine Tastatur oder halte ihn vor wichtigen Gesprächen.',
    cleansingMethod: 'Monatlich mit Hämatit-Steinen entladen und für 1 Stunde im Morgensonnenlicht aufladen.'
  },
  cancer: {
    name: 'Weißer Mondstein',
    mineralFamily: 'Feldspat-Gruppe',
    chakra: 'Sakral- & Kronenchakra',
    chakraColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30',
    colorHex: '#818cf8',
    gradientClass: 'from-slate-300 via-indigo-400 to-purple-500',
    iconEmoji: '🤍',
    primaryNeed: 'Emotionale Ausgeglichenheit, Schutz vor Kränkungen und Urvertrauen.',
    whyAndReason: 'Deine Krebs-Sonne spürt feine Schwingungen sofort und zieht sich bei Kälte schnell in ihr Seelengehäuse zurück. Mondstein nährt deine Intuition und schenkt das Gefühl von unantastbarem Schutz.',
    supportEffects: [
      'Harmonisiert emotionale Schwankungen und innere Gezeiten',
      'Vertieft den Zugang zu Träumen und unbewusster Seelenweisheit',
      'Schenkt sanfte Geborgenheit in Phasen des Wandels'
    ],
    practicalApplication: 'Schlafe mit dem Mondstein unter deinem Kopfkissen oder trage ihn an Vollmondnächten bei dir.',
    cleansingMethod: 'Regelmäßig in einer Vollmondnacht aufladen; niemals starker Hitze oder chemischen Seifen aussetzen.'
  },
  leo: {
    name: 'Sonnenstein (Heliolith)',
    mineralFamily: 'Oligoklas / Feldspat',
    chakra: 'Solarplexus & Herzchakra',
    chakraColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    colorHex: '#eab308',
    gradientClass: 'from-amber-400 via-orange-500 to-yellow-600',
    iconEmoji: '☀️',
    primaryNeed: 'Echtes Selbstwertgefühl unabhängig vom Beifall anderer.',
    whyAndReason: 'Deine Löwe-Sonne strahlt pure Schöpferkraft aus. Der Sonnenstein nährt dein inneres Licht direkt aus deiner Seelenquelle, sodass du nicht auf äußere Bestätigung angewiesen bist, um zu leuchten.',
    supportEffects: [
      'Löst Versagensängste und Schamgefühle vollständig auf',
      'Fördert herzliche Großzügigkeit und authentische Autorität',
      'Bringt Optimismus und Heiterkeit in trübe Phasen'
    ],
    practicalApplication: 'Trage den Sonnenstein tagsüber sichtbar als Anhänger oder Meditationsstein auf deinem Solarplexus.',
    cleansingMethod: 'Direkt in der Mittagssonne aufladen, nachdem er kurz mit Quellwasser gereinigt wurde.'
  },
  virgo: {
    name: 'Amazonit & Moosachat',
    mineralFamily: 'Mikroklin & Quarz-Aggregat',
    chakra: 'Herz- & Halschakra',
    chakraColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
    colorHex: '#14b8a6',
    gradientClass: 'from-teal-500 to-emerald-700',
    iconEmoji: '🍃',
    primaryNeed: 'Loslassen von Perfektionsdruck, Selbstkritik und Gedankenkreisen.',
    whyAndReason: 'Deine Jungfrau-Sonne analysiert jedes Detail messerscharf. Amazonit beruhigt den inneren Kritiker, gleicht Verstand und Gefühl harmonisch aus und verbindet dich mit der Weisheit der Natur.',
    supportEffects: [
      'Befreit von Grübelzwängen und chronischer Anspannung',
      'Schenkt Gelassenheit gegenüber unvollkommenen Situationen',
      'Fördert gesunde Selbstfürsorge und körperliche Entspannung'
    ],
    practicalApplication: 'Lege den Amazonit abends auf deine Brust, atme ruhig ein und sage: "Ich bin gut und vollkommen, genau so wie ich bin."',
    cleansingMethod: 'Unter fließendem Quellwasser reinigen und auf einer Amethyst-Druse regenerieren.'
  },
  libra: {
    name: 'Lapislazuli & Kunzit',
    mineralFamily: 'Lasurit-Gemenge & Spodumen',
    chakra: 'Hals- & Stirnchakra',
    chakraColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    colorHex: '#3b82f6',
    gradientClass: 'from-blue-600 via-indigo-700 to-purple-800',
    iconEmoji: '🌌',
    primaryNeed: 'Innere Wahrheit sprechen und mutige Entscheidungen treffen.',
    whyAndReason: 'Deine Waage-Sonne strebt nach vollkommener Harmonie, neigt dabei jedoch manchmal dazu, eigene Bedürfnisse zu verschweigen. Lapislazuli verleiht königliche Klarheit und den Mut zur aufrichtigen Wahrheit.',
    supportEffects: [
      'Überwindet quälende Unentschlossenheit und Harmoniesucht',
      'Stärkt die authentische Selbstbehauptung in Beziehungen',
      'Fördert künstlerisches Feingefühl und ästhetischen Weitblick'
    ],
    practicalApplication: 'Vor schwierigen Gesprächen 3 Minuten auf den Kehlkopf legen und tief in die blaue Schwingung eintauchen.',
    cleansingMethod: 'Vorsichtig trocken mit Hämatit reinigen (kein langes Salzwasserbad).'
  },
  scorpio: {
    name: 'Malachit & Schwarzer Obsidian',
    mineralFamily: 'Kupfercarbonat & Vulkanisches Glas',
    chakra: 'Herz- & Wurzelchakra',
    chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    colorHex: '#059669',
    gradientClass: 'from-emerald-700 via-teal-900 to-slate-950',
    iconEmoji: '🐍',
    primaryNeed: 'Wandlung von Schmerz in universelle Schöpferkraft & Vertrauen.',
    whyAndReason: 'Deine Skorpion-Sonne taucht furchtlos in tiefste Seelenschichten ein. Malachit deckt verdrängte Emotionen behutsam auf und Obsidian schützt deine sensible Essenz wie ein unverwundbarer Schild.',
    supportEffects: [
      'Ermöglicht tiefste emotionale Alchemie und Vergebung',
      'Befreit von Eifersucht, Kontrollzwängen und Misstrauen',
      'Schützt vor toxischen Fremdenergien und psychischen Angriffen'
    ],
    practicalApplication: 'Bei tiefen Meditationsreisen oder Loslass-Ritualen in den Händen halten.',
    cleansingMethod: 'Häufig auf Amethyst entladen; Malachit nicht in Berührung mit Säuren oder Wasser trinken.'
  },
  sagittarius: {
    name: 'Sodalith & Blauer Topas',
    mineralFamily: 'Gerüstsilikat / Silikate',
    chakra: 'Stirnchakra (Drittes Auge)',
    chakraColor: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
    colorHex: '#2563eb',
    gradientClass: 'from-blue-700 via-indigo-600 to-sky-500',
    iconEmoji: '🏹',
    primaryNeed: 'Überwindung von Ruhelosigkeit und Verankerung wahrer Lebensweisheit.',
    whyAndReason: 'Deine Schütze-Sonne sucht unablässig nach Sinn, Weite und Erkenntnis. Sodalith verbindet deine visionären Ideen mit logischer Bodenhaftung und bewahrt dich vor dogmatischer Selbstüberschätzung.',
    supportEffects: [
      'Gibt Orientierung und Fokus bei großen Lebenszielen',
      'Befreit von innerer Getriebenheit und Fernweh-Flucht',
      'Stärkt die Intuition und das Vertrauen in den eigenen Lebensweg'
    ],
    practicalApplication: 'Beim Lernen, Philosophieren oder Planen neuer Lebensetappen bei dir tragen.',
    cleansingMethod: 'Unter fließendem lauwarmem Wasser abspülen und im Abendlicht regenerieren.'
  },
  capricorn: {
    name: 'Bergkristall & Schwarzer Onyx',
    mineralFamily: 'Reines Siliziumdioxid & Quarz',
    chakra: 'Kronen- & Wurzelchakra',
    chakraColor: 'text-slate-200 bg-white/10 border-white/30',
    colorHex: '#94a3b8',
    gradientClass: 'from-slate-200 via-slate-400 to-slate-900',
    iconEmoji: '🏔️',
    primaryNeed: 'Leichtigkeit, Freude und Befreiung von erdrückender Pflichtlast.',
    whyAndReason: 'Deine Steinbock-Sonne trägt enorme Verantwortung und meistert steilste Berge. Der Bergkristall bringt diamantene Klarheit und Licht in starre Strukturen, während Onyx unerschütterliche Ausdauer schenkt.',
    supportEffects: [
      'Löst übermäßige Schwere und chronischen Leistungsdruck',
      'Verleiht Klarheit über deine wahren, seelischen Prioritäten',
      'Unterstützt strukturierten, dauerhaften Lebenserfolg'
    ],
    practicalApplication: 'Auf dem Schreibtisch platzieren oder bei Entscheidungen in der Hand halten.',
    cleansingMethod: 'In der prallen Sonne oder auf Bergkristall-Spitzen aufladen.'
  },
  aquarius: {
    name: 'Aquamarin & Regenbogen-Fluorit',
    mineralFamily: 'Beryll & Calciumfluorid',
    chakra: 'Hals- & Kronenchakra',
    chakraColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    colorHex: '#06b6d4',
    gradientClass: 'from-cyan-400 via-blue-500 to-purple-600',
    iconEmoji: '⚡',
    primaryNeed: 'Kanalisierung genialer Visionen und Herzensverbindung zur Welt.',
    whyAndReason: 'Deine Wassermann-Sonne empfängt revolutionäre Gedanken der Zukunft. Aquamarin bringt kühle Klarheit und Sanftmut, damit deine visionären Impulse menschlich und liebevoll manifestiert werden können.',
    supportEffects: [
      'Verbindet geistige Genialität mit seelischem Einfühlungsvermögen',
      'Schützt vor nervöser Überreizung und Außenseiter-Einsamkeit',
      'Fördert freie, unkonventionelle Kreativität ohne Blockaden'
    ],
    practicalApplication: 'Als Anhänger tragen oder beim Meditieren auf die Stirn legen.',
    cleansingMethod: 'Im fließenden kalten Quellwasser reinigen und im Morgenlicht aufladen.'
  },
  pisces: {
    name: 'Amethyst & Selenit',
    mineralFamily: 'Violetter Quarz & Gips-Kristall',
    chakra: 'Kronen- & Seelentor-Chakra',
    chakraColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    colorHex: '#a855f7',
    gradientClass: 'from-purple-600 via-indigo-600 to-pink-500',
    iconEmoji: '🌊',
    primaryNeed: 'Gesunde energetische Grenzen und Schutz vor Weltschmerz.',
    whyAndReason: 'Deine Fische-Sonne schwimmt im unendlichen Ozean des kollektiven Fühlens. Der Amethyst ist der höchste Schutzstein für hochsensible Seelen: Er filtert fremde Emotionen und verankert tiefsten Seelenfrieden.',
    supportEffects: [
      'Schützt vor Reizüberflutung, Energievampiren und emotionalem Auslaugen',
      'Schenkt tiefen, erholsamen Schlaf und intuitive Traumführung',
      'Verwandelt seelische Einsamkeit in universelle Geborgenheit'
    ],
    practicalApplication: 'Auf den Nachttisch stellen oder während der Meditation auf das Scheitelchakra legen.',
    cleansingMethod: 'Auf Selenit oder im Mondlicht aufladen; direkte Mittagssonne meiden, da Amethyst sonst verbleicht.'
  }
};

// 2. Moon Stones (Subconscious, Emotional Nourishment & Sleep)
const MOON_STONES: Record<string, Omit<HealingStone, 'role'>> = {
  aries: {
    name: 'Rhodonit',
    mineralFamily: 'Kettensilikat',
    chakra: 'Herzchakra',
    chakraColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    colorHex: '#f43f5e',
    gradientClass: 'from-rose-500 to-slate-800',
    iconEmoji: '🌸',
    primaryNeed: 'Sanfte Geduld und Beruhigung emotionaler Feuerstürme.',
    whyAndReason: 'Dein Widder-Mond reagiert blitzschnell und emotional impulsiv. Rhodonit heilt emotionale Wutimpulse und schenkt deinem Herzen Zeit zum Atmen.',
    supportEffects: ['Lindert innere Hektik', 'Fördert Vergebung im Affekt', 'Stärkt die emotionale Reife'],
    practicalApplication: 'In stressigen Momenten in der Hand rollen.',
    cleansingMethod: 'Regelmäßig mit lauwarmem Wasser abwaschen.'
  },
  taurus: {
    name: 'Chrysokoll',
    mineralFamily: 'Schichtsilikat',
    chakra: 'Herz- & Halschakra',
    chakraColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    colorHex: '#0d9488',
    gradientClass: 'from-teal-600 to-cyan-800',
    iconEmoji: '🌿',
    primaryNeed: 'Loslassen von Zukunftsängsten und emotionaler Starrheit.',
    whyAndReason: 'Dein Stier-Mond sucht maximale Sicherheit. Chrysokoll schenkt das seelische Wissen, dass du auch im Wandel geborgen bist.',
    supportEffects: ['Baut chronischen Stress ab', 'Öffnet für liebevolle Anpassung', 'Harmonisiert den Herzrhythmus'],
    practicalApplication: 'Beim Spaziergang in der Natur in der Tasche tragen.',
    cleansingMethod: 'Auf Amethyst entladen.'
  },
  gemini: {
    name: 'Blauer Chalcedon (Rednerstein)',
    mineralFamily: 'Faserquarz',
    chakra: 'Halschakra',
    chakraColor: 'text-sky-300 bg-sky-500/10 border-sky-500/30',
    colorHex: '#38bdf8',
    gradientClass: 'from-sky-400 to-blue-600',
    iconEmoji: '🕊️',
    primaryNeed: 'Beruhigung nervöser Gedankenspiralen vor dem Einschlafen.',
    whyAndReason: 'Dein Zwillinge-Mond verarbeitet Gefühle oft über den Verstand. Blauer Chalcedon kühlt überhitzte Gedankenströme ab und bringt Seelenruhe.',
    supportEffects: ['Fördert tiefen, ruhigen Schlaf', 'Ermöglicht gefühlvolle Aussprachen', 'Lindert Heiserkeit und Halsspannung'],
    practicalApplication: 'Vor dem Schlafen für 5 Minuten auf den Hals legen.',
    cleansingMethod: 'Unter fließendem Wasser abspülen.'
  },
  cancer: {
    name: 'Pfirsich-Mondstein',
    mineralFamily: 'Feldspat',
    chakra: 'Sakral- & Herzchakra',
    chakraColor: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
    colorHex: '#fb923c',
    gradientClass: 'from-orange-300 via-rose-300 to-purple-400',
    iconEmoji: '🍑',
    primaryNeed: 'Heilung des inneren Kindes und emotionale Selbstnährung.',
    whyAndReason: 'Dein Krebs-Mond steht im eigenen Domizil: Deine Seele ist ein hochsensibler Spiegel. Pfirsich-Mondstein umhüllt dich mit mütterlicher Wärme.',
    supportEffects: ['Schützt vor Stimmungsschwankungen', 'Nährt das innere Kind', 'Stärkt die weibliche Ur-Intuition'],
    practicalApplication: 'Nachts am Körper oder unter dem Kopfkissen tragen.',
    cleansingMethod: 'Im Licht des zunehmenden Mondes aufladen.'
  },
  leo: {
    name: 'Bernstein (Succinit)',
    mineralFamily: 'Fossiles Harz',
    chakra: 'Solarplexus',
    chakraColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    colorHex: '#d97706',
    gradientClass: 'from-amber-400 via-yellow-500 to-orange-600',
    iconEmoji: '🍯',
    primaryNeed: 'Herzenswärme ohne emotionale Kränkung bei Nichtbeachtung.',
    whyAndReason: 'Dein Löwe-Mond sehnt sich nach tiefer Anerkennung. Bernstein füllt dein Seelenreservoir mit uralter Sonnenwärme, sodass Kränkungen abperlen.',
    supportEffects: ['Schenkt sonnigen Seelenfrieden', 'Löst Traurigkeit und Melancholie', 'Fördert spielerische Lebensfreude'],
    practicalApplication: 'Auf dem Brustbein tragen.',
    cleansingMethod: 'Sanft mit einem Tuch abreiben, in sanfter Morgensonne erwärmen.'
  },
  virgo: {
    name: 'Rauchquarz',
    mineralFamily: 'Kristalliner Quarz',
    chakra: 'Wurzelchakra',
    chakraColor: 'text-stone-300 bg-stone-500/10 border-stone-500/30',
    colorHex: '#78716c',
    gradientClass: 'from-stone-500 via-stone-700 to-slate-900',
    iconEmoji: '🌫️',
    primaryNeed: 'Abschalten des ständigen inneren Kontrollmonitors.',
    whyAndReason: 'Dein Jungfrau-Mond sorgt sich schnell um Gesundheit und Perfektion. Rauchquarz saugt mentale Spannungen ab und erdet deine Gefühle verlässlich.',
    supportEffects: ['Löst psychosomatische Bauchspannungen', 'Befreit von Zukunftsängsten', 'Fördert pragmatische Gelassenheit'],
    practicalApplication: 'In den Händen halten, wenn Sorgen auftauchen.',
    cleansingMethod: 'Mit Hämatit entladen und mit Bergkristall aufladen.'
  },
  libra: {
    name: 'Rosa Andenopal',
    mineralFamily: 'Amorpher Quarz',
    chakra: 'Herzchakra',
    chakraColor: 'text-pink-300 bg-pink-500/10 border-pink-500/30',
    colorHex: '#f472b6',
    gradientClass: 'from-pink-400 via-rose-300 to-indigo-300',
    iconEmoji: '💗',
    primaryNeed: 'Seelische Unabhängigkeit von der Stimmung der Mitmenschen.',
    whyAndReason: 'Dein Waage-Mond leidet, wenn Disharmonie im Raum steht. Rosa Andenopal stärkt deine eigene emotionale Mitte, damit du dich nicht verlierst.',
    supportEffects: ['Löst Beziehungs-Verlustängste', 'Bringt sanfte Herzensruhe', 'Unterstützt liebevolles Grenzen-Setzen'],
    practicalApplication: 'Als Schmuckstein direkt auf der Haut tragen.',
    cleansingMethod: 'Nicht in die Sonne legen, sondern auf Amethyst regenerieren.'
  },
  scorpio: {
    name: 'Schwarzer Turmalin (Schörl)',
    mineralFamily: 'Ringsilikat',
    chakra: 'Wurzel- & Basischakra',
    chakraColor: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
    colorHex: '#1e293b',
    gradientClass: 'from-slate-800 via-slate-900 to-black',
    iconEmoji: '🖤',
    primaryNeed: 'Sicherer Raum zum Loslassen alter emotionaler Altlasten.',
    whyAndReason: 'Dein Skorpion-Mond fühlt mit extremer Intensität und hält seelische Wunden lange fest. Schörl neutralisiert negative Schwingungen und transformiert Schatten.',
    supportEffects: ['Baut energetische Schutzmauern auf', 'Löst Fixierungen und Groll auf', 'Schenkt tiefe emotionale Regeneration'],
    practicalApplication: 'In den 4 Ecken des Schlafzimmers oder als Schutzstein bei dir tragen.',
    cleansingMethod: 'Unter fließendem kaltem Wasser reinigen.'
  },
  sagittarius: {
    name: 'Lepidolith (Lithium-Glimmer)',
    mineralFamily: 'Schichtsilikat',
    chakra: 'Herz- & Kronenchakra',
    chakraColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    colorHex: '#c084fc',
    gradientClass: 'from-purple-400 via-pink-400 to-indigo-600',
    iconEmoji: '💜',
    primaryNeed: 'Emotionale Erdung bei Rastlosigkeit und Fluchtreflexen.',
    whyAndReason: 'Dein Schütze-Mond möchte vor schweren Gefühlen am liebsten davonlaufen. Das natürliche Lithium im Lepidolith beruhigt seelische Fluchtmuster sanft.',
    supportEffects: ['Befreit von emotionalen Hoch-Tief-Schwankungen', 'Fördert innere Einkehr', 'Schenkt Zuversicht in Krisen'],
    practicalApplication: 'Vor der Meditation in die Hände nehmen.',
    cleansingMethod: 'Auf Bergkristall aufladen (kein langes Wasserbad).'
  },
  capricorn: {
    name: 'Granat (Almandin)',
    mineralFamily: 'Inselsilikat',
    chakra: 'Wurzel- & Herzchakra',
    chakraColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    colorHex: '#991b1b',
    gradientClass: 'from-red-800 via-rose-900 to-black',
    iconEmoji: '🍷',
    primaryNeed: 'Auftauen emotionaler Kälte und Zulassen von Verletzlichkeit.',
    whyAndReason: 'Dein Steinbock-Mond schützt sein weiches Herz durch eiserne Selbstdisziplin. Der feurige Granat wärmt die Seele und erinnert dich daran, dass du geliebt wirst.',
    supportEffects: ['Löst emotionale Einsamkeit', 'Aktiviert das Ur-Vertrauen ins Leben', 'Verleiht unzerstörbare Seelenkraft'],
    practicalApplication: 'In Phasen von Erschöpfung oder Mutlosigkeit tragen.',
    cleansingMethod: 'In der Morgensonne aufladen.'
  },
  aquarius: {
    name: 'Selenit (Marienglas)',
    mineralFamily: 'Gips-Kristall',
    chakra: 'Kronen- & Seelensternchakra',
    chakraColor: 'text-cyan-200 bg-cyan-500/10 border-cyan-500/30',
    colorHex: '#e0f2fe',
    gradientClass: 'from-white via-cyan-100 to-indigo-200',
    iconEmoji: '🕊️',
    primaryNeed: 'Emotionale Nähe ohne das Gefühl von Freiheitsverlust.',
    whyAndReason: 'Dein Wassermann-Mond distanziert sich oft unbewusst von tiefen Bindungen, um unabhängig zu bleiben. Selenit öffnet eine lichtvolle Seelenebene, die Freiheit mit Liebe vereint.',
    supportEffects: ['Reinigt die Aura von schweren Schwingungen', 'Löst Bindungsängste sanft auf', 'Fördert kosmischen Seelenfrieden'],
    practicalApplication: 'Im Wohn- oder Schlafbereich als Lichtsäule aufstellen.',
    cleansingMethod: 'Niemals mit Wasser reinigen (wasserlöslich!); im Vollmondlicht klären.'
  },
  pisces: {
    name: 'Aquamarin (Meeresstein)',
    mineralFamily: 'Beryll-Gruppe',
    chakra: 'Hals- & Herzchakra',
    chakraColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
    colorHex: '#2dd4bf',
    gradientClass: 'from-teal-400 via-cyan-500 to-blue-600',
    iconEmoji: '🌊',
    primaryNeed: 'Klarheit im Seelenozean und Schutz vor Fremd-Emotionen.',
    whyAndReason: 'Dein Fische-Mond nimmt fremde Gefühle ungefiltert wie ein Schwamm auf. Aquamarin wirkt wie ein klärender Gebirgsbach: Er wäscht Fremdenergien ab und bringt Reinheit.',
    supportEffects: ['Stoppt emotionales Ausgelaugtsein', 'Klärt Verwirrung und diffuse Ängste', 'Stärkt die mediale Wahrnehmung'],
    practicalApplication: 'Als Halskette tragen, um deine Seelengrenze zu sichern.',
    cleansingMethod: 'Unter fließendem kaltem Quellwasser spülen.'
  }
};

// 3. Ascendant Stones (Aura Shield & Physical Embodiment)
const ASCENDANT_STONES: Record<string, Omit<HealingStone, 'role'>> = {
  aries: {
    name: 'Hämatit & Roter Karneol',
    mineralFamily: 'Eisenoxid & Quarz',
    chakra: 'Wurzelchakra',
    chakraColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    colorHex: '#b91c1c',
    gradientClass: 'from-slate-700 via-red-700 to-amber-600',
    iconEmoji: '🛡️',
    primaryNeed: 'Standfeste Erdung und magnetische Ausstrahlung im Alltag.',
    whyAndReason: 'Dein Widder-Aszendent tritt kraftvoll und dynamisch in die Welt. Hämatit erdet diese Feuerenergie im physischen Körper und schützt vor energetischer Verausgabung.',
    supportEffects: ['Stärkt das Immunsystem und die Aura', 'Verhindert vorschnelle Konflikte', 'Verankert entschlossene Tatkraft'],
    practicalApplication: 'Als Armband am linken Handgelenk tragen.',
    cleansingMethod: 'Mit Bergkristall entladen; kein Salzwasser.'
  },
  taurus: {
    name: 'Baumachat & Versteinertes Holz',
    mineralFamily: 'Quarz / Fossile Kieselsäure',
    chakra: 'Wurzel- & Herzchakra',
    chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    colorHex: '#047857',
    gradientClass: 'from-emerald-700 via-stone-600 to-amber-900',
    iconEmoji: '🌳',
    primaryNeed: 'Tiefe Naturverbundenheit und Schutz vor Hektik von außen.',
    whyAndReason: 'Dein Stier-Aszendent verströmt Ruhe und Beständigkeit. Baumachat verstärkt deine natürliche Anziehungskraft und schirmt dich gegen die Schnelllebigkeit der Umwelt ab.',
    supportEffects: ['Fördert Geduld und Ausdauer', 'Verbindet mit den Kräften der Natur', 'Schenkt körperliche Widerstandskraft'],
    practicalApplication: 'In der Hosentasche tragen oder bei Gartenarbeit/Naturspaziergängen.',
    cleansingMethod: 'Auf der feuchten Erde entladen und in der Morgensonne aufladen.'
  },
  gemini: {
    name: 'Tigerauge & Blauquarz',
    mineralFamily: 'Faseriger Quarz',
    chakra: 'Solarplexus & Halschakra',
    chakraColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    colorHex: '#ca8a04',
    gradientClass: 'from-amber-600 via-yellow-700 to-stone-800',
    iconEmoji: '👁️',
    primaryNeed: 'Schutz vor mentaler Erschöpfung bei regem Austausch.',
    whyAndReason: 'Dein Zwillinge-Aszendent begegnet der Welt mit wacher Neugier. Tigerauge wirkt wie ein Schutzschild gegen Reizüberflutung und schärft deinen Fokus.',
    supportEffects: ['Schützt das Energiefeld bei Menschenansammlungen', 'Bündelt mentale Konzentration', 'Verleiht Durchblick bei Verhandlungen'],
    practicalApplication: 'Als Taschenstein bei Meetings oder Reisen.',
    cleansingMethod: 'Unter lauwarmem Wasser spülen und in der Sonne aufladen.'
  },
  cancer: {
    name: 'Labradorit (Der Schutzkristall)',
    mineralFamily: 'Plagioklas-Feldspat',
    chakra: 'Herz- & Stirnchakra',
    chakraColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    colorHex: '#4f46e5',
    gradientClass: 'from-slate-700 via-indigo-600 to-teal-500',
    iconEmoji: '🌌',
    primaryNeed: 'Schutz der sensiblen Aura vor negativen Schwingungen.',
    whyAndReason: 'Dein Krebs-Aszendent wirkt sanft und empathisch, wodurch du oft ungefiltert die Stimmungen deines Umfelds aufnimmst. Labradorit schließt Risse in der Aura und reflektiert Fremdenergien.',
    supportEffects: ['Baut einen schillernden Schutzschild um die Aura auf', 'Verhindert energetisches Ausgelaugtsein', 'Stärkt die Intuition bei Erstbegegnungen'],
    practicalApplication: 'Als Anhänger tragen, wenn du unter viele Menschen gehst.',
    cleansingMethod: 'Regelmäßig mit kaltem Quellwasser reinigen und im Mondlicht aufladen.'
  },
  leo: {
    name: 'Pyrit & Karneol',
    mineralFamily: 'Eisendisulfid & Chalcedon',
    chakra: 'Solarplexus & Sakralchakra',
    chakraColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    colorHex: '#d97706',
    gradientClass: 'from-yellow-400 via-amber-500 to-stone-700',
    iconEmoji: '✨',
    primaryNeed: 'Magnetische Souveränität ohne Selbstzweifel.',
    whyAndReason: 'Dein Löwe-Aszendent zieht Blicke magisch an. Pyrit (Katzengold) stärkt deine natürliche Strahlkraft und schützt vor Neid und Missgunst.',
    supportEffects: ['Stärkt das charismatische Auftreten', 'Schützt vor energetischem Neid anderer', 'Fördert mutige Selbstverwirklichung'],
    practicalApplication: 'Auf dem Schreibtisch oder als Brosche tragen.',
    cleansingMethod: 'Trocken auf Hämatit entladen (nicht mit Wasser reinigen).'
  },
  virgo: {
    name: 'Fluorit (Der Kristall der Ordnung)',
    mineralFamily: 'Halogenid',
    chakra: 'Stirn- & Halschakra',
    chakraColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
    colorHex: '#0d9488',
    gradientClass: 'from-purple-500 via-teal-400 to-emerald-600',
    iconEmoji: '💎',
    primaryNeed: 'Schutz vor Reizchaos und mentaler Überforderung.',
    whyAndReason: 'Dein Jungfrau-Aszendent registriert feinste Unstimmigkeiten in der Umgebung. Fluorit strukturiert das Aurafeld und schützt vor energetischem Durcheinander.',
    supportEffects: ['Befreit von mentaler Überlastung', 'Fördert systematische Klarheit', 'Stärkt das analytische Urteilsvermögen'],
    practicalApplication: 'Beim konzentrierten Arbeiten vor dir aufstellen.',
    cleansingMethod: 'Unter fließendem lauwarmem Wasser abspülen.'
  },
  libra: {
    name: 'Aventurin & Jade',
    mineralFamily: 'Quarz-Gruppe & Nephrit',
    chakra: 'Herzchakra',
    chakraColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    colorHex: '#10b981',
    gradientClass: 'from-emerald-500 via-teal-400 to-green-700',
    iconEmoji: '🌿',
    primaryNeed: 'Ausstrahlung von Harmonie und innerem Gleichgewicht.',
    whyAndReason: 'Dein Waage-Aszendent tritt charmant, diplomatisch und verbindend auf. Aventurin bewahrt deine innere Ruhe in herausfordernden Begegnungen.',
    supportEffects: ['Fördert sympathische, herzliche Kontakte', 'Befreit von innerer Nervosität vor Auftritten', 'Zieht harmonische Beziehungen an'],
    practicalApplication: 'Als Armband oder Kette bei gesellschaftlichen Anlässen tragen.',
    cleansingMethod: 'Auf Bergkristall-Spitzen aufladen.'
  },
  scorpio: {
    name: 'Schwarzer Obsidian & Turmalinquarz',
    mineralFamily: 'Vulkanit & Quarz mit Schörl',
    chakra: 'Wurzelchakra',
    chakraColor: 'text-slate-200 bg-slate-500/10 border-slate-500/30',
    colorHex: '#0f172a',
    gradientClass: 'from-black via-slate-900 to-indigo-950',
    iconEmoji: '🔮',
    primaryNeed: 'Undurchdringlicher Schutz vor Manipulation und Projektionen.',
    whyAndReason: 'Dein Skorpion-Aszendent wirkt intensiv und geheimnisvoll, was starke Reaktionen im Umfeld auslösen kann. Obsidian wirft Fremdprojektionen ab und hält dein Energiefeld sauber.',
    supportEffects: ['Schneidet ungesunde energetische Verstrickungen ab', 'Macht unempfindlich gegen Neid und Intrigen', 'Verleiht unerschütterliche Präsenz'],
    practicalApplication: 'Als Taschenstein oder Schutzamulett tragen.',
    cleansingMethod: 'Regelmäßig unter kaltem fließendem Wasser entladen.'
  },
  sagittarius: {
    name: 'Türkis (Schutzstein der Reisenden)',
    mineralFamily: 'Wasserhaltiges Kupfer-Aluminium-Phosphat',
    chakra: 'Hals- & Herzchakra',
    chakraColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    colorHex: '#06b6d4',
    gradientClass: 'from-teal-500 via-cyan-600 to-blue-700',
    iconEmoji: '🏹',
    primaryNeed: 'Schutz auf Reisen und charismatische Horizonterweiterung.',
    whyAndReason: 'Dein Schütze-Aszendent geht mit Optimismus und Weite auf die Welt zu. Türkis gilt seit Jahrtausenden als mächtiger Schutzstein für Reisende und Suchende.',
    supportEffects: ['Schützt vor Gefahren und Unfällen unterwegs', 'Stärkt die Kommunikation eigener Überzeugungen', 'Fördert glückliche Fügungen und Kontakte'],
    practicalApplication: 'Auf allen Reisen und wichtigen Wegen im Gepäck oder am Körper tragen.',
    cleansingMethod: 'Vorsichtig auf Amethyst reinigen; kein aggressives Wasser oder Parfüm.'
  },
  capricorn: {
    name: 'Onyx & Falkenauge',
    mineralFamily: 'Chalcedon & Krokydolith-Quarz',
    chakra: 'Wurzel- & Stirnchakra',
    chakraColor: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
    colorHex: '#334155',
    gradientClass: 'from-slate-900 via-slate-700 to-indigo-900',
    iconEmoji: '🦅',
    primaryNeed: 'Standfestigkeit, Durchsetzungsvermögen und Weitblick.',
    whyAndReason: 'Dein Steinbock-Aszendent strahlt Respekt, Kompetenz und Ernsthaftigkeit aus. Falkenauge verleiht dir den Adlerblick, um über den Dingen zu stehen.',
    supportEffects: ['Schützt vor Intrigen und Konkurrenzdruck', 'Fördert nüchternen, strategischen Weitblick', 'Verleiht unerschütterliches Standvermögen'],
    practicalApplication: 'Bei Verhandlungen oder geschäftlichen Terminen tragen.',
    cleansingMethod: 'Mit Hämatit entladen und in der Morgensonne aufladen.'
  },
  aquarius: {
    name: 'Apatit & Fluorit',
    mineralFamily: 'Phosphat & Halogenid',
    chakra: 'Hals- & Drittes Auge',
    chakraColor: 'text-sky-300 bg-sky-500/10 border-sky-500/30',
    colorHex: '#0284c7',
    gradientClass: 'from-sky-500 via-cyan-600 to-blue-800',
    iconEmoji: '⚡',
    primaryNeed: 'Inspiration und freier Ausdruck deiner Individualität.',
    whyAndReason: 'Dein Wassermann-Aszendent tritt originell, unabhängig und zukunftsorientiert auf. Apatit regt deine Schöpferkraft an und befreit von Konformitätszwang.',
    supportEffects: ['Löst Zögerlichkeit und Selbstzensur', 'Fördert innovativen Gedankenreichtum', 'Schützt deine Aura vor Starrsinn der Umwelt'],
    practicalApplication: 'Als Kettenanhänger am Hals tragen.',
    cleansingMethod: 'Unter fließendem lauwarmem Wasser abspülen.'
  },
  pisces: {
    name: 'Amethyst & Labradorit',
    mineralFamily: 'Violetter Quarz & Feldspat',
    chakra: 'Kronen- & Seelentor-Chakra',
    chakraColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    colorHex: '#9333ea',
    gradientClass: 'from-purple-700 via-indigo-600 to-teal-600',
    iconEmoji: '🛡️',
    primaryNeed: 'Höchster aurischer Schutzschirm für feinstoffliche Seelen.',
    whyAndReason: 'Dein Fische-Aszendent begegnet der Welt mit offener Seele und spürt jede Schwingung. Amethyst und Labradorit bilden zusammen den stärksten Schutzmantel gegen energetische Verschmutzung.',
    supportEffects: ['Errichtet eine undurchdringliche Schutzaura', 'Filtert fremde Schwere ab, bevor sie dich erreicht', 'Stärkt deine mystische Strahlkraft'],
    practicalApplication: 'Täglich tragen, besonders an öffentlichen Orten.',
    cleansingMethod: 'Im Mondlicht reinigen und auf Bergkristall aufladen.'
  }
};

// 4. Chiron Stones (Soul Wound Transformation & Medicine)
const CHIRON_STONES: Record<string, Omit<HealingStone, 'role'>> = {
  aries: {
    name: 'Rubellit (Roter Turmalin)',
    mineralFamily: 'Ringsilikat',
    chakra: 'Herz- & Wurzelchakra',
    chakraColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    colorHex: '#e11d48',
    gradientClass: 'from-rose-600 to-pink-900',
    iconEmoji: '❤️‍🩹',
    primaryNeed: 'Heilung der Wunde, "nicht stark genug sein zu dürfen".',
    whyAndReason: 'Chiron im Widder trägt oft den Schmerz verhinderter Durchsetzung oder das Gefühl, um die eigene Existenzberechtigung kämpfen zu müssen. Rubellit heilt das Herz und erweckt friedvollen Mut.',
    supportEffects: ['Wandelt unterdrückten Zorn in liebevolle Kraft', 'Heilt das Gefühl mangelnder Lebensberechtigung', 'Erweckt die Heilergabe für Entmutigte'],
    practicalApplication: 'Bei Meditationen auf die Herzmitte legen.',
    cleansingMethod: 'Auf Amethyst reinigen.'
  },
  taurus: {
    name: 'Malachit & Chrysopras',
    mineralFamily: 'Carbonat & Quarz',
    chakra: 'Herzchakra',
    chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    colorHex: '#059669',
    gradientClass: 'from-emerald-600 to-teal-800',
    iconEmoji: '💚',
    primaryNeed: 'Heilung der Selbstwert- und Verlustwunde.',
    whyAndReason: 'Chiron im Stier kennt die Angst vor existenziellem Mangel oder mangelnder Wertschätzung des Körpers. Chrysopras öffnet das Bewusstsein für unzerstörbare göttliche Fülle.',
    supportEffects: ['Heilt alte Armuts- und Mangelmuster', 'Stärkt die Liebe zum eigenen physischen Körper', 'Verwandelt Verlustangst in Urvertrauen'],
    practicalApplication: 'Als Taschenstein bei dir tragen.',
    cleansingMethod: 'Mit Quellwasser reinigen.'
  },
  gemini: {
    name: 'Blauer Topas & Dumortierit',
    mineralFamily: 'Inselsilikat & Borosilikat',
    chakra: 'Hals- & Drittes Auge',
    chakraColor: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
    colorHex: '#3b82f6',
    gradientClass: 'from-blue-500 to-indigo-700',
    iconEmoji: '🗣️',
    primaryNeed: 'Heilung von Sprach-, Ausdrucks- und Missverständnis-Wunden.',
    whyAndReason: 'Chiron in den Zwillingen trug oft das Gefühl, "nicht klug genug" zu sein oder missverstanden zu werden. Blauer Topas befreit die Stimme und schenkt Weisheit beim Kommunizieren.',
    supportEffects: ['Löst Sprechblockaden und Prüfungsangst', 'Verleiht Mut zur eigenen intellektuellen Wahrheit', 'Macht dich zum einfühlsamen Vermittler'],
    practicalApplication: 'Vor Vorträgen oder Schreibphasen in der Hand halten.',
    cleansingMethod: 'Im Morgenlicht aufladen.'
  },
  cancer: {
    name: 'Pinkfarbener Turmalin & Rhodonit',
    mineralFamily: 'Turmalin-Gruppe',
    chakra: 'Herzchakra',
    chakraColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    colorHex: '#ec4899',
    gradientClass: 'from-pink-500 to-rose-700',
    iconEmoji: '🤱',
    primaryNeed: 'Heilung der Urvertrauens-, Mutter- und Geborgenheitswunde.',
    whyAndReason: 'Chiron im Krebs trägt tiefen Schmerz bezüglich familiärer Kälte oder emotionaler Zurückweisung. Pinker Turmalin flutet das Seelenfeld mit bedingungsloser Liebe.',
    supportEffects: ['Schließt tiefe Risse im seelischen Schutzmantel', 'Löst Ahnenmuster mütterlicher Entbehrung', 'Befähigt dich, anderen tiefsten Trost zu schenken'],
    practicalApplication: 'Nachts am Körper tragen oder auf das Herzchakra legen.',
    cleansingMethod: 'Auf Selenit aufladen.'
  },
  leo: {
    name: 'Citrin & Granat',
    mineralFamily: 'Quarz & Granat',
    chakra: 'Solarplexus & Herz',
    chakraColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    colorHex: '#f59e0b',
    gradientClass: 'from-amber-500 to-red-600',
    iconEmoji: '👑',
    primaryNeed: 'Heilung der Wunde von Scham, Spott und Unsichtbarkeit.',
    whyAndReason: 'Chiron im Löwen erlebte oft Kritik für seine Kreativität oder wurde beschämt, wenn er leuchtete. Citrin verbrennt alte Scham und ermutigt dich, wieder die Bühne deines Lebens zu betreten.',
    supportEffects: ['Befreit von Versagensangst und Lampenfieber', 'Heilt die Angst vor Zurückweisung des Talents', 'Erweckt ermutigende Führungskraft für andere'],
    practicalApplication: 'Vor öffentlichen Schritten auf den Solarplexus legen.',
    cleansingMethod: 'In der Mittagssonne aufladen.'
  },
  virgo: {
    name: 'Peridot (Olivin)',
    mineralFamily: 'Inselsilikat',
    chakra: 'Herz- & Solarplexus',
    chakraColor: 'text-lime-300 bg-lime-500/10 border-lime-500/30',
    colorHex: '#84cc16',
    gradientClass: 'from-lime-500 to-emerald-700',
    iconEmoji: '🌱',
    primaryNeed: 'Heilung der Unzulänglichkeits- und Selbstkasteiungs-Wunde.',
    whyAndReason: 'Chiron in der Jungfrau fühlt sich chronisch "unvollkommen" oder leidet unter Schuldgefühlen. Peridot löst toxische Selbstkritik auf und bringt seelische Reinigung.',
    supportEffects: ['Löst zwanghaften Perfektionismus und Groll', 'Heilt psychosomatische Anspannungen', 'Macht dich zum wahren Meister ganzheitlicher Heilung'],
    practicalApplication: 'Als Anhänger tragen oder bei der Meditation.',
    cleansingMethod: 'Unter fließendem Quellwasser spülen.'
  },
  libra: {
    name: 'Rhodochrosit (Himbeerspat)',
    mineralFamily: 'Mangancarbonat',
    chakra: 'Herzchakra',
    chakraColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    colorHex: '#f43f5e',
    gradientClass: 'from-rose-500 to-pink-700',
    iconEmoji: '💞',
    primaryNeed: 'Heilung von Beziehungsenttäuschungen und Verlustängsten.',
    whyAndReason: 'Chiron in der Waage trägt Narben aus unfairen Partnerschaften oder der Angst vor Alleinsein. Rhodochrosit lehrt dich, dich selbst so tief zu lieben, dass du nie wieder faule Kompromisse eingehst.',
    supportEffects: ['Heilt seelische Wunden aus Trennungen', 'Löst Co-Abhängigkeit und Gefallsucht', 'Zieht wahrhaft gleichwertige Seelenpartner an'],
    practicalApplication: 'Auf das Herzchakra legen und vergebende Gedanken senden.',
    cleansingMethod: 'Vorsichtig trocken mit Bergkristall aufladen.'
  },
  scorpio: {
    name: 'Dioptas & Kunzit',
    mineralFamily: 'Ringsilikat & Spodumen',
    chakra: 'Herz- & Kronenchakra',
    chakraColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    colorHex: '#14b8a6',
    gradientClass: 'from-teal-600 via-emerald-800 to-purple-900',
    iconEmoji: '🦅',
    primaryNeed: 'Heilung von Verrat, Traumata und Todesängsten.',
    whyAndReason: 'Chiron im Skorpion kennt existenzielle Abgründe, Verrat oder Kontrollverlust. Der smaragdgrüne Dioptas ist der kraftvollste Vergebungsstein: Er verwandelt tiefste Wunden in pure Weisheit.',
    supportEffects: ['Befreit von alten Rache- und Ohnmachtsgefühlen', 'Ermöglicht schmerzfreie emotionale Wiedergeburt', 'Verleiht die Gabe schamanischer Tiefenheilung'],
    practicalApplication: 'Bei tiefer Heilarbeit auf das Herz legen.',
    cleansingMethod: 'Auf Amethyst-Druse regenerieren.'
  },
  sagittarius: {
    name: 'Iolith (Wassersaphir)',
    mineralFamily: 'Ringsilikat (Cordierit)',
    chakra: 'Drittes Auge & Kronenchakra',
    chakraColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    colorHex: '#6366f1',
    gradientClass: 'from-indigo-600 to-blue-900',
    iconEmoji: '🧭',
    primaryNeed: 'Heilung von Sinnkrisen, Glaubensverlust und Desillusionierung.',
    whyAndReason: 'Chiron im Schützen litt unter dem Zerbrechen von Idealen oder falschen Gurus. Iolith ist der "Kompass-Stein", der dich zurück zu deinem eigenen inneren Seelenkompass führt.',
    supportEffects: ['Heilt Enttäuschungen durch Dogmen und Heuchelei', 'Schenkt authentische spirituelle Einsicht', 'Führt dich zur wahren Lebensmission'],
    practicalApplication: 'Bei Meditationen über Sinnfragen in der Hand halten.',
    cleansingMethod: 'Im Sternenlicht aufladen.'
  },
  capricorn: {
    name: 'Bronzit & Bergkristall',
    mineralFamily: 'Kettensilikat & Quarz',
    chakra: 'Wurzel- & Solarplexus',
    chakraColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    colorHex: '#b45309',
    gradientClass: 'from-stone-700 via-amber-800 to-black',
    iconEmoji: '🛡️',
    primaryNeed: 'Heilung von Überforderung durch frühe Härte und Pflichterfüllung.',
    whyAndReason: 'Chiron im Steinbock musste oft viel zu früh erwachsen sein und trug schwere Verantwortung. Bronzit schenkt innere Gelassenheit und befreit vom Zwang, alles allein tragen zu müssen.',
    supportEffects: ['Löst chronischen Leistungs- und Versagensdruck', 'Gibt Gelassenheit in stürmischen Phasen', 'Macht dich zum weisen Mentor für andere'],
    practicalApplication: 'Als Begleiter bei beruflichen Herausforderungen.',
    cleansingMethod: 'Unter fließendem Wasser entladen.'
  },
  aquarius: {
    name: 'Sugilith (Luvulith)',
    mineralFamily: 'Ringsilikat',
    chakra: 'Drittes Auge & Kronenchakra',
    chakraColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    colorHex: '#a855f7',
    gradientClass: 'from-purple-700 via-pink-600 to-slate-900',
    iconEmoji: '🔮',
    primaryNeed: 'Heilung der Außenseiter-Wunde ("Ich passe nicht in diese Welt").',
    whyAndReason: 'Chiron im Wassermann fühlte sich oft fremd, unverstanden oder von der Gemeinschaft ausgestoßen. Sugilith gilt als der Seelenstein für Pioniere: Er verankert dein kosmisches Licht sanft auf der Erde.',
    supportEffects: ['Heilt die Einsamkeit des Andersseins', 'Schützt hochsensible Visionäre vor Härte der Welt', 'Befähigt zur Gründung heilsamer Gemeinschaften'],
    practicalApplication: 'Als Anhänger nahe der Kehle oder Stirn tragen.',
    cleansingMethod: 'Auf Amethyst reinigen; kein direktes Sonnenlicht.'
  },
  pisces: {
    name: 'Charoit & Selenit',
    mineralFamily: 'Kettensilikat',
    chakra: 'Kronenchakra',
    chakraColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    colorHex: '#c084fc',
    gradientClass: 'from-purple-600 via-indigo-700 to-slate-900',
    iconEmoji: '💜',
    primaryNeed: 'Heilung von Weltschmerz, Opferrollen und Grenzlosigkeit.',
    whyAndReason: 'Chiron in den Fischen spürt das Leiden der ganzen Welt und neigt zur seelischen Selbstaufgabe. Charoit verleiht mutige Unterscheidungskraft, um Mitgefühl ohne Mitleiden zu leben.',
    supportEffects: ['Befreit von übernommener Schuld und Weltschmerz', 'Löst unbewusste Selbstsabotage-Muster auf', 'Macht dich zum kraftvollen Kanal spiritueller Heilung'],
    practicalApplication: 'Vor dem Einschlafen auf das Stirnchakra legen.',
    cleansingMethod: 'Im Mondlicht reinigen.'
  }
};

// 5. Element Balance Stones (Restoring Equilibrium)
function getElementBalanceStone(balance: CompleteNatalChart['balance']): HealingStone {
  const elements = [
    { name: 'Feuer', count: balance.elements.fire.count, icon: '🔥', stone: {
      name: 'Roter Karneol',
      mineralFamily: 'Oxid / Chalcedon',
      chakra: 'Sakral- & Wurzelchakra',
      chakraColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      colorHex: '#ea580c',
      gradientClass: 'from-red-500 via-orange-500 to-amber-600',
      iconEmoji: '🔥',
      primaryNeed: 'Aktivierung von Lebensfreude, Antriebskraft und Mut zur Initiative.',
      whyAndReason: 'In deinem Radix ist das Element FEUER unterrepräsentiert. Karneol entfacht dein inneres Feuer, besiegt Zögerlichkeit und schenkt Begeisterung für das Leben.',
      supportEffects: ['Gibt Schwung bei Trägheit und Motivationslöchern', 'Stärkt die Verdauung und körperliche Wärme', 'Fördert Selbstvertrauen und Tatendrang'],
      practicalApplication: 'Morgens in der linken Hosentasche tragen.',
      cleansingMethod: 'In der Morgensonne aufladen.'
    }},
    { name: 'Erde', count: balance.elements.earth.count, icon: '🌍', stone: {
      name: 'Moosachat & Schwarzer Turmalin',
      mineralFamily: 'Quarz / Ringsilikat',
      chakra: 'Wurzelchakra',
      chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      colorHex: '#15803d',
      gradientClass: 'from-emerald-700 via-stone-700 to-slate-900',
      iconEmoji: '🌍',
      primaryNeed: 'Bodenständige Verankerung, Realitätssinn und Stressresistenz.',
      whyAndReason: 'In deinem Radix ist das Element ERDE unterrepräsentiert. Moosachat verbindet dich mit der nährenden Kraft von Mutter Erde und hilft, Ideen in greifbare Realität umzusetzen.',
      supportEffects: ['Schützt vor Zerfahrenheit und Tagträumerei', 'Fördert praktischen Erfolg und Disziplin', 'Schenkt innere Ruhe bei Hektik'],
      practicalApplication: 'Beim Spaziergang barfuß oder mit Stein in der Hand.',
      cleansingMethod: 'Auf der Erde oder unter Quellwasser reinigen.'
    }},
    { name: 'Luft', count: balance.elements.air.count, icon: '💨', stone: {
      name: 'Fluorit & Sodalith',
      mineralFamily: 'Halogenid & Gerüstsilikat',
      chakra: 'Hals- & Stirnchakra',
      chakraColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      colorHex: '#0284c7',
      gradientClass: 'from-cyan-500 via-blue-600 to-purple-600',
      iconEmoji: '💨',
      primaryNeed: 'Geistige Weite, Kommunikationsfluss und objektiver Weitblick.',
      whyAndReason: 'In deinem Radix ist das Element LUFT unterrepräsentiert. Fluorit bringt frischen Wind in festgefahrene Denkmuster und erleichtert den leichten Austausch mit anderen.',
      supportEffects: ['Fördert das Lernen und Verstehen komplexer Zusammenhänge', 'Löst stures Beharren auf festen Meinungen', 'Erleichtert unbeschwerte Gespräche'],
      practicalApplication: 'Auf den Schreibtisch oder Leseplatz stellen.',
      cleansingMethod: 'Unter fließendem lauwarmem Wasser abspülen.'
    }},
    { name: 'Wasser', count: balance.elements.water.count, icon: '💧', stone: {
      name: 'Mondstein & Aquamarin',
      mineralFamily: 'Feldspat & Beryll',
      chakra: 'Herz- & Sakralchakra',
      chakraColor: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
      colorHex: '#38bdf8',
      gradientClass: 'from-blue-400 via-teal-400 to-purple-400',
      iconEmoji: '💧',
      primaryNeed: 'Zugang zur eigenen Gefühlswelt, Empathie und seelische Weichheit.',
      whyAndReason: 'In deinem Radix ist das Element WASSER unterrepräsentiert. Mondstein hilft, den Kopf auszuschalten und den Signalen deines Herzens und deiner Intuition zu vertrauen.',
      supportEffects: ['Öffnet für zärtliche Nähe und Mitgefühl', 'Löst emotionale Härte und Verstandes-Kontrolle', 'Fördert erholsamen, seelischen Schlaf'],
      practicalApplication: 'Vor dem Schlafen auf die Herzgegend legen.',
      cleansingMethod: 'Im Mondlicht aufladen.'
    }}
  ];

  // Sort by lowest element count to find deficit
  elements.sort((a, b) => a.count - b.count);
  const weakest = elements[0];

  return {
    ...weakest.stone,
    role: `Elemente-Ausgleichsstein (${weakest.name}-Defizit ausgleichen)`
  };
}

// 6. Karmic Evolution Stones (North Node Growth)
function getKarmicEvolutionStone(northNodeSign: string): HealingStone {
  const nodeStones: Record<string, Omit<HealingStone, 'role'>> = {
    aries: {
      name: 'Roter Jaspis & Rubin',
      mineralFamily: 'Quarz / Korund',
      chakra: 'Wurzel- & Herzchakra',
      chakraColor: 'text-red-400 bg-red-500/10 border-red-500/30',
      colorHex: '#dc2626',
      gradientClass: 'from-red-600 to-rose-900',
      iconEmoji: '⚔️',
      primaryNeed: 'Mut, allein voranzugehen und die eigene Wahrheit zu leben.',
      whyAndReason: 'Dein Nordknoten im Widder fordert dich auf, die Komfortzone ständiger Anpassung (Südknoten Waage) zu verlassen und mutig deine eigene Führungsrolle einzunehmen.',
      supportEffects: ['Stärkt gesunden Egoismus und Durchsetzung', 'Löst Entscheidungslähmung auf', 'Gibt Pioniergeist'],
      practicalApplication: 'Morgens in die Hand nehmen und Affirmation sprechen.',
      cleansingMethod: 'In der Morgensonne aufladen.'
    },
    taurus: {
      name: 'Smaragd & Rhodonit',
      mineralFamily: 'Beryll & Silikat',
      chakra: 'Herzchakra',
      chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      colorHex: '#10b981',
      gradientClass: 'from-emerald-600 to-teal-800',
      iconEmoji: '🌱',
      primaryNeed: 'Aufbau von Seelenfrieden und friedlicher Beständigkeit.',
      whyAndReason: 'Dein Nordknoten im Stier ruft dich weg von ständigen Krisen und emotionalen Dramen (Südknoten Skorpion) hin zu geerdeter Ruhe, Selbstwert und Genuss.',
      supportEffects: ['Beruhigt das Nervensystem nachhaltig', 'Fördert materiellen und seelischen Wohlstand', 'Schenkt Vertrauen ins Leben'],
      practicalApplication: 'In der Natur bei dir tragen.',
      cleansingMethod: 'Unter fließendem Quellwasser spülen.'
    },
    gemini: {
      name: 'Blauer Chalcedon & Citrin',
      mineralFamily: 'Quarz-Gruppe',
      chakra: 'Hals- & Solarplexus',
      chakraColor: 'text-sky-300 bg-sky-500/10 border-sky-500/30',
      colorHex: '#0ea5e9',
      gradientClass: 'from-sky-400 to-amber-500',
      iconEmoji: '💬',
      primaryNeed: 'Offene Neugier, Zuhören und unvoreingenommener Austausch.',
      whyAndReason: 'Dein Nordknoten in den Zwillingen lädt dich ein, starre Dogmen und Rechthaberei (Südknoten Schütze) loszulassen und neugierig Fragen zu stellen.',
      supportEffects: ['Fördert lebendige Kommunikation', 'Befreit von Besserwisserei', 'Erleichtert das Knüpfen von Kontakten'],
      practicalApplication: 'Vor Gesprächen in der Hand halten.',
      cleansingMethod: 'Auf Amethyst aufladen.'
    },
    cancer: {
      name: 'Weißer Mondstein & Rosenquarz',
      mineralFamily: 'Feldspat & Quarz',
      chakra: 'Herz- & Sakralchakra',
      chakraColor: 'text-pink-300 bg-pink-500/10 border-pink-500/30',
      colorHex: '#f472b6',
      gradientClass: 'from-pink-300 via-rose-400 to-purple-400',
      iconEmoji: '🤍',
      primaryNeed: 'Zulassen von Verletzlichkeit, Heim und Familie.',
      whyAndReason: 'Dein Nordknoten im Krebs führt dich weg von harter beruflicher Leistungskälte (Südknoten Steinbock) hin zu seelischer Fürsorge und Geborgenheit.',
      supportEffects: ['Öffnet das Herz für Mitgefühl', 'Heilt emotionale Härte', 'Schafft ein liebevolles Zuhause'],
      practicalApplication: 'Nachts unter das Kopfkissen legen.',
      cleansingMethod: 'Im Vollmondlicht aufladen.'
    },
    leo: {
      name: 'Sonnenstein & Pyrit',
      mineralFamily: 'Feldspat & Eisendisulfid',
      chakra: 'Solarplexus & Herz',
      chakraColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      colorHex: '#f59e0b',
      gradientClass: 'from-amber-400 to-yellow-600',
      iconEmoji: '👑',
      primaryNeed: 'Mut zur eigenen Strahlkraft und individuellen Schöpferkraft.',
      whyAndReason: 'Dein Nordknoten im Löwen will, dass du dich nicht mehr hinter der Masse (Südknoten Wassermann) versteckst, sondern mutig im Mittelpunkt deines Lebens stehst.',
      supportEffects: ['Befreit von falscher Bescheidenheit', 'Stärkt herzliche Lebensfreude', 'Erweckt deine schöpferische Einzigartigkeit'],
      practicalApplication: 'Als Anhänger tragen.',
      cleansingMethod: 'In der Mittagssonne aufladen.'
    },
    virgo: {
      name: 'Moosachat & Amazonit',
      mineralFamily: 'Quarz & Feldspat',
      chakra: 'Herz- & Halschakra',
      chakraColor: 'text-teal-300 bg-teal-500/10 border-teal-500/30',
      colorHex: '#14b8a6',
      gradientClass: 'from-teal-500 to-emerald-700',
      iconEmoji: '🌿',
      primaryNeed: 'Praktische Erdung und gesunde Grenzen im Alltag.',
      whyAndReason: 'Dein Nordknoten in der Jungfrau holt dich aus der Weltflucht und Opferrolle (Südknoten Fische) in eine heilsame, geordnete und handlungsfähige Alltagsroutine.',
      supportEffects: ['Schützt vor seelischem Verlieren', 'Fördert konkrete Problemlösungen', 'Stärkt die körperliche Gesundheit'],
      practicalApplication: 'Bei der täglichen Arbeit aufstellen.',
      cleansingMethod: 'Unter fließendem Wasser reinigen.'
    },
    libra: {
      name: 'Kunzit & Lapislazuli',
      mineralFamily: 'Spodumen & Lasurit',
      chakra: 'Herz- & Halschakra',
      chakraColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      colorHex: '#ec4899',
      gradientClass: 'from-pink-500 via-purple-600 to-blue-700',
      iconEmoji: '🤝',
      primaryNeed: 'Fruchtbare Partnerschaft und liebevolle Kompromissbereitschaft.',
      whyAndReason: 'Dein Nordknoten in der Waage lehrt dich, das einsame Ego-Kämpfertum (Südknoten Widder) hinter dir zu lassen und das Glück wahrer Kooperation zu entdecken.',
      supportEffects: ['Fördert tiefes Einfühlungsvermögen', 'Löst einsames Einzelgängertum', 'Bringt Eleganz und Frieden in Beziehungen'],
      practicalApplication: 'Mit Partner austauschen oder beim Meditieren tragen.',
      cleansingMethod: 'Auf Amethyst reinigen.'
    },
    scorpio: {
      name: 'Malachit & Schwarzer Obsidian',
      mineralFamily: 'Carbonat & Vulkanit',
      chakra: 'Herz- & Wurzelchakra',
      chakraColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      colorHex: '#059669',
      gradientClass: 'from-emerald-700 via-teal-900 to-black',
      iconEmoji: '🦅',
      primaryNeed: 'Mut zur radikalen Wandlung und seelischen Tiefe.',
      whyAndReason: 'Dein Nordknoten im Skorpion fordert dich auf, bequeme materielle Scheinsicherheiten (Südknoten Stier) loszulassen und dich mutig transformieren zu lassen.',
      supportEffects: ['Löst starres Festhalten an Materiellem', 'Verleiht schamanische Erkenntniskraft', 'Macht unempfindlich gegen Krisen'],
      practicalApplication: 'In Zeiten großer Lebensumbrüche in der Hand halten.',
      cleansingMethod: 'Auf Amethyst entladen.'
    },
    sagittarius: {
      name: 'Sodalith & Türkis',
      mineralFamily: 'Silikat & Phosphat',
      chakra: 'Stirn- & Halschakra',
      chakraColor: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
      colorHex: '#2563eb',
      gradientClass: 'from-blue-600 to-indigo-800',
      iconEmoji: '🏹',
      primaryNeed: 'Vertrauen in die große Seelenvision und den Sinn des Lebens.',
      whyAndReason: 'Dein Nordknoten im Schützen führt dich aus kleinkarierter Zersplitterung (Südknoten Zwillinge) in die Weite übergeordneter Lebensweisheit.',
      supportEffects: ['Schenkt Optimismus und Weitsicht', 'Befreit von Zweifel und Skepsis', 'Zieht günstige Schicksalsfügungen an'],
      practicalApplication: 'Beim Planen der Zukunft bei dir tragen.',
      cleansingMethod: 'Im Morgenlicht aufladen.'
    },
    capricorn: {
      name: 'Bergkristall & Onyx',
      mineralFamily: 'Quarz & Chalcedon',
      chakra: 'Kronen- & Wurzelchakra',
      chakraColor: 'text-slate-200 bg-white/10 border-white/30',
      colorHex: '#64748b',
      gradientClass: 'from-slate-300 via-slate-600 to-black',
      iconEmoji: '🏛️',
      primaryNeed: 'Übernahme von Selbstverantwortung und Meisterschaft.',
      whyAndReason: 'Dein Nordknoten im Steinbock ruft dich auf, emotionale Unselbstständigkeit (Südknoten Krebs) zu überwinden und der souveräne Architekt deines Lebens zu werden.',
      supportEffects: ['Stärkt die seelische Reife', 'Fördert berufliche Meisterschaft', 'Schenkt unerschütterliches Rückgrat'],
      practicalApplication: 'Auf dem Schreibtisch platzieren.',
      cleansingMethod: 'In der Sonne aufladen.'
    },
    aquarius: {
      name: 'Aquamarin & Sugilith',
      mineralFamily: 'Beryll & Ringsilikat',
      chakra: 'Hals- & Kronenchakra',
      chakraColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
      colorHex: '#06b6d4',
      gradientClass: 'from-cyan-500 via-purple-600 to-indigo-800',
      iconEmoji: '⚡',
      primaryNeed: 'Dienst am großen Ganzen und visionäre Gleichberechtigung.',
      whyAndReason: 'Dein Nordknoten im Wassermann führt dich weg von egofokussierter Selbstinszenierung (Südknoten Löwe) hin zum Wirken für das Wohl der Menschheit.',
      supportEffects: ['Öffnet für revolutionäre Ideen', 'Löst Arroganz und Einsamkeit', 'Verbindet dich mit Gleichgesinnten'],
      practicalApplication: 'Beim Austausch in Gruppen tragen.',
      cleansingMethod: 'Im Vollmondlicht aufladen.'
    },
    pisces: {
      name: 'Amethyst & Selenit',
      mineralFamily: 'Quarz & Gips-Kristall',
      chakra: 'Kronenchakra',
      chakraColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
      colorHex: '#9333ea',
      gradientClass: 'from-purple-600 via-indigo-600 to-teal-500',
      iconEmoji: '🌊',
      primaryNeed: 'Hingabe an das göttliche Vertrauen und spirituelle Verbindung.',
      whyAndReason: 'Dein Nordknoten in den Fischen lehrt dich, zwanghafte Alltags-Kontrolle und Sorgen (Südknoten Jungfrau) loszulassen und dich dem kosmischen Strom anzuvertrauen.',
      supportEffects: ['Schenkt tiefsten Seelenfrieden', 'Löst chronische Kontrollängste', 'Öffnet für Wunder und universelle Führung'],
      practicalApplication: 'Nachts unter das Kissen oder zur Meditation.',
      cleansingMethod: 'Im Mondlicht reinigen.'
    }
  };

  const stone = nodeStones[northNodeSign] || nodeStones['aries'];
  return {
    ...stone,
    role: 'Karmischer Evolutionsstein (Mut zum Quantensprung)'
  };
}

// 7. General Need Clusters (Kristall-Hausapotheke)
const GENERAL_NEED_CATEGORIES: GemstoneNeedCategory[] = [
  {
    id: 'protection',
    name: 'Schutz & Energetische Abgrenzung',
    icon: '🛡️',
    color: 'border-slate-500/40 text-slate-200 bg-slate-950/80',
    description: 'Für hochsensible Seelen, die sich im Alltag vor negativen Schwingungen, Reizüberflutung und Energievampiren schützen wollen.',
    stones: [
      {
        stoneName: 'Schwarzer Turmalin (Schörl)',
        briefEffect: 'Mächtigster Schutzschild gegen Fremdenergien und Elektrosmog.',
        idealFor: 'Büro, Großraumbüros, Meetings, Bahnfahrten',
        applicationTip: 'In der linken Hosentasche tragen oder am PC aufstellen.'
      },
      {
        stoneName: 'Schwarzer Obsidian',
        briefEffect: 'Kappt toxische energetische Bänder und schirmt die Aura ab.',
        idealFor: 'Nach schwierigen Gesprächen oder Trennungen',
        applicationTip: 'In der Hand halten und visualisieren, wie Verstrickungen gelöst werden.'
      },
      {
        stoneName: 'Labradorit',
        briefEffect: 'Schließt Risse im Aurafeld und verhindert energetisches Ausbluten.',
        idealFor: 'Therapeuten, Heiler, Ärzte, empathische Berufe',
        applicationTip: 'Als Anhänger auf Herzhöhe tragen.'
      }
    ]
  },
  {
    id: 'love',
    name: 'Selbstliebe, Herzöffnung & Partnerschaft',
    icon: '💖',
    color: 'border-pink-500/40 text-pink-200 bg-pink-950/30',
    description: 'Befreit von Beziehungsängsten, heilt alte Herzensnarben und stärkt die unerschütterliche Selbstannahme.',
    stones: [
      {
        stoneName: 'Rosenquarz',
        briefEffect: 'Der Urstein der bedingungslosen Liebe und Herzenssanftheit.',
        idealFor: 'Selbstkritik, Liebeskummer, Schlaflosigkeit durch Grübeln',
        applicationTip: 'Auf den Nachttisch legen oder bei der Meditation auf das Herz.'
      },
      {
        stoneName: 'Rhodochrosit',
        briefEffect: 'Heilt tiefe emotionale Verwundungen und erweckt Lebensfreude.',
        idealFor: 'Alte Kindheitswunden, Verlustängste in Partnerschaften',
        applicationTip: 'Als Ring oder Armband direkt auf der Haut tragen.'
      },
      {
        stoneName: 'Smaragd',
        briefEffect: 'Fördert eheliche Treue, Harmonie und echte Herzensreife.',
        idealFor: 'Langjährige Partnerschaften, tiefe Seelenverbindungen',
        applicationTip: 'Gemeinsam mit dem Partner im Schlafzimmer platzieren.'
      }
    ]
  },
  {
    id: 'clarity',
    name: 'Fokus, Klarheit & Geistige Ruhe',
    icon: '🧠',
    color: 'border-cyan-500/40 text-cyan-200 bg-cyan-950/30',
    description: 'Stoppt Gedankenkarusselle, schärft die Konzentration und unterstützt mutige Entscheidungen.',
    stones: [
      {
        stoneName: 'Regenbogen-Fluorit',
        briefEffect: 'Befreit das Gehirn von Chaos und bündelt die Konzentration.',
        idealFor: 'Prüfungen, Lernen, strategische Projektarbeit',
        applicationTip: 'Direkt vor der Tastatur oder auf dem Arbeitstisch aufstellen.'
      },
      {
        stoneName: 'Bergkristall',
        briefEffect: 'Klärt den Geist wie reines Quellwasser und löst energetische Blockaden.',
        idealFor: 'Entscheidungsfindung, Meditation, geistige Frische',
        applicationTip: 'Morgens für 3 Minuten auf das Stirnchakra legen.'
      },
      {
        stoneName: 'Sodalith',
        briefEffect: 'Verbindet Logik mit Intuition und beendet innere Unruhe.',
        idealFor: 'Überlastung durch zu viele Termine und Aufgaben',
        applicationTip: 'Als Handschmeichler bei Stress in die Hand nehmen.'
      }
    ]
  },
  {
    id: 'sleep',
    name: 'Seelenfrieden, Stressabbau & Tiefer Schlaf',
    icon: '🌙',
    color: 'border-purple-500/40 text-purple-200 bg-purple-950/30',
    description: 'Für Menschen, die abends schwer zur Ruhe kommen und sich nach tiefem seelischem Loslassen sehnen.',
    stones: [
      {
        stoneName: 'Dunkler Amethyst',
        briefEffect: 'Besänftigt das Nervensystem und vertieft die Schlafphasen.',
        idealFor: 'Einschlafprobleme, Albträume, Zähneknirschen',
        applicationTip: 'Eine Amethyst-Druse oder ein Amethyst-Stück neben das Kopfkissen legen.'
      },
      {
        stoneName: 'Selenit',
        briefEffect: 'Flutet den Raum mit reinem Seelenlicht und befreit von schwerer Energie.',
        idealFor: 'Schlafzimmer-Harmonisierung, Loslassen des Tages',
        applicationTip: 'Als Lampe oder Turm im Schlafzimmer aufstellen.'
      },
      {
        stoneName: 'Lepidolith',
        briefEffect: 'Enthält natürliches Lithium zur Dämpfung von Panik und Nervosität.',
        idealFor: 'Chronische Überreizung, Zukunftsängste vor dem Schlafen',
        applicationTip: 'Vor dem Zubettgehen 5 Minuten in beiden Händen halten.'
      }
    ]
  },
  {
    id: 'manifestation',
    name: 'Mut, Fülle & Schöpferkraft',
    icon: '✨',
    color: 'border-amber-500/40 text-amber-200 bg-amber-950/30',
    description: 'Zur Aktivierung des inneren Schöpfers, Überwindung von Zögern und Anziehung von Wohlstand.',
    stones: [
      {
        stoneName: 'Citrin',
        briefEffect: 'Zieht Erfolgschancen, Fülle und sonnige Lebensfreude magisch an.',
        idealFor: 'Neuanfänge, Selbstständigkeit, Geld- und Erfolgsblockaden',
        applicationTip: 'In die Geldbörse oder in die südöstliche Fülle-Ecke des Zimmers legen.'
      },
      {
        stoneName: 'Pyrit',
        briefEffect: 'Verleiht unerschütterlichen Mut und magnetische Willenskraft.',
        idealFor: 'Vor Verhandlungen, Gehaltsgesprächen oder Pitch-Präsentationen',
        applicationTip: 'Am Morgen kurz betrachten und sich mit der goldenen Kraft verbinden.'
      },
      {
        stoneName: 'Roter Karneol',
        briefEffect: 'Entfacht die Leidenschaft und beendet Aufschieberitis (Prokrastination).',
        idealFor: 'Müdigkeit, Zögern, Startschwierigkeiten bei Projekten',
        applicationTip: 'Tagsüber als Armband oder Taschenstein tragen.'
      }
    ]
  }
];

export function generatePersonalGemstones(chart: CompleteNatalChart): PersonalGemstoneProfile {
  const sunSignId = chart.synthesis.sun.planet.sign.id;
  const moonSignId = chart.synthesis.moon.planet.sign.id;
  const ascSignId = chart.housesResult.angles.ascendant.sign.id;
  const chironSignId = chart.synthesis.chiron.planet.sign.id;
  const northNodeSignId = chart.synthesis.northNode.planet.sign.id;

  const rawSun = SUN_STONES[sunSignId] || SUN_STONES['aries'];
  const sunStone: HealingStone = {
    ...rawSun,
    role: `Sonnen-Lebensstein (${chart.synthesis.sun.planet.sign.name} • Kernkraft)`
  };

  const rawMoon = MOON_STONES[moonSignId] || MOON_STONES['cancer'];
  const moonStone: HealingStone = {
    ...rawMoon,
    role: `Mond-Seelenschutzstein (${chart.synthesis.moon.planet.sign.name} • Emotionale Nährung)`
  };

  const rawAsc = ASCENDANT_STONES[ascSignId] || ASCENDANT_STONES['aries'];
  const ascendantStone: HealingStone = {
    ...rawAsc,
    role: `Aszendent-Aurastein (${chart.housesResult.angles.ascendant.sign.name} • Seelentor & Schutz)`
  };

  const rawChiron = CHIRON_STONES[chironSignId] || CHIRON_STONES['aries'];
  const chironStone: HealingStone = {
    ...rawChiron,
    role: `Chiron-Heilungsstein (${chart.synthesis.chiron.planet.sign.name} • Seelenwunde ➔ Medizin)`
  };

  const elementBalanceStone = getElementBalanceStone(chart.balance);
  const karmicStone = getKarmicEvolutionStone(northNodeSignId);

  return {
    sunStone,
    moonStone,
    ascendantStone,
    chironStone,
    elementBalanceStone,
    karmicStone,
    needCategories: GENERAL_NEED_CATEGORIES
  };
}
