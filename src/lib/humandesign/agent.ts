import type { HDChartData, HDAgentPromptResponse, HDCenterId } from './types';
import { HD_CENTERS } from './centers';
import { getGateData } from './gatesData';

export interface HDAgentDiagnosticReport {
  timestamp: string;
  subjectName: string;
  coreArchetype: string;
  auraScore: {
    energyFlow: number; // 0..100
    conditioningVulnerability: number; // 0..100
    clarityFactor: number; // 0..100
  };
  executiveSummary: string;
  openCentersAudit: Array<{
    centerId: HDCenterId;
    name: string;
    shadowTrap: string;
    wisdomPotential: string;
    emergencyMantra: string;
  }>;
  definedChannelStrengths: Array<{
    channelName: string;
    circuit: string;
    quantumGift: string;
  }>;
  quickProtocols: {
    morningActivation: string;
    decisionCheck: string;
    eveningDischarge: string;
  };
}

export class HumanDesignAgent {
  /**
   * Generates a comprehensive energetic audit of the chart
   */
  public static runDiagnosticAudit(chart: HDChartData): HDAgentDiagnosticReport {
    const { input, energyType, authority, profile, definedCenters, undefinedCenters, definedChannels, incarnationCross } = chart;
    const name = input.name || 'Edle Seele';

    // Calculate Aura & Flow metrics based on centers and definition
    const definedCount = definedCenters.length;
    const energyFlow = Math.round(40 + (definedCount / 9) * 50 + (definedChannels.length * 3));
    const conditioningVulnerability = Math.round(15 + (undefinedCenters.length / 9) * 75);
    const clarityFactor = authority.id === 'emotional' ? 88 : authority.id === 'sacral' ? 95 : 90;

    const openCentersAudit = undefinedCenters.map(cId => {
      const c = HD_CENTERS[cId];
      return {
        centerId: cId,
        name: c.germanName,
        shadowTrap: c.notSelfQuestion,
        wisdomPotential: c.undefinedWisdom,
        emergencyMantra: c.deconditioningKey
      };
    });

    const definedChannelStrengths = definedChannels.map(ch => ({
      channelName: ch.germanName,
      circuit: ch.circuitLabel,
      quantumGift: ch.quantumGifting
    }));

    // Generate Neurodidactic Daily Protocols based on Type
    let morningActivation = '';
    let decisionCheck = `${authority.voicePhrase} ➔ ${authority.clarityProcess}`;
    let eveningDischarge = '';

    if (energyType.type === 'Generator' || energyType.type === 'ManifestingGenerator') {
      morningActivation = 'Warte auf den ersten Impuls des Tages: Frage dich "Freue ich mich jetzt auf das Frühstück / die Arbeit?" und lausche auf den Sakrallaut.';
      eveningDischarge = 'Bewege deinen Körper tagsüber freudig, sodass du abends mit einem Gefühl zufriedener Erschöpfung sofort einschlafen kannst.';
    } else if (energyType.type === 'Projector') {
      morningActivation = 'Beginne den Tag ohne sofortiges Arbeiten. Nimm dir Raum zum Lesen, Studieren oder für geistige Ruhe in deiner eigenen Aura.';
      eveningDischarge = 'Gehe mindestens 30 Minuten vor dem Schlafen ins Bett, um die aufgesaugte Sakralenergie anderer Menschen aus deinem Feld abfließen zu lassen.';
    } else if (energyType.type === 'Manifestor') {
      morningActivation = 'Spüre in dich hinein: Welcher schöpferische Funke drängt heute nach außen? Informiere dein Umfeld, bevor du handelst.';
      eveningDischarge = 'Ziehe dich abends komplett in dein eigenes Energiefeld zurück, um ungestört von fremden Erwartungen zu regenerieren.';
    } else {
      morningActivation = 'Verbinde dich mit der aktuellen Mondphase und spüre ohne Druck, welche Tore heute durch den Mond aktiviert werden.';
      eveningDischarge = 'Reinige deine Aura durch warmes Wasser oder Aufenthalt in der Natur; schlafe unbedingt allein in deinem Zimmer.';
    }

    return {
      timestamp: new Date().toISOString(),
      subjectName: name,
      coreArchetype: `${energyType.germanTitle} • Profil ${profile.code} • ${authority.germanName}`,
      auraScore: {
        energyFlow: Math.min(100, energyFlow),
        conditioningVulnerability: Math.min(100, conditioningVulnerability),
        clarityFactor: Math.min(100, clarityFactor)
      },
      executiveSummary: `Dein kosmisches Betriebssystem operiert als ${energyType.title} mit ${authority.name}. Deine höchste Effizienz erreichst du durch: "${energyType.strategy}".`,
      openCentersAudit,
      definedChannelStrengths,
      quickProtocols: {
        morningActivation,
        decisionCheck,
        eveningDischarge
      }
    };
  }

