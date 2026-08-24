// Angel Numbers & Cosmic Clock Synchronicities Engine
// Astrological, Numerological & Psychospiritual Synthesis

export interface AngelNumberInfo {
  number: string;
  category: 'triple' | 'master' | 'mirror_time' | 'reversed_time';
  headline: string;
  rulingPlanet: string;
  rulingZodiac: string;
  element: string;
  colorClass: string;
  gradientClass: string;
  icon: string;
  
  // 4 Core Dimensions
  coreSpiritualMeaning: string;
  loveAndTwinFlame: string;
  careerAndAbundance: string;
  immediateAction: string; // Was tun im Moment des Sehens? (Birkenbihl Impuls)
  astroNumerologySynergy: string;
}

export const MAIN_ANGEL_NUMBERS: AngelNumberInfo[] = [
  {
    number: '000 / 00:00',
    category: 'triple',
    headline: 'Der Göttliche Nullpunkt & Reiner Neuanfang',
    rulingPlanet: 'Pluto & Kether (Urquelle)',
    rulingZodiac: 'Fische & Skorpion',
    element: 'Äther / Kosmisches Vakuum',
    colorClass: 'text-slate-200 border-white/30 bg-white/5',
    gradientClass: 'from-slate-200 via-slate-400 to-slate-900',
    icon: '🌌',
    coreSpiritualMeaning: 'Du befindest dich am Nullpunkt unendlicher Möglichkeiten. Ein alter Seelenzyklus ist vollendet; du bist direkt mit der schöpferischen Urquelle verbunden.',
    loveAndTwinFlame: 'Tabula Rasa: Alte Verletzungen dürfen sich auflösen. Zeit für einen unvoreingenommenen, reinen Neubeginn in Herzensdingen.',
    careerAndAbundance: 'Maximale schöpferische Freiheit. Alle Türen stehen offen – säe die Gedanken für dein nächstes großes Lebenskapitel.',
    immediateAction: 'Halte für 3 Atemzüge inne. Atme tief in den Bauch aus und visualisiere, wie sich aller Ballast in weißem Licht auflöst.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 0 (Urzustand) und Pluto (Metamorphose). Zeigt an, dass das Universum dich auf Werkseinstellungen zurücksetzt.'
  },
  {
    number: '111 / 11:11',
    category: 'master',
    headline: 'Das Kosmische Portal & Sofort-Manifestation',
    rulingPlanet: 'Sonne & Uranus',
    rulingZodiac: 'Widder & Wassermann',
    element: 'Feuer & Äther',
    colorClass: 'text-amber-300 border-amber-500/40 bg-amber-500/10',
    gradientClass: 'from-amber-400 via-yellow-500 to-orange-600',
    icon: '⚡',
    coreSpiritualMeaning: 'Ein energetisches Tor hat sich geöffnet. Deine Gedanken, Gefühle und Überzeugungen materialisieren sich mit außergewöhnlicher Geschwindigkeit.',
    loveAndTwinFlame: 'Seelenpartner-Aktivierung: Eine tiefe Seelenverbindung oder Dualseele reflektiert dein Bewusstsein. Richte dein Herz auf bedingungslose Liebe aus.',
    careerAndAbundance: 'Startsignal für neue Projekte, Selbstständigkeit oder mutige Führungsentscheidungen. Zaudere nicht länger.',
    immediateAction: 'Achte exakt auf den Gedanken, den du im Moment des Sehens hattest: Das Universum sagt "JA" zu dieser Idee. Notiere sie sofort!',
    astroNumerologySynergy: 'Resoniert mit der Meisterzahl 11 und der Widder-Pionierkraft. Pure solare Schöpferkraft trifft auf uranische Geistesblitze.'
  },
  {
    number: '222 / 22:22',
    category: 'master',
    headline: 'Göttliches Timing & Meister-Harmonie',
    rulingPlanet: 'Mond & Venus',
    rulingZodiac: 'Stier & Krebs',
    element: 'Wasser & Erde',
    colorClass: 'text-indigo-300 border-indigo-500/40 bg-indigo-500/10',
    gradientClass: 'from-indigo-400 via-purple-500 to-pink-500',
    icon: '⚖️',
    coreSpiritualMeaning: 'Vertraue dem unsichtbaren Plan. Auch wenn du noch keine äußeren Resultate siehst: Deine Samen keimen bereits unter der Erde. Geduld ist deine Seelenprüfung.',
    loveAndTwinFlame: 'Herzens-Frieden: Eine Beziehung findet zurück ins Gleichgewicht. Gegenseitiges Vertrauen und emotionale Sanftmut wachsen.',
    careerAndAbundance: 'Kooperation und Diplomatie führen zum Ziel. Baue beständige Netzwerke auf und vertraue langfristigen Partnerschaften.',
    immediateAction: 'Lass Kontrollzwänge los. Sprich laut oder im Geist: "Ich vertraue dem perfekten Timing des Lebens."',
    astroNumerologySynergy: 'Resoniert mit der Meisterzahl 22 (Der Meister-Baumeister) und der nährenden Mondenergie. Stabilität durch inneren Frieden.'
  },
  {
    number: '333 / 03:33',
    category: 'triple',
    headline: 'Aufgestiegene Meister & Schöpferische Expansion',
    rulingPlanet: 'Jupiter & Mars',
    rulingZodiac: 'Schütze & Zwillinge',
    element: 'Feuer & Luft',
    colorClass: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10',
    gradientClass: 'from-yellow-400 via-amber-500 to-rose-500',
    icon: '✨',
    coreSpiritualMeaning: 'Die geistige Welt und aufgestiegene Meister (Jesus, Buddha, Quan Yin) umgeben dich mit Schutz, Liebe und Führung. Deine Intuition ist auf Höchststand.',
    loveAndTwinFlame: 'Gemeinsames Lachen, Leichtigkeit und spielerische Herzensfreude. Drücke deine Gefühle ohne Scham offen und kreativ aus.',
    careerAndAbundance: 'Wachstumsschub: Deine kreativen und spirituellen Fähigkeiten werden gebraucht. Zeit für Lehren, Schreiben, Sprechen oder Beraten.',
    immediateAction: 'Bitte deine geistigen Begleiter um ein klares Zeichen für deinen nächsten Schritt – und höre auf den ersten spontanen Impuls.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 3 (Die heilige Trinität) und dem expandierenden Jupiter. Optimismus und spirituelle Weisheit.'
  },
  {
    number: '444 / 04:44',
    category: 'triple',
    headline: 'Erzengel-Schutz & Unerschütterliches Fundament',
    rulingPlanet: 'Saturn & Die 4 Himmelsrichtungen',
    rulingZodiac: 'Steinbock & Stier',
    element: 'Erde',
    colorClass: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10',
    gradientClass: 'from-emerald-500 via-teal-600 to-slate-900',
    icon: '🛡️',
    coreSpiritualMeaning: 'Tausende von Engeln umgeben dein Energiefeld. Du bist absolut sicher, geerdet und beschützt. Deine Gebete wurden erhört.',
    loveAndTwinFlame: 'Stabilität und Verlässlichkeit. Eine Partnerschaft baut auf einem unzerstörbaren, ehrlichen Fundament auf.',
    careerAndAbundance: 'Fleiß und Systematik zahlen sich aus. Konzentriere dich auf solide Strukturen, Verträge und langfristigen Vermögensaufbau.',
    immediateAction: 'Spüre deine Füße fest auf dem Boden, atme durch und bedanke dich im Stillen bei deinen Schutzengeln.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 4 (Die 4 Elemente, 4 Himmelsrichtungen) und saturnischer Standfestigkeit. Schutz vor jeglicher Erschütterung.'
  },
  {
    number: '555 / 05:55',
    category: 'triple',
    headline: 'Der Große Wandel & Seelen-Befreiung',
    rulingPlanet: 'Merkur & Uranus',
    rulingZodiac: 'Wassermann & Zwillinge',
    element: 'Luft & Äther',
    colorClass: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10',
    gradientClass: 'from-cyan-400 via-sky-500 to-indigo-600',
    icon: '🌪️',
    coreSpiritualMeaning: 'Große, längst überfällige Veränderungen brechen über dein Leben herein. Was geht, macht Platz für eine viel höhere Schwingungsebene.',
    loveAndTwinFlame: 'Unerwartete Wendungen in der Liebe: Befreiung aus toxischen Abhängigkeiten oder plötzliche, magische Seelenbegegnungen.',
    careerAndAbundance: 'Kurswechsel! Sei mutig, neue Methoden auszuprobieren, dich weiterzubilden oder alte berufliche Pfade hinter dir zu lassen.',
    immediateAction: 'Leiste keinen Widerstand gegen den Wandel. Fließe wie Wasser mit den Ereignissen und vertraue der höheren Führung.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 5 (Freiheit, Abenteuer, Fünfstern) und uranischen Quantensprüngen.'
  },
  {
    number: '666 / 06:06',
    category: 'triple',
    headline: 'Seelen-Balance & Neuausrichtung auf das Wesentliche',
    rulingPlanet: 'Venus & Erde',
    rulingZodiac: 'Waage & Stier',
    element: 'Erde & Wasser',
    colorClass: 'text-pink-300 border-pink-500/40 bg-pink-500/10',
    gradientClass: 'from-pink-500 via-rose-600 to-purple-800',
    icon: '🌸',
    coreSpiritualMeaning: 'Ein liebevoller Weckruf des Universums: Du warst zu sehr in materiellen Sorgen, Grübeleien oder Kontrollzwängen gefangen. Richte deinen Geist wieder auf Liebe und Dankbarkeit aus.',
    loveAndTwinFlame: 'Herzheilung: Erlaube dir, Liebe anzunehmen, ohne Gegenleistungen zu fordern. Verzeihe dir und anderen alte Fehler.',
    careerAndAbundance: 'Löse dich von der Angst vor Mangel. Wenn du deinen Fokus auf Wertschöpfung und Freude legst, fließt die Fülle automatisch.',
    immediateAction: 'Schreibe 5 Dinge auf, für die du in diesem Moment zutiefst dankbar bist. Das hebt deine Schwingung sofort an.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 6 (Harmonie, Familie, Ästhetik) und Venus. Re-Zentrierung im spirituellen Herzen.'
  },
  {
    number: '777 / 07:07',
    category: 'triple',
    headline: 'Höchster Kosmischer Segen & Spirituelle Meisterschaft',
    rulingPlanet: 'Neptun & Ketu (Mondknoten)',
    rulingZodiac: 'Fische & Schütze',
    element: 'Wasser & Licht',
    colorClass: 'text-purple-300 border-purple-500/40 bg-purple-500/10',
    gradientClass: 'from-purple-500 via-indigo-600 to-teal-400',
    icon: '🔮',
    coreSpiritualMeaning: 'Die Engel applaudieren dir! Du bist exakt am richtigen Ort zur richtigen Zeit. Deine spirituelle Reife zieht Wunder und Synchronizitäten magisch an.',
    loveAndTwinFlame: 'Tiefe telepathische Seelenverbundenheit. Ihr versteht euch ohne Worte und teilt eine gemeinsame spirituelle Aufgabe.',
    careerAndAbundance: 'Glückssträhne durch intuitive Führung: Vertraue deinen Eingebungen, auch wenn der Verstand zögert.',
    immediateAction: 'Nimm dir Zeit für Stille oder ein kurzes Gebet der Dankbarkeit. Dein drittes Auge empfängt direkte Eingebungen.',
    astroNumerologySynergy: 'Resoniert mit der heiligen Zahl 7 (Die 7 Strahlen, 7 Chakren, 7 Himmelskörper) und neptunischer Erleuchtung.'
  },
  {
    number: '888 / 08:08',
    category: 'triple',
    headline: 'Unendliche Fülle & Karmischer Ernte-Zyklus',
    rulingPlanet: 'Saturn & Pluto',
    rulingZodiac: 'Skorpion & Steinbock',
    element: 'Erde & Feuer',
    colorClass: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    gradientClass: 'from-amber-400 via-yellow-600 to-stone-900',
    icon: '♾️',
    coreSpiritualMeaning: 'Das Gesetz der kosmischen Resonanz zahlt sich aus: Was du an Gutem gesät hast, kehrt nun als reiche Ernte zu dir zurück. Finanzielle und seelische Fülle.',
    loveAndTwinFlame: 'Reife, aufrichtige Partnerschaft auf Augenhöhe. Karma-Knoten aus früheren Inkarnationen lösen sich harmonisch auf.',
    careerAndAbundance: 'Großer beruflicher Durchbruch, finanzielle Belohnungen und nachhaltiger Wohlstand stehen bevor.',
    immediateAction: 'Öffne deine Hände nach oben und nimm den Wohlstand mental an. Teile einen Teil deiner Fülle mit Bedürftigen.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 8 (Lemniskate, Unendlichkeit) und der saturnisch-plutonischen Meisterschaft über die irdische Welt.'
  },
  {
    number: '999 / 09:09',
    category: 'triple',
    headline: 'Zyklus-Vollendung & Lichtarbeiter-Berufung',
    rulingPlanet: 'Mars & Neptun',
    rulingZodiac: 'Widder & Fische',
    element: 'Feuer & Wasser',
    colorClass: 'text-rose-300 border-rose-500/40 bg-rose-500/10',
    gradientClass: 'from-rose-500 via-pink-600 to-indigo-900',
    icon: '🕊️',
    coreSpiritualMeaning: 'Ein großes Lebenskapitel geht zu Ende. Du wirst gerufen, dein Licht ohne Furcht in die Welt zu tragen und deine Seelenmission zu leben.',
    loveAndTwinFlame: 'Vollendung alter Seelenverträge: Was dich kleingehalten hat, darf in Frieden gehen. Raum für deine höchste Liebesfrequenz.',
    careerAndAbundance: 'Übergang zu sinnstiftender Arbeit: Heilen, Beraten, Führen, Inspirieren. Die Welt braucht dein Talent.',
    immediateAction: 'Vergib allen Menschen aus deiner Vergangenheit und segne den Weg, der hinter dir liegt. Ein neues Zeitalter beginnt.',
    astroNumerologySynergy: 'Resoniert mit der Zahl 9 (Vollendung des Dezimalsystems) und dem Alpha & Omega des Tierkreises.'
  }
];

