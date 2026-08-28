import type { HDEnergyType, HDEnergyTypeInfo, HDAuthority, HDAuthorityInfo } from './types';

export const ENERGY_TYPES_DATA: Record<HDEnergyType, HDEnergyTypeInfo> = {
  Generator: {
    type: 'Generator',
    title: 'Generator',
    germanTitle: 'Reiner Generator (Der vitale Lebenskraft-Schöpfer)',
    percentage: 'ca. 37% der Weltbevölkerung',
    auraDescription: 'Offen, einladend, warm und magnetisch; zieht Gelegenheiten und Lebensimpulse wie ein Magnet an.',
    strategy: 'Auf das Leben reagieren (Bauchgefühl / Sakralstimme)',
    signature: 'Tiefe Zufriedenheit & Erfüllung',
    notSelfTheme: 'Frustration & Zähigkeit',
    decisionProtocol: 'Niemals aus dem reinen Verstand initiieren. Warte auf Dinge, Personen oder Fragen, auf die dein Sakralzentrum mit einem spontanen "Uh-huh" (Ja) oder "Un-un" (Nein) anspringt.',
    birkenbihlKeynote: 'Du bist der Marathonläufer der Menschheit: Wenn du tust, was du liebst, lädt deine Arbeit deine Batterie auf statt sie zu leeren.',
    masteryRoadmap: [
      'Lass das Leben zu dir kommen: Du musst nichts erzwingen, das Leben fragt dich ständig.',
      'Achte auf deine Bauchgeräusche und spontane Bauchreaktionen (Uh-huh / Un-un).',
      'Höre sofort auf, wenn sich eine Tätigkeit wie klebrige Frustration anfühlt.',
      'Gehe erst schlafen, wenn deine vitale Tagesenergie freudig und restlos verausgabt ist.'
    ]
  },
  ManifestingGenerator: {
    type: 'ManifestingGenerator',
    title: 'Manifesting Generator',
    germanTitle: 'Manifestierender Generator (Der multidimensionale Tempomacher)',
    percentage: 'ca. 33% der Weltbevölkerung',
    auraDescription: 'Offen, magnetisch, dynamisch und extrem schnell; bündelt vitale Schaffenskraft mit sofortiger Umsetzung.',
    strategy: 'Reagieren, Informieren & Loslegen (Ausprobieren & Anpassen)',
    signature: 'Zufriedenheit & innerer Friede',
    notSelfTheme: 'Frustration, Wut & Ungeduld',
    decisionProtocol: 'Reagiere sakral, informiere kurz die Menschen in deinem Umfeld und beginne die Umsetzung. Wenn du mitten im Tun merkst, dass es nicht passt, korrigiere den Kurs ohne Schuldgefühle.',
    birkenbihlKeynote: 'Du bist der Sprinter und Abkürzungsfinder: Du darfst 5 Projekte gleichzeitig haben und Schritte überspringen!',
    masteryRoadmap: [
      'Akzeptiere dein rasantes Tempo: Du findest die schnellsten Wege durch praktische Fehler und Korrekturen.',
      'Informiere vor dem Losrennen: Ein kurzer Hinweis ("Ich mache jetzt X") verhindert Widerstände und Missverständnisse.',
      'Erlaube dir Vielseitigkeit: Monotone Einbahnstraßen ersticken dein sakrales Feuer.',
      'Entspanne dich vor dem Einschlafen im Bett, um dein Turbo-Energiefeld herunterzufahren.'
    ]
  },
  Manifestor: {
    type: 'Manifestor',
    title: 'Manifestor',
    germanTitle: 'Manifestor (Der autarke Initiator & Pionier)',
    percentage: 'ca. 9% der Weltbevölkerung',
    auraDescription: 'Geschlossen, fokussiert, wirkungsvoll und initiierend; stößt Türen im Quantenfeld auf.',
    strategy: 'Informieren vor dem Handeln (Widerstände auflösen)',
    signature: 'Frieden & Unabhängigkeit',
    notSelfTheme: 'Wut, Zorn & Reizbarkeit',
    decisionProtocol: 'Du bist als einziger Typ gebaut, um rein aus dem inneren Impuls heraus zu initiieren. Informiere alle Betroffenen vor deiner Tat, um Gegenwind in Rückenwind zu verwandeln.',
    birkenbihlKeynote: 'Du bist der Zündfunke der Evolution: Du bringst Dinge in Gang, musst sie aber nicht jahrelang verwalten!',
    masteryRoadmap: [
      'Warte auf niemanden: Wenn dein innerer Impuls da ist, setze den ersten Schritt.',
      'Informieren ist keine Bitte um Erlaubnis, sondern ein Signal an die Umwelt, dir aus dem Weg zu gehen.',
      'Delegiere die langfristige Umsetzung an Generatoren, sobald der Funke brennt.',
      'Schlafe in deiner eigenen Aura, um morgens mit unverfälschtem Schöpferdrang aufzuwachen.'
    ]
  },
  Projector: {
    type: 'Projector',
    title: 'Projector',
    germanTitle: 'Projektor (Der weise Seher & System-Guide)',
    percentage: 'ca. 20% der Weltbevölkerung',
    auraDescription: 'Fokussiert, penetrierend, absorbierend und tief sehend; durchschaut die Energie und Potenziale anderer.',
    strategy: 'Auf die Einladung & aufrichtige Anerkennung warten',
    signature: 'Erfolg & Erfüllung',
    notSelfTheme: 'Verbitterung & Erschöpfung',
    decisionProtocol: 'Für große Weichenstellungen (Liebe, Beruf, Wohnort) auf eine explizite Einladung und Anerkennung deiner spezifischen Gabe warten. Dein Verstand sieht alles, darf aber nicht ungefragt beraten.',
    birkenbihlKeynote: 'Du bist der Regisseur, nicht der Schauspieler: Du leitest und optimierst die Energie anderer mit minimalem Aufwand!',
    masteryRoadmap: [
      'Höre auf, dich als Arbeitsbiene zu verausgaben: Deine Gabe ist Weisheit, nicht 12 Stunden Schuften.',
      'Studiere Systeme (Astrologie, Psychologie, Prozesse, Management), die du meisterhaft beherrschst.',
      'Teile deinen Rat nur, wenn du eingeladen und wertgeschätzt wirst.',
      'Ruhe dich vor der Erschöpfung aus und liege vor dem Schlafen entspannt ohne Bildschirme.'
    ]
  },
  Reflector: {
    type: 'Reflector',
    title: 'Reflector',
    germanTitle: 'Reflektor (Der kosmische Spiegel & Barometer)',
    percentage: 'ca. 1% der Weltbevölkerung',
    auraDescription: 'Resistent, abtastend und spiegelnd; erfasst den Gesamtzustand der Gemeinschaft und Natur.',
    strategy: 'Einen vollständigen Mondzyklus (28,5 Tage) abwarten',
    signature: 'Überraschung & Staunen',
    notSelfTheme: 'Enttäuschung über die Welt',
    decisionProtocol: 'Bei allen wichtigen Lebensentscheidungen 28 Tage lang mit verschiedenen Vertrauten über das Thema sprechen, während der Mond alle 64 Tore aktiviert, bis völlige innere Klarheit herrscht.',
    birkenbihlKeynote: 'Du bist der weiße Rabe der Menschheit: Ein lebendiges Barometer für Gesundheit, Wahrheit und kosmischen Wandel.',
    masteryRoadmap: [
      'Wähle deine physische Umgebung mit höchster Sorgfalt: Du spiegelst deinen Ort 1:1 wider.',
      'Lass dir von niemandem Zeitdruck aufdrängen; deine Wahrheit braucht den Mondrhythmus.',
      'Verstehe deine Offenheit als Gabe unbegrenzter Weisheit, nicht als Schwäche.',
      'Schlafe unbedingt allein in deinem eigenen energetischen Feld.'
    ]
  }
};

