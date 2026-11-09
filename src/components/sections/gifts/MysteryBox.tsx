import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import MagicButton from '../../ui/MagicButton';
import { useConfetti } from '../../../hooks/useConfetti';

interface MysteryBoxProps {
  onClose: () => void;
}

interface MysteryPrize {
  emoji: string;
  title: string;
  message: string;
  rarity: 'common' | 'rare' | 'legendary';
}

const MYSTERY_PRIZES: MysteryPrize[] = [
  { emoji: '💎', title: 'Diamond Heart', message: "You're as precious as a diamond!", rarity: 'legendary' },
  { emoji: '🌈', title: 'Rainbow Wish', message: 'A colorful wish for a colorful soul!', rarity: 'rare' },
  { emoji: '🦄', title: 'Unicorn Blessing', message: 'Magical things are coming your way!', rarity: 'legendary' },
  { emoji: '🌟', title: 'Golden Star', message: "You're a shining star in everyone's life!", rarity: 'rare' },
  { emoji: '🎪', title: 'Circus of Joy', message: 'Life is a circus and you are the star act!', rarity: 'common' },
  { emoji: '🍰', title: 'Infinite Cake', message: 'Unlimited cake slices for the birthday star!', rarity: 'common' },
  { emoji: '🎭', title: 'Theatre of Dreams', message: 'All your dreams deserve a standing ovation!', rarity: 'rare' },
  { emoji: '🏆', title: 'Best Person Trophy', message: "You've won the 'Best Person Ever' award!", rarity: 'legendary' },
  { emoji: '🎵', title: 'Musical Heart', message: 'Your heart plays the sweetest melody!', rarity: 'common' },
  { emoji: '🌸', title: 'Eternal Blossom', message: 'May you bloom beautifully, always!', rarity: 'rare' },
];

const RARITY_COLORS = {
  common: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', text: 'text-blue-600', label: '⭐ Common' },
  rare: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', text: 'text-purple-600', label: '💜 Rare' },
  legendary: { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-300', text: 'text-amber-600', label: '🏆 Legendary!' },
};

export default function MysteryBox({ onClose }: MysteryBoxProps) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'revealed'>('closed');
  const [prize, setPrize] = useState<MysteryPrize | null>(null);
  const [collection, setCollection] = useState<MysteryPrize[]>([]);
  const { fireworks, fireGoldBurst, fireBurst } = useConfetti();

  const openBox = () => {
    setPhase('opening');

    setTimeout(() => {
      const won = MYSTERY_PRIZES[Math.floor(Math.random() * MYSTERY_PRIZES.length)];
      setPrize(won);
      setCollection((prev) => [...prev, won]);
      setPhase('revealed');

      if (won.rarity === 'legendary') {
        fireworks();
      } else if (won.rarity === 'rare') {
        fireGoldBurst();
      } else {
        fireBurst();
      }
    }, 2000);
  };

  const resetBox = () => {
    setPhase('closed');
    setPrize(null);
  };

  const rarityStyle = prize ? RARITY_COLORS[prize.rarity] : null;

  // Unique collection count
  const uniqueCount = useMemo(
    () => new Set(collection.map((p) => p.title)).size,
    [collection],
  );

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
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5 text-purple-500" />
        </button>

        <h3 className="font-serif text-3xl text-gray-800 mb-2">
          Mystery Box ✨
        </h3>
        <p className="text-gray-500 text-sm mb-8">
          Open to discover a magical surprise!
        </p>

        <AnimatePresence mode="wait">
          {phase === 'closed' && (
            <motion.div
              key="closed"
              exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mystery box */}
              <motion.div
                className="relative inline-block mb-8 cursor-pointer"
                onClick={openBox}
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                  filter: [
                    'drop-shadow(0 0 15px rgba(168,85,247,0.3))',
                    'drop-shadow(0 0 30px rgba(168,85,247,0.6))',
                    'drop-shadow(0 0 15px rgba(168,85,247,0.3))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-[120px] sm:text-[140px] block leading-none">
                  🎁
                </span>

                {/* Mystery sparkles */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (360 / 6) * i;
                  const rad = (angle * Math.PI) / 180;
                  const dist = 60 + Math.random() * 20;
                  return (
                    <motion.span
                      key={i}
                      className="absolute text-purple-400 text-sm"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                        top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                      }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        delay: Math.random() * 2,
                        repeat: Infinity,
                      }}
                    >
                      ✦
                    </motion.span>
                  );
                })}

                {/* Question marks */}
                <motion.span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl text-purple-400"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ?
                </motion.span>
              </motion.div>

              <MagicButton
                variant="secondary"
                size="lg"
                onClick={openBox}
                icon={<Sparkles className="w-5 h-5" />}
              >
                Open Mystery Box ✨
              </MagicButton>
            </motion.div>
          )}

          {phase === 'opening' && (
            <motion.div
              key="opening"
              className="py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-[100px] inline-block"
                animate={{
                  rotate: [0, -20, 20, -20, 20, 0],
                  scale: [1, 1.2, 0.9, 1.3, 0.8, 1.5],
                }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                🎁
              </motion.div>
              <motion.p
                className="text-purple-500 font-serif text-xl mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                Opening...
              </motion.p>

              {/* Spinning stars */}
              <motion.div
                className="flex justify-center gap-3 mt-4 text-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
              >
                ⭐ 🌟 ✨ 💫 ⭐
              </motion.div>
            </motion.div>
          )}

          {phase === 'revealed' && prize && rarityStyle && (
            <motion.div
              key="revealed"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Prize reveal */}
              <motion.div
                className="text-[100px] sm:text-[120px] mb-4 inline-block"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {prize.emoji}
              </motion.div>

              {/* Rarity badge */}
              <motion.div
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3 bg-gradient-to-r ${rarityStyle.bg} ${rarityStyle.border} border ${rarityStyle.text}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                {RARITY_COLORS[prize.rarity].label}
              </motion.div>

              <h4 className="font-serif text-2xl text-gray-800 mb-2">
                {prize.title}
              </h4>

              <motion.div
                className={`bg-gradient-to-r ${rarityStyle.bg} rounded-2xl p-4 mb-6 border ${rarityStyle.border}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className={`font-serif ${rarityStyle.text}`}>
                  {prize.message}
                </p>
              </motion.div>

              {/* Collection counter */}
              <p className="text-gray-400 text-sm mb-4">
                Collection: {uniqueCount}/{MYSTERY_PRIZES.length} unique prizes
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <MagicButton variant="secondary" size="md" onClick={resetBox}>
                  Open Another! 🎁
                </MagicButton>
                <MagicButton variant="outline" size="md" onClick={onClose}>
                  Done ✨
                </MagicButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini collection display */}
        {collection.length > 0 && phase !== 'opening' && (
          <motion.div
            className="mt-6 pt-4 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xs text-gray-400 mb-2">Your Collection</p>
            <div className="flex flex-wrap justify-center gap-1">
              {collection.map((p, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  title={p.title}
                >
                  {p.emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

