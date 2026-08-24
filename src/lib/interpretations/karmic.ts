export interface KarmicPointDeutung {
  title: string;
  theme: string;
  karmicOrigin: string;
  evolutionaryLeap: string;
  integrationTask: string;
}

export const NORTH_NODE_DEUTUNGEN: Record<string, KarmicPointDeutung> = {
  aries: {
    title: 'Nordknoten in Widder (Südknoten in Waage)',
    theme: 'Vom Gefallen-Wollen zur eigenständigen Schöpferkraft',
    karmicOrigin: 'Vergangenes Karma von übermäßiger Anpassung, Beziehungsabhängigkeit und Verlust der eigenen Identität im Wir.',
    evolutionaryLeap: 'Mut zur Selbstbehauptung, eigene Entscheidungen ohne Erlaubnis fällen und für die eigene Wahrheit einstehen.',
    integrationTask: 'Harmonie im Außen erst dann suchen, wenn die eigene Authentizität gewahrt ist.'
  },
  taurus: {
    title: 'Nordknoten in Stier (Südknoten in Skorpion)',
    theme: 'Von emotionalen Krisen zu tiefer Erdung und innerem Frieden',
    karmicOrigin: 'Gewohnheit an ständiges Drama, Misstrauen, Machtkämpfe und emotionale Notzustände.',
    evolutionaryLeap: 'Lernen, das Einfache zu genießen, Beständigkeit zu kultivieren, dem Körper zu vertrauen und Stabilität zu schaffen.',
    integrationTask: 'Erkennen, dass Frieden nicht langweilig ist, sondern der nährende Boden für seelisches Wachstum.'
  },
  gemini: {
    title: 'Nordknoten in Zwillinge (Südknoten in Schütze)',
    theme: 'Vom Besserwissen zum offenen, vorurteilslosen Zuhören',
    karmicOrigin: 'Dogmatische Überzeugungen, missionarischer Eifer und Flucht in abgehobene Ideale.',
    evolutionaryLeap: 'Neugierde kultivieren, Fragen stellen, den Alltag als Lehrmeister begreifen und Menschen auf Augenhöhe begegnen.',
    integrationTask: 'Die eigene Wahrheit nicht als Absolutum predigen, sondern im Dialog lebendig halten.'
  },
  cancer: {
    title: 'Nordknoten in Krebs (Südknoten in Steinbock)',
    theme: 'Von kühlem Leistungsdruck zu emotionaler Verletzlichkeit und Wärme',
    karmicOrigin: 'Härte gegen sich selbst, Fixierung auf Status, Pflicht und emotionale Unterdrückung.',
    evolutionaryLeap: 'Das Herz öffnen, Gefühle zulassen, Fürsorge annehmen und ein liebevolles inneres Zuhause erschaffen.',
    integrationTask: 'Erfolg im Außen darf niemals auf Kosten der seelischen Geborgenheit und Selbstliebe erkauft werden.'
  },
  leo: {
    title: 'Nordknoten in Löwe (Südknoten in Wassermann)',
    theme: 'Vom anonymen Beobachter zum strahlenden Herzensakteur',
    karmicOrigin: 'Flucht in die Distanz, kühle Abgeklärtheit und Angst vor individueller Sichtbarkeit in der Gruppe.',
    evolutionaryLeap: 'Die eigene Einzigartigkeit feiern, mit Leidenschaft und Herzenswärme auf die Lebensbühne treten.',
    integrationTask: 'Nicht im Kollektiv verstecken, sondern als inspirierender Leuchtturm vorangehen.'
  },
  virgo: {
    title: 'Nordknoten in Jungfrau (Südknoten in Fische)',
    theme: 'Von diffuser Opferrolle zu praktischer Lebensmeisterung',
    karmicOrigin: 'Flucht vor der Realität, Hilflosigkeit, diffuse Illusionen und energetisches Ausbrennen.',
    evolutionaryLeap: 'Klare Grenzen setzen, gesunde Alltagsstrukturen etablieren und handfeste Hilfe im Hier und Jetzt leisten.',
    integrationTask: 'Spiritualität nicht als Weltflucht nutzen, sondern das Heilige im Praktischen verankern.'
  },
  libra: {
    title: 'Nordknoten in Waage (Südknoten in Widder)',
    theme: 'Vom Ego-Krieger zur bewussten Seelen-Partnerschaft',
    karmicOrigin: 'Einsame Kämpfe, Ungeduld, Ellenbogenmentalität und die Unfähigkeit zu kompromissbereitem Teilen.',
    evolutionaryLeap: 'Diplomatie lernen, das Gegenüber wahrhaft sehen und gleichberechtigte, nährende Synergien schaffen.',
    integrationTask: 'Stärke beweisen, indem man weich wird und echte Kooperation wagt.'
  },
  scorpio: {
    title: 'Nordknoten in Skorpion (Südknoten in Stier)',
    theme: 'Von materieller Erstarrung zur alchemistischen Wandlung',
    karmicOrigin: 'Festhalten an toten Sicherheiten, Angst vor Veränderung und Scheu vor tiefen seelischen Prozessen.',
    evolutionaryLeap: 'Den Mut aufbringen, das Bekannte loszulassen, emotionale Tiefen zu erforschen und seelisch wiederaufzuerstehen.',
    integrationTask: 'Wahre Sicherheit liegt nicht im Besitz, sondern im unerschütterlichen Vertrauen in die eigene Regenerationskraft.'
  },
  sagittarius: {
    title: 'Nordknoten in Schütze (Südknoten in Zwillinge)',
    theme: 'Vom Fakten-Dschungel zur übergeordneten Lebensvision',
    karmicOrigin: 'Zersplitterung in unwichtigen Details, Unverbindlichkeit, Gerüchte und geistige Rastlosigkeit.',
    evolutionaryLeap: 'Einen tiefen Lebenssinn finden, Vertrauen in eine höhere Führung entwickeln und der Intuition folgen.',
    integrationTask: 'Nicht nur Informationen sammeln, sondern Weisheit verkörpern.'
  },
  capricorn: {
    title: 'Nordknoten in Steinbock (Südknoten in Krebs)',
    theme: 'Von kindlicher Abhängigkeit zu reifer Seelenverantwortung',
    karmicOrigin: 'Klammern an die Vergangenheit, Überempfindlichkeit und die Erwartung, von anderen umsorgt zu werden.',
    evolutionaryLeap: 'Eigenverantwortung übernehmen, innere Autorität aufbauen und klare Lebensziele diszipliniert verwirklichen.',
    integrationTask: 'Zum eigenen liebevollen und starken Elternteil heranreifen.'
  },
  aquarius: {
    title: 'Nordknoten in Wassermann (Südknoten in Löwe)',
    theme: 'Vom Ego-Drama zum Dienst an der Gemeinschaft',
    karmicOrigin: 'Geltungsdrang, Stolz, Drama-Verliebtheit und der Zwang, immer im Mittelpunkt stehen zu müssen.',
    evolutionaryLeap: 'Gleichgesinnte finden, für übergeordnete Ideale wirken und jedem Menschen mit Respekt begegnen.',
    integrationTask: 'Das eigene Licht leuchten lassen, um den Weg für alle zu erhellen, nicht um Applaus zu ernten.'
  },
  pisces: {
    title: 'Nordknoten in Fische (Südknoten in Jungfrau)',
    theme: 'Vom Kontrollzwang zur mystischen Hingabe an das Ganze',
    karmicOrigin: 'Ständige Sorge, Perfektionswahn, Selbstzerfleischung und Angst vor Unordnung.',
    evolutionaryLeap: 'Loslassen lernen, dem Fluss des Lebens vertrauen, Vergebung praktizieren und spirituelle Verbundenheit erfahren.',
    integrationTask: 'Erkennen, dass das Universum auch dann in göttlicher Ordnung bleibt, wenn der Verstand ruht.'
  }
};

