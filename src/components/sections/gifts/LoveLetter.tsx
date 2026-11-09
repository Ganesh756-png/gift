import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import MagicButton from '../../ui/MagicButton';
import { useConfetti } from '../../../hooks/useConfetti';

interface LoveLetterProps {
  onClose: () => void;
}

const LETTER_LINES = [
  "My Dearest,",
  "",
  "On this special day, I want you to know...",
  "",
  "You are the most incredible person I've ever known.",
  "Your smile lights up the entire world around you.",
  "Every moment spent with you is a treasure I hold close.",
  "",
  "You make everything better just by being you.",
  "Your kindness, your laughter, your beautiful soul —",
  "They are gifts the world is blessed to have.",
  "",
  "Happy Birthday to someone who truly deserves",
  "all the happiness, love, and magic in the world.",
  "",
  "Today is YOUR day, and I hope it's filled with",
  "as much joy as you bring into everyone's life.",
  "",
  "With all my love,",
  "Forever & Always 💝",
];

export default function LoveLetter({ onClose }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const { fireHearts, firePastel } = useConfetti();

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    fireHearts();

    // Reveal lines one by one
    let lineCount = 0;
    const interval = setInterval(() => {
      lineCount++;
      setRevealedLines(lineCount);
      if (lineCount >= LETTER_LINES.length) {
        clearInterval(interval);
        firePastel();
      }
    }, 200);
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
        className="relative z-10 glass-panel rounded-3xl p-6 md:p-10 max-w-lg w-full text-center max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5 text-rose-500" />
        </button>

        <h3 className="font-serif text-3xl text-gray-800 mb-2">
          The Love Letter 💌
        </h3>
        <p className="text-gray-500 text-sm mb-8">
          A heartfelt message just for you
        </p>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope */
            <motion.div
              key="envelope"
              className="relative inline-block cursor-pointer mb-8"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <span className="text-[120px] sm:text-[150px] block leading-none drop-shadow-xl">
                💌
              </span>

              {/* Seal */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl">💋</span>
              </motion.div>

              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-rose-300/20 blur-3xl -z-10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            /* Letter content */
            <motion.div
              key="letter"
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-amber-50/80 via-rose-50/60 to-pink-50/80 rounded-2xl p-6 md:p-8 border border-rose-200/40 shadow-inner text-left relative overflow-hidden">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_27px,rgba(0,0,0,0.1)_28px)]" />

                {LETTER_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    className={`relative z-10 ${
                      line === '' ? 'h-4' : ''
                    } ${
                      i === 0
                        ? 'font-script text-2xl text-rose-600 mb-1'
                        : i >= LETTER_LINES.length - 2
                        ? 'font-script text-xl text-rose-500 mt-1'
                        : 'font-serif text-gray-700 text-sm sm:text-base leading-relaxed'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      i < revealedLines
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {line || '\u00A0'}
                  </motion.p>
                ))}

                {/* Rose decoration */}
                {revealedLines >= LETTER_LINES.length && (
                  <motion.div
                    className="text-right mt-4 text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  >
                    🌹
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen ? (
          <MagicButton variant="primary" size="lg" onClick={handleOpenEnvelope} icon={<Send className="w-5 h-5" />}>
            Open the Letter 💌
          </MagicButton>
        ) : (
          revealedLines >= LETTER_LINES.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MagicButton variant="primary" size="md" onClick={() => { fireHearts(); }}>
                Send Love Back ❤️
              </MagicButton>
            </motion.div>
          )
        )}
      </motion.div>
    </motion.div>
  );
}

