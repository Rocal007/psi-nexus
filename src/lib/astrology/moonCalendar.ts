import * as Astronomy from 'astronomy-engine';
import { ZODIAC_SIGNS, type ZodiacSign } from './constants';
import { degreeToSignAndPos } from './ephemeris';

export interface MoonActivityRecommendation {
  status: 'optimal' | 'good' | 'neutral' | 'avoid';
  statusText: string;
  badgeColor: string;
  headline: string;
  detail: string;
  tip: string;
}

export interface MoonCalendarDayInfo {
  date: Date;
  dateString: string;
  cityName: string;
  moonPhaseName: string;
  moonPhaseIcon: string;
  moonPhasePercent: number; // 0..100
  moonPhaseType: 'new_moon' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full_moon' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  moonSign: ZodiacSign;
  moonDegreeString: string;
  element: 'Feuer' | 'Erde' | 'Luft' | 'Wasser';
  elementQuality: string; // e.g. "Frucht- & Wärmetag"
  bodyRegion: string; // e.g. "Kopf, Augen, Gehirn"
  
  // Activities
  hairAndBeauty: {
    hairCutForGrowth: MoonActivityRecommendation;
    hairCutForDensity: MoonActivityRecommendation;
    hairColoring: MoonActivityRecommendation;
    skinCareAndPeeling: MoonActivityRecommendation;
    nailCare: MoonActivityRecommendation;
  };
  householdAndCleaning: {
    windowCleaning: MoonActivityRecommendation;
    laundry: MoonActivityRecommendation;
    decluttering: MoonActivityRecommendation;
    moldAndAirCleaning: MoonActivityRecommendation;
  };
  plantsAndGarden: {
    watering: MoonActivityRecommendation;
    repottingAndPlanting: MoonActivityRecommendation;
    fertilizing: MoonActivityRecommendation;
    weeding: MoonActivityRecommendation;
  };
  nutritionAndHealth: {
    foodFocus: string;
    nutritionQuality: string;
    organToProtect: string;
    beneficialHealthTip: string;
    detoxEfficiency: MoonActivityRecommendation;
  };
}

