import type { Word, WordCategory } from '../types'

/**
 * Słownictwo odwzorowuje 4 tygodnie planu "Angielski na wakacje".
 * Kolejność w tablicy = kolejność wprowadzania w lekcjach.
 */

type Row = [id: string, en: string, pl: string, asset: string, kind?: 'phrase']

function make(worldId: number, category: WordCategory, rows: Row[]): Word[] {
  return rows.map(([id, en, pl, asset, kind]) => ({
    id: `${category}.${id}`,
    en,
    pl,
    asset,
    category,
    worldId,
    kind: kind ?? 'word',
  }))
}

// ——————————————————————————————— Tydzień 1 — Ja i moja rodzina

const greetings = make(1, 'greetings', [
  ['hello', 'hello', 'cześć', '👋'],
  ['hi', 'hi', 'cześć (krótko)', '🙋'],
  ['goodbye', 'goodbye', 'do widzenia', '🚪'],
  ['myname', 'my name is', 'mam na imię', '🏷️', 'phrase'],
  ['yourname', "what's your name?", 'jak masz na imię?', '❓🙂', 'phrase'],
  ['nicemeet', 'nice to meet you', 'miło cię poznać', '🤝', 'phrase'],
  ['howold', 'how old are you?', 'ile masz lat?', '🎂', 'phrase'],
  ['iamold', 'I am eight years old', 'mam osiem lat', '8️⃣🎈', 'phrase'],
  ['yes', 'yes', 'tak', '✅'],
  ['no', 'no', 'nie', '❌'],
  ['please', 'please', 'proszę', '🙏'],
  ['thankyou', 'thank you', 'dziękuję', '😊', 'phrase'],
])

const family = make(1, 'family', [
  ['mother', 'mother', 'mama', '👩'],
  ['father', 'father', 'tata', '👨'],
  ['brother', 'brother', 'brat', '👦'],
  ['sister', 'sister', 'siostra', '👧'],
  ['grandma', 'grandma', 'babcia', '👵'],
  ['grandpa', 'grandpa', 'dziadek', '👴'],
  ['family', 'family', 'rodzina', '👨‍👩‍👧‍👦'],
  ['friend', 'friend', 'kolega / przyjaciel', '🧑‍🤝‍🧑'],
  ['thisismy', 'this is my...', 'to jest mój / moja...', '👉', 'phrase'],
  ['hisname', 'his name is', 'on ma na imię', '🙋‍♂️', 'phrase'],
  ['hername', 'her name is', 'ona ma na imię', '🙋‍♀️', 'phrase'],
])

const numbers = make(1, 'numbers', [
  ['1', 'one', 'jeden', '1️⃣'],
  ['2', 'two', 'dwa', '2️⃣'],
  ['3', 'three', 'trzy', '3️⃣'],
  ['4', 'four', 'cztery', '4️⃣'],
  ['5', 'five', 'pięć', '5️⃣'],
  ['6', 'six', 'sześć', '6️⃣'],
  ['7', 'seven', 'siedem', '7️⃣'],
  ['8', 'eight', 'osiem', '8️⃣'],
  ['9', 'nine', 'dziewięć', '9️⃣'],
  ['10', 'ten', 'dziesięć', '🔟'],
  ['11', 'eleven', 'jedenaście', '11'],
  ['12', 'twelve', 'dwanaście', '12'],
  ['13', 'thirteen', 'trzynaście', '13'],
  ['14', 'fourteen', 'czternaście', '14'],
  ['15', 'fifteen', 'piętnaście', '15'],
  ['16', 'sixteen', 'szesnaście', '16'],
  ['17', 'seventeen', 'siedemnaście', '17'],
  ['18', 'eighteen', 'osiemnaście', '18'],
  ['19', 'nineteen', 'dziewiętnaście', '19'],
  ['20', 'twenty', 'dwadzieścia', '20'],
])

// ——————————————————————————————— Tydzień 2 — Dom i jedzenie

const rooms = make(2, 'rooms', [
  ['kitchen', 'kitchen', 'kuchnia', '🍳'],
  ['bathroom', 'bathroom', 'łazienka', '🛁'],
  ['bedroom', 'bedroom', 'sypialnia', '🛌'],
  ['livingroom', 'living room', 'salon', '🛋️'],
  ['garden', 'garden', 'ogród', '🌳'],
  ['garage', 'garage', 'garaż', '🚗🏠'],
])

