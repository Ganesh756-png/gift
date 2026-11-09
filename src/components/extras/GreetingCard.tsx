import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';

export default function GreetingCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { firePastel } = useConfetti();

  const openCard = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => firePastel(), 600);
    }
  }, [isOpen, firePastel]);

  const closeCard = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 md:p-8 max-w-md mx-auto text-center"
    >
      <h3 className="text-2xl font-bold text-pink-600 mb-6">
        💌 Your Birthday Card
      </h3>

      {/* Card container with perspective */}
      <div
        className="mx-auto relative cursor-pointer select-none"
        style={{
          perspective: '1000px',
          width: 280,
          height: 380,
        }}
        onClick={!isOpen ? openCard : undefined}
      >
        {/* Card base (inside - visible when open) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl flex"
          style={{
            background: 'linear-gradient(135deg, #fffbf0, #fff5e6)',
            border: '2px solid #f3d5a0',
          }}
        >
          {/* Left page */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-3 relative"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 23px, #f0e0d0 23px, #f0e0d0 24px)',
              borderRight: '1px dashed #e0d0c0',
            }}
          >
            <p className="text-sm text-rose-500 italic leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              From the bottom of my heart...
            </p>
            <div className="mt-3 flex gap-1">
              <span className="text-lg">💕</span>
              <span className="text-lg">🌸</span>
              <span className="text-lg">💕</span>
            </div>
          </div>

          {/* Right page */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-3">
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed text-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Wishing you the happiest birthday filled with love, laughter, and all things beautiful!
            </p>
            <p className="text-xs md:text-sm text-gray-700 mt-3 leading-relaxed text-center"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              You deserve the world!
            </p>
            <p className="mt-3 text-lg">❤️🎂✨</p>
          </div>
        </div>

        {/* Front cover (flips open) */}
        <motion.div
          animate={isOpen ? { rotateY: -180 } : { rotateY: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 rounded-2xl overflow-hidden"
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #ff8fab 0%, #ffb3c6 30%, #ff69b4 60%, #ff8fab 100%)',
              boxShadow: isOpen
                ? '5px 5px 20px rgba(0,0,0,0.2)'
                : '2px 2px 10px rgba(0,0,0,0.15)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <div className="flex gap-2 text-xl opacity-70">
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                💖
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                ✨
              </motion.span>
            </div>

            {/* Hearts decoration */}
            <div className="flex gap-1 text-2xl">
              <span>💕</span>
              <span>🌹</span>
              <span>💕</span>
            </div>

            <h4 className="text-3xl font-serif text-white font-bold drop-shadow-md"
              style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            >
              Happy<br />Birthday!
            </h4>

            {/* More decorations */}
            <div className="flex gap-1 text-2xl">
              <span>⭐</span>
              <span>🎀</span>
              <span>⭐</span>
            </div>

            {!isOpen && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/80 text-sm mt-2"
              >
                Click to open →
              </motion.p>
            )}

            {/* Corner decorations */}
            <span className="absolute top-3 left-3 text-lg opacity-50">🌸</span>
            <span className="absolute top-3 right-3 text-lg opacity-50">🌸</span>
            <span className="absolute bottom-3 left-3 text-lg opacity-50">🌸</span>
            <span className="absolute bottom-3 right-3 text-lg opacity-50">🌸</span>
          </div>

          {/* Back face (inside of cover when opened - seen from behind) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #fff5f5, #ffe5ec)',
              border: '2px solid #f3d5a0',
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 23px, #f5e0e0 23px, #f5e0e0 24px)',
              }}
            >
              <p className="text-sm text-rose-400 italic text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                This card is filled with love, made especially for you 💝
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Close button */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={closeCard}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-medium shadow-md cursor-pointer"
          >
            Close Card 💌
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
