# Wyspa Słów — angielski dla dzieci przez grywalizację

Dokument projektowy · wersja 5.1 (regulowany poziom wyzwania)
Stan: **Etap 1 zbudowany i zweryfikowany w przeglądarce.**

---

## 1. Czym to jest

Aplikacja-towarzysz do papierowego pakietu **„Angielski na wakacje"** — 4-tygodniowego planu
(45 min dziennie, pon–pt) dla dzieci **8 i 10 lat**, poziom podstawowy.

Apka nie zastępuje planu. Utrwala dokładnie to, co dzieci robią danego dnia offline:
te same słowa, te same zwroty, te same cztery dialogi.

**Założenia produktowe:**
- **Jedna lekcja = jeden dzień z planu, ~45 minut**, podzielone na cztery rundy po ~11 minut.
  Między rundami przerwa z nagrodą; można skończyć wcześniej i wrócić — postęp zostaje.
- Zero kar za błąd. Błędne zadanie wraca na koniec bieżącej rundy.
- Obrazek i dźwięk zawsze przed tekstem — działa, zanim dziecko nauczy się czytać po angielsku.
- Dwa profile na jednym urządzeniu, osobne postępy i różny poziom trudności.
- Wejście bez ceremonii: imię i wiek, awatar to piłka. Wybór postaci tylko opóźniał start.
- Działa offline.

---

## 2. Platforma: web (PWA)

Wybrana świadomie zamiast desktopu:

| Kryterium | Web (PWA) | Desktop (Electron/PyQt6) |
|---|---|---|
| Animacje, drag&drop, „soczystość" | świetne, tanie | PyQt6 — bolesne; Electron = i tak web |
| Tablet dziecka | tak | nie |
| Ikona na pulpicie, offline | tak (PWA) | tak |
| Głos lektora | Web Speech API, za darmo | trzeba doklejać TTS |
| Konwersja na desktop później | Tauri, ~1 dzień | — |

### Reklamy — świadoma decyzja

Apka dla dzieci w UE podlega **DSA art. 28: zakaz reklamy profilowanej dla nieletnich**.
AdSense wymaga oznaczenia *child-directed treatment* → tylko reklamy niespersonalizowane
→ RPM rzędu 0,2–1 EUR/1000 odsłon dla ruchu PL. Sensowny przychód wymagałby dziesiątek
tysięcy sesji miesięcznie — to osobny projekt marketingowy, nie efekt uboczny.

**Decyzja:** budujemy jako projekt osobisty, ale bez blokad do publikacji.
Content siedzi w `src/content/*.ts`, więc ewentualny podział free/PRO to potem kilkanaście linii.
Gdyby monetyzować: wersja PRO z dodatkowymi krainami (Lemon Squeezy) > reklamy.

---

## 3. Struktura nauki

```
Mapa → Kraina (= tydzień planu) → Lekcja (= jeden dzień) → 4 rundy + sprawdzian → Zadanie
```

### 3.1 Krainy = tygodnie, lekcje = dni

| # | Kraina | Pon | Wt | Śr | Czw | Pt |
|---|---|---|---|---|---|---|
| 1 | **Ja i moja rodzina** | Przedstawiam się | Liczby 1–10 | Moja rodzina | Liczby 11–20 i wiek | Nowy kolega *(dialog)* |
| 2 | **Dom i jedzenie** | Pokoje w domu | Przedmioty w domu | Jedzenie i picie | Lubię / nie lubię | Śniadanie *(dialog)* |
| 3 | **Sport i czas wolny** | Na boisku | Czasowniki ruchu | Umiem / nie umiem | Hobby i pytania | Na treningu *(dialog)* |
| 4 | **Wakacje i świat** | Pogoda | Kolory i ubrania | Miejsca | Zakupy i ceny | W sklepie *(dialog)* |

