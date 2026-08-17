# Wyspa Słów ⚽

Grywalizowany dodatek do nauki angielskiego dla dzieci 8–11 lat, od zera.
Towarzysz do czterotygodniowego planu „Angielski na wakacje", rozbudowany do **12 tygodni**:
krainy odpowiadają tygodniom, a lekcje kolejnym dniom roboczym.

Tygodnie 1–4 to pakiet wakacyjny (przedstawianie się, dom i jedzenie, sport, wakacje).
Tygodnie 5–12 prowadzą dalej: szkoła, plan dnia i godziny, ciało i zdrowie, zwierzęta,
restauracja, przyimki miejsca, wygląd i ubrania, pory roku.

**60 lekcji dziennych · 60 zadań w każdej · 15 typów zadań · 450 słów i zwrotów · 63 czasowniki z pełną odmianą · 108 zdań · 60 dialogów**

## Jak to działa

Jedna lekcja to jeden dzień planu, ~45 minut podzielone na cztery rundy:

| Runda | | Czym się zajmuje |
|---|---|---|
| 1 | 👀 Poznaj | słuchanie, rozpoznawanie obrazków, łączenie w pary |
| 2 | 💪 Ćwicz | przypominanie bez obrazka, literowanie, gry na kategorie |
| 3 | 🧩 Zdania | układanie zdań z klocków, uzupełnianie luk, dialog |
| 4 | 🏆 Mistrz | sortowanie, memory, powtórki, działania po angielsku |

Po każdej rundzie jest przerwa z nagrodą. Postęp zapisuje się od razu, więc lekcję
można przerwać w połowie i wrócić następnego dnia.

Typy zadań: posłuchaj i wskaż · quiz obrazkowy · memory · połącz w pary · puzzle zdaniowe ·
uzupełnij zdanie · literowanie · co tu nie pasuje · sortowanie do koszyków · złap słowa ·
policz po angielsku · dialog z luką · wybierz właściwą formę · odmień czasownik ·
kiedy to się dzieje.

## Gramatyka

Osobna tabela odmian: **63 czasowniki × 4 formy** (base, he/she, -ing, past). Generator składa
z nich zdania sam, więc kilkadziesiąt wierszy tabeli daje setki celowanych zadań.

| Czas | Marker | Etykieta | Od tygodnia |
|---|---|---|---|
| present simple | `every day` | 🔁 codziennie | 3 |
| present continuous | `now` | ⏱️ teraz | 6 |
| past simple | `yesterday` | ⬅️ wczoraj | 9 |

Generator nie produkuje złego angielskiego: czasowniki stanu (`know`, `want`, `need`) nie
dostają continuous, `hurt` i `fly` dostają podmiot nieosobowy („My leg hurts", „The bird flies"),
a czasowniki, do których „every day" nie pasuje, zostają bez markera.

## Dwa profile, dwa poziomy

Trudność wynika z wieku, zgodnie z planem („8-latek mówi i słucha, 10-latek pisze"):

- **≤ 9 lat** — literowanie z klocków, memory obrazek↔EN, zdania z podpowiedzią po polsku
- **≥ 10 lat** — wpisywanie z klawiatury, memory EN↔PL, zdania bez wzoru z pułapkami gramatycznymi

Powtórki działają systemem Leitnera: 1 → 3 → 7 → 14 → 30 dni.

## Prywatność

Cały postęp siedzi w `IndexedDB` w przeglądarce. Aplikacja nie ma backendu, nie wysyła
niczego na żaden serwer, nie zbiera danych i nie ma reklam ani analityki.
Lektor to systemowy `SpeechSynthesis` — też lokalnie.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Stack: Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion · Zustand.
Szczegóły projektowe i uzasadnienia decyzji: [DESIGN.md](DESIGN.md).
