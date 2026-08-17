import { useCallback } from 'react'
import { useActiveProfile } from '../store/useGame'
import { speak } from '../audio/tts'

/** Lektor związany z ustawieniami aktywnego profilu. */
export function useSay(): (text: string) => void {
  const profile = useActiveProfile()
  const voice = profile?.settings.voice ?? null
  const rate = profile?.settings.rate ?? 0.85
  return useCallback((text: string) => speak(text, { voiceName: voice, rate }), [voice, rate])
}
