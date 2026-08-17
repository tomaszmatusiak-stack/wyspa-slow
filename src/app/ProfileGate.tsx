import { useState } from 'react'
import { motion } from 'motion/react'
import { useGame } from '../store/useGame'
import { PrimaryButton, Tile } from '../ui/kit'
import { levelProgress } from '../engine/scoring'

/** Jeden awatar dla wszystkich — wybór postaci tylko opóźniał wejście do gry. */
export const DEFAULT_AVATAR = '⚽'

export function ProfileGate() {
  const profiles = useGame((s) => s.profiles)
  const selectProfile = useGame((s) => s.selectProfile)
  const createProfile = useGame((s) => s.createProfile)
  const [creating, setCreating] = useState(profiles.length === 0)

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center gap-8 px-5 py-10">
      <header className="text-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="text-7xl"
        >
          ⚽
        </motion.div>
        <h1 className="mt-2 text-4xl font-black text-violet-900">Wyspa Słów</h1>
        <p className="mt-1 font-bold text-ink-soft">Angielski na wakacje</p>
      </header>

      {creating ? (
        <NewProfile
          onCancel={profiles.length ? () => setCreating(false) : undefined}
          onCreate={(name, age) => {
            createProfile(name, DEFAULT_AVATAR, age)
            setCreating(false)
          }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-center font-bold text-ink-soft">Kto dziś gra?</p>
          {profiles.map((p) => {
            const { level } = levelProgress(p.xp)
            return (
              <Tile key={p.id} className="justify-between gap-3 px-5" onClick={() => selectProfile(p.id)}>
                <span className="flex items-center gap-3">
                  <span className="text-4xl">{p.avatar}</span>
                  <span className="text-xl">{p.name}</span>
                </span>
                <span className="flex items-center gap-3 text-sm font-extrabold text-ink-soft">
                  <span>lvl {level}</span>
                  <span>🔥 {p.streak}</span>
                </span>
              </Tile>
            )
          })}
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="mt-2 font-extrabold text-violet-700 underline"
          >
            + Dodaj gracza
          </button>
        </div>
      )}
    </div>
  )
}

function NewProfile({
  onCreate,
  onCancel,
}: {
  onCreate: (name: string, age: number) => void
  onCancel?: () => void
}) {
  const [name, setName] = useState('')
  const [age, setAge] = useState(8)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-1 block font-extrabold text-ink-soft">Imię</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && onCreate(name.trim(), age)}
          placeholder="np. Kuba"
          autoFocus
          className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-4 text-2xl font-extrabold outline-none focus:border-violet-400"
        />
      </div>

      <div>
        <label className="mb-1 block font-extrabold text-ink-soft">Wiek</label>
        <div className="grid grid-cols-5 gap-2">
          {[7, 8, 9, 10, 11].map((n) => (
            <Tile key={n} state={n === age ? 'chosen' : 'idle'} className="py-3 text-xl" onClick={() => setAge(n)}>
              {n}
            </Tile>
          ))}
        </div>
        <p className="mt-2 text-sm font-bold text-ink-soft">
          {age >= 10
            ? 'Starszy profil: wpisywanie słów z klawiatury i zdania bez podpowiedzi.'
            : 'Młodszy profil: słuchanie i układanie z klocków, bez pisania.'}
        </p>
      </div>

      <div className="flex gap-3">
        <PrimaryButton
          className="flex-1"
          disabled={!name.trim()}
          onClick={() => onCreate(name.trim(), age)}
        >
          Zaczynamy!
        </PrimaryButton>
        {onCancel && (
          <PrimaryButton tone="slate" onClick={onCancel}>
            Wróć
          </PrimaryButton>
        )}
      </div>
    </div>
  )
}
