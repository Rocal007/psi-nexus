export interface ZodiacSign {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  element: 'Feuer' | 'Erde' | 'Luft' | 'Wasser';
  modality: 'Kardinal' | 'Fix' | 'Veränderlich';
  ruler: string;
  esotericRuler: string;
  startDegree: number; // 0 for Aries, 30 for Taurus, etc.
  color: string;
  bgColor: string;
  keywords: string[];
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Widder',
    nameEn: 'Aries',
    symbol: '♈',
    element: 'Feuer',
    modality: 'Kardinal',
    ruler: 'Mars',
    esotericRuler: 'Merkur',
    startDegree: 0,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    keywords: ['Pioniergeist', 'Mut', 'Tatkraft', 'Initiative', 'Durchsetzung']
  },
  {
    id: 'taurus',
    name: 'Stier',
    nameEn: 'Taurus',
    symbol: '♉',
    element: 'Erde',
    modality: 'Fix',
    ruler: 'Venus',
    esotericRuler: 'Vulkan',
    startDegree: 30,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    keywords: ['Stabilität', 'Sinnlichkeit', 'Wertschätzung', 'Beständigkeit', 'Materielle Erdung']
  },
  {
    id: 'gemini',
    name: 'Zwillinge',
    nameEn: 'Gemini',
    symbol: '♊',
    element: 'Luft',
    modality: 'Veränderlich',
    ruler: 'Merkur',
    esotericRuler: 'Venus',
    startDegree: 60,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    keywords: ['Intellekt', 'Kommunikation', 'Vielseitigkeit', 'Neugier', 'Vernetzung']
  },
  {
    id: 'cancer',
    name: 'Krebs',
    nameEn: 'Cancer',
    symbol: '♋',
    element: 'Wasser',
    modality: 'Kardinal',
    ruler: 'Mond',
    esotericRuler: 'Neptun',
    startDegree: 90,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    keywords: ['Seelentiefe', 'Geborgenheit', 'Intuition', 'Schutz', 'Emotionale Urkraft']
  },
  {
    id: 'leo',
    name: 'Löwe',
    nameEn: 'Leo',
    symbol: '♌',
    element: 'Feuer',
    modality: 'Fix',
    ruler: 'Sonne',
    esotericRuler: 'Sonne',
    startDegree: 120,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    keywords: ['Schöpferkraft', 'Souveränität', 'Herzenskraft', 'Ausdruck', 'Charisma']
  },
  {
    id: 'virgo',
    name: 'Jungfrau',
    nameEn: 'Virgo',
    symbol: '♍',
    element: 'Erde',
    modality: 'Veränderlich',
    ruler: 'Merkur',
    esotericRuler: 'Mond',
    startDegree: 150,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    keywords: ['Präzision', 'Heilung', 'Synthese', 'Dienst am Ganzen', 'Unterscheidungskraft']
  },
  {
    id: 'libra',
    name: 'Waage',
    nameEn: 'Libra',
    symbol: '♎',
    element: 'Luft',
    modality: 'Kardinal',
    ruler: 'Venus',
    esotericRuler: 'Uranus',
    startDegree: 180,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    keywords: ['Harmonie', 'Gleichgewicht', 'Ästhetik', 'Diplomatie', 'Beziehungsbewusstsein']
  },
  {
    id: 'scorpio',
    name: 'Skorpion',
    nameEn: 'Scorpio',
    symbol: '♏',
    element: 'Wasser',
    modality: 'Fix',
    ruler: 'Pluto',
    esotericRuler: 'Mars',
    startDegree: 210,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    keywords: ['Transformation', 'Tiefenwahrheit', 'Regeneration', 'Machtbewusstsein', 'Seelenalchemie']
  },
  {
    id: 'sagittarius',
    name: 'Schütze',
    nameEn: 'Sagittarius',
    symbol: '♐',
    element: 'Feuer',
    modality: 'Veränderlich',
    ruler: 'Jupiter',
    esotericRuler: 'Erde',
    startDegree: 240,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    keywords: ['Sinnsuche', 'Weisheit', 'Vision', 'Erkenntnisdrang', 'Geistige Weite']
  },
  {
    id: 'capricorn',
    name: 'Steinbock',
    nameEn: 'Capricorn',
    symbol: '♑',
    element: 'Erde',
    modality: 'Kardinal',
    ruler: 'Saturn',
    esotericRuler: 'Saturn',
    startDegree: 270,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    keywords: ['Meisterschaft', 'Verantwortung', 'Struktur', 'Karmische Reife', 'Ausdauer']
  },
  {
    id: 'aquarius',
    name: 'Wassermann',
    nameEn: 'Aquarius',
    symbol: '♒',
    element: 'Luft',
    modality: 'Fix',
    ruler: 'Uranus',
    esotericRuler: 'Jupiter',
    startDegree: 300,
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    keywords: ['Innovation', 'Freiheit', 'Kollektives Bewusstsein', 'Originalität', 'Geistige Revolution']
  },
  {
    id: 'pisces',
    name: 'Fische',
    nameEn: 'Pisces',
    symbol: '♓',
    element: 'Wasser',
    modality: 'Veränderlich',
    ruler: 'Neptun',
    esotericRuler: 'Pluto',
    startDegree: 330,
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
    keywords: ['All-Einheit', 'Transzendenz', 'Mitgefühl', 'Mystik', 'Seelenauflösung']
  }
];

