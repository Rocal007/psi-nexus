// Celestial Constellations & Star Atlas Engine
// Includes 12 Zodiac Constellations + Famous Mythological Constellations

export interface StarPoint {
  x: number; // 0..100
  y: number; // 0..100
  size: number; // 1..4 (brightness/mag)
  name?: string;
}

export interface StarLine {
  from: number; // star index
  to: number; // star index
}

export interface ConstellationData {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  category: 'zodiac' | 'mythical_north' | 'mythical_south';
  alphaStar: {
    name: string;
    bayerDesignation: string;
    meaning: string;
    distanceLightYears: number;
    magnitude: number;
  };
  quadrant: string; // e.g. "Nördlicher Himmel", "Südlicher Himmel", "Äquatorial"
  bestSeason: string; // e.g. "Winter (Januar / Februar)"
  element: 'Feuer' | 'Erde' | 'Luft' | 'Wasser' | 'Äther';
  zodiacDegreeRange?: string;
  associatedGemstone: string;
  associatedChakra: string;
  
  // Rich Neurodidactic & Mythological Lore
  mythology: string;
  esotericMeaning: string;
  soulGift: string; // Welche Gabe schenkt dieses Sternbild der Menschheit?
  skyObservationTip: string; // Wie finde ich es am echten Himmel?
  
  // Star Geometry for SVG Drawing
  stars: StarPoint[];
  lines: StarLine[];
}

