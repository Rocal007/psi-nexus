import type { HDProfileInfo } from './types';

export interface HDLineInfo {
  line: number;
  name: string;
  germanName: string;
  essence: string;
  gift: string;
  shadow: string;
}

export const HD_LINES: Record<number, HDLineInfo> = {
  1: {
    line: 1,
    name: 'Investigator',
    germanName: 'Der Forscher (Fundament & Tiefe)',
    essence: 'Braucht solide Wissensbasis, Fakten und Sicherheit, um innere Ruhe zu finden.',
    gift: 'Gründlichkeit, Wissensdurst und unerschütterliche Expertise.',
    shadow: 'Angst vor Inkompetenz und Unsicherheit bei Wissenslücken.'
  },
  2: {
    line: 2,
    name: 'Hermit',
    germanName: 'Der Einsiedler (Naturtalent & Rückzug)',
    essence: 'Besitzt angeborene Begabungen, die im ungestörten Alleinsein gedeihen; wartet auf den Ruf der richtigen Menschen.',
    gift: 'Mühelose Meisterschaft und natürliche Eleganz.',
    shadow: 'Ignoranz gegenüber den eigenen Gaben und Verharren im Schneckenhaus.'
  },
  3: {
    line: 3,
    name: 'Martyr / Experimenter',
    germanName: 'Der Experimentator (Versuch & Irrtum / Reales Erleben)',
    essence: 'Lernt durch Machen, Scheitern und Optimieren; unerschrockener Pionier der praktischen Wirklichkeit.',
    gift: 'Resilienz, Anpassungsfähigkeit und unbezahlbare Praxisweisheit.',
    shadow: 'Scham über angebliche "Fehler" und Frustration bei Misserfolgen.'
  },
  4: {
    line: 4,
    name: 'Opportunist / Networker',
    germanName: 'Der Netzwerker (Freundeskreis & Gelegenheiten)',
    essence: 'Einfluss und Chancen fließen über vertrauensvolle Beziehungen des bestehenden Netzwerks.',
    gift: 'Herzenswärme, Loyalität und verbindende Gemeinschaftskraft.',
    shadow: 'Angst vor Zurückweisung und Verharren in toxischen Freundschaften.'
  },
  5: {
    line: 5,
    name: 'Heretic / Universalizer',
    germanName: 'Der Praktiker & Reformer (Projektionsfläche & Lösungen)',
    essence: 'Trägt universelle, praktische Lösungen für die Welt in sich; zieht hohe Erwartungen und Projektionen an.',
    gift: 'Krisenmanagement, messbare Resultate und pragmatische Führung.',
    shadow: 'Rufschädigung, wenn Versprechen nicht gehalten oder Illusionen bedient werden.'
  },
  6: {
    line: 6,
    name: 'Role Model',
    germanName: 'Das Vorbild (3 Lebensphasen: Experiment, Rückzug, Weisheit)',
    essence: 'Drei Entwicklungsstufen: Bis 30 wie Linie 3 (Ausprobieren), 30–50 auf dem Dach (Rückzug & Beobachtung), ab 50 Herabsteigen als weises Vorbild.',
    gift: 'Ganzheitlicher Weitblick, Integrität und lebendige Authentizität.',
    shadow: 'Zynismus und herablassende Distanzierung von der Welt.'
  }
};

