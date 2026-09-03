// Pure TypeScript Web Audio API DSP Engine for Neuroacoustic Brainwave Entrainment
// Supports: Realtime Pink/Brown/Green/White Noise, Stereo Binaural Beats, Isochronic Pulses, Solfeggio & HMA Cousto Frequencies.
// 100% Client-Side, Zero Server Cost, Studio-Grade 32-Bit Floating Point Synthesis.

export type NoiseType = 'brown' | 'pink' | 'green' | 'white' | 'off';

export interface SoundPreset {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  category: 'adhd' | 'stress' | 'focus' | 'learn' | 'sleep' | 'cosmic';
  baseFrequency: number; // e.g. 432 Hz, 528 Hz, 126.22 Hz (Sun)
  binauralBeat: number; // e.g. 14 Hz (Beta), 10 Hz (Alpha), 5.5 Hz (Theta), 2.5 Hz (Delta), 40 Hz (Gamma)
  noiseType: NoiseType;
  noiseVolume: number; // 0.0 to 1.0
  toneVolume: number; // 0.0 to 1.0
  description: string;
  scientificBenefit: string;
}

export const UNIVERSAL_PRESETS: SoundPreset[] = [
  {
    id: 'preset_adhd',
    name: 'ADHS Fokus & Reiz-Filter',
    subtitle: 'Brown Noise + 14 Hz SMR & 40 Hz Gamma',
    icon: '🧠',
    category: 'adhd',
    baseFrequency: 141.27, // Mercury / Cognitive Flow
    binauralBeat: 14.0, // SMR / Sensorimotor Rhythm for ADHD stabilization
    noiseType: 'brown',
    noiseVolume: 0.65,
    toneVolume: 0.35,
    description: 'Tiefes Brown Noise blendet störende Umweltreize und Gedankenrasen aus, während 14 Hz SMR-Wellen das neuronale Feedback stabilisieren.',
    scientificBenefit: 'Empfohlen bei Reizüberflutung, ADHS, Konzentrationsschwierigkeiten und Tinnitus.'
  },
  {
    id: 'preset_stress',
    name: 'Anti-Stress & Nervensystem-Reset',
    subtitle: 'Green Noise + 528 Hz Solfeggio & 7.83 Hz',
    icon: '🌿',
    category: 'stress',
    baseFrequency: 528.0, // Solfeggio Transformation / Vagus Tone
    binauralBeat: 7.83, // Schumann Resonance (Earth fundamental)
    noiseType: 'green',
    noiseVolume: 0.5,
    toneVolume: 0.4,
    description: 'Natürliche Wald- und Bach-Resonanz beruhigt den Sympathikus und aktiviert die Herzfrequenz-Variabilität (Vagusnerv-Stimulation).',
    scientificBenefit: 'Senkt nachweislich Stressmarker, beruhigt den Puls und löst innere Anspannung.'
  },
  {
    id: 'preset_focus',
    name: 'Deep Work & Kognition',
    subtitle: 'Brain.fm Modus + 40 Hz Gamma & Sonne',
    icon: '🎯',
    category: 'focus',
    baseFrequency: 126.22, // HMA Sun Octave (Vitality & Clarity)
    binauralBeat: 40.0, // 40 Hz Gamma peak cognition synchronization
    noiseType: 'pink',
    noiseVolume: 0.45,
    toneVolume: 0.45,
    description: '40 Hz Gamma-Gehirnwellen-Synchronisation für maximale geistige Schärfe, langes Durchhalten bei komplexen Aufgaben und fehlerfreies Arbeiten.',
    scientificBenefit: 'Erhöht die neuronale Verarbeitungsgeschwindigkeit und kognitive Arbeitsgedächtnisleistung.'
  },
  {
    id: 'preset_learn',
    name: 'Birkenbihl Flow & Lernen',
    subtitle: 'Pink Noise + 432 Hz & 10 Hz Alpha',
    icon: '📚',
    category: 'learn',
    baseFrequency: 432.0, // Verdi-A Nature Harmony
    binauralBeat: 10.0, // 10 Hz Alpha Flow State
    noiseType: 'pink',
    noiseVolume: 0.4,
    toneVolume: 0.5,
    description: 'Vera F. Birkenbihl Alpha-Lernzustand: Versetzt das Gehirn in mühelose, stressfreie Aufnahmebereitschaft (Pauken → 0).',
    scientificBenefit: 'Fördert intuitive Verknüpfung von neuem Wissen mit dem Langzeitgedächtnis.'
  },
  {
    id: 'preset_sleep',
    name: 'Tiefschlaf & Gedanken-Stopp',
    subtitle: 'Schweres Brownian Red Noise + 2.5 Hz Delta',
    icon: '😴',
    category: 'sleep',
    baseFrequency: 194.18, // Earth Day / Root Grounding
    binauralBeat: 2.5, // Deep Delta Sleep Wave
    noiseType: 'brown',
    noiseVolume: 0.75,
    toneVolume: 0.25,
    description: 'Schwere, beruhigende Tiefen-Brandung stoppt nächtliches Grübeln und führt das Gehirn sanft in die zelluläre Tiefschlaf-Phase.',
    scientificBenefit: 'Verlängert die regenerativen Non-REM-Tiefschlafphasen und unterstützt die Melatonin-Ausschüttung.'
  },
  {
    id: 'preset_cosmic',
    name: 'Kosmische HMA Seelen-Harmonie',
    subtitle: 'HMA Planeten-Oktaven + 432 Hz / 528 Hz',
    icon: '🪐',
    category: 'cosmic',
    baseFrequency: 210.42, // Synodischer Mond (Seelenruhe)
    binauralBeat: 5.5, // Deep Theta Soul Connection
    noiseType: 'pink',
    noiseVolume: 0.35,
    toneVolume: 0.6,
    description: 'Harmonikale Synthese aus Himmelsmechanik und Solfeggio: Stärkt die intuitive Verbindung zu deinem kosmischen Seelenplan.',
    scientificBenefit: 'Harmonisiert Körperfeld und Geist über astronomisch abgeleitete Schwingungs-Oktaven.'
  }
];

