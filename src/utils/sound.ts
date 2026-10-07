// Web Audio API Synthesizer for tactile feedback and ambient void sound

class SoundController {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Tactile futuristic click
  playClick(pitch = 800) {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before first gesture
    }
  }

  // Flashlight toggle click
  playToggle(on: boolean) {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const startFreq = on ? 440 : 660;
      const endFreq = on ? 880 : 330;

      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // Audio context error ignore
    }
  }

  // Ambient deep-space void drone
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
        ctx.resume();
      }

      if (this.isAmbientPlaying) return;

      // Filter for deep warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5);

      // Deep harmonic oscillators
      this.ambientOsc1 = ctx.createOscillator();
      this.ambientOsc1.type = "sawtooth";
      this.ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      this.ambientOsc2 = ctx.createOscillator();
      this.ambientOsc2.type = "sine";
      this.ambientOsc2.frequency.setValueAtTime(82.4, ctx.currentTime); // E2 fifth

      this.ambientOsc1.connect(filter);
      this.ambientOsc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  private stopAmbient() {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientGain?.disconnect();
          this.isAmbientPlaying = false;
        }, 1300);
      } else {
        this.isAmbientPlaying = false;
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  getAmbientStatus(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundController();
