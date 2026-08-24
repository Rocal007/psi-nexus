export interface PlanetSignInterpretation {
  headline: string;
  soulEssence: string;
  expression: string;
  shadow: string;
}

export const HOUSES_INFO: Record<number, { name: string; area: string; esotericFocus: string }> = {
  1: {
    name: '1. Haus (Das Selbst & der Aszendent)',
    area: 'Identität, Vitalität, äußere Erscheinung, Lebensanfang',
    esotericFocus: 'Die Maske und das Werkzeug der Seele in der irdischen Inkarnation.'
  },
  2: {
    name: '2. Haus (Werte & Substanz)',
    area: 'Selbstwert, irdische Ressourcen, Talente, materielle Basis',
    esotericFocus: 'Der Umgang mit geistiger und materieller Energie; Verankerung von Wert.'
  },
  3: {
    name: '3. Haus (Geist & Kommunikation)',
    area: 'Denken, Austausch, Lernen, Geschwister, unmittelbares Umfeld',
    esotericFocus: 'Das Weben mentaler Fäden; die Brücke zwischen Verstand und höherer Intuition.'
  },
  4: {
    name: '4. Haus (Wurzeln & Seelenheimat / IC)',
    area: 'Herkunft, Familie, seelischer Urgrund, Ahnenkarma',
    esotericFocus: 'Das innere Heiligtum des Herzens; der Ort der tiefsten seelischen Geborgenheit.'
  },
  5: {
    name: '5. Haus (Schöpferkraft & Herzensausdruck)',
    area: 'Kreativität, Lebensfreude, Kinder, Liebe, Spiel',
    esotericFocus: 'Die solare Freude des Schöpfens; das Ausstrahlen des göttlichen Funzens.'
  },
  6: {
    name: '6. Haus (Hingabe & Veredelung)',
    area: 'Alltag, Gesundheit, Arbeit, Dienen, Selbstdisziplin',
    esotericFocus: 'Die Alchemie der Läuterung; Heilung durch ganzheitliche Lebensführung.'
  },
  7: {
    name: '7. Haus (Das Du & die Partnerschaft / DC)',
    area: 'Beziehungen, Verträge, Projektionen, der Spiegel des Anderen',
    esotericFocus: 'Die Einweihung durch die Begegnung mit dem Du; Überwindung der Getrenntheit.'
  },
  8: {
    name: '8. Haus (Transformation & Mysterium)',
    area: 'Tod & Wiedergeburt, Sexualität, Bindungen, Schattenarbeit',
    esotericFocus: 'Die Feuerprobe der Seelenalchemie; Loslassen von Illusionen zur Befreiung der Urkraft.'
  },
  9: {
    name: '9. Haus (Höhere Erkenntnis & Weite)',
    area: 'Philosophie, Sinnsuche, Reisen, Einweihungswissen',
    esotericFocus: 'Der Flug des Geistes in die höheren Sphären kosmischer Gesetzmäßigkeiten.'
  },
  10: {
    name: '10. Haus (Berufung & Lebensziel / MC)',
    area: 'Lebenswerk, Meisterschaft, Autorität, Wirken in der Welt',
    esotericFocus: 'Der sichtbare Seelenauftrag auf dem Weltenberg; das Manifestieren des göttlichen Willens.'
  },
  11: {
    name: '11. Haus (Gemeinschaft & Vision)',
    area: 'Freundschaften, Kollektive, Ideale, Zukunftsträume',
    esotericFocus: 'Das Zusammenwirken erleuchteter Seelen für die Evolution der Erde.'
  },
  12: {
    name: '12. Haus (All-Einheit & Transzendenz)',
    area: 'Stille, Meditation, Karma, Traumwelt, universelle Verbundenheit',
    esotericFocus: 'Die Rückkehr in den Urquell des Seins; bedingungslose Liebe und Erlösung.'
  }
};

export function getPlanetHouseText(planetName: string, houseNum: number): string {
  const house = HOUSES_INFO[houseNum];
  if (!house) return '';
  return `${planetName} entfaltet seine Schwingung primär im ${house.name}. Hier geht es um ${house.area}. Auf seelischer Ebene fordert diese Platzierung: ${house.esotericFocus}`;
}

export function getSunSignInsight(signId: string): string {
  const sunInsights: Record<string, string> = {
    aries: 'Deine solare Schöpferkraft entzündet sich im Element des reinen Pioniergeistes. Du bist hier, um neue Impulse in die Welt zu bringen und mutig voranzugehen.',
    taurus: 'Deine solare Kraft manifestiert sich in der Erschaffung dauerhafter, heiliger Werte und tiefer sinnlicher Harmonie mit der Natur.',
    gemini: 'Deine solare Schöpferkraft strahlt durch lebendige Vernetzung, geistige Klarheit und das Zusammenführen scheinbarer Gegensätze.',
    cancer: 'Deine solare Kraft erwacht in der Tiefe des seelischen Schutzes, der emotionalen Nährung und der Schaffung wahrer Geborgenheit.',
    leo: 'Deine solare Schöpferkraft steht in ihrer vollen Majestät: Warmherzige Führung, königliche Großzügigkeit und authentisches Strahlen.',
    virgo: 'Deine solare Kraft vollendet sich im hingebungsvollen Dienst, präziser Veredelung und der Heilung durch ganzheitliche Ordnung.',
    libra: 'Deine solare Kraft erblüht im Schaffen von wahrer Schönheit, ausgleichender Gerechtigkeit und harmonischer Seelenbegegnung.',
    scorpio: 'Deine solare Kraft wirkt durch tiefste Alchemie: Du scheust kein Dunkel und verwandelst Krisen in triumphale Wiedergeburten.',
    sagittarius: 'Deine solare Kraft entflammt für die Suche nach der universellen Wahrheit, kosmischer Weisheit und visionärer Horizont-Erweiterung.',
    capricorn: 'Deine solare Kraft meistert die Gesetze von Zeit und Raum: Durch Integrität, Ausdauer und Verantwortung baust du ein bleibendes Werk.',
    aquarius: 'Deine solare Schöpferkraft ist der Zukunft geweiht: Du bringst revolutionäre Ideen, Freiheit und universale Menschenliebe.',
    pisces: 'Deine solare Kraft schwingt im Ozean des kosmischen Mitgefühls: Du löst Grenzen auf und erinnerst die Welt an die Einheit allen Lebens.'
  };
  return sunInsights[signId] || '';
}

