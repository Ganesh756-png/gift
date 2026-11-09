import { useMemo } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '../particles/FloatingParticles';
import PasswordLock from '../ui/PasswordLock';

interface PasswordEntryProps {
  onUnlock: () => void;
}

/* ─── Decorative sparkle dots ─── */
function SparkleDecorations() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gradient-to-br from-rose-300 to-pink-400"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floating heart decorations ─── */
function FloatingHeartDecorations() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: ['💕', '💖', '💗', '♥️', '💓', '💘', '💝', '❤️'][i],
        x: 5 + Math.random() * 90,
        size: 18 + Math.random() * 14,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        drift: -20 + Math.random() * 40,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            x: [0, h.drift, -h.drift / 2],
            rotate: [0, 20, -15, 0],
          }}
          transition={{
            y: { duration: h.duration, repeat: Infinity, ease: 'linear', delay: h.delay },
            x: { duration: h.duration * 0.8, repeat: Infinity, ease: 'easeInOut', delay: h.delay },
            rotate: { duration: h.duration * 0.6, repeat: Infinity, ease: 'easeInOut', delay: h.delay },
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Main PasswordEntry ─── */
export default function PasswordEntry({ onUnlock }: PasswordEntryProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, rgba(243,232,255,0.7) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,224,236,0.6) 0%, transparent 50%), linear-gradient(135deg, #1a0a2e 0%, #130c25 30%, #1f0f3a 60%, #200e2a 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-rose-600/15 to-fuchsia-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -35, 25, 0],
            y: [0, 20, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-rose-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Sparkle decorations */}
      <SparkleDecorations />

      {/* Floating heart decorations */}
      <FloatingHeartDecorations />

      {/* Background floating particles */}
      <FloatingParticles type="hearts" count={15} />

      {/* Top decorative text */}
      <motion.div
        className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-rose-300/50 font-serif text-sm sm:text-base tracking-[0.3em] uppercase">
          ✦ A Secret Awaits ✦
        </p>
      </motion.div>

      {/* Password lock */}
      <PasswordLock
        onUnlock={onUnlock}
        hint="It's something you already use every day... Your phone password 😉"
        title="🔐 Enter The Secret Code"
      />

      {/* Bottom decorative element */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.span
          className="text-rose-400/40 text-lg"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♥
        </motion.span>
        <span className="text-rose-300/30 text-xs tracking-widest font-light">
          Only for you
        </span>
        <motion.span
          className="text-rose-400/40 text-lg"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          ♥
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

