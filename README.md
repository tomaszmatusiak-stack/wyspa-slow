# Wyspa Słów ⚽

Grywalizowany dodatek do nauki angielskiego dla dzieci 8–11 lat, od zera.
Towarzysz do czterotygodniowego planu „Angielski na wakacje": cztery krainy odpowiadają
tygodniom, a lekcje kolejnym dniom roboczym.

**20 lekcji dziennych · 60 zadań w każdej · 12 typów zadań · 128 słów i zwrotów · 52 zdania · 4 dialogi**

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
policz po angielsku · dialog z luką.

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
