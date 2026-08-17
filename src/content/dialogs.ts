import type { Dialog } from '../types'

/**
 * Cztery dialogi z pakietu "Angielski na wakacje" (piątkowa mini-scenka).
 * W apce dziecko uzupełnia brakującą kwestię — to sucha próba przed odegraniem na żywo.
 */

export const DIALOGS: Dialog[] = [
  {
    id: 'd1',
    title: 'Nowy kolega',
    worldId: 1,
    lines: [
      { who: 'A', en: "Hello! My name is Kuba. What's your name?", pl: 'Cześć! Mam na imię Kuba. Jak masz na imię?' },
      { who: 'B', en: 'Hi! My name is Tom. Nice to meet you!', pl: 'Cześć! Mam na imię Tom. Miło cię poznać!' },
      { who: 'A', en: 'Nice to meet you too! How old are you?', pl: 'Mnie też miło! Ile masz lat?' },
      { who: 'B', en: 'I am ten years old. And you?', pl: 'Mam dziesięć lat. A ty?' },
      { who: 'A', en: 'I am eight. Is this your brother?', pl: 'Ja mam osiem. Czy to twój brat?' },
      { who: 'B', en: 'Yes! This is my brother. His name is Alex.', pl: 'Tak! To mój brat. Ma na imię Alex.' },
    ],
  },
  {
    id: 'd2',
    title: 'Śniadanie',
    worldId: 2,
    lines: [
      { who: 'A', en: 'Good morning! Are you hungry?', pl: 'Dzień dobry! Jesteś głodny?' },
      { who: 'B', en: 'Yes! Can I have bread and cheese, please?', pl: 'Tak! Czy mogę prosić chleb i ser?' },
      { who: 'A', en: 'Here you are. Do you want milk or juice?', pl: 'Proszę bardzo. Chcesz mleko czy sok?' },
      { who: 'B', en: 'Juice, please. Thank you!', pl: 'Sok poproszę. Dziękuję!' },
      { who: 'A', en: 'Do you like apples?', pl: 'Lubisz jabłka?' },
      { who: 'B', en: 'Yes, I do! Apples are my favourite.', pl: 'Tak! Jabłka to moje ulubione.' },
    ],
  },
  {
    id: 'd3',
    title: 'Na treningu',
    worldId: 3,
    lines: [
      { who: 'A', en: 'Do you play football?', pl: 'Grasz w piłkę nożną?' },
      { who: 'B', en: 'Yes! Football is my favourite sport.', pl: 'Tak! Piłka nożna to mój ulubiony sport.' },
      { who: 'A', en: 'Can you score a goal?', pl: 'Umiesz strzelić gola?' },
      { who: 'B', en: 'Yes, I can! Watch me!', pl: 'Tak, umiem! Patrz!' },
      { who: 'A', en: 'Wow! Great goal! You are a good player.', pl: 'Wow! Świetny gol! Jesteś dobrym zawodnikiem.' },
      { who: 'B', en: "Thank you! Let's play together.", pl: 'Dzięki! Zagrajmy razem.' },
    ],
  },
  {
    id: 'd4',
    title: 'W sklepie',
    worldId: 4,
    lines: [
      { who: 'A', en: 'Hello! Can I help you?', pl: 'Dzień dobry! W czym mogę pomóc?' },
      { who: 'B', en: 'Hello! Can I have a banana, please?', pl: 'Dzień dobry! Poproszę banana.' },
      { who: 'A', en: 'Here you are. Anything else?', pl: 'Proszę bardzo. Coś jeszcze?' },
      { who: 'B', en: 'Yes, water, please. How much is it?', pl: 'Tak, poproszę wodę. Ile to kosztuje?' },
      { who: 'A', en: "It's five zloty.", pl: 'Pięć złotych.' },
      { who: 'B', en: 'Here you are. Thank you! Goodbye!', pl: 'Proszę. Dziękuję! Do widzenia!' },
    ],
  },
]

export const DIALOG_BY_ID = new Map(DIALOGS.map((d) => [d.id, d]))
