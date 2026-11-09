import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import FloatingParticles from '../particles/FloatingParticles';
import PasswordLock from '../ui/PasswordLock';
import { useConfetti } from '../../hooks/useConfetti';
import MemoryBox from './gifts/MemoryBox';
import TeddyBearSurprise from './gifts/TeddyBearSurprise';
import PandaParadise from './gifts/PandaParadise';
import LoveLetter from './gifts/LoveLetter';
import MysteryBox from './gifts/MysteryBox';

interface GiftItem {
  id: string;
  name: string;
  emoji: string;
}

const GIFTS: GiftItem[] = [
  { id: 'memory', name: 'A Memory Box 📸', emoji: '📸' },
  { id: 'teddy', name: 'Teddy Bear Surprise 🧸', emoji: '🧸' },
  { id: 'panda', name: 'Panda Paradise 🐼', emoji: '🐼' },
  { id: 'letter', name: 'The Love Letter 💌', emoji: '💌' },
  { id: 'mystery', name: 'Mystery Box ✨', emoji: '✨' },
];

const GIFT_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  memory: MemoryBox,
  teddy: TeddyBearSurprise,
  panda: PandaParadise,
  letter: LoveLetter,
  mystery: MysteryBox,
};

export default function GiftGallery() {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const [activePasswordGift, setActivePasswordGift] = useState<string | null>(null);
  const [activeContentGift, setActiveContentGift] = useState<string | null>(null);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const { fireworks, fireGoldBurst, fireHearts } = useConfetti();

  const allUnlocked = GIFTS.every((g) => unlocked[g.id]);

  const handleGiftClick = (giftId: string) => {
    if (unlocked[giftId]) {
      setActiveContentGift(giftId);
    } else {
      setActivePasswordGift(giftId);
    }
  };

  const handleUnlock = (giftId: string) => {
    setActivePasswordGift(null);
    const newUnlocked = { ...unlocked, [giftId]: true };
    setUnlocked(newUnlocked);

    setTimeout(() => {
      setActiveContentGift(giftId);
    }, 200);

    const allNowUnlocked = GIFTS.every((g) => newUnlocked[g.id]);
    if (allNowUnlocked && !celebrationShown) {
      setCelebrationShown(true);
      setTimeout(() => {
        fireworks();
        fireGoldBurst();
        fireHearts();
      }, 800);
    }
  };

  const handleCloseContent = () => {
    setActiveContentGift(null);
  };

  const ActiveComponent = activeContentGift
    ? GIFT_COMPONENTS[activeContentGift]
    : null;

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-romantic-cream via-amber-50/40 to-romantic-gold/20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-romantic-gold/10 to-amber-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-romantic-candypink/10 to-romantic-lavender/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <FloatingParticles type="stars" count={20} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-100/80 to-romantic-gold/30 border border-romantic-gold/30 mb-6"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift className="w-4 h-4 text-romantic-darkGold" />
            <span className="text-romantic-darkGold text-sm font-medium">Special Surprises Await</span>
            <Sparkles className="w-4 h-4 text-romantic-darkGold" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
            🎁{' '}
            <span className="bg-gradient-to-r from-romantic-darkGold via-romantic-gold to-amber-500 bg-clip-text text-transparent">
              Your Surprise Gift Gallery
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Each gift holds a special surprise. Unlock them one by one!
          </p>
        </motion.div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GIFTS.map((gift, index) => {
            const isUnlocked = unlocked[gift.id];
            return (
              <motion.button
                key={gift.id}
                onClick={() => handleGiftClick(gift.id)}
                className="group relative text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.97 }}
              >
                <div
                  className={`glass-panel rounded-3xl p-8 h-full transition-all duration-500 border-2 ${
                    isUnlocked
                      ? 'border-green-300/50 shadow-[0_0_30px_rgba(74,222,128,0.15)]'
                      : 'border-romantic-gold/20 hover:border-romantic-gold/50 hover:shadow-[0_8px_40px_rgba(230,185,128,0.25)]'
                  }`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-romantic-gold/0 to-amber-200/0 group-hover:from-romantic-gold/5 group-hover:to-amber-200/10 transition-all duration-500" />

                  {/* Emoji Icon */}
                  <motion.div
                    className="text-6xl mb-4 relative z-10"
                    animate={
                      isUnlocked
                        ? { scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }
                        : { scale: [1, 1.08, 1] }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {gift.emoji}
                  </motion.div>

                  {/* Gift Name */}
                  <h3 className="font-serif text-xl text-gray-800 mb-3 relative z-10">
                    {gift.name}
                  </h3>

                  {/* Lock Status */}
                  <div className="flex items-center gap-2 relative z-10">
                    {isUnlocked ? (
                      <motion.div
                        className="flex items-center gap-2 text-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Unlocked ✅</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-romantic-darkGold transition-colors">
                        <Lock className="w-5 h-5" />
                        <span className="text-sm font-medium">Tap to unlock 🔒</span>
                      </div>
                    )}
                  </div>

                  {/* Sparkle decoration */}
                  {!isUnlocked && (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.span
                        className="text-2xl"
                        animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ✨
                      </motion.span>
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="absolute top-3 right-3">
                      <span className="text-sm text-gray-400">Tap to view</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* All Gifts Opened Celebration */}
        <AnimatePresence>
          {allUnlocked && (
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
            >
              <div className="glass-gold rounded-3xl p-10 max-w-2xl mx-auto glow-gold">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎉
                </motion.div>
                <h3 className="font-serif text-3xl md:text-4xl text-romantic-darkGold mb-3">
                  All Gifts Opened! 🎉
                </h3>
                <p className="text-amber-700 text-lg mb-2">
                  You've unlocked every single surprise!
                </p>
                <p className="text-amber-600/70 text-sm">
                  Happy Birthday! You deserve all of this and so much more! 🥳💝
                </p>
                <motion.div
                  className="flex justify-center gap-3 mt-6 text-3xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span>🎂</span>
                  <span>🎈</span>
                  <span>🎁</span>
                  <span>💖</span>
                  <span>🌟</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Password Lock Overlay */}
      <AnimatePresence>
        {activePasswordGift && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setActivePasswordGift(null)}
            />
            <PasswordLock
              onUnlock={() => handleUnlock(activePasswordGift)}
              hint="A special date 🎂 (4 digits)"
              title={`🔐 Unlock: ${GIFTS.find((g) => g.id === activePasswordGift)?.name}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gift Content Modal */}
      <AnimatePresence>
        {activeContentGift && ActiveComponent && (
          <ActiveComponent onClose={handleCloseContent} />
        )}
      </AnimatePresence>
    </section>
  );
}
