import { calculateHumanDesignChart } from '../lib/humandesign/engine';
import { HumanDesignAgent } from '../lib/humandesign/agent';

// CLI entry point for standalone Human Design Agent execution
function main() {
  const args = process.argv.slice(2);
  const birthDate = args[0] || '1991-05-05';
  const birthTime = args[1] || '13:00';
  const cityName = args[2] || 'Wien';
  const name = args[3] || 'Alexander';

  console.log(`\n======================================================`);
  console.log(` Ψ-NEXUS HUMAN DESIGN NEURODIDACTIC AGENT (CLI)`);
  console.log(`======================================================\n`);
  console.log(`Calculating Bodygraph for: ${name} (${birthDate} ${birthTime}, ${cityName})...\n`);

  const chart = calculateHumanDesignChart({
    name,
    birthDate,
    birthTime,
    cityName,
    latitude: 48.2082,
    longitude: 16.3738,
    timezone: 'Europe/Vienna'
  });

  const audit = HumanDesignAgent.runDiagnosticAudit(chart);

  console.log(`------------------------------------------------------`);
  console.log(`🌟 ENERGETISCHER KERN & ARCHETYP`);
  console.log(`------------------------------------------------------`);
  console.log(`• Energietyp:   ${chart.energyType.germanTitle}`);
  console.log(`• Aura:         ${chart.energyType.auraDescription}`);
  console.log(`• Strategie:    ${chart.energyType.strategy}`);
  console.log(`• Autorität:    ${chart.authority.germanName}`);
  console.log(`• Profil:       ${chart.profile.code} (${chart.profile.germanName})`);
  console.log(`• Definition:   ${chart.definition.label}`);
  console.log(`• Kreuz:        ${chart.incarnationCross.name} (${chart.incarnationCross.typeGerman})`);
  console.log(`• Design-Datum: ${chart.utcDesignDate.toISOString()} (~${chart.daysDifference.toFixed(1)} Tage vor Geburt)`);

  console.log(`\n------------------------------------------------------`);
  console.log(`📊 AURA- & FLOW-METRIKEN`);
  console.log(`------------------------------------------------------`);
  console.log(`• Energiefluss-Index:              ${audit.auraScore.energyFlow}/100`);
  console.log(`• Konditionierungs-Vulnerabilität: ${audit.auraScore.conditioningVulnerability}/100`);
  console.log(`• Entscheidungs-Klarheits-Faktor:  ${audit.auraScore.clarityFactor}/100`);

  console.log(`\n------------------------------------------------------`);
  console.log(`🛡️ OFFENE ZENTREN & KONDITIONIERUNGS-AUDIT (${chart.undefinedCenters.length} OFFEN)`);
  console.log(`------------------------------------------------------`);
  audit.openCentersAudit.forEach(c => {
    console.log(`\n[${c.name}]`);
    console.log(`  ⚠️ Schattenfalle: ${c.shadowTrap}`);
    console.log(`  💡 Weisheit:      ${c.wisdomPotential}`);
    console.log(`  💎 Schlüssel:     ${c.emergencyMantra}`);
  });

  console.log(`\n------------------------------------------------------`);
  console.log(`⚡ DEFINIERTE KANÄLE (${chart.definedChannels.length} AKTIV)`);
  console.log(`------------------------------------------------------`);
  chart.definedChannels.forEach(ch => {
    console.log(`• Kanal ${ch.id}: ${ch.germanName} (${ch.circuitLabel})`);
    console.log(`  Gabe: ${ch.quantumGifting}`);
  });

  console.log(`\n------------------------------------------------------`);
  console.log(`🧭 BIRKENBIHL TAGES-PROTOKOLL`);
  console.log(`------------------------------------------------------`);
  console.log(`🌅 Morgen:     ${audit.quickProtocols.morningActivation}`);
  console.log(`⚖️ Entschluss: ${audit.quickProtocols.decisionCheck}`);
  console.log(`🌙 Abend:      ${audit.quickProtocols.eveningDischarge}`);

  console.log(`\n======================================================`);
  console.log(` [Ψ-NEXUS] Human Design Analyse erfolgreich abgeschlossen.`);
  console.log(`======================================================\n`);
}

main();