const objects = make(2, 'objects', [
  ['table', 'table', 'stół', '🍽️'],
  ['chair', 'chair', 'krzesło', '🪑'],
  ['bed', 'bed', 'łóżko', '🛏️'],
  ['lamp', 'lamp', 'lampa', '💡'],
  ['door', 'door', 'drzwi', '🚪'],
  ['window', 'window', 'okno', '🪟'],
  ['tv', 'TV', 'telewizor', '📺'],
])

const food = make(2, 'food', [
  ['bread', 'bread', 'chleb', '🍞'],
  ['milk', 'milk', 'mleko', '🥛'],
  ['cheese', 'cheese', 'ser', '🧀'],
  ['apple', 'apple', 'jabłko', '🍎'],
  ['banana', 'banana', 'banan', '🍌'],
  ['chicken', 'chicken', 'kurczak', '🍗'],
  ['water', 'water', 'woda', '💧'],
  ['juice', 'juice', 'sok', '🧃'],
  ['egg', 'egg', 'jajko', '🥚'],
])

const likes = make(2, 'likes', [
  ['ilike', 'I like...', 'lubię...', '❤️', 'phrase'],
  ['idontlike', "I don't like...", 'nie lubię...', '💔', 'phrase'],
  ['doyoulike', 'do you like...?', 'lubisz...?', '❓❤️', 'phrase'],
  ['yesido', 'yes, I do', 'tak, lubię', '👍', 'phrase'],
  ['noidont', "no, I don't", 'nie, nie lubię', '👎', 'phrase'],
  ['favourite', 'favourite', 'ulubiony', '⭐'],
  ['hungry', 'hungry', 'głodny', '😋'],
  ['canihave', 'can I have...?', 'czy mogę prosić...?', '🤲❓', 'phrase'],
  ['hereyouare', 'here you are', 'proszę bardzo', '🫱', 'phrase'],
  ['goodmorning', 'good morning', 'dzień dobry', '🌅', 'phrase'],
])

// ——————————————————————————————— Tydzień 3 — Sport i czas wolny

const football = make(3, 'football', [
  ['ball', 'ball', 'piłka', '⚽'],
  ['goal', 'goal', 'gol / bramka', '🥅'],
  ['team', 'team', 'drużyna', '👥'],
  ['player', 'player', 'zawodnik', '⛹️'],
  ['match', 'match', 'mecz', '🆚'],
  ['win', 'win', 'wygrywać', '🏆'],
  ['lose', 'lose', 'przegrywać', '😞'],
  ['coach', 'coach', 'trener', '📋'],
  ['football', 'football', 'piłka nożna', '🏟️'],
  ['greatgoal', 'great goal!', 'świetny gol!', '🎉', 'phrase'],
])

const verbs = make(3, 'verbs', [
  ['run', 'run', 'biegać', '🏃'],
  ['jump', 'jump', 'skakać', '🤸'],
  ['swim', 'swim', 'pływać', '🏊'],
  ['play', 'play', 'grać', '🎮'],
  ['ridebike', 'ride a bike', 'jeździć na rowerze', '🚴', 'phrase'],
  ['dance', 'dance', 'tańczyć', '💃'],
  ['sing', 'sing', 'śpiewać', '🎤'],
  ['read', 'read', 'czytać', '📖'],
])

const ability = make(3, 'ability', [
  ['ican', 'I can...', 'umiem...', '💪', 'phrase'],
  ['icant', "I can't...", 'nie umiem...', '🚫', 'phrase'],
  ['canyou', 'can you...?', 'czy umiesz...?', '❓💪', 'phrase'],
  ['watchme', 'watch me!', 'patrz!', '👀', 'phrase'],
  ['favsport', 'my favourite sport is...', 'mój ulubiony sport to...', '⭐⚽', 'phrase'],
  ['doyouplay', 'do you play...?', 'grasz w...?', '❓🎮', 'phrase'],
  ['together', "let's play together", 'zagrajmy razem', '🤝', 'phrase'],
])

// ——————————————————————————————— Tydzień 4 — Wakacje i świat

