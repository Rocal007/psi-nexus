// Node.js DSP Script to mathematically generate studio-grade 44.1kHz 16-Bit Stereo WAV/Audio Files
// for the 6 Canonical IAM (I AM / ICH BIN) Neuro-Acoustic Frequencies.
// Generates:
// 1. iam_adhd_fokus.wav (Brown Noise + 141.27 Hz + 14 Hz SMR / 40 Hz Gamma)
// 2. iam_anti_stress.wav (Green Noise + 528 Hz Solfeggio + 7.83 Hz Schumann)
// 3. iam_deep_work.wav (Pink Noise + 126.22 Hz Sun Octave + 40 Hz Gamma)
// 4. iam_birkenbihl_flow.wav (Pink Noise + 432 Hz + 10 Hz Alpha)
// 5. iam_tiefschlaf.wav (Deep Brownian Noise + 194.18 Hz + 2.5 Hz Delta)
// 6. iam_seelenmatrix.wav (Moon 210.42 Hz + 528 Hz + 5.5 Hz Theta)

import fs from 'node:fs';
import path from 'node:path';

interface TrackConfig {
  filename: string;
  name: string;
  baseFreq: number;
  binauralBeat: number;
  noiseType: 'brown' | 'pink' | 'green' | 'none';
  noiseLevel: number;
  toneLevel: number;
  durationSeconds: number;
}

const SAMPLE_RATE = 44100;

const TRACKS: TrackConfig[] = [
  {
    filename: 'iam_adhd_fokus.wav',
    name: 'IAM ADHS Fokus & Reiz-Filter',
    baseFreq: 141.27,
    binauralBeat: 14.0,
    noiseType: 'brown',
    noiseLevel: 0.45,
    toneLevel: 0.35,
    durationSeconds: 30
  },
  {
    filename: 'iam_anti_stress.wav',
    name: 'IAM Anti-Stress & Vagus-Reset',
    baseFreq: 528.0,
    binauralBeat: 7.83,
    noiseType: 'green',
    noiseLevel: 0.35,
    toneLevel: 0.4,
    durationSeconds: 30
  },
  {
    filename: 'iam_deep_work.wav',
    name: 'IAM Deep Work & Kognition',
    baseFreq: 126.22,
    binauralBeat: 40.0,
    noiseType: 'pink',
    noiseLevel: 0.35,
    toneLevel: 0.4,
    durationSeconds: 30
  },
  {
    filename: 'iam_birkenbihl_flow.wav',
    name: 'IAM Birkenbihl Flow & Lernen',
    baseFreq: 432.0,
    binauralBeat: 10.0,
    noiseType: 'pink',
    noiseLevel: 0.3,
    toneLevel: 0.45,
    durationSeconds: 30
  },
  {
    filename: 'iam_tiefschlaf.wav',
    name: 'IAM Tiefschlaf & Gedanken-Stopp',
    baseFreq: 194.18,
    binauralBeat: 2.5,
    noiseType: 'brown',
    noiseLevel: 0.55,
    toneLevel: 0.25,
    durationSeconds: 30
  },
  {
    filename: 'iam_seelenmatrix.wav',
    name: 'IAM Kosmische Seelen-Matrix',
    baseFreq: 210.42,
    binauralBeat: 5.5,
    noiseType: 'pink',
    noiseLevel: 0.25,
    toneLevel: 0.5,
    durationSeconds: 30
  }
];

function createWavHeader(numSamples: number, numChannels = 2, sampleRate = SAMPLE_RATE, bitsPerSample = 16): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = (numSamples * numChannels * bitsPerSample) / 8;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

function generateTrackAudio(cfg: TrackConfig): Buffer {
  const totalSamples = SAMPLE_RATE * cfg.durationSeconds;
  const wavHeader = createWavHeader(totalSamples);
  const pcmBuffer = Buffer.alloc(totalSamples * 4); // 2 channels * 2 bytes (16-bit)

  const leftFreq = cfg.baseFreq;
  const rightFreq = cfg.baseFreq + cfg.binauralBeat;

  // Pink noise state
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  // Brown noise state
  let lastBrownL = 0, lastBrownR = 0;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / SAMPLE_RATE;

    // 1. 0.1 Hz Breathing Pacer Heart-Coherence Envelope Modulation (10s cycle)
    const breathEnvelope = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.1 * t);

    // 2. Pure Sine Wave Oscillators with Stereo Phase Offset
    const toneL = Math.sin(2 * Math.PI * leftFreq * t) * cfg.toneLevel * breathEnvelope;
    const toneR = Math.sin(2 * Math.PI * rightFreq * t) * cfg.toneLevel * breathEnvelope;

    // 3. Noise Synthesis
    let noiseL = 0;
    let noiseR = 0;

    if (cfg.noiseType === 'pink') {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + whiteL * 0.0555179;
      b1 = 0.99332 * b1 + whiteL * 0.0750759;
      b2 = 0.96900 * b2 + whiteL * 0.1538520;
      b3 = 0.86650 * b3 + whiteL * 0.3104856;
      b4 = 0.55000 * b4 + whiteL * 0.5329522;
      b5 = -0.7616 * b5 - whiteL * 0.0168980;
      noiseL = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + whiteL * 0.5362) * 0.08 * cfg.noiseLevel;
      noiseR = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + whiteR * 0.5362) * 0.08 * cfg.noiseLevel;
      b6 = whiteL * 0.115926;
    } else if (cfg.noiseType === 'brown' || cfg.noiseType === 'green') {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;
      lastBrownL = (lastBrownL + (0.02 * whiteL)) / 1.02;
      lastBrownR = (lastBrownR + (0.02 * whiteR)) / 1.02;
      noiseL = lastBrownL * 2.5 * cfg.noiseLevel;
      noiseR = lastBrownR * 2.5 * cfg.noiseLevel;
    }

    // 4. Mix & Fade-in / Fade-out for smooth looping
    let fade = 1.0;
    const fadeSamples = SAMPLE_RATE * 1.5;
    if (i < fadeSamples) {
      fade = i / fadeSamples;
    } else if (i > totalSamples - fadeSamples) {
      fade = (totalSamples - i) / fadeSamples;
    }

    let sampleL = (toneL + noiseL) * fade;
    let sampleR = (toneR + noiseR) * fade;

    // Hard Limiter / Soft Clipping (-1.0 to +1.0)
    sampleL = Math.max(-0.95, Math.min(0.95, sampleL));
    sampleR = Math.max(-0.95, Math.min(0.95, sampleR));

    // Convert to 16-bit Signed Integer (-32768 to 32767)
    const intL = Math.floor(sampleL * 32767);
    const intR = Math.floor(sampleR * 32767);

    const offset = i * 4;
    pcmBuffer.writeInt16LE(intL, offset);
    pcmBuffer.writeInt16LE(intR, offset + 2);
  }

  return Buffer.concat([wavHeader, pcmBuffer]);
}

function main() {
  const outDir = path.resolve(process.cwd(), 'public/audio');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('🚀 Synthesizing 6 IAM Neuro-Acoustic Audio Tracks (44.1kHz 16-Bit Stereo)...');

  TRACKS.forEach((track) => {
    const filePath = path.join(outDir, track.filename);
    const wavData = generateTrackAudio(track);
    fs.writeFileSync(filePath, wavData);
    console.log(`✓ Generated: ${track.filename} (${(wavData.length / (1024 * 1024)).toFixed(2)} MB) - ${track.name}`);
  });

  console.log('✨ All IAM Audio Tracks generated successfully in public/audio/!');
}

main();