export const CHIRON_DEUTUNGEN: Record<string, { wound: string; medicine: string }> = {
  aries: {
    wound: 'Urwunde des Existenzrechts: Das unbewusste Gefühl, kein Recht zu haben, der/die zu sein, wer man wirklich ist.',
    medicine: 'Der Krieger des Mitgefühls: Anderen den Mut schenken, ihre ureigene Kraft zu leben.'
  },
  taurus: {
    wound: 'Urwunde des Selbstwerts und der Sicherheit: Gefühl existentieller Verlassenheit oder materieller Wertlosigkeit.',
    medicine: 'Der Heiler der Erdung: Anderen helfen, ihren unantastbaren inneren Seelenwert und wahre Fülle zu entdecken.'
  },
  gemini: {
    wound: 'Urwunde des Nicht-Verstanden-Werdens: Das Gefühl, dumm zu sein oder die eigene Wahrheit nicht ausdrücken zu können.',
    medicine: 'Der Seelenübersetzer: Durch empathische Worte und tiefes Verstehen Brücken zwischen getrennten Menschen bauen.'
  },
  cancer: {
    wound: 'Urwunde des Urvertrauens & der Geborgenheit: Tiefes Verlassenheitsgefühl und fehlende mütterliche Nestwärme.',
    medicine: 'Der Heiler des Herzenshauses: Einen unerschütterlichen Raum bedingungsloser Liebe und Annahme für andere erschaffen.'
  },
  leo: {
    wound: 'Urwunde des schöpferischen Ausdrucks: Gedemütigtes inneres Kind, Scham über die eigene Einzigartigkeit.',
    medicine: 'Der Seelen-Ermutiger: Anderen helfen, ihre vergrabene Schöpferkraft und ihr strahlendes Leuchten wiederzufinden.'
  },
  virgo: {
    wound: 'Urwunde der Fehlerhaftigkeit: Das quälende Gefühl, niemals gut genug zu sein und ständig repariert werden zu müssen.',
    medicine: 'Der ganzheitliche Meisterheiler: Die Schönheit in der scheinbaren Unvollkommenheit offenbaren.'
  },
  libra: {
    wound: 'Urwunde der Beziehung: Verletzungen durch Ungerechtigkeit, Verrat oder das Gefühl, nur in Spaltung zu leben.',
    medicine: 'Der Seelen-Diplomat: Anderen den Weg zu wahrer, heilsamer Herzensbegegnung auf Augenhöhe weisen.'
  },
  scorpio: {
    wound: 'Urwunde des existentiellen Vertrauensbruchs: Erfahrung von Ohnmacht, Verrat oder energetischem Missbrauch.',
    medicine: 'Der Seelenalchemist: Menschen furchtlos durch ihre tiefsten Schatten, Traumata und Wandlungskrisen begleiten.'
  },
  sagittarius: {
    wound: 'Urwunde des Glaubens und der Sinnlosigkeit: Zerbrochene Ideale, Enttäuschung über Lehrer oder Nihilismus.',
    medicine: 'Der weise Pilger: Menschen helfen, ihren lebendigen, unerschütterlichen Seelenfunken und Lebenssinn wiederzuentdecken.'
  },
  capricorn: {
    wound: 'Urwunde der Überforderung & Ablehnung: Frustration durch zu frühe Lasten und Mangel an Anerkennung.',
    medicine: 'Der weise Älteste: Anderen zeigen, wie man aus tiefer Demut und Integrität wahre Meisterschaft erlangt.'
  },
  aquarius: {
    wound: 'Urwunde des Außenseiters: Das Gefühl, fremd auf dieser Erde zu sein und nirgendwo wahrhaft dazuzugehören.',
    medicine: 'Der kosmische Befreier: Anderen Menschen die Angst vor dem Anderssein nehmen und neue Gemeinschaftsformen stiften.'
  },
  pisces: {
    wound: 'Urwunde der kosmischen Trennung: Tiefer Schmerz über die Härte der irdischen Welt und Sehnsucht nach Auflösung.',
    medicine: 'Der mystische Heiler: Reine bedingungslose Liebe und spirituellen Trost in dunklen Nächten der Seele spenden.'
  }
};

