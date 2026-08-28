import type { HDCenterId, HDCenterInfo } from './types';

export const HD_CENTERS: Record<HDCenterId, HDCenterInfo> = {
  head: {
    id: 'head',
    name: 'Head Center',
    germanName: 'Kopf-Zentrum (Krone)',
    type: 'pressure',
    primaryColor: '#facc15', // Yellow
    lightBgColor: 'rgba(250, 204, 21, 0.15)',
    gates: [64, 61, 63],
    biologicalCorrelations: ['Zirbeldrüse (Epiphyse)', 'Melatonin-Ausschüttung', 'Neurochemischer Inspirationsimpuls'],
    definedGift: 'Feste, verlässliche Quelle geistiger Inspiration und mentaler Fragestellungen; strahlt mentale Fokussierung aus.',
    undefinedWisdom: 'Grenzenlose Freiheit für vielfältige Denkweisen; Fähigkeit zu erkennen, wessen Gedanken wirklich wichtig und inspirierend sind.',
    notSelfQuestion: 'Versuche ich ständig, die Fragen und Probleme anderer Menschen zu beantworten oder mich über unwichtige Dinge zu zermürben?',
    deconditioningKey: 'Lerne loszulassen: Nicht jede mentale Frage in deinem Kopf ist deine Aufgabe oder muss durchdacht werden.'
  },
  ajna: {
    id: 'ajna',
    name: 'Ajna Center',
    germanName: 'Ajna-Zentrum (Verstand)',
    type: 'awareness',
    primaryColor: '#22c55e', // Green
    lightBgColor: 'rgba(34, 197, 94, 0.15)',
    gates: [47, 24, 4, 17, 43, 11],
    biologicalCorrelations: ['Hypophyse (Hirnanhangsdrüse)', 'Neokortex', 'Informationsverarbeitung & Logik'],
    definedGift: 'Feste mentale Verarbeitungsweise; konsistente logische, abstrakte oder individuelle Denkmuster und verlässliche Meinungsbildung.',
    undefinedWisdom: 'Flexibler, unvoreingenommener Geist; kann Gedanken und Konzepte ohne starre Vorurteile durchleuchten und erfassen.',
    notSelfQuestion: 'Versuche ich krampfhaft, mir selbst und anderen zu beweisen, dass ich sicher bin und feste Meinungen haben muss?',
    deconditioningKey: 'Erlaube deinem Verstand, ein weises Beobachtungs- und Beratungs-Werkzeug zu sein, statt dein Lebensentscheider zu sein.'
  },
  throat: {
    id: 'throat',
    name: 'Throat Center',
    germanName: 'Kehl-Zentrum (Manifestation & Ausdruck)',
    type: 'manifestation',
    primaryColor: '#b45309', // Amber / Brown
    lightBgColor: 'rgba(180, 83, 9, 0.15)',
    gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
    biologicalCorrelations: ['Schilddrüse (Thyroid)', 'Nebenschilddrüse', 'Metabolismus & Sprache'],
    definedGift: 'Konsistente, kraftvolle Stimme und verlässliche Manifestationskraft in Sprache, Handlung und schöpferischem Wirken.',
    undefinedWisdom: 'Chamäleon der Kommunikation; kann die Stimme an jeden Zuhörer und jedes Umfeld adaptieren und wahrhaftige Resonanz erzeugen.',
    notSelfQuestion: 'Versuche ich ständig, die Aufmerksamkeit auf mich zu ziehen oder ungefragt das Wort zu ergreifen?',
    deconditioningKey: 'Warte auf die natürliche Resonanz: Wenn du sprichst, ohne Aufmerksamkeit erzwingen zu wollen, haben deine Worte maximale Kraft.'
  },
  gCenter: {
    id: 'gCenter',
    name: 'G-Center (Identity)',
    germanName: 'G-Zentrum (Selbst, Richtung & Liebe)',
    type: 'identity',
    primaryColor: '#eab308', // Diamond Gold
    lightBgColor: 'rgba(234, 179, 8, 0.15)',
    gates: [1, 13, 25, 46, 2, 15, 10, 7],
    biologicalCorrelations: ['Leber', 'Blutkreislauf', 'Magnetischer Monopol (Seelenkompass)'],
    definedGift: 'Unerschütterliches Identitätsgefühl, verlässlicher innerer Lebenskompass und anziehende Ausstrahlung bedingungsloser Ausrichtung.',
    undefinedWisdom: 'Tiefe Wahrnehmung dafür, wer die Menschen in deiner Umgebung wirklich sind und wohin sie sich bewegen; Meister der Orte.',
    notSelfQuestion: 'Bin ich ständig auf der Suche nach Liebe, Zugehörigkeit und einer festen Identität oder Lebensrichtung?',
    deconditioningKey: 'Wenn du am richtigen physischen Ort bist, bist du automatisch mit den richtigen Menschen und auf dem richtigen Weg.'
  },
  heart: {
    id: 'heart',
    name: 'Heart / Ego Center',
    germanName: 'Herz- & Ego-Zentrum (Willenskraft & Wert)',
    type: 'motor',
    primaryColor: '#ef4444', // Red
    lightBgColor: 'rgba(239, 68, 68, 0.15)',
    gates: [21, 40, 26, 51],
    biologicalCorrelations: ['Herzmuskel', 'Magen', 'Gallenblase', 'Thymusdrüse'],
    definedGift: 'Echte, konsistente Willenskraft und Durchsetzungsstärke; kann feste Versprechen abgeben und materielle Ressourcen souverän steuern.',
    undefinedWisdom: 'Weisheit über wahren Selbstwert unabhängig von Leistung; frei vom Zwang, sich oder anderen etwas beweisen zu müssen.',
    notSelfQuestion: 'Versuche ich ständig meinen Wert durch Leistung, Disziplin oder das Erfüllen von Versprechen zu beweisen?',
    deconditioningKey: 'Dein Wert ist absolut und angeboren. Gib keine Versprechen ab, die deine Willenskraft künstlich erzwingen wollen.'
  },
  solarPlexus: {
    id: 'solarPlexus',
    name: 'Solar Plexus Center',
    germanName: 'Solarplexus-Zentrum (Emotionen & Wellen)',
    type: 'awareness',
    primaryColor: '#f97316', // Coral / Orange
    lightBgColor: 'rgba(249, 115, 22, 0.15)',
    gates: [36, 22, 37, 6, 49, 55, 30],
    biologicalCorrelations: ['Nieren', 'Bauchspeicheldrüse (Pankreas)', 'Nervensystem', 'Lunge'],
    definedGift: 'Tiefes emotionales Spektrum; erzeugt eine eigene emotionale Welle und bringt emotionale Reife, Wärme und Intensität in die Welt.',
    undefinedWisdom: 'Hochsensibler emotionaler Spiegel; kann die Gefühle und Stimmungen anderer Menschen empathisch spüren und klar durchschauen.',
    notSelfQuestion: 'Vermeide ich Konfrontation und Wahrheit, um Konflikte zu umgehen und es anderen recht zu machen?',
    deconditioningKey: 'Nimm die Emotionen anderer nicht als deine eigenen an. Du bist das klare Wasser, nicht die Welle.'
  },
  sacral: {
    id: 'sacral',
    name: 'Sacral Center',
    germanName: 'Sakral-Zentrum (Lebenskraft & Schaffensenergie)',
    type: 'motor',
    primaryColor: '#dc2626', // Scarlet Red
    lightBgColor: 'rgba(220, 38, 38, 0.15)',
    gates: [34, 5, 14, 29, 59, 9, 3, 42, 27],
    biologicalCorrelations: ['Eierstöcke / Hoden', 'Reproduktionsorgane', 'Vitalitäts- & Arbeitsmotor'],
    definedGift: 'Unerschöpfliche vitale Lebens- und Schaffenskraft für Dinge, die echte sakrale Freude entfachen (Generator-Kraftwerk).',
    undefinedWisdom: 'Weisheit über Lebensenergie und Arbeitsrhythmen; weiß intuitiv, wer wie viel arbeiten sollte und wann genug ist.',
    notSelfQuestion: 'Weiß ich nicht, wann genug ist, und arbeite ich bis zur totalen Erschöpfung weiter?',
    deconditioningKey: 'Du bist nicht gebaut für einen permanenten 9-to-5 Arbeitsmarathon. Nutze Energie-Impulse und respektiere Ruhephasen.'
  },
  spleen: {
    id: 'spleen',
    name: 'Spleen Center',
    germanName: 'Milz-Zentrum (Instinkt, Intuition & Immunsystem)',
    type: 'awareness',
    primaryColor: '#d97706', // Ochre Amber
    lightBgColor: 'rgba(217, 119, 6, 0.15)',
    gates: [48, 57, 44, 50, 32, 28, 18],
    biologicalCorrelations: ['Milz', 'Lymphsystem', 'Immunsystem & Zelluläres Gedächtnis'],
    definedGift: 'Spontanes, blitzschnelles Überlebens- und Wohlfühl-Gespür im Jetzt; spendet anderen ein Gefühl von Sicherheit und Gesundheit.',
    undefinedWisdom: 'Feinfühliger Barometer für gesundheitliche und energetische Schwingungen in Menschen und Räumen; kann toxische Muster sofort orten.',
    notSelfQuestion: 'Halte ich an Dingen, Beziehungen oder Gewohnheiten fest, die mir längst nicht mehr gut tun, aus Angst vor dem Alleinsein?',
    deconditioningKey: 'Lerne loszulassen: Bleibe nicht in Situationen oder Kontakten, nur weil sie sich vertraut anfühlen.'
  },
  root: {
    id: 'root',
    name: 'Root Center',
    germanName: 'Wurzel-Zentrum (Antrieb, Druck & Stressresilienz)',
    type: 'pressure',
    primaryColor: '#78350f', // Terracotta / Earth
    lightBgColor: 'rgba(120, 53, 15, 0.15)',
    gates: [58, 38, 54, 53, 60, 52, 19, 39, 41],
    biologicalCorrelations: ['Nebennieren', 'Adrenalin- & Cortisol-Ausschüttung', 'Wirbelsäulenbasis'],
    definedGift: 'Konsistenter Umgang mit Stress und äußerem Druck; wandelt Adrenalin in zielgerichtete Vorwärtsbewegung und Produktivität um.',
    undefinedWisdom: 'Fähigkeit, den Druck der Welt gelassen wahrzunehmen, ohne sich hetzen zu lassen; Meister der Entschleunigung.',
    notSelfQuestion: 'Hetze ich ständig durch mein Leben, um mich schnellstmöglich von äußeren Druckquellen zu befreien?',
    deconditioningKey: 'Druck von außen ist kein Befehl zum sofortigen Handeln. Lass den Stress durch dich hindurchfließen, ohne ihn zu deinem Motor zu machen.'
  }
};

export const ALL_CENTER_IDS: HDCenterId[] = [
  'head',
  'ajna',
  'throat',
  'gCenter',
  'heart',
  'solarPlexus',
  'sacral',
  'spleen',
  'root'
];

export function getCenterInfo(id: HDCenterId): HDCenterInfo {
  return HD_CENTERS[id];
}
