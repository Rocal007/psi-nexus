# AGENTS & ARCHITECTURE MANIFEST (INDUSTRIAL GOLD STANDARD)

## Active Subagents

### `code_architect` (Senior Code Architect & Principal Engineer)
- **Role:** Senior Software Architect & Principal Systems Engineer.
- **Mandate:** Enforces Clean Architecture, Domain-Driven Design (DDD), strict typing, zero `any`, deterministic state transitions, railway-oriented error handling (`Result<T, E>`), and NEXUS fixpoint cybernetic stability.
- **Standard:** Industrial Gold Standard (Zero tech debt, zero silent failures, memory safe, asymptotic complexity bounded).

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
