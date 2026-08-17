import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { play } from '../audio/sfx'

export type TileState = 'idle' | 'chosen' | 'correct' | 'wrong' | 'muted'

const TILE_STYLE: Record<TileState, string> = {
  idle: 'bg-white text-ink border-slate-200 [--chunky-shadow:var(--color-slate-300)]',
  chosen: 'bg-violet-100 text-violet-900 border-violet-400 [--chunky-shadow:var(--color-violet-400)]',
  correct: 'bg-emerald-400 text-white border-emerald-500 [--chunky-shadow:var(--color-emerald-600)]',
  wrong: 'bg-rose-300 text-rose-950 border-rose-400 [--chunky-shadow:var(--color-rose-500)]',
  muted: 'bg-slate-100 text-slate-400 border-slate-200 opacity-60 [--chunky-shadow:var(--color-slate-200)]',
}

export function Tile({
  state = 'idle',
  onClick,
  disabled,
  className = '',
  children,
}: {
  state?: TileState
  onClick?: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        play('tap')
        onClick?.()
      }}
      className={`chunky chunky-press flex min-h-16 items-center justify-center rounded-2xl border-2 px-3 py-3 text-center font-bold disabled:cursor-default ${TILE_STYLE[state]} ${className}`}
    >
      {children}
    </button>
  )
}

const TONES = {
  violet: 'bg-violet-600 text-white [--chunky-shadow:var(--color-violet-800)]',
  emerald: 'bg-emerald-500 text-white [--chunky-shadow:var(--color-emerald-700)]',
  amber: 'bg-amber-400 text-amber-950 [--chunky-shadow:var(--color-amber-600)]',
  slate: 'bg-white text-ink [--chunky-shadow:var(--color-slate-300)]',
} as const

export function PrimaryButton({
  onClick,
  children,
  tone = 'violet',
  className = '',
  disabled,
}: {
  onClick?: () => void
  children: ReactNode
  tone?: keyof typeof TONES
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        play('tap')
        onClick?.()
      }}
      className={`chunky chunky-press rounded-2xl px-6 py-4 text-lg font-extrabold tracking-wide disabled:opacity-40 ${TONES[tone]} ${className}`}
    >
      {children}
    </button>
  )
}

/** Emoji-obrazek. Jedyne miejsce, które trzeba tknąć przy migracji na OpenMoji. */
export function Asset({ value, size = 'lg' }: { value: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = { sm: 'text-3xl', md: 'text-5xl', lg: 'text-7xl', xl: 'text-8xl' }
  return (
    <span className={`${sizes[size]} leading-none select-none`} role="img" aria-hidden>
      {value}
    </span>
  )
}

export function SpeakerButton({ onClick, big = false }: { onClick: () => void; big?: boolean }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label="Posłuchaj"
      className={`chunky grid shrink-0 place-items-center rounded-full bg-sky-400 text-white [--chunky-shadow:var(--color-sky-600)] ${
        big ? 'h-28 w-28 text-5xl' : 'h-12 w-12 text-xl'
      }`}
    >
      🔊
    </motion.button>
  )
}

export function Bar({ value, max, className = 'bg-emerald-400' }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100))
  return (
    <div className="h-3.5 w-full overflow-hidden rounded-full bg-black/10">
      <motion.div
        className={`h-full rounded-full ${className}`}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      />
    </div>
  )
}

export function Stars({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-base', md: 'text-2xl', lg: 'text-5xl' }
  return (
    <div className={`flex gap-1 ${sizes[size]}`}>
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={size === 'lg' ? { scale: 0, rotate: -40 } : false}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: size === 'lg' ? 0.15 * i : 0, type: 'spring', stiffness: 260, damping: 14 }}
          className={i <= count ? '' : 'opacity-25 grayscale'}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  )
}

const CONFETTI = ['🎉', '⭐', '💎', '✨', '🎊']

export function Burst({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute top-1/2 left-1/2 text-3xl"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
            animate={{
              x: Math.cos(angle) * (110 + (i % 4) * 40),
              y: Math.sin(angle) * (110 + (i % 3) * 40) + 60,
              opacity: 0,
              scale: 1.2,
              rotate: (i % 2 ? 1 : -1) * 180,
            }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            {CONFETTI[i % CONFETTI.length]}
          </motion.span>
        )
      })}
    </div>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`rounded-full bg-white/80 px-3 py-1 text-sm font-extrabold ${className}`}>
      {children}
    </span>
  )
}
