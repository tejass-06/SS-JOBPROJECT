/**
 * hirrd Sound FX — Web Audio API synthesizer
 * No external audio files. Works in any modern browser.
 */

const ctx = () => new (window.AudioContext || window.webkitAudioContext)();

/** Play a sequence of notes */
const playNotes = (notes, volume = 0.4) => {
  try {
    const ac = ctx();
    let t = ac.currentTime;
    notes.forEach(([freq, dur, type = 'sine']) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(volume, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t);
      osc.stop(t + dur + 0.05);
      t += dur * 0.6;
    });
  } catch (e) {
    console.warn('Audio not available:', e);
  }
};

/**
 * Phone success chime — GPay-style ascending ding
 * Plays when user completes payment on phone
 */
export const playPhoneSuccess = () => {
  playNotes([
    [523, 0.12],  // C5
    [659, 0.12],  // E5
    [784, 0.12],  // G5
    [1047, 0.35], // C6 — hold
  ], 0.35);
};

/**
 * Desktop activation fanfare — triumphant Pro unlock
 * Plays when desktop detects payment and activates Pro
 */
export const playDesktopSuccess = () => {
  // Layer 1: chord sweep
  playNotes([
    [330, 0.15, 'triangle'], // E4
    [440, 0.15, 'triangle'], // A4
    [554, 0.15, 'triangle'], // C#5
    [659, 0.15, 'triangle'], // E5
    [880, 0.4,  'triangle'], // A5 — hold
  ], 0.3);

  // Layer 2: sparkle high notes (delayed)
  setTimeout(() => {
    playNotes([
      [1047, 0.08, 'sine'], // C6
      [1319, 0.08, 'sine'], // E6
      [1568, 0.2,  'sine'], // G6
    ], 0.2);
  }, 200);
};

/**
 * Simple notification ping
 * Plays as a gentle alert
 */
export const playPing = () => {
  playNotes([[880, 0.3, 'sine']], 0.25);
};
