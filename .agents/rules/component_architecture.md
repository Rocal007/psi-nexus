# COMPONENT ARCHITECTURE RULE: NO GOD FILES / NO GOD COMPONENTS (INDUSTRIAL GOLD STANDARD)

## I. FUNDAMENTALES GESETZ: VERBOT VON GOD-FILES

Im gesamten Projekt gilt ein **striktes Verbot von God-Files und monolithischen Riesen-Komponenten**. Jede Datei, die mehrere Verantwortlichkeiten (UI-Markup, Client-Scripts, Event-Handling, Modal-Logik, Daten-Transformationen) vermischt oder definierte Zeilen-Budgets überschreitet, verletzt die Clean Architecture und muss dekomponiert werden.

---

## II. ZEILEN-BUDGETS & METRIKEN (HARD BOUNDS)

| Komponenten-Typ | Ziel-Budget | Hard Limit (Max) | Bei Überschreitung zwingend: |
| :--- | :---: | :---: | :--- |
| **Astro UI-Komponente (`.astro`)** | **$\le 150$ Zeilen** | **250 Zeilen** | Aufteilung in Sub-Komponenten & Auslagerung von Scripts |
| **Page Orchestrator (`pages/*.astro`)** | **$\le 100$ Zeilen** | **200 Zeilen** | Delegation an Controller & Zusammensetzen aus Atomen |
| **Domain Engine / Utility (`.ts`)** | **$\le 200$ Zeilen** | **300 Zeilen** | Modulare Aufteilung (Core / Types / Matrix) |
| **Client-Scripts (`src/scripts/*`)** | **$\le 150$ Zeilen** | **250 Zeilen** | Aufteilung in fokussierte Sub-Renderer / Controller |
| *Reine statische Daten-Tabellen* | — | *Ausnahme* | Reine Konstant-Tabellen (z.B. 64 Tore, Ephemeriden) |

---

## III. ARCHITEKTUR-MUSTER FÜR SAUBERE KOMPONENTEN

### 1. Striktes Trennungs-Muster (Presenter ↔ Controller ↔ Data)
```
[ ParentOrchestrator.astro ] (< 100 Zeilen)
      ├── [ HeaderBar.astro ] (< 60 Zeilen)
      ├── [ FormFields.astro ] (< 80 Zeilen)
      ├── [ ActionsMenu.astro ] (< 50 Zeilen)
      └── Importiert: [ formController.ts ] (Reine Interaktions-Logik)
```

### 2. Verbot von Inline-Monster-`<script>`s in `.astro`
* `.astro`-Komponenten enthalten **keine** hunderte Zeilen langen `<script>`-Blöcke.
* Alle Event-Listener, DOM-Manipulationen und API-Calls werden in typisierte TypeScript-Module unter `src/scripts/controllers/` oder `src/scripts/renderers/` ausgelagert.

### 3. Single Responsibility Principle (SRP)
* Jede Komponente beantwortet genau **eine** Frage im UI.
* Modals, Dropdowns, Toolbars und Tab-Panels sind **eigenständige Atome**, keine Monster-Blöcke in einer Eltern-Datei.

### 4. Wiederverwendbarkeit & Isolation
* Sub-Komponenten dürfen keine impliziten globalen Seiteneffekte erzeugen.
* Kommunikation zwischen Komponenten erfolgt ausschließlich über:
  1. Typisierte Props (SSR-Phase)
  2. Custom DOM-Events (`CustomEvent`) mit typisierten Payloads (Client-Phase)
  3. Den zentralen State-/Repository-Layer (`ProfileRepository`).

---

## IV. REVIEW-CHECKLISTE BEI JEDER ÄNDERUNG

- [ ] Hat die Komponente mehr als 250 Zeilen? ➔ **Muss sofort dekomponiert werden.**
- [ ] Enthält die Datei mehr als 30 Zeilen Inline-JavaScript im `<script>`? ➔ **In `src/scripts/` auslagern.**
- [ ] Vermischt die Komponente Business-Logik mit Darstellung? ➔ **In Domain-Layer / Controller verschieben.**
- [ ] Sind Sub-Widgets (Listen, Badges, Modals) isoliert extrahierbar? ➔ **Als atomare Sub-Komponenten anlegen.**
