import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MagicButton from '../../ui/MagicButton';
import { useConfetti } from '../../../hooks/useConfetti';

interface PandaParadiseProps {
  onClose: () => void;
}

interface PandaAction {
  emoji: string;
  label: string;
  message: string;
}

const PANDA_ACTIONS: PandaAction[] = [
  { emoji: '🎋', label: 'Feed Bamboo', message: 'Yummy! The panda loves bamboo! 🎋💚' },
  { emoji: '🤗', label: 'Pet Panda', message: 'So soft and fluffy! Panda is happy! 🥰' },
  { emoji: '📸', label: 'Take Selfie', message: "Cheese! 📸 Best panda selfie ever! 🐼✨" },
  { emoji: '🎵', label: 'Sing Together', message: "🎶 La la la~ Panda loves singing with you! 🎵" },
  { emoji: '💤', label: 'Nap Time', message: 'Zzz... The panda fell asleep on your lap! 😴💕' },
  { emoji: '🎂', label: 'Birthday Cake', message: 'Happy Birthday from Panda! 🎂🐼🎉' },
];

export default function PandaParadise({ onClose }: PandaParadiseProps) {
  const [currentAction, setCurrentAction] = useState<PandaAction | null>(null);
  const [happiness, setHappiness] = useState(0);
  const [pandaMood, setPandaMood] = useState<'idle' | 'happy' | 'eating' | 'sleeping'>('idle');
  const { firePastel, fireStars } = useConfetti();

  const pandaEmoji = useMemo(() => {
    if (pandaMood === 'sleeping') return '😴';
    if (pandaMood === 'eating') return '🐼';
    if (pandaMood === 'happy') return '🥰';
    return '🐼';
  }, [pandaMood]);

  const handleAction = (action: PandaAction) => {
    setCurrentAction(action);
    setHappiness((h) => Math.min(h + 18, 100));

    if (action.label === 'Nap Time') setPandaMood('sleeping');
    else if (action.label === 'Feed Bamboo') setPandaMood('eating');
    else setPandaMood('happy');

    if (happiness + 18 >= 100) {
      fireStars();
      firePastel();
    }

    setTimeout(() => setPandaMood('idle'), 2500);
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
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5 text-green-600" />
        </button>

        <h3 className="font-serif text-3xl text-gray-800 mb-2">
          Panda Paradise 🐼
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Play with your birthday panda!
        </p>

        {/* Panda */}
        <motion.div
          className="relative inline-block mb-4"
          animate={
            pandaMood === 'happy'
              ? { rotate: [0, -10, 10, -5, 0], scale: [1, 1.15, 1] }
              : pandaMood === 'eating'
              ? { y: [0, -5, 0, -3, 0] }
              : pandaMood === 'sleeping'
              ? { rotate: [0, 3, 0, -3, 0] }
              : { y: [0, -8, 0] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[100px] sm:text-[130px] block leading-none">
            {pandaEmoji}
          </span>
          {/* Bamboo decoration */}
          <span className="absolute -right-4 top-4 text-3xl">🎋</span>
          <span className="absolute -left-4 bottom-4 text-2xl">🌿</span>
        </motion.div>

        {/* Happiness bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-500 font-medium">Panda Happiness</span>
            <span className="text-xs text-green-600 font-bold">{happiness}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"
              animate={{ width: `${happiness}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          {happiness >= 100 && (
            <motion.p
              className="text-green-600 text-sm mt-2 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎉 Maximum happiness! Panda loves you! 🐼💖
            </motion.p>
          )}
        </div>

        {/* Message bubble */}
        <AnimatePresence mode="wait">
          {currentAction && (
            <motion.div
              key={currentAction.label}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200/50"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <p className="font-serif text-green-800">{currentAction.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PANDA_ACTIONS.map((action) => (
            <MagicButton
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleAction(action)}
              className="!border-green-300 !text-green-700 hover:!bg-green-50 text-xs"
            >
              {action.emoji} {action.label}
            </MagicButton>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