export interface CelestialBodyInfo {
  id: string;
  name: string;
  nameEn: string;
  symbol: string;
  type: 'luminary' | 'personal' | 'social' | 'transpersonal' | 'karmic';
  color: string;
  esotericMeaning: string;
}

export const CELESTIAL_BODIES: Record<string, CelestialBodyInfo> = {
  Sun: {
    id: 'Sun',
    name: 'Sonne',
    nameEn: 'Sun',
    symbol: '☉',
    type: 'luminary',
    color: '#fbbf24',
    esotericMeaning: 'Das Schöpferische Selbst, der göttliche Wesenskern, vitale Schöpferkraft und Lebensziel.'
  },
  Moon: {
    id: 'Moon',
    name: 'Mond',
    nameEn: 'Moon',
    symbol: '☽',
    type: 'luminary',
    color: '#e2e8f0',
    esotericMeaning: 'Das emotionale Fundament, der unbewusste Speicher vergangener Seelenerfahrungen und Urvertrauen.'
  },
  Mercury: {
    id: 'Mercury',
    name: 'Merkur',
    nameEn: 'Mercury',
    symbol: '☿',
    type: 'personal',
    color: '#38bdf8',
    esotericMeaning: 'Die Brücke zwischen niederem und höherem Mentalkörper, Wahrnehmung und energetische Vermittlung.'
  },
  Venus: {
    id: 'Venus',
    name: 'Venus',
    nameEn: 'Venus',
    symbol: '♀',
    type: 'personal',
    color: '#f472b6',
    esotericMeaning: 'Höhere Liebe, Seelenästhetik, Wertebewusstsein und magnetische Anziehungskraft.'
  },
  Mars: {
    id: 'Mars',
    name: 'Mars',
    nameEn: 'Mars',
    symbol: '♂',
    type: 'personal',
    color: '#ef4444',
    esotericMeaning: 'Der spirituelle Krieger, gerichtete Willenskraft, Antrieb und Durchsetzung der Seelenimpulse.'
  },
  Jupiter: {
    id: 'Jupiter',
    name: 'Jupiter',
    nameEn: 'Jupiter',
    symbol: '♃',
    type: 'social',
    color: '#a855f7',
    esotericMeaning: 'Höhere Einsicht, geistige Expansion, kosmische Gnade und Synthese des Wissens.'
  },
  Saturn: {
    id: 'Saturn',
    name: 'Saturn',
    nameEn: 'Saturn',
    symbol: '♄',
    type: 'social',
    color: '#ca8a04',
    esotericMeaning: 'Der Hüter der Schwelle, karmischer Lehrmeister, Kristallisation und Verwirklichung in Raum und Zeit.'
  },
  Uranus: {
    id: 'Uranus',
    name: 'Uranus',
    nameEn: 'Uranus',
    symbol: '♅',
    type: 'transpersonal',
    color: '#06b6d4',
    esotericMeaning: 'Göttliche Intuition, plötzliches Erwachen, Befreiung von Dogmen und kosmische Frequenz.'
  },
  Neptune: {
    id: 'Neptune',
    name: 'Neptun',
    nameEn: 'Neptun',
    symbol: '♆',
    type: 'transpersonal',
    color: '#6366f1',
    esotericMeaning: 'Kosmische Liebe, Auflösung der Illusion (Maya), mystische Versenkung und universelles Mitgefühl.'
  },
  Pluto: {
    id: 'Pluto',
    name: 'Pluto',
    nameEn: 'Pluto',
    symbol: '♇',
    type: 'transpersonal',
    color: '#9333ea',
    esotericMeaning: 'Radikale Wandlung, Tod und Wiedergeburt, Hebung des unbewussten Schattens und Seelenalchemie.'
  },
  NorthNode: {
    id: 'NorthNode',
    name: 'Mondknoten (Nord)',
    nameEn: 'North Node',
    symbol: '☊',
    type: 'karmic',
    color: '#facc15',
    esotericMeaning: 'Der evolutionäre Seelenauftrag: Der Entwicklungsweg aus alten Mustern in das neue Bewusstsein.'
  },
  Chiron: {
    id: 'Chiron',
    name: 'Chiron',
    nameEn: 'Chiron',
    symbol: '⚷',
    type: 'karmic',
    color: '#10b981',
    esotericMeaning: 'Der verwundete Heiler: Die Urwunde, die nach Annahme zur tiefsten Gabe und Weisheit wird.'
  },
  Lilith: {
    id: 'Lilith',
    name: 'Lilith (Schwarzer Mond)',
    nameEn: 'Lilith',
    symbol: '⚸',
    type: 'karmic',
    color: '#ec4899',
    esotericMeaning: 'Die ungezähmte Seelenkraft, die Verweigerung falscher Anpassung und reine authentische Ur-Autonomie.'
  }
};

