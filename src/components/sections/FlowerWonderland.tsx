import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '../particles/FloatingParticles';
import MagicButton from '../ui/MagicButton';
import { useConfetti } from '../../hooks/useConfetti';
import { FLOWER_MESSAGES } from '../../types';

interface FlowerData {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  message: string;
}

const FLOWERS: FlowerData[] = [
  { id: 0, emoji: '🌹', x: 12, y: 25, size: 56, delay: 0, message: FLOWER_MESSAGES[0] },
  { id: 1, emoji: '🌷', x: 38, y: 18, size: 50, delay: 0.4, message: FLOWER_MESSAGES[1] },
  { id: 2, emoji: '🌸', x: 62, y: 30, size: 52, delay: 0.8, message: FLOWER_MESSAGES[2] },
  { id: 3, emoji: '🌺', x: 85, y: 22, size: 54, delay: 1.2, message: FLOWER_MESSAGES[3] },
  { id: 4, emoji: '🌻', x: 25, y: 55, size: 58, delay: 1.6, message: FLOWER_MESSAGES[4] },
  { id: 5, emoji: '🌼', x: 50, y: 50, size: 48, delay: 2.0, message: FLOWER_MESSAGES[5] },
  { id: 6, emoji: '💐', x: 75, y: 55, size: 56, delay: 2.4, message: FLOWER_MESSAGES[0] },
  { id: 7, emoji: '🏵️', x: 50, y: 75, size: 52, delay: 2.8, message: FLOWER_MESSAGES[2] },
];

const GLOW_DOTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 3 + Math.random() * 5,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 5,
}));

export default function FlowerWonderland() {
  const [clickedFlowers, setClickedFlowers] = useState<Set<number>>(new Set());
  const [activeFlower, setActiveFlower] = useState<number | null>(null);
  const [showBouquet, setShowBouquet] = useState(false);
  const { firePastel } = useConfetti();

  const handleFlowerClick = useCallback((id: number) => {
    setClickedFlowers((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setActiveFlower((prev) => (prev === id ? null : id));
  }, []);

  const handleCollectFlowers = useCallback(() => {
    setShowBouquet(true);
    setTimeout(() => firePastel(), 300);
    setTimeout(() => firePastel(), 900);
  }, [firePastel]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-16 px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-pink-100 via-60% to-romantic-cream" />
      <div className="absolute inset-0 bg-gradient-to-t from-romantic-softpink/30 via-transparent to-transparent" />

      {/* Floating Petals */}
      <FloatingParticles type="petals" count={18} />

      {/* Glowing Particles */}
      {GLOW_DOTS.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: 'radial-gradient(circle, rgba(255,179,198,0.8) 0%, rgba(255,179,198,0) 70%)',
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-romantic-velvet text-center mb-12 text-glow"
      >
        🌹 The Flower Wonderland
      </motion.h2>

      {/* Flower Garden */}
      <div className="relative z-10 w-full max-w-4xl mx-auto" style={{ minHeight: 420 }}>
        {/* Mobile: grid layout, Desktop: absolute positioned */}
        <div className="hidden md:block relative w-full" style={{ height: 420 }}>
          {FLOWERS.map((flower) => (
            <FlowerItem
              key={flower.id}
              flower={flower}
              isClicked={clickedFlowers.has(flower.id)}
              isActive={activeFlower === flower.id}
              onClick={() => handleFlowerClick(flower.id)}
              positionMode="absolute"
            />
          ))}
        </div>
        <div className="md:hidden grid grid-cols-2 gap-6 sm:grid-cols-3">
          {FLOWERS.map((flower) => (
            <FlowerItem
              key={flower.id}
              flower={flower}
              isClicked={clickedFlowers.has(flower.id)}
              isActive={activeFlower === flower.id}
              onClick={() => handleFlowerClick(flower.id)}
              positionMode="relative"
            />
          ))}
        </div>
      </div>

      {/* Collect Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-12"
      >
        {!showBouquet && (
          <MagicButton onClick={handleCollectFlowers} variant="primary" size="lg">
            Collect Your Flowers 🌸
          </MagicButton>
        )}
      </motion.div>

      {/* Bouquet Reveal */}
      <AnimatePresence>
        {showBouquet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative z-20 mt-10 flex flex-col items-center"
          >
            {/* Glow behind bouquet */}
            <motion.div
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,179,198,0.5) 0%, rgba(255,143,175,0.2) 40%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Surrounding Flowers */}
            <div className="relative">
              {['🌹', '🌸', '🌷', '🌺', '🌼', '🌻'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    top: `${50 - 55 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 55 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 300 }}
                >
                  {emoji}
                </motion.span>
              ))}

              {/* Main Bouquet */}
              <motion.div
                className="text-8xl md:text-9xl select-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                💐
              </motion.div>

              {/* Sparkles around bouquet */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={`sparkle-${i}`}
                  className="absolute text-xl pointer-events-none"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: 'easeInOut',
                  }}
                >
                  ✨
                </motion.span>
              ))}
            </div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-8 text-lg md:text-xl font-handwriting text-romantic-velvet text-center max-w-md leading-relaxed"
            >
              &ldquo;These flowers may fade someday, but the feelings behind them never will.&rdquo;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Individual Flower Component ─── */
interface FlowerItemProps {
  flower: FlowerData;
  isClicked: boolean;
  isActive: boolean;
  onClick: () => void;
  positionMode: 'absolute' | 'relative';
}

function FlowerItem({ flower, isClicked, isActive, onClick, positionMode }: FlowerItemProps) {
  return (
    <motion.div
      className="cursor-pointer select-none"
      style={
        positionMode === 'absolute'
          ? { position: 'absolute', left: `${flower.x}%`, top: `${flower.y}%`, transform: 'translate(-50%, -50%)' }
          : { display: 'flex', flexDirection: 'column', alignItems: 'center' }
      }
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: flower.delay * 0.3, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Flower emoji */}
      <motion.div
        onClick={onClick}
        className="relative"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={
          isClicked
            ? { filter: 'drop-shadow(0 0 12px rgba(255,143,175,0.8))' }
            : { filter: 'drop-shadow(0 0 0px transparent)' }
        }
      >
        <motion.span
          className="block"
          style={{ fontSize: flower.size }}
          animate={{
            y: [0, -8, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            y: { duration: 3 + flower.delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: flower.delay * 0.2 },
            rotate: { duration: 4 + flower.delay * 0.3, repeat: Infinity, ease: 'easeInOut', delay: flower.delay * 0.15 },
          }}
        >
          {flower.emoji}
        </motion.span>

        {/* Active glow ring */}
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              margin: -8,
              background: 'radial-gradient(circle, rgba(255,179,198,0.4) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.8 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>

      {/* Message Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute z-30 mt-2 top-full left-1/2 -translate-x-1/2 w-56 glass-panel rounded-2xl p-4 shadow-xl border border-romantic-candypink/30"
          >
            <p className="text-sm font-handwriting text-romantic-velvet text-center leading-relaxed">
              {flower.message}
            </p>
            {/* Little triangle */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 rotate-45 border-l border-t border-romantic-candypink/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
