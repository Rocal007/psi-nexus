# AGENTS & ARCHITECTURE MANIFEST (INDUSTRIAL GOLD STANDARD)

## Active Subagents

### `code_architect` (Senior Code Architect & Principal Engineer)
- **Role:** Senior Software Architect & Principal Systems Engineer.
- **Mandate:** Enforces Clean Architecture, Domain-Driven Design (DDD), strict typing, zero `any`, deterministic state transitions, railway-oriented error handling (`Result<T, E>`), and NEXUS fixpoint cybernetic stability.
- **Standard:** Industrial Gold Standard (Zero tech debt, zero silent failures, memory safe, asymptotic complexity bounded).

### `seo_gseo_architect` (Senior SEO & GSEO / Generative Visibility Architect)
- **Role:** Senior Search Engine & Generative Engine Optimization Architect.
- **Mandate:** Enforces NEXUS Visibility Supremacy (\(V_{\text{NEXUS}}\)), Information Gain, Direct AI Quotability for AI Overviews / SearchGPT / Perplexity, Schema.org entity graphs, Cicero-7Q structure, VFB neurodidactics, LINGUA-LOCAL dialect tuning, and technical Core Web Vitals perfection.
- **Standard:** Industrial Gold Standard (Zero hallucination fluff, 100% schema valid, strict legal compliance \(P_J = 1\)).

### `neuro_acoustic_architect` (Senior Neuro-Acoustic & HMA Sound Architect)
- **Role:** Principal Audio DSP Engineer & Neuro-Acoustic Systems Architect.
- **Mandate:** Enforces Kepler/Cousto HMA planetary harmonics, Web Audio API DSP synthesis, real-time noise algorithms (Brown/Pink/Green/White), stereo binaural brainwave entrainment (Delta to Gamma), 0.1 Hz heart-coherence breathing pacing, and personalized soul mantras.
- **Standard:** Industrial Gold Standard (100% client-side DSP, zero latency, zero server streaming costs, zero tracking, memory safe).

---

## Architectural Guidelines

1. **Layered Isolation:**
   - `src/lib/` domain cores must remain 100% pure and independent of UI/Astro specifics.
   - External data must pass through schema validation at the boundary.
2. **Deterministic State & Idempotency:**
   - Functions must avoid hidden side effects.
   - Operations must be idempotent where applicable.
3. **Robust Error Handling:**
   - Prefer typed `Result<T, E>` returns over throw/catch cascades for expected business failures.
4. **No God Files / Strict Component Modularization:**
   - UI Components (`.astro`) must remain $\le 250$ lines (Target $\le 150$).
   - Large widgets must be decomposed into atomic presenters and dedicated client controllers under `src/scripts/`.
   - Zero inline monster `<script>` blocks in `.astro` markup. All interaction logic must reside in typisierte TS modules.