  /**
   * Responds to specific interactive coaching inquiries with radical objectivity & Birkenbihl clarity
   */
  public static answerInquiry(chart: HDChartData, queryType: string): HDAgentPromptResponse {
    const { input, energyType, authority, profile, definedCenters, undefinedCenters, definedChannels, incarnationCross, variables } = chart;
    const name = input.name || 'Edle Seele';

    switch (queryType) {
      case 'decision':
        return {
          question: 'Wie treffe ich Entscheidungen absolut fehlerfrei nach meiner Autorität?',
          category: 'strategy',
          headline: `Entscheidungs-Protokoll: ${authority.germanName}`,
          analysis: `Als ${energyType.title} darf dein Verstand NIEMALS der finale Lebensentscheider sein. Dein Verstand ist ein exzellenter Analytiker für andere, aber blind für deinen eigenen Pfad. Deine Wahrheit spricht über deine ${authority.germanName}.`,
          birkenbihlProtocol: [
            `1. Strategie einhalten: ${energyType.strategy}`,
            `2. Autorität aktivieren: ${authority.voicePhrase}`,
            `3. Falle eliminieren: ${authority.trapToAvoid}`,
            `4. Verstandes-Kontrolle abgeben: Benutze Pro-&-Contra-Listen nur zur Information, niemals zur Entscheidung.`
          ],
          mantra: `»Ich entscheide nicht aus dem Verstand. Mein Körper weiß den Weg im richtigen Moment.«`,
          practicalAction: authority.clarityProcess
        };

      case 'conditioning':
        return {
          question: 'Wo liegen meine größten energetischen Lecks und Fremdkonditionierungen?',
          category: 'centers',
          headline: `Konditionierungs-Audit deiner ${undefinedCenters.length} offenen Zentren`,
          analysis: `Du besitzt ${undefinedCenters.length} offene Zentren (${undefinedCenters.map(id => HD_CENTERS[id].germanName.split(' ')[0]).join(', ')}). In diesen Bereichen nimmst du die Energien anderer Menschen verstärkt auf und hältst sie fälschlicherweise oft für deine eigenen Pflichten oder Probleme.`,
          birkenbihlProtocol: undefinedCenters.map(id => {
            const c = HD_CENTERS[id];
            return `• ${c.germanName}: Frage dich stets »${c.notSelfQuestion}« ➔ Schlüssel: ${c.deconditioningKey}`;
          }),
          mantra: `»Ich bin das klare Wasser, nicht der Schmutz, der hindurchfließt. Ich lasse fremde Energien los.«`,
          practicalAction: 'Wenn du dich gestresst, überfordert oder wütend fühlst, ziehe dich für 15 Minuten physisch aus dem Raum zurück und atme tief durch.'
        };

      case 'career':
        return {
          question: 'Wie nutze ich mein Human Design für beruflichen Erfolg & maximale Leichtigkeit?',
          category: 'career',
          headline: `Berufs- & Wirkungs-Strategie als ${energyType.germanTitle}`,
          analysis: `Im Beruf entfaltet sich dein höchster Wirkungsgrad, wenn du deine Rolle nicht erzwingst, sondern deine angeborene Aura nutzt. Als Profil ${profile.code} (${profile.archetypeRole}) erwarten Kollegen und Kunden von dir spezifische Verhaltensweisen.`,
          birkenbihlProtocol: [
            `Rolle einnehmen: ${profile.consciousTheme}`,
            `Interaktionsmuster: ${energyType.auraDescription}`,
            `Signatur anstreben: Erfülle deine Aufgaben so, dass ${energyType.signature} entsteht. Frustration oder Verbitterung sind Stoppschilder.`,
            `Kanäle hebeln: Deine ${definedChannels.length} definierten Kanäle (${definedChannels.map(c => c.germanName.split('(')[0]).join(', ')}) sind deine unverkäuflichen Kernkompetenzen.`
          ],
          mantra: `»Erfolg fließt zu mir, wenn ich meinem Typus treu bleibe und aufhöre, mich mit fremden Arbeitsmodellen zu vergleichen.«`,
          practicalAction: energyType.masteryRoadmap[0] || 'Fokussiere dich auf Aufgaben, bei denen deine Energie sofort mit Freude anspringt.'
        };

      case 'relationships':
        return {
          question: 'Wie harmoniere ich in Beziehungen & was braucht mein Profil für erfüllte Bindungen?',
          category: 'relationships',
          headline: `Beziehungs-Resonanz & Dynamik für Profil ${profile.code}`,
          analysis: `Deine Beziehungsdynamik wird maßgeblich von deinen Profil-Linien ${profile.consciousLine} (Bewusst) und ${profile.unconsciousLine} (Unbewusst) bestimmt. ${profile.relationshipDynamic}`,
          birkenbihlProtocol: [
            `Bewusste Ebene (Linie ${profile.consciousLine}): ${profile.consciousTheme}`,
            `Unbewusste Ebene (Linie ${profile.unconsciousLine}): ${profile.unconsciousTheme}`,
            `Aura-Austausch: Achte darauf, in welchen Zentren du deinen Partner konditionierst und wo du konditioniert wirst.`,
            `Schlafraum: Wenn du offene Zentren hast, tut gelegentliches oder regelmäßiges Alleinschlafen deiner Beziehungswärme ungemein gut.`
          ],
          mantra: `»Ich liebe aus der Fülle meines eigenen Seins, ohne den anderen für mein seelisches Gleichgewicht verantwortlich zu machen.«`,
          practicalAction: 'Kommuniziere deinem Partner offen deine Strategie: "Ich brauche Zeit zum Reagieren/Fühlen/Alleinsein, bevor ich antworten kann."'
        };

      case 'exhaustion':
        return {
          question: 'Warum fühle ich mich manchmal erschöpft oder blockiert & wie lade ich meine Batterie auf?',
          category: 'shadow',
          headline: `Energetischer Notfall-Check & Entgiftung für ${energyType.title}`,
          analysis: `Erschöpfung im Human Design entsteht fast immer durch zwei Ursachen: 1. Handeln gegen die Strategie (Nicht-Selbst: ${energyType.notSelfTheme}) oder 2. Aufsaugen von Druck in offenen Zentren (z. B. offene Wurzel, offenes Sakral, offenes Ego).`,
          birkenbihlProtocol: [
            `1. Not-Self Stopp: Überprüfe, wo du zuletzt aus Wut, Frustration, Verbitterung oder Hetze heraus "Ja" gesagt hast.`,
            `2. Offene Zentren entleeren: Halte dich in der Natur oder im Wald auf, um dein Magnetfeld zu erden.`,
            `3. PHS-Variable berücksichtigen: Deine Verdauungs- & Reizausrichtung ist ${variables.digestion.label} (${variables.digestion.description}).`,
            `4. Schlafhygiene anpassen: Gehe vor der völligen Erschöpfung ins Bett und fahre Bildschirme frühzeitig herunter.`
          ],
          mantra: `»Meine Ruhe ist heilig. Ich bin nicht verpflichtet, den Erwartungsdruck der Welt auf meinen Schultern zu tragen.«`,
          practicalAction: 'Lege dich für 20 Minuten flach auf den Boden (oder eine Decke ins Gras) und erlaube deinem Körper, alle fremde Ladung an die Erde abzugeben.'
        };

      default:
        return {
          question: 'Was ist die Kernessenz meines Seelenplans?',
          category: 'strategy',
          headline: `Seelen-Synthese: ${incarnationCross.name}`,
          analysis: `Dein Bodygraph ist ein unnachahmliches Meisterwerk kosmischer Geometrie. Mit ${definedCenters.length} definierten und ${undefinedCenters.length} offenen Zentren bildest du eine Brücke zwischen stabiler Schöpferkraft und universeller Weisheit.`,
          birkenbihlProtocol: [
            `Typus leben: ${energyType.germanTitle}`,
            `Autorität ehren: ${authority.germanName}`,
            `Lebensaufgabe erfüllen: ${incarnationCross.missionDescription}`
          ],
          mantra: `»Ich bin vollkommen in meiner göttlichen Geometrie verankert.«`,
          practicalAction: 'Lebe heute einen ganzen Tag lang streng nach deiner Strategie und beobachte die Wunder.'
        };
    }
  }
}