export const AUTHORITIES_DATA: Record<HDAuthority, HDAuthorityInfo> = {
  emotional: {
    id: 'emotional',
    name: 'Emotional Authority (Solar Plexus)',
    germanName: 'Emotionale Autorität (Solarplexus)',
    voicePhrase: '»Es gibt keine Wahrheit im Jetzt – Klarheit wächst mit der Welle.«',
    clarityProcess: 'Triff niemals spontane Entscheidungen auf dem Höhepunkt oder Tiefpunkt deiner Stimmung. Schlafe immer eine Nacht (oder mehrere Tage) über wichtige Angebote, bis sich eine ruhige, unaufgeregte Gewissheit einstellt.',
    trapToAvoid: 'Spontanes Zusagen aus momentaner Euphorie oder vorschnelles Absagen aus vorübergehendem Tief.',
    birkenbihlAnchor: 'Die emotionale Welle ist wie ein Ozean: Wenn das Wasser aufgewühlt ist, siehst du den Meeresgrund nicht. Erst in der Windstille wird der Grund kristallklar.'
  },
  sacral: {
    id: 'sacral',
    name: 'Sacral Authority',
    germanName: 'Sakrale Autorität (Bauchstimme)',
    voicePhrase: '»Uh-huh (Ja!) oder Un-un (Nein) im Augenblick.«',
    clarityProcess: 'Höre auf die unmittelbaren Laute deines Körpers. Wenn jemand dir eine geschlossene Frage stellt ("Möchtest du dieses Projekt machen?"), reagiert dein Bauch in Millisekunden mit einem vitalen Aufwärtsdrang oder einem blockierenden Zusammenziehen.',
    trapToAvoid: 'Den Kopf einschalten und sich mit rationalen "Aber es wäre vernünftig"-Argumenten über die eigene Bauchstimme hinwegsetzen.',
    birkenbihlAnchor: 'Dein Sakralzentrum ist ein biologisches Kraftwerk: Entweder fließt sofort Strom, oder der Schalter bleibt aus. Verhandle niemals mit dem Schalter!'
  },
  splenic: {
    id: 'splenic',
    name: 'Splenic Authority (Spleen)',
    germanName: 'Milz-Autorität (Spontane Körper-Intuition)',
    voicePhrase: '»Ein leises, blitzschnelles Flüstern im Hier und Jetzt.«',
    clarityProcess: 'Deine Intuition meldet sich exakt einmal im gegenwärtigen Moment über ein spontanes Körpergefühl, Gänsehaut oder einen inneren Riecher. Sie begründet sich nie mit Logik.',
    trapToAvoid: 'Zweifeln und Nachdenken: Sobald der Verstand fragt "Warum?", ist der Moment der Milz-Wahrheit bereits vorbei.',
    birkenbihlAnchor: 'Die Milz ist dein tierischer Überlebensinstinkt: Sie riecht Gefahr und Sicherheit im Jetzt, flüstert aber nur ein einziges Mal.'
  },
  ego_manifested: {
    id: 'ego_manifested',
    name: 'Ego Manifested Authority',
    germanName: 'Ego-Manifestierte Autorität (Herz zu Kehle)',
    voicePhrase: '»Was will mein Herz wirklich aussprechen und erschaffen?«',
    clarityProcess: 'Höre dir selbst beim ungefilterten Sprechen zu. Deine Wahrheit offenbart sich in dem Moment, in dem deine Stimme ohne Zensur ausspricht, was du wahrhaft willst und wofür deine Willenskraft brennt.',
    trapToAvoid: 'Sich selbst für egoistisch halten oder versuchen, es anderen recht zu machen.',
    birkenbihlAnchor: 'Dein Herz ist dein König: Frage dich immer, ob die Belohnung den Einsatz deiner Willenskraft wirklich wert ist.'
  },
  ego_projected: {
    id: 'ego_projected',
    name: 'Ego Projected Authority',
    germanName: 'Ego-Projizierte Autorität (Herz zu G-Zentrum)',
    voicePhrase: '»Lohnt es sich für mich und mein Herz?«',
    clarityProcess: 'Warte auf eine formelle Einladung und prüfe dann: Habe ich die Willenskraft dafür und dient es meinem wahren Selbstwert?',
    trapToAvoid: 'Verpflichtungen eingehen, für die du keine echte Herzenskraft hast.',
    birkenbihlAnchor: 'Dein Selbstwert ist dein Kompass: Gib deine Energie nur in Bindungen, die deine Souveränität voll anerkennen.'
  },
  self_projected: {
    id: 'self_projected',
    name: 'Self-Projected Authority (G-Center to Throat)',
    germanName: 'Selbst-Projizierte Autorität (G-Zentrum zu Kehle)',
    voicePhrase: '»Ich höre meine Wahrheit im Klang meiner eigenen Stimme.«',
    clarityProcess: 'Sprich mit vertrauten Personen ohne Absicht, Ratschläge zu erhalten. Höre einfach darauf, wie deine eigene Stimme klingt, wenn du über die Entscheidung sprichst – der Tonfall verrät dir sofort, was für dich stimmt.',
    trapToAvoid: 'Auf die Ratschläge und Meinungen der Zuhörer hören, statt auf den eigenen Stimmklang.',
    birkenbihlAnchor: 'Dein Freund ist dein Resonanzboden: Du sprichst nicht, um eine Antwort zu bekommen, sondern um dich selbst sprechen zu hören!'
  },
  mental: {
    id: 'mental',
    name: 'Mental / Environmental Authority',
    germanName: 'Mentale / Umgebungs-Autorität (Sounding Board)',
    voicePhrase: '»Die richtige Umgebung schenkt mir Klarheit.«',
    clarityProcess: 'Nutze andere Menschen als "Sounding Board". Besuche verschiedene physische Orte (Cafés, Parks, Bibliotheken) und beobachte, wie sich dein Körper dort anfühlt und wie sich deine Gedanken entfalten.',
    trapToAvoid: 'Entscheidungen im Kopf durch logische Pro-und-Contra-Listen erzwingen wollen.',
    birkenbihlAnchor: 'Du denkst mit deiner Umgebung: Wenn der Raum toxisch oder beengend ist, sind es auch deine Gedanken. Wechsle den Ort!'
  },
  lunar: {
    id: 'lunar',
    name: 'Lunar Authority (Reflector)',
    germanName: 'Mond-Autorität (28-Tage-Zyklus)',
    voicePhrase: '»Ein ganzer Mondumlauf durch alle 64 Tore.«',
    clarityProcess: 'Lass dir für bedeutsame Entscheidungen 28,5 Tage Zeit. Der Mond durchwandert alle Tore deines Bodygraphs und beleuchtet das Thema aus jedem denkbaren Winkel, bis die Lösung sonnenklar vor dir liegt.',
    trapToAvoid: 'Sich von Generatoren oder Chefs zu schnellen Entschlüssen drängen lassen.',
    birkenbihlAnchor: 'Du bist das lebendige Uhrwerk des Kosmos: Deine Wahrheit reift mit den Mondphasen wie edler Wein.'
  }
};
