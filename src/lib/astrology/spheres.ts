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
    borderActive: 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.35)]',
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
    themeColor: 'rose',
    borderActive: 'border-rose-400 bg-rose-500/20 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.35)]',
    textAccent: 'text-rose-300',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
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
    themeColor: 'purple',
    borderActive: 'border-purple-400 bg-purple-500/20 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    textAccent: 'text-purple-300',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
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
    themeColor: 'emerald',
    borderActive: 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    textAccent: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    birkenbihlAnchor: 'Alltägliche Kraftquellen: Harmonisiere deinen Biorhythmus mit Mondphasen, Seelenkristallen und mythischen Sternbildern.',
    gates: [
      { id: 'gemstones', gate: 'Tor VII', label: 'Heilstein-Apotheke', sublabel: 'Persönliche Kristalle & Chakren-Resonanz', icon: '💎' },
      { id: 'moon_wisdom', gate: 'Tor VIII', label: 'Mond & Lebensführer', sublabel: 'Mondkalender, Haare, Haushalt & Leitspruch', icon: '🌙' },
      { id: 'constellations', gate: 'Tor IX', label: 'Sternbilder-Atlas', sublabel: '12 Tierkreise & Mythologischer Himmelsführer', icon: '✨' }
    ]
  },
  {
    id: 'sphere_resonance',
    num: 'Sphäre V',
    name: 'Resonanz & Orte',
    shortQuestion: 'Wo & mit wem wachse ich?',
    icon: '🌍',
    themeColor: 'cyan',
    borderActive: 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    textAccent: 'text-cyan-300',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    birkenbihlAnchor: 'Das äußere Beziehungsnetz: Finde deine weltweiten Kraftorte und verstehe Partner- & Familien-Karmamatrizen.',
    gates: [
      { id: 'geochart', gate: 'Tor X', label: 'Astro-Kartographie', sublabel: 'Weltkarte der persönlichen Kraftorte', icon: '🌍' },
      { id: 'synastry', gate: 'Tor XI', label: 'Partner- & Familien-Matrix', sublabel: 'Synastrie, Seelenverwandtschaft & Bande', icon: '💞' }
    ]
  }
];