export function calculateCurrentMoonCalendar(
  targetDate: Date = new Date(),
  cityName: string = 'Wien'
): MoonCalendarDayInfo {
  const time = Astronomy.MakeTime(targetDate);
  
  // 1. Moon phase angle (0..360)
  const phaseAngle = Astronomy.MoonPhase(time); // 0=New, 90=1st Qtr, 180=Full, 270=3rd Qtr
  const illumInfo = Astronomy.Illumination(Astronomy.Body.Moon, time);
  const percentIllum = Math.round(illumInfo.phase_fraction * 100);

  // 2. Moon Geocentric Position & Zodiac Sign
  const moonVec = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);
  const moonEcl = Astronomy.Ecliptic(moonVec);
  const moonLon = ((moonEcl.elon % 360) + 360) % 360;
  const { sign: moonSign, degreeString: moonDegreeString } = degreeToSignAndPos(moonLon);

  // 3. Classify Moon Phase Name & Icon
  let moonPhaseName = 'Zunehmender Mond';
  let moonPhaseIcon = '🌓';
  let moonPhaseType: MoonCalendarDayInfo['moonPhaseType'] = 'waxing_crescent';

  if (phaseAngle >= 350 || phaseAngle < 10) {
    moonPhaseName = 'Neumond (Beginn neuer Zyklen)';
    moonPhaseIcon = '🌑';
    moonPhaseType = 'new_moon';
  } else if (phaseAngle >= 10 && phaseAngle < 80) {
    moonPhaseName = 'Zunehmende Mondsichel (Aufbau & Nährung)';
    moonPhaseIcon = '🌒';
    moonPhaseType = 'waxing_crescent';
  } else if (phaseAngle >= 80 && phaseAngle < 100) {
    moonPhaseName = 'Erstes Viertel (Zunehmender Halbmond)';
    moonPhaseIcon = '🌓';
    moonPhaseType = 'first_quarter';
  } else if (phaseAngle >= 100 && phaseAngle < 170) {
    moonPhaseName = 'Zunehmender Dreiviertelmond (Reifung)';
    moonPhaseIcon = '🌔';
    moonPhaseType = 'waxing_gibbous';
  } else if (phaseAngle >= 170 && phaseAngle < 190) {
    moonPhaseName = 'Vollmond (Höhepunkt der Schöpferkraft)';
    moonPhaseIcon = '🌕';
    moonPhaseType = 'full_moon';
  } else if (phaseAngle >= 190 && phaseAngle < 260) {
    moonPhaseName = 'Abnehmender Dreiviertelmond (Loslassen & Ernte)';
    moonPhaseIcon = '🌖';
    moonPhaseType = 'waning_gibbous';
  } else if (phaseAngle >= 260 && phaseAngle < 280) {
    moonPhaseName = 'Letztes Viertel (Abnehmender Halbmond)';
    moonPhaseIcon = '🌗';
    moonPhaseType = 'last_quarter';
  } else {
    moonPhaseName = 'Abnehmende Mondsichel (Reinigung & Einkehr)';
    moonPhaseIcon = '🌘';
    moonPhaseType = 'waning_crescent';
  }

  const isWaxing = phaseAngle >= 0 && phaseAngle < 180;
  const isWaning = phaseAngle >= 180 && phaseAngle < 360;

  // 4. Element & Quality attributes by Moon Sign
  let element: MoonCalendarDayInfo['element'] = 'Feuer';
  let elementQuality = 'Wärme- & Fruchttag (Eiweiß)';
  let bodyRegion = 'Kopf & Augen';

  switch (moonSign.id) {
    case 'aries':
      element = 'Feuer';
      elementQuality = 'Wärme- & Fruchttag (Eiweiß)';
      bodyRegion = 'Kopf, Gehirn, Augen, Stirnhöhlen';
      break;
    case 'taurus':
      element = 'Erde';
      elementQuality = 'Kälte- & Wurzeltag (Mineralstoffe & Salz)';
      bodyRegion = 'Hals, Nacken, Schilddrüse, Stimmbänder';
      break;
    case 'gemini':
      element = 'Luft';
      elementQuality = 'Licht- & Blütentag (Fette & Öle)';
      bodyRegion = 'Schultern, Arme, Hände, Lunge, Nerven';
      break;
    case 'cancer':
      element = 'Wasser';
      elementQuality = 'Wasser- & Blatttag (Kohlenhydrate)';
      bodyRegion = 'Brust, Magen, Leber, Galle, Lymphe';
      break;
    case 'leo':
      element = 'Feuer';
      elementQuality = 'Wärme- & Fruchttag (Eiweiß)';
      bodyRegion = 'Herz, Kreislauf, Rücken, Wirbelsäule';
      break;
    case 'virgo':
      element = 'Erde';
      elementQuality = 'Kälte- & Wurzeltag (Mineralstoffe & Salz)';
      bodyRegion = 'Verdauungstrakt, Milz, Bauchspeicheldrüse, Dünndarm';
      break;
    case 'libra':
      element = 'Luft';
      elementQuality = 'Licht- & Blütentag (Fette & Öle)';
      bodyRegion = 'Nieren, Blase, Lendenbereich, Hüften';
      break;
    case 'scorpio':
      element = 'Wasser';
      elementQuality = 'Wasser- & Blatttag (Kohlenhydrate)';
      bodyRegion = 'Geschlechtsorgane, Harnleiter, Darmflora';
      break;
    case 'sagittarius':
      element = 'Feuer';
      elementQuality = 'Wärme- & Fruchttag (Eiweiß)';
      bodyRegion = 'Oberschenkel, Hüften, Ischiasnerv, Leber';
      break;
    case 'capricorn':
      element = 'Erde';
      elementQuality = 'Kälte- & Wurzeltag (Mineralstoffe & Salz)';
      bodyRegion = 'Knie, Gelenke, Knochen, Haut, Zähne';
      break;
    case 'aquarius':
      element = 'Luft';
      elementQuality = 'Licht- & Blütentag (Fette & Öle)';
      bodyRegion = 'Unterschenkel, Waden, Sprunggelenke, Venen';
      break;
    case 'pisces':
      element = 'Wasser';
      elementQuality = 'Wasser- & Blatttag (Kohlenhydrate)';
      bodyRegion = 'Füße, Zehen, Lymphsystem, Zirbeldrüse';
      break;
  }

  // 5. Build Hair & Beauty Rules
  const isLeoOrVirgo = moonSign.id === 'leo' || moonSign.id === 'virgo';
  const isCancerOrPisces = moonSign.id === 'cancer' || moonSign.id === 'pisces';
  const isAirSign = element === 'Luft';
  const isWaterSign = element === 'Wasser';
  const isEarthSign = element === 'Erde';
  const isFireSign = element === 'Feuer';

  // Hair Cut for Growth
  const hairCutForGrowth: MoonActivityRecommendation = isWaxing && isLeoOrVirgo
    ? {
        status: 'optimal',
        statusText: 'Hervorragend 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Schnelles & volles Nachwachsen',
        detail: `Mond in ${moonSign.name} bei zunehmendem Mond aktiviert die Haarwurzeln optimal.`,
        tip: 'Perfekter Tag für Spitzen schneiden und Volumenhaarschnitte.'
      }
    : isCancerOrPisces
    ? {
        status: 'avoid',
        statusText: 'Eher meiden 🔴',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        headline: 'Neigung zu wirrem Haar & Schuppen',
        detail: `An Wassertagen (${moonSign.name}) neigt geschnittenes Haar zu Fransen und verliert Spannkraft.`,
        tip: 'Verschiebe den Friseurtermin lieber auf Löwe-, Jungfrau- oder Erdtage.'
      }
    : {
        status: 'good',
        statusText: 'Günstig 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Guter Schnitt-Tag',
        detail: isWaxing ? 'Gutes Nachwachsen durch zunehmenden Mond.' : 'Form bleibt länger erhalten.',
        tip: 'Gleichmäßig schneiden lassen.'
      };

  // Hair Cut for Density (Fullness & slow shape retention)
  const hairCutForDensity: MoonActivityRecommendation = isWaning && isLeoOrVirgo
    ? {
        status: 'optimal',
        statusText: 'Optimal für dichte Fülle 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Kräftigung der Haarwurzeln',
        detail: 'Abnehmender Mond in Löwe/Jungfrau stärkt die Haarstruktur; Kurzhaarschnitte halten extrem lange.',
        tip: 'Ideal für Männerhaarschnitte und präzise Bobs.'
      }
    : {
        status: 'good',
        statusText: 'Gut 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Normale Stabilität',
        detail: `Solide Voraussetzungen im Zeichen ${moonSign.name}.`,
        tip: 'Haare mit pflegendem Naturöl stärken.'
      };

  // Hair Coloring
  const hairColoring: MoonActivityRecommendation = isWaxing && !isCancerOrPisces
    ? {
        status: 'optimal',
        statusText: 'Perfekt für Farbaufnahme 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Leuchtende & langlebige Farbbrillanz',
        detail: 'Der zunehmende Mond öffnet die Schuppenschicht der Haare für intensive Farbpigmente.',
        tip: 'Farbe wäscht sich deutlich langsamer aus.'
      }
    : isCancerOrPisces
    ? {
        status: 'avoid',
        statusText: 'Nicht ideal 🔴',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        headline: 'Farbe kann ungleichmäßig greifen',
        detail: 'Feuchtigkeitstage führen oft zu fleckigen Farbergebnissen.',
        tip: 'Nur milde Tönungen oder Pflegekuren verwenden.'
      }
    : {
        status: 'neutral',
        statusText: 'Möglich 🟡',
        badgeColor: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30',
        headline: 'Normale Haltbarkeit',
        detail: 'Farbe hält durchschnittlich gut.',
        tip: 'Pflegepackung nach dem Färben nicht vergessen.'
      };

  // Skin Care & Peeling
  const skinCareAndPeeling: MoonActivityRecommendation = isWaning
    ? {
        status: 'optimal',
        statusText: 'Beste Reinigungs- & Peelingzeit 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Porentiefe Entgiftung & Klärung',
        detail: 'Der abnehmende Mond leitet Schlackenstoffe aus und heilt Hautunreinheiten narbenfrei ab.',
        tip: 'Ideal für Peelings, Tiefenreinigung und Narbenpflege.'
      }
    : {
        status: 'optimal',
        statusText: 'Beste Nährungszeit 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Maximale Wirkstoff-Aufnahme',
        detail: 'Der zunehmende Mond saugt Seren, Hyaluron und Nährstoffmasken tief in die Zellen.',
        tip: 'Verwöhne deine Haut heute mit reichhaltigen Ölen und Vitaminmasken.'
      };

  // Nail Care (Capricorn is king for nails)
  const nailCare: MoonActivityRecommendation = moonSign.id === 'capricorn'
    ? {
        status: 'optimal',
        statusText: 'Bester Tag für harte Nägel 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Nägel werden splitterfrei und hart',
        detail: 'Steinbock-Mond ist der uralte Geheimtipp für feste Finger- und Fußnägel.',
        tip: 'Nägel freitags nach Sonnenuntergang im Steinbock feilen!'
      }
    : isCancerOrPisces
    ? {
        status: 'avoid',
        statusText: 'Eher meiden 🔴',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        headline: 'Nägel können weich werden und einreißen',
        detail: 'Wassertage schwächen die Hornsubstanz vorübergehend.',
        tip: 'Heute nur Nagelöl sanft einmassieren.'
      }
    : {
        status: 'good',
        statusText: 'Günstig 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Guter Tag für Maniküre',
        detail: 'Normale Schnitt- und Pflegebedingungen.',
        tip: 'Feilen statt knipsen.'
      };

  // 6. Household & Cleaning Rules
  // Window Cleaning (Air days: Gemini, Libra, Aquarius are supreme)
  const windowCleaning: MoonActivityRecommendation = isAirSign && isWaning
    ? {
        status: 'optimal',
        statusText: 'Absolute Meisterzeit 🟢',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        headline: 'Streifenfreier Glanz mit halber Mühe',
        detail: `Lufttage (${moonSign.name}) bei abnehmendem Mond lassen Glas blitzschnell und ohne Schlieren trocknen.`,
        tip: 'Wasser und einfacher Mikrofasertuch genügen völlig.'
      }
    : isWaterSign
    ? {
        status: 'avoid',
        statusText: 'Schlieren-Gefahr 🔴',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        headline: 'Feuchtigkeit trocknet langsam und schliert',
        detail: `Mond in ${moonSign.name} (Wasser) bindet Feuchtigkeit, Fenster beschlagen schneller.`,
        tip: 'Verschiebe den Fensterputz auf die nächsten Lufttage.'
      }
    : {
        status: 'good',
        statusText: 'Guter Putztag 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Solide Ergebnisse',
        detail: 'Fenster trocknen ordentlich ab.',
        tip: 'Gutes Abziehgummi verwenden.'
      };

  // Laundry (Water days: Cancer, Scorpio, Pisces have superior stain dissolving)
  const laundry: MoonActivityRecommendation = isWaterSign && isWaning
    ? {
        status: 'optimal',
        statusText: 'Höchste Waschkraft 🟢',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        headline: 'Hartnäckige Flecken lösen sich mühelos',
        detail: `Wassertage (${moonSign.name}) lösen Schmutzpartikel tief aus Fasern bei minimalem Waschmittelbedarf.`,
        tip: 'Du kannst die Waschmitteldosierung heute um 30% reduzieren.'
      }
    : {
        status: 'good',
        statusText: 'Normale Wäsche 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Guter Waschtag',
        detail: isWaning ? 'Abnehmender Mond unterstützt die Fleckentfernung.' : 'Buntwäsche normal waschen.',
        tip: 'Wäsche gut lüften.'
      };

  // Decluttering & Deep Cleaning (Waning Moon approaching New Moon)
  const decluttering: MoonActivityRecommendation = isWaning
    ? {
        status: 'optimal',
        statusText: 'Beste Entrümpelungszeit 🟢',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        headline: 'Leichtes Loslassen & Raum-Befreiung',
        detail: 'Der abnehmende Mond unterstützt das seelische und physische Trennen von altem Ballast.',
        tip: 'Keller, Schränke oder digitale Ordner ausmisten: Es fällt heute besonders leicht!'
      }
    : {
        status: 'neutral',
        statusText: 'Mäßig günstig 🟡',
        badgeColor: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30',
        headline: 'Sammel- & Kaufdrang überwiegt',
        detail: 'Bei zunehmendem Mond neigt man eher dazu, Dinge aufzubewahren statt wegzugeben.',
        tip: 'Lieber sortieren und strukturieren als radikal wegwerfen.'
      };

  // Mold & Airing (Fire & Air days)
  const moldAndAirCleaning: MoonActivityRecommendation = isFireSign || isAirSign
    ? {
        status: 'optimal',
        statusText: 'Optimales Lüftungsklima 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Effektive Feuchtigkeitsaustreibung',
        detail: `Mond in ${moonSign.name} (${element}) trocknet Wände und befreit Wohnräume von Schimmelsporen.`,
        tip: 'Stoßlüften und Matratzen/Kissen in die frische Luft stellen.'
      }
    : {
        status: 'neutral',
        statusText: 'Normal lüften 🟡',
        badgeColor: 'text-slate-400 bg-white/5 border-white/10',
        headline: 'Kurzes Stoßlüften empfohlen',
        detail: 'Wassertage bringen mehr Eigenfeuchte in die Räume.',
        tip: 'Fenster nicht stundenlang gekippt lassen.'
      };

  // 7. Plants & Garden Rules
  // Watering
  const watering: MoonActivityRecommendation = isWaterSign
    ? {
        status: 'optimal',
        statusText: 'Bester Gießtag 🟢',
        badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        headline: 'Pflanzen nehmen Wasser optimal auf',
        detail: `An Wassertagen (${moonSign.name}) gelangt Feuchtigkeit direkt in die Zellen; kein Wurzelfaulen.`,
        tip: 'Zimmer- und Balkonpflanzen heute durchdringend gießen.'
      }
    : isAirSign
    ? {
        status: 'avoid',
        statusText: 'Gießen meiden 🔴',
        badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        headline: 'Gefahr von Blattläusen & Schädlingen',
        detail: `An Lufttagen (${moonSign.name}) führt Gießen vermehrt zu Ungezieferbefall.`,
        tip: 'Nur im äußersten Notfall wenig gießen.'
      }
    : {
        status: 'good',
        statusText: 'Mäßig gießen 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Normaler Gießbedarf',
        detail: 'Pflanzen wie gewohnt pflegen.',
        tip: 'Staunässe vermeiden.'
      };

  // Repotting / Planting
  const repottingAndPlanting: MoonActivityRecommendation = isEarthSign && isWaxing
    ? {
        status: 'optimal',
        statusText: 'Beste Einwurzelung 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Schnelles Anwachsen & starke Wurzeln',
        detail: `Mond in ${moonSign.name} (Erdtag) bei zunehmendem Mond lässt Wurzeln kräftig greifen.`,
        tip: 'Ideal für Umtopfen, Säen und Neuanpflanzungen.'
      }
    : {
        status: 'good',
        statusText: 'Möglich 🟢',
        badgeColor: 'text-slate-300 bg-white/5 border-white/10',
        headline: 'Gute Bedingungen',
        detail: isWaxing ? 'Gutes oberirdisches Wachstum.' : 'Wurzeln etablieren sich.',
        tip: 'Frische Erde verwenden.'
      };

  // Fertilizing
  const fertilizing: MoonActivityRecommendation = isWaxing || moonPhaseType === 'full_moon'
    ? {
        status: 'optimal',
        statusText: 'Maximale Nährstoffaufnahme 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Dünger wird sofort verwertet',
        detail: 'Der zunehmende Mond saugt Nährstoffe aus der Erde direkt in die Pflanzenfasern.',
        tip: 'Organischen Dünger in halber Dosis beigeben.'
      }
    : {
        status: 'neutral',
        statusText: 'Wenig düngen 🟡',
        badgeColor: 'text-slate-400 bg-white/5 border-white/10',
        headline: 'Dünger wird langsamer aufgenommen',
        detail: 'Pflanzen befinden sich in der Ruhe-/Ausatemphase.',
        tip: 'Auf Vollmond warten.'
      };

  // Weeding
  const weeding: MoonActivityRecommendation = isWaning && (isEarthSign || isFireSign)
    ? {
        status: 'optimal',
        statusText: 'Unkraut wächst nicht nach 🟢',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        headline: 'Nachhaltige Unkrautbeseitigung',
        detail: 'Im abnehmenden Mond gezupftes Unkraut verkümmert und wächst deutlich langsamer nach.',
        tip: 'Wurzeln mit herausziehen.'
      }
    : {
        status: 'neutral',
        statusText: 'Möglich 🟡',
        badgeColor: 'text-slate-400 bg-white/5 border-white/10',
        headline: 'Normaler Jät-Tag',
        detail: 'Unkraut kann bei zunehmendem Mond schneller wieder austreiben.',
        tip: 'Regelmäßig jäten.'
      };

  // 8. Nutrition & Health
  let foodFocus = 'Eiweißreiche Nahrung & Früchte';
  let nutritionQuality = 'Proteine & gesunde Fruchtzucker werden heute optimal verstoffwechselt.';
  let organToProtect = bodyRegion;
  let beneficialHealthTip = 'Trinke ausreichend klares Wasser und schone die Organe des aktuellen Mondzeichens.';

  switch (element) {
    case 'Feuer':
      foodFocus = 'Frucht- & Eiweißtag (Früchte, Nüsse, Hülsenfrüchte, hochwertige Proteine)';
      nutritionQuality = 'Der Körper verwertet Proteine und Fruchtsäuren besonders effizient.';
      beneficialHealthTip = `Schone die Körperregion (${bodyRegion}). Keine operativen Eingriffe an dieser Zone, wenn vermeidbar!`;
      break;
    case 'Erde':
      foodFocus = 'Wurzeltag & Mineralstoffe (Wurzelgemüse, Rote Bete, Karotten, Mineralien)';
      nutritionQuality = 'Salze und Spurenelemente werden intensiv eingelagert. Achte auf maßvollen Salzkonsum!';
      beneficialHealthTip = `Achte auf deine Gelenke und Knochen (${bodyRegion}). Wärmende Massagen wirken Wunder.`;
      break;
    case 'Luft':
      foodFocus = 'Blütentag & gesunde Fette (Blumenkohl, Artischocken, Nüsse, Avocado, Omega-3)';
      nutritionQuality = 'Der Körper verarbeitet Fette und Öle optimal für das Nervensystem und Gehirn.';
      beneficialHealthTip = `Tiefes Durchatmen an der frischen Luft stärkt die Atemwege und Lungen (${bodyRegion}).`;
      break;
    case 'Wasser':
      foodFocus = 'Blatttag & Kohlenhydrate (Blattsalate, Spinat, Kräuter, gedünstetes Gemüse)';
      nutritionQuality = 'Kohlenhydrate und Wasser schlagen schneller an. Neigung zu Wassereinlagerungen!';
      beneficialHealthTip = `Achte auf deine Lymphe und Verdauung (${bodyRegion}). Trinke viel Brennnessel- oder Kräutertee.`;
      break;
  }

  const detoxEfficiency: MoonActivityRecommendation = isWaning
    ? {
        status: 'optimal',
        statusText: 'Höchste Entgiftungskraft 🟢',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Fasten & Entschlacken fällt extrem leicht',
        detail: 'Der abnehmende Mond unterstützt die Nieren, Leber und Lymphe beim Ausscheiden von Giftstoffen.',
        tip: 'Ideal für Safttage, Basenbäder, Intervallfasten und Saunagänge.'
      }
    : {
        status: 'neutral',
        statusText: 'Nährende Phase 🟡',
        badgeColor: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30',
        headline: 'Körper speichert Nährstoffe & Kalorien',
        detail: 'Beim zunehmenden Mond nimmt der Körper alles doppelt so gut auf – auch Kalorien und Genussmittel!',
        tip: 'Achte auf hochwertige Bio-Nahrung und vermeide schwere Spätmahlzeiten.'
      };

  const formattedDate = targetDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return {
    date: targetDate,
    dateString: formattedDate,
    cityName,
    moonPhaseName,
    moonPhaseIcon,
    moonPhasePercent: percentIllum,
    moonPhaseType,
    moonSign,
    moonDegreeString,
    element,
    elementQuality,
    bodyRegion,
    hairAndBeauty: {
      hairCutForGrowth,
      hairCutForDensity,
      hairColoring,
      skinCareAndPeeling,
      nailCare
    },
    householdAndCleaning: {
      windowCleaning,
      laundry,
      decluttering,
      moldAndAirCleaning
    },
    plantsAndGarden: {
      watering,
      repottingAndPlanting,
      fertilizing,
      weeding
    },
    nutritionAndHealth: {
      foodFocus,
      nutritionQuality,
      organToProtect,
      beneficialHealthTip,
      detoxEfficiency
    }
  };
}
