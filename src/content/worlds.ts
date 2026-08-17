import type { Lesson, World } from '../types'
import { WORD_BY_ID } from './words'
import { SENTENCE_BY_ID } from './sentences'
import { DIALOG_BY_ID } from './dialogs'
import { VERBS } from './verbs'

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
        ['s.w1.9', 's.w1.10', 's.w1.11']),
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
        ['s.w2.9', 's.w2.10']),
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
        ['s.w3.10']),
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
        ['s.w4.6']),
    ],
  },

  // ——————————————————————————— dalsza część roku: tygodnie 5–12

  {
    id: 5,
    title: 'Szkoła',
    subtitle: 'Tydzień 5',
    icon: '🏫',
    hue: 'rose',
    lessons: [
      L('l5.1', 5, 'Pon', 'W klasie', '🚪',
        ['school.school', 'school.classroom', 'school.teacher', 'school.pupil', 'school.desk',
         'school.board', 'school.lesson'],
        ['s.w5.1', 's.w5.5']),
      L('l5.2', 5, 'Wt', 'Piórnik', '✏️',
        ['school.book', 'school.notebook', 'school.pen', 'school.pencil', 'school.pencilcase',
         'school.rubber', 'school.ruler', 'school.scissors', 'school.glue', 'school.bag'],
        ['s.w5.3']),
      L('l5.3', 5, 'Śr', 'Ile ich jest?', '🔢',
        ['school.thereis', 'school.thereare', 'school.howmany', 'school.computer',
         'school.clock', 'school.map', 'school.picture'],
        ['s.w5.2', 's.w5.4']),
      L('l5.4', 5, 'Czw', 'Przedmioty w szkole', '📚',
        ['subjects.english', 'subjects.maths', 'subjects.art', 'subjects.music', 'subjects.pe',
         'subjects.easy', 'subjects.difficult'],
        ['s.w5.6']),
      L('l5.5', 5, 'Pt', 'Co robimy w szkole', '🧑‍🏫',
        ['actions.learn', 'actions.teach', 'actions.ask', 'actions.answer', 'actions.listen',
         'actions.look', 'actions.help', 'school.homework', 'school.playground', 'school.library'],
        ['s.w5.7']),
    ],
  },
  {
    id: 6,
    title: 'Mój dzień',
    subtitle: 'Tydzień 6',
    icon: '🕐',
    hue: 'cyan',
    lessons: [
      L('l6.1', 6, 'Pon', 'Pory dnia', '🌄',
        ['time.morning', 'time.afternoon', 'time.evening', 'time.night', 'time.day', 'time.week',
         'time.today', 'time.tomorrow', 'time.yesterday'],
        ['s.w6.4']),
      L('l6.2', 6, 'Wt', 'Dni tygodnia', '🗓️',
        ['time.monday', 'time.tuesday', 'time.wednesday', 'time.thursday', 'time.friday',
         'time.saturday', 'time.sunday'],
        ['s.w6.6']),
      L('l6.3', 6, 'Śr', 'Która godzina?', '🕐',
        ['time.oclock', 'time.halfpast', 'time.whattime', 'actions.start', 'actions.finish'],
        ['s.w6.5']),
      L('l6.4', 6, 'Czw', 'Mój plan dnia', '📆',
        ['routine.brushteeth', 'routine.havebreakfast', 'routine.gotoschool', 'routine.comehome',
         'routine.dohomework', 'routine.havelunch', 'routine.havedinner', 'routine.gotobed',
         'actions.getup', 'actions.wash'],
        ['s.w6.1', 's.w6.7']),
      L('l6.5', 6, 'Pt', 'Zawsze czy nigdy?', '🔁',
        ['frequency.always', 'frequency.usually', 'frequency.sometimes', 'frequency.never',
         'frequency.early', 'frequency.late', 'actions.go', 'actions.come', 'actions.do'],
        ['s.w6.2', 's.w6.3']),
    ],
  },
  {
    id: 7,
    title: 'Ciało i zdrowie',
    subtitle: 'Tydzień 7',
    icon: '🩹',
    hue: 'orange',
    lessons: [
      L('l7.1', 7, 'Pon', 'Głowa i twarz', '🙂',
        ['body.head', 'body.hair', 'body.face', 'body.eye', 'body.ear', 'body.nose',
         'body.mouth', 'body.tooth', 'body.neck'],
        ['s.w7.2']),
      L('l7.2', 7, 'Wt', 'Ręce i nogi', '🦵',
        ['body.arm', 'body.hand', 'body.finger', 'body.leg', 'body.knee', 'body.foot',
         'body.back', 'body.tummy', 'body.heart'],
        ['s.w7.7']),
      L('l7.3', 7, 'Śr', 'Boli mnie...', '🤕',
        ['health.headache', 'health.toothache', 'health.ill', 'health.well',
         'health.whatsmatter', 'health.ifeel', 'actions.hurt', 'actions.feel'],
        ['s.w7.1', 's.w7.3', 's.w7.4']),
      L('l7.4', 7, 'Czw', 'U lekarza', '🧑‍⚕️',
        ['health.doctor', 'health.nurse', 'health.medicine', 'health.hospital',
         'health.plaster', 'health.tired'],
        ['s.w7.5']),
      L('l7.5', 7, 'Pt', 'Odpoczynek', '💤',
        ['actions.sleep', 'actions.wakeup', 'actions.cry', 'actions.laugh', 'actions.stand'],
        ['s.w7.6']),
    ],
  },
  {
    id: 8,
    title: 'Zwierzęta',
    subtitle: 'Tydzień 8',
    icon: '🐾',
    hue: 'lime',
    lessons: [
      L('l8.1', 8, 'Pon', 'Zwierzaki w domu', '🐱',
        ['animals.cat', 'animals.dog', 'animals.bird', 'animals.fish', 'animals.rabbit',
         'animals.hamster'],
        ['s.w8.4']),
      L('l8.2', 8, 'Wt', 'Na farmie', '🚜',
        ['animals.horse', 'animals.cow', 'animals.pig', 'animals.sheep', 'animals.duck',
         'animals.hen', 'animals.goat', 'animals.mouse', 'animals.farm'],
        ['s.w8.3']),
      L('l8.3', 8, 'Śr', 'W zoo', '🦁',
        ['animals.lion', 'animals.tiger', 'animals.elephant', 'animals.monkey', 'animals.bear',
         'animals.giraffe', 'animals.zebra', 'animals.crocodile', 'animals.zoo'],
        ['s.w8.1', 's.w8.5']),
      L('l8.4', 8, 'Czw', 'W wodzie i w powietrzu', '🐬',
        ['animals.shark', 'animals.whale', 'animals.dolphin', 'animals.turtle', 'animals.penguin',
         'animals.snake', 'animals.frog', 'animals.wing', 'animals.tail', 'actions.fly'],
        ['s.w8.2']),
      L('l8.5', 8, 'Pt', 'Co robią zwierzęta', '🐝',
        ['animals.spider', 'animals.bee', 'animals.butterfly', 'actions.see', 'actions.find',
         'actions.live', 'actions.walk', 'actions.sit', 'actions.catch'],
        ['s.w8.6', 's.w8.7']),
    ],
  },
  {
    id: 9,
    title: 'Jedzenie i restauracja',
    subtitle: 'Tydzień 9',
    icon: '🍕',
    hue: 'amber',
    lessons: [
      L('l9.1', 9, 'Pon', 'Posiłki', '🥣',
        ['food2.breakfast', 'food2.lunch', 'food2.dinner', 'food2.rice', 'food2.pasta',
         'food2.soup', 'food2.salad'],
        ['s.w9.3']),
      L('l9.2', 9, 'Wt', 'Coś na szybko', '🍔',
        ['food2.sandwich', 'food2.pizza', 'food2.burger', 'food2.chips', 'food2.potato',
         'food2.tomato', 'food2.carrot', 'food2.onion'],
        ['s.w9.6']),
      L('l9.3', 9, 'Śr', 'Owoce', '🍓',
        ['food2.orange', 'food2.lemon', 'food2.grapes', 'food2.strawberry', 'food2.watermelon',
         'food2.pear'],
        ['s.w9.2']),
      L('l9.4', 9, 'Czw', 'Coś słodkiego', '🍨',
        ['food2.cake', 'food2.biscuit', 'food2.sweets', 'food2.chocolate', 'food2.icecream',
         'food2.tea', 'food2.lemonade', 'actions.taste'],
        ['s.w9.5', 's.w9.7']),
      L('l9.5', 9, 'Pt', 'W restauracji', '🍴',
        ['table.plate', 'table.cup', 'table.glass', 'table.fork', 'table.spoon', 'table.menu',
         'table.some', 'table.any', 'table.idlike', 'table.howmuch2',
         'actions.eat', 'actions.drink', 'actions.cook', 'actions.buy', 'actions.want', 'actions.need'],
        ['s.w9.1', 's.w9.4']),
    ],
  },
  {
    id: 10,
    title: 'Dom i gdzie co jest',
    subtitle: 'Tydzień 10',
    icon: '🏠',
    hue: 'teal',
    lessons: [
      L('l10.1', 10, 'Pon', 'Mieszkanie', '🏢',
        ['house.flat', 'house.room', 'house.floor', 'house.wall', 'house.roof', 'house.stairs',
         'house.key'],
        ['s.w10.7']),
      L('l10.2', 10, 'Wt', 'Meble', '🛋️',
        ['house.cupboard', 'house.shelf', 'house.mirror', 'house.sofa', 'house.carpet',
         'house.curtain', 'house.pillow'],
        ['s.w10.3']),
      L('l10.3', 10, 'Śr', 'Kuchnia i łazienka', '🚿',
        ['house.fridge', 'house.cooker', 'house.bath', 'house.shower', 'house.towel', 'house.soap',
         'actions.clean', 'actions.open', 'actions.close'],
        ['s.w10.6']),
      L('l10.4', 10, 'Czw', 'Gdzie to jest?', '📍',
        ['prepositions.in', 'prepositions.on', 'prepositions.under', 'prepositions.behind',
         'prepositions.infront', 'prepositions.nextto'],
        ['s.w10.1', 's.w10.4']),
      L('l10.5', 10, 'Pt', 'Porządki', '🧹',
        ['prepositions.between', 'prepositions.near', 'prepositions.above', 'prepositions.opposite',
         'house.toy', 'house.box', 'actions.put', 'actions.carry', 'actions.make', 'actions.take'],
        ['s.w10.2', 's.w10.5']),
    ],
  },
  {
    id: 11,
    title: 'Wygląd i ubrania',
    subtitle: 'Tydzień 11',
    icon: '🧥',
    hue: 'violet',
    lessons: [
      L('l11.1', 11, 'Pon', 'Jaki jesteś?', '🙂',
        ['looks.tall', 'looks.shortperson', 'looks.big', 'looks.small', 'looks.thin',
         'looks.young', 'looks.old', 'looks.pretty'],
        ['s.w11.3']),
      L('l11.2', 11, 'Wt', 'Włosy i okulary', '👓',
        ['looks.longhair', 'looks.shorthair', 'looks.blond', 'looks.dark', 'looks.curly',
         'looks.straight', 'looks.glasses', 'actions.brush'],
        ['s.w11.2', 's.w11.6']),
      L('l11.3', 11, 'Śr', 'Ciepłe ubrania', '🧣',
        ['clothes2.jacket', 'clothes2.coat', 'clothes2.jumper', 'clothes2.scarf',
         'clothes2.gloves', 'clothes2.hat', 'clothes2.boots'],
        ['s.w11.4']),
      L('l11.4', 11, 'Czw', 'Codzienne ubrania', '👕',
        ['clothes2.shirt', 'clothes2.dress', 'clothes2.skirt', 'clothes2.trousers',
         'clothes2.socks', 'clothes2.trainers', 'clothes2.pocket'],
        ['s.w11.5']),
      L('l11.5', 11, 'Pt', 'Kto co ma na sobie', '👗',
        ['looks.hasgot', 'looks.iswearing', 'actions.wear', 'actions.give', 'actions.choose',
         'actions.smile', 'actions.show', 'actions.wait'],
        ['s.w11.1', 's.w11.7']),
    ],
  },
  {
    id: 12,
    title: 'Pory roku i wczoraj',
    subtitle: 'Tydzień 12',
    icon: '🍂',
    hue: 'sky',
    lessons: [
      L('l12.1', 12, 'Pon', 'Cztery pory roku', '🌷',
        ['seasons.spring', 'seasons.summer', 'seasons.autumn', 'seasons.winter', 'seasons.season'],
        ['s.w12.7']),
      L('l12.2', 12, 'Wt', 'Miesiące 1', '📅',
        ['seasons.january', 'seasons.february', 'seasons.march', 'seasons.april', 'seasons.may',
         'seasons.june'],
        ['s.w12.5']),
      L('l12.3', 12, 'Śr', 'Miesiące 2', '🗓️',
        ['seasons.july', 'seasons.august', 'seasons.september', 'seasons.october',
         'seasons.november', 'seasons.december'],
        ['s.w12.3']),
      L('l12.4', 12, 'Czw', 'Jaka pogoda?', '🌦️',
        ['weather2.snow', 'weather2.rain', 'weather2.wind', 'weather2.cloud', 'weather2.sun',
         'weather2.storm', 'weather2.fog', 'weather2.ice', 'weather2.itssnowing', 'weather2.itsraining'],
        ['s.w12.1']),
      L('l12.5', 12, 'Pt', 'Co było wczoraj', '⬅️',
        ['weather2.warm', 'weather2.wet', 'weather2.dry', 'weather2.umbrella', 'weather2.sunglasses',
         'actions.speak', 'actions.say', 'actions.think', 'actions.know', 'actions.write',
         'actions.draw', 'actions.travel'],
        ['s.w12.2', 's.w12.4', 's.w12.6']),
    ],
  },
]