export const MIRROR_CLOCK_TIMES = [
  { time: '01:01', meaning: 'Jemand denkt voller Zuneigung an dich • Zeit, deine Selbstliebe zu stärken.', icon: '💖' },
  { time: '02:02', meaning: 'Eine verborgene Wahrheit enthüllt sich • Vertraue deiner Intuition über den Verstand.', icon: '🔍' },
  { time: '03:03', meaning: 'Kreativer Durchbruch naht • Lass dich von Kritikern nicht von deiner Vision abbringen.', icon: '🎨' },
  { time: '04:04', meaning: 'Achte auf deinen Körper & Erdung • Geh in die Natur und stärke deine Abwehrkräfte.', icon: '🌳' },
  { time: '05:05', meaning: 'Eine wunderbare Überraschung kündigt sich an • Sei offen für ungeplante Wege.', icon: '🎁' },
  { time: '06:06', meaning: 'Liebe, Versöhnung & Harmonie • Suche das klärende, verzeihende Gespräch.', icon: '🕊️' },
  { time: '07:07', meaning: 'Spirituelles Erwachen • Du empfängst kosmische Führung durch deine Träume.', icon: '✨' },
  { time: '08:08', meaning: 'Finanzieller & beruflicher Erfolg • Eine finanzielle Blockade löst sich jetzt auf.', icon: '💰' },
  { time: '09:09', meaning: 'Teile dein Wissen und dein Licht • Eine selbstlose Tat bringt großen Seelensegen.', icon: '🌟' },
  { time: '10:10', meaning: 'Ein schicksalhafter Wendepunkt • Ein alter Lebensabschnitt endet zum Guten.', icon: '🚪' },
  { time: '11:11', meaning: 'Das Große Meister-Portal • Manifestations-Booster: Gedanken werden sofort Realität!', icon: '⚡' },
  { time: '12:12', meaning: 'Lichtarbeiter-Code • Deine Seelenwünsche materialisieren sich in der 3D-Welt.', icon: '🌈' },
  { time: '13:13', meaning: 'Heilsame Transformation • Eine Illusion fällt ab; die reine Wahrheit befreit dich.', icon: '🦋' },
  { time: '14:14', meaning: 'Bleib fokussiert und unbeirrbar • Dein Ziel ist nur noch wenige Schritte entfernt.', icon: '🎯' },
  { time: '15:15', meaning: 'Sinnlichkeit & Leidenschaft • Ein Neubeginn in Herzensangelegenheiten.', icon: '🔥' },
  { time: '16:16', meaning: 'Erneuerung aus der Asche • Lass Altes los, um das Größere zu empfangen.', icon: '🦅' },
  { time: '17:17', meaning: 'Kosmischer Glücksfall • Deine verborgenen Talente werden öffentlich anerkannt.', icon: '👑' },
  { time: '18:18', meaning: 'Seelenreife • Du hast eine schwere karmische Prüfung erfolgreich gemeistert.', icon: '🏆' },
  { time: '19:19', meaning: 'Hab Geduld • Deine Engel weben die Lösung bereits hinter den Kulissen.', icon: '⏳' },
  { time: '20:20', meaning: 'Schnelle Fügung • Was du von Herzen suchst, ist bereits auf dem Weg zu dir.', icon: '🧲' },
  { time: '21:21', meaning: 'Triumph & Erfüllung • Deine Hingabe trägt nun die süßesten Früchte.', icon: '🥂' },
  { time: '22:22', meaning: 'Der Meister-Baumeister • Du erschaffst ein Werk von bleibendem Wert für die Welt.', icon: '🏛️' },
  { time: '23:23', meaning: 'Höchster Schutz auf all deinen Wegen • Du bist von lichtvollen Schutzwesen umhüllt.', icon: '🛡️' }
];

