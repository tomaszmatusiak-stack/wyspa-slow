# Wyspa Słów — plan rozszerzenia treści

Dokument planistyczny. Stan wyjściowy: Etap 1 wdrożony, 4 tygodnie materiału.

---

## 0. Diagnoza — gdzie dokładnie jest za mało

Nie na wyczucie, tylko z policzenia bieżącego contentu:

| Miara | Teraz | Problem |
|---|---|---|
| Słowa i zwroty | 128 | wystarcza na 4 tygodnie i ani dnia dłużej |
| Zdania | 52 | **47 słów nie występuje w ŻADNYM zdaniu** (37%) |
| Dialogi | 4 | tylko piątek ma dialog, pon–czw nie mają nic mówionego |
| Mini-teksty do czytania | 0 | brak czytania ze zrozumieniem |
| Lekcje dzienne | 20 | dzieci robią 5/tydzień → **materiał kończy się po miesiącu** |
| Zadania na lekcję | 60 | generowane z ~13 elementów → każdy wraca ~4,6× w jednej lekcji |
| Ćwiczenia mówienia | 0 | a plan z pakietu opiera się na mówieniu |

Trzy osobne problemy, które trzeba rozwiązać różnymi środkami:

1. **Płytkość** — słowo jest ćwiczone tylko jako izolowane słowo, nie w zdaniu.
2. **Krótkość** — kurs ma horyzont jednego miesiąca.
3. **Brak produkcji mowy** — dziecko klika i słucha, nigdy nic nie mówi.

---

## Faza 1 — Dogęszczenie istniejących 4 tygodni

**Cel:** żeby drugie i trzecie przejście lekcji było świeże, a każde słowo żyło w zdaniu.

| Element | Teraz | Docelowo | Uwaga |
|---|---|---|---|
| Zdania | 52 | **~150** | min. 7 na lekcję; każde nowe słowo w ≥2 zdaniach |
| Dialogi | 4 | **20** | jeden na każdy dzień, 4–6 kwestii |
| Mini-teksty | 0 | **12** | 3–5 zdań, jeden na Czw i Pt każdego tygodnia |
| Warianty zdań na wzorzec | 1 | 3–4 | `I like apples / I like bread / I don't like cheese…` |

Dwa nowe typy zadań **bez żadnego kosztu contentu** — generują się z tego, co już jest:

- **Wyszukiwanka słowna** — literowa siatka ze słowami lekcji. To Karta pracy 1B i 3B z pakietu, żywcem.
- **Krzyżówka** — hasło po polsku, wpisujesz po angielsku. Generowana z pary `pl → en`.

Plus jeden typ, który rozwiązuje problem przymiotników (patrz §6):

- **Przeciwieństwa / pary kontrastowe** — `big ↔ small`, `hot ↔ cold`, `fast ↔ slow` pokazane obok siebie.

**Charakter pracy:** 80% pisanie contentu, 20% kod (trzy typy zadań + generatory siatek).
**Efekt odczuwalny natychmiast**, bez czekania na nowe tygodnie.

---

## Faza 2 — Mówienie

