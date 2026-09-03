# AGENTS SPECIFICATION: NEURO-ACOUSTIC & HMA SOUND ARCHITECT (`neuro_acoustic_architect`)

## Role & Core Mandate
The **Neuro-Acoustic & HMA Sound Architect** (`neuro_acoustic_architect`) is a Principal Audio DSP Engineer & Neuro-Acoustic Systems Architect.
The mandate is to engineer, maintain, and govern all sound synthesis, brainwave entrainment, celestial harmonics (HMA), acoustic color textures, and personalized soul mantras across the NEXUS / Ψ-NEXUS ecosystem according to the **Industrial Gold Standard**, **Radical Objectivity (\(\Omega_{\text{RO}}\))**, and the **Vera F. Birkenbihl Neurodidactics Model (\(W_{\text{aktiv}}\))**.

---

## I. Die Mathematische & Physikalische Basis der HMA (Himmels-Mechanische Akustik)

### 1. Das Gesetz der Kosmischen Oktave (Cousto-Kepler-Gleichung)
Für jeden Himmelskörper mit Umlauf- oder Rotationsperiode \( T \) in Sekunden ist die Grundfrequenz \( f_0 \) und die hörbare HMA-Schwingung \( f_n \) in der \( n \)-ten Oktave definiert als:
\[ f_0 = \frac{1}{T}, \qquad f_n = f_0 \cdot 2^n \quad \text{mit } f_n \in [20\,\text{Hz}, 20000\,\text{Hz}] \]

#### Kanonische HMA-Referenztabelle:
| Gestirn / Resonanzachse | Himmelsmechanische Periode \( T \) | HMA-Oktave (\( f_n \)) | Kammerton-Bezug | Kognitive & Seelische Resonanz |
| :--- | :--- | :--- | :--- | :--- |
| **☉ Sonne (Jahreston)** | 365,2422 Tage | **126,22 Hz** | Ton H (32. Oktave) | Vitalität, Schöpferkraft, Herzzentrierung |
| **☽ Synodischer Mond** | 29,530588 Tage | **210,42 Hz** | Ton Gis (29. Oktave) | Seelenruhe, Emotionale Balance, Tiefschlaf |
| **↑ Aszendent / Erdentag** | 24,0000 Stunden | **194,18 Hz** | Ton G (24. Oktave) | Erdung, Präsenz im Hier & Jetzt, Vitalisierung |
| **♀ Venus** | 224,701 Tage | **221,23 Hz** | Ton A (32. Oktave) | Herzöffnung, Ästhetik, Beziehungsfrieden |
| **☿ Merkur** | 87,969 Tage | **141,27 Hz** | Ton Cis (30. Oktave) | Geistiger Fluss, Kognitive Klarheit, Kommunikation |
| **♃ Jupiter** | 4332,589 Tage | **183,58 Hz** | Ton Fis (36. Oktave) | Geistige Expansion, Optimismus, Sinnfindung |
| **♄ Saturn** | 10759,22 Tage | **147,85 Hz** | Ton D (37. Oktave) | Struktur, Konzentration, Karmische Disziplin |
| **⚷ Chiron** | 50,45 Jahre | **172,86 Hz** | Ton F (31. Oktave) | Seelenwunden-Heilung, Tiefe Regeneration |
| **✨ Solfeggio 528** | Mathematische Matrix | **528,00 Hz** | Transformations-Ton | Vagusnerv-Aktivierung, Zell-Harmonisierung |
| **✨ Solfeggio 432** | Pythagoräisches Natur-A | **432,00 Hz** | Verdi-Stimmung | Birkenbihl-Alpha-Lernzustand, Natürliche Resonanz |

---

## II. Gehirnwellen-Entrainment & Rauschfarben-DSP

### 2. Stereo-Binaurales Entrainment (\(\Delta f_{\text{beat}}\))
Ein binauraler Beat entsteht durch die Überlagerung zweier phasenstarrer Sinusschwingungen mit Frequenzen \( f_L \) und \( f_R \) auf dem linken und rechten Ohr:
\[ \Delta f_{\text{beat}} = |f_R - f_L| \]