| # | Kraina | Pon | Wt | Śr | Czw | Pt |
|---|---|---|---|---|---|---|
| 5 | **Szkoła** | W klasie | Piórnik | Ile ich jest? | Przedmioty | Co robimy w szkole |
| 6 | **Mój dzień** | Pory dnia | Dni tygodnia | Która godzina? | Plan dnia | Zawsze czy nigdy? |
| 7 | **Ciało i zdrowie** | Głowa i twarz | Ręce i nogi | Boli mnie… | U lekarza | Odpoczynek |
| 8 | **Zwierzęta** | Zwierzaki w domu | Na farmie | W zoo | W wodzie i w powietrzu | Co robią zwierzęta |
| 9 | **Jedzenie i restauracja** | Posiłki | Coś na szybko | Owoce | Coś słodkiego | W restauracji |
| 10 | **Dom i gdzie co jest** | Mieszkanie | Meble | Kuchnia i łazienka | Gdzie to jest? | Porządki |
| 11 | **Wygląd i ubrania** | Jaki jesteś? | Włosy i okulary | Ciepłe ubrania | Codzienne ubrania | Kto co ma na sobie |
| 12 | **Pory roku i wczoraj** | Cztery pory roku | Miesiące 1 | Miesiące 2 | Jaka pogoda? | Co było wczoraj |

Zbudowane: **450 słów i zwrotów · 108 zdań · 63 czasowniki z pełną odmianą ·
60 dialogów (po jednym na lekcję, 6 kwestii każdy) · 60 lekcji dziennych w 12 krainach.** Każda lekcja generuje **60 zadań** (4 rundy × 15),
co daje **3600 zadań** w całym kursie.

### 3.1b Cztery rundy w lekcji

| Runda | Nazwa | Czym się zajmuje |
|---|---|---|
| 1 | 👀 **Poznaj** | pierwszy kontakt: słuchanie, rozpoznawanie obrazków, łączenie w pary |
| 2 | 💪 **Ćwicz** | przypominanie bez obrazka, literowanie, gry na kategorie |
| 3 | 🧩 **Zdania** | układanie zdań z klocków, uzupełnianie luk, dialog |
| 4 | 🏆 **Mistrz** | sortowanie, memory, powtórki SRS, działania po angielsku, układanie dialogu |
| — | 📋 **Sprawdzian** | 12 zadań na koniec dnia — patrz §3.1c |

Każdy dialog pracuje dwa razy: w rundzie „Zdania" jako **uzupełnianie brakującej kwestii**,
a na finał rundy „Mistrz" jako **układanie całej rozmowy po kolei**. Drugie ćwiczenie nie kosztowało
ani jednego nowego zdania — to ta sama treść w trudniejszej formie.

Każda lekcja ma **własny dialog** o id `d.<lessonId>` — worlds.ts podpina je automatycznie,
więc nie da się zapomnieć przypisania. Cztery scenki z pakietu siedzą na swoich piątkach
w oryginalnym brzmieniu. Warianty brakującej kwestii pochodzą wyłącznie z rozmów
z tygodni już poznanych: inaczej dziecko w tygodniu 1 odgadywałoby po tym, czego nie zna.

Po każdej rundzie ekran przerwy: zdobyte XP i kryształy, pasek 4 rund, wybór
„Dalej" albo „Na dziś wystarczy". Nagroda za rundę jest zapisana od razu, więc
przerwanie lekcji w połowie nie kasuje pracy — następnym razem apka wznawia od kolejnej rundy.
Gwiazdki przyznajemy dopiero za komplet czterech rund.

### 3.1c Sprawdzian na koniec dnia

Po czterech rundach przychodzi **sprawdzian z wiedzy dnia** — i to jego wynik daje ocenę
oraz gwiazdki. Rundy są nauką z podpowiedziami; sprawdzian sprawdza, co z tego zostało w głowie.

Reguły są celowo inne niż w rundach:

| | Rundy | Sprawdzian |
|---|---|---|
| Podpowiedź po polsku w zdaniach | tak (T1) | **nie** |
| Ułatwianie po 3 błędach | tak | **nie** |
| Błędne zadanie wraca w kolejce | tak | **nie — każde pytanie raz** |
| Typ pytania | rozpoznawanie i produkcja | **tylko produkcja** (PL→EN, pisanie, zdanie bez wzoru) |
| Długość | 15 zadań | 12 zadań |

