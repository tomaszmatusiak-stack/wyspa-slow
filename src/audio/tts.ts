/**
 * Lektor przez Web Speech API. Zero plików, działa offline, głosy systemowe macOS są dobre.
 *
 * Domyślnie wybieramy **miły głos kobiecy**, najlepiej brytyjski — polska szkoła uczy
 * wymowy brytyjskiej, a dzieci lepiej znoszą wyższy, cieplejszy głos przez 45 minut.
 * Wybór można nadpisać w ustawieniach profilu, bo dostępne głosy różnią się między urządzeniami.
 */

/**
 * Kolejność preferencji, od najlepszego. To lista jakości, nie tylko płci:
 * naturalne, ciepłe głosy kobiece na górze, brytyjskie przed amerykańskimi.
 *
 * Poniżej kreski leżą głosy kobiece, ale sztuczne albo mocno stylizowane
 * (nowa „ekspresyjna" rodzina macOS: Flo, Sandy, Shelley). Trafiają do listy,
 * ale nie zostaną wybrane automatycznie, dopóki jest cokolwiek lepszego.
 */
const PREFERRED_FEMALE = [
  // naturalne i ciepłe
  'serena', 'kate', 'stephanie', 'google uk english female', 'hazel',
  'samantha', 'ava', 'allison', 'susan', 'joelle', 'nicky', 'zoe', 'zira',
  'karen', 'moira', 'tessa', 'fiona', 'martha', 'catherine', 'veena',
  // ——— dalej: kobiece, ale sztuczne lub stylizowane
  'kathy', 'jamie', 'flo', 'sandy', 'shelley',
]

const FEMALE_VOICES = new Set(PREFERRED_FEMALE)

/**
 * Żartobliwe głosy macOS („Bubbles", „Zarvox", „Trinoids"…). Nadają się do zabawy,
 * nie do nauki wymowy — nie mogą trafić do listy przez przypadek.
 */
const NOVELTY_VOICES = new Set(
  [
    'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos', 'deranged',
    'good news', 'hysterical', 'jester', 'organ', 'pipe organ', 'superstar', 'trinoids',
    'whisper', 'wobble', 'zarvox', 'grandma', 'grandpa', 'junior', 'wobbly', 'eddy', 'rocko',
    'bahh brother',
  ].map((n) => n.toLowerCase()),
)

function isNovelty(v: SpeechSynthesisVoice): boolean {
  const n = v.name.toLowerCase()
  return NOVELTY_VOICES.has(n) || NOVELTY_VOICES.has(n.split(' (')[0].trim())
}

/** Dopasowanie nazwy głosu do wzorca — macOS dokleja lokalizację, np. „Flo (angielski (…))". */
function baseName(v: SpeechSynthesisVoice): string {
  return v.name.toLowerCase().split(' (')[0].trim()
}

function isFemale(v: SpeechSynthesisVoice): boolean {
  const n = v.name.toLowerCase()
  if (n.includes('female')) return true
  if (n.includes('male')) return false // „Google UK English Male"
  return FEMALE_VOICES.has(n) || FEMALE_VOICES.has(baseName(v))
}

/** Niżej = lepszy kandydat na domyślny lektor. */
function rank(v: SpeechSynthesisVoice): number {
  const n = v.name.toLowerCase()
  const idx = PREFERRED_FEMALE.indexOf(n) >= 0 ? PREFERRED_FEMALE.indexOf(n) : PREFERRED_FEMALE.indexOf(baseName(v))
  if (idx >= 0) {
    // Ten sam głos w wariancie en-GB przed en-US.
    return idx * 2 + (v.lang === 'en-GB' ? 0 : 1)
  }
  if (isFemale(v)) return 200
  if (v.lang === 'en-GB') return 300
  return 400
}

let cache: SpeechSynthesisVoice[] = []

export function englishVoices(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === 'undefined') return []
  if (!cache.length) {
    cache = speechSynthesis
      .getVoices()
      .filter((v) => v.lang.toLowerCase().startsWith('en') && !isNovelty(v))
      .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name))
  }
  return cache
}

/** Czy dany głos apka uznaje za kobiecy — Ustawienia oznaczają go w liście. */
export function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  return isFemale(v)
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.addEventListener('voiceschanged', () => {
    cache = []
    englishVoices()
  })
}

export interface SpeakOptions {
  voiceName?: string | null
  rate?: number
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()

  const u = new SpeechSynthesisUtterance(text)
  const voices = englishVoices()
  const chosen = (opts.voiceName && voices.find((v) => v.name === opts.voiceName)) || voices[0]
  if (chosen) {
    u.voice = chosen
    u.lang = chosen.lang
  } else {
    u.lang = 'en-GB'
  }
  // Wolniej niż domyślnie — dziecko musi zdążyć wyłapać dźwięki.
  u.rate = opts.rate ?? 0.85
  u.pitch = 1.1
  speechSynthesis.speak(u)
}

export function stopSpeaking(): void {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}
