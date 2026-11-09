import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { BIRTHDAY_PASSWORD } from '../../types';
import { useConfetti } from '../../hooks/useConfetti';

interface PasswordLockProps {
  onUnlock: () => void;
  hint?: string;
  title?: string;
}

export default function PasswordLock({ onUnlock, hint, title }: PasswordLockProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { fireBurst, fireGoldBurst } = useConfetti();

  const errorMessages = [
    "Hmm, that's not it! Try again 💭",
    "Almost! Think harder 🤔",
    "Nope! But don't give up 💪",
    "So close yet so far! 😄",
    "Check the hint again 💡",
  ];

  const handleSubmit = useCallback(() => {
    if (password === BIRTHDAY_PASSWORD) {
      setUnlocked(true);
      fireBurst();
      setTimeout(() => fireGoldBurst(), 400);
      setTimeout(() => onUnlock(), 1500);
    } else {
      setError(true);
      setShake(true);
      setErrorMsg(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      setPassword('');
      setTimeout(() => {
        setShake(false);
        setError(false);
      }, 800);
    }
  }, [password, onUnlock, fireBurst, fireGoldBurst]);

  useEffect(() => {
    if (password.length === 4) {
      handleSubmit();
    }
  }, [password, handleSubmit]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (digit: string) => {
    if (password.length < 4 && !unlocked) {
      setPassword(prev => prev + digit);
      setError(false);
      setErrorMsg('');
    }
  };

  const handleDelete = () => {
    setPassword(prev => prev.slice(0, -1));
    setError(false);
    setErrorMsg('');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-romantic-blush via-romantic-lavender to-romantic-softpink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-purple-200/40 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-rose-100/40 to-amber-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="glass-panel rounded-3xl p-8 md:p-12 max-w-md w-full mx-4 text-center relative z-10"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={shake ? { duration: 0.4 } : {}}
      >
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div key="locked" exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.4 }}>
              {/* Lock Icon */}
              <motion.div
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-6 shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="font-serif text-2xl md:text-3xl text-gray-800 mb-2">
                {title || "🔐 This Surprise Is Locked"}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">Enter the secret password to unlock</p>

              {/* Password Dots */}
              <div className="flex justify-center gap-4 mb-6">
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      password.length > i
                        ? error
                          ? 'bg-red-400 border-red-400 shadow-[0_0_10px_rgba(248,113,113,0.6)]'
                          : 'bg-rose-400 border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                        : 'border-rose-300 bg-transparent'
                    }`}
                    animate={password.length > i ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>

              {/* Hidden actual input for mobile keyboard */}
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setPassword(val);
                  setError(false);
                  setErrorMsg('');
                }}
                className="sr-only"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoFocus
              />

              {/* Show/Hide toggle */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-rose-400 hover:text-rose-500 transition-colors mb-4 text-sm flex items-center gap-1 mx-auto"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                {showPassword ? 'Hide' : 'Show'}
              </button>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto mb-6">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key) => (
                  key === '' ? <div key="empty" /> : (
                    <motion.button
                      key={key}
                      onClick={() => key === '⌫' ? handleDelete() : handleKeyPress(key)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className={`w-16 h-16 rounded-2xl text-xl font-medium transition-all duration-200
                        ${key === '⌫'
                          ? 'bg-rose-50 text-rose-400 hover:bg-rose-100'
                          : 'bg-white/80 text-gray-700 hover:bg-rose-50 hover:text-rose-500 shadow-sm'
                        } flex items-center justify-center mx-auto`}
                    >
                      {key}
                    </motion.button>
                  )
                ))}
              </div>

              {/* Error message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 text-sm mb-3"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Hint */}
              {hint && (
                <motion.div
                  className="bg-amber-50/80 rounded-xl px-4 py-3 border border-amber-200/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-amber-700 text-sm">
                    💡 <span className="font-medium">Hint:</span> {hint}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="py-8"
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                🎉
              </motion.div>
              <h2 className="font-serif text-3xl text-rose-600 mb-2">Unlocked!</h2>
              <p className="text-gray-500">Preparing your surprise...</p>
              <motion.div
                className="mt-4 mx-auto w-48 h-1 bg-rose-100 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
