import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';

interface Question {
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    question: "What's the birthday date?",
    options: ['Nov 10', 'Dec 25', 'Jan 1'],
  },
  {
    question: "What's the best birthday gift?",
    options: ['Love ❤️', 'Money 💰', 'A trip ✈️'],
  },
  {
    question: 'How many candles on the cake?',
    options: ['Just enough ✨', 'Too many 😅', "Who's counting? 🎂"],
  },
  {
    question: 'What makes birthdays special?',
    options: ['The people you love 💕', 'The cake 🎂', 'The gifts 🎁'],
  },
  {
    question: "What's the birthday wish?",
    options: ['Happiness forever 🌟', 'World peace ✌️', 'More birthdays! 🎉'],
  },
];

export default function BirthdayQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const { fireBurst } = useConfetti();

  const handleAnswer = useCallback((optionIndex: number) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setFinished(true);
        fireBurst();
      }
    }, 1200);
  }, [answered, currentQ, fireBurst]);

  const resetQuiz = useCallback(() => {
    setCurrentQ(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setFinished(false);
  }, []);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ + (answered ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 md:p-8 max-w-sm mx-auto"
    >
      <h3 className="text-2xl font-bold text-center mb-2 text-pink-600">
        🧠 Birthday Quiz!
      </h3>

      {!finished ? (
        <>
          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Question {currentQ + 1}/{QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-lg font-semibold text-gray-700 mb-4 text-center">
                {question.question}
              </p>

              <div className="flex flex-col gap-2.5">
                {question.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={!answered ? { scale: 1.02, x: 4 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer text-sm font-medium ${
                      answered && selectedAnswer === idx
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : answered
                        ? 'border-gray-200 bg-gray-50 text-gray-400'
                        : 'border-pink-200 bg-white hover:border-pink-400 hover:bg-pink-50 text-gray-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0"
                        style={{
                          borderColor: answered && selectedAnswer === idx ? '#22c55e' : '#f9a8d4',
                          backgroundColor: answered && selectedAnswer === idx ? '#22c55e' : 'transparent',
                          color: answered && selectedAnswer === idx ? 'white' : '#f9a8d4',
                        }}
                      >
                        {answered && selectedAnswer === idx ? '✓' : String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Correct feedback */}
              <AnimatePresence>
                {answered && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-green-500 font-semibold mt-3 text-sm"
                  >
                    Correct! 🎉
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center py-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl mb-4"
          >
            🏆
          </motion.div>
          <h4 className="text-xl font-bold text-pink-600 mb-2">
            You scored 5/5!
          </h4>
          <p className="text-gray-500 mb-5 text-sm">
            You know birthdays best! 🎉🏆
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-medium shadow-md cursor-pointer"
          >
            Play Again ✨
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
