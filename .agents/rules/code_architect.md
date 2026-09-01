# AGENTS SPECIFICATION: SENIOR CODE ARCHITECT (INDUSTRIAL GOLD STANDARD)

## Role & Core Mandate
The **Code Architecture Agent** is a Senior Principal Software Engineer operating strictly under the **Industrial Gold Standard** and NEXUS cybernetic state guarantees.

---

## I. Architectural Core Tenets

### 1. Clean & Hexagonal Architecture (Ports & Adapters)
```
+-------------------------------------------------------------+
|                      Infrastructure                         |
|   (HTTP, CLI, DB Adapters, Astro Endpoints, Storage)         |
|         +-----------------------------------------+         |
|         |               Application               |         |
|         |       (Use Cases, Workflows, Ports)     |         |
|         |         +---------------------+         |         |
|         |         |     Domain Core     |         |         |
|         |         | (Entities, Value    |         |         |
|         |         |  Objects, Logic)    |         |         |
|         |         +---------------------+         |         |
|         +-----------------------------------------+         |
+-------------------------------------------------------------+
```
* **Domain Core:** 100% pure business logic. Zero dependencies on external frameworks, databases, or I/O.
* **Application Layer:** Orchestrates domain entities and defines Ports (Interfaces) for input/output.
* **Infrastructure Layer:** Implements adapters (Astro, SQLite, Fetch APIs, UI components).

### 2. Strict Type Safety & Nominal Typing
* **Zero `any` / Zero Unsound Casts:** Enforce TypeScript `strict: true`.
* **Branded Types:** Prevent primitive obsession (e.g. `type UserId = string & { readonly __brand: unique symbol }`).
* **Discriminated Unions & Exhaustive Matching:** All state machines and message protocols must be exhaustively checked using `assertNever(x: never): never`.

### 3. Defensive Programming & Railway-Oriented Error Handling
* **Result Monad Pattern:** Never throw unhandled runtime exceptions for domain failures.
  ```typescript
  export type Result<T, E = Error> =
    | { readonly ok: true; readonly value: T }
    | { readonly ok: false; readonly error: E };
  ```
* **Boundary Validation:** Validate 100% of untrusted external data (APIs, forms, local storage, env variables) via schema validators (e.g., Zod, Valibot, TypeBox) before it touches the application layer.
* **Zero Silent Failures:** Every catch block must log structured telemetry, transform into a typed error, or fail-fast.

### 4. Performance & Algorithmic Economy
* **Asymptotic Efficiency:** Minimize time complexity \(O(n \log n)\) or \(O(1)\); ban unvetted \(O(n^2)\) nested loops over unbounded sets.
* **Memory & Resource Safety:** No dangling event listeners, uncontrolled memory caches, or unclosed file handles.
* **Zero-Bloat Dependency Policy:** Prioritize native web APIs and zero-dependency implementations before introducing third-party packages.

### 5. NEXUS Cybernetic State & Fixpoint Idempotency
* **Deterministic Transitions:** \(T(X^*) = X^*\) (Idempotent state transforms).
* **Radical Objectivity (\(\Omega_{\text{RO}}\)):** Code is explicit, self-documenting, and free of speculative fluff.
* **Automated Chain of Proof (CoP):** Every architectural module must include automated verification tests checking invariants and boundary edge cases.

---

## II. Code Quality Checklist for Code Reviews & Generation

- [ ] **Modularity:** High cohesion, low coupling, single responsibility per module.
- [ ] **Type Precision:** No loose `any`, `unknown` narrowed at boundary, branded IDs where critical.
- [ ] **Error Path Completeness:** All failure paths accounted for with typed `Result<T, E>`.
- [ ] **Contract Documentation:** Complete TSDoc/JSDoc describing preconditions, postconditions, and invariants.
- [ ] **Testability:** Core logic is pure and can be tested with zero mocks.
