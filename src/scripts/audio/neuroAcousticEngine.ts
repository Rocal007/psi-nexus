// Pure TypeScript Web Audio API & HTML5 Dual-Engine for Neuroacoustic Brainwave Entrainment
// Supports: Realtime DSP Synthesis, HTML5 Native Audio Fallback, Stereo Binaural Beats, Noise Algorithms & Visualizer.
// 100% Client-Side, Zero Server Cost, Safari / iOS / Android / Chrome compatible.

export type NoiseType = 'brown' | 'pink' | 'green' | 'white' | 'off';

export interface SoundPreset {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  category: 'adhd' | 'stress' | 'focus' | 'learn' | 'sleep' | 'cosmic';
  baseFrequency: number;
  binauralBeat: number;
  noiseType: NoiseType;
  noiseVolume: number;
  toneVolume: number;
  audioFile: string;
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
    baseFrequency: 141.27,
    binauralBeat: 14.0,
    noiseType: 'brown',
    noiseVolume: 0.65,
    toneVolume: 0.45,
    audioFile: '/audio/iam_adhd_fokus.wav',
    description: 'Tiefes Brown Noise blendet störende Umweltreize und Gedankenrasen aus, während 14 Hz SMR-Wellen das neuronale Feedback stabilisieren.',
    scientificBenefit: 'Empfohlen bei Reizüberflutung, ADHS, Konzentrationsschwierigkeiten und Tinnitus.'
  },
  {
    id: 'preset_stress',
    name: 'Anti-Stress & Nervensystem-Reset',
    subtitle: 'Green Noise + 528 Hz Solfeggio & 7.83 Hz',
    icon: '🌿',
    category: 'stress',
    baseFrequency: 528.0,
    binauralBeat: 7.83,
    noiseType: 'green',
    noiseVolume: 0.5,
    toneVolume: 0.5,
    audioFile: '/audio/iam_anti_stress.wav',
    description: 'Natürliche Wald- und Bach-Resonanz beruhigt den Sympathikus und aktiviert die Herzfrequenz-Variabilität (Vagusnerv-Stimulation).',
    scientificBenefit: 'Senkt nachweislich Stressmarker, beruhigt den Puls und löst innere Anspannung.'
  },
  {
    id: 'preset_focus',
    name: 'Deep Work & Kognition',
    subtitle: 'Brain.fm Modus + 40 Hz Gamma & Sonne',
    icon: '🎯',
    category: 'focus',
    baseFrequency: 126.22,
    binauralBeat: 40.0,
    noiseType: 'pink',
    noiseVolume: 0.45,
    toneVolume: 0.5,
    audioFile: '/audio/iam_deep_work.wav',
    description: '40 Hz Gamma-Gehirnwellen-Synchronisation für maximale geistige Schärfe, langes Durchhalten bei komplexen Aufgaben und fehlerfreies Arbeiten.',
    scientificBenefit: 'Erhöht die neuronale Verarbeitungsgeschwindigkeit und kognitive Arbeitsgedächtnisleistung.'
  },
  {
    id: 'preset_learn',
    name: 'Birkenbihl Flow & Lernen',
    subtitle: 'Pink Noise + 432 Hz & 10 Hz Alpha',
    icon: '📚',
    category: 'learn',
    baseFrequency: 432.0,
    binauralBeat: 10.0,
    noiseType: 'pink',
    noiseVolume: 0.4,
    toneVolume: 0.55,
    audioFile: '/audio/iam_birkenbihl_flow.wav',
    description: 'Vera F. Birkenbihl Alpha-Lernzustand: Versetzt das Gehirn in mühelose, stressfreie Aufnahmebereitschaft (Pauken → 0).',
    scientificBenefit: 'Fördert intuitive Verknüpfung von neuem Wissen mit dem Langzeitgedächtnis.'
  },
  {
    id: 'preset_sleep',
    name: 'Tiefschlaf & Gedanken-Stopp',
    subtitle: 'Schweres Brownian Red Noise + 2.5 Hz Delta',
    icon: '😴',
    category: 'sleep',
    baseFrequency: 194.18,
    binauralBeat: 2.5,
    noiseType: 'brown',
    noiseVolume: 0.75,
    toneVolume: 0.35,
    audioFile: '/audio/iam_tiefschlaf.wav',
    description: 'Schwere, beruhigende Tiefen-Brandung stoppt nächtliches Grübeln und führt das Gehirn sanft in die zelluläre Tiefschlaf-Phase.',
    scientificBenefit: 'Verlängert die regenerativen Non-REM-Tiefschlafphasen und unterstützt die Melatonin-Ausschüttung.'
  },
  {
    id: 'preset_cosmic',
    name: 'Kosmische HMA Seelen-Harmonie',
    subtitle: 'HMA Planeten-Oktaven + 432 Hz / 528 Hz',
    icon: '🪐',
    category: 'cosmic',
    baseFrequency: 210.42,
    binauralBeat: 5.5,
    noiseType: 'pink',
    noiseVolume: 0.35,
    toneVolume: 0.65,
    audioFile: '/audio/iam_seelenmatrix.wav',
    description: 'Harmonikale Synthese aus Himmelsmechanik und Solfeggio: Stärkt die intuitive Verbindung zu deinem kosmischen Seelenplan.',
    scientificBenefit: 'Harmonisiert Körperfeld und Geist über astronomisch abgeleitete Schwingungs-Oktaven.'
  }
];