Skład: 4 × PL→EN · 2 × literowanie · 2 × zdanie z pełnym zestawem pułapek ·
2 × forma czasownika · 1 × luka w zdaniu · 1 × brakująca kwestia dialogu.

**Ocena w polskiej skali** — dzieci znają ją ze szkoły, więc nie trzeba jej tłumaczyć.
Progi są łagodniejsze niż szkolne, bo w apce część błędów bierze się z chybionego stuknięcia:

| Wynik | Ocena | Gwiazdki |
|---|---|---|
| 11–12 / 12 | **6** celujący | ⭐⭐⭐ |
| 10 / 12 | **5** bardzo dobry | ⭐⭐⭐ |
| 8–9 / 12 | **4** dobry | ⭐⭐ |
| 6–7 / 12 | **3** dostateczny | ⭐⭐ |
| 4–5 / 12 | **2** dopuszczający | ⭐ |
| ≤ 3 / 12 | **1** niedostateczny | ⭐ |

Przy ocenie 1 lub 2 nie ma morałów, tylko „ten dzień warto powtórzyć — wróć tu jutro".
Sprawdzian można powtarzać, a gwiazdki biorą najlepszy wynik.

Wyjście przed sprawdzianem zapisuje stan: ponowne wejście w lekcję startuje **wprost od sprawdzianu**,
bez przeklikiwania rund od nowa.

### 3.2 Trzy stopnie trudności wewnątrz zadania

To sedno różnicowania — nie osobne „poziomy", tylko ta sama treść w coraz trudniejszej formie:

- **T1 Rozpoznanie** — obrazek → wybór z 3, podpowiedź PL, audio automatyczne.
- **T2 Przypomnienie** — audio lub PL → wybór z 4, układanie z gotowych klocków.
- **T3 Produkcja** — wpisanie z klawiatury, zdanie bez wzoru, memory EN↔PL.

Awans T1→T2→T3 dzieje się **per element**, na podstawie pudełka SRS.

