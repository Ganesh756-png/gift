import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import MagicButton from '../../ui/MagicButton';
import { SAMPLE_PHOTOS, ROMANTIC_MESSAGES } from '../../../types';

interface MemoryBoxProps {
  onClose: () => void;
}

export default function MemoryBox({ onClose }: MemoryBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const memories = useMemo(
    () =>
      SAMPLE_PHOTOS.map((p, i) => ({
        ...p,
        message: ROMANTIC_MESSAGES[i % ROMANTIC_MESSAGES.length],
      })),
    [],
  );

  const current = memories[currentIndex];

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return memories.length - 1;
      if (next >= memories.length) return 0;
      return next;
    });
  };

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 glass-panel rounded-3xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5 text-rose-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="text-5xl mb-3"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📸
          </motion.div>
          <h3 className="font-serif text-3xl text-gray-800">Memory Box</h3>
          <p className="text-gray-500 text-sm mt-1">
            Our beautiful moments together
          </p>
        </div>

        {/* Photo carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 mb-6 aspect-[4/3]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              {/* Decorative photo frame */}
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 flex items-center justify-center shadow-lg border-4 border-white/80">
                  <span className="text-6xl">{current.emoji || '💝'}</span>
                </div>
                {/* Frame corner decorations */}
                <div className="absolute -top-2 -left-2 text-lg">✿</div>
                <div className="absolute -top-2 -right-2 text-lg">✿</div>
                <div className="absolute -bottom-2 -left-2 text-lg">✿</div>
                <div className="absolute -bottom-2 -right-2 text-lg">✿</div>
              </div>

              <h4 className="font-serif text-xl text-gray-800 mt-4">
                {current.caption}
              </h4>
              {current.date && (
                <span className="text-rose-400 text-sm mt-1">{current.date}</span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Like button */}
          <motion.button
            className="absolute bottom-4 right-4 z-10"
            whileTap={{ scale: 1.5 }}
            onClick={() =>
              setLiked((prev) => ({
                ...prev,
                [currentIndex]: !prev[currentIndex],
              }))
            }
          >
            <Heart
              className={`w-8 h-8 transition-colors ${
                liked[currentIndex]
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-rose-300 hover:text-rose-400'
              }`}
            />
          </motion.button>
        </div>

        {/* Message */}
        <motion.div
          key={currentIndex}
          className="text-center bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 mb-6 border border-rose-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-serif text-rose-600 italic">
            "{current.message}"
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <MagicButton
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </MagicButton>

          <div className="flex gap-2">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-rose-500 scale-125'
                    : 'bg-rose-200 hover:bg-rose-300'
                }`}
              />
            ))}
          </div>

          <MagicButton
            variant="outline"
            size="sm"
            onClick={() => navigate(1)}
            icon={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </MagicButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

