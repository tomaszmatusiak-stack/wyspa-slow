export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Tasuje, ale gwarantuje, że wynik różni się od wejścia (o ile to możliwe). */
export function shuffleDifferent<T>(arr: readonly T[]): T[] {
  if (arr.length < 2) return arr.slice()
  for (let attempt = 0; attempt < 8; attempt++) {
    const out = shuffle(arr)
    if (out.some((v, i) => v !== arr[i])) return out
  }
  const out = arr.slice()
  ;[out[0], out[1]] = [out[1], out[0]]
  return out
}