export const ALL_LESSONS: Lesson[] = WORLDS.flatMap((w) => w.lessons)

// Każda lekcja ma dialog o id `d.<lessonId>`, więc podpinamy je automatycznie.
// Ręczne przypisywanie 60 dialogów byłoby tylko okazją do pomyłki.
for (const lesson of ALL_LESSONS) {
  const dialogId = `d.${lesson.id}`
  if (DIALOG_BY_ID.has(dialogId)) lesson.dialogId = dialogId
}

export const LESSON_BY_ID = new Map(ALL_LESSONS.map((l) => [l.id, l]))

/** Kolejność odblokowywania — jedna płaska ścieżka przez wszystkie krainy. */
export const LESSON_ORDER: string[] = ALL_LESSONS.map((l) => l.id)

export function lessonIndex(lessonId: string): number {
  return LESSON_ORDER.indexOf(lessonId)
}

/**
 * Sanity-check contentu. Przy ~450 słowach ręczne pilnowanie spójności przestaje działać,
 * więc kod sprawdza to, co dawniej sprawdzało oko: literówki w id, sieroty,
 * duplikaty i — najważniejsze — czy zdanie nie używa słowa wprowadzonego później.
 */
export function validateContent(): string[] {
  const problems: string[] = []
  const seenWord = new Set<string>()

  for (const lesson of ALL_LESSONS) {
    for (const id of lesson.newWords) {
      if (!WORD_BY_ID.has(id)) problems.push(`${lesson.id}: nieznane słowo "${id}"`)
      if (seenWord.has(id)) problems.push(`${lesson.id}: słowo "${id}" wprowadzone drugi raz`)
      seenWord.add(id)
    }
    for (const id of lesson.sentences) {
      const s = SENTENCE_BY_ID.get(id)
      if (!s) {
        problems.push(`${lesson.id}: nieznane zdanie "${id}"`)
      } else if (s.worldId > lesson.worldId) {
        problems.push(`${lesson.id}: zdanie "${id}" jest z późniejszego tygodnia (${s.worldId})`)
      }
    }
    if (lesson.dialogId && !DIALOG_BY_ID.has(lesson.dialogId)) {
      problems.push(`${lesson.id}: nieznany dialog "${lesson.dialogId}"`)
    }
    if (!lesson.sentences.length) problems.push(`${lesson.id}: lekcja bez ani jednego zdania`)
    if (!lesson.dialogId) problems.push(`${lesson.id}: lekcja bez dialogu`)
  }

  for (const id of WORD_BY_ID.keys()) {
    if (!seenWord.has(id)) problems.push(`słowo "${id}" nie jest w żadnej lekcji`)
  }
  const usedDialogs = new Set(ALL_LESSONS.map((l) => l.dialogId))
  for (const id of DIALOG_BY_ID.keys()) {
    if (!usedDialogs.has(id)) problems.push(`dialog "${id}" nie jest w żadnej lekcji`)
  }
  const usedSentences = new Set(ALL_LESSONS.flatMap((l) => l.sentences))
  for (const id of SENTENCE_BY_ID.keys()) {
    if (!usedSentences.has(id)) problems.push(`zdanie "${id}" nie jest w żadnej lekcji`)
  }
  for (const verb of VERBS) {
    if (!WORD_BY_ID.has(verb.wordId)) {
      problems.push(`odmiana wskazuje na nieznane słowo "${verb.wordId}"`)
    }
  }
  return problems
}

/** Statystyki contentu — używane w audycie i w README. */
export function contentStats() {
  return {
    slowa: WORD_BY_ID.size,
    zdania: SENTENCE_BY_ID.size,
    dialogi: DIALOG_BY_ID.size,
    czasowniki: VERBS.length,
    lekcje: ALL_LESSONS.length,
    krainy: WORLDS.length,
  }
}