export const HD_PROFILES: Record<string, HDProfileInfo> = {
  '1/3': {
    code: '1/3',
    consciousLine: 1,
    unconsciousLine: 3,
    name: 'Investigator / Martyr',
    germanName: 'Forscher / Experimentator (Fundament & Praxistest)',
    archetypeRole: 'Der unbestechliche Wahrheitssucher & Praxisprüfer',
    consciousTheme: 'Bewusstes Streben nach tiefem Wissen, Daten und stabiler Sicherheit.',
    unconsciousTheme: 'Unbewusster Drang, alles im Leben selbst auszuprobieren und durch Fehler zu lernen.',
    lifeTrajectory: 'Baut durch gründliche Recherche und eigene Praxiserfahrungen ein unerschütterliches Fundament auf, auf das sich andere verlassen können.',
    relationshipDynamic: 'Braucht Partner, die Zeit für Recherche und Phasen des Ausprobierens akzeptieren, ohne Fehler zu verurteilen.'
  },
  '1/4': {
    code: '1/4',
    consciousLine: 1,
    unconsciousLine: 4,
    name: 'Investigator / Opportunist',
    germanName: 'Forscher / Netzwerker (Fundament & Herzenskreis)',
    archetypeRole: 'Der fundierte Lehrer im vertrauten Freundeskreis',
    consciousTheme: 'Gründliches Eintauchen in Themengebiete zur Schaffung felsenfester Fundamente.',
    unconsciousTheme: 'Teilen des Wissens und Weiterentwicklung ausschließlich über ein verlässliches, warmherziges Netzwerk.',
    lifeTrajectory: 'Eignet sich tiefes Fachwissen an und wird zur tragenden Säule in seiner Gemeinschaft.',
    relationshipDynamic: 'Liebe und berufliche Gelegenheiten entstehen fast immer aus langen, tiefen Freundschaften.'
  },
  '2/4': {
    code: '2/4',
    consciousLine: 2,
    unconsciousLine: 4,
    name: 'Hermit / Opportunist',
    germanName: 'Einsiedler / Netzwerker (Naturtalent & Verbundenheit)',
    archetypeRole: 'Das bescheidene Naturtalent mit starkem Netzwerk',
    consciousTheme: 'Braucht viel Zeit für sich allein, um eigenen Neigungen und Hobbys ungestört nachzugehen.',
    unconsciousTheme: 'Wird von Freunden und Kollegen für seine besonderen Begabungen gesehen und "gerufen".',
    lifeTrajectory: 'Wechselt zwischen heilsamem Alleinsein und warmherzigem Auftreten im Freundeskreis.',
    relationshipDynamic: 'Braucht einen Partner, der das Bedürfnis nach Alleinsein ehrt und gleichzeitig beste Freunde ist.'
  },
  '2/5': {
    code: '2/5',
    consciousLine: 2,
    unconsciousLine: 5,
    name: 'Hermit / Heretic',
    germanName: 'Einsiedler / Praktiker (Genie & Retter-Projektion)',
    archetypeRole: 'Der geniale Problemlöser aus dem Verborgenen',
    consciousTheme: 'Zieht sich gern zurück und unterschätzt oft die eigene natürliche Genialität.',
    unconsciousTheme: 'Wird von der Außenwelt als mächtiger Retter wahrgenommen, der in Krisen gerufen wird.',
    lifeTrajectory: 'Kommt aus dem Rückzug hervor, liefert eine brillante, praktische Lösung ab und zieht sich wieder zurück.',
    relationshipDynamic: 'Muss lernen, falsche Projektionen und überzogene Erwartungen frühzeitig und klar zu entkräften.'
  },
  '3/5': {
    code: '3/5',
    consciousLine: 3,
    unconsciousLine: 5,
    name: 'Martyr / Heretic',
    germanName: 'Experimentator / Praktiker (Krisenmeister & Pionier)',
    archetypeRole: 'Der krisenfeste Universal-Pionier',
    consciousTheme: 'Bewusstes Erkunden von Grenzen, Neugier auf das, was in der Realität wirklich funktioniert.',
    unconsciousTheme: 'Ausstrahlung von pragmatischer Lösungskompetenz, die Menschen in Notlagen anzieht.',
    lifeTrajectory: 'Macht alle Fehler selbst, transformiert sie in funktionierende Methoden und rettet damit andere vor demselben Schicksal.',
    relationshipDynamic: 'Braucht Abwechslung, Humor und Raum für Wendungen; Fehler sind Dünger für die Beziehung.'
  },
  '3/6': {
    code: '3/6',
    consciousLine: 3,
    unconsciousLine: 6,
    name: 'Martyr / Role Model',
    germanName: 'Experimentator / Vorbild (Wilde Jugend zu Weiser Reife)',
    archetypeRole: 'Der weise Alchemist des Lebens',
    consciousTheme: 'Intensive Erlebnisse, Brüche und Experimente in den ersten 30 Lebensjahren.',
    unconsciousTheme: 'Sehnsucht nach Perfektion, Harmonie und einem Leben als erhabenes Vorbild.',
    lifeTrajectory: 'Verwandelt die turbulenten Lektionen der ersten Lebenshälfte in tiefe Seelenweisheit und Integrität ab 50.',
    relationshipDynamic: 'Sucht nach dem Seelenpartner; lernt mit den Jahren, dass Unvollkommenheit Teil der menschlichen Schönheit ist.'
  },
  '4/6': {
    code: '4/6',
    consciousLine: 4,
    unconsciousLine: 6,
    name: 'Opportunist / Role Model',
    germanName: 'Netzwerker / Vorbild (Herzensmensch & Beobachter)',
    archetypeRole: 'Die weise Bezugsperson der Gemeinschaft',
    consciousTheme: 'Großes Herz für Freunde, Familie und vertraute Kollegen; loyal und einflussreich.',
    unconsciousTheme: 'Philosophische Distanz und Adlerperspektive auf das menschliche Zusammenspiel.',
    lifeTrajectory: 'Vom verlässlichen Freund zum respektierten Mentor und Lebensvorbild der gesamten Gemeinschaft.',
    relationshipDynamic: 'Freundschaft ist das unbedingte Fundament jeder funktionierenden Liebesbeziehung.'
  },
  '4/1': {
    code: '4/1',
    consciousLine: 4,
    unconsciousLine: 1,
    name: 'Opportunist / Investigator',
    germanName: 'Netzwerker / Forscher (Das Juxtaposition-Fundament)',
    archetypeRole: 'Der unerschütterliche Brückenbauer mit festem Schicksal',
    consciousTheme: 'Wärme und Einfluss im vertrauten Umfeld.',
    unconsciousTheme: 'Festes, unverrückbares Wissensfundament und starre Prinzipientreue.',
    lifeTrajectory: 'Einziges fixes Schicksal im Radix: Geht seinen ganz eigenen Pfad kerzengerade, ohne sich beirren zu lassen.',
    relationshipDynamic: 'Sucht Partner, die den festen Lebensweg respektieren und gemeinsam teilen wollen.'
  },
  '5/1': {
    code: '5/1',
    consciousLine: 5,
    unconsciousLine: 1,
    name: 'Heretic / Investigator',
    germanName: 'Praktiker / Forscher (Der General & Lösungsfinder)',
    archetypeRole: 'Der Meisterstratege für komplexe Herausforderungen',
    consciousTheme: 'Wird von anderen als verlässlicher Retter und pragmatischer Problemlöser gesehen.',
    unconsciousTheme: 'Gibt nur Ratschläge ab, die auf gründlich erforschten und wasserdichten Fakten beruhen.',
    lifeTrajectory: 'Bereitet sich im Stillen penibel vor, um dann auf der großen Bühne messbare Durchbrüche zu liefern.',
    relationshipDynamic: 'Muss die Erwartungen des Partners erden: Nicht der Retter sein müssen, sondern Mensch sein dürfen.'
  },
  '5/2': {
    code: '5/2',
    consciousLine: 5,
    unconsciousLine: 2,
    name: 'Heretic / Hermit',
    germanName: 'Praktiker / Einsiedler (Der widerwillige Held)',
    archetypeRole: 'Das schlummernde Naturtalent mit Führungs-Potenzial',
    consciousTheme: 'Steht im Fokus hoher Erwartungen der Umwelt als Retter und Helfer.',
    unconsciousTheme: 'Möchte eigentlich am liebsten in Ruhe gelassen werden und seinen eigenen Hobbys nachgehen.',
    lifeTrajectory: 'Wartet auf den einen, wahrhaft bedeutsamen Ruf, für den es sich wirklich lohnt, die Festung zu verlassen.',
    relationshipDynamic: 'Braucht Partner, die ihn nicht mit ständigen Alltagsproblemen überfordern, sondern seinen Rückzug nähren.'
  },
  '6/2': {
    code: '6/2',
    consciousLine: 6,
    unconsciousLine: 2,
    name: 'Role Model / Hermit',
    germanName: 'Vorbild / Einsiedler (Der weise Beobachter auf dem Dach)',
    archetypeRole: 'Das erleuchtete Vorbild im stillen Heiligtum',
    consciousTheme: 'Hohe ethische Standards, Weisheit und der Weitblick des unbestechlichen Beobachters.',
    unconsciousTheme: 'Naturtalent, das absolute Ruhe und Regeneration für sich allein benötigt.',
    lifeTrajectory: 'Nach wilden Lehrjahren und kluger Rückzugsphase steigt er ab 50 als unberührbares, warmes Vorbild herab.',
    relationshipDynamic: 'Sucht einen Seelenverwandten auf Augenhöhe, der die hehre Integrität und den Rückzugsraum versteht.'
  },
  '6/3': {
    code: '6/3',
    consciousLine: 6,
    unconsciousLine: 3,
    name: 'Role Model / Martyr',
    germanName: 'Vorbild / Experimentator (Ewiger Lernender & Erhabener Weiser)',
    archetypeRole: 'Der lebendige Mentor des Wandels',
    consciousTheme: 'Weitblick, Sinn für Höheres und das Streben nach ultimativer Authentizität.',
    unconsciousTheme: 'Bleibt ein Leben lang anpassungsfähig, probiert Neues aus und lacht über eigene Stolpersteine.',
    lifeTrajectory: 'Vollkommen lebendiges Vorbild: Zeigt der Welt, dass wahre Weisheit im humorvollen Annehmen des Wandels liegt.',
    relationshipDynamic: 'Braucht einen Partner mit hoher Elastizität, Abenteuerlust und Vertrauen in stetige Weiterentwicklung.'
  }
};

export function getProfileInfo(consciousLine: number, unconsciousLine: number): HDProfileInfo {
  const code = `${consciousLine}/${unconsciousLine}`;
  return HD_PROFILES[code] || HD_PROFILES['1/3'];
}
