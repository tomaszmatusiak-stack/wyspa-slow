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

  // ——— Tydzień 5 — Szkoła · there is / there are
  s('w5.1', 5, 'There is a board in the classroom.', 'W klasie jest tablica.', 'thereis', ['are', 'an', 'on']),
  s('w5.2', 5, 'There are ten pupils here.', 'Jest tu dziesięciu uczniów.', 'thereare', ['is', 'pupil', 'a']),
  s('w5.3', 5, 'My pencil is in my pencil case.', 'Mój ołówek jest w piórniku.', 'prep.in', ['are', 'on', 'your']),
  s('w5.4', 5, 'How many books are there?', 'Ile jest książek?', 'question.howmany', ['much', 'is', 'book']),
  s('w5.5', 5, 'The teacher helps the pupils.', 'Nauczyciel pomaga uczniom.', 'present.3rd', ['help', 'helping', 'a']),
  s('w5.6', 5, 'English is easy but maths is difficult.', 'Angielski jest łatwy, ale matematyka trudna.', 'conj.but', ['are', 'and', 'easy']),
  s('w5.7', 5, 'I listen to the teacher.', 'Słucham nauczyciela.', 'present', ['listens', 'at', 'a']),

  // ——— Tydzień 6 — Mój dzień · present simple + częstotliwość
  s('w6.1', 6, 'I get up at seven o’clock.', 'Wstaję o siódmej.', 'routine', ['gets', 'in', 'on']),
  s('w6.2', 6, 'She always brushes her teeth.', 'Ona zawsze myje zęby.', 'frequency', ['brush', 'never', 'his']),
  s('w6.3', 6, 'He never goes to bed late.', 'On nigdy nie idzie spać późno.', 'frequency', ['go', 'always', 'early']),
  s('w6.4', 6, 'We do our homework after school.', 'Robimy zadanie po szkole.', 'present', ['does', 'my', 'before']),
  s('w6.5', 6, 'What time is it? It is half past four.', 'Która godzina? Wpół do piątej.', 'time', ['are', 'past half', 'five']),
  s('w6.6', 6, 'On Saturday I play football.', 'W sobotę gram w piłkę.', 'prep.time', ['In', 'plays', 'Monday']),
  s('w6.7', 6, 'My sister usually walks to school.', 'Moja siostra zwykle idzie do szkoły.', 'present.3rd', ['walk', 'never', 'brother']),

  // ——— Tydzień 7 — Ciało i zdrowie · have got
  s('w7.1', 7, 'I have got a headache.', 'Boli mnie głowa.', 'havegot', ['has', 'a headaches', 'am']),
  s('w7.2', 7, 'He has got two eyes and one nose.', 'On ma dwoje oczu i jeden nos.', 'havegot.3rd', ['have', 'or', 'eye']),
  s('w7.3', 7, 'What is the matter? I feel ill.', 'Co się stało? Czuję się chory.', 'question', ['are', 'feels', 'well']),
  s('w7.4', 7, 'My tummy hurts.', 'Boli mnie brzuch.', 'present.3rd', ['hurt', 'is', 'Your']),
  s('w7.5', 7, 'The doctor gives me medicine.', 'Lekarz daje mi lekarstwo.', 'present.3rd', ['give', 'a', 'nurse']),
  s('w7.6', 7, 'She is tired and she wants to sleep.', 'Ona jest zmęczona i chce spać.', 'conj.and', ['are', 'want', 'but']),
  s('w7.7', 7, 'Wash your hands, please!', 'Umyj ręce, proszę!', 'imperative', ['Washes', 'my', 'hand']),

  // ——— Tydzień 8 — Zwierzęta · has got, can, liczba mnoga
  s('w8.1', 8, 'The elephant has got a long nose.', 'Słoń ma długi nos.', 'havegot.3rd', ['have', 'an', 'noses']),
  s('w8.2', 8, 'Birds can fly but fish cannot.', 'Ptaki umieją latać, a ryby nie.', 'can', ['flies', 'and', 'can']),
  s('w8.3', 8, 'There are five cows on the farm.', 'Na farmie jest pięć krów.', 'thereare', ['is', 'cow', 'in']),
  s('w8.4', 8, 'My cat sleeps all day.', 'Mój kot śpi cały dzień.', 'present.3rd', ['sleep', 'sleeping', 'Your']),
  s('w8.5', 8, 'I can see a monkey at the zoo.', 'Widzę małpę w zoo.', 'can', ['sees', 'on', 'a']),
  s('w8.6', 8, 'Lions live in Africa.', 'Lwy żyją w Afryce.', 'present', ['lives', 'Lion', 'on']),
  s('w8.7', 8, 'The dog is catching the ball now.', 'Pies właśnie łapie piłkę.', 'continuous', ['catches', 'are', 'catch']),

  // ——— Tydzień 9 — Jedzenie 2 · some / any
  s('w9.1', 9, 'I would like some soup, please.', 'Poproszę zupę.', 'wouldlike', ['any', 'like', 'a']),
  s('w9.2', 9, 'Have you got any apples?', 'Masz jakieś jabłka?', 'any', ['some', 'has', 'apple']),
  s('w9.3', 9, 'There is some rice on my plate.', 'Na moim talerzu jest ryż.', 'some', ['are', 'any', 'a']),
  s('w9.4', 9, 'My mother cooks dinner every day.', 'Mama gotuje kolację codziennie.', 'present.3rd', ['cook', 'cooking', 'father']),
  s('w9.5', 9, 'How much is the ice cream?', 'Ile kosztują lody?', 'question.howmuch', ['many', 'are', 'a']),
  s('w9.6', 9, 'I am eating a sandwich now.', 'Właśnie jem kanapkę.', 'continuous', ['eat', 'eats', 'is']),
  s('w9.7', 9, 'We drink tea in the evening.', 'Wieczorem pijemy herbatę.', 'present', ['drinks', 'on', 'a']),

  // ——— Tydzień 10 — Dom 2 · przyimki miejsca
  s('w10.1', 10, 'The cat is under the sofa.', 'Kot jest pod kanapą.', 'prep.place', ['are', 'on', 'a']),
  s('w10.2', 10, 'My toys are in the box.', 'Moje zabawki są w pudełku.', 'prep.place', ['is', 'on', 'toy']),
  s('w10.3', 10, 'The mirror is above the sink.', 'Lustro jest nad zlewem.', 'prep.place', ['are', 'under', 'a']),
  s('w10.4', 10, 'The key is behind the door.', 'Klucz jest za drzwiami.', 'prep.place', ['are', 'in front of', 'keys']),
  s('w10.5', 10, 'I sit between my mother and my father.', 'Siedzę między mamą a tatą.', 'prep.place', ['sits', 'or', 'next to']),
  s('w10.6', 10, 'She is cleaning her room now.', 'Ona właśnie sprząta swój pokój.', 'continuous', ['cleans', 'clean', 'is not']),
  s('w10.7', 10, 'Put the book on the shelf, please.', 'Połóż książkę na półce.', 'imperative', ['Puts', 'in', 'books']),

  // ——— Tydzień 11 — Wygląd i ubrania · present continuous
  s('w11.1', 11, 'She is wearing a red dress.', 'Ona ma na sobie czerwoną sukienkę.', 'continuous', ['wears', 'are', 'wear']),
  s('w11.2', 11, 'He has got short dark hair.', 'On ma krótkie ciemne włosy.', 'havegot.3rd', ['have', 'hairs', 'long']),
  s('w11.3', 11, 'My brother is tall and thin.', 'Mój brat jest wysoki i chudy.', 'be', ['are', 'or', 'short']),
  s('w11.4', 11, 'I am putting on my jacket.', 'Zakładam kurtkę.', 'continuous', ['put', 'puts', 'is']),
  s('w11.5', 11, 'They are wearing trainers today.', 'Oni mają dziś adidasy.', 'continuous', ['is', 'wear', 'wears']),
  s('w11.6', 11, 'She has got glasses and curly hair.', 'Ona ma okulary i kręcone włosy.', 'havegot.3rd', ['have', 'or', 'straight']),
  s('w11.7', 11, 'What is he wearing now?', 'Co on ma teraz na sobie?', 'question.continuous', ['are', 'wears', 'wear']),

  // ——— Tydzień 12 — Pory roku i pogoda 2 · past simple
  s('w12.1', 12, 'It is snowing in winter.', 'Zimą pada śnieg.', 'continuous', ['snows', 'are', 'summer']),
  s('w12.2', 12, 'Yesterday it was cold and wet.', 'Wczoraj było zimno i mokro.', 'past.be', ['is', 'were', 'dry']),
  s('w12.3', 12, 'We travelled to the mountains last summer.', 'Ostatniego lata pojechaliśmy w góry.', 'past.regular', ['travel', 'travels', 'next']),
  s('w12.4', 12, 'I played in the snow yesterday.', 'Wczoraj bawiłem się na śniegu.', 'past.regular', ['play', 'plays', 'today']),
  s('w12.5', 12, 'She went to the beach in July.', 'W lipcu pojechała na plażę.', 'past.irregular', ['go', 'goes', 'went to']),
  s('w12.6', 12, 'The children were happy in summer.', 'Dzieci były szczęśliwe latem.', 'past.be', ['was', 'is', 'winter']),
  s('w12.7', 12, 'Autumn is wet and winter is cold.', 'Jesień jest mokra, a zima zimna.', 'be', ['are', 'but', 'dry']),
]

export const SENTENCE_BY_ID = new Map(SENTENCES.map((x) => [x.id, x]))

export function getSentence(id: string): Sentence {
  const x = SENTENCE_BY_ID.get(id)
  if (!x) throw new Error(`Brak zdania o id "${id}" — sprawdź lessons.ts`)
  return x
}
