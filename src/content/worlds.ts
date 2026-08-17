import type { Lesson, World } from '../types'
import { WORD_BY_ID } from './words'
import { SENTENCE_BY_ID } from './sentences'
import { DIALOG_BY_ID } from './dialogs'

/**
 * Krainy odpowiadają tygodniom planu „Angielski na wakacje", a lekcje — kolejnym dniom.
 * Jedna lekcja = jeden dzień nauki (~45 min, cztery rundy), nie cały tydzień.
 */

function L(
  id: string,
  worldId: number,
  day: string,
  title: string,
  icon: string,
  newWords: string[],
  sentences: string[],
  dialogId?: string,
): Lesson {
  return { id, worldId, day, title, icon, newWords, sentences, dialogId }
}

const N = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `numbers.${from + i}`)

export const WORLDS: World[] = [
  {
    id: 1,
    title: 'Ja i moja rodzina',
    subtitle: 'Tydzień 1',
    icon: '👨‍👩‍👧‍👦',
    hue: 'amber',
    lessons: [
      L('l1.1', 1, 'Pon', 'Przedstawiam się', '👋',
        ['greetings.hello', 'greetings.hi', 'greetings.myname', 'greetings.yourname',
         'greetings.nicemeet', 'greetings.goodbye', 'greetings.please', 'greetings.thankyou'],
        ['s.w1.1', 's.w1.2', 's.w1.3', 's.w1.12']),
      L('l1.2', 1, 'Wt', 'Liczby 1–10', '🔟', N(1, 10), ['s.w1.13']),
      L('l1.3', 1, 'Śr', 'Moja rodzina', '👪',
        ['family.mother', 'family.father', 'family.brother', 'family.sister',
         'family.grandma', 'family.grandpa', 'family.thisismy'],
        ['s.w1.7', 's.w1.8']),
      L('l1.4', 1, 'Czw', 'Liczby 11–20 i wiek', '🎂',
        [...N(11, 20), 'greetings.howold', 'greetings.iamold'],
        ['s.w1.4', 's.w1.5', 's.w1.6', 's.w1.14']),
      L('l1.5', 1, 'Pt', 'Nowy kolega', '🤝',
        ['family.family', 'family.friend', 'family.hisname', 'family.hername',
         'greetings.yes', 'greetings.no'],
        ['s.w1.9', 's.w1.10', 's.w1.11'], 'd1'),
    ],
  },
  {
    id: 2,
    title: 'Dom i jedzenie',
    subtitle: 'Tydzień 2',
    icon: '🏠',
    hue: 'emerald',
    lessons: [
      L('l2.1', 2, 'Pon', 'Pokoje w domu', '🚪',
        ['rooms.kitchen', 'rooms.bathroom', 'rooms.bedroom', 'rooms.livingroom',
         'rooms.garden', 'rooms.garage'],
        ['s.w2.1']),
      L('l2.2', 2, 'Wt', 'Przedmioty w domu', '🛋️',
        ['objects.table', 'objects.chair', 'objects.bed', 'objects.lamp',
         'objects.door', 'objects.window', 'objects.tv'],
        ['s.w2.2', 's.w2.3', 's.w2.12']),
      L('l2.3', 2, 'Śr', 'Jedzenie i picie', '🍞',
        ['food.bread', 'food.milk', 'food.cheese', 'food.apple', 'food.banana',
         'food.chicken', 'food.water', 'food.juice', 'food.egg'],
        ['s.w2.13', 's.w2.14']),
      L('l2.4', 2, 'Czw', 'Lubię / nie lubię', '❤️',
        ['likes.ilike', 'likes.idontlike', 'likes.doyoulike', 'likes.yesido',
         'likes.noidont', 'likes.favourite', 'likes.hungry'],
        ['s.w2.4', 's.w2.5', 's.w2.6', 's.w2.7', 's.w2.8', 's.w2.11']),
      L('l2.5', 2, 'Pt', 'Śniadanie', '🍽️',
        ['likes.canihave', 'likes.hereyouare', 'likes.goodmorning'],
        ['s.w2.9', 's.w2.10'], 'd2'),
    ],
  },
  {
    id: 3,
    title: 'Sport i czas wolny',
    subtitle: 'Tydzień 3',
    icon: '⚽',
    hue: 'sky',
    lessons: [
      L('l3.1', 3, 'Pon', 'Na boisku', '⚽',
        ['football.ball', 'football.goal', 'football.team', 'football.player',
         'football.match', 'football.football'],
        ['s.w3.7', 's.w3.8']),
      L('l3.2', 3, 'Wt', 'Czasowniki ruchu', '🏃',
        ['verbs.run', 'verbs.jump', 'verbs.swim', 'verbs.play',
         'verbs.ridebike', 'verbs.dance', 'verbs.sing', 'verbs.read'],
        ['s.w3.11']),
      L('l3.3', 3, 'Śr', 'Umiem / nie umiem', '💪',
        ['ability.ican', 'ability.icant', 'ability.canyou', 'ability.watchme'],
        ['s.w3.1', 's.w3.2', 's.w3.3', 's.w3.4', 's.w3.5']),
      L('l3.4', 3, 'Czw', 'Hobby i pytania', '⭐',
        ['ability.favsport', 'ability.doyouplay', 'ability.together', 'football.greatgoal'],
        ['s.w3.6', 's.w3.9', 's.w3.12']),
      L('l3.5', 3, 'Pt', 'Na treningu', '🏆',
        ['football.win', 'football.lose', 'football.coach'],
        ['s.w3.10'], 'd3'),
    ],
  },
  {
    id: 4,
    title: 'Wakacje i świat',
    subtitle: 'Tydzień 4',
    icon: '🏖️',
    hue: 'fuchsia',
    lessons: [
      L('l4.1', 4, 'Pon', 'Pogoda', '🌤️',
        ['weather.sunny', 'weather.rainy', 'weather.cloudy', 'weather.windy',
         'weather.hot', 'weather.cold', 'weather.whatweather'],
        ['s.w4.1', 's.w4.2', 's.w4.3']),
      L('l4.2', 4, 'Wt', 'Kolory i ubrania', '🎨',
        ['colors.red', 'colors.blue', 'colors.green', 'colors.yellow', 'colors.black',
         'colors.white', 'clothes.tshirt', 'clothes.shorts', 'clothes.shoes', 'clothes.cap'],
        ['s.w4.4', 's.w4.11']),
      L('l4.3', 4, 'Śr', 'Miejsca', '🗺️',
        ['places.beach', 'places.mountains', 'places.lake', 'places.city', 'places.forest'],
        ['s.w4.5', 's.w4.12', 's.w4.10']),
      L('l4.4', 4, 'Czw', 'Zakupy i ceny', '🛒',
        ['places.shop', 'shopping.howmuch', 'shopping.fivezloty', 'shopping.anythingelse'],
        ['s.w4.7', 's.w4.8', 's.w4.9']),
      L('l4.5', 4, 'Pt', 'W sklepie', '🏪',
        ['shopping.igoto', 'shopping.wheredoyougo'],
        ['s.w4.6'], 'd4'),
    ],
  },
]

