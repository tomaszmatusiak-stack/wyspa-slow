import type { Verb } from '../types'

/**
 * Odmiany czasowników. Cztery formy na czasownik wystarczają, żeby **wygenerować**
 * setki poprawnych zdań do ćwiczeń — nie trzeba pisać każdego z ręki.
 *
 * `complement` to naturalne dopełnienie do zdań generowanych automatycznie
 * („He ___ football every day."). Puste, gdy czasownik naturalnie stoi sam
 * („He ___ every day." dla sleep).
 */

interface Extra {
  stative?: boolean
  noPresentMarker?: boolean
  subjects?: string[]
}

type Row = [
  wordId: string,
  base: string,
  third: string,
  ing: string,
  past: string,
  irregular: 0 | 1,
  complement: string,
  extra?: Extra,
]

function v(rows: Row[]): Verb[] {
  return rows.map(([wordId, base, third, ing, past, irregular, complement, extra]) => ({
    wordId,
    base,
    third,
    ing,
    past,
    irregular: irregular === 1,
    complement,
    ...extra,
  }))
}

/** Podmioty nieosobowe do czasowników, które nie pasują do „he / she". */
const LEG = ['My leg', 'My tummy', 'My tooth', 'My head']
const FLYER = ['The bird', 'The plane', 'The butterfly', 'The bee']