export interface AspectDefinition {
  name: string;
  nameEn: string;
  angle: number;
  orb: number;
  symbol: string;
  nature: 'harmonious' | 'dynamic' | 'neutral' | 'karmic';
  color: string;
  esotericMeaning: string;
}

export const ASPECTS: Record<string, AspectDefinition> = {
  Conjunction: {
    name: 'Konjunktion',
    nameEn: 'Conjunction',
    angle: 0,
    orb: 8,
    symbol: '☌',
    nature: 'neutral',
    color: '#f59e0b',
    esotericMeaning: 'Vollkommene Verschmelzung und Bündelung zweier Kräfte zu einem kraftvollen Fokus.'
  },
  Sextile: {
    name: 'Sextil',
    nameEn: 'Sextile',
    angle: 60,
    orb: 5,
    symbol: '⚹',
    nature: 'harmonious',
    color: '#06b6d4',
    esotericMeaning: 'Harmonische Inspiration und schöpferische Möglichkeiten, die Aktivierung erfordern.'
  },
  Square: {
    name: 'Quadrat',
    nameEn: 'Square',
    angle: 90,
    orb: 7,
    symbol: '□',
    nature: 'dynamic',
    color: '#ef4444',
    esotericMeaning: 'Kreative Spannung und Reibung, die seelisches Wachstum und Transformation erzwingt.'
  },
  Trine: {
    name: 'Trigon',
    nameEn: 'Trine',
    angle: 120,
    orb: 8,
    symbol: '△',
    nature: 'harmonious',
    color: '#10b981',
    esotericMeaning: 'Müheloser Fluss, angeborene Seelengaben, kosmische Harmonie und natürlicher Austausch.'
  },
  Opposition: {
    name: 'Opposition',
    nameEn: 'Opposition',
    angle: 180,
    orb: 8,
    symbol: '☍',
    nature: 'dynamic',
    color: '#dc2626',
    esotericMeaning: 'Spiegelung und Bewusstwerdung durch Polarität; die Einladung zur inneren Synthese.'
  },
  Quincunx: {
    name: 'Quinkunx',
    nameEn: 'Quincunx',
    angle: 150,
    orb: 3.5,
    symbol: '⚻',
    nature: 'karmic',
    color: '#a855f7',
    esotericMeaning: 'Karmische Justierung und ständige innere Neuausrichtung zwischen zwei fremden Ebenen.'
  },
  SemiSextile: {
    name: 'Halbsextil',
    nameEn: 'Semi-Sextile',
    angle: 30,
    orb: 2,
    symbol: '⚺',
    nature: 'neutral',
    color: '#64748b',
    esotericMeaning: 'Feine Reizung und subtile Wachstumsanreize benachbarter Qualitäten.'
  }
};
