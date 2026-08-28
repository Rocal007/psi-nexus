// Neurodidactic Birkenbihl Cognitive Dimension Spheres (Themen-Sphären)
// Groups the 12 gates into intuitive cognitive clusters for optimal decoding (Pauken -> 0) and highest Lupos factor.

export interface SoulGate {
  id: string;
  gate: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface SoulSphere {
  id: string;
  num: string;
  name: string;
  shortQuestion: string;
  icon: string;
  themeColor: string;
  borderActive: string;
  textAccent: string;
  badgeBg: string;
  birkenbihlAnchor: string;
  gates: SoulGate[];
}

export const SOUL_SPHERES: SoulSphere[] = [
  {
    id: 'sphere_identity',
    num: 'Sphäre I',
    name: 'Wesen & Identität',
    shortQuestion: 'Wer bin ich im Kern?',
    icon: '👑',
    themeColor: 'amber',
    borderActive: 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ring-1 ring-amber-400/30',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    birkenbihlAnchor: 'Dein inneres Fundament: Entdecke deine Ur-Persönlichkeit, deine 3 Lebensbühnen und die 7 Strahlen deiner Seelenessenz.',
    gates: [
      { id: 'radix', gate: 'Tor I', label: 'Kosmisches Fundament', sublabel: 'Radix-Rad, Aspekte & 4 Achsen', icon: '🌌' },
      { id: 'pillars', gate: 'Tor II', label: 'Die 3 Lebens-Säulen', sublabel: 'Liebe, Beruf & Erfüllung', icon: '💖' },
      { id: 'dossier', gate: 'Tor III', label: 'Hohes Seelen-Dossier', sublabel: '7 Strahlen & Seelenalchemie', icon: '✦' }
    ]
  },
  {
    id: 'sphere_humandesign',
    num: 'Sphäre II',
    name: 'Human Design Matrix',
    shortQuestion: 'Wie ist mein energetisches System gebaut?',
    icon: '🧬',
    themeColor: 'amber',
    borderActive: 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ring-1 ring-amber-400/30',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    birkenbihlAnchor: 'Dein energetisches Betriebssystem: Bodygraph, 9 Zentren, 36 Kanäle, 4 PHS-Pfeile und der interaktive HD Neurodidaktik-Agent.',
    gates: [
      { id: 'humandesign', gate: 'Tor XII', label: 'Human Design Matrix', sublabel: 'Bodygraph, 9 Zentren, PHS & HD-Agent', icon: '🧬' }
    ]
  },
  {
    id: 'sphere_karma',
    num: 'Sphäre III',
    name: 'Karma & Schwingung',
    shortQuestion: 'Wohin ruft meine Seele?',
    icon: '🔮',
    themeColor: 'amber',
    borderActive: 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ring-1 ring-amber-400/30',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    birkenbihlAnchor: 'Die Zeitlinien deiner Seele: Erforsche karmische Reifungsaufgaben, pythagoräische Zahlenschwingungen & Engelsbotschaften.',
    gates: [
      { id: 'karmic', gate: 'Tor IV', label: 'Karmische Tore', sublabel: 'Mondknoten, Vertex, Chiron & Lilith', icon: '☊' },
      { id: 'numerology', gate: 'Tor V', label: 'Schwingungs-Code', sublabel: 'Pythagoras Lebensweg & Namensresonanz', icon: '🔢' },
      { id: 'angel_numbers', gate: 'Tor VI', label: 'Engelszahlen & Uhren', sublabel: 'Spiegeluhrzeiten & Synchronizitäten', icon: '🕊️' }
    ]
  },
  {
    id: 'sphere_praxis',
    num: 'Sphäre IV',
    name: 'Praxis & Rhythmus',
    shortQuestion: 'Was nährt mich im Alltag?',
    icon: '🌿',
    themeColor: 'amber',
    borderActive: 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ring-1 ring-amber-400/30',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    birkenbihlAnchor: 'Alltägliche Kraftquellen: Harmonisiere deinen Biorhythmus mit Mondphasen, Seelenkristallen und mythischen Sternbildern.',
    gates: [
      { id: 'gemstones', gate: 'Tor VII', label: 'Heilstein-Apotheke', sublabel: 'Persönliche Kristalle & Chakren-Resonanz', icon: '💎' },
      { id: 'moon_wisdom', gate: 'Tor VIII', label: 'Mond & Lebensführer', sublabel: 'Mondkalender, Haare, Haushalt & Leitspruch', icon: '🌙' },
      { id: 'constellations', gate: 'Tor IX', label: 'Sternbilder-Atlas', sublabel: '12 Zeichen & Mythologischer Himmelsführer', icon: '✨' }
    ]
  },
  {
    id: 'sphere_resonance',
    num: 'Sphäre V',
    name: 'Resonanz & Orte',
    shortQuestion: 'Wo & mit wem wachse ich?',
    icon: '🌍',
    themeColor: 'amber',
    borderActive: 'border-amber-400/80 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] ring-1 ring-amber-400/30',
    textAccent: 'text-amber-300',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    birkenbihlAnchor: 'Das äußere Beziehungsnetz: Finde deine weltweiten Kraftorte und verstehe Partner- & Familien-Karmamatrizen.',
    gates: [
      { id: 'geochart', gate: 'Tor X', label: 'Astro-Kartographie', sublabel: 'Weltkarte der persönlichen Kraftorte', icon: '🌍' },
      { id: 'synastry', gate: 'Tor XI', label: 'Partner- & Familien-Matrix', sublabel: 'Synastrie, Seelenverwandtschaft & Bande', icon: '💞' }
    ]
  }
];
