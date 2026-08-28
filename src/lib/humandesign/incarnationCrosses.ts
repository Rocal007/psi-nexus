import type { HDIncarnationCross } from './types';
import { getGateData } from './gatesData';

export const CROSS_NAMES_BY_SUN_GATE: Record<number, { rightAngle: string; juxtaposition: string; leftAngle: string; mission: string }> = {
  1: {
    rightAngle: 'Kreuz des Schöpferischen (Sphinx 4)',
    juxtaposition: 'Kreuz des Selbstausdrucks',
    leftAngle: 'Kreuz des Trotzes',
    mission: 'Die Schöpfungskraft des Kosmos in einzigartige materielle und künstlerische Formen gießen.'
  },
  2: {
    rightAngle: 'Kreuz der Sphinx (Sphinx 2)',
    juxtaposition: 'Kreuz des Treibers',
    leftAngle: 'Kreuz der Richtung',
    mission: 'Den Menschen den höheren Weg und die magnetische Orientierung des Lebens aufzuzeigen.'
  },
  3: {
    rightAngle: 'Kreuz der Gesetze (Mutation)',
    juxtaposition: 'Kreuz der Ordnung',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Neues aus dem Chaos erblühen lassen und veraltete Strukturen durch Innovation transformieren.'
  },
  4: {
    rightAngle: 'Kreuz der Erklärung',
    juxtaposition: 'Kreuz der Formeln',
    leftAngle: 'Kreuz der Revolution',
    mission: 'Verständliche mentale Lösungen und zukunftsfähige Formeln für die Menschheit bereitstellen.'
  },
  5: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz der Gewohnheiten',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Den natürlichen Lebensrhythmus und das göttliche Timing im Alltag verankern.'
  },
  6: {
    rightAngle: 'Kreuz des Edens',
    juxtaposition: 'Kreuz des Konflikts',
    leftAngle: 'Kreuz der Ebene',
    mission: 'Emotionale Reife und friedvolle Intimität zwischen Menschen stiften.'
  },
  7: {
    rightAngle: 'Kreuz der Sphinx (Sphinx 3)',
    juxtaposition: 'Kreuz der Interaktion',
    leftAngle: 'Kreuz der Masken',
    mission: 'Führung zum Wohle aller mit Weitsicht und demokratischer Integrität ausüben.'
  },
  8: {
    rightAngle: 'Kreuz der Ansteckung',
    juxtaposition: 'Kreuz des Beitrags',
    leftAngle: 'Kreuz der Ungewissheit',
    mission: 'Individuelle Einzigartigkeit mutig vorleben und andere zum Schöpfertum anstiften.'
  },
  9: {
    rightAngle: 'Kreuz der Planung',
    juxtaposition: 'Kreuz des Fokus',
    leftAngle: 'Kreuz der Identifikation',
    mission: 'Detailtreue und ausdauernde Kraft auf die Vollendung großer Visionen bündeln.'
  },
  10: {
    rightAngle: 'Kreuz des Gefäßes der Liebe',
    juxtaposition: 'Kreuz des Verhaltens',
    leftAngle: 'Kreuz des Vorbeugens',
    mission: 'Bedingungslose Selbstliebe und natürliche Authentizität in die Welt tragen.'
  },
  11: {
    rightAngle: 'Kreuz des Edens',
    juxtaposition: 'Kreuz der Ideen',
    leftAngle: 'Kreuz der Bildung',
    mission: 'Inspirierende philosophische Konzepte und ermutigende Zukunftsideen säen.'
  },
  12: {
    rightAngle: 'Kreuz des Edens',
    juxtaposition: 'Kreuz des Artikulieren',
    leftAngle: 'Kreuz der Erziehung',
    mission: 'Poetische Schönheit und feinsinnige Sprache zur Herzensöffnung der Menschen nutzen.'
  },
  13: {
    rightAngle: 'Kreuz der Sphinx (Sphinx 1)',
    juxtaposition: 'Kreuz des Zuhörens',
    leftAngle: 'Kreuz der Masken',
    mission: 'Die Geschichten und Geheimnisse der Menschheit sammeln und als Lebensweisheit hüten.'
  },
  14: {
    rightAngle: 'Kreuz der Ansteckung',
    juxtaposition: 'Kreuz der Fähigkeiten',
    leftAngle: 'Kreuz der Ungewissheit',
    mission: 'Reiche materielle und vitale Ressourcen schaffen und gerecht zum Wohle aller einsetzen.'
  },
  15: {
    rightAngle: 'Kreuz des Gefäßes der Liebe',
    juxtaposition: 'Kreuz der Extreme',
    leftAngle: 'Kreuz des Vorbeugens',
    mission: 'Die gesamte Vielfalt menschlicher Ausdrucksformen mit tiefer Menschenliebe umarmen.'
  },
  16: {
    rightAngle: 'Kreuz der Planung',
    juxtaposition: 'Kreuz des Experiments',
    leftAngle: 'Kreuz der Identifikation',
    mission: 'Handwerkliche und künstlerische Meisterschaft durch Hingabe und Begeisterung entfalten.'
  },
  17: {
    rightAngle: 'Kreuz des Dienstes',
    juxtaposition: 'Kreuz der Meinungen',
    leftAngle: 'Kreuz der Umwälzung',
    mission: 'Weitsichtige logische Konzepte zur Verbesserung des menschlichen Zusammenlebens schaffen.'
  },
  18: {
    rightAngle: 'Kreuz des Dienstes',
    juxtaposition: 'Kreuz der Korrektur',
    leftAngle: 'Kreuz der Umwälzung',
    mission: 'Systeme heilen, Fehler korrigieren und die Lebensqualität für kommende Generationen sichern.'
  },
  19: {
    rightAngle: 'Kreuz der Vier Wege',
    juxtaposition: 'Kreuz der Bedürfnisse',
    leftAngle: 'Kreuz der Verfeinerung',
    mission: 'Feinfühlige Fürsorge für die Grundbedürfnisse und die Würde aller Wesen etablieren.'
  },
  20: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz der Gegenwart',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Im ewigen Jetzt erwachen und reine, lebendige Gegenwärtigkeit ausstrahlen.'
  },
  21: {
    rightAngle: 'Kreuz der Spannung',
    juxtaposition: 'Kreuz der Kontrolle',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Ressourcen souverän verwalten und Freiheit durch kluge Eigenständigkeit sichern.'
  },
  22: {
    rightAngle: 'Kreuz des Herrschers',
    juxtaposition: 'Kreuz der Gnade',
    leftAngle: 'Kreuz des Informierens',
    mission: 'Emotionale Anmut, soziale Eleganz und künstlerische Erhebung in die Gesellschaft bringen.'
  },
  23: {
    rightAngle: 'Kreuz der Erklärung',
    juxtaposition: 'Kreuz der Assimilation',
    leftAngle: 'Kreuz der Hingabe',
    mission: 'Komplexe Zusammenhänge in kristallklare, einfache Wahrheiten übersetzen.'
  },
  24: {
    rightAngle: 'Kreuz der vier Wege',
    juxtaposition: 'Kreuz der Rationalisierung',
    leftAngle: 'Kreuz der Inkarnation',
    mission: 'Neue geistige Durchbrüche und Erfindungen aus der inneren Stille gebären.'
  },
  25: {
    rightAngle: 'Kreuz des Gefäßes der Liebe',
    juxtaposition: 'Kreuz der Unschuld',
    leftAngle: 'Kreuz des Heilens',
    mission: 'Universelle, bedingungslose Liebe und Akzeptanz für alles Lebendige verströmen.'
  },
  26: {
    rightAngle: 'Kreuz des Herrschers',
    juxtaposition: 'Kreuz des Tricksters',
    leftAngle: 'Kreuz der Konfrontation',
    mission: 'Ideen und Wahrheiten mit unnachahmlicher Überzeugungskraft in die Welt tragen.'
  },
  27: {
    rightAngle: 'Kreuz des Unerwarteten',
    juxtaposition: 'Kreuz der Fürsorge',
    leftAngle: 'Kreuz der Ausrichtung',
    mission: 'Die Schwachen nähren, schützen und bedingungslose Fürsorge leben.'
  },
  28: {
    rightAngle: 'Kreuz des Unerwarteten',
    juxtaposition: 'Kreuz des Risikos',
    leftAngle: 'Kreuz der Ausrichtung',
    mission: 'Den wahren Sinn des Lebens durch mutiges Eintreten für Werte ergründen.'
  },
  29: {
    rightAngle: 'Kreuz der Ansteckung',
    juxtaposition: 'Kreuz der Hingabe',
    leftAngle: 'Kreuz der Ungewissheit',
    mission: 'Vollherzige Hingabe an das Leben und das Meistern tiefgreifender Erfahrungen.'
  },
  30: {
    rightAngle: 'Kreuz der Ansteckung',
    juxtaposition: 'Kreuz des Schicksals',
    leftAngle: 'Kreuz der Ungewissheit',
    mission: 'Das Feuer der Sehnsucht und menschlicher Träume in schöpferische Reife wandeln.'
  },
  31: {
    rightAngle: 'Kreuz des Unerwarteten',
    juxtaposition: 'Kreuz des Einflusses',
    leftAngle: 'Kreuz der Ausrichtung',
    mission: 'Inspirierende, dienende Führung durch die Macht des gesprochenen Wortes.'
  },
  32: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz der Bewahrung',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Das Überleben und das nachhaltige Wachstum der Gemeinschaft sichern.'
  },
  33: {
    rightAngle: 'Kreuz der vier Wege',
    juxtaposition: 'Kreuz des Rückzugs',
    leftAngle: 'Kreuz der Verfeinerung',
    mission: 'Lebenserfahrungen in der Stille reflektieren und als Weisheitslehren weitergeben.'
  },
  34: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz der Macht',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Reine vitale Kraft im Dienst des Lebens und der Wahrheit entfalten.'
  },
  35: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz der Erfahrung',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Neue Horizonte für die Menschheit erschließen und Wandel mutig annehmen.'
  },
  36: {
    rightAngle: 'Kreuz des Edens',
    juxtaposition: 'Kreuz der Krise',
    leftAngle: 'Kreuz der Ebene',
    mission: 'Emotionale Krisen durchleben und in tiefe menschliche Weisheit verwandeln.'
  },
  37: {
    rightAngle: 'Kreuz der Planung',
    juxtaposition: 'Kreuz der Familie',
    leftAngle: 'Kreuz der Migration',
    mission: 'Herzenswärme, Loyalität und verbindliche Verträge für die Sippe stiften.'
  },
  38: {
    rightAngle: 'Kreuz der Spannung',
    juxtaposition: 'Kreuz des Widerstands',
    leftAngle: 'Kreuz des Individualismus',
    mission: 'Unbeirrt für höhere Ideale und den wahren Lebenssinn kämpfen.'
  },
  39: {
    rightAngle: 'Kreuz der Spannung',
    juxtaposition: 'Kreuz der Provokation',
    leftAngle: 'Kreuz des Individualismus',
    mission: 'Eingeschlafene Geister wecken und die Leidenschaft des Lebens entfachen.'
  },
  40: {
    rightAngle: 'Kreuz der Planung',
    juxtaposition: 'Kreuz der Verhandlung',
    leftAngle: 'Kreuz der Migration',
    mission: 'Durch Arbeit für die Gemeinschaft Wohlstand und Erholung für alle sichern.'
  },
  41: {
    rightAngle: 'Kreuz des Unerwarteten',
    juxtaposition: 'Kreuz der Fantasie',
    leftAngle: 'Kreuz der Ausrichtung',
    mission: 'Den universellen Traum neuer Möglichkeiten und Zyklen initiieren.'
  },
  42: {
    rightAngle: 'Kreuz der Gesetze',
    juxtaposition: 'Kreuz des Abschlusses',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Begonnene Zyklen zur Reife führen und heilsame Ernte ermöglichen.'
  },
  43: {
    rightAngle: 'Kreuz der Erklärung',
    juxtaposition: 'Kreuz der Einsicht',
    leftAngle: 'Kreuz der Hingabe',
    mission: 'Eigene, bahnbrechende Einsichten in verständliche Konzepte übersetzen.'
  },
  44: {
    rightAngle: 'Kreuz der vier Wege',
    juxtaposition: 'Kreuz der Wachsamkeit',
    leftAngle: 'Kreuz der Verfeinerung',
    mission: 'Aus der Vergangenheit lernen und die richtigen Talente miteinander vernetzen.'
  },
  45: {
    rightAngle: 'Kreuz des Herrschers',
    juxtaposition: 'Kreuz des Besitzes',
    leftAngle: 'Kreuz der Konfrontation',
    mission: 'Gemeinschaftlichen Reichtum hüten, mehren und weise verteilen.'
  },
  46: {
    rightAngle: 'Kreuz des Gefäßes der Liebe',
    juxtaposition: 'Kreuz des Glücks',
    leftAngle: 'Kreuz des Heilens',
    mission: 'Den physischen Körper als Tempel ehren und das Wunder des Daseins feiern.'
  },
  47: {
    rightAngle: 'Kreuz des Herrschers',
    juxtaposition: 'Kreuz der Unterdrückung',
    leftAngle: 'Kreuz des Informierens',
    mission: 'Alte Zweifel und Verwirrung der Vergangenheit in klare Weisheit verwandeln.'
  },
  48: {
    rightAngle: 'Kreuz der Spannung',
    juxtaposition: 'Kreuz der Tiefe',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Umfassendes Wissen und praxistaugliche Lösungen aus der Tiefe schöpfen.'
  },
  49: {
    rightAngle: 'Kreuz der Erklärung',
    juxtaposition: 'Kreuz der Prinzipien',
    leftAngle: 'Kreuz der Revolution',
    mission: 'Gerechte ethische Prinzipien verteidigen und heilsame Reformen anstoßen.'
  },
  50: {
    rightAngle: 'Kreuz der Gesetze',
    juxtaposition: 'Kreuz der Werte',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Ethische Grundwerte hüten und das Überleben der Gemeinschaft sichern.'
  },
  51: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz des Schocks',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Menschen durch heilsame Erschütterungen ins geistige Erwachen katapultieren.'
  },
  52: {
    rightAngle: 'Kreuz des Dienstes',
    juxtaposition: 'Kreuz der Stille',
    leftAngle: 'Kreuz der Umwälzung',
    mission: 'Ruhe im Sturm bewahren und mit Laserfokus an großen Werken bauen.'
  },
  53: {
    rightAngle: 'Kreuz der Gesetze',
    juxtaposition: 'Kreuz des Neuanfangs',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Neue energetische Prozesse und evolutionäre Kapitel mutig aufschlagen.'
  },
  54: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz des Ehrgeizes',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Materiellen Ehrgeiz in spirituellen und gemeinschaftlichen Aufstieg transformieren.'
  },
  55: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz der Stimmung',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Emotionale Freiheit, Füllebewusstsein und seelische Tiefe manifestieren.'
  },
  56: {
    rightAngle: 'Kreuz der Gesetze',
    juxtaposition: 'Kreuz des Geschichtenerzählers',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Die Wunder der Welt bereisen und als inspirierende Geschichten weitergeben.'
  },
  57: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz der Intuition',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Mit blitzschneller Intuition Klarheit und Sicherheit im Augenblick schenken.'
  },
  58: {
    rightAngle: 'Kreuz des Dienstes',
    juxtaposition: 'Kreuz der Vitalität',
    leftAngle: 'Kreuz der Umwälzung',
    mission: 'Unbändige Lebensfreude versprühen und zur stetigen Verbesserung anspornen.'
  },
  59: {
    rightAngle: 'Kreuz des Schlafenden Phönix',
    juxtaposition: 'Kreuz der Fruchtbarkeit',
    leftAngle: 'Kreuz der Dualität',
    mission: 'Schranken zwischen Seelen einreißen und fruchtbare Nähe stiften.'
  },
  60: {
    rightAngle: 'Kreuz der Gesetze',
    juxtaposition: 'Kreuz der Begrenzung',
    leftAngle: 'Kreuz der Wünsche',
    mission: 'Innerhalb fester Strukturen und Grenzen revolutionäre Mutation erschaffen.'
  },
  61: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz des Mysteriums',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Das Licht der inneren Wahrheit und der universellen Mysterien entzünden.'
  },
  62: {
    rightAngle: 'Kreuz der Erklärung',
    juxtaposition: 'Kreuz der Details',
    leftAngle: 'Kreuz der Revolution',
    mission: 'Präzise Benennung von Fakten und logische Ordnung in die Welt bringen.'
  },
  63: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz des Zweifels',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Wahrheit von Illusion durch unbestechliche logische Überprüfung scheiden.'
  },
  64: {
    rightAngle: 'Kreuz des Bewusstseins',
    juxtaposition: 'Kreuz der Verwirrung',
    leftAngle: 'Kreuz der Trennung',
    mission: 'Die Fülle vergangener Bilder in zeitlose Kunst und Weisheit transformieren.'
  }
};