export const VERBS: Verb[] = v([
  // ——— czasowniki z tygodnia 3 (pakiet), teraz z pełną odmianą
  ['verbs.run', 'run', 'runs', 'running', 'ran', 1, ''],
  ['verbs.jump', 'jump', 'jumps', 'jumping', 'jumped', 0, ''],
  ['verbs.swim', 'swim', 'swims', 'swimming', 'swam', 1, ''],
  ['verbs.play', 'play', 'plays', 'playing', 'played', 0, 'football'],
  ['verbs.dance', 'dance', 'dances', 'dancing', 'danced', 0, ''],
  ['verbs.sing', 'sing', 'sings', 'singing', 'sang', 1, 'a song'],
  ['verbs.read', 'read', 'reads', 'reading', 'read', 1, 'a book'],

  // ——— tydzień 5
  ['actions.learn', 'learn', 'learns', 'learning', 'learned', 0, 'English'],
  ['actions.teach', 'teach', 'teaches', 'teaching', 'taught', 1, 'maths'],
  ['actions.ask', 'ask', 'asks', 'asking', 'asked', 0, 'a question'],
  ['actions.answer', 'answer', 'answers', 'answering', 'answered', 0, 'the question'],
  ['actions.listen', 'listen', 'listens', 'listening', 'listened', 0, 'to music'],
  ['actions.look', 'look', 'looks', 'looking', 'looked', 0, 'at the board'],
  ['actions.help', 'help', 'helps', 'helping', 'helped', 0, 'the teacher'],

  // ——— tydzień 6
  ['actions.getup', 'get up', 'gets up', 'getting up', 'got up', 1, ''],
  ['actions.wash', 'wash', 'washes', 'washing', 'washed', 0, 'my hands'],
  ['actions.go', 'go', 'goes', 'going', 'went', 1, 'to school'],
  ['actions.come', 'come', 'comes', 'coming', 'came', 1, 'home'],
  ['actions.do', 'do', 'does', 'doing', 'did', 1, 'homework'],
  ['actions.start', 'start', 'starts', 'starting', 'started', 0, 'the lesson'],
  ['actions.finish', 'finish', 'finishes', 'finishing', 'finished', 0, 'the homework'],

  // ——— tydzień 7
  ['actions.sleep', 'sleep', 'sleeps', 'sleeping', 'slept', 1, ''],
  ['actions.wakeup', 'wake up', 'wakes up', 'waking up', 'woke up', 1, ''],
  ['actions.feel', 'feel', 'feels', 'feeling', 'felt', 1, 'ill', { noPresentMarker: true }],
  ['actions.hurt', 'hurt', 'hurts', 'hurting', 'hurt', 1, '', { subjects: LEG }],
  ['actions.cry', 'cry', 'cries', 'crying', 'cried', 0, ''],
  ['actions.laugh', 'laugh', 'laughs', 'laughing', 'laughed', 0, ''],
  ['actions.stand', 'stand', 'stands', 'standing', 'stood', 1, ''],

  // ——— tydzień 8
  ['actions.fly', 'fly', 'flies', 'flying', 'flew', 1, '', { subjects: FLYER }],
  ['actions.see', 'see', 'sees', 'seeing', 'saw', 1, 'a bird'],
  ['actions.find', 'find', 'finds', 'finding', 'found', 1, 'the ball'],
  ['actions.live', 'live', 'lives', 'living', 'lived', 0, 'in Poland', { stative: true, noPresentMarker: true }],
  ['actions.walk', 'walk', 'walks', 'walking', 'walked', 0, 'to school'],
  ['actions.sit', 'sit', 'sits', 'sitting', 'sat', 1, ''],
  ['actions.catch', 'catch', 'catches', 'catching', 'caught', 1, 'the ball'],

  // ——— tydzień 9
  ['actions.eat', 'eat', 'eats', 'eating', 'ate', 1, 'an apple'],
  ['actions.drink', 'drink', 'drinks', 'drinking', 'drank', 1, 'milk'],
  ['actions.cook', 'cook', 'cooks', 'cooking', 'cooked', 0, 'dinner'],
  ['actions.buy', 'buy', 'buys', 'buying', 'bought', 1, 'bread'],
  ['actions.want', 'want', 'wants', 'wanting', 'wanted', 0, 'a bike', { stative: true, noPresentMarker: true }],
  ['actions.need', 'need', 'needs', 'needing', 'needed', 0, 'a pen', { stative: true, noPresentMarker: true }],
  ['actions.taste', 'taste', 'tastes', 'tasting', 'tasted', 0, 'the soup', { noPresentMarker: true }],

  // ——— tydzień 10
  ['actions.open', 'open', 'opens', 'opening', 'opened', 0, 'the door'],
  ['actions.close', 'close', 'closes', 'closing', 'closed', 0, 'the window'],
  ['actions.clean', 'clean', 'cleans', 'cleaning', 'cleaned', 0, 'my room'],
  ['actions.put', 'put', 'puts', 'putting', 'put', 1, 'the book on the shelf'],
  ['actions.carry', 'carry', 'carries', 'carrying', 'carried', 0, 'the bag'],
  ['actions.make', 'make', 'makes', 'making', 'made', 1, 'a cake'],
  ['actions.take', 'take', 'takes', 'taking', 'took', 1, 'the key'],

  // ——— tydzień 11
  ['actions.wear', 'wear', 'wears', 'wearing', 'wore', 1, 'a jacket'],
  ['actions.give', 'give', 'gives', 'giving', 'gave', 1, 'a present'],
  ['actions.choose', 'choose', 'chooses', 'choosing', 'chose', 1, 'a dress'],
  ['actions.brush', 'brush', 'brushes', 'brushing', 'brushed', 0, 'my hair'],
  ['actions.smile', 'smile', 'smiles', 'smiling', 'smiled', 0, ''],
  ['actions.show', 'show', 'shows', 'showing', 'showed', 0, 'the picture'],
  ['actions.wait', 'wait', 'waits', 'waiting', 'waited', 0, ''],

  // ——— tydzień 12
  ['actions.speak', 'speak', 'speaks', 'speaking', 'spoke', 1, 'English'],
  ['actions.say', 'say', 'says', 'saying', 'said', 1, 'hello'],
  ['actions.think', 'think', 'thinks', 'thinking', 'thought', 1, 'about it', { noPresentMarker: true }],
  ['actions.know', 'know', 'knows', 'knowing', 'knew', 1, 'the answer', { stative: true, noPresentMarker: true }],
  ['actions.write', 'write', 'writes', 'writing', 'wrote', 1, 'a letter'],
  ['actions.draw', 'draw', 'draws', 'drawing', 'drew', 1, 'a picture'],
  ['actions.travel', 'travel', 'travels', 'travelling', 'travelled', 0, 'by train'],
])

export const VERB_BY_WORD = new Map(VERBS.map((x) => [x.wordId, x]))

/** Etykiety czasów po polsku — trzymamy jeden zestaw, żeby UI mówiło spójnie. */
export const TENSE_LABEL = {
  present: { pl: 'codziennie', icon: '🔁', marker: 'every day', hint: 'present simple' },
  continuous: { pl: 'teraz', icon: '⏱️', marker: 'now', hint: 'present continuous' },
  past: { pl: 'wczoraj', icon: '⬅️', marker: 'yesterday', hint: 'past simple' },
} as const