export const ALL_LESSONS: Lesson[] = WORLDS.flatMap((w) => w.lessons)
export const LESSON_BY_ID = new Map(ALL_LESSONS.map((l) => [l.id, l]))

/** Kolejność odblokowywania — jedna płaska ścieżka przez wszystkie krainy. */
export const LESSON_ORDER: string[] = ALL_LESSONS.map((l) => l.id)

export function lessonIndex(lessonId: string): number {
  return LESSON_ORDER.indexOf(lessonId)
}

/** Sanity-check contentu — literówka w id ma wybuchnąć od razu, nie w środku lekcji. */
export function validateContent(): string[] {
  const problems: string[] = []
  for (const lesson of ALL_LESSONS) {
    for (const id of lesson.newWords) {
      if (!WORD_BY_ID.has(id)) problems.push(`${lesson.id}: nieznane słowo "${id}"`)
    }
    for (const id of lesson.sentences) {
      if (!SENTENCE_BY_ID.has(id)) problems.push(`${lesson.id}: nieznane zdanie "${id}"`)
    }
    if (lesson.dialogId && !DIALOG_BY_ID.has(lesson.dialogId)) {
      problems.push(`${lesson.id}: nieznany dialog "${lesson.dialogId}"`)
    }
  }
  const usedWords = new Set(ALL_LESSONS.flatMap((l) => l.newWords))
  for (const id of WORD_BY_ID.keys()) {
    if (!usedWords.has(id)) problems.push(`słowo "${id}" nie jest w żadnej lekcji`)
  }
  const usedSentences = new Set(ALL_LESSONS.flatMap((l) => l.sentences))
  for (const id of SENTENCE_BY_ID.keys()) {
    if (!usedSentences.has(id)) problems.push(`zdanie "${id}" nie jest w żadnej lekcji`)
  }
  return problems
}
