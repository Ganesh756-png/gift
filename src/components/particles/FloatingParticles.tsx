import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type ParticleType = 'hearts' | 'stars' | 'petals' | 'sparkles' | 'butterflies' | 'mixed';

interface FloatingParticlesProps {
  type?: ParticleType;
  count?: number;
  className?: string;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

const EMOJIS: Record<ParticleType, string[]> = {
  hearts: ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '♥️'],
  stars: ['✨', '⭐', '🌟', '💫', '✧', '★', '☆'],
  petals: ['🌸', '🌺', '🌹', '🌷', '💮', '🏵️', '🌼'],
  sparkles: ['✨', '💎', '⚡', '🔮', '🌟', '💫'],
  butterflies: ['🦋', '🌸', '💕', '✨', '🦋', '🌺'],
  mixed: ['❤️', '✨', '🌸', '💕', '⭐', '🦋', '🌹', '💫', '💖', '🌺'],
};

export default function FloatingParticles({
  type = 'mixed',
  count = 25,
  className = '',
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const emojis = useMemo(() => EMOJIS[type], [type]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 20,
      duration: 8 + Math.random() * 15,
      delay: Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.5,
      drift: -30 + Math.random() * 60,
    }));
    setParticles(newParticles);
  }, [count, emojis]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          initial={{ y: '-10%', x: 0, rotate: 0 }}
          animate={{
            y: ['110vh', '-10vh'],
            x: [0, p.drift, -p.drift / 2, p.drift / 3],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
            x: { duration: p.duration * 0.7, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
            rotate: { duration: p.duration * 1.5, repeat: Infinity, ease: 'linear', delay: p.delay },
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