export function determineIncarnationCross(
  pSunGate: number,
  pSunLine: number,
  pEarthGate: number,
  dSunGate: number,
  dEarthGate: number,
  profileCode: string
): HDIncarnationCross {
  let crossType: 'RightAngle' | 'Juxtaposition' | 'LeftAngle' = 'RightAngle';
  let crossTypeGerman = 'Rechtswinkliges Kreuz (Persönliches Schicksal)';

  if (profileCode === '4/1') {
    crossType = 'Juxtaposition';
    crossTypeGerman = 'Nebeneinanderliegendes Kreuz (Fixes Schicksal)';
  } else if (['5/1', '5/2', '6/2', '6/3'].includes(profileCode)) {
    crossType = 'LeftAngle';
    crossTypeGerman = 'Linkswinkliges Kreuz (Transpersonales Karma)';
  }

  const crossInfo = CROSS_NAMES_BY_SUN_GATE[pSunGate] || {
    rightAngle: `Kreuz von Tor ${pSunGate}`,
    juxtaposition: `Juxtaposition Kreuz von Tor ${pSunGate}`,
    leftAngle: `Linkswinkliges Kreuz von Tor ${pSunGate}`,
    mission: 'Den individuellen Seelenauftrag im Einklang mit der kosmischen Bestimmung erfüllen.'
  };

  let name = crossInfo.rightAngle;
  if (crossType === 'Juxtaposition') name = crossInfo.juxtaposition;
  if (crossType === 'LeftAngle') name = crossInfo.leftAngle;

  // Determine Quarter
  let quarter = '1. Quartal der Initiation (Geist & Sinn)';
  if (pSunGate >= 2 && pSunGate <= 33) quarter = '2. Quartal der Zivilisation (Form & Körper)';
  if (pSunGate >= 7 && pSunGate <= 44) quarter = '3. Quartal der Dualität (Beziehung & Bindung)';
  if (pSunGate >= 1 && pSunGate <= 19) quarter = '4. Quartal der Mutation (Transformation & Geist)';

  return {
    type: crossType,
    typeGerman: crossTypeGerman,
    name,
    quarter,
    gates: {
      personalitySun: pSunGate,
      personalityEarth: pEarthGate,
      designSun: dSunGate,
      designEarth: dEarthGate
    },
    missionDescription: crossInfo.mission
  };
}
