import { useEffect, useState } from 'react'
import { useActiveProfile, useGame } from '../store/useGame'
import { validateContent } from '../content/worlds'
import { requestPersistentStorage } from '../store/persist'
import { ProfileGate } from './ProfileGate'
import { MapScreen } from './MapScreen'
import { LessonScreen } from './LessonScreen'
import type { LessonResult } from './LessonScreen'
import { Summary } from './Summary'

type Screen =
  | { name: 'map' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'summary'; result: LessonResult }

export function App() {
  const ready = useGame((s) => s.ready)
  const hydrate = useGame((s) => s.hydrate)
  const profile = useActiveProfile()
  const [screen, setScreen] = useState<Screen>({ name: 'map' })

  useEffect(() => {
    void hydrate()
    // Prosimy raz, przy starcie — inaczej przeglądarka może wyrzucić zapisany postęp.
    void requestPersistentStorage()
    if (import.meta.env.DEV) {
      const problems = validateContent()
      if (problems.length) console.warn('Problemy w treści:\n' + problems.join('\n'))
    }
  }, [hydrate])

  // Czcionka dla dyslektyków przełącza się na poziomie <body>, bo dotyczy całej apki.
  useEffect(() => {
    document.body.classList.toggle('dyslexia', !!profile?.settings.dyslexiaFont)
  }, [profile?.settings.dyslexiaFont])

  if (!ready) {
    return (
      <div className="grid min-h-full place-items-center text-5xl">
        <span className="animate-pulse">🐉</span>
      </div>
    )
  }

  if (!profile) return <ProfileGate />

  switch (screen.name) {
    case 'lesson':
      return (
        <LessonScreen
          key={screen.lessonId}
          lessonId={screen.lessonId}
          onExit={() => setScreen({ name: 'map' })}
          onDone={(result) => setScreen({ name: 'summary', result })}
        />
      )
    case 'summary':
      return (
        <Summary
          result={screen.result}
          onMap={() => setScreen({ name: 'map' })}
          onNext={(lessonId) => setScreen({ name: 'lesson', lessonId })}
        />
      )
    default:
      return <MapScreen onStart={(lessonId) => setScreen({ name: 'lesson', lessonId })} />
  }
}