export class NeuroAcousticEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private audioElement: HTMLAudioElement | null = null;

  // Master Gain & Analyser
  private masterGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;

  // Binaural Beat Oscillators
  private oscLeft: OscillatorNode | null = null;
  private oscRight: OscillatorNode | null = null;
  private toneGain: GainNode | null = null;

  // Noise Nodes
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;

  // Current Parameters
  private currentPreset: SoundPreset = UNIVERSAL_PRESETS[0];
  private currentNoiseType: NoiseType = 'brown';
  private masterVolumeValue: number = 0.8;
  private timerTimeoutId: any = null;

  constructor(audioElement?: HTMLAudioElement | null) {
    if (audioElement) {
      this.audioElement = audioElement;
      this.audioElement.loop = true;
    }
  }

  public setAudioElement(el: HTMLAudioElement): void {
    this.audioElement = el;
    this.audioElement.loop = true;
  }

  private async initAudioContext(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
    } catch (e) {
      console.warn('Web Audio API init notice:', e);
    }
  }

  public async start(preset?: SoundPreset): Promise<void> {
    await this.initAudioContext();

    if (preset) {
      this.currentPreset = preset;
      this.currentNoiseType = preset.noiseType;
    }

    this.stopNodes();

    // 1. Start HTML5 Audio Fallback
    if (this.audioElement) {
      try {
        this.audioElement.src = this.currentPreset.audioFile;
        this.audioElement.volume = this.masterVolumeValue;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Native audio play notice (will proceed with DSP):', err);
          });
        }
      } catch (e) {
        console.warn('Audio element error:', e);
      }
    }

    // 2. Setup Web Audio API Synthesizer (for high-precision synthesis & visualizer)
    if (this.ctx) {
      try {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.masterVolumeValue, this.ctx.currentTime);

        this.analyserNode = this.ctx.createAnalyser();
        this.analyserNode.fftSize = 256;
        this.analyserNode.smoothingTimeConstant = 0.8;

        this.masterGain.connect(this.analyserNode);
        this.analyserNode.connect(this.ctx.destination);

        // Setup Tone & Binaural Oscillators
        this.setupBinauralTone(this.currentPreset.baseFrequency, this.currentPreset.binauralBeat, this.currentPreset.toneVolume);

        // Setup Noise Texture
        if (this.currentNoiseType !== 'off') {
          this.setupNoise(this.currentNoiseType, this.currentPreset.noiseVolume);
        }
      } catch (err) {
        console.warn('DSP Web Audio setup notice:', err);
      }
    }

    this.isRunning = true;
  }

  private setupBinauralTone(baseFreq: number, beatFreq: number, volume: number): void {
    if (!this.ctx || !this.masterGain) return;

    try {
      this.toneGain = this.ctx.createGain();
      this.toneGain.gain.setValueAtTime(volume * 0.4, this.ctx.currentTime);
      this.toneGain.connect(this.masterGain);

      const freqLeft = baseFreq;
      const freqRight = baseFreq + beatFreq;

      // Left Oscillator
      this.oscLeft = this.ctx.createOscillator();
      this.oscLeft.type = 'sine';
      this.oscLeft.frequency.setValueAtTime(freqLeft, this.ctx.currentTime);

      // Check for StereoPanner support (fallback gracefully if not supported)
      if (typeof this.ctx.createStereoPanner === 'function') {
        const panL = this.ctx.createStereoPanner();
        panL.pan.setValueAtTime(-1, this.ctx.currentTime);
        this.oscLeft.connect(panL);
        panL.connect(this.toneGain);
      } else {
        this.oscLeft.connect(this.toneGain);
      }
      this.oscLeft.start();

      // Right Oscillator
      this.oscRight = this.ctx.createOscillator();
      this.oscRight.type = 'sine';
      this.oscRight.frequency.setValueAtTime(freqRight, this.ctx.currentTime);

      if (typeof this.ctx.createStereoPanner === 'function') {
        const panR = this.ctx.createStereoPanner();
        panR.pan.setValueAtTime(1, this.ctx.currentTime);
        this.oscRight.connect(panR);
        panR.connect(this.toneGain);
      } else {
        this.oscRight.connect(this.toneGain);
      }
      this.oscRight.start();
    } catch (e) {
      console.warn('Binaural oscillator setup error:', e);
    }
  }

  private setupNoise(type: NoiseType, volume: number): void {
    if (!this.ctx || !this.masterGain || type === 'off') return;

    try {
      const bufferSize = 3 * this.ctx.sampleRate; // 3 seconds looped buffer
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Algorithmic Noise Generation (Voss-McCartney & Filtering)
      if (type === 'white') {
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
      } else if (type === 'pink') {
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
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = data[i];
          data[i] *= 2.5;
        }
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      this.noiseFilter = this.ctx.createBiquadFilter();
      if (type === 'brown') {
        this.noiseFilter.type = 'lowpass';
        this.noiseFilter.frequency.setValueAtTime(380, this.ctx.currentTime);
      } else if (type === 'green') {
        this.noiseFilter.type = 'bandpass';
        this.noiseFilter.frequency.setValueAtTime(500, this.ctx.currentTime);
        this.noiseFilter.Q.setValueAtTime(1.0, this.ctx.currentTime);
      } else if (type === 'pink') {
        this.noiseFilter.type = 'lowpass';
        this.noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      } else {
        this.noiseFilter.type = 'allpass';
      }

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime);

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);

      this.noiseNode.start();
    } catch (e) {
      console.warn('Noise setup error:', e);
    }
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
    if (this.audioElement) {
      this.audioElement.volume = this.masterVolumeValue;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(this.masterVolumeValue, this.ctx.currentTime, 0.05);
      } catch {}
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
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch {}
    }
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
    } catch {}
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
    } else {
      // Synthetic fallback wave animation if analyser is unavailable
      const time = Date.now() / 150;
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = Math.floor(128 + 60 * Math.sin(time + i * 0.15));
      }
    }
  }
}
