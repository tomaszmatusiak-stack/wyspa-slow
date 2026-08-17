/**
 * Efekty syntezowane w WebAudio — zero plików do pobrania, zero licencji.
 * Dźwięk błędu jest celowo miękki i niski: ma informować, nie karcić.
 */

type Sfx = 'tap' | 'correct' | 'wrong' | 'flip' | 'match' | 'star' | 'levelUp' | 'finish'

let ctx: AudioContext | null = null
let enabled = true

export function setSfxEnabled(on: boolean): void {
  enabled = on
}

function audio(): AudioContext | null {
  if (!enabled) return null
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, duration: number, gain: number, type: OscillatorType = 'sine') {
  const ac = audio()
  if (!ac) return
  const t0 = ac.currentTime + start
  const osc = ac.createOscillator()
  const env = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  env.gain.setValueAtTime(0, t0)
  env.gain.linearRampToValueAtTime(gain, t0 + 0.012)
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(env).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

const RECIPES: Record<Sfx, () => void> = {
  tap: () => tone(520, 0, 0.06, 0.12, 'triangle'),
  flip: () => tone(660, 0, 0.07, 0.1, 'triangle'),
  correct: () => {
    tone(784, 0, 0.12, 0.18)
    tone(1046, 0.09, 0.18, 0.16)
  },
  wrong: () => {
    tone(300, 0, 0.14, 0.12, 'sine')
    tone(240, 0.1, 0.18, 0.1, 'sine')
  },
  match: () => {
    tone(880, 0, 0.1, 0.15)
    tone(1174, 0.08, 0.14, 0.13)
  },
  star: () => {
    tone(1046, 0, 0.1, 0.16)
    tone(1318, 0.1, 0.12, 0.15)
    tone(1568, 0.2, 0.22, 0.14)
  },
  levelUp: () => {
    ;[523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.22, 0.16, 'triangle'))
  },
  finish: () => {
    ;[523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.08, 0.3, 0.15, 'triangle'))
  },
}

export function play(name: Sfx): void {
  RECIPES[name]?.()
}
