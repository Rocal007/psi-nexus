import type { HDChannel } from './types';

export const ALL_HD_CHANNELS: HDChannel[] = [
  // Head to Ajna
  {
    id: '64-47',
    gate1: 64,
    gate2: 47,
    name: 'Channel of Abstraction',
    germanName: 'Kanal der Abstraktion (Vergangene Bilder verstehen)',
    center1: 'head',
    center2: 'ajna',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Abstrakt)',
    quantumGifting: 'Fähigkeit, aus chaotischen Erinnerungen und Erfahrungen der Vergangenheit universelle Weisheitsgeschichten zu formen.',
    shadowPattern: 'Mentale Überwältigung durch Verwirrung und krampfhaftes Grübeln über das "Warum" vergangener Ereignisse.',
    masteryTheme: 'Geduld mit der geistigen Reifung: Erkenntnis kommt als plötzlicher Sinnzusammenhang im richtigen Moment.'
  },
  {
    id: '61-24',
    gate1: 61,
    gate2: 24,
    name: 'Channel of Awareness',
    germanName: 'Kanal der Bewusstheit (Der Denker / Denker-Kanal)',
    center1: 'head',
    center2: 'ajna',
    circuit: 'individual',
    circuitLabel: 'Individuell (Wissen / Inspiration)',
    quantumGifting: 'Tiefes, originelles Denken und plötzliche Geistesblitze; Fähigkeit, das Unbekannte und Geheimnisvolle zu ergründen.',
    shadowPattern: 'Gedankenschleifen und quälende Fragen über Dinge, die nicht durch den Verstand gelöst werden können.',
    masteryTheme: 'Stille im Kopf kultivieren: Der individuelle Funke der Erleuchtung zündet in Momenten entspannter Leere.'
  },
  {
    id: '63-4',
    gate1: 63,
    gate2: 4,
    name: 'Channel of Logic',
    germanName: 'Kanal der Logik (Zweifel & Formeln für die Zukunft)',
    center1: 'head',
    center2: 'ajna',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Zukunft)',
    quantumGifting: 'Brillante Mustererkennung, logische Fehlersuche und die Entwicklung zukunftsfähiger Hypothesen und Lösungen.',
    shadowPattern: 'Chronischer Selbstzweifel oder destruktive Kritiksucht gegenüber den Konzepten anderer.',
    masteryTheme: 'Zweifel als wissenschaftliches Werkzeug zur Verfeinerung nutzen, statt das eigene Leben damit anzuzweifeln.'
  },

  // Ajna to Throat
  {
    id: '17-62',
    gate1: 17,
    gate2: 62,
    name: 'Channel of Acceptance',
    germanName: 'Kanal der Akzeptanz (Die Organisation des Verstandes)',
    center1: 'ajna',
    center2: 'throat',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Struktur)',
    quantumGifting: 'Klare Strukturierung von Daten, präzise Formulierungen und verständliche Vermittlung komplexer Fakten.',
    shadowPattern: 'Dogmatisches Beharren auf der eigenen Meinung und rechthaberisches Argumentieren ohne Aufforderung.',
    masteryTheme: 'Verstehe, dass Meinungen nur hypothetische Perspektiven sind: Teile sie, wenn ein Gegenüber danach fragt.'
  },
  {
    id: '43-23',
    gate1: 43,
    gate2: 23,
    name: 'Channel of Structuring',
    germanName: 'Kanal der Strukturierung ("Vom Sonderling zum Genie")',
    center1: 'ajna',
    center2: 'throat',
    circuit: 'individual',
    circuitLabel: 'Individuell (Wissen / Sprache)',
    quantumGifting: 'Transformatische Einsichten, die revolutionäre Einfachheit in komplizierte Probleme bringen können.',
    shadowPattern: 'Taubheit für die Worte anderer und das Aussprechen von Gedanken zur falschen Zeit (wird als wirr missverstanden).',
    masteryTheme: 'Warte auf die Einladung zum Sprechen: Nur wer bereit ist zuzuhören, kann dein Genie erkennen.'
  },
  {
    id: '11-56',
    gate1: 11,
    gate2: 56,
    name: 'Channel of Curiosity',
    germanName: 'Kanal der Neugier (Der Geschichtenerzähler & Sucher)',
    center1: 'ajna',
    center2: 'throat',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Ideen)',
    quantumGifting: 'Meisterhafte Erzählkunst, Faszination für Ideen und die Gabe, andere durch Metaphern zu inspirieren.',
    shadowPattern: 'Rastlose Suche nach neuen Reizen und das Verwechseln von geistigen Ideen mit praktischen Handlungsbefehlen.',
    masteryTheme: 'Ideen sind Geschenke zum Teilen und Reflektieren, nicht zwingend Projekte, die du alle selbst umsetzen musst.'
  },

  // G-Center to Throat
  {
    id: '7-31',
    gate1: 7,
    gate2: 31,
    name: 'Channel of the Alpha',
    germanName: 'Kanal des Alphas (Führung im Guten)',
    center1: 'gCenter',
    center2: 'throat',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Führung)',
    quantumGifting: 'Natürliche Führungsautorität für die Gemeinschaft; lenkt Gruppen mit Weitsicht in eine sichere Zukunft.',
    shadowPattern: 'Versuch, Führung zu erzwingen oder autoritäre Dominanz auszuüben, ohne von der Gruppe gewählt zu sein.',
    masteryTheme: 'Wahre Führung dient der Gruppe: Führe von hinten und lasse dich von den Menschen zum Alpha ernennen.'
  },
  {
    id: '1-8',
    gate1: 1,
    gate2: 8,
    name: 'Channel of Inspiration',
    germanName: 'Kanal der Inspiration (Kreativer Selbstausdruck)',
    center1: 'gCenter',
    center2: 'throat',
    circuit: 'individual',
    circuitLabel: 'Individuell (Kreativer Ausdruck)',
    quantumGifting: 'Authentischer, einzigartiger künstlerischer oder unternehmerischer Schöpferausdruck; zieht andere durch Vorbildwirkung mit.',
    shadowPattern: 'Krampfhaftes Streben nach Einzigartigkeit oder Angst davor, als gewöhnlich wahrgenommen zu werden.',
    masteryTheme: 'Sei einfach du selbst: Deine Einzigartigkeit strahlt am hellsten, wenn du nichts beweisen willst.'
  },
  {
    id: '13-33',
    gate1: 13,
    gate2: 33,
    name: 'Channel of the Prodigal',
    germanName: 'Kanal des Zeugen (Chronist der Seelen & Geheimnisse)',
    center1: 'gCenter',
    center2: 'throat',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Erinnerung)',
    quantumGifting: 'Tiefe Fähigkeit zuzuhören; Menschen vertrauen dir ihre Geheimnisse an. Bewahrt die Weisheit erlebter Zyklen.',
    shadowPattern: 'Festhalten an altem Groll oder voreiliges Ausplaudern vertraulicher Lebensgeschichten.',
    masteryTheme: 'Rückzug und Stille: Nach intensiven Erlebnissen braucht dein System Raum zur Reflexion und Reifung.'
  },
  {
    id: '10-20',
    gate1: 10,
    gate2: 20,
    name: 'Channel of Awakening',
    germanName: 'Kanal des Erwachens (Selbstliebe im Hier & Jetzt)',
    center1: 'gCenter',
    center2: 'throat',
    circuit: 'integration',
    circuitLabel: 'Integrations-Kanal (Präsenz)',
    quantumGifting: 'Vollkommene Verankerung in der Gegenwart; strahlt bedingungslose Selbstakzeptanz und Integrität aus.',
    shadowPattern: 'Narzisstische Selbstbezogenheit oder Frustration, wenn andere noch nicht in ihrer Mitte ruhen.',
    masteryTheme: 'Einfach sein: Deine höchste Lehre an die Welt ist die Leichtigkeit deiner eigenen authentischen Präsenz.'
  },

  // G-Center to Heart / Ego
  {
    id: '25-51',
    gate1: 25,
    gate2: 51,
    name: 'Channel of Initiation',
    germanName: 'Kanal der Initiation (Der spirituelle Krieger)',
    center1: 'gCenter',
    center2: 'heart',
    circuit: 'individual',
    circuitLabel: 'Individuell (Zentrierung / Mut)',
    quantumGifting: 'Unerschrockener Mut, ins Unbekannte zu springen; initiiert andere durch Schocks und Quantensprünge ins Erwachen.',
    shadowPattern: 'Rücksichtslose Konkurrenzsucht oder das Erleiden von Burnout durch übermäßige Schockzustände.',
    masteryTheme: 'Die universelle Liebe hinter jedem Schock erkennen: Spiritueller Mut dient dem Wachstum der Seele.'
  },

  // G-Center to Sacral
  {
    id: '2-14',
    gate1: 2,
    gate2: 14,
    name: 'Channel of the Beat',
    germanName: 'Kanal des Taktes (Hüter der Schlüssel / Wohlstandskraft)',
    center1: 'gCenter',
    center2: 'sacral',
    circuit: 'individual',
    circuitLabel: 'Individuell (Generierung von Richtung)',
    quantumGifting: 'Magische Fähigkeit, vitale Ressourcen und schöpferische Arbeit so auszurichten, dass Fülle und Fortschritt entstehen.',
    shadowPattern: 'Verschwendung von Lebenskraft für Aufgaben, die keinen Sinn und keine Freude entfachen.',
    masteryTheme: 'Arbeite nur an Projekten, bei denen dein Sakralzentrum mit vollem Enthusiasmus anspringt.'
  },
  {
    id: '46-29',
    gate1: 46,
    gate2: 29,
    name: 'Channel of Discovery',
    germanName: 'Kanal der Entdeckung (Hingabe an das Erlebnis)',
    center1: 'gCenter',
    center2: 'sacral',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Körper)',
    quantumGifting: 'Vollständige körperliche Hingabe an Prozesse; zur richtigen Zeit am richtigen Ort sein und Glück im Gelingen finden.',
    shadowPattern: 'Zu allem vorschnell "Ja" sagen und in Verpflichtungen gefangen sein, die den Körper ausbrennen.',
    masteryTheme: 'Sage nur dann "Ja", wenn du bereit bist, die Reise mit allen Höhen und Tiefen ganzherzig zu vollenden.'
  },
  {
    id: '15-5',
    gate1: 15,
    gate2: 5,
    name: 'Channel of Rhythm',
    germanName: 'Kanal des Rhythmus (Im Einklang mit der Natur)',
    center1: 'gCenter',
    center2: 'sacral',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Rhythmen)',
    quantumGifting: 'Tiefe Verbundenheit mit universellen Zeitmustern und Naturrhythmen; magnetische Anziehungskraft für Menschen.',
    shadowPattern: 'Unruhe und Kampf gegen das natürliche Tempo des Lebens oder Beharren auf starren, ungesunden Routinen.',
    masteryTheme: 'Vertraue den Jahreszeiten deines Lebens: Alles hat seine festgelegte biologische und seelische Reifezeit.'
  },
  {
    id: '10-34',
    gate1: 10,
    gate2: 34,
    name: 'Channel of Exploration',
    germanName: 'Kanal der Erkundung (Kraftvolles Ausleben der Überzeugungen)',
    center1: 'gCenter',
    center2: 'sacral',
    circuit: 'individual',
    circuitLabel: 'Individuell (Zentrierung)',
    quantumGifting: 'Lebt nach eigenen Regeln und Prinzipien, ohne sich von gesellschaftlichen Konventionen verbiegen zu lassen.',
    shadowPattern: 'Egozentrische Sturheit und Ignoranz gegenüber den Bedürfnissen des engen Umfelds.',
    masteryTheme: 'Echtes Vorbild sein durch unerschütterliche Selbstachtung, ohne andere zu belehren.'
  },

  // G-Center to Spleen
  {
    id: '10-57',
    gate1: 10,
    gate2: 57,
    name: 'Channel of Perfected Form',
    germanName: 'Kanal der vollendeten Form (Überlebensinstinkt & Ästhetik)',
    center1: 'gCenter',
    center2: 'spleen',
    circuit: 'integration',
    circuitLabel: 'Integrations-Kanal (Intuition)',
    quantumGifting: 'Blitzschnelle intuitive Wahrnehmung für Harmonie, Schönheit und unmittelbare physische Sicherheit.',
    shadowPattern: 'Lähmende Zukunftsängste oder das Gefallen-Wollen um den Preis der inneren Wahrheit.',
    masteryTheme: 'Höre auf die erste leise Intuition im Körper: Sie weiß im Jetzt, wie Harmonie und Sicherheit bewahrt werden.'
  },

  // Heart / Ego to Throat
  {
    id: '21-45',
    gate1: 21,
    gate2: 45,
    name: 'Channel of Money',
    germanName: 'Kanal des Geldes (König & Schatzmeister / Kontrolle & Fülle)',
    center1: 'heart',
    center2: 'throat',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Materieller Wohlstand)',
    quantumGifting: 'Hervorragende Fähigkeit, materielle Güter, Teams und Finanzen zum Wohle der gesamten Gemeinschaft zu leiten.',
    shadowPattern: 'Kontrollzwang, Geiz oder Mikromanagement aus Angst vor Ressourcenverlust.',
    masteryTheme: 'Souveräne Delegation: Wer Kontrolle klug abgibt, mehrt den Wohlstand aller Beteiligten.'
  },

  // Heart / Ego to Solar Plexus
  {
    id: '40-37',
    gate1: 40,
    gate2: 37,
    name: 'Channel of Community',
    germanName: 'Kanal der Gemeinschaft (Der Bund & die Familie)',
    center1: 'heart',
    center2: 'solarPlexus',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Zusammenhalt & Verträge)',
    quantumGifting: 'Herzenswärme, Loyalität und die Gabe, verlässliche Vereinbarungen und familiäre Geborgenheit zu stiften.',
    shadowPattern: 'Aufopferung bis zur Erschöpfung bei mangelnder Wertschätzung durch die Gruppe.',
    masteryTheme: 'Klare Absprachen treffen: Gib nur dann deine Kraft, wenn deine Leistung von der Gemeinschaft anerkannt und genährt wird.'
  },

  // Heart / Ego to Spleen
  {
    id: '26-44',
    gate1: 26,
    gate2: 44,
    name: 'Channel of Surrender',
    germanName: 'Kanal der Übertragung (Der Verkäufer & Botschafter)',
    center1: 'heart',
    center2: 'spleen',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Marketing & Instinkt)',
    quantumGifting: 'Unübertreffliches Gespür für Trends, Menschenkenntnis und die Gabe, Ideen und Produkte überzeugend zu präsentieren.',
    shadowPattern: 'Manipulation, Halbwahrheiten oder Übertreibungen, um kurzfristige Vorteile zu erzwingen.',
    masteryTheme: 'Integrität im Marketing: Echte Überzeugungskraft basiert auf Vertrauen und nachweisbarer Qualität.'
  },

  // Throat to Solar Plexus
  {
    id: '35-36',
    gate1: 35,
    gate2: 36,
    name: 'Channel of Transitoriness',
    germanName: 'Kanal der Vergänglichkeit (Tausendsassa / Erfahrungsdrang)',
    center1: 'throat',
    center2: 'solarPlexus',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Abenteuer)',
    quantumGifting: 'Abenteuerlust, emotionale Wandlungskraft und die Gabe, Krisen in reiche Lebenserfahrung zu transformieren.',
    shadowPattern: 'Chronische Langeweile, überstürzte emotionale Kurzschlusshandlungen und ständige Unruhe.',
    masteryTheme: 'Warte die emotionale Klarheit ab, bevor du dich in neue Abenteuer stürzt.'
  },
  {
    id: '12-22',
    gate1: 12,
    gate2: 22,
    name: 'Channel of Openness',
    germanName: 'Kanal der Offenheit (Der Künstler / Soziale Anmut)',
    center1: 'throat',
    center2: 'solarPlexus',
    circuit: 'individual',
    circuitLabel: 'Individuell (Emotion & Leidenschaft)',
    quantumGifting: 'Poetische Ausdruckskraft, tiefe Leidenschaft und die Fähigkeit, Herzen durch emotionale Berührung zu öffnen.',
    shadowPattern: 'Launenhaftigkeit, Verschlossenheit oder unüberlegtes Verletzen anderer bei schlechter Stimmung.',
    masteryTheme: 'Respektiere deine Launen: Sei nur dann unter Menschen und sprich, wenn du dich wahrhaft danach fühlst.'
  },

  // Throat to Sacral
  {
    id: '20-34',
    gate1: 20,
    gate2: 34,
    name: 'Channel of Charisma',
    germanName: 'Kanal des Charismas (Gedanken werden unmittelbar Tat)',
    center1: 'throat',
    center2: 'sacral',
    circuit: 'integration',
    circuitLabel: 'Integrations-Kanal (Direkte Tatkraft)',
    quantumGifting: 'Reine kinetische Energie; unglaubliche Tatkraft im Jetzt für Dinge, die dem Herzen und Bauch entsprechen.',
    shadowPattern: 'Aktionismus und Hektik ohne vorheriges Abstimmen mit der inneren Autorität.',
    masteryTheme: 'Reagiere erst sakral, bevor du handelst: Nur so entfaltet dein Tun pure Faszination und Charisma.'
  },

  // Throat to Spleen
  {
    id: '20-57',
    gate1: 20,
    gate2: 57,
    name: 'Channel of the Brainwave',
    germanName: 'Kanal der Gehirnwelle (Hellsichtige Intuition im Jetzt)',
    center1: 'throat',
    center2: 'spleen',
    circuit: 'integration',
    circuitLabel: 'Integrations-Kanal (Gehör & Jetzt)',
    quantumGifting: 'Hellsichtiges, spontanes Formulieren von Ahnungen und intuitiven Einsichten im exakt richtigen Moment.',
    shadowPattern: 'Sprunghafte Angst vor der Zukunft oder Unterdrücken der inneren Stimme aus Verstandesgründen.',
    masteryTheme: 'Vertraue deinen ersten Worten, die ungefiltert aus dem Moment der inneren Ruhe entspringen.'
  },
  {
    id: '16-48',
    gate1: 16,
    gate2: 48,
    name: 'Channel of the Wavelength',
    germanName: 'Kanal der Wellenlänge (Der Meister / Meisterschaft & Tiefe)',
    center1: 'throat',
    center2: 'spleen',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Talent)',
    quantumGifting: 'Verschmelzung von gründlicher fachlicher Tiefe mit brillanter handwerklicher oder rhetorischer Virtuosität.',
    shadowPattern: 'Versagensangst und das Gefühl, "noch nicht gut genug" zu sein, um das Können der Welt zu zeigen.',
    masteryTheme: 'Wiederholung schafft Meisterschaft: Übe mit Hingabe und vertraue darauf, dass deine Tiefe vollkommen ausreicht.'
  },

  // Solar Plexus to Sacral
  {
    id: '6-59',
    gate1: 6,
    gate2: 59,
    name: 'Channel of Mating',
    germanName: 'Kanal der Paarung (Intimität & Schöpferische Fruchtbarkeit)',
    center1: 'solarPlexus',
    center2: 'sacral',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Fortpflanzung & Bindung)',
    quantumGifting: 'Fähigkeit, Barrieren zwischen Menschen im Nu zu durchbrechen und tiefe emotionale und körperliche Verbundenheit zu schaffen.',
    shadowPattern: 'Vorschnelles Einlassen auf unpassende Bindungen oder emotionale Kälte als Schutzpanzer.',
    masteryTheme: 'Warte ab, bis die emotionale Welle Klarheit schenkt: Wahre Intimität braucht Reife und sicheres Terrain.'
  },

  // Solar Plexus to Root
  {
    id: '30-41',
    gate1: 30,
    gate2: 41,
    name: 'Channel of Recognition',
    germanName: 'Kanal des Erkennens (Fantasie, Verlangen & Träume)',
    center1: 'solarPlexus',
    center2: 'root',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Sehnsucht)',
    quantumGifting: 'Visionskraft und tiefe seelische Sehnsucht; spürt neue Wünsche der Menschheit auf und initiiert Entwicklungen.',
    shadowPattern: 'Verzehrende Begierde und Frustration über unerfüllbare Erwartungen an andere.',
    masteryTheme: 'Lasse Erwartungen los: Genieße die Reise und die Fantasie, ohne das Ergebnis zu erzwingen.'
  },
  {
    id: '49-19',
    gate1: 49,
    gate2: 19,
    name: 'Channel of Synthesis',
    germanName: 'Kanal der Synthese (Sensibilität & Stammesprinzipien)',
    center1: 'solarPlexus',
    center2: 'root',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Sensibilität & Nahrung)',
    quantumGifting: 'Feinstoffliche Sensibilität für menschliche und tierische Grundbedürfnisse (Nahrung, Schutz, Zugehörigkeit, Respekt).',
    shadowPattern: 'Überempfindlichkeit, Zurückweisungsschmerz oder radikale Ausgrenzung von Andersdenkenden.',
    masteryTheme: 'Finde die Balance zwischen Nähe und Eigenraum: Klare Werte stiften heilsamen Zusammenhalt.'
  },
  {
    id: '55-39',
    gate1: 55,
    gate2: 39,
    name: 'Channel of Emoting',
    germanName: 'Kanal der Emotion (Stimmungsschwankungen & Seelentiefe)',
    center1: 'solarPlexus',
    center2: 'root',
    circuit: 'individual',
    circuitLabel: 'Individuell (Emotionale Romantik)',
    quantumGifting: 'Intensive Gefühlstiefe, musische Begabung und die Gabe, den Geist und die Leidenschaft anderer zu entfachen.',
    shadowPattern: 'Melancholie, provokantes Sticheln oder Drama-Erzeugung bei innerer Leere.',
    masteryTheme: 'Melancholie ist fruchtbarer Boden für Kreativität: Ehre die stillen Täler ebenso wie die emotionalen Gipfel.'
  },

  // Sacral to Spleen
  {
    id: '34-57',
    gate1: 34,
    gate2: 57,
    name: 'Channel of Power',
    germanName: 'Kanal der Macht (Instinktive Urkraft & Gesundheit)',
    center1: 'sacral',
    center2: 'spleen',
    circuit: 'integration',
    circuitLabel: 'Integrations-Kanal (Lebenskraft)',
    quantumGifting: 'Unbezwingbare körperliche Vitalität gepaart mit blitzschnellem Überlebensinstinkt für das eigene Wohlbefinden.',
    shadowPattern: 'Egoistischer Kraftmissbrauch oder Überfahren der Grenzen schwächerer Mitmenschen.',
    masteryTheme: 'Setze deine Lebenskraft achtsam ein: Deine Vitalität soll dich stärken, ohne andere zu dominieren.'
  },
  {
    id: '27-50',
    gate1: 27,
    gate2: 50,
    name: 'Channel of Preservation',
    germanName: 'Kanal der Bewahrung (Fürsorge, Werte & Schutz)',
    center1: 'sacral',
    center2: 'spleen',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Hüten des Lebens)',
    quantumGifting: 'Hingebungsvolle Fürsorglichkeit und das Hüten moralischer Grundwerte und gesunder Ernährung für die Nächsten.',
    shadowPattern: 'Selbstaufgabe durch übermäßige Fürsorge für andere bei Vernachlässigung der eigenen Gesundheit.',
    masteryTheme: 'Nähre dich zuerst selbst: Nur aus einem vollen Brunnen kannst du andere langfristig stärken.'
  },

  // Sacral to Root
  {
    id: '3-60',
    gate1: 3,
    gate2: 60,
    name: 'Channel of Mutation',
    germanName: 'Kanal der Mutation (Transformation & Neuanfang)',
    center1: 'sacral',
    center2: 'root',
    circuit: 'individual',
    circuitLabel: 'Individuell (Pulsierende Kraft)',
    quantumGifting: 'Fähigkeit, aus dem Nichts völlig neue Wege und evolutionäre Sprünge zu manifestieren.',
    shadowPattern: 'Depressive Stimmung während der Stillstandsphasen des Pulses oder Frustration über Beschränkungen.',
    masteryTheme: 'Akzeptiere die Grenze: Mutation entsteht genau dort, wo die alte Struktur an ihre Grenzen stößt.'
  },
  {
    id: '42-53',
    gate1: 42,
    gate2: 53,
    name: 'Channel of Maturation',
    germanName: 'Kanal der Reifung (Zyklen beginnen & vollenden)',
    center1: 'sacral',
    center2: 'root',
    circuit: 'collective_sensing',
    circuitLabel: 'Kollektiv (Sinn findend / Lebenszyklen)',
    quantumGifting: 'Tiefe Weisheit über das Gedeihen von Projekten und Lebensphasen von der Aussaat bis zur reifen Ernte.',
    shadowPattern: 'Tausend Dinge gleichzeitig anfangen, ohne sie abzuschließen, oder in toten Projekten festhängen.',
    masteryTheme: 'Wähle den Beginn mit Bedacht: Starte nur Zyklen, die dein Sakralzentrum wahrhaft bis zum Ende tragen will.'
  },
  {
    id: '9-52',
    gate1: 9,
    gate2: 52,
    name: 'Channel of Concentration',
    germanName: 'Kanal der Konzentration (Stille & Laserfokus)',
    center1: 'sacral',
    center2: 'root',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Fokus)',
    quantumGifting: 'Unglaubliche Ausdauer und Detailfokus; kann stundenlang unerschütterlich an einer Sache arbeiten.',
    shadowPattern: 'Verzetteln in winzigen Belanglosigkeiten oder nervöse Rastlosigkeit, wenn der Körper nicht stillsitzen kann.',
    masteryTheme: 'Finde deinen ruhigen Platz: Wenn dein Körper in Ruhe ist, bündelt sich deine Energie wie ein Laserstrahl.'
  },

  // Spleen to Root
  {
    id: '32-54',
    gate1: 32,
    gate2: 54,
    name: 'Channel of Transformation',
    germanName: 'Kanal der Transformation (Der ehrgeizige Aufsteiger)',
    center1: 'spleen',
    center2: 'root',
    circuit: 'tribal',
    circuitLabel: 'Stamm (Erfolg & Aufstieg)',
    quantumGifting: 'Unermüdlicher Ehrgeiz gepaart mit sicherem Instinkt dafür, welche Innovationen sich dauerhaft bezahlt machen.',
    shadowPattern: 'Gefühl von Minderwertigkeit oder Ausbrennen auf der Jagd nach sozialem Status.',
    masteryTheme: 'Verbinde materiellen Ehrgeiz mit spiritueller Ausrichtung: Wahrer Aufstieg nützt der gesamten Gemeinschaft.'
  },
  {
    id: '28-38',
    gate1: 28,
    gate2: 38,
    name: 'Channel of Struggle',
    germanName: 'Kanal des Ringens (Der Kämpfer für den Sinn)',
    center1: 'spleen',
    center2: 'root',
    circuit: 'individual',
    circuitLabel: 'Individuell (Herausforderung)',
    quantumGifting: 'Zähigkeit, Mut und die Gabe, für eine höhere Bestimmung durch jede Prüfung und jedes Hindernis zu gehen.',
    shadowPattern: 'Stures Kämpfen um des Kämpfens willen oder Angst vor einem sinnlosen Leben.',
    masteryTheme: 'Kämpfe nur für Dinge, die deiner Seele wahrhaften Wert schenken: Nicht jeder Konflikt ist deine Schlacht.'
  },
  {
    id: '18-58',
    gate1: 18,
    gate2: 58,
    name: 'Channel of Judgment',
    germanName: 'Kanal des Urteilsvermögens (Perfektion & Lebensfreude)',
    center1: 'spleen',
    center2: 'root',
    circuit: 'collective_logic',
    circuitLabel: 'Kollektiv (Logisch / Verbesserung)',
    quantumGifting: 'Unbestechlicher Blick für Mängel und Optimierungspotenziale; bringt Systeme und Menschen zur Blüte.',
    shadowPattern: 'Bittere Nörgelei, ständige Kritik an geliebten Menschen oder neurotischer Perfektionszwang.',
    masteryTheme: 'Kritik nur mit Genehmigung äußern: Richte deinen Verbesserungsdrang auf Muster und Produkte, nicht auf Menschen.'
  }
];

export function findChannelById(id: string): HDChannel | undefined {
  return ALL_HD_CHANNELS.find(c => c.id === id);
}