export const REVERSED_CLOCK_TIMES = [
  { time: '12:21', meaning: 'Jemand spricht im Geheimen voller Bewunderung über dich • Bewahre dein reines Herz.', icon: '💬' },
  { time: '13:31', meaning: 'Eine scheinbare Hürde erweist sich als getarnter Glücksfall • Nicht entmutigen lassen.', icon: '🍀' },
  { time: '14:41', meaning: 'Etwas Verlorenes (Gegenstand, Vertrauen oder Energie) kehrt zu dir zurück.', icon: '🔄' },
  { time: '15:51', meaning: 'Ein Seelenverwandter nähert sich deinem Energiefeld • Achte auf Synchrone Signale.', icon: '💓' },
  { time: '20:02', meaning: 'Du wirst vor einer Fehlentscheidung bewahrt • Überdenke deinen nächsten Schritt in Ruhe.', icon: '🛑' },
  { time: '21:12', meaning: 'Dein Schutzengel flutet deine Aura mit Heilung und Zuversicht • Atme durch.', icon: '🌿' },
  { time: '23:32', meaning: 'Tiefe Zuneigung: Jemand sehnt sich nach deiner Nähe • Öffne dein Herz für Begegnung.', icon: '💌' }
];

// Calculate personal angel numbers based on chart
export function calculatePersonalAngelResonance(lifePathNumber: number, sunSign: string) {
  // Map life path number directly to resonant angel number
  const primaryNumberMap: Record<number, string> = {
    1: '111 / 11:11',
    2: '222 / 22:22',
    3: '333 / 03:33',
    4: '444 / 04:44',
    5: '555 / 05:55',
    6: '666 / 06:06',
    7: '777 / 07:07',
    8: '888 / 08:08',
    9: '999 / 09:09',
    11: '111 / 11:11',
    22: '222 / 22:22',
    33: '333 / 03:33'
  };

  const primaryNumberCode = primaryNumberMap[lifePathNumber] || '111 / 11:11';
  const primaryAngelNumber = MAIN_ANGEL_NUMBERS.find(n => n.number === primaryNumberCode) || MAIN_ANGEL_NUMBERS[1];

  return {
    lifePathNumber,
    primaryAngelNumber,
    guidance: `Als Seele mit Lebensweg ${lifePathNumber} und Sonnenzeichen ${sunSign} ist deine Haupt-Synchronizitätsfrequenz die ${primaryAngelNumber.number}. Wann immer du diese Zahl oder ähnliche Meisterzahlen siehst, erinnert dich das Universum an deine göttliche Seelenmission.`
  };
}