export const CONSTELLATIONS: ConstellationData[] = [
  // --- 12 ZODIAC CONSTELLATIONS ---
  {
    id: 'aries',
    name: 'Widder',
    latinName: 'Aries',
    symbol: '♈',
    category: 'zodiac',
    alphaStar: {
      name: 'Hamal',
      bayerDesignation: 'Alpha Arietis',
      meaning: 'Der Kopf des Widders / Das Lamm',
      distanceLightYears: 66,
      magnitude: 2.01
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ1)',
    bestSeason: 'Herbst & Frühwinter (November / Dezember)',
    element: 'Feuer',
    zodiacDegreeRange: '0° - 30° Widder (21. März - 19. April)',
    associatedGemstone: 'Roter Jaspis & Rubin',
    associatedChakra: 'Wurzelchakra & Stirnchakra',
    mythology: 'In der griechischen Sage sandte Göttin Nephele den goldenen Widder Chrysomallos, um Phrixos und Helle vor dem Opfertod zu retten. Sein goldenes Vlies wurde zum berühmtesten Schatz der Argonauten-Sage unter Jason.',
    esotericMeaning: 'Der kosmische Funke des Ur-Impulses. Widder symbolisiert das Erwachen des individuellen Bewusstseins und die Kraft, Neues aus dem Nichts zu erschaffen.',
    soulGift: 'Unbezwingbarer Pioniergeist, Furchtlosigkeit und der Mut zum allerersten Schritt.',
    skyObservationTip: 'Suche südlich des auffälligen Sternbilds Kassiopeia (Himmels-W) nach dem hellen Stern Hamal und seinem Begleiter Sheratan.',
    stars: [
      { x: 75, y: 35, size: 3.5, name: 'Hamal' },
      { x: 55, y: 45, size: 2.8, name: 'Sheratan' },
      { x: 42, y: 55, size: 2.2, name: 'Mesarthim' },
      { x: 25, y: 65, size: 1.8, name: '41 Arietis' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 }
    ]
  },
  {
    id: 'taurus',
    name: 'Stier',
    latinName: 'Taurus',
    symbol: '♉',
    category: 'zodiac',
    alphaStar: {
      name: 'Aldebaran',
      bayerDesignation: 'Alpha Tauri',
      meaning: 'Das Auge des Stiers / Der Folgende (den Plejaden folgend)',
      distanceLightYears: 65,
      magnitude: 0.85
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ1)',
    bestSeason: 'Winter (Dezember / Januar)',
    element: 'Erde',
    zodiacDegreeRange: '0° - 30° Stier (20. April - 20. Mai)',
    associatedGemstone: 'Smaragd & Rosenquarz',
    associatedChakra: 'Herzchakra & Kehlkopfchakra',
    mythology: 'Zeus verwandelte sich in einen schneeweißen, sanftmütigen Stier mit goldenen Hörnern, um Prinzessin Europa über das Meer nach Kreta zu tragen. Zudem beherbergt der Stier die sieben Töchter des Atlas: das Siebengestirn (Plejaden).',
    esotericMeaning: 'Verkörperung der irdischen Schöpfungsfülle, Fruchtbarkeit und Geduld. Stier lehrt, wie kosmischer Geist in dauerhafte physische Form und Schönheit gegossen wird.',
    soulGift: 'Unerschütterliche Standfestigkeit, Sinn für vollendete Harmonie und Manifestationskraft.',
    skyObservationTip: 'Der orangerote Riesenstern Aldebaran bildet das funkelnde Stierauge innerhalb des V-förmigen Sternhaufens der Hyaden, direkt östlich von Orion.',
    stars: [
      { x: 60, y: 50, size: 4.0, name: 'Aldebaran' },
      { x: 75, y: 30, size: 3.0, name: 'Elnath' },
      { x: 68, y: 65, size: 2.5, name: 'Tianguan' },
      { x: 45, y: 55, size: 2.4, name: 'Ain' },
      { x: 35, y: 60, size: 2.2, name: 'Hyadum' },
      { x: 25, y: 35, size: 3.2, name: 'Plejaden (M45)' }
    ],
    lines: [
      { from: 1, to: 0 },
      { from: 0, to: 3 },
      { from: 3, to: 4 },
      { from: 0, to: 2 },
      { from: 3, to: 5 }
    ]
  },
  {
    id: 'gemini',
    name: 'Zwillinge',
    latinName: 'Gemini',
    symbol: '♊',
    category: 'zodiac',
    alphaStar: {
      name: 'Pollux & Castor',
      bayerDesignation: 'Beta & Alpha Geminorum',
      meaning: 'Die unzertrennlichen Dioskuren',
      distanceLightYears: 34,
      magnitude: 1.14
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ2)',
    bestSeason: 'Winter & Frühling (Januar / Februar / März)',
    element: 'Luft',
    zodiacDegreeRange: '0° - 30° Zwillinge (21. Mai - 20. Juni)',
    associatedGemstone: 'Citrin & Chalcedon',
    associatedChakra: 'Kehlkopfchakra & Stirnchakra',
    mythology: 'Kastor (sterblich) und Polydeukes/Pollux (unsterblich) waren unzertrennliche Zwillingsbrüder. Als Kastor im Kampf fiel, bat Pollux Zeus, seine Unsterblichkeit mit dem Bruder zu teilen. Zeus vereinte sie für immer am Sternenhimmel.',
    esotericMeaning: 'Die Vermählung von Geist und Materie, Sterblichkeit und Unsterblichkeit. Zwillinge verbinden die Polaritäten durch Sprache, Weisheit und Vernetzung.',
    soulGift: 'Brillante Kommunikationsgabe, geistige Beweglichkeit und verbindende Empathie.',
    skyObservationTip: 'Die beiden hellen Zwillingssterne Castor und Pollux stehen auffällig parallel nordöstlich von Orion und oberhalb des Kleinen Hundes (Prokyon).',
    stars: [
      { x: 35, y: 25, size: 3.5, name: 'Castor' },
      { x: 50, y: 28, size: 3.8, name: 'Pollux' },
      { x: 38, y: 48, size: 2.5, name: 'Mebsuta' },
      { x: 52, y: 52, size: 2.6, name: 'Wasat' },
      { x: 32, y: 72, size: 2.8, name: 'Tejat' },
      { x: 48, y: 75, size: 3.0, name: 'Alhena' }
    ],
    lines: [
      { from: 0, to: 2 },
      { from: 2, to: 4 },
      { from: 1, to: 3 },
      { from: 3, to: 5 },
      { from: 0, to: 1 },
      { from: 2, to: 3 }
    ]
  },
  {
    id: 'cancer',
    name: 'Krebs',
    latinName: 'Cancer',
    symbol: '♋',
    category: 'zodiac',
    alphaStar: {
      name: 'Acubens & Praesepe',
      bayerDesignation: 'Alpha Cancri',
      meaning: 'Die Schere des Krebses / Die Krippe (M44)',
      distanceLightYears: 174,
      magnitude: 4.25
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ2)',
    bestSeason: 'Frühling (März / April)',
    element: 'Wasser',
    zodiacDegreeRange: '0° - 30° Krebs (21. Juni - 22. Juli)',
    associatedGemstone: 'Mondstein & Selenit',
    associatedChakra: 'Sakralchakra & Seelenstern',
    mythology: 'Im Kampf des Herkules gegen die neunköpfige Lernäische Hydra sandte Hera einen Riesenkrebs, um Herkules zu beißen. Obwohl zertreten, setzte Hera das mutige Tier zum Dank als funkelndes Sternbild an den Himmel.',
    esotericMeaning: 'Das Tor der Seeleninkarnation (Tor der Menschen). Der Krebs hütet die innere Gefühlswelt, die Ahnenlinie und das unzerbrechliche seelische Urvertrauen.',
    soulGift: 'Tiefe seelische Intuition, bedingungslose Geborgenheit und seelische Heilkraft.',
    skyObservationTip: 'Zwischen den hellen Sternbildern Löwe und Zwillinge liegt der schwächere Krebs. Im Zentrum funkelt der offene Sternhaufen Praesepe (die Krippe) wie eine feine Nebelwolke.',
    stars: [
      { x: 50, y: 50, size: 3.5, name: 'Praesepe (Krippe)' },
      { x: 35, y: 35, size: 2.4, name: 'Asellus Borealis' },
      { x: 65, y: 35, size: 2.6, name: 'Iota Cancri' },
      { x: 45, y: 70, size: 2.5, name: 'Asellus Australis' },
      { x: 30, y: 85, size: 2.8, name: 'Acubens' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 3, to: 4 }
    ]
  },
  {
    id: 'leo',
    name: 'Löwe',
    latinName: 'Leo',
    symbol: '♌',
    category: 'zodiac',
    alphaStar: {
      name: 'Regulus',
      bayerDesignation: 'Alpha Leonis',
      meaning: 'Der kleine König / Das Löwenherz (Cor Leonis)',
      distanceLightYears: 79,
      magnitude: 1.36
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ2)',
    bestSeason: 'Frühling (März / April / Mai)',
    element: 'Feuer',
    zodiacDegreeRange: '0° - 30° Löwe (23. Juli - 22. August)',
    associatedGemstone: 'Sonnenstein & Goldtopas',
    associatedChakra: 'Solarplexus & Herzchakra',
    mythology: 'Der unverwundbare Nemeische Löwe, dessen Fell von keiner irdischen Waffe durchdrungen werden konnte. Herkules besiegte ihn mit bloßen Händen. Zeus ehrte die majestätische Raubkatze am Firmament.',
    esotericMeaning: 'Das Erwachen des königlichen Herzens. Der Löwe repräsentiert reine Schöpferkraft, Integrität und die strahlende Souveränität des wahren Selbst.',
    soulGift: 'Königliche Großherzigkeit, natürliche Führungsautorität und Lebensfreude.',
    skyObservationTip: 'Die markante Sichelform des Löwenkopfes mit dem blauweißen Königsstern Regulus an der Basis ist im Frühling am Südhimmel kaum zu übersehen.',
    stars: [
      { x: 30, y: 70, size: 4.0, name: 'Regulus' },
      { x: 35, y: 50, size: 3.0, name: 'Algieba' },
      { x: 42, y: 35, size: 2.8, name: 'Adhafera' },
      { x: 35, y: 25, size: 2.5, name: 'Ras Elased' },
      { x: 65, y: 45, size: 3.2, name: 'Zosma' },
      { x: 80, y: 55, size: 3.4, name: 'Denebola' },
      { x: 55, y: 68, size: 2.7, name: 'Chertan' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 1, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 0 }
    ]
  },
  {
    id: 'virgo',
    name: 'Jungfrau',
    latinName: 'Virgo',
    symbol: '♍',
    category: 'zodiac',
    alphaStar: {
      name: 'Spica',
      bayerDesignation: 'Alpha Virginis',
      meaning: 'Die Kornähre der Himmelskönigin',
      distanceLightYears: 250,
      magnitude: 0.98
    },
    quadrant: 'Südlicher Sternenhimmel (SQ3)',
    bestSeason: 'Frühling & Frühsommer (Mai / Juni)',
    element: 'Erde',
    zodiacDegreeRange: '0° - 30° Jungfrau (23. August - 22. September)',
    associatedGemstone: 'Lapislazuli & Moosachat',
    associatedChakra: 'Solarplexus & Stirnchakra',
    mythology: 'Dargestellt als Astraea (Göttin der Gerechtigkeit) oder Demeter (Göttin der Ernte). Als die Menschen im Eisernen Zeitalter grausam wurden, stieg Astraea als letzte Unsterbliche zum Himmel empor und hält die goldene Weizenähre Spica.',
    esotericMeaning: 'Alchemistische Läuterung und Reifung. Die Jungfrau bereitet die seelische Ernte vor, indem sie das Reine vom Unreinen scheidet und dem Geist dient.',
    soulGift: 'Heilerische Präzision, analytische Klarheit und uneigennützige Hilfsbereitschaft.',
    skyObservationTip: 'Folge dem Bogen der Deichsel des Großen Wagens über den hellen Stern Arktur direkt nach Süden zum leuchtend bläulichen Stern Spica.',
    stars: [
      { x: 55, y: 75, size: 4.2, name: 'Spica' },
      { x: 45, y: 50, size: 3.0, name: 'Porrima' },
      { x: 35, y: 35, size: 2.8, name: 'Zavijava' },
      { x: 60, y: 35, size: 3.1, name: 'Vindemiatrix' },
      { x: 65, y: 55, size: 2.7, name: 'Heze' },
      { x: 40, y: 70, size: 2.4, name: 'Zaniah' }
    ],
    lines: [
      { from: 2, to: 1 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 4, to: 0 },
      { from: 1, to: 5 },
      { from: 5, to: 0 }
    ]
  },
  {
    id: 'libra',
    name: 'Waage',
    latinName: 'Libra',
    symbol: '♎',
    category: 'zodiac',
    alphaStar: {
      name: 'Zubeneschamali & Zubenelgenubi',
      bayerDesignation: 'Beta & Alpha Librae',
      meaning: 'Die nördliche & südliche Schale der kosmischen Waage',
      distanceLightYears: 160,
      magnitude: 2.61
    },
    quadrant: 'Südlicher Sternenhimmel (SQ3)',
    bestSeason: 'Frühsommer (Juni / Juli)',
    element: 'Luft',
    zodiacDegreeRange: '0° - 30° Waage (23. September - 22. Oktober)',
    associatedGemstone: 'Aquamarin & Jade',
    associatedChakra: 'Herzchakra & Kehlkopfchakra',
    mythology: 'Die einzige nicht-tierische Gestalt des Tierkreises. Sie stellt die Waagschalen der Themis (Göttin der göttlichen Ordnung) dar, die im Kosmos Gleichgewicht, Recht und Wahrheit misst.',
    esotericMeaning: 'Der kosmische Wendepunkt zwischen Ich und Du. Waage lehrt die göttliche Symmetrie, den inneren Frieden und die Kunst wahrer Partnerschaft.',
    soulGift: 'Gerechter Ausgleich, diplomatisches Feingefühl und Sinn für ästhetische Vollendung.',
    skyObservationTip: 'Die Waage steht direkt zwischen Spica (Jungfrau) und dem leuchtenden Riesenstern Antares (Skorpion) als feines Trapez am Sommerhimmel.',
    stars: [
      { x: 50, y: 30, size: 3.5, name: 'Zubeneschamali' },
      { x: 30, y: 55, size: 3.2, name: 'Zubenelgenubi' },
      { x: 70, y: 55, size: 2.8, name: 'Zubenelhakrabi' },
      { x: 50, y: 75, size: 2.5, name: 'Brachium' }
    ],
    lines: [
      { from: 1, to: 0 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 }
    ]
  },
  {
    id: 'scorpio',
    name: 'Skorpion',
    latinName: 'Scorpius',
    symbol: '♏',
    category: 'zodiac',
    alphaStar: {
      name: 'Antares',
      bayerDesignation: 'Alpha Scorpii',
      meaning: 'Der Gegen-Mars / Das feurige Herz des Skorpions',
      distanceLightYears: 550,
      magnitude: 0.96
    },
    quadrant: 'Südlicher Sternenhimmel (SQ3)',
    bestSeason: 'Sommer (Juli / August)',
    element: 'Wasser',
    zodiacDegreeRange: '0° - 30° Skorpion (23. Oktober - 21. November)',
    associatedGemstone: 'Obsidian & Malachit',
    associatedChakra: 'Wurzelchakra & Sakralchakra',
    mythology: 'Gaia sandte den Riesenskorpion, um den übermütigen Jäger Orion in seine Schranken zu weisen. Am Himmel stehen Skorpion und Orion sich genau gegenüber: Geht der Skorpion im Osten auf, flieht Orion im Westen.',
    esotericMeaning: 'Die Mysterien von Tod, Wiedergeburt und Transformation. Skorpion wandelt Dunkelheit in Licht (Phönix-Prinzip) und hütet die alchemistische Urkraft.',
    soulGift: 'Unbeugsame Regenerationskraft, psychologische Seelentiefe und Transformationsmut.',
    skyObservationTip: 'Der tiefstehende Sommer-König: Der rubinrote Überriese Antares leuchtet im Zentrum des geschwungenen Skorpionstachels knapp über dem Südhorizont.',
    stars: [
      { x: 45, y: 40, size: 4.5, name: 'Antares' },
      { x: 30, y: 25, size: 3.0, name: 'Graffias' },
      { x: 32, y: 35, size: 2.8, name: 'Dschubba' },
      { x: 52, y: 55, size: 3.0, name: 'Wei' },
      { x: 60, y: 70, size: 3.2, name: 'Sargas' },
      { x: 75, y: 65, size: 3.6, name: 'Shaula (Stachel)' },
      { x: 80, y: 55, size: 3.0, name: 'Lesath' }
    ],
    lines: [
      { from: 1, to: 2 },
      { from: 2, to: 0 },
      { from: 0, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 }
    ]
  },
  {
    id: 'sagittarius',
    name: 'Schütze',
    latinName: 'Sagittarius',
    symbol: '♐',
    category: 'zodiac',
    alphaStar: {
      name: 'Kaus Australis & Nunki',
      bayerDesignation: 'Epsilon & Sigma Sagittarii',
      meaning: 'Der südliche Bogen & Die älteste Himmelsurkunde',
      distanceLightYears: 143,
      magnitude: 1.79
    },
    quadrant: 'Südlicher Sternenhimmel (SQ4)',
    bestSeason: 'Sommer & Spätsommer (August / September)',
    element: 'Feuer',
    zodiacDegreeRange: '0° - 30° Schütze (22. November - 21. Dezember)',
    associatedGemstone: 'Türkis & Sodalith',
    associatedChakra: 'Drittes Auge & Kronenchakra',
    mythology: 'Der weise Zentaur Krotos oder Cheiron, der seinen gezielten Pfeil direkt auf das kosmische Zentrum (Galaktisches Zentrum) richtet. Schütze steht exakt vor den dichtesten Sternwolken der Milchstraße.',
    esotericMeaning: 'Der Bogen des höheren Geistes. Der Schütze strebt nach kosmischer Wahrheit, Weisheit und der Überwindung irdischer Begrenzungen.',
    soulGift: 'Unerschöpflicher Optimismus, philosophischer Weitblick und Wahrheitsdrang.',
    skyObservationTip: 'Achte auf die auffällige Teekannen-Form (Teapot Asterism) im Sternbild Schütze direkt über dem Südhorizont im Sommer.',
    stars: [
      { x: 30, y: 50, size: 3.8, name: 'Kaus Australis' },
      { x: 35, y: 35, size: 3.0, name: 'Kaus Media' },
      { x: 42, y: 25, size: 2.8, name: 'Kaus Borealis' },
      { x: 50, y: 40, size: 3.2, name: 'Alnasl' },
      { x: 65, y: 35, size: 3.6, name: 'Nunki' },
      { x: 75, y: 45, size: 3.0, name: 'Ascella' },
      { x: 60, y: 60, size: 2.7, name: 'Kappe' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 3, to: 0 },
      { from: 1, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 6, to: 0 }
    ]
  },
  {
    id: 'capricorn',
    name: 'Steinbock',
    latinName: 'Capricornus',
    symbol: '♑',
    category: 'zodiac',
    alphaStar: {
      name: 'Deneb Algedi & Algedi',
      bayerDesignation: 'Delta & Alpha Capricorni',
      meaning: 'Der Schwanz der Himmels-Ziege / Das Ziegenböckchen',
      distanceLightYears: 39,
      magnitude: 2.85
    },
    quadrant: 'Südlicher Sternenhimmel (SQ4)',
    bestSeason: 'Spätsommer & Herbst (September / Oktober)',
    element: 'Erde',
    zodiacDegreeRange: '0° - 30° Steinbock (22. Dezember - 19. Januar)',
    associatedGemstone: 'Bergkristall & Onyx',
    associatedChakra: 'Wurzelchakra & Knie-Chakren',
    mythology: 'Der uralte sumerische Gott Enki (Meeres-Steinbock / Seaziegenbock). Als das Monster Typhon die Götter angriff, sprang Hirtengott Pan in den Nil: Sein oberer Körper blieb Ziege, der untere wurde Fischflosse.',
    esotericMeaning: 'Das Tor der Götter (Seelenaufstieg). Der Steinbock erklimmt die steilsten Gipfel irdischer und seelischer Meisterschaft durch Ausdauer und Disziplin.',
    soulGift: 'Unbeugsame Integrität, Meisterschaft über das Irdische und zeitlose Weisheit.',
    skyObservationTip: 'Ein weites, sanft leuchtendes Dreieck südlich des Sternbilds Adler (Altair) im herbstlichen Sternenhimmel.',
    stars: [
      { x: 25, y: 35, size: 3.2, name: 'Algedi' },
      { x: 30, y: 45, size: 3.0, name: 'Dabih' },
      { x: 55, y: 70, size: 2.6, name: 'Oculus' },
      { x: 80, y: 40, size: 3.6, name: 'Deneb Algedi' },
      { x: 75, y: 50, size: 3.0, name: 'Nashira' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 4, to: 3 },
      { from: 3, to: 0 }
    ]
  },
  {
    id: 'aquarius',
    name: 'Wassermann',
    latinName: 'Aquarius',
    symbol: '♒',
    category: 'zodiac',
    alphaStar: {
      name: 'Sadalsuud & Sadalmelik',
      bayerDesignation: 'Beta & Alpha Aquarii',
      meaning: 'Das Glück des Glücklichsten / Das Königsglück',
      distanceLightYears: 540,
      magnitude: 2.90
    },
    quadrant: 'Südlicher Sternenhimmel (SQ4)',
    bestSeason: 'Herbst (Oktober / November)',
    element: 'Luft',
    zodiacDegreeRange: '0° - 30° Wassermann (20. Januar - 18. Februar)',
    associatedGemstone: 'Amethyst & Fluorit',
    associatedChakra: 'Stirnchakra & Kronenchakra',
    mythology: 'Ganymed, der schönste Jüngling der Erde, den Zeus in Gestalt eines Adlers in den Olymp holte, um den Göttern den Nektar unendlichen Lebens und kosmischer Erkenntnis einzuschenken.',
    esotericMeaning: 'Der Ausgießer des Lebenswassers (Ätherstrom). Wassermann bringt die Visionen des neuen Zeitalters, Freiheit, Brüderlichkeit und revolutionäre Erneuerung.',
    soulGift: 'Visionärer Genius, Vorurteilsfreiheit und humanitäre Seelenmission.',
    skyObservationTip: 'Südlich des geflügelten Pferdes Pegasus breiten sich die feinen Sternenketten des Wassermannes wie herabstürzende Wasserwellen aus.',
    stars: [
      { x: 35, y: 35, size: 3.4, name: 'Sadalsuud' },
      { x: 50, y: 30, size: 3.2, name: 'Sadalmelik' },
      { x: 65, y: 38, size: 2.8, name: 'Sadalachbia' },
      { x: 45, y: 55, size: 2.5, name: 'Ancha' },
      { x: 75, y: 65, size: 3.0, name: 'Skat' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 }
    ]
  },
  {
    id: 'pisces',
    name: 'Fische',
    latinName: 'Pisces',
    symbol: '♓',
    category: 'zodiac',
    alphaStar: {
      name: 'Alrescha',
      bayerDesignation: 'Alpha Piscium',
      meaning: 'Das Seidenband, das die beiden Seelenfische verbindet',
      distanceLightYears: 139,
      magnitude: 3.82
    },
    quadrant: 'Nördlicher Sternenhimmel (NQ1)',
    bestSeason: 'Herbst & Frühwinter (November / Dezember)',
    element: 'Wasser',
    zodiacDegreeRange: '0° - 30° Fische (19. Februar - 20. März)',
    associatedGemstone: 'Aquamarin & Amethyst',
    associatedChakra: 'Kronenchakra & Seelenstern',
    mythology: 'Aphrodite und ihr Sohn Eros flohen vor dem Ungeheuer Typhon und verwandelten sich am Ufer des Euphrat in zwei Fische, die durch ein seidenes Band unzertrennlich miteinander verknüpft blieben.',
    esotericMeaning: 'Das Meer des All-Einsseins (Alpha und Omega). Fische vollenden die Seelenreise des Tierkreises in universeller Liebe, Transzendenz und Mitgefühl.',
    soulGift: 'Grenzenlose Empathie, mystische Hellsichtigkeit und bedingungsloses Verzeihen.',
    skyObservationTip: 'Die beiden Fische bilden ein weites V-förmiges Sternenband unterhalb des großen Pegasus-Quadrats, verbunden am Stern Alrescha.',
    stars: [
      { x: 50, y: 80, size: 3.6, name: 'Alrescha' },
      { x: 25, y: 45, size: 2.8, name: 'Westlicher Fisch (Ring)' },
      { x: 18, y: 35, size: 2.4, name: 'TX Piscium' },
      { x: 75, y: 30, size: 2.9, name: 'Nördlicher Fisch' },
      { x: 82, y: 20, size: 2.5, name: 'Kullat Nunu' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 0, to: 3 },
      { from: 3, to: 4 }
    ]
  },

  // --- FAMOUS MYTHICAL CONSTELLATIONS ---
  {
    id: 'orion',
    name: 'Orion (Der Himmelsjäger)',
    latinName: 'Orion',
    symbol: '⚔️',
    category: 'mythical_north',
    alphaStar: {
      name: 'Betelgeuse & Rigel',
      bayerDesignation: 'Alpha & Beta Orionis',
      meaning: 'Die Hand des Riesen (roter Überriese) & Der leuchtende Fuß',
      distanceLightYears: 640,
      magnitude: 0.18
    },
    quadrant: 'Äquatorialer Sternenhimmel (Wintersechseck)',
    bestSeason: 'Winter (Dezember bis Februar)',
    element: 'Äther',
    associatedGemstone: 'Pyrit & Roter Rubin',
    associatedChakra: 'Solarplexus & Drittes Auge',
    mythology: 'Der berühmteste Himmelskrieger der Antike. Begleitet von seinen Jagdhunden (Sirius & Prokyon) kämpft er am Firmament ewig gegen den heranrückenden Stier. Seine 3 Gürtelsterne (Alnitak, Alnilam, Mintaka) sind das Herzstück der Pyramiden-Geometrie von Gizeh.',
    esotericMeaning: 'Das kosmische Tor der Einweihung. Orion steht für den unsterblichen Helden, der durch Prüfungen reift und sein Licht in den Nachthimmel schleudert.',
    soulGift: 'Kriegerischer Mut, unerschütterliche Standhaftigkeit und edle Schutzkraft.',
    skyObservationTip: 'Die drei perfekt aufgereihten Gürtelsterne im Winterhimmel sind die leichteste Orientierungshilfe des gesamten Himmels.',
    stars: [
      { x: 30, y: 25, size: 4.5, name: 'Betelgeuse (Schulter)' },
      { x: 70, y: 28, size: 4.0, name: 'Bellatrix' },
      { x: 42, y: 50, size: 3.5, name: 'Alnitak' },
      { x: 50, y: 50, size: 3.6, name: 'Alnilam' },
      { x: 58, y: 50, size: 3.5, name: 'Mintaka' },
      { x: 32, y: 80, size: 3.8, name: 'Saiph' },
      { x: 68, y: 78, size: 4.8, name: 'Rigel (Fuß)' },
      { x: 50, y: 62, size: 3.0, name: 'Orion-Nebel (M42)' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 4 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 2, to: 5 },
      { from: 4, to: 6 },
      { from: 3, to: 7 }
    ]
  },
  {
    id: 'ursa_major',
    name: 'Großer Bär (Großer Wagen)',
    latinName: 'Ursa Major',
    symbol: '🐻',
    category: 'mythical_north',
    alphaStar: {
      name: 'Dubhe & Merak (Die Zeigersterne)',
      bayerDesignation: 'Alpha & Beta Ursae Majoris',
      meaning: 'Der Bärenrücken & Die Weiche',
      distanceLightYears: 123,
      magnitude: 1.79
    },
    quadrant: 'Zirkumpolarer Nordhimmel (Ganzjährig sichtbar)',
    bestSeason: 'Ganzjährig sichtbar (Höchststand im Frühling)',
    element: 'Erde',
    associatedGemstone: 'Smaragd & Bergkristall',
    associatedChakra: 'Kronenchakra & Die 7 Strahlen',
    mythology: 'Die Nymphe Kallisto wurde von der eifersüchtigen Hera in eine Bärin verwandelt. Zeus versetzte sie an den Himmel, wo sie niemals unter den Horizont taucht (zirkumpolar). Die 7 Sterne des Großen Wagens verkörpern in den Veden die 7 Rishis (Weisen).',
    esotericMeaning: 'Der kosmische Kompass. Seine 7 Hauptsterne senden die 7 Strahlen des göttlichen Willens in unser Sonnensystem.',
    soulGift: 'Orientierung in dunklen Zeiten, mütterliche Beschützung und ewige Treue.',
    skyObservationTip: 'Verlängere die beiden hinteren Kastensterne (Merak zu Dubhe) um das Fünffache nach oben, um punktgenau den Polarstern (Nordstern) zu finden.',
    stars: [
      { x: 75, y: 30, size: 3.8, name: 'Dubhe' },
      { x: 72, y: 50, size: 3.5, name: 'Merak' },
      { x: 55, y: 52, size: 3.2, name: 'Phecda' },
      { x: 52, y: 35, size: 3.4, name: 'Megrez' },
      { x: 38, y: 38, size: 3.5, name: 'Alioth' },
      { x: 25, y: 48, size: 3.6, name: 'Mizar & Alkor' },
      { x: 12, y: 65, size: 3.7, name: 'Alkaid' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 0 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 5, to: 6 }
    ]
  },
  {
    id: 'canis_major',
    name: 'Großer Hund (Sirius-Sternbild)',
    latinName: 'Canis Major',
    symbol: '🐕',
    category: 'mythical_south',
    alphaStar: {
      name: 'Sirius (Der Hundsstern)',
      bayerDesignation: 'Alpha Canis Majoris',
      meaning: 'Der Hellste aller Sterne / Die Himmelsflamme',
      distanceLightYears: 8.6,
      magnitude: -1.46
    },
    quadrant: 'Südlicher Winterhimmel',
    bestSeason: 'Winter (Januar / Februar)',
    element: 'Feuer',
    associatedGemstone: 'Diamant & Weißer Saphir',
    associatedChakra: 'Kronenchakra & Seelenstern',
    mythology: 'Im alten Ägypten kündigte der heliakische Aufgang von Sirius die lebensspendende Nilflut an (Göttin Isis / Sopdet). Er ist der treue Jagdhund Laelaps, der niemals seine Beute verfehlte.',
    esotericMeaning: 'Das spirituelle Zentrum unserer Galaxie. Sirius gilt in der Esoterik als die geistige Sonne hinter unserer physischen Sonne.',
    soulGift: 'Höchste Erleuchtung, seelische Klarheit und königliche Treue.',
    skyObservationTip: 'Verlängere die drei Gürtelsterne des Orion nach links unten: Sirius funkelt intensiv blauweiß als hellster Stern am gesamten irdischen Nachthimmel.',
    stars: [
      { x: 50, y: 30, size: 5.0, name: 'Sirius' },
      { x: 35, y: 35, size: 3.0, name: 'Mirzam' },
      { x: 55, y: 55, size: 3.2, name: 'Muliphein' },
      { x: 45, y: 75, size: 3.8, name: 'Wezen' },
      { x: 38, y: 88, size: 3.6, name: 'Adhara' },
      { x: 62, y: 82, size: 3.4, name: 'Aludra' }
    ],
    lines: [
      { from: 1, to: 0 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 3, to: 4 },
      { from: 3, to: 5 }
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Kassiopeia (Das Himmels-W)',
    latinName: 'Cassiopeia',
    symbol: '👑',
    category: 'mythical_north',
    alphaStar: {
      name: 'Schedar',
      bayerDesignation: 'Alpha Cassiopeiae',
      meaning: 'Die Brust der Königin',
      distanceLightYears: 228,
      magnitude: 2.24
    },
    quadrant: 'Zirkumpolarer Nordhimmel',
    bestSeason: 'Herbst & Winter (Ganzjährig sichtbar)',
    element: 'Luft',
    associatedGemstone: 'Amethyst & Selenit',
    associatedChakra: 'Kronenchakra',
    mythology: 'Die stolze Königin von Äthiopien, die prahlte, schöner zu sein als die Nereiden. Zur Strafe an ihren Himmels-Thron gebunden, kreist sie ewig kopfüber um den Polarstern.',
    esotericMeaning: 'Die göttliche Würde und die Wandlung von Eitelkeit in wahre Seelenschönheit.',
    soulGift: 'Königliche Eleganz, Erhabenheit und unerschütterliches Selbstwertgefühl.',
    skyObservationTip: 'Das markante Himmels-W (oder M) gegenüber des Großen Wagens ist selbst aus lichtverschmutzten Städten sofort mit freiem Auge zu sehen.',
    stars: [
      { x: 15, y: 65, size: 3.2, name: 'Caph' },
      { x: 32, y: 35, size: 3.6, name: 'Schedar' },
      { x: 50, y: 55, size: 3.8, name: 'Navi (Gamma Cas)' },
      { x: 68, y: 30, size: 3.4, name: 'Ruchbah' },
      { x: 85, y: 55, size: 3.0, name: 'Segin' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 }
    ]
  },
  {
    id: 'cygnus',
    name: 'Schwan (Das Kreuz des Nordens)',
    latinName: 'Cygnus',
    symbol: '🦢',
    category: 'mythical_north',
    alphaStar: {
      name: 'Deneb',
      bayerDesignation: 'Alpha Cygni',
      meaning: 'Der Schwanz des Schwans (Teil des Sommerdreiecks)',
      distanceLightYears: 2600,
      magnitude: 1.25
    },
    quadrant: 'Nördlicher Sommer- & Herbsthimmel',
    bestSeason: 'Sommer & Herbst (Juli bis Oktober)',
    element: 'Luft',
    associatedGemstone: 'Bergkristall & Blauer Topas',
    associatedChakra: 'Herzchakra & Kehlkopfchakra',
    mythology: 'Zeus näherte sich Leda in Gestalt eines leuchtenden Schwans. Orpheus wurde nach seinem Tod als Schwan an den Himmel versetzt, nahe seiner geliebten Leier (Wega).',
    esotericMeaning: 'Die Reinheit der Seele und die Kunst der Transformation (Das Hässliche Entlein wird zum erhabenen Schwan).',
    soulGift: 'Gnade, Reinheit des Herzens und künstlerische Beseeltheit.',
    skyObservationTip: 'Der Schwan breitet seine Flügel direkt mitten im leuchtenden Band der sommerlichen Milchstraße aus (Kreuzeckform).',
    stars: [
      { x: 50, y: 20, size: 4.2, name: 'Deneb' },
      { x: 50, y: 48, size: 3.4, name: 'Sadr' },
      { x: 50, y: 85, size: 3.6, name: 'Albireo (Doppelstern)' },
      { x: 20, y: 45, size: 3.2, name: 'Gienah' },
      { x: 80, y: 45, size: 3.2, name: 'Rukh' }
    ],
    lines: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 3, to: 1 },
      { from: 1, to: 4 }
    ]
  }
];

// Helper to filter constellations
export function getConstellationsByCategory(category?: string) {
  if (!category || category === 'all') return CONSTELLATIONS;
  if (category === 'zodiac') return CONSTELLATIONS.filter(c => c.category === 'zodiac');
  if (category === 'mythical') return CONSTELLATIONS.filter(c => c.category !== 'zodiac');
  return CONSTELLATIONS;
}
