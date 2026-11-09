import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROMANTIC_MESSAGES } from '../../types';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface ToyState {
  waving: boolean;
  dancing: boolean;
  hopping: boolean;
  purring: boolean;
  heartMsg: string | null;
  giftShaking: boolean;
  giftRevealed: boolean;
  butterflyFlying: boolean;
  sparkles: SparkleParticle[];
}

const FLOATING_EMOJIS = ['🌈', '⭐', '🎈', '🍭', '🎀', '💖', '🦄', '🌸', '✨', '🎠'];

export default function ToyWonderland() {
  const [state, setState] = useState<ToyState>({
    waving: false,
    dancing: false,
    hopping: false,
    purring: false,
    heartMsg: null,
    giftShaking: false,
    giftRevealed: false,
    butterflyFlying: false,
    sparkles: [],
  });

  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Auto-reset animations
  useEffect(() => {
    if (state.waving) {
      const t = setTimeout(() => setState(s => ({ ...s, waving: false })), 2000);
      return () => clearTimeout(t);
    }
  }, [state.waving]);

  useEffect(() => {
    if (state.dancing) {
      const t = setTimeout(() => setState(s => ({ ...s, dancing: false })), 3000);
      return () => clearTimeout(t);
    }
  }, [state.dancing]);

  useEffect(() => {
    if (state.hopping) {
      const t = setTimeout(() => setState(s => ({ ...s, hopping: false })), 2000);
      return () => clearTimeout(t);
    }
  }, [state.hopping]);

  useEffect(() => {
    if (state.purring) {
      const t = setTimeout(() => setState(s => ({ ...s, purring: false })), 2500);
      return () => clearTimeout(t);
    }
  }, [state.purring]);

  useEffect(() => {
    if (state.giftShaking) {
      const t = setTimeout(() => setState(s => ({ ...s, giftShaking: false, giftRevealed: true })), 1500);
      return () => clearTimeout(t);
    }
  }, [state.giftShaking]);

  useEffect(() => {
    if (state.butterflyFlying) {
      const t = setTimeout(() => setState(s => ({ ...s, butterflyFlying: false })), 3000);
      return () => clearTimeout(t);
    }
  }, [state.butterflyFlying]);

  useEffect(() => {
    if (state.sparkles.length > 0) {
      const t = setTimeout(() => setState(s => ({ ...s, sparkles: [] })), 1500);
      return () => clearTimeout(t);
    }
  }, [state.sparkles]);

  const handleTeddy = useCallback(() => {
    setActiveCard(0);
    setState(s => ({ ...s, waving: true }));
  }, []);

  const handlePanda = useCallback(() => {
    setActiveCard(1);
    setState(s => ({ ...s, dancing: true }));
  }, []);

  const handleRabbit = useCallback(() => {
    setActiveCard(2);
    setState(s => ({ ...s, hopping: true }));
  }, []);

  const handleKitten = useCallback(() => {
    setActiveCard(3);
    setState(s => ({ ...s, purring: true }));
  }, []);

  const handleHeart = useCallback(() => {
    setActiveCard(4);
    const msg = ROMANTIC_MESSAGES[Math.floor(Math.random() * ROMANTIC_MESSAGES.length)];
    setState(s => ({ ...s, heartMsg: msg }));
  }, []);

  const handleGift = useCallback(() => {
    setActiveCard(5);
    setState(s => ({ ...s, giftShaking: true, giftRevealed: false }));
  }, []);

  const handleButterfly = useCallback(() => {
    setActiveCard(6);
    setState(s => ({ ...s, butterflyFlying: true }));
  }, []);

  const handleStar = useCallback(() => {
    setActiveCard(7);
    const newSparkles: SparkleParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i * 45) * (Math.PI / 180),
    }));
    setState(s => ({ ...s, sparkles: newSparkles }));
  }, []);

  const toys = [
    { emoji: '🧸', name: 'Tiny Teddy', handler: handleTeddy, desc: 'Click to wave!' },
    { emoji: '🐼', name: 'Cute Panda', handler: handlePanda, desc: 'Click to dance!' },
    { emoji: '🐰', name: 'Mini Rabbit', handler: handleRabbit, desc: 'Click to hop!' },
    { emoji: '🐱', name: 'Animated Kitten', handler: handleKitten, desc: 'Click to purr!' },
    { emoji: '❤️', name: 'Heart Balloon', handler: handleHeart, desc: 'Click for a message!' },
    { emoji: '🎁', name: 'Little Gift Box', handler: handleGift, desc: 'Click to shake!' },
    { emoji: '🦋', name: 'Floating Butterfly', handler: handleButterfly, desc: 'Click to fly!' },
    { emoji: '🌟', name: 'Magic Star', handler: handleStar, desc: 'Click for sparkles!' },
  ];

  const getEmojiAnimation = (index: number) => {
    switch (index) {
      case 0: // Teddy wave
        return state.waving
          ? { rotate: [0, 15, -15, 15, -15, 10, -10, 0], transition: { duration: 0.8, repeat: 2 } }
          : {};
      case 1: // Panda dance
        return state.dancing
          ? { rotate: [0, 20, -20, 20, -20, 0], y: [0, -15, 0, -15, 0], transition: { duration: 0.6, repeat: 4 } }
          : {};
      case 2: // Rabbit hop
        return state.hopping
          ? { y: [0, -30, 0, -25, 0, -20, 0], transition: { duration: 0.5, repeat: 3 } }
          : {};
      case 3: // Kitten purr
        return state.purring
          ? { x: [0, -2, 2, -2, 2, -1, 1, 0], transition: { duration: 0.15, repeat: 15 } }
          : {};
      case 5: // Gift shake
        return state.giftShaking
          ? { rotate: [0, -10, 10, -10, 10, -5, 5, 0], x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.3, repeat: 4 } }
          : {};
      case 6: // Butterfly fly
        return state.butterflyFlying
          ? { x: [0, 100, 200, 150, -50, -150, 0], y: [0, -50, -20, -80, -40, -10, 0], rotate: [0, 10, -5, 15, -10, 5, 0], transition: { duration: 3, ease: 'easeInOut' } }
          : {};
      default:
        return {};
    }
  };

  return (
    <section className="min-h-screen w-full py-16 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fff0f5 0%, #ffe5ec 20%, #f3e8ff 40%, #e0f7fa 60%, #fff9c4 80%, #fff0f5 100%)',
      }}
    >
      {/* Floating background emojis */}
      {FLOATING_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-2xl opacity-30 select-none"
          style={{
            left: `${(i * 10) + 2}%`,
            top: `${(i * 8 + 5) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-serif text-center mb-4"
          style={{ color: '#8b5cf6' }}
        >
          🧸 The Mini Toy Wonderland
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-lg text-purple-400 mb-12"
        >
          Click on each toy to see the magic! ✨
        </motion.p>

        {/* Toy Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {toys.map((toy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={toy.handler}
              className={`relative cursor-pointer rounded-2xl p-5 md:p-6 flex flex-col items-center gap-3 transition-all duration-300 select-none ${
                activeCard === index
                  ? 'ring-3 ring-pink-400 shadow-xl shadow-pink-200/60'
                  : 'shadow-lg shadow-purple-100/30 hover:shadow-xl'
              }`}
              style={{
                background: [
                  'linear-gradient(135deg, #fff5f5, #ffe5ec)',
                  'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                  'linear-gradient(135deg, #fef3c7, #fde68a)',
                  'linear-gradient(135deg, #ede9fe, #e0e7ff)',
                  'linear-gradient(135deg, #ffe5ec, #ffb3c6)',
                  'linear-gradient(135deg, #fff1f2, #fecdd3)',
                  'linear-gradient(135deg, #e0f2fe, #dbeafe)',
                  'linear-gradient(135deg, #fefce8, #fef9c3)',
                ][index],
              }}
            >
              {/* Emoji */}
              <motion.span
                className="text-5xl md:text-6xl block relative"
                animate={getEmojiAnimation(index)}
              >
                {toy.emoji}

                {/* Purr text for kitten */}
                <AnimatePresence>
                  {index === 3 && state.purring && (
                    <motion.span
                      initial={{ opacity: 0, y: 5, scale: 0.8 }}
                      animate={{ opacity: 1, y: -10, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-pink-500 italic font-medium whitespace-nowrap"
                    >
                      *purrrr* 🐾
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Sparkle particles for magic star */}
                <AnimatePresence>
                  {index === 7 && state.sparkles.map((sparkle) => (
                    <motion.span
                      key={sparkle.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: Math.cos(sparkle.angle) * 70,
                        y: Math.sin(sparkle.angle) * 70,
                        scale: 0.3,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute top-1/2 left-1/2 text-lg pointer-events-none"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </AnimatePresence>
              </motion.span>

              {/* Name */}
              <span className="text-sm md:text-base font-semibold text-gray-700">{toy.name}</span>
              <span className="text-xs text-gray-400">{toy.desc}</span>

              {/* Heart balloon message */}
              <AnimatePresence>
                {index === 4 && state.heartMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-pink-200 z-20 w-52"
                  >
                    <p className="text-xs text-pink-600 text-center leading-relaxed">
                      💕 {state.heartMsg}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gift reveal */}
              <AnimatePresence>
                {index === 5 && state.giftRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-amber-200 z-20 w-56"
                  >
                    <p className="text-xs text-amber-700 text-center leading-relaxed">
                      🎂 Open this gift on your birthday!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