**Różnicowanie 8 vs 10 lat pochodzi wprost z planu** („8-latek: mówi i słucha, może odpowiadać
ustnie zamiast pisać. 10-latek: pisze i układa własne zdania"), więc profil ma sufit trudności:

| Wiek | `maxTier` | Skutek |
|---|---|---|
| ≤ 9 | 2 | literowanie tylko z klocków, memory obrazek↔EN, zdania z podpowiedzią PL |
| ≥ 10 | 3 | wpisywanie z klawiatury, memory EN↔PL, zdania bez wzoru z pułapkami |

Do przestawienia ręcznie w ustawieniach.

### 3.2a Poziom wyzwania — druga, niezależna oś

`maxTier` odpowiada na pytanie „czy dziecko pisze". **Poziom wyzwania** odpowiada na inne:
„ile jest opcji do wyboru i ile pułapek". To dwie różne rzeczy — 8-latek może nie chcieć pisać,
a jednocześnie nudzić się przy trzech opcjach.

| | Spokojny | **Normalny** (domyślny) | Ambitny |
|---|---|---|---|
| opcji przy T1 / T2 / T3 | 3 / 4 / 5 | **4 / 5 / 6** | 5 / 6 / 8 |
| klocków-pułapek w zdaniu (T1/T2/T3) | 0 / 2 / 4 | **1 / 3 / 6** | 3 / 5 / 8 |
| zbędnych liter w literowaniu | 0 / 2 / 3 | **1 / 3 / 4** | 2 / 4 / 5 |
| par w memory | 3–5 | **4–6** | 5–6 |
| podpowiedź PL przy pierwszym kontakcie | tak | **tak** | nie |
| ułatwianie po serii błędów | po 3 | **po 4** | nigdy |

Gdy zdanie ma mniej własnych pułapek niż wymaga poziom, generator dosypuje słówka funkcyjne
(`is/are`, `a/an`, `my/your`) — nie zostawia rundy łatwiejszej niż ustawiono.

### 3.2b Odmiany czasowników i trzy czasy

Osobna tabela `src/content/verbs.ts`: **63 czasowniki × 4 formy** (base, he/she, -ing, past).
Z czterech form generator (`src/engine/verbDrills.ts`) **produkuje zdania sam** — dlatego
kilkadziesiąt wierszy tabeli daje setki poprawnych, celowanych zadań gramatycznych,
bez pisania każdego zdania z ręki.

| Czas | Marker w zdaniu | Etykieta w apce |
|---|---|---|
| present simple | `every day` | 🔁 codziennie |
| present continuous | `now` | ⏱️ teraz |
| past simple | `yesterday` | ⬅️ wczoraj |

Czasy wchodzą **stopniowo**: present od tygodnia 3, continuous od 6, past od 9.
Bez tego dziecko dostawałoby trzy czasy naraz w tygodniu, w którym poznaje pierwsze czasowniki.

Dystraktory to **pozostałe formy tego samego czasownika** — dokładnie te, które dziecko myli.
Losowe słowa uczyłyby tylko eliminowania bzdur.

Generator zna trzy pułapki, które inaczej produkowałyby zły angielski:
- **czasowniki stanu** (`know`, `want`, `need`, `live`) nie dostają present continuous —
  „I am knowing" nie może powstać;
- **`every day` nie pasuje do wszystkiego** — „He lives in Poland every day" brzmi źle,
  więc część czasowników nie bierze markera;
- **podmiot nieosobowy** — `hurt` dostaje „My leg / My tummy", `fly` dostaje „The bird / The plane",
  bo „He hurts every day" nie znaczy tego, co powinno.

### 3.3 Powtórki (SRS)

Leitner, 5 pudełek, interwały **1 → 3 → 7 → 14 → 30 dni**.
Błąd cofa do pudełka 1 (nie do zera — jedna pomyłka nie kasuje dorobku).
Lekcja dokłada do 4 elementów należnych dziś z wcześniejszych lekcji.

---

## 4. Typy zadań

**Zbudowane (16):**

| Typ | Co robi | Skąd |
|---|---|---|
| **Posłuchaj i wskaż** | lektor mówi EN, dziecko klika kartę obrazek+PL | rozumienie ze słuchu |
| **Quiz obrazkowy** | obrazek→słowo, słowo→obrazek, PL→słowo | 3 / 4 / 6 opcji wg tieru |
| **Memory** | pary **obrazek ↔ EN** (nie dwa obrazki) | plan: „gra memory z fiszek" |
| **Połącz w pary** | dwie kolumny, stukasz element z lewej i z prawej | Karty pracy 1A, 2A, 3A |
| **Puzzle zdaniowe** | układanie zdania z klocków | T1 klocki + PL · T2 +2 pułapki · T3 wszystkie pułapki |
| **Uzupełnij zdanie** | luka trafia w słowo funkcyjne (`is/are`, `a/an`, `can/can't`) | Karty pracy 2B, 3A |
| **Literowanie** | kafelki liter albo klawiatura | Karta pracy 2A (LBTAE → table) |
| **Co tu nie pasuje?** | 4 elementy, jeden z innej kategorii | ćwiczenie kategorii |
| **Do którego koszyka?** | element leci pojedynczo, stukasz koszyk-kategorię | sortowanie bez przeciągania |
| **Złap wszystkie słowa** | bąbelki z kategorią do wyłapania | rozładowanie w środku rundy |
| **Policz po angielsku** | `eight + two = ?` z angielskimi liczebnikami | Karta pracy 1A, zadanie 3 |
| **Dialog z luką** | cała rozmowa, jedna kwestia wycięta | jeden dialog na każdą lekcję |
| **Ułóż rozmowę po kolei** | pierwsza kwestia dana, resztę wskazujesz w kolejności | ten sam dialog, zero nowej treści |
| **Wybierz właściwą formę** | `My sister ___ an apple every day.` → plays / play / playing | odmiana czasownika |
| **Odmień czasownik** | trzy formy naraz: on/ona · teraz · wczoraj | tabelka odmiany |
| **Kiedy to się dzieje?** | zdanie → codziennie / teraz / wczoraj | rozpoznawanie czasu |

Wszystko działa **przez dotknięcie, nie przeciąganie**. Na tablecie przeciąganie zawsze kończy się
zgubionym elementem; stuknięcie działa identycznie palcem i myszą.

Dwie decyzje wyciągnięte z testów:
- w „Połącz w pary" **zaznaczenie zostaje po nietrafionej parze** — inaczej dziecko musiałoby
  stukać ten sam element od nowa przy każdej próbie;
- pierwsza lekcja (Pon, tydzień 1) ma z natury mniej typów — istnieje wtedy tylko jedna
  kategoria słów, więc sortowanie, „co nie pasuje" i bąbelki nie mają z czego powstać.
  Od wtorku dostępny jest pełny zestaw.

**Do dołożenia:** „Uratuj kotka" (wisielec bez wisielca) · Znajdź na obrazku · komiks · Boss krainy.

### Skład rundy

Round-robin trzyma typy w rotacji, więc dwa te same nigdy nie stoją obok siebie.
Runda ma zawsze 15 zadań — lekcje z dwoma nowymi zwrotami (np. piątkowe) dobierają
resztę z wcześniej poznanych słów, żeby dzień nie był krótszy. Z powtórkami błędów sufit to 22.

### Dobór dystraktorów

Dystraktor zawsze z tej samej kategorii semantycznej. `dog → cat, horse` uczy;
`dog → blue, run, table` uczy tylko eliminowania bzdur.
W zdaniach pułapki są konkretne: `is/are`, `a/an`, `my/your`, `can/can't`, `like/likes`.
W literowaniu litery mylone przez polskie dzieci: `c/k`, `s/z`, `f/v`, `i/y`, `b/p`.
Kategoria jest brana z **całego materiału**, nie tylko ze słów już poznanych. Wcześniej było
odwrotnie i w pierwszej lekcji dawało to wybór „hi albo hello" — bo znanych słów było osiem,
wszystkie z jednej kategorii. Nieznane słowo jako błędna opcja niczego nie psuje: i tak jest błędne,
a wybór przestaje być trywialny. Kolejność preferencji: znane z tej kategorii → cała kategoria →
znane z krainy → cała kraina → cokolwiek.

---

## 5. Grywalizacja

**Zbudowane:** XP + poziomy gracza · kryształy 💎 (za każdą rundę i za domknięty dzień) ·
⭐1–3 za lekcję liczone ze **skuteczności**, nie z liczby błędów (przy 60 zadaniach „najwyżej
jeden błąd" byłoby nie do osiągnięcia: ≥90% = 3 gwiazdki, ≥75% = 2) · seria dni 🔥 ·
cel dzienny · mapa z dniami tygodnia i kropkami postępu rund ·
zmienne pochwały (plan: „chwal za próby, nie tylko za poprawność").

**Seria dni respektuje plan pon–pt.** Weekend w pakiecie jest luźny („bez lekcji"),
więc seria nie pęka za nieklikanie w sobotę — zeruje się dopiero po **opuszczonym dniu roboczym**.

**Powtórka lekcji daje 30% XP i tylko tyle kryształów, ile gwiazdek** — dziecko ma wracać
po lepszy wynik, nie farmić najłatwiejszą lekcję. Gwiazdki nigdy się nie obniżają.

**Do dołożenia:** zamrażarka serii · sklep za kryształy · maskotka-smok (ewolucja na poziomach 5/15/30) ·
odznaki · lokalne porównanie postępu tygodniowego między profilami.

---

## 6. Anty-frustracja

- **3 błędy pod rząd** → reszta lekcji leci w łatwiejszym wariancie (mniej opcji, wraca podpowiedź PL,
  klawiatura zamienia się w klocki). Na ekranie pojawia się „Robimy trochę łatwiej 💛".
- **5 poprawnych pod rząd** → ułatwienie się wyłącza.
- Błędne zadanie wraca **raz** na koniec rundy. Powtórka nigdy nie dokleja kolejnej powtórki.
- **Brak timerów** w samych zadaniach.
- **Limit 15 minut na rundę** — po nim runda się domyka i apka proponuje przerwę.
- Przerwy między rundami są naturalnym miejscem, żeby wstać od ekranu.

---

## 7. Warstwa techniczna

| Warstwa | Wybór |
|---|---|
| Build | Vite 7 |
| UI | React 19 + TypeScript (strict) |
| Style | Tailwind CSS v4 |
| Animacje | Motion (`motion/react`) |
| Stan | Zustand 5 |
| Dane | własny wrapper IndexedDB (~60 linii, zero zależności) |
| Lektor | Web Speech API — wybór głosu i tempa w ustawieniach |
| Efekty | syntezowane w WebAudio — zero plików, zero licencji |
| Grafika | **OpenMoji SVG** (CC BY-SA 4.0), 358 plików w `public/openmoji/` |

**Zasada architektury:** `src/engine/` nie importuje Reacta.
SRS, składanie lekcji, dobór dystraktorów i punktacja są testowalne bez klikania.

Dźwięk błędu jest celowo miękki i niski — ma informować, nie karcić.

### Struktura

```
src/
├── types.ts             wspólne typy
├── content/             words.ts · verbs.ts · sentences.ts · dialogs.ts · worlds.ts (+ walidator)
├── engine/              srs · difficulty · distractors · lessonBuilder · verbDrills · retry · scoring
├── exercises/           15 komponentów, jeden plik na typ zadania
├── store/               useGame (Zustand) · persist (IndexedDB)
├── audio/               tts · sfx
├── ui/                  kit.tsx
└── app/                 App · ProfileGate · MapScreen · LessonScreen · RoundBreak · Summary · Settings
```

`buildRound(round, ctx)` składa jedną rundę na żądanie, a nie całą lekcję z góry —
dzięki temu runda 4 widzi już postępy z rundy 1 i dobiera trudność na bieżąco.

`validateContent()` w trybie dev wypisuje: literówki w id, słowa i zdania nieprzypisane do
żadnej lekcji, słowa wprowadzone dwa razy, lekcje bez zdań, odmiany wskazujące na nieznane słowo
i — najważniejsze — **zdania używające materiału z późniejszego tygodnia**. Przy 450 słowach
ręczne pilnowanie kolejności wprowadzania przestaje działać.

### Grafika: OpenMoji

Cała grafika treściowa (obrazki słów, ikony lekcji, krain, rund, kategorii, czasów, gwiazdki,
awatary) renderuje się z **OpenMoji** — licencja CC BY-SA 4.0.

Dlaczego nie systemowe emoji: wyglądały inaczej na macOS, Androidzie i Windowsie, a dzieci mają
korzystać z apki na różnych urządzeniach. Przy okazji znika problem licencyjny.

Jak to działa:
- `scripts/build-openmoji.mjs` skanuje `src/`, wyciąga wszystkie emoji, dopasowuje je do plików
  z paczki OpenMoji i kopiuje **tylko potrzebne** (358 z 4284) do `public/openmoji/`.
  Generuje przy tym `src/content/openmoji.ts` — mapę „emoji → nazwa pliku".
- `ui/Emoji.tsx` dzieli asset na grafemy: co jest w mapie, renderuje jako `<img>`;
  co nie jest (`Mon`, `III`, `11`), zostaje tekstem. Dzięki temu tekstowe assety dni tygodnia
  i miesięcy działają bez wyjątków w treści.
- Runtime nie zgaduje nazw plików z codepointów — decyzja padła raz, przy generowaniu mapy.

Odświeżenie po dopisaniu nowych emoji do treści:

```bash
node wyspa_slow/scripts/build-openmoji.mjs <rozpakowana-paczka-openmoji>
```

### Dostępność
Przyciski min. 48 px · opcja czcionki dla dyslektyków · kolor nigdy nie jest jedynym nośnikiem
informacji (poprawnie = zielony **+ dźwięk + tekst**) · cały interfejs po polsku, angielski wyłącznie
jako materiał · `prefers-reduced-motion` wyłącza animacje CSS.

---

## 8. Uruchomienie i deploy

### Lokalnie

```bash
npm install --prefix wyspa_slow
```

```bash
npm run dev --prefix wyspa_slow
```

Aplikacja startuje na `http://localhost:5180`.

### Publicznie

**https://tomaszmatusiak-stack.github.io/wyspa-slow/**

Repo: `github.com/tomaszmatusiak-stack/wyspa-slow` (publiczne).
Każdy push na `main` uruchamia workflow `.github/workflows/deploy.yml`, który buduje
projekt i publikuje `dist/` na GitHub Pages. Nic nie trzeba robić ręcznie.

Adres jest publiczny, ale **apka nie ma backendu** — cały postęp siedzi w `IndexedDB`
w przeglądarce dziecka. Nie ma kont, logowania, analityki ani reklam, więc publiczny
URL nie wystawia żadnych danych.

`vite.config.ts` ma `base: './'`, więc ta sama paczka działa w katalogu głównym domeny,
w podkatalogu Pages i z pliku lokalnego.

### Lektor

Domyślnie wybierany jest najlepszy dostępny **naturalny głos kobiecy**, brytyjski przed
amerykańskim (`src/audio/tts.ts`). Kolejność to jawna lista jakości, nie tylko filtr płci:
głosy sztuczne i stylizowane (nowa „ekspresyjna" rodzina macOS — Flo, Sandy, Shelley)
lądują na dole, a żartobliwe (Zarvox, Bubbles, Trinoids…) są odfiltrowane całkowicie.

Na tym Macu wypada **Samantha** (en-US). Lepsze głosy brytyjskie (Serena) można doinstalować:
Ustawienia systemowe → Dostępność → Treść mówiona → Zarządzaj głosami. Zestaw głosów
zależy od urządzenia, więc na tablecie lista będzie inna — wybór jest w Ustawieniach profilu.

---

## 9. Etapy

| Etap | Zakres | Stan |
|---|---|---|
| **1** | Silnik (SRS, buildRound, difficulty, dystraktory, retry, scoring), **12 typów zadań**, 20 lekcji dziennych po 60 zadań, rundy z przerwami i wznawianiem, mapa, profile, XP/kryształy/gwiazdki/seria, ustawienia lektora | **gotowe** |
| **2** | Panel rodzica (PIN, statystyki, lista słabych słów do wydruku), zamrażarka serii, sklep, maskotka | do zrobienia |
| **3** | Boss krainy, komiks, Znajdź na obrazku, „Uratuj kotka", migracja emoji → OpenMoji | do zrobienia |
| **4** | PWA/offline, backup JSON, wydruk fiszek słabych słów, ewentualnie Tauri | do zrobienia |

Po etapie 1 warto posadzić dzieci przed apką i zobaczyć, co je nudzi — to zmieni priorytety
etapu 2 bardziej niż jakikolwiek plan.

---

## 10. Ryzyka

| Ryzyko | Reakcja |
|---|---|
| Największą robotą jest content, nie kod | 450 słów i 63 odmiany gotowe; kolejne partie jako TS z walidatorem |
| Systemowe emoji wyglądają inaczej na każdym urządzeniu | **zrobione**: cała grafika treściowa idzie z OpenMoji, ten sam obrazek na macOS, Androidzie i Windowsie |
| Głosy Web Speech API różnią się między systemami | wybór głosu i tempa w ustawieniach profilu |
| Emoji nie pokażą wszystkiego (`under the table`) | frazy pytamy przez polski, nie przez obrazek; docelowo OpenMoji |
| Dziecko klika na oślep dla kryształów | pełne XP tylko za pierwsze przejście; gwiazdki zależą od skuteczności |
| Zbyt długa runda po serii błędów | sufit 22 zadań + limit 15 minut na rundę |
| 45 minut przy ekranie to dużo dla 8-latka | cztery przerwy z wyjściem „na dziś wystarczy" i zapisanym postępem; plan i tak przewiduje część aktywności offline |
