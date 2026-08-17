import type { Dialog, DialogLine } from '../types'

/**
 * Jeden dialog na każdą lekcję. Id to zawsze `d.<lessonId>`, więc worlds.ts
 * podpina je automatycznie — nie ma jak zapomnieć albo pomylić przypisania.
 *
 * Cztery dialogi z pakietu „Angielski na wakacje" siedzą na swoich piątkach
 * (d.l1.5, d.l2.5, d.l3.5, d.l4.5) w oryginalnym brzmieniu — to te same scenki,
 * które dzieci odgrywają na żywo.
 *
 * Słownictwo trzyma się tego, co dziecko już zna w danej lekcji. Drobne słówka
 * funkcyjne (for, but, too, now, very, a lot) dopuszczamy — bez nich dialogi
 * brzmiałyby jak lista słów, a polskie tłumaczenie stoi obok.
 */

type Row = [who: 'A' | 'B', en: string, pl: string]

function d(lessonId: string, title: string, rows: Row[]): Dialog {
  const lines: DialogLine[] = rows.map(([who, en, pl]) => ({ who, en, pl }))
  return {
    id: `d.${lessonId}`,
    title,
    worldId: Number(lessonId.replace(/^l/, '').split('.')[0]),
    lines,
  }
}

export const DIALOGS: Dialog[] = [
  // ——————————————————————————————— Tydzień 1 — Ja i moja rodzina
  d('l1.1', 'Pierwsze cześć', [
    ['A', 'Hello! My name is Ala.', 'Cześć! Mam na imię Ala.'],
    ['B', 'Hi! My name is Tom.', 'Cześć! Mam na imię Tom.'],
    ['A', 'Nice to meet you!', 'Miło cię poznać!'],
    ['B', 'Nice to meet you too!', 'Mnie też miło!'],
    ['A', 'Goodbye, Tom!', 'Do widzenia, Tom!'],
    ['B', 'Goodbye!', 'Do widzenia!'],
  ]),
  d('l1.2', 'Liczymy razem', [
    ['A', 'One, two, three…', 'Jeden, dwa, trzy…'],
    ['B', 'Four, five, six!', 'Cztery, pięć, sześć!'],
    ['A', 'Seven, eight, nine…', 'Siedem, osiem, dziewięć…'],
    ['B', 'Ten! Please, again!', 'Dziesięć! Proszę, jeszcze raz!'],
    ['A', 'One, two, three, four, five!', 'Jeden, dwa, trzy, cztery, pięć!'],
    ['B', 'Thank you!', 'Dziękuję!'],
  ]),
  d('l1.3', 'To moja rodzina', [
    ['A', 'This is my mother.', 'To jest moja mama.'],
    ['B', 'Hello! Nice to meet you.', 'Dzień dobry! Miło mi.'],
    ['A', 'And this is my father.', 'A to jest mój tata.'],
    ['B', 'Hello!', 'Dzień dobry!'],
    ['A', 'This is my sister and my brother.', 'To moja siostra i mój brat.'],
    ['B', 'Nice to meet you!', 'Miło mi!'],
  ]),
  d('l1.4', 'Ile masz lat?', [
    ['A', 'How old are you?', 'Ile masz lat?'],
    ['B', 'I am ten years old. And you?', 'Mam dziesięć lat. A ty?'],
    ['A', 'I am eight years old.', 'Mam osiem lat.'],
    ['B', 'My brother is twelve.', 'Mój brat ma dwanaście.'],
    ['A', 'My sister is fifteen!', 'Moja siostra ma piętnaście!'],
    ['B', 'And my grandma is twenty… no!', 'A moja babcia dwadzieścia… nie!'],
  ]),
  // z pakietu
  d('l1.5', 'Nowy kolega', [
    ['A', "Hello! My name is Kuba. What's your name?", 'Cześć! Mam na imię Kuba. Jak masz na imię?'],
    ['B', 'Hi! My name is Tom. Nice to meet you!', 'Cześć! Mam na imię Tom. Miło cię poznać!'],
    ['A', 'Nice to meet you too! How old are you?', 'Mnie też miło! Ile masz lat?'],
    ['B', 'I am ten years old. And you?', 'Mam dziesięć lat. A ty?'],
    ['A', 'I am eight. Is this your brother?', 'Ja mam osiem. Czy to twój brat?'],
    ['B', 'Yes! This is my brother. His name is Alex.', 'Tak! To mój brat. Ma na imię Alex.'],
  ]),

  // ——————————————————————————————— Tydzień 2 — Dom i jedzenie
  d('l2.1', 'Mój dom', [
    ['A', 'This is my house. This is the kitchen.', 'To mój dom. To kuchnia.'],
    ['B', 'And this?', 'A to?'],
    ['A', 'This is the bathroom.', 'To łazienka.'],
    ['B', 'Is this your bedroom?', 'To twoja sypialnia?'],
    ['A', 'Yes! And this is the garden.', 'Tak! A to ogród.'],
    ['B', 'Your garden is very big!', 'Twój ogród jest bardzo duży!'],
  ]),
  d('l2.2', 'Co jest w salonie', [
    ['A', 'Look, a big TV!', 'Patrz, wielki telewizor!'],
    ['B', 'Yes. The TV is in the living room.', 'Tak. Telewizor jest w salonie.'],
    ['A', 'And the table?', 'A stół?'],
    ['B', 'The table is in the kitchen.', 'Stół jest w kuchni.'],
    ['A', 'Where is the lamp?', 'Gdzie jest lampa?'],
    ['B', 'Next to the chair.', 'Obok krzesła.'],
  ]),
  d('l2.3', 'Przy śniadaniu', [
    ['A', 'Bread?', 'Chleb?'],
    ['B', 'Yes, please!', 'Tak, proszę!'],
    ['A', 'And cheese?', 'A ser?'],
    ['B', 'No, thank you. Milk, please.', 'Nie, dziękuję. Poproszę mleko.'],
    ['A', 'Milk and an apple.', 'Mleko i jabłko.'],
    ['B', 'Thank you!', 'Dziękuję!'],
  ]),
  d('l2.4', 'Co lubisz?', [
    ['A', 'Do you like apples?', 'Lubisz jabłka?'],
    ['B', 'Yes, I do!', 'Tak, lubię!'],
    ['A', 'Do you like cheese?', 'Lubisz ser?'],
    ['B', "No, I don't.", 'Nie, nie lubię.'],
    ['A', 'My favourite food is chicken.', 'Moje ulubione jedzenie to kurczak.'],
    ['B', 'I like chicken too!', 'Ja też lubię kurczaka!'],
  ]),
  // z pakietu
  d('l2.5', 'Śniadanie', [
    ['A', 'Good morning! Are you hungry?', 'Dzień dobry! Jesteś głodny?'],
    ['B', 'Yes! Can I have bread and cheese, please?', 'Tak! Czy mogę prosić chleb i ser?'],
    ['A', 'Here you are. Do you want milk or juice?', 'Proszę bardzo. Chcesz mleko czy sok?'],
    ['B', 'Juice, please. Thank you!', 'Sok poproszę. Dziękuję!'],
    ['A', 'Do you like apples?', 'Lubisz jabłka?'],
    ['B', 'Yes, I do! Apples are my favourite.', 'Tak! Jabłka to moje ulubione.'],
  ]),

  // ——————————————————————————————— Tydzień 3 — Sport i czas wolny
  d('l3.1', 'Na boisku', [
    ['A', 'Look, a ball!', 'Patrz, piłka!'],
    ['B', 'Yes! Football!', 'Tak! Piłka nożna!'],
    ['A', 'Are you a player?', 'Jesteś zawodnikiem?'],
    ['B', 'Yes, I am. My team is good.', 'Tak. Moja drużyna jest dobra.'],
    ['A', 'Is the match today?', 'Mecz jest dziś?'],
    ['B', 'Yes! Come and see!', 'Tak! Przyjdź i zobacz!'],
  ]),
  d('l3.2', 'Co robisz?', [
    ['A', 'I run and I jump.', 'Biegam i skaczę.'],
    ['B', 'I swim and I dance.', 'Pływam i tańczę.'],
    ['A', 'Do you sing?', 'Śpiewasz?'],
    ['B', 'Yes! And I read a lot.', 'Tak! I dużo czytam.'],
    ['A', 'I ride a bike every day.', 'Codziennie jeżdżę na rowerze.'],
    ['B', 'Me too!', 'Ja też!'],
  ]),
  d('l3.3', 'Umiesz to zrobić?', [
    ['A', 'Can you swim?', 'Umiesz pływać?'],
    ['B', 'Yes, I can! Watch me!', 'Tak, umiem! Patrz!'],
    ['A', 'Wow! Can you dance?', 'Wow! Umiesz tańczyć?'],
    ['B', "No, I can't.", 'Nie, nie umiem.'],
    ['A', 'I can dance!', 'Ja umiem tańczyć!'],
    ['B', 'Show me, please!', 'Pokaż mi, proszę!'],
  ]),
  d('l3.4', 'Ulubiony sport', [
    ['A', 'Do you play football?', 'Grasz w piłkę nożną?'],
    ['B', 'Yes! My favourite sport is football.', 'Tak! Mój ulubiony sport to piłka nożna.'],
    ['A', 'Great goal!', 'Świetny gol!'],
    ['B', "Thank you! Let's play together.", 'Dzięki! Zagrajmy razem.'],
    ['A', 'Can your brother play too?', 'Twój brat też może grać?'],
    ['B', 'Yes! He is a good player.', 'Tak! Jest dobrym zawodnikiem.'],
  ]),
  // z pakietu
  d('l3.5', 'Na treningu', [
    ['A', 'Do you play football?', 'Grasz w piłkę nożną?'],
    ['B', 'Yes! Football is my favourite sport.', 'Tak! Piłka nożna to mój ulubiony sport.'],
    ['A', 'Can you score a goal?', 'Umiesz strzelić gola?'],
    ['B', 'Yes, I can! Watch me!', 'Tak, umiem! Patrz!'],
    ['A', 'Wow! Great goal! You are a good player.', 'Wow! Świetny gol! Jesteś dobrym zawodnikiem.'],
    ['B', "Thank you! Let's play together.", 'Dzięki! Zagrajmy razem.'],
  ]),

  // ——————————————————————————————— Tydzień 4 — Wakacje i świat
  d('l4.1', 'Jaka pogoda?', [
    ['A', "What's the weather like?", 'Jaka jest pogoda?'],
    ['B', 'It is sunny!', 'Jest słonecznie!'],
    ['A', 'Is it hot?', 'Jest gorąco?'],
    ['B', 'Yes, it is very hot.', 'Tak, bardzo gorąco.'],
    ['A', 'And tomorrow?', 'A jutro?'],
    ['B', 'Rainy and cold.', 'Deszczowo i zimno.'],
  ]),
  d('l4.2', 'Ładna koszulka', [
    ['A', 'I like your T-shirt!', 'Podoba mi się twoja koszulka!'],
    ['B', 'Thank you! It is red and white.', 'Dzięki! Jest czerwono-biała.'],
    ['A', 'My shorts are blue.', 'Moje spodenki są niebieskie.'],
    ['B', 'And your shoes?', 'A twoje buty?'],
    ['A', 'My shoes are black.', 'Moje buty są czarne.'],
    ['B', 'My cap is yellow and green!', 'Moja czapka jest żółto-zielona!'],
  ]),
  d('l4.3', 'Gdzie na wakacje?', [
    ['A', 'The beach or the mountains?', 'Plaża czy góry?'],
    ['B', 'The mountains!', 'Góry!'],
    ['A', 'I like the lake.', 'Ja lubię jezioro.'],
    ['B', 'The forest is good too.', 'Las też jest dobry.'],
    ['A', 'And the city?', 'A miasto?'],
    ['B', 'No, the city is hot!', 'Nie, w mieście jest gorąco!'],
  ]),
  d('l4.4', 'Ile to kosztuje?', [
    ['A', 'Can I have water, please?', 'Czy mogę prosić wodę?'],
    ['B', 'Here you are. Anything else?', 'Proszę bardzo. Coś jeszcze?'],
    ['A', 'Yes, an apple.', 'Tak, jabłko.'],
    ['B', 'Here you are.', 'Proszę bardzo.'],
    ['A', 'How much is it?', 'Ile to kosztuje?'],
    ["B", "It's five zloty.", 'Pięć złotych.'],
  ]),
  // z pakietu
  d('l4.5', 'W sklepie', [
    ['A', 'Hello! Can I help you?', 'Dzień dobry! W czym mogę pomóc?'],
    ['B', 'Hello! Can I have a banana, please?', 'Dzień dobry! Poproszę banana.'],
    ['A', 'Here you are. Anything else?', 'Proszę bardzo. Coś jeszcze?'],
    ['B', 'Yes, water, please. How much is it?', 'Tak, poproszę wodę. Ile to kosztuje?'],
    ['A', "It's five zloty.", 'Pięć złotych.'],
    ['B', 'Here you are. Thank you! Goodbye!', 'Proszę. Dziękuję! Do widzenia!'],
  ]),

  // ——————————————————————————————— Tydzień 5 — Szkoła
  d('l5.1', 'Moja klasa', [
    ['A', 'This is my classroom.', 'To moja klasa.'],
    ['B', 'Is that your desk?', 'To twoja ławka?'],
    ['A', 'Yes. And there is the board.', 'Tak. A tam jest tablica.'],
    ['B', 'And your teacher?', 'A twój nauczyciel?'],
    ['A', 'My teacher is very good.', 'Mój nauczyciel jest bardzo dobry.'],
    ['B', 'The lesson starts now!', 'Lekcja zaczyna się teraz!'],
  ]),
  d('l5.2', 'Pożycz ołówek', [
    ['A', 'Can I have your pencil, please?', 'Czy mogę pożyczyć ołówek?'],
    ['B', 'Here you are.', 'Proszę bardzo.'],
    ['A', 'Thank you! And a rubber?', 'Dziękuję! A gumkę?'],
    ['B', 'My rubber is in my pencil case.', 'Gumka jest w moim piórniku.'],
    ['A', 'And the ruler?', 'A linijka?'],
    ['B', 'In my bag, with the scissors.', 'W plecaku, z nożyczkami.'],
  ]),
  d('l5.3', 'Ile ich jest?', [
    ['A', 'How many books are there?', 'Ile jest książek?'],
    ['B', 'There are five books.', 'Jest pięć książek.'],
    ['A', 'And how many computers?', 'A ile komputerów?'],
    ['B', 'There is one computer.', 'Jest jeden komputer.'],
    ['A', 'Is there a map?', 'Jest mapa?'],
    ['B', 'Yes, there is! Next to the picture.', 'Tak, jest! Obok obrazka.'],
  ]),
  d('l5.4', 'Ulubiony przedmiot', [
    ['A', 'Do you like maths?', 'Lubisz matematykę?'],
    ['B', 'No, maths is difficult.', 'Nie, matematyka jest trudna.'],
    ['A', 'I like English. English is easy!', 'Ja lubię angielski. Angielski jest łatwy!'],
    ['B', 'My favourite is art.', 'Mój ulubiony to plastyka.'],
    ['A', 'I like music too.', 'Ja też lubię muzykę.'],
    ['B', 'And PE! PE is the best!', 'I wf! Wf jest najlepszy!'],
  ]),
  d('l5.5', 'Na lekcji', [
    ['A', 'I listen to the teacher.', 'Słucham nauczyciela.'],
    ['B', 'I ask a question.', 'Zadaję pytanie.'],
    ['A', 'The teacher answers.', 'Nauczyciel odpowiada.'],
    ['B', 'Do you help your friend?', 'Pomagasz koledze?'],
    ['A', 'Yes! We learn together.', 'Tak! Uczymy się razem.'],
    ['B', 'Look at the board, please!', 'Patrz na tablicę, proszę!'],
  ]),

  // ——————————————————————————————— Tydzień 6 — Mój dzień
  d('l6.1', 'Rano czy wieczorem?', [
    ['A', 'Is it morning?', 'Jest rano?'],
    ['B', 'No, it is afternoon.', 'Nie, jest popołudnie.'],
    ['A', 'And now?', 'A teraz?'],
    ['B', 'Now it is evening.', 'Teraz jest wieczór.'],
    ['A', 'Good night!', 'Dobrej nocy!'],
    ['B', 'Good night! See you tomorrow.', 'Dobrej nocy! Do zobaczenia jutro.'],
  ]),
  d('l6.2', 'Jaki dziś dzień?', [
    ['A', 'What day is it today?', 'Jaki dziś dzień?'],
    ['B', 'It is Monday.', 'Poniedziałek.'],
    ['A', 'And tomorrow?', 'A jutro?'],
    ['B', 'Tuesday. Then Wednesday.', 'Wtorek. Potem środa.'],
    ['A', 'On Saturday I play football!', 'W sobotę gram w piłkę!'],
    ['B', 'And on Sunday I sleep.', 'A w niedzielę śpię.'],
  ]),
  d('l6.3', 'Która godzina?', [
    ['A', 'What time is it?', 'Która godzina?'],
    ['B', "It is three o'clock.", 'Trzecia.'],
    ['A', 'Does the lesson start now?', 'Lekcja zaczyna się teraz?'],
    ['B', 'Yes, it starts at three.', 'Tak, zaczyna się o trzeciej.'],
    ['A', 'And it finishes?', 'A kończy się?'],
    ['B', 'At half past four.', 'Wpół do piątej.'],
  ]),
  d('l6.4', 'Mój dzień', [
    ['A', "I get up at seven o'clock.", 'Wstaję o siódmej.'],
    ['B', 'I get up early too.', 'Ja też wstaję wcześnie.'],
    ['A', 'I wash and brush my teeth.', 'Myję się i myję zęby.'],
    ['B', 'And you?', 'A ty?'],
    ['A', 'I have breakfast and I go to school.', 'Jem śniadanie i idę do szkoły.'],
    ['B', 'I come home at four.', 'Wracam do domu o czwartej.'],
  ]),
  d('l6.5', 'Zawsze czy nigdy?', [
    ['A', 'Do you always do your homework?', 'Zawsze robisz zadanie domowe?'],
    ['B', 'Yes, always!', 'Tak, zawsze!'],
    ['A', 'I sometimes do it late.', 'Ja czasami robię je późno.'],
    ['B', 'I never go to bed late.', 'Ja nigdy nie idę spać późno.'],
    ['A', 'I usually go to bed early.', 'Zwykle idę spać wcześnie.'],
    ['B', 'Good! Good night!', 'Dobrze! Dobrej nocy!'],
  ]),

  // ——————————————————————————————— Tydzień 7 — Ciało i zdrowie
  d('l7.1', 'Moja twarz', [
    ['A', 'Look at my face!', 'Popatrz na moją twarz!'],
    ['B', 'You have got two eyes and one nose.', 'Masz dwoje oczu i jeden nos.'],
    ['A', 'And my hair?', 'A moje włosy?'],
    ['B', 'Your hair is long.', 'Twoje włosy są długie.'],
    ['A', 'I have got two ears too!', 'Mam też dwoje uszu!'],
    ['B', 'And one mouth. Open it!', 'I jedne usta. Otwórz je!'],
  ]),
  d('l7.2', 'Ręce i nogi', [
    ['A', 'My leg hurts.', 'Boli mnie noga.'],
    ['B', 'And your arm?', 'A ręka?'],
    ['A', 'My arm is well.', 'Ręka jest w porządku.'],
    ['B', 'Can you stand?', 'Możesz stać?'],
    ['A', 'Yes, but my knee hurts.', 'Tak, ale boli mnie kolano.'],
    ['B', 'Sit here, please.', 'Usiądź tu, proszę.'],
  ]),
  d('l7.3', 'Co się stało?', [
    ['A', "What's the matter?", 'Co się stało?'],
    ['B', 'I feel ill. I have got a headache.', 'Czuję się chory. Boli mnie głowa.'],
    ['A', 'And a toothache?', 'A ząb?'],
    ['B', 'No. Only my head hurts.', 'Nie. Boli mnie tylko głowa.'],
    ['A', 'Go to bed!', 'Idź do łóżka!'],
    ['B', 'Yes. I am very tired.', 'Tak. Jestem bardzo zmęczony.'],
  ]),
  d('l7.4', 'U lekarza', [
    ['A', "Good morning. What's the matter?", 'Dzień dobry. Co się stało?'],
    ['B', 'I feel ill, doctor.', 'Czuję się chory, panie doktorze.'],
    ['A', 'Here is your medicine.', 'Oto lekarstwo.'],
    ['B', 'Thank you, doctor.', 'Dziękuję, panie doktorze.'],
    ['A', 'You are tired. Go to bed!', 'Jesteś zmęczony. Idź do łóżka!'],
    ['B', 'And the nurse? Where is she?', 'A pielęgniarka? Gdzie ona jest?'],
  ]),
  d('l7.5', 'Jestem zmęczony', [
    ['A', 'Are you tired?', 'Jesteś zmęczony?'],
    ['B', 'Yes, I want to sleep.', 'Tak, chcę spać.'],
    ['A', 'I wake up early every day.', 'Ja budzę się wcześnie codziennie.'],
    ['B', 'I never cry, but I am tired.', 'Nigdy nie płaczę, ale jestem zmęczony.'],
    ['A', 'You always laugh!', 'Ty zawsze się śmiejesz!'],
    ['B', 'Yes! Now I am laughing.', 'Tak! Teraz się śmieję.'],
  ]),

  // ——————————————————————————————— Tydzień 8 — Zwierzęta
  d('l8.1', 'Masz zwierzaka?', [
    ['A', 'Have you got a cat?', 'Masz kota?'],
    ['B', 'No, I have got a dog.', 'Nie, mam psa.'],
    ['A', 'I have got a cat and a fish.', 'Ja mam kota i rybkę.'],
    ['B', 'My sister has got a rabbit.', 'Moja siostra ma królika.'],
    ['A', 'I like rabbits!', 'Lubię króliki!'],
    ['B', 'And my bird sings every morning.', 'A mój ptak śpiewa każdego ranka.'],
  ]),
  d('l8.2', 'Na farmie', [
    ['A', 'Look, a farm!', 'Patrz, farma!'],
    ['B', 'There are cows and pigs.', 'Są krowy i świnie.'],
    ['A', 'And a horse!', 'I koń!'],
    ['B', 'How many sheep are there?', 'Ile jest owiec?'],
    ['A', 'There are ten sheep.', 'Jest dziesięć owiec.'],
    ['B', 'And one goat, behind the hen!', 'I jedna koza, za kurą!'],
  ]),
  d('l8.3', 'W zoo', [
    ['A', 'I like the zoo.', 'Lubię zoo.'],
    ['B', 'Look at the elephant!', 'Popatrz na słonia!'],
    ['A', 'The elephant is big.', 'Słoń jest duży.'],
    ['B', 'And the monkey is small.', 'A małpa jest mała.'],
    ['A', 'The lion is my favourite!', 'Lew jest mój ulubiony!'],
    ['B', 'The giraffe is very tall.', 'Żyrafa jest bardzo wysoka.'],
  ]),
  d('l8.4', 'W wodzie i w powietrzu', [
    ['A', 'Can a penguin fly?', 'Czy pingwin umie latać?'],
    ['B', "No, it can't. But it can swim!", 'Nie umie. Ale umie pływać!'],
    ['A', 'And a bird?', 'A ptak?'],
    ['B', 'A bird can fly.', 'Ptak umie latać.'],
    ['A', 'I like dolphins and whales.', 'Lubię delfiny i wieloryby.'],
    ['B', 'The turtle is slow, but the shark is not!', 'Żółw jest wolny, ale rekin nie!'],
  ]),
  d('l8.5', 'Co robią zwierzęta', [
    ['A', 'Where do bees live?', 'Gdzie żyją pszczoły?'],
    ['B', 'On the farm and in the forest.', 'Na farmie i w lesie.'],
    ['A', 'Look, a butterfly!', 'Patrz, motyl!'],
    ['B', 'It is flying now.', 'Właśnie leci.'],
    ['A', 'I can see a spider too.', 'Widzę też pająka.'],
    ['B', 'The cat is catching it!', 'Kot go łapie!'],
  ]),

  // ——————————————————————————————— Tydzień 9 — Jedzenie i restauracja
  d('l9.1', 'Co na obiad?', [
    ['A', 'What is for breakfast?', 'Co na śniadanie?'],
    ['B', 'Rice and salad.', 'Ryż i sałatka.'],
    ['A', 'And for lunch?', 'A na obiad?'],
    ['B', 'Soup and pasta.', 'Zupa i makaron.'],
    ['A', 'I like pasta!', 'Lubię makaron!'],
    ['B', 'For dinner we have soup.', 'Na kolację jemy zupę.'],
  ]),
  d('l9.2', 'Coś na szybko', [
    ['A', 'I want a burger and chips.', 'Chcę burgera i frytki.'],
    ['B', 'I want pizza.', 'Ja chcę pizzę.'],
    ['A', 'With tomato?', 'Z pomidorem?'],
    ['B', 'Yes, tomato and onion.', 'Tak, pomidor i cebula.'],
    ['A', 'My sandwich has got carrot.', 'W mojej kanapce jest marchewka.'],
    ['B', 'And potato! I like potato.', 'I ziemniak! Lubię ziemniaki.'],
  ]),
  d('l9.3', 'Owoce', [
    ['A', 'Do you like oranges?', 'Lubisz pomarańcze?'],
    ['B', 'Yes! And strawberries.', 'Tak! I truskawki.'],
    ['A', 'I like grapes and pears.', 'Lubię winogrona i gruszki.'],
    ['B', 'My favourite is watermelon.', 'Mój ulubiony to arbuz.'],
    ['A', 'With lemon?', 'Z cytryną?'],
    ['B', 'No! Lemon is not sweet.', 'Nie! Cytryna nie jest słodka.'],
  ]),
  d('l9.4', 'Coś słodkiego', [
    ['A', 'Ice cream or cake?', 'Lody czy ciasto?'],
    ['B', 'Ice cream, please!', 'Lody, proszę!'],
    ['A', 'I want chocolate.', 'Ja chcę czekoladę.'],
    ['B', 'And a biscuit with tea.', 'I ciastko do herbaty.'],
    ['A', 'Sweets are my favourite!', 'Cukierki są moje ulubione!'],
    ['B', 'Taste the cake. It is good!', 'Spróbuj ciasta. Jest dobre!'],
  ]),
  d('l9.5', 'W restauracji', [
    ['A', 'Good afternoon. Here is the menu.', 'Dzień dobry. Oto menu.'],
    ['B', "I'd like some soup, please.", 'Poproszę zupę.'],
    ['A', 'And to drink?', 'A do picia?'],
    ['B', 'Lemonade, please. How much is it?', 'Lemoniadę. Ile to kosztuje?'],
    ['A', 'Ten zloty.', 'Dziesięć złotych.'],
    ['B', 'Here you are. Thank you!', 'Proszę. Dziękuję!'],
  ]),

  // ——————————————————————————————— Tydzień 10 — Dom i gdzie co jest
  d('l10.1', 'Nasze mieszkanie', [
    ['A', 'Is this your flat?', 'To twoje mieszkanie?'],
    ['B', 'Yes. My room is up the stairs.', 'Tak. Mój pokój jest na górze.'],
    ['A', 'Where is the key?', 'Gdzie jest klucz?'],
    ['B', 'The key is here.', 'Klucz jest tutaj.'],
    ['A', 'Your roof is red!', 'Wasz dach jest czerwony!'],
    ['B', 'And the wall is white.', 'A ściana jest biała.'],
  ]),
  d('l10.2', 'Meble', [
    ['A', 'I like your sofa.', 'Podoba mi się wasza kanapa.'],
    ['B', 'Thank you. There is a carpet too.', 'Dzięki. Jest też dywan.'],
    ['A', 'Where is the mirror?', 'Gdzie jest lustro?'],
    ['B', 'On the wall, next to the shelf.', 'Na ścianie, obok półki.'],
    ['A', 'And the pillow?', 'A poduszka?'],
    ['B', 'On the bed, of course!', 'Na łóżku, oczywiście!'],
  ]),
  d('l10.3', 'Kuchnia i łazienka', [
    ['A', 'Where is the soap?', 'Gdzie jest mydło?'],
    ['B', 'In the bathroom, next to the shower.', 'W łazience, obok prysznica.'],
    ['A', 'And the towel?', 'A ręcznik?'],
    ['B', 'On the shelf.', 'Na półce.'],
    ['A', 'Can I clean the bath?', 'Mogę umyć wannę?'],
    ['B', 'Yes, thank you! Then close the door.', 'Tak, dziękuję! Potem zamknij drzwi.'],
  ]),
  d('l10.4', 'Gdzie jest moja piłka?', [
    ['A', 'Where is my ball?', 'Gdzie jest moja piłka?'],
    ['B', 'It is under the bed.', 'Jest pod łóżkiem.'],
    ['A', "No, it isn't.", 'Nie, nie ma jej tam.'],
    ['B', 'Look behind the door!', 'Popatrz za drzwiami!'],
    ['A', 'Yes! It is behind the door.', 'Tak! Jest za drzwiami.'],
    ['B', 'And your shoes are in front of the sofa.', 'A twoje buty są przed kanapą.'],
  ]),
  d('l10.5', 'Porządki', [
    ['A', 'Put the toys in the box, please.', 'Włóż zabawki do pudełka.'],
    ['B', 'Where is the box?', 'Gdzie jest pudełko?'],
    ['A', 'Between the bed and the wall.', 'Między łóżkiem a ścianą.'],
    ['B', 'I can carry it.', 'Mogę je zanieść.'],
    ['A', 'Thank you! Now the room is clean.', 'Dziękuję! Teraz pokój jest czysty.'],
    ['B', 'The mirror is above the box.', 'Lustro jest nad pudełkiem.'],
  ]),

  // ——————————————————————————————— Tydzień 11 — Wygląd i ubrania
  d('l11.1', 'Jaki on jest?', [
    ['A', 'My brother is tall.', 'Mój brat jest wysoki.'],
    ['B', 'Is he young?', 'Jest młody?'],
    ['A', 'Yes, he is eight.', 'Tak, ma osiem lat.'],
    ['B', 'My sister is small and thin.', 'Moja siostra jest mała i chuda.'],
    ['A', 'She is pretty!', 'Jest ładna!'],
    ['B', 'And my grandpa is old.', 'A mój dziadek jest stary.'],
  ]),
  d('l11.2', 'Włosy i okulary', [
    ['A', 'She has got long hair.', 'Ona ma długie włosy.'],
    ['B', 'Is it blond?', 'Blond?'],
    ['A', 'No, it is dark and curly.', 'Nie, ciemne i kręcone.'],
    ['B', 'My hair is short and straight.', 'Moje włosy są krótkie i proste.'],
    ['A', 'And you have got glasses!', 'A ty masz okulary!'],
    ['B', 'Yes. I brush my hair every morning.', 'Tak. Czeszę włosy każdego ranka.'],
  ]),
  d('l11.3', 'Zimno dziś', [
    ['A', 'It is cold today.', 'Dziś jest zimno.'],
    ['B', 'I am wearing my jacket.', 'Mam na sobie kurtkę.'],
    ['A', 'Where is my scarf?', 'Gdzie jest mój szalik?'],
    ['B', 'With your gloves, in the coat.', 'Z rękawiczkami, w płaszczu.'],
    ['A', 'And my boots!', 'I moje kozaki!'],
    ['B', 'Take your hat too. Thank you!', 'Weź też czapkę. Dziękuję!'],
  ]),
  d('l11.4', 'Codzienne ubrania', [
    ['A', 'I am wearing a shirt and trousers.', 'Mam na sobie koszulę i spodnie.'],
    ['B', 'I am wearing a dress.', 'Ja mam sukienkę.'],
    ['A', 'Where are your socks?', 'Gdzie są twoje skarpetki?'],
    ['B', 'In my trainers!', 'W adidasach!'],
    ['A', 'My pocket has got a key.', 'W mojej kieszeni jest klucz.'],
    ['B', 'And my skirt has got two pockets.', 'A moja spódnica ma dwie kieszenie.'],
  ]),
  d('l11.5', 'Kto co ma na sobie', [
    ['A', 'What is she wearing?', 'Co ona ma na sobie?'],
    ['B', 'She is wearing a red skirt.', 'Ma czerwoną spódnicę.'],
    ['A', 'And he?', 'A on?'],
    ['B', 'He has got a blue jumper.', 'On ma niebieski sweter.'],
    ['A', 'Choose a hat, please!', 'Wybierz czapkę, proszę!'],
    ['B', 'This one. Show me! You are smiling.', 'Tę. Pokaż mi! Uśmiechasz się.'],
  ]),

  // ——————————————————————————————— Tydzień 12 — Pory roku i wczoraj
  d('l12.1', 'Ulubiona pora roku', [
    ['A', 'What is your favourite season?', 'Jaka jest twoja ulubiona pora roku?'],
    ['B', 'Summer!', 'Lato!'],
    ['A', 'I like winter.', 'Ja lubię zimę.'],
    ['B', 'Winter is cold.', 'Zima jest zimna.'],
    ['A', 'But autumn is wet!', 'Ale jesień jest mokra!'],
    ['B', 'Spring is good too.', 'Wiosna też jest dobra.'],
  ]),
  d('l12.2', 'Pierwsze miesiące', [
    ['A', 'January is cold.', 'Styczeń jest zimny.'],
    ['B', 'In February there is snow.', 'W lutym jest śnieg.'],
    ['A', 'In March it is spring!', 'W marcu jest wiosna!'],
    ['B', 'April and May are warm.', 'Kwiecień i maj są ciepłe.'],
    ['A', 'And June?', 'A czerwiec?'],
    ['B', 'In June we go to the beach!', 'W czerwcu jedziemy na plażę!'],
  ]),
  d('l12.3', 'Druga połowa roku', [
    ['A', 'July and August are hot.', 'Lipiec i sierpień są gorące.'],
    ['B', 'Yes, summer!', 'Tak, lato!'],
    ['A', 'In September I go to school.', 'We wrześniu idę do szkoły.'],
    ['B', 'October and November are wet.', 'Październik i listopad są mokre.'],
    ['A', 'In December there is snow!', 'W grudniu jest śnieg!'],
    ['B', 'I like December a lot.', 'Bardzo lubię grudzień.'],
  ]),
  d('l12.4', 'Burza', [
    ['A', "What's the weather like?", 'Jaka jest pogoda?'],
    ['B', 'There is a lot of rain.', 'Jest dużo deszczu.'],
    ['A', 'And wind?', 'A wiatr?'],
    ['B', 'Yes, and fog.', 'Tak, i mgła.'],
    ['A', 'Look, a storm!', 'Patrz, burza!'],
    ['B', 'Take your umbrella!', 'Weź parasol!'],
  ]),
  d('l12.5', 'Co było wczoraj', [
    ['A', 'What did you do yesterday?', 'Co robiłeś wczoraj?'],
    ['B', 'I played in the snow.', 'Bawiłem się na śniegu.'],
    ['A', 'Was it cold?', 'Było zimno?'],
    ['B', 'Yes, it was very cold and wet.', 'Tak, było bardzo zimno i mokro.'],
    ['A', 'I was at home. It was warm.', 'Ja byłem w domu. Było ciepło.'],
    ['B', 'We travelled to the mountains in July.', 'W lipcu pojechaliśmy w góry.'],
  ]),
]

export const DIALOG_BY_ID = new Map(DIALOGS.map((x) => [x.id, x]))