export const LILITH_DEUTUNGEN: Record<string, { shadow: string; power: string }> = {
  aries: {
    shadow: 'Wutausbrüche oder radikale Unterdrückung der eigenen Urkraft aus Furcht vor Ausgrenzung.',
    power: 'Ungezähmter Pioniergeist, unerschütterlicher Mut und absolute Unbeugsamkeit gegenüber Unterdrückung.'
  },
  taurus: {
    shadow: 'Besitzgier oder Verachtung irdischer Genüsse; Scham über sexuelle und körperliche Sinnlichkeit.',
    power: 'Heilige, erdgebundene Sinnlichkeit, unzerstörbares Körpergewahrsein und radikale Wertschätzung des Lebens.'
  },
  gemini: {
    shadow: 'Zynismus, Tabubrüche durch verletzende Worte oder Angst vor den eigenen Gedankentiefen.',
    power: 'Messerscharfe Intuition, Aufdecken verheimlichter Wahrheiten und revolutionäre freie Gedanken.'
  },
  cancer: {
    shadow: 'Ablehnung der Mutterrolle oder Erstickung anderer durch symbiotische Abhängigkeit.',
    power: 'Die unbezähmbare Ur-Mutter, Schutzraum für das Verwundbare jenseits bürgerlicher Moral.'
  },
  leo: {
    shadow: 'Brennender Neid auf das Leuchten anderer oder Angst, das eigene Charisma offen zu leben.',
    power: 'Magische Souveränität, königliche Authentizität und Unbestechlichkeit des Herzens.'
  },
  virgo: {
    shadow: 'Körperfeindlicher Reinheitswahn oder Verachtung des Instinktiven zugunsten steriler Ordnung.',
    power: 'Priesterliche Heilkraft, intuitive Kräuterweisheit und instinktives Erkennen energetischer Dissonanzen.'
  },
  libra: {
    shadow: 'Zerstörerische Projektionen in Beziehungen oder Verweigerung jeglicher partnerschaftlicher Bindung.',
    power: 'Radikal gleichberechtigte Partnerschaft ohne faule Kompromisse, Schutzkraft für Gerechtigkeit.'
  },
  scorpio: {
    shadow: 'Todesfaszination, zerstörerische Machtspiele oder Verdrängung der eigenen Schattenmacht.',
    power: 'Vollendete seelische Schamanenkraft, Regeneration aus der Asche und Furchtlosigkeit vor dem Mysterium.'
  },
  sagittarius: {
    shadow: 'Fanatischer Rebellismus gegen religiöse Systeme oder maßlose geistige Überheblichkeit.',
    power: 'Die wilde Seherin / der wilde Seher, ungebundene Weisheit und radikaler Wahrheitsdrang.'
  },
  capricorn: {
    shadow: 'Kalter Ehrgeiz oder rebellische Verweigerung jeglicher Pflicht aus Angst vor Versagen.',
    power: 'Echtes, unverrückbares Rückgrat, Schutz wallender Weisheit vor korrupten Autoritäten.'
  },
  aquarius: {
    shadow: 'Zynische Abspaltung vom Menschengeschlecht, extreme Kälte und rebellische Selbstzerstörung.',
    power: 'Der Prometheus-Funke: Befreiung von kollektiven Tabus und visionärer Durchbruch in ein neues Zeitalter.'
  },
  pisces: {
    shadow: 'Suchtartige Selbstauflösung, Verstrickung in toxische Retter-Opfer-Dramen.',
    power: 'Tiefe mystische Ekstase, seherische Traumbegabung und Verbundenheit mit dem kosmischen Ur-Ozean.'
  }
};
