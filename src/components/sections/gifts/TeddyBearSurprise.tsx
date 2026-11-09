import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MagicButton from '../../ui/MagicButton';
import { useConfetti } from '../../../hooks/useConfetti';

interface TeddyBearSurpriseProps {
  onClose: () => void;
}

const TEDDY_MESSAGES = [
  "I'm your birthday bear! 🧸",
  "Sending you the biggest bear hug! 🤗",
  "You're un-BEAR-ably cute! 😄",
  "I love you BEARY much! 💕",
  "Hope your birthday is PAWS-itively amazing! 🐾",
  "You deserve all the cuddles! 🥰",
];

export default function TeddyBearSurprise({ onClose }: TeddyBearSurpriseProps) {
  const [hugged, setHugged] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hugCount, setHugCount] = useState(0);
  const { firePastel, fireHearts } = useConfetti();

  const handleHug = () => {
    setHugged(true);
    setHugCount((c) => c + 1);
    setMessageIndex((prev) => (prev + 1) % TEDDY_MESSAGES.length);
    if (hugCount % 3 === 0) fireHearts();
    firePastel();
    setTimeout(() => setHugged(false), 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 glass-panel rounded-3xl p-6 md:p-10 max-w-lg w-full text-center"
        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5 text-rose-500" />
        </button>

        <h3 className="font-serif text-3xl text-gray-800 mb-2">
          Teddy Bear Surprise
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Tap the teddy for a warm hug! 🤗
        </p>

        {/* Teddy bear */}
        <div className="relative inline-block mb-6">
          {/* Hearts floating up on hug */}
          <AnimatePresence>
            {hugged &&
              Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={`heart-${hugCount}-${i}`}
                  className="absolute text-xl pointer-events-none"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    bottom: '60%',
                  }}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: 0,
                    y: -80 - Math.random() * 60,
                    x: -30 + Math.random() * 60,
                    scale: 1.2,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.08 }}
                >
                  {['❤️', '💕', '💖', '💗', '🤎', '🧡', '💛', '💜'][i]}
                </motion.span>
              ))}
          </AnimatePresence>

          <motion.button
            onClick={handleHug}
            className="relative cursor-pointer select-none focus:outline-none"
            animate={
              hugged
                ? {
                    scale: [1, 1.25, 1.15],
                    rotate: [0, -8, 8, -4, 0],
                  }
                : {
                    y: [0, -8, 0],
                  }
            }
            transition={
              hugged
                ? { duration: 0.8, ease: 'easeInOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[120px] sm:text-[150px] block leading-none drop-shadow-lg">
              🧸
            </span>

            {/* Glowing aura */}
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-300/20 blur-2xl -z-10"
              animate={
                hugged
                  ? { scale: [1, 2, 1], opacity: [0.3, 0.7, 0.3] }
                  : { scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }
              }
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </div>

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-6 border border-amber-200/50 relative"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-50 border-l border-t border-amber-200/50 rotate-45" />
            <p className="font-serif text-lg text-amber-800 relative z-10">
              {TEDDY_MESSAGES[messageIndex]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Hug counter */}
        <div className="text-gray-400 text-sm mb-4">
          Hugs given: <span className="text-rose-500 font-bold">{hugCount}</span>{' '}
          🤗
        </div>

        <MagicButton variant="gold" size="md" onClick={handleHug}>
          Hug the Teddy! 🤗
        </MagicButton>
      </motion.div>
    </motion.div>
  );
}

