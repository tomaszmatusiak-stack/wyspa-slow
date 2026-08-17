/**
 * Lektor przez Web Speech API. Zero plików, działa offline, głosy systemowe są dobre.
 *
 * Domyślnie wybieramy **naturalny głos kobiecy**, najlepiej brytyjski — polska szkoła uczy
 * wymowy brytyjskiej, a dzieci lepiej znoszą wyższy, cieplejszy głos przez 45 minut.
 *
 * Dwie rzeczy, na których to wcześniej wykładało się na innym sprzęcie:
 *
 * 1. **Nazwy głosów są różne na każdej platformie.** macOS ma „Samantha", Windows
 *    „Microsoft Zira Desktop - English (United States)", Chrome „Google UK English Female",
 *    a macOS dokleja jeszcze zlokalizowany suffiks „Flo (angielski (Wielka Brytania))".
 *    Dopasowanie po pełnej nazwie nie miało szans — teraz szukamy imienia wśród słów nazwy.
 * 2. **Lista głosów nie jest gotowa od razu.** `getVoices()` zwraca pustą tablicę do momentu
 *    zdarzenia `voiceschanged`. Gdy pierwsze zadanie chciało mówić przed tym momentem,
 *    zostawialiśmy wybór przeglądarce — a jej domyślny głos to zwykle męski (Daniel, David).
 *    Teraz kolejkujemy wypowiedź i mówimy dopiero, gdy lista jest znana.
 */

/** Imiona kobiecych głosów w kolejności preferencji: naturalne i ciepłe najpierw. */
const FEMALE_NAMES = [
  // brytyjskie, naturalne
  'serena', 'kate', 'stephanie', 'hazel', 'libby', 'sonia', 'maisie',
  // amerykańskie i inne naturalne
  'samantha', 'ava', 'allison', 'susan', 'joelle', 'nicky', 'zoe', 'zira', 'aria', 'jenny', 'michelle',
  'karen', 'moira', 'tessa', 'fiona', 'martha', 'catherine', 'veena', 'natasha', 'clara',
  // kobiece, ale sztuczne albo mocno stylizowane (nowa „ekspresyjna" rodzina macOS)
  'kathy', 'jamie', 'flo', 'sandy', 'shelley',
]

/** Imiona głosów męskich — trafiają na koniec listy, nigdy nie zostaną wybrane automatycznie. */
const MALE_NAMES = [
  'daniel', 'david', 'mark', 'george', 'james', 'ryan', 'guy', 'alex', 'fred', 'tom', 'thomas',
  'oliver', 'arthur', 'rishi', 'gordon', 'lee', 'aaron', 'reed', 'eddy', 'rocko', 'grandpa',
  'junior', 'bruce', 'ralph', 'albert', 'jorge', 'diego', 'liam', 'william', 'brian', 'christopher',
  'eric', 'roger', 'steffan', 'connor', 'neerja',
]

/** Żartobliwe głosy macOS — nadają się do zabawy, nie do nauki wymowy. */
const NOVELTY_NAMES = [
  'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos', 'deranged', 'good news',
  'hysterical', 'jester', 'organ', 'superstar', 'trinoids', 'whisper', 'wobble', 'zarvox',
  'grandma', 'grandpa', 'junior', 'albert', 'bahh brother',
]

/** Rozbija nazwę głosu na słowa — działa dla „Microsoft Zira Desktop - English (United States)". */
function words(voice: SpeechSynthesisVoice): Set<string> {
  return new Set(
    voice.name
      .toLowerCase()
      .replace(/[^a-ząćęłńóśźż]+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean),
  )
}

const hasAny = (w: Set<string>, names: readonly string[]) =>
  names.some((n) => (n.includes(' ') ? [...w].join(' ').includes(n) : w.has(n)))

function isNovelty(v: SpeechSynthesisVoice): boolean {
  return hasAny(words(v), NOVELTY_NAMES)
}

export function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  const w = words(v)
  if (w.has('female')) return true
  if (w.has('male')) return false // „Google UK English Male"
  if (hasAny(w, MALE_NAMES)) return false
  return hasAny(w, FEMALE_NAMES)
}

/** Niżej = lepszy kandydat na domyślny lektor. */
function rank(v: SpeechSynthesisVoice): number {
  const w = words(v)
  const gb = v.lang === 'en-GB' ? 0 : 1

  const idx = FEMALE_NAMES.findIndex((n) => w.has(n))
  if (idx >= 0 && !hasAny(w, MALE_NAMES)) return idx * 2 + gb

  if (w.has('female')) return 150 + gb
  if (w.has('male') || hasAny(w, MALE_NAMES)) return 500 + gb
  return 300 + gb // płci nie znamy — lepsze niż pewny męski
}

let cache: SpeechSynthesisVoice[] = []

function refresh(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === 'undefined') return []
  cache = speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith('en') && !isNovelty(v))
    .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name))
  return cache
}

export function englishVoices(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === 'undefined') return []
  return cache.length ? cache : refresh()
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.addEventListener('voiceschanged', refresh)
  refresh()
}

export interface SpeakOptions {
  voiceName?: string | null
  rate?: number
}

/** Który głos faktycznie mówi — Ustawienia to pokazują, żeby nie trzeba było zgadywać. */
export function resolveVoice(voiceName?: string | null): SpeechSynthesisVoice | null {
  const voices = englishVoices()
  if (!voices.length) return null
  return (voiceName && voices.find((v) => v.name === voiceName)) || voices[0]
}

/** Rośnie przy każdym wywołaniu speak — starsza, jeszcze czekająca wypowiedź nie odezwie się. */
let token = 0

function utter(text: string, opts: SpeakOptions, voice: SpeechSynthesisVoice | null) {
  const u = new SpeechSynthesisUtterance(text)
  if (voice) {
    u.voice = voice
    u.lang = voice.lang
  } else {
    u.lang = 'en-GB'
  }
  // Wolniej niż domyślnie — dziecko musi zdążyć wyłapać dźwięki.
  u.rate = opts.rate ?? 0.85
  u.pitch = 1.1
  speechSynthesis.speak(u)
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()

  const mine = ++token
  const voice = resolveVoice(opts.voiceName)
  if (voice) {
    utter(text, opts, voice)
    return
  }

  // Lista głosów jeszcze się nie wczytała. Czekamy krótko, zamiast oddawać
  // wybór przeglądarce — jej domyślny głos jest zwykle męski.
  //
  // Termin liczymy zegarem, nie sumą interwałów: w karcie w tle przeglądarka
  // spowalnia timery do ~1 s, więc licznik „120 ms na tick" rozciągnąłby
  // półtorasekundowy limit do kilkunastu sekund.
  const deadline = Date.now() + 1500
  let done = false

  const fire = () => {
    if (done || mine !== token) return
    done = true
    clearInterval(tick)
    speechSynthesis.removeEventListener('voiceschanged', onVoices)
    utter(text, opts, resolveVoice(opts.voiceName))
  }

  const onVoices = () => {
    refresh()
    if (resolveVoice(opts.voiceName)) fire()
  }

  const tick = setInterval(() => {
    if (mine !== token) {
      clearInterval(tick)
      speechSynthesis.removeEventListener('voiceschanged', onVoices)
      return
    }
    if (resolveVoice(opts.voiceName) || Date.now() >= deadline) fire()
  }, 120)

  speechSynthesis.addEventListener('voiceschanged', onVoices)
}

export function stopSpeaking(): void {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
}
