import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicButton from '../ui/MagicButton';
import { useConfetti } from '../../hooks/useConfetti';

interface SmokeParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
}

const SMOKE_PARTICLES: SmokeParticle[] = [
  { id: 0, x: -6, size: 10, delay: 0 },
  { id: 1, x: 4, size: 8, delay: 0.1 },
  { id: 2, x: -2, size: 12, delay: 0.2 },
  { id: 3, x: 7, size: 9, delay: 0.3 },
];

export default function BirthdayCake() {
  const [isLit, setIsLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showWishMessage, setShowWishMessage] = useState(false);
  const { fireBurst } = useConfetti();

  const handleBlowCandle = useCallback(() => {
    if (!isLit) return;
    setIsLit(false);
    setShowSmoke(true);
    setTimeout(() => {
      setShowWishMessage(true);
      fireBurst();
    }, 600);
    setTimeout(() => setShowSmoke(false), 2000);
  }, [isLit, fireBurst]);

  const handleRelight = useCallback(() => {
    setShowWishMessage(false);
    setShowSmoke(false);
    setTimeout(() => setIsLit(true), 200);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-romantic-cream via-romantic-blush to-romantic-softpink" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-pink-100/30" />

      {/* Warm ambient glow when lit */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="absolute z-0 pointer-events-none"
            style={{
              width: 500,
              height: 500,
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(255,200,100,0.15) 0%, rgba(255,180,80,0.08) 40%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-romantic-velvet text-center mb-14 text-glow"
      >
        🎂 Make A Wish!
      </motion.h2>

      {/* Cake Container */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="relative flex flex-col items-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* ═══════ CANDLE + FLAME ═══════ */}
          <div className="relative flex flex-col items-center mb-1 z-20">
            {/* Smoke Effect */}
            <AnimatePresence>
              {showSmoke &&
                SMOKE_PARTICLES.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      width: p.size,
                      height: p.size,
                      background: 'radial-gradient(circle, rgba(180,180,180,0.6) 0%, rgba(200,200,200,0.2) 70%)',
                      bottom: 50,
                      left: `calc(50% + ${p.x}px)`,
                    }}
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -80, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, delay: p.delay, ease: 'easeOut' }}
                  />
                ))}
            </AnimatePresence>

            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  className="relative cursor-pointer"
                  onClick={handleBlowCandle}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {/* Flame glow */}
                  <div
                    className="absolute -inset-3 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,200,50,0.4) 0%, rgba(255,160,30,0.15) 50%, transparent 70%)',
                      filter: 'blur(4px)',
                    }}
                  />
                  {/* Flame shape */}
                  <div
                    className="animate-candle-flicker"
                    style={{
                      width: 14,
                      height: 22,
                      background: 'linear-gradient(to top, #ff6b35, #ffa500 40%, #ffdd00 70%, #fff8dc)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: '0 0 12px rgba(255,165,0,0.6), 0 0 24px rgba(255,165,0,0.3)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Candle Wick */}
            <div className="w-[2px] h-2 bg-gray-700 rounded-full" />

            {/* Candle Body */}
            <div
              className="cursor-pointer"
              onClick={handleBlowCandle}
              style={{
                width: 16,
                height: 50,
                background: 'linear-gradient(to right, #f8e0e0, #fff5f5 30%, #ffcccc 70%, #f0b8b8)',
                borderRadius: '3px 3px 2px 2px',
                boxShadow: '1px 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              {/* Candle stripes */}
              <div className="absolute top-3 left-0 right-0 h-[2px] bg-pink-300/50" />
              <div className="absolute top-6 left-0 right-0 h-[2px] bg-pink-300/50" />
            </div>
          </div>

          {/* ═══════ STRAWBERRIES on top ═══════ */}
          <div className="relative z-10 flex justify-center gap-3 -mb-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative">
                {/* Berry */}
                <div
                  className="w-4 h-5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #ff6b6b, #e53e3e)',
                    boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.15)',
                  }}
                />
                {/* Leaf */}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2"
                  style={{
                    width: 8,
                    height: 5,
                    background: '#48bb78',
                    borderRadius: '50% 50% 0 0',
                  }}
                />
              </div>
            ))}
          </div>

          {/* ═══════ CAKE LAYERS ═══════ */}

          {/* --- Top Layer --- */}
          <div className="relative">
            <div
              className="relative z-10 mx-auto"
              style={{
                width: 110,
                height: 48,
                background: 'linear-gradient(to bottom, #fbb6ce, #f687b3)',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: '0 2px 8px rgba(244,114,182,0.3)',
              }}
            >
              {/* Frosting drips */}
              {[15, 35, 58, 80].map((l, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: l,
                    top: -4,
                    width: 14,
                    height: 14 + (i % 2) * 6,
                    background: '#fff5f7',
                    borderRadius: '0 0 50% 50%',
                  }}
                />
              ))}
              {/* Cream top */}
              <div
                className="absolute -top-2 left-0 right-0 h-5 rounded-t-lg"
                style={{
                  background: 'linear-gradient(to bottom, #fff5f7, #fed7e2)',
                  borderRadius: '10px 10px 0 0',
                }}
              />
            </div>

            {/* Decorative CSS flowers on sides */}
            <div className="absolute -left-4 top-3 z-20">
              <CSSFlower color="#f687b3" size={16} />
            </div>
            <div className="absolute -right-4 top-3 z-20">
              <CSSFlower color="#d53f8c" size={16} />
            </div>
          </div>

          {/* --- Middle Layer --- */}
          <div className="relative -mt-1">
            <div
              className="relative z-10 mx-auto"
              style={{
                width: 160,
                height: 52,
                background: 'linear-gradient(to bottom, #d6bcfa, #b794f4)',
                borderRadius: '6px 6px 4px 4px',
                boxShadow: '0 2px 8px rgba(159,122,234,0.3)',
              }}
            >
              {/* Frosting drips */}
              {[12, 40, 70, 100, 130].map((l, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: l,
                    top: -3,
                    width: 12,
                    height: 12 + (i % 3) * 5,
                    background: '#e9d8fd',
                    borderRadius: '0 0 50% 50%',
                  }}
                />
              ))}
              {/* Cream top */}
              <div
                className="absolute -top-2 left-0 right-0 h-4"
                style={{
                  background: 'linear-gradient(to bottom, #e9d8fd, #d6bcfa)',
                  borderRadius: '8px 8px 0 0',
                }}
              />
            </div>

            {/* Side flowers */}
            <div className="absolute -left-5 top-4 z-20">
              <CSSFlower color="#9f7aea" size={14} />
            </div>
            <div className="absolute -right-5 top-4 z-20">
              <CSSFlower color="#b794f4" size={14} />
            </div>
          </div>

          {/* --- Bottom Layer --- */}
          <div className="relative -mt-1">
            <div
              className="relative z-10 mx-auto"
              style={{
                width: 210,
                height: 60,
                background: 'linear-gradient(to bottom, #fbb6ce, #f687b3)',
                borderRadius: '6px 6px 8px 8px',
                boxShadow: '0 4px 12px rgba(244,114,182,0.3)',
              }}
            >
              {/* White dots pattern */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/40"
                  style={{
                    width: 6,
                    height: 6,
                    left: 12 + i * 16,
                    top: 20 + (i % 2) * 14,
                  }}
                />
              ))}
              {/* Frosting drips */}
              {[15, 45, 80, 115, 145, 175].map((l, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: l,
                    top: -3,
                    width: 13,
                    height: 13 + (i % 2) * 7,
                    background: '#fff5f7',
                    borderRadius: '0 0 50% 50%',
                  }}
                />
              ))}
              {/* Cream top */}
              <div
                className="absolute -top-2 left-0 right-0 h-5"
                style={{
                  background: 'linear-gradient(to bottom, #fff5f7, #fbb6ce)',
                  borderRadius: '8px 8px 0 0',
                }}
              />
            </div>

            {/* Side flowers */}
            <div className="absolute -left-5 top-5 z-20">
              <CSSFlower color="#f687b3" size={16} />
            </div>
            <div className="absolute -right-5 top-5 z-20">
              <CSSFlower color="#fbb6ce" size={16} />
            </div>
          </div>

          {/* ═══════ CAKE PLATE / STAND ═══════ */}
          <div className="relative -mt-1 z-0">
            {/* Plate top */}
            <div
              style={{
                width: 250,
                height: 14,
                background: 'linear-gradient(to bottom, #fafafa, #e8e8e8)',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            {/* Stand stem */}
            <div className="mx-auto" style={{ width: 30, height: 20, background: 'linear-gradient(to right, #e0e0e0, #fafafa 50%, #d0d0d0)' }} />
            {/* Stand base */}
            <div
              className="mx-auto"
              style={{
                width: 120,
                height: 10,
                background: 'linear-gradient(to bottom, #f0f0f0, #d8d8d8)',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Instruction / Wish Message */}
      <div className="relative z-10 mt-10 text-center">
        <AnimatePresence mode="wait">
          {isLit && !showWishMessage && (
            <motion.p
              key="instruction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl font-handwriting text-romantic-velvet/80"
            >
              Click the candle to make a wish! 🕯️
            </motion.p>
          )}
          {showWishMessage && (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center gap-6"
            >
              <motion.p
                className="text-2xl md:text-3xl font-serif text-romantic-velvet text-glow"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✨ Your wish deserves to come true ✨
              </motion.p>
              <MagicButton onClick={handleRelight} variant="gold" size="md">
                Relight Candle 🕯️
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Decorative CSS Flower ─── */
function CSSFlower({ color, size }: { color: string; size: number }) {
  const petalCount = 5;
  return (
    <div className="relative" style={{ width: size * 2, height: size * 2 }}>
      {Array.from({ length: petalCount }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * 0.7,
            height: size,
            background: color,
            left: '50%',
            top: '50%',
            transformOrigin: '50% 0%',
            transform: `translate(-50%, -50%) rotate(${i * (360 / petalCount)}deg) translateY(-${size * 0.35}px)`,
            opacity: 0.85,
          }}
        />
      ))}
      {/* Center */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.45,
          height: size * 0.45,
          background: '#fefcbf',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