Największa dziura pedagogiczna. Pakiet stoi na mówieniu („dzieci przedstawiają się sobie
nawzajem", „mini-scenka", „nagranie wideo"), a apka jest w 100% bierna.

**Nowy typ zadania: „Powiedz to" 🎤**

Przez `SpeechRecognition` (Web Speech API, `lang: 'en-GB'`):
1. Apka pokazuje obrazek albo polskie znaczenie.
2. Dziecko wciska duży przycisk mikrofonu i mówi po angielsku.
3. Apka porównuje transkrypcję ze wzorcem — z tolerancją, bo rozpoznawanie mowy dziecka
   jest zawodne (dopuszczamy odległość edycyjną 1–2 znaki, ignorujemy przedimki).
4. Trafienie → zielone. Nietrafienie → **nigdy „źle"**, tylko „posłuchaj jeszcze raz i powtórz".

Warianty: pojedyncze słowo (T1) → cała fraza (T2) → kwestia z dialogu (T3).

**Trzy rzeczy, które trzeba uczciwie założyć:**
- `SpeechRecognition` działa w Chrome i Safari, **nie w Firefoksie** → typ zadania musi
  wykrywać brak wsparcia i cicho wypadać z rundy.
- W Chrome rozpoznawanie idzie przez serwery Google, czyli **audio opuszcza urządzenie**.
  To jedyne miejsce w całej apce, gdzie coś wychodzi na zewnątrz — musi być wyłączalne
  w ustawieniach i domyślnie zapytać rodzica raz, jasnym komunikatem.
- Nie oceniamy akcentu, tylko „czy to było to słowo". Ocena wymowy dziecka przez ASR
  daje fałszywe negatywy i zniechęca.

**Charakter pracy:** 90% kod, ~0 contentu (używa istniejących słów i dialogów).

---

## Faza 3 — Tygodnie 5–20, czyli rok szkolny

To rozwiązanie problemu „kurs kończy się po miesiącu". Kręgosłupem są listy słów
**Cambridge YLE** — te same, na których stoją egzaminy Starters/Movers, więc materiał
pokrywa się z tym, czego dzieci uczą się w szkole.

| Kraina | Tygodnie | Temat | Nowa gramatyka |
|---|---|---|---|
| 5 | T5 | Szkoła i przybory | `there is / there are` |
| 6 | T6 | Godziny i plan dnia | present simple + `always / usually / never` |
| 7 | T7 | Ciało i zdrowie | `I have got`, `My head hurts` |
| 8 | T8 | Zwierzęta domowe i dzikie | `has got`, liczba mnoga nieregularna |
| 9 | T9 | Jedzenie 2 i zamawianie | `some / any`, `How many / How much` |
| 10 | T10 | Dom 2 i przyimki miejsca | `behind / next to / between` |
| 11 | T11 | Wygląd i ubrania 2 | `He has got blue eyes`, `She is wearing…` |
| 12 | T12 | Pory roku i miesiące | **present continuous** `It is raining` |
| 13 | T13 | Miasto i kierunki | `Turn left`, `Go straight on` |
| 14 | T14 | Transport i podróż | `going to` (plany) |
| 15 | T15 | Hobby i sport 2 | `like + -ing`, stopniowanie `bigger / faster` |
| 16 | T16 | Urodziny i święta | liczebniki porządkowe, daty |
| 17 | T17 | Wczoraj | **past simple**: `was / were`, `-ed` |
| 18 | T18 | Historyjki | czasowniki nieregularne: `went, saw, ate, had` |
| 19 | T19 | Przyroda i świat | stopień najwyższy `the biggest` |
| 20 | T20 | Wielka powtórka + projekt | mix; „mój rok po angielsku" |

**Budżet materiału:** ~40 nowych słów na tydzień (8 na dzień, dziś jest 6,4).

| | Słowa | Zdania | Dialogi | Lekcje |
|---|---|---|---|---|
| Dziś (T1–4) | 128 | 52 | 4 | 20 |
| Po Fazie 1 (T1–4) | 128 | ~150 | 20 | 20 |
| Po Fazie 3 (T1–20) | **~770** | **~700** | **100** | **100** |

Gdzie to sadowi dziecko: **T5–T12 domykają zakres Starters** (~460 słów),
**T13–T20 wchodzą w Movers**. Rok nauki z zapasem, ~100 dni po 45 minut.

**Charakter pracy:** prawie wyłącznie content. Kod tylko na nową gramatykę w dystraktorach
(pułapki `is/are` już są, dochodzą `has/have`, `was/were`, `-ed/-ing`, `some/any`).

---

## Faza 4 — Formy zadań pod nowy materiał

Dopiero teraz opłacalne, bo wymagają dłuższych tekstów i nowej gramatyki:

| Typ | Co dochodzi | Koszt contentu |
|---|---|---|
| **Czytanie ze zrozumieniem** | tekst 4–6 zdań + 3 pytania | wysoki (teksty) |
| **Słuchanie ze zrozumieniem** | ten sam tekst, ale tylko z lektora | zerowy (recykling) |
| **Dyktando** | usłysz zdanie → wpisz | zerowy (tylko profil 10+) |
| **Ułóż ze słuchu** | bez podpowiedzi PL, tylko audio | zerowy |
| **Historyjka / komiks** | 4–6 paneli, wybierasz kwestię | średni |
| **Znajdź na obrazku** | scena + `Find the red ball` | **wymaga ilustracji** |
| **Boss tygodnia** | 20 zadań, 3 życia, mix całej krainy | zerowy |
| **Ułóż dialog** | 6 kwestii w losowej kolejności → uporządkuj | zerowy (recykling dialogów) |

Warto zauważyć, ile z tego kosztuje **zero** nowego contentu — to recykling istniejącego
materiału w trudniejszej formie. Najlepszy stosunek efektu do pracy w całym planie.

---

## Faza 5 — Utrzymanie uwagi na 100 dni

20 dni utrzyma się samo. 100 dni nie. To, co przy krótkim kursie było ozdobą,
przy rocznym staje się konieczne:

- **Boss krainy** na koniec każdego tygodnia — coś, do czego dziecko dąży 5 dni.
- **Sklep i maskotka-smok** — kryształy muszą mieć na co iść, inaczej przestają cieszyć.
- **Odznaki i zamrażarka serii** — złamana seria po 40 dniach zniechęca definitywnie.
- **„Powtórkowy poniedziałek"** — co czwarty tydzień lekcja w 100% z powtórek SRS,
  bez nowego materiału. Silnik już to potrafi, brakuje tylko węzła na mapie.
- **Panel rodzica** przestaje być dodatkiem: przy 100 lekcjach chcesz widzieć wykres miesięczny
  i listę słów, z którymi dziecko naprawdę ma problem.
- **Eksport/import postępu do JSON** — przy kursie na rok zmiana tabletu bez utraty
  4 miesięcy pracy jest obowiązkowa.

---

## 6. Twarda bariera: emoji się skończą

Przy 128 słowach emoji wystarczały. Przy 770 nie — i to nie jest kwestia estetyki,
tylko tego, że część słów **nie da się pokazać obrazkiem**.

Szacunek na ~640 nowych słów:

| Kategoria | Ile | Rozwiązanie |
|---|---|---|
| Rzeczowniki konkretne | ~350 | emoji / OpenMoji — bez zmian |
| Czasowniki | ~120 | OpenMoji ma część akcji; resztą trzeba się zająć osobno |
| Przymiotniki | ~80 | **pary kontrastowe** — pokazujemy `big` obok `small` i wskazujemy |
| Zwroty i gramatyka | ~90 | bez obrazka, pytamy przez polski (już tak działa dla fraz) |

Wnioski, które muszą wejść **przed** Fazą 3, nie po niej:

1. **Migracja na OpenMoji SVG** (CC BY-SA, ~4000 ikon). Content trzyma tylko identyfikator
   assetu, więc to podmiana jednego pliku i katalogu ikon — ale przy 770 słowach zrobiona
   po fakcie oznacza przeklikanie 770 wpisów.
2. **Pary kontrastowe jako typ zadania** — rozwiązują przymiotniki bez rysowania czegokolwiek.
3. **Ilustrowane sceny** (6–8 sztuk, po jednej na krainę) to jedyna pozycja z realnym
   kosztem zewnętrznym. Potrzebne tylko dla „Znajdź na obrazku" — można odłożyć.

---

## 7. Jak produkować ten content, żeby się nie rozjechał

Przy 770 słowach i 700 zdaniach ręczne pilnowanie spójności przestaje działać.

- **Walidator już jest** (`validateContent()`) — wyłapuje literówki w id i słowa nieprzypisane
  do lekcji. Trzeba go rozszerzyć o: *„każde słowo występuje w ≥2 zdaniach"*,
  *„zdanie nie używa słowa wprowadzonego później"*, *„każda lekcja ma ≥7 zdań i ≥1 dialog"*.
  To ten sam mechanizm, który dziś pokazuje ostrzeżenia w konsoli w trybie dev.
- **Kolejność wprowadzania jest wiążąca** — zdanie w tygodniu 6 nie może użyć słowa
  z tygodnia 11. Dziś pilnuję tego ręcznie; przy 20 tygodniach musi to sprawdzać kod.
- **Dostawa partiami po jednej krainie** (4 tygodnie = 20 lekcji). Dzieci robią 5 lekcji
  na tydzień, więc jedna partia to miesiąc zapasu — materiał zawsze wyprzedza dzieci.
- **Twoja rola: przegląd, nie pisanie.** Po każdej partii warto sprawdzić, czy słownictwo
  pokrywa się z tym, co dzieci mają aktualnie w szkole — i podmienić, co nie pasuje.

---

## 8. Kolejność i rekomendacja

```
Faza 1  Dogęszczenie T1–T4        ← efekt odczuwalny od razu
Faza 2  Mówienie 🎤                ← największa dziura pedagogiczna
Faza 3  T5–T8 (kraina 5–8)        ← +miesiąc materiału
Faza 3  T9–T12 · T13–T16 · T17–T20
Faza 4  Nowe formy zadań           ← wchodzą wraz z tekstami
Faza 5  Motywacja na długi dystans ← zanim dzieci dojdą do 40. dnia
```

**Rekomendacja: zacznij od Fazy 1.** Powody:

- Dzieci dopiero wchodzą w tydzień 1 — materiału na tygodnie 5+ nie potrzebują *dziś*,
  a 47 słów bez ani jednego zdania to strata, która dzieje się **teraz**.
- Wyszukiwanka i krzyżówka to dwa nowe typy zadań za darmo, z kart pracy, które już masz.
- Dopiero po dogęszczeniu widać, czy 60 zadań na lekcję to dobra liczba — przy 150 zdaniach
  zamiast 52 lekcja będzie zauważalnie inna i wtedy warto skalibrować długość.

**Faza 2 (mówienie) jako druga**, bo jest tania w contencie i domyka to, co pakiet uważa
za najważniejsze — ale wymaga Twojej decyzji o wysyłaniu audio do Google.

**Migracja na OpenMoji przed pierwszą partią Fazy 3** — inaczej robi się dwa razy.