const weather = make(4, 'weather', [
  ['sunny', 'sunny', 'słonecznie', '☀️'],
  ['rainy', 'rainy', 'deszczowo', '🌧️'],
  ['cloudy', 'cloudy', 'pochmurno', '☁️'],
  ['windy', 'windy', 'wietrznie', '💨'],
  ['hot', 'hot', 'gorąco', '🥵'],
  ['cold', 'cold', 'zimno', '🥶'],
  ['whatweather', "what's the weather like?", 'jaka jest pogoda?', '❓🌤️', 'phrase'],
])

const colors = make(4, 'colors', [
  ['red', 'red', 'czerwony', '🔴'],
  ['blue', 'blue', 'niebieski', '🔵'],
  ['green', 'green', 'zielony', '🟢'],
  ['yellow', 'yellow', 'żółty', '🟡'],
  ['black', 'black', 'czarny', '⚫'],
  ['white', 'white', 'biały', '⚪'],
])

const clothes = make(4, 'clothes', [
  ['tshirt', 'T-shirt', 'koszulka', '👕'],
  ['shorts', 'shorts', 'spodenki', '🩳'],
  ['shoes', 'shoes', 'buty', '👟'],
  ['cap', 'cap', 'czapka z daszkiem', '🧢'],
])

const places = make(4, 'places', [
  ['beach', 'beach', 'plaża', '🏖️'],
  ['mountains', 'mountains', 'góry', '⛰️'],
  ['lake', 'lake', 'jezioro', '🏞️'],
  ['city', 'city', 'miasto', '🏙️'],
  ['forest', 'forest', 'las', '🌲'],
  ['shop', 'shop', 'sklep', '🏪'],
])

const shopping = make(4, 'shopping', [
  ['howmuch', 'how much is it?', 'ile to kosztuje?', '💰❓', 'phrase'],
  ['fivezloty', "it's five zloty", 'to pięć złotych', '💵', 'phrase'],
  ['anythingelse', 'anything else?', 'coś jeszcze?', '🛒❓', 'phrase'],
  ['igoto', 'I go to the beach', 'jadę na plażę', '🚶🏖️', 'phrase'],
  ['wheredoyougo', 'where do you go?', 'dokąd jedziesz?', '🗺️❓', 'phrase'],
])

export const WORDS: Word[] = [
  ...greetings,
  ...family,
  ...numbers,
  ...rooms,
  ...objects,
  ...food,
  ...likes,
  ...football,
  ...verbs,
  ...ability,
  ...weather,
  ...colors,
  ...clothes,
  ...places,
  ...shopping,
]

/** Etykiety kategorii po polsku — używane w sortowaniu, „co nie pasuje" i łapaniu słów. */
export const CATEGORY_LABEL: Record<WordCategory, { pl: string; icon: string }> = {
  greetings: { pl: 'Zwroty', icon: '👋' },
  family: { pl: 'Rodzina', icon: '👪' },
  numbers: { pl: 'Liczby', icon: '🔢' },
  rooms: { pl: 'Pokoje', icon: '🚪' },
  objects: { pl: 'Przedmioty', icon: '🛋️' },
  food: { pl: 'Jedzenie', icon: '🍎' },
  likes: { pl: 'Lubię i proszę', icon: '❤️' },
  football: { pl: 'Piłka nożna', icon: '⚽' },
  verbs: { pl: 'Czynności', icon: '🏃' },
  ability: { pl: 'Umiem', icon: '💪' },
  weather: { pl: 'Pogoda', icon: '🌤️' },
  colors: { pl: 'Kolory', icon: '🎨' },
  clothes: { pl: 'Ubrania', icon: '👕' },
  places: { pl: 'Miejsca', icon: '🗺️' },
  shopping: { pl: 'Zakupy', icon: '🛒' },
}

/** Angielskie nazwy liczb 1–20, do działań matematycznych. */
export const NUMBER_WORDS = numbers.map((w) => w.en)

export const WORD_BY_ID = new Map(WORDS.map((w) => [w.id, w]))

export function getWord(id: string): Word {
  const w = WORD_BY_ID.get(id)
  if (!w) throw new Error(`Brak słowa o id "${id}" — sprawdź lessons.ts`)
  return w
}