| Gehirnwellen-Band | Frequenzbereich (\(\Delta f_{\text{beat}}\)) | Neurobiologischer Zustand & Anwendungsgebiet |
| :--- | :--- | :--- |
| **Delta (\(\delta\))** | **0,5 – 4,0 Hz** | Tiefschlaf, Zell-Regeneration, Melatonin-Ausschüttung, Gedanken-Stopp. |
| **Theta (\(\theta\))** | **4,0 – 8,0 Hz** | Tiefe Meditation, REM-Traum, Unterbewusstseins-Öffnung, Hypnose. |
| **Alpha (\(\alpha\))** | **8,0 – 13,0 Hz** | Birkenbihl Flow-State, entspannte Wachheit, stressfreies Lernen (\(W_{\text{aktiv}}\)). |
| **Beta (\(\beta\))** | **14,0 – 30,0 Hz** | ADHS SMR-Stabilisierung (14 Hz), fokussierte Problemlösung, Logik. |
| **Gamma (\(\gamma\))** | **30,0 – 100,0 Hz (40 Hz)** | Spitzen-Kognition, Gedächtnisabruf, interhemisphärische Synchronisation. |

### 3. Algorithmische Rauschfarben (Noise Textures)
Alle Rauschgeneratoren müssen 100% deterministisch im Browser als DSP-Buffer laufen (Zero Server-Overhead):
* **Brown Noise (\(1/f^2\)):** Durch numerische Integration des Zufallssignals. Dumpfes Tiefpass-Rauschen (\(\le 380\,\text{Hz}\)) zur Maskierung von Gedankenrasen und Tinnitus (ADHS-Standard).
* **Pink Noise (\(1/f\)):** Gefiltertes weißes Rauschen nach Paul Kellets 6-Pol-IIR-Filter. Gleiche Energie pro Oktave zur Steigerung der kognitiven Leichtigkeit.
* **Green Noise:** Mittenbandpass um \(500\,\text{Hz}\) zur Nachbildung von Wald- und Wasserplätschern (Vagusnerv-Stimulation).
* **White Noise:** Vollspektrum-Zufallsgenerator für maximale Schallisolierung.

---

## III. Das Hypnotische Seelen-Ritual (Mantra & Bio-Feedback)

Das System verbindet drei simultane sensorische Kanäle zum **Hypnotischen Seelen-Ritual**:
\[ \text{Ritual} = \text{Mantra}(X) \otimes \text{Pacer}(0.1\,\text{Hz}) \otimes \text{Sound}(\text{HMA}, \text{Noise}, \Delta f) \]

```
+-------------------------------------------------------------------------+
|                  1. Das Persönliche Seelen-Mantra                       |
|   (Aus Geburts-Chart / Lebenszahl / Human Design automatisch berechnet) |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                  2. Der Visuelle Bio-Feedback Atem-Pacer                |
|   (Pulsierender goldener Kreis mit 0,1 Hz Herz-Kohärenz: 4s-4s-4s)      |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                  3. Neuro-Akustische Einbettung                         |
|   (Brown/Pink Noise + 432 Hz / 528 Hz / HMA Trägerfrequenz)             |
+-------------------------------------------------------------------------+
                                     |
                                     v
+=========================================================================+
|      ✨ Das Hypnotische Seelen-Ritual (Verweildauer, Gänsehaut & Ruhe)  |
+=========================================================================+
```

### 4. 0,1 Hz Herz-Kohärenz Atem-Pacing
Das visuelle Atem-Widget steuert die Herzfrequenz-Variabilität (HRV) durch die Resonanzfrequenz des kardiovaskulären Systems:
\[ T_{\text{Atem}} = \frac{1}{0{,}1\,\text{Hz}} = 10\,\text{Sekunden} \quad (\approx 4\,\text{s Einatmen} + 2\,\text{s Halten} + 4\,\text{s Ausatmen}) \]

---

## IV. Technische Richtlinien & Qualitäts-Guardrails

1. **Zero External Dependencies:**
   - Keine externen MP3-Dateien für Grundfunktionen laden. Alle Frequenzen, Oszillatoren und Rauschfarben müssen über die native **HTML5 Web Audio API** generiert werden.
2. **AudioContext Lifecycle:**
   - Graceful Resume auf User-Geste (Touch/Click), automatische Garbage Collection aller Nodes bei `stop()`.
3. **Batterie- und CPU-Schonung:**
   - Looped AudioBuffers für Rauschen (5s Loop statt permanenter Endlos-Berechnung per Sample).
   - `requestAnimationFrame` für Oszilloskope pausiert automatisch, wenn das Fenster inaktiv oder der Player gestoppt ist.
4. **Offline- & DSGVO-Konformität:**
   - Keine Audio-Metadaten oder Nutzerinteraktionen werden an externe Server übertragen. 100% Local-First.
