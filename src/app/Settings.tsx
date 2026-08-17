import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { englishVoices, isFemaleVoice, resolveVoice } from '../audio/tts'
import { useActiveProfile, useGame } from '../store/useGame'
import { Emoji } from '../ui/Emoji'
import { useSay } from './useSay'
import { PrimaryButton, Tile } from '../ui/kit'
import type { Challenge, Tier } from '../types'
import { CHALLENGE } from '../engine/difficulty'
import { requestPersistentStorage } from '../store/persist'

export function Settings({ onClose }: { onClose: () => void }) {
  const profile = useActiveProfile()
  const profiles = useGame((s) => s.profiles)
  const update = useGame((s) => s.updateSettings)
  const selectProfile = useGame((s) => s.selectProfile)
  const say = useSay()
  const [voices, setVoices] = useState(englishVoices())
  const [persisted, setPersisted] = useState<boolean | null>(null)

  useEffect(() => {
    void requestPersistentStorage().then(setPersisted)
  }, [])

  // Safari zwraca listę głosów dopiero po chwili.
  useEffect(() => {
    if (voices.length) return
    const t = setInterval(() => {
      const v = englishVoices()
      if (v.length) {
        setVoices(v)
        clearInterval(t)
      }
    }, 300)
    return () => clearInterval(t)
  }, [voices.length])

  if (!profile) return null
  const s = profile.settings
  const current = resolveVoice(s.voice)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Gracz i ustawienia</h2>
          <button type="button" onClick={onClose} className="text-2xl font-black text-ink-soft">
            ✕
          </button>
        </div>

        {/* Przełączanie graczy na samej górze: dwoje dzieci na jednym tablecie
            zmienia się codziennie, a ustawienia rusza się raz na urządzenie. */}
        <Section title="Kto teraz gra?">
          <div className="flex flex-col gap-2">
            {profiles.map((p) => (
              <Tile
                key={p.id}
                state={p.id === profile.id ? 'chosen' : 'idle'}
                className="justify-between gap-3 px-4"
                onClick={() => {
                  if (p.id !== profile.id) selectProfile(p.id)
                  onClose()
                }}
              >
                <span className="flex items-center gap-3">
                  <Emoji value={p.avatar} size="sm" />
                  <span className="text-lg">{p.name}</span>
                </span>
                <span className="text-sm font-extrabold text-ink-soft">
                  {p.id === profile.id ? 'teraz gra' : 'przełącz'}
                </span>
              </Tile>
            ))}
            <button
              type="button"
              onClick={() => {
                selectProfile(null)
                onClose()
              }}
              className="mt-1 py-2 font-extrabold text-violet-700 underline"
            >
              + Dodaj kolejnego gracza
            </button>
          </div>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Każdy gracz ma własny postęp, poziom i gwiazdki. Ustawienia poniżej dotyczą
            tylko <strong>{profile.name}</strong>.
          </p>
        </Section>

        <Section title="Głos lektora">
          <select
            value={s.voice ?? ''}
            onChange={(e) => update({ voice: e.target.value || null })}
            className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-3 font-bold"
          >
            <option value="">Automatycznie — najlepszy kobiecy</option>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {isFemaleVoice(v) ? '♀' : '♂'} {v.name} · {v.lang}
              </option>
            ))}
          </select>
          {/* Bez tego trzeba by zgadywać, co apka faktycznie wybrała na danym urządzeniu. */}
          <p
            className={`mt-2 rounded-xl px-3 py-2 text-sm font-extrabold ${
              current && isFemaleVoice(current)
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {current
              ? `Teraz mówi: ${isFemaleVoice(current) ? '♀' : '♂'} ${current.name} · ${current.lang}`
              : 'Ładuję listę głosów…'}
            {current && !isFemaleVoice(current) && (
              <span className="mt-1 block font-bold">
                Na tym urządzeniu nie ma żadnego głosu kobieckiego, jaki apka zna. Wybierz
                z listy albo doinstaluj głos w systemie.
              </span>
            )}
          </p>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Lista jest posortowana od najlepszego: naturalne kobiece głosy na górze, żartobliwe
            głosy systemowe odfiltrowane. Lepsze głosy (np. brytyjska Serena) można doinstalować
            w systemie: macOS → Ustawienia → Dostępność → Treść mówiona → Zarządzaj głosami;
            Windows → Ustawienia → Czas i język → Mowa.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <PrimaryButton tone="slate" onClick={() => say('Hello! My name is Sparky.')}>
              🔊 Posłuchaj
            </PrimaryButton>
          </div>
        </Section>

        <Section title={`Tempo mowy: ${s.rate.toFixed(2)}×`}>
          <input
            type="range"
            min={0.5}
            max={1.2}
            step={0.05}
            value={s.rate}
            onChange={(e) => update({ rate: Number(e.target.value) })}
            className="w-full accent-violet-600"
          />
        </Section>

        <Section title="Poziom zadań">
          <div className="grid grid-cols-2 gap-2">
            {([2, 3] as Tier[]).map((t) => (
              <Tile key={t} state={s.maxTier === t ? 'chosen' : 'idle'} onClick={() => update({ maxTier: t })}>
                <span className="text-sm leading-tight">
                  {t === 2 ? 'Mówię i słucham\n(klocki)' : 'Piszę z klawiatury'}
                </span>
              </Tile>
            ))}
          </div>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Zgodnie z planem: młodsze dziecko odpowiada ustnie i układa z klocków, starsze pisze.
          </p>
        </Section>

        <Section title="Poziom wyzwania">
          <div className="flex flex-col gap-2">
            {(Object.keys(CHALLENGE) as Challenge[]).map((c) => (
              <Tile
                key={c}
                state={s.challenge === c ? 'chosen' : 'idle'}
                className="flex-col items-start gap-0.5 px-4 text-left"
                onClick={() => update({ challenge: c })}
              >
                <span className="text-base font-black">{CHALLENGE[c].label}</span>
                <span className="text-xs leading-snug font-bold opacity-70">
                  {CHALLENGE[c].hint}
                </span>
              </Tile>
            ))}
          </div>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            To osobna rzecz niż poziom zadań powyżej: tam decyduje, czy dziecko pisze,
            tutaj — ile jest opcji do wyboru i pułapek.
          </p>
        </Section>

        <Section title="Cel dzienny">
          <div className="grid grid-cols-3 gap-2">
            {([1, 2, 3] as const).map((n) => (
              <Tile key={n} state={s.dailyGoal === n ? 'chosen' : 'idle'} onClick={() => update({ dailyGoal: n })}>
                {n} {n === 1 ? 'lekcja' : 'lekcje'}
              </Tile>
            ))}
          </div>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Jedna lekcja to cały dzień z planu: cztery rundy, około 45 minut.
          </p>
        </Section>

        <Section title="Zapisany postęp">
          <p
            className={`rounded-xl px-3 py-2 text-sm font-bold ${
              persisted ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-ink'
            }`}
          >
            {persisted === null
              ? 'Sprawdzam…'
              : persisted
                ? 'Postęp jest zapisany na tym urządzeniu i zabezpieczony przed automatycznym czyszczeniem.'
                : 'Postęp jest zapisany na tym urządzeniu. Na iPadzie i iPhonie warto dodać apkę do ekranu początkowego — inaczej Safari może wyczyścić dane po dłuższej przerwie.'}
          </p>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Postęp każdego gracza jest osobny, ale zapisuje się tylko tutaj — na innym
            urządzeniu apka zacznie od zera.
          </p>
        </Section>

        <Section title="Inne">
          <div className="flex flex-col gap-2">
            <Toggle label="Dźwięki" value={s.sounds} onChange={(v) => update({ sounds: v })} />
            <Toggle
              label="Czcionka dla dyslektyków"
              value={s.dyslexiaFont}
              onChange={(v) => update({ dyslexiaFont: v })}
            />
          </div>
        </Section>

        <div className="mt-6">
          <PrimaryButton className="w-full" onClick={onClose}>
            Gotowe
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="mb-2 font-extrabold text-ink-soft">{title}</h3>
      {children}
    </div>
  )
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center justify-between rounded-xl border-2 border-slate-200 px-4 py-3 font-extrabold"
    >
      <span>{label}</span>
      <span
        className={`grid h-7 w-12 items-center rounded-full px-1 transition ${value ? 'bg-emerald-400' : 'bg-slate-300'}`}
      >
        <span className={`h-5 w-5 rounded-full bg-white transition ${value ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  )
}
