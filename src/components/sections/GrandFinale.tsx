import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '../particles/FloatingParticles';
import MagicButton from '../ui/MagicButton';
import { useConfetti } from '../../hooks/useConfetti';

interface GrandFinaleProps {
  onReplay: () => void;
}

function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    gold: Math.random() > 0.6,
  }));
}

export default function GrandFinale({ onReplay }: GrandFinaleProps) {
  const [step, setStep] = useState(0);
  const { fireworks } = useConfetti();
  const stars = useMemo(() => generateStars(30), []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 500));
    timers.push(setTimeout(() => setStep(2), 2000));
    timers.push(setTimeout(() => setStep(3), 3000));
    timers.push(setTimeout(() => setStep(4), 4000));
    timers.push(setTimeout(() => {
      setStep(5);
      fireworks();
    }, 5000));
    timers.push(setTimeout(() => setStep(6), 6000));
    timers.push(setTimeout(() => setStep(7), 7000));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center px-4"
      style={{
        background: 'linear-gradient(180deg, #130c25 0%, #1a0e30 30%, #200f35 60%, #130c25 100%)',
      }}
    >
      {/* Star dots */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: star.gold ? '#e6b980' : '#ffffff',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Ambient golden sparkles */}
      <FloatingParticles type="sparkles" count={20} />

      {/* Background particles after step 6 */}
      <AnimatePresence>
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <FloatingParticles type="petals" count={25} />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingParticles type="mixed" count={15} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
        {/* Step 1: Heading */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #e6b980, #ffd700, #e6b980)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(230, 185, 128, 0.3)',
              }}
            >
              Happy Birthday To Someone Who Makes The World More Beautiful.
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Step 2: Heart */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="my-6 relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-7xl md:text-8xl filter drop-shadow-[0_0_30px_rgba(255,50,100,0.6)]"
              >
                ❤️
              </motion.div>
              {/* Warm glow behind heart */}
              <div
                className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(255,50,100,0.5) 0%, transparent 70%)',
                  width: '200px',
                  height: '200px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Message */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-lg md:text-xl lg:text-2xl font-serif leading-relaxed mb-8 px-4"
              style={{ color: '#f3d5a0' }}
            >
              You are the most precious gift life has ever given. Happy Birthday, my love! Today and always. ❤️
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step 4: Photo frame */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
              className="mb-8"
            >
              <div className="relative p-3 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #e6b980, #b8860b, #e6b980, #daa520)',
                  boxShadow: '0 0 30px rgba(230, 185, 128, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="p-1 rounded"
                  style={{
                    background: 'linear-gradient(135deg, #b8860b, #e6b980)',
                  }}
                >
                  <div className="bg-romantic-night/80 backdrop-blur-sm rounded flex items-center justify-center"
                    style={{ width: '220px', height: '180px' }}
                  >
                    <div className="text-center">
                      <span className="text-4xl block mb-2">📸</span>
                      <p className="text-amber-300/70 text-sm font-serif italic">Your Special Photo</p>
                    </div>
                  </div>
                </div>
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-300 rounded-tl" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-300 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-300 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-300 rounded-br" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 7: Replay button */}
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <MagicButton variant="gold" size="lg" onClick={onReplay}>
                Replay My Surprise ❤️
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 7 ? 0.5 : 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-6 text-amber-400/50 text-sm font-serif"
      >
        Made with ❤️
      </motion.p>
    </section>
  );
}
