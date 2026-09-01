/**
 * Live Engine Orchestrator (Industrial Gold Standard)
 * High-speed, modular event coordinator orchestrating specialized sub-renderers.
 */

import type { CompleteNatalChart } from '../lib/astrology/engine';
import {
  renderRadixSvg,
  renderCardinalAngles,
  renderElementsBalance,
  renderPlanetsTable,
  renderAspectMatrix,
  renderHumanDesign,
  renderHeroAndSummaryBadges,
  renderPersonSidebar,
  renderEsotericDossier,
  renderLifePillars,
  renderNumerologySection,
  renderAngelNumbers,
  renderMoonAndWisdom,
  renderPersonalGemstones,
  renderAstrocartography,
  updateBackgroundConstellations,
  updatePersonalitySummary,
  updateShadowHealthDialectic
} from './renderers';

export {
  renderRadixSvg,
  renderCardinalAngles,
  renderElementsBalance,
  renderPlanetsTable,
  renderAspectMatrix,
  renderHumanDesign,
  renderHeroAndSummaryBadges,
  renderPersonSidebar,
  renderEsotericDossier,
  renderLifePillars,
  renderNumerologySection,
  renderAngelNumbers,
  renderMoonAndWisdom,
  renderPersonalGemstones,
  renderAstrocartography,
  updateBackgroundConstellations,
  updatePersonalitySummary,
  updateShadowHealthDialectic
};

/**
 * Main DOM updater invoked on profile switch or live parameter recalculation.
 */
export function updateDomWithChart(chart: CompleteNatalChart): void {
  // 1. Hero, Status Pills & Profile Summary
  renderHeroAndSummaryBadges(chart);

  // 2. Person Soul Sidebar (Sticky left navigation)
  renderPersonSidebar(chart);

  // 3. Astronomical Radix Wheel SVG & Dynamic Angles
  renderRadixSvg(chart);
  renderCardinalAngles(chart);

  // 4. Cosmobiological Balances & Aspect Matrix
  renderElementsBalance(chart);
  renderPlanetsTable(chart);
  renderAspectMatrix(chart);

  // 5. Esoteric Dossier & Core Syntheses
  renderEsotericDossier(chart);
  renderLifePillars(chart);

  // 6. Pythagorean Numerology & Angel Numbers
  renderNumerologySection(chart);
  renderAngelNumbers(chart);

  // 7. Moon Calendar & Personal Gemstones
  renderMoonAndWisdom(chart);
  renderPersonalGemstones(chart);

  // 8. Astrocartography & Backgrounds
  renderAstrocartography(chart);
  updateBackgroundConstellations(chart);

  // 9. Dialectic Analyses
  updatePersonalitySummary(chart);
  updateShadowHealthDialectic(chart);

  // 10. Human Design Bodygraph & Agent
  renderHumanDesign(chart);
}
