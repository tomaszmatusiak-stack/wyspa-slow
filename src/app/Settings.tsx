import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { englishVoices, isFemaleVoice } from '../audio/tts'
import { useActiveProfile, useGame } from '../store/useGame'
import { useSay } from './useSay'
import { PrimaryButton, Tile } from '../ui/kit'
import type { Tier } from '../types'

export function Settings({ onClose }: { onClose: () => void }) {
  const profile = useActiveProfile()
  const update = useGame((s) => s.updateSettings)
  const selectProfile = useGame((s) => s.selectProfile)
  const say = useSay()
  const [voices, setVoices] = useState(englishVoices())

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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Ustawienia</h2>
          <button type="button" onClick={onClose} className="text-2xl font-black text-ink-soft">
            ✕
          </button>
        </div>

        <Section title="Głos lektora">
          <select
            value={s.voice ?? ''}
            onChange={(e) => update({ voice: e.target.value || null })}
            className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-3 font-bold"
          >
            <option value="">
              Automatycznie — miły kobiecy ({voices[0]?.name ?? 'brak głosów EN'})
            </option>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {isFemaleVoice(v) ? '♀' : '♂'} {v.name} · {v.lang}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm font-bold text-ink-soft">
            Lista jest posortowana od najlepszego: naturalne kobiece głosy na górze, żartobliwe
            głosy systemowe odfiltrowane. Lepsze głosy (np. brytyjska Serena) można doinstalować
            w systemie: Ustawienia → Dostępność → Treść mówiona → Zarządzaj głosami.
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

        <div className="mt-6 flex gap-3">
          <PrimaryButton className="flex-1" onClick={onClose}>
            Gotowe
          </PrimaryButton>
          <PrimaryButton
            tone="slate"
            onClick={() => {
              selectProfile(null)
              onClose()
            }}
          >
            Zmień gracza
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
