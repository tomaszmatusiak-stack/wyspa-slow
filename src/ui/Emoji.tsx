import { OPENMOJI } from '../content/openmoji'

/**
 * Renderuje emoji jako grafikę OpenMoji (CC BY-SA 4.0) z katalogu `public/openmoji/`.
 *
 * Po co: systemowe emoji wyglądają inaczej na macOS, Androidzie i Windowsie, a część
 * naszych ikon to kombinacje dwóch znaków. OpenMoji daje ten sam obrazek na każdym
 * urządzeniu i jasną licencję.
 *
 * Czego nie ma w mapie (np. „Mon", „III", „11"), renderujemy jako zwykły tekst —
 * dzięki temu tekstowe assety liczb i miesięcy działają bez wyjątków w contencie.
 */

const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter('pl', { granularity: 'grapheme' })
    : null

/** Dzieli asset na kawałki: obrazek OpenMoji albo spójny fragment tekstu. */
function parts(value: string): { emoji?: string; text?: string }[] {
  const clusters = segmenter
    ? [...segmenter.segment(value)].map((s) => s.segment)
    : [...value]

  const out: { emoji?: string; text?: string }[] = []
  for (const cluster of clusters) {
    if (OPENMOJI[cluster]) {
      out.push({ emoji: OPENMOJI[cluster] })
    } else {
      // Sąsiadujący tekst łączymy, żeby nie psuć kerningu („Mon", nie „M o n").
      const last = out[out.length - 1]
      if (last?.text !== undefined) last.text += cluster
      else out.push({ text: cluster })
    }
  }
  return out
}

export type EmojiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const PX: Record<EmojiSize, number> = { xs: 22, sm: 32, md: 52, lg: 76, xl: 100 }
const TEXT: Record<EmojiSize, string> = {
  xs: 'text-base',
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-7xl',
}

export function Emoji({
  value,
  size = 'md',
  className = '',
}: {
  value: string
  size?: EmojiSize
  className?: string
}) {
  const px = PX[size]
  const chunks = parts(value)

  return (
    <span className={`inline-flex shrink-0 items-center justify-center gap-0.5 ${className}`} aria-hidden>
      {chunks.map((chunk, i) =>
        chunk.emoji ? (
          <img
            key={i}
            src={`${import.meta.env.BASE_URL}openmoji/${chunk.emoji}.svg`}
            width={px}
            height={px}
            draggable={false}
            alt=""
            className="block select-none"
            style={{ width: px, height: px }}
          />
        ) : (
          <span key={i} className={`${TEXT[size]} leading-none font-black select-none`}>
            {chunk.text}
          </span>
        ),
      )}
    </span>
  )
}
