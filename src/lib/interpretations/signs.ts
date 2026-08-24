export interface EsotericSignInterpretation {
  id: string;
  name: string;
  element: string;
  modality: string;
  esotericRay: string;
  soulMotto: string;
  personalityMotto: string;
  soulPurpose: string;
  shadowAspect: string;
  healingKey: string;
  esotericRulerDescription: string;
}

export const ESOTERIC_SIGNS: Record<string, EsotericSignInterpretation> = {
  aries: {
    id: 'aries',
    name: 'Widder',
    element: 'Feuer',
    modality: 'Kardinal',
    esotericRay: '1. Strahl (Wille & Macht) / 7. Strahl (Ordnung)',
    soulMotto: '»Ich trete hervor und herrsche von der geistigen Ebene aus.«',
    personalityMotto: '»Hier bin ich – nimm dich in Acht!«',
    soulPurpose: 'Die Transformation von impulsivem Selbsterhaltungsdrang in mutigen Schöpferwillen. Widder auf Seelenebene ist der Pionier neuer Bewusstseinsimpulse, der unerschrocken Wege bahnt, wo noch keine Pfade existieren.',
    shadowAspect: 'Ungeduld, Reaktivität, Dominanz und die Flucht nach vorn aus Angst vor eigener Verletzlichkeit.',
    healingKey: 'Das Innehalten im Moment der Reizung: Den inneren Krieger in den Dienst des Herzens stellen.',
    esotericRulerDescription: 'Merkur ist der esoterische Herrscher: Er lenkt den Widder-Willen durch geistige Klarheit und göttliche Intuition statt durch blinden Trieb.'
  },
  taurus: {
    id: 'taurus',
    name: 'Stier',
    element: 'Erde',
    modality: 'Fix',
    esotericRay: '4. Strahl (Harmonie durch Konflikt)',
    soulMotto: '»Ich sehe, und wenn das Auge geöffnet ist, ist alles Licht.«',
    personalityMotto: '»Ich besitze, also bin ich.«',
    soulPurpose: 'Die Transformation von irdischem Anhaften und Verlangen in geistige Erleuchtung. Der Stier ist der Hüter des Dritten Auges und der Verankerung göttlicher Schönheit in der Materie.',
    shadowAspect: 'Starres Beharren, Besitzansprüche, Trägheit und Widerstand gegen unausweichlichen seelischen Wandel.',
    healingKey: 'Hingabe an den Fluss des Vergänglichen: Wahre Fülle als inneren Seinszustand begreifen.',
    esotericRulerDescription: 'Vulkan ist der esoterische Herrscher: Der göttliche Schmied, der das niedere Verlangen im Feuer der Läuterung zu reinem Licht schmiedet.'
  },
  gemini: {
    id: 'gemini',
    name: 'Zwillinge',
    element: 'Luft',
    modality: 'Veränderlich',
    esotericRay: '2. Strahl (Liebe-Weisheit)',
    soulMotto: '»Ich erkenne mein anderes Selbst, und indem dieses schwindet, wachse und glühe ich.«',
    personalityMotto: '»Ich rede, verknüpfe und zerstreue mich.«',
    soulPurpose: 'Das Weben von Lichtfäden zwischen Geist und Materie. Die Zwillinge überwinden die Spaltung der Dualität und erkennen, dass alle Polaritäten Ausdruck der einen Wahrheit sind.',
    shadowAspect: 'Oberflächlichkeit, geistige Zersplitterung, emotionale Distanzierung durch Rationalisierung.',
    healingKey: 'Die Verbindung von Verstand und Herz: Sprache als heilsames Instrument wahrer Begegnung nutzen.',
    esotericRulerDescription: 'Venus ist die esoterische Herrscherin: Sie bringt die höhere Harmonie und seelische Anziehungskraft in die zwiespältige Gedankenwelt.'
  },
  cancer: {
    id: 'cancer',
    name: 'Krebs',
    element: 'Wasser',
    modality: 'Kardinal',
    esotericRay: '3. Strahl (Aktive Intelligenz) / 7. Strahl',
    soulMotto: '»Ich baue ein erleuchtetes Haus und wohne darin.«',
    personalityMotto: '»Schütze mich vor der Welt.«',
    soulPurpose: 'Die Wandlung des persönlichen Schutzpanzers in einen offenen Tempel bedingungslosen Nährens. Krebs wird zur unerschöpflichen Quelle seelischer Geborgenheit für alle Suchenden.',
    shadowAspect: 'Klammern, emotionale Manipulation durch Fürsorge, Rückzug in die Opferrolle bei Kränkung.',
    healingKey: 'Selbstnährung und Abgrenzung: Das eigene innere Kind halten, anstatt im Außen nach Rettung zu suchen.',
    esotericRulerDescription: 'Neptun ist der esoterische Herrscher: Er öffnet das Herz für kosmische Hingabe und mystisches Einssein jenseits irdischer Sippenbindungen.'
  },
  leo: {
    id: 'leo',
    name: 'Löwe',
    element: 'Feuer',
    modality: 'Fix',
    esotericRay: '1. Strahl (Wille/Macht) / 5. Strahl (Konkretes Wissen)',
    soulMotto: '»Ich bin DAS, und DAS bin ich.«',
    personalityMotto: '»Bewundert mein strahlendes Ego!«',
    soulPurpose: 'Die Wandlung von egozentrischer Selbstdarstellung zu souveränem, warmherzigem Königtum im Dienst des Ganzen. Der Löwe wird zum Kanal göttlicher Schöpferkraft.',
    shadowAspect: 'Stolz, Narzissmus, Bestätigungssucht und herablassende Überheblichkeit.',
    healingKey: 'Großmut und Demut: Die Erkenntnis, dass das eigene Licht nur Widerschein der göttlichen Ursonne ist.',
    esotericRulerDescription: 'Die Sonne (als Schleier des geistigen Herzens) offenbart den solaren Logos im menschlichen Zentrum.'
  },
  virgo: {
    id: 'virgo',
    name: 'Jungfrau',
    element: 'Erde',
    modality: 'Veränderlich',
    esotericRay: '2. Strahl (Liebe-Weisheit) / 6. Strahl',
    soulMotto: '»Ich bin die Mutter und das Kind, ich bin Materie und Geist.«',
    personalityMotto: '»Ich kritisiere und optimiere die Fehler der Welt.«',
    soulPurpose: 'Das Austragen des Christus-Bewusstseins im Schoss der irdischen Wirklichkeit. Die Jungfrau ist die Heilerin, die durch Demut, Reinheit und Meisterschaft das Geistige im Alltäglichen sichtbar macht.',
    shadowAspect: 'Hyperkritik, Kontrollzwang, Neurosen und die Angst vor dem Unvollkommenen.',
    healingKey: 'Ganzheitliche Annahme: Erkennen, dass das Unvollkommene bereits heilig und im Werden begriffen ist.',
    esotericRulerDescription: 'Der Mond (als esoterischer Schleier) birgt die schöpferische Ur-Matrix, aus der das neue Seelenleben heranreift.'
  },
  libra: {
    id: 'libra',
    name: 'Waage',
    element: 'Luft',
    modality: 'Kardinal',
    esotericRay: '3. Strahl (Aktive Intelligenz)',
    soulMotto: '»Ich wähle den Weg, der zwischen den beiden großen Kraftlinien hindurchführt.«',
    personalityMotto: '»Hauptsache Konfliktvermeidung und schöner Schein.«',
    soulPurpose: 'Das Meistern des schmalen Pfades auf Messers Schneide. Waage ist die kosmische Justiziarin, die vollkommene Seelen-Harmonie und geistige Ausgewogenheit zwischen Ich und Du stiftet.',
    shadowAspect: 'Entscheidungsunfähigkeit, Heuchelei, Opportunismus und Selbstverleugnung um des lieben Friedens willen.',
    healingKey: 'Radikale Wahrhaftigkeit: Zu den eigenen Grenzen und Werten stehen, auch wenn es reibt.',
    esotericRulerDescription: 'Uranus ist der esoterische Herrscher: Er zerschlägt scheinbare Kompromisse und führt zu intuitiver, göttlicher Ordnung.'
  },
  scorpio: {
    id: 'scorpio',
    name: 'Skorpion',
    element: 'Wasser',
    modality: 'Fix',
    esotericRay: '4. Strahl (Harmonie durch Konflikt)',
    soulMotto: '»Krieger bin ich, und aus dem Kampf gehe ich siegreich hervor.«',
    personalityMotto: '»Ich kontrolliere meine Ohnmacht durch Macht über andere.«',
    soulPurpose: 'Die alchemistische Seelentransformation. Der Skorpion steigt furchtlos in die tiefsten Schatten hinab, verbrennt alle Täuschungen im Feuer des Bewusstseins und ersteht als Phönix neu.',
    shadowAspect: 'Rachsucht, Eifersucht, Zerstörungswut, Verbitterung und paranoide Kontrollsucht.',
    healingKey: 'Radikales Vergeben und Loslassen: Die eigene Verwundbarkeit als unbesiegbare Kraft begreifen.',
    esotericRulerDescription: 'Mars auf Seelenebene: Der spirituelle Krieger, der nicht gegen Menschen kämpft, sondern gegen die eigene Illusion der Getrenntheit.'
  },
  sagittarius: {
    id: 'sagittarius',
    name: 'Schütze',
    element: 'Feuer',
    modality: 'Veränderlich',
    esotericRay: '4., 5. & 6. Strahl (Hingabe/Idealismus)',
    soulMotto: '»Ich sehe das Ziel. Ich erreiche das Ziel und sehe ein weiteres.«',
    personalityMotto: '»Ich weiß alles besser und belehre die Welt.«',
    soulPurpose: 'Der fokussierte Pfeil geistiger Erleuchtung. Vom rastlosen Abenteurer wandelt sich der Schütze zum weisen Boten kosmischer Gesetzmäßigkeiten und wahrer Sinnstiftung.',
    shadowAspect: 'Dogmatismus, Fanatismus, Maßlosigkeit und Realitätsflucht in ferne Ideale.',
    healingKey: 'Bodenhaftung und Zuhören: Die Weisheit im Einfachen und Gegenwärtigen leben.',
    esotericRulerDescription: 'Die Erde ist die esoterische Herrscherin: Sie erdet die hohen Schütze-Visionen in praktischer, lebbarer Weisheit.'
  },
  capricorn: {
    id: 'capricorn',
    name: 'Steinbock',
    element: 'Erde',
    modality: 'Kardinal',
    esotericRay: '1., 3. & 7. Strahl',
    soulMotto: '»Versunken bin ich in überirdischem Licht, doch wende ich diesem Licht den Rücken zu.«',
    personalityMotto: '»Erfolg, Härte und Status sind meine Pflicht.«',
    soulPurpose: 'Die geistige Einweihung auf dem Berggipfel. Der Steinbock erklimmt die Höhen der Meisterschaft, um das kosmische Licht als Diener der Menschheit in feste irdische Strukturen zu gießen.',
    shadowAspect: 'Kälte, emotionale Erstarrung, Zynismus, Angst vor Kontrollverlust und autoritäre Strenge.',
    healingKey: 'Weichheit und Herzöffnung: Erkennen, dass wahre Stärke aus Gnade und Mitgefühl erwächst.',
    esotericRulerDescription: 'Saturn als planetares Tor der Einweihung: Disziplin wird zum Schlüssel wahrer spiritueller Freiheit.'
  },
  aquarius: {
    id: 'aquarius',
    name: 'Wassermann',
    element: 'Luft',
    modality: 'Fix',
    esotericRay: '5. Strahl (Konkretes Wissen & Wissenschaft)',
    soulMotto: '»Wasser des Lebens bin ich, ausgegossen für dürstende Menschen.«',
    personalityMotto: '»Ich bin anders als alle anderen und rebelliere gegen alles.«',
    soulPurpose: 'Der kosmische Wasserträger. Die Überwindung egozentrischer Isolation zugunsten einer universalen Brüderlichkeit und revolutionären geistigen Erneuerung des Planeten.',
    shadowAspect: 'Kühle Distanz, elitäres Sonderlingsgehabe, Utopismus ohne emotionale Erdung.',
    healingKey: 'Herz-Verbindung: Die Wärme des einzelnen Menschen schätzen, nicht nur das abstrakte Kollektiv.',
    esotericRulerDescription: 'Jupiter ist der esoterische Herrscher: Er schenkt der uranischen Vision die Fülle liebender Inklusion und kosmischen Segens.'
  },
  pisces: {
    id: 'pisces',
    name: 'Fische',
    element: 'Wasser',
    modality: 'Veränderlich',
    esotericRay: '2. Strahl (Liebe-Weisheit) / 6. Strahl',
    soulMotto: '»Ich verlasse des Vaters Haus und indem ich zurückkehre, erlöse ich.«',
    personalityMotto: '»Ich leide an der Grausamkeit dieser Welt.«',
    soulPurpose: 'Der universale Erlöser-Archetyp. Fische vollenden den Tierkreis durch bedingungslose Liebe, Transzendenz aller Grenzen und die Heimkehr der Seele in die All-Einheit.',
    shadowAspect: 'Opfer-Märtyrer-Rolle, Suchtverhalten, Flucht vor der Realität und diffuse Grenzgänger-Verwirrung.',
    healingKey: 'Klares Gewahrsein und Erdung: Die göttliche Liebe HIER und JETZT in der Form verkörpern.',
    esotericRulerDescription: 'Pluto ist der esoterische Herrscher: Die finale Auflösung aller Ego-Grenzen zur Erlösung des reinen Seins.'
  }
};
