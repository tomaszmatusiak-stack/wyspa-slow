import type { Sentence } from '../types'

/**
 * Zdania do układania z klocków. Klocek = jedno słowo razem z interpunkcją,
 * żeby dziecko nie musiało osobno wstawiać kropki.
 *
 * Dystraktory to świadome pułapki (is/are, a/an, my/your, can/can't),
 * a nie losowe słowa — inaczej zadanie uczy zgadywania zamiast gramatyki.
 */

function s(
  id: string,
  worldId: number,
  en: string,
  pl: string,
  grammarTag: string,
  distractors: string[],
): Sentence {
  return { id: `s.${id}`, worldId, en, pl, tokens: en.split(' '), distractors, grammarTag }
}

export const SENTENCES: Sentence[] = [
  // ——— Tydzień 1
  s('w1.1', 1, 'Hello! My name is Tom.', 'Cześć! Mam na imię Tom.', 'intro', ['your', 'are', 'am']),
  s('w1.2', 1, "What's your name?", 'Jak masz na imię?', 'question', ['my', 'is', 'How']),
  s('w1.3', 1, 'Nice to meet you!', 'Miło cię poznać!', 'phrase', ['me', 'your', 'too']),
  s('w1.4', 1, 'How old are you?', 'Ile masz lat?', 'question', ['is', 'much', 'am']),
  s('w1.5', 1, 'I am eight years old.', 'Mam osiem lat.', 'be.age', ['is', 'year', 'have']),
  s('w1.6', 1, 'I am ten years old.', 'Mam dziesięć lat.', 'be.age', ['are', 'year', 'has']),
  s('w1.7', 1, 'This is my mother.', 'To jest moja mama.', 'possessive', ['are', 'your', 'These']),
  s('w1.8', 1, 'This is my brother.', 'To jest mój brat.', 'possessive', ['are', 'sister', 'her']),
  s('w1.9', 1, 'Her name is Ann.', 'Ona ma na imię Ann.', 'possessive', ['His', 'are', 'my']),
  s('w1.10', 1, 'His name is Alex.', 'On ma na imię Alex.', 'possessive', ['Her', 'are', 'is not']),
  s('w1.11', 1, 'This is my family.', 'To jest moja rodzina.', 'possessive', ['are', 'friend', 'your']),
  s('w1.12', 1, 'Thank you very much!', 'Dziękuję bardzo!', 'phrase', ['you are', 'please', 'so']),
  s('w1.13', 1, 'Two plus three is five.', 'Dwa plus trzy to pięć.', 'numbers', ['four', 'are', 'six']),
  s('w1.14', 1, 'Ten minus four is six.', 'Dziesięć minus cztery to sześć.', 'numbers', ['plus', 'are', 'five']),

  // ——— Tydzień 2
  s('w2.1', 2, 'This is the kitchen.', 'To jest kuchnia.', 'article', ['a', 'are', 'garden']),
  s('w2.2', 2, 'The lamp is in my bedroom.', 'Lampa jest w mojej sypialni.', 'prep.in', ['are', 'on', 'your']),
  s('w2.3', 2, 'The table is in the garden.', 'Stół jest w ogrodzie.', 'prep.in', ['are', 'under', 'a']),
  s('w2.4', 2, 'I like apples.', 'Lubię jabłka.', 'like', ['likes', 'apple', 'am']),
  s('w2.5', 2, "I don't like cheese.", 'Nie lubię sera.', 'like.neg', ['like', 'not', 'am']),
  s('w2.6', 2, 'Do you like milk?', 'Lubisz mleko?', 'question.do', ['Does', 'likes', 'are']),
  s('w2.7', 2, 'Yes, I do.', 'Tak, lubię.', 'short.answer', ['am', 'No,', 'like']),
  s('w2.8', 2, "No, I don't.", 'Nie, nie lubię.', 'short.answer', ['do', 'Yes,', 'am']),
  s('w2.9', 2, 'Can I have bread, please?', 'Czy mogę prosić chleb?', 'request', ['Do', 'has', 'thank you']),
  s('w2.10', 2, 'Good morning! Are you hungry?', 'Dzień dobry! Jesteś głodny?', 'question.be', ['Is', 'am', 'night']),
  s('w2.11', 2, 'My favourite food is chicken.', 'Moje ulubione jedzenie to kurczak.', 'possessive', ['are', 'Your', 'cheese']),
  s('w2.12', 2, 'The window is in the living room.', 'Okno jest w salonie.', 'prep.in', ['are', 'on', 'door']),
  s('w2.13', 2, 'This is bread and cheese.', 'To jest chleb i ser.', 'article', ['are', 'or', 'a']),
  s('w2.14', 2, 'The milk is in the kitchen.', 'Mleko jest w kuchni.', 'prep.in', ['are', 'on', 'garden']),

  // ——— Tydzień 3
  s('w3.1', 3, 'I can swim.', 'Umiem pływać.', 'can', ["can't", 'am', 'swims']),
  s('w3.2', 3, "I can't ride a bike.", 'Nie umiem jeździć na rowerze.', 'can.neg', ['can', 'the', 'am']),
  s('w3.3', 3, 'Can you swim?', 'Umiesz pływać?', 'can.question', ['Do', 'swims', 'are']),
  s('w3.4', 3, 'Yes, I can!', 'Tak, umiem!', 'short.answer', ["can't", 'No,', 'am']),
  s('w3.5', 3, "No, I can't.", 'Nie, nie umiem.', 'short.answer', ['can', 'Yes,', 'do']),
  s('w3.6', 3, 'Do you play football?', 'Grasz w piłkę nożną?', 'question.do', ['Does', 'plays', 'Can']),
  s('w3.7', 3, 'Football is my favourite sport.', 'Piłka nożna to mój ulubiony sport.', 'be', ['are', 'your', 'team']),
  s('w3.8', 3, 'You are a good player.', 'Jesteś dobrym zawodnikiem.', 'be', ['is', 'an', 'coach']),
  s('w3.9', 3, "Let's play together!", 'Zagrajmy razem!', 'phrase', ['plays', 'we', 'alone']),
  s('w3.10', 3, 'My team can win.', 'Moja drużyna może wygrać.', 'can', ['wins', 'is', 'Your']),
  s('w3.11', 3, 'I like to run and jump.', 'Lubię biegać i skakać.', 'like.to', ['likes', 'or', 'runs']),
  s('w3.12', 3, 'My brother can dance.', 'Mój brat umie tańczyć.', 'can', ['dances', 'is', 'sister']),

  // ——— Tydzień 4
  s('w4.1', 4, 'It is sunny today!', 'Dziś jest słonecznie!', 'weather', ['are', 'sun', 'rainy']),
  s('w4.2', 4, "What's the weather like?", 'Jaka jest pogoda?', 'question', ['How', 'a', 'likes']),
  s('w4.3', 4, 'It is rainy and cold.', 'Jest deszczowo i zimno.', 'weather', ['are', 'or', 'hot']),
  s('w4.4', 4, 'My T-shirt is red and white.', 'Moja koszulka jest czerwono-biała.', 'colors', ['are', 'Your', 'or']),
  s('w4.5', 4, 'I go to the beach.', 'Jadę na plażę.', 'go.to', ['goes', 'a', 'in']),
  s('w4.6', 4, 'Where do you go?', 'Dokąd jedziesz?', 'question.where', ['What', 'does', 'going']),
  s('w4.7', 4, 'How much is it?', 'Ile to kosztuje?', 'question.howmuch', ['many', 'are', 'What']),
  s('w4.8', 4, "It's five zloty.", 'To pięć złotych.', 'price', ['Its', 'are', 'four']),
  s('w4.9', 4, 'Can I have a banana, please?', 'Czy mogę prosić banana?', 'request', ['an', 'Do', 'has']),
  s('w4.10', 4, 'The shop is in the city.', 'Sklep jest w mieście.', 'prep.in', ['are', 'on', 'forest']),
  s('w4.11', 4, 'My shoes are black.', 'Moje buty są czarne.', 'be.plural', ['is', 'shoe', 'white']),
  s('w4.12', 4, 'I go to the mountains.', 'Jadę w góry.', 'go.to', ['goes', 'a', 'mountain']),
]

export const SENTENCE_BY_ID = new Map(SENTENCES.map((x) => [x.id, x]))

export function getSentence(id: string): Sentence {
  const x = SENTENCE_BY_ID.get(id)
  if (!x) throw new Error(`Brak zdania o id "${id}" — sprawdź lessons.ts`)
  return x
}