export function getMoonSignInsight(signId: string): string {
  const moonInsights: Record<string, string> = {
    aries: 'Dein Mond sucht emotionale Lebendigkeit und Direktheit. Du fühlst dich sicher, wenn du handeln und deine Impulse frei ausdrücken darfst.',
    taurus: 'Dein Mond ruht in tiefer Stabilität und Sinnlichkeit. Du nährst deine Seele durch Natur, Ruhe, Beständigkeit und körperliches Wohlbefinden.',
    gemini: 'Dein Mond verarbeitet Gefühle über den Geist. Du brauchst gedanklichen Austausch, Leichtigkeit und Neugierde, um innerlich zur Ruhe zu kommen.',
    cancer: 'Dein Mond steht im eigenen Domizil: Eine tiefe, intuitive Seelenlandschaft mit immenser Empathie und dem Bedürfnis nach liebevoller Geborgenheit.',
    leo: 'Dein Mond fühlt sich genährt durch Wertschätzung, Herzenswärme, kreativen Selbstausdruck und freudvolles Spiel.',
    virgo: 'Dein Mond findet Sicherheit in Klarheit, nützlicher Tätigkeit, gesunder Routine und innerer Aufgeräumtheit.',
    libra: 'Dein Mond sehnt sich nach emotionaler Harmonie, Frieden, Schönheit und respektvoller zwischenmenschlicher Nähe.',
    scorpio: 'Dein Mond fühlt in extremen Tiefen: Leidenschaftlich, intensiv, verschwiegen und stets auf der Suche nach ungeschminkter Wahrhaftigkeit.',
    sagittarius: 'Dein Mond schöpft Kraft aus geistiger Freiheit, Optimismus, Reisen und dem Vertrauen in einen höheren Sinn.',
    capricorn: 'Dein Mond bewahrt emotionale Selbstbeherrschung. Sicherheit bedeutet für dich Selbstständigkeit, Reife und Verlässlichkeit.',
    aquarius: 'Dein Mond braucht emotionalen Freiraum und geistige Unabhängigkeit. Du fühlst dich verbunden im Kreis von Gleichgesinnten.',
    pisces: 'Dein Mond ist ein offenes Seelentor für feinste kosmische Schwingungen, Traumbilder und grenzenloses Mitgefühl.'
  };
  return moonInsights[signId] || '';
}

export function getAscendantInsight(signId: string): string {
  const ascInsights: Record<string, string> = {
    aries: 'Als Widder-Aszendent tritt deine Seele mit dynamischem Mut und Entschlossenheit in diese Welt. Du bist der kosmische Funke.',
    taurus: 'Als Stier-Aszendent betrittst du das Leben mit gelassener Präsenz, natürlicher Eleganz und ruhender Beständigkeit.',
    gemini: 'Als Zwillinge-Aszendent begegnest du der Welt mit wacher Neugier, charmanter Offenheit und scharfsinnigem Verstand.',
    cancer: 'Als Krebs-Aszendent umhüllt dich eine sanfte, fürsorgliche Aura. Du nimmst Stimmungen im Raum sofort intuitiv wahr.',
    leo: 'Als Löwe-Aszendent strahlst du natürliche Autorität, Herzlichkeit und eine unverwechselbare charismatische Präsenz aus.',
    virgo: 'Als Jungfrau-Aszendent wirkst du beobachtend, feinsinnig, bescheiden und von bestechender analytischer Klarheit.',
    libra: 'Als Waage-Aszendent umgibt dich eine Aura von Anmut, Feingefühl, Diplomatie und ästhetischer Ausgewogenheit.',
    scorpio: 'Als Skorpion-Aszendent besitzt du einen magnetischen, durchdringenden Blick und eine unbestechliche seelische Tiefenwirkung.',
    sagittarius: 'Als Schütze-Aszendent strahlst du ansteckenden Optimismus, weite Visionen und freudigen Entdeckergeist aus.',
    capricorn: 'Als Steinbock-Aszendent begegnest du der Welt mit würdevoller Ernsthaftigkeit, Kompetenz und natürlicher Autorität.',
    aquarius: 'Als Wassermann-Aszendent wirkst du originell, unabhängig, zukunftsgewandt und von erfrischender Individualität.',
    pisces: 'Als Fische-Aszendent umgibt dich ein zarter, mystischer Schleier. Du wirkst verträumt, empathisch und von jenseitiger Weisheit berührt.'
  };
  return ascInsights[signId] || '';
}
