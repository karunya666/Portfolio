// Web Audio API Synthesizer for tactile feedback and celestial ambient void sound

class SoundController {
  private ctx: AudioContext | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Tactile futuristic click feedback
  playClick(pitch = 700) {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.4, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context error ignore
    }
  }

  // Toggle feedback sound
  playToggle(on: boolean) {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const startFreq = on ? 440 : 660;
      const endFreq = on ? 880 : 330;

      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio error ignore
    }
  }

  // Toggle or force calm relaxing ambient sound
  toggleAmbient(force?: boolean): boolean {
    const targetState = force !== undefined ? force : !this.isAmbientPlaying;
    if (targetState) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return this.isAmbientPlaying;
  }

  private startAmbient() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      if (this.isAmbientPlaying && this.ambientGain) {
        return;
      }

      // Clean up any stale nodes
      this.cleanupAmbientNodes();

      // Deeply warm low-pass filter: cut all high frequencies, eliminate all buzzing
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.Q.setValueAtTime(0.5, ctx.currentTime); // gentle slope

      // Master ambient gain with smooth slow fade-in
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.032, ctx.currentTime + 3.0);

      // Tranquil, relaxing Brian Eno style chord:
      // D3 (146.8Hz), D3 slight detune (147.5Hz), A3 (220.0Hz), D4 (293.6Hz), E4 (329.6Hz)
      // ALL pure sines — zero harshness, zero buzz
      const tones = [
        { freq: 146.83, gain: 0.8 },
        { freq: 147.65, gain: 0.6 }, // gentle 0.8Hz chorus shimmer
        { freq: 220.00, gain: 0.7 },
        { freq: 293.66, gain: 0.5 },
        { freq: 329.63, gain: 0.35 },
      ];

      this.ambientOscs = tones.map((t) => {
        const osc = ctx.createOscillator();
        const toneGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(t.freq, ctx.currentTime);
        toneGain.gain.setValueAtTime(t.gain, ctx.currentTime);

        osc.connect(toneGain);
        toneGain.connect(filter);
        return osc;
      });

      // Ultra-slow breathing LFO (0.05 Hz = 20-second ocean wave breath)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.05, ctx.currentTime); // 20s cycle
      lfoGain.gain.setValueAtTime(0.008, ctx.currentTime); // subtle breath depth

      lfo.connect(lfoGain);
      lfoGain.connect(this.ambientGain.gain);
      lfo.start(ctx.currentTime);
      this.ambientOscs.push(lfo);

      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      // Start all sound generators
      this.ambientOscs.forEach((osc) => {
        try {
          osc.start(ctx.currentTime);
        } catch {
          // ignore
        }
      });

      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
        setTimeout(() => {
          this.cleanupAmbientNodes();
        }, 650);
      } else {
        this.cleanupAmbientNodes();
      }
    } catch {
      this.cleanupAmbientNodes();
    }
    this.isAmbientPlaying = false;
  }

  private cleanupAmbientNodes() {
    try {
      this.ambientOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.ambientOscs = [];
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch {
      // ignore
    }
  }

  getAmbientStatus(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundController();
