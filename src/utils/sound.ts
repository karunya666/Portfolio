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

  // Toggle or force ambient celestial sound
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

      // Warm low-pass filter to soften the ambient pad
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 1.5);

      // Celestial harmonic chord: C3 (130.8Hz), G3 (196Hz), E4 (329.6Hz)
      const freqs = [130.81, 196.0, 329.63];
      this.ambientOscs = freqs.map((f, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(filter);
        return osc;
      });

      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      this.ambientOscs.forEach((osc) => osc.start(ctx.currentTime));
      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          this.cleanupAmbientNodes();
        }, 350);
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