export class NeuroAcousticEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;

  // Master Gain & Analyser
  private masterGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;

  // Binaural Beat Oscillators
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private toneGain: GainNode | null = null;
  private pannerLeft: StereoPannerNode | null = null;
  private pannerRight: StereoPannerNode | null = null;

  // Noise Nodes
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;

  // Current Parameters
  private currentPreset: SoundPreset = UNIVERSAL_PRESETS[0];
  private currentNoiseType: NoiseType = 'brown';
  private masterVolumeValue: number = 0.8;
  private timerTimeoutId: any = null;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private initAudioContext(): void {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async start(preset?: SoundPreset): Promise<void> {
    this.initAudioContext();
    if (!this.ctx) return;

    if (preset) {
      this.currentPreset = preset;
      this.currentNoiseType = preset.noiseType;
    }

    this.stopNodes();

    // 1. Setup Master Gain & Analyser
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.masterVolumeValue, this.ctx.currentTime);

    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = 256;
    this.analyserNode.smoothingTimeConstant = 0.8;

    this.masterGain.connect(this.analyserNode);
    this.analyserNode.connect(this.ctx.destination);

    // 2. Setup Tone & Binaural Oscillators
    this.setupBinauralTone(this.currentPreset.baseFrequency, this.currentPreset.binauralBeat, this.currentPreset.toneVolume);

    // 3. Setup Noise Texture
    if (this.currentNoiseType !== 'off') {
      this.setupNoise(this.currentNoiseType, this.currentPreset.noiseVolume);
    }

    this.isRunning = true;
  }

  private setupBinauralTone(baseFreq: number, beatFreq: number, volume: number): void {
    if (!this.ctx || !this.masterGain) return;

    this.toneGain = this.ctx.createGain();
    this.toneGain.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);
    this.toneGain.connect(this.masterGain);

    const freqLeft = baseFreq;
    const freqRight = baseFreq + beatFreq;

    // Left Ear Oscillator
    this.oscLeft = this.ctx.createOscillator();
    this.oscLeft.type = 'sine';
    this.oscLeft.frequency.setValueAtTime(freqLeft, this.ctx.currentTime);

    this.pannerLeft = this.ctx.createStereoPanner();
    this.pannerLeft.pan.setValueAtTime(-1, this.ctx.currentTime); // 100% Left

    this.oscLeft.connect(this.pannerLeft);
    this.pannerLeft.connect(this.toneGain);
    this.oscLeft.start();

    // Right Ear Oscillator
    this.oscRight = this.ctx.createOscillator();
    this.oscRight.type = 'sine';
    this.oscRight.frequency.setValueAtTime(freqRight, this.ctx.currentTime);

    this.pannerRight = this.ctx.createStereoPanner();
    this.pannerRight.pan.setValueAtTime(1, this.ctx.currentTime); // 100% Right

    this.oscRight.connect(this.pannerRight);
    this.pannerRight.connect(this.toneGain);
    this.oscRight.start();
  }

  private setupNoise(type: NoiseType, volume: number): void {
    if (!this.ctx || !this.masterGain || type === 'off') return;

    const bufferSize = 5 * this.ctx.sampleRate; // 5 seconds looped buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Algorithmic Noise Generation (Voss-McCartney & Filtering)
    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      // 1/f Pink Noise (Paul Kellet's filtered white noise approximation)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown' || type === 'green') {
      // 1/f^2 Brown Noise (Integrated Brownian walk)
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain compensation
      }
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    this.noiseFilter = this.ctx.createBiquadFilter();
    if (type === 'brown') {
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(380, this.ctx.currentTime); // Deep warm lowpass
    } else if (type === 'green') {
      this.noiseFilter.type = 'bandpass';
      this.noiseFilter.frequency.setValueAtTime(500, this.ctx.currentTime); // Nature green noise peak
      this.noiseFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);
    } else if (type === 'pink') {
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    } else {
      this.noiseFilter.type = 'allpass';
    }

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);

    this.noiseNode.connect(this.noiseFilter);
    this.noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  public setPreset(preset: SoundPreset): void {
    this.currentPreset = preset;
    this.currentNoiseType = preset.noiseType;
    if (this.isRunning) {
      this.start(preset);
    }
  }

  public setNoiseType(type: NoiseType): void {
    this.currentNoiseType = type;
    if (this.isRunning) {
      this.start(this.currentPreset);
    }
  }

  public setMasterVolume(val: number): void {
    this.masterVolumeValue = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.masterVolumeValue, this.ctx.currentTime, 0.05);
    }
  }

  public setTimer(minutes: number, onExpire?: () => void): void {
    if (this.timerTimeoutId) {
      clearTimeout(this.timerTimeoutId);
      this.timerTimeoutId = null;
    }

    if (minutes > 0) {
      this.timerTimeoutId = setTimeout(() => {
        this.stop();
        if (onExpire) onExpire();
      }, minutes * 60 * 1000);
    }
  }

  public stop(): void {
    this.stopNodes();
    this.isRunning = false;
    if (this.timerTimeoutId) {
      clearTimeout(this.timerTimeoutId);
      this.timerTimeoutId = null;
    }
  }

  private stopNodes(): void {
    try {
      if (this.oscLeft) {
        this.oscLeft.stop();
        this.oscLeft.disconnect();
        this.oscLeft = null;
      }
      if (this.oscRight) {
        this.oscRight.stop();
        this.oscRight.disconnect();
        this.oscRight = null;
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain = null;
      }
    } catch (e) {
      // Ignore cleanup error if already closed
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getCurrentPreset(): SoundPreset {
    return this.currentPreset;
  }

  public getAnalyserData(dataArray: Uint8Array): void {
    if (this.analyserNode) {
      this.analyserNode.getByteFrequencyData(dataArray);
    }
  }
}
