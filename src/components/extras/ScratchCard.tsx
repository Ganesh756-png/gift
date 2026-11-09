import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';

const PRIZES = [
  '🏆 You won: Infinite Love!',
  '🎁 You won: A Million Hugs!',
  '💎 You won: A Heart of Gold!',
  '👑 You won: The Crown of Cuteness!',
  '🌟 You won: A Lifetime of Happiness!',
];

const CANVAS_WIDTH = 250;
const CANVAS_HEIGHT = 150;

export default function ScratchCard() {
  const [prize] = useState(() => PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  const [revealed, setRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const { fireBurst } = useConfetti();

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    // Gray overlay with subtle texture
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#b8b8b8');
    gradient.addColorStop(0.5, '#a0a0a0');
    gradient.addColorStop(1, '#b0b0b0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Add scratch texture dots
    ctx.fillStyle = '#c0c0c0';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * CANVAS_WIDTH;
      const y = Math.random() * CANVAS_HEIGHT;
      ctx.fillRect(x, y, 2, 2);
    }

    // Scratch me text
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#888';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch Me! ✨', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas, gameKey]);

  const calculateScratchPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    return (transparent / total) * 100;
  }, []);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const y = (clientY - rect.top) * (CANVAS_HEIGHT / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    const percent = calculateScratchPercent();
    setScratchPercent(percent);

    if (percent > 50 && !revealed) {
      setRevealed(true);
      fireBurst();
    }
  }, [revealed, calculateScratchPercent, fireBurst]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  }, [scratch]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  }, [scratch]);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  }, [scratch]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  }, [scratch]);

  const handleTouchEnd = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const resetGame = useCallback(() => {
    setRevealed(false);
    setScratchPercent(0);
    setGameKey(k => k + 1);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 md:p-8 max-w-sm mx-auto"
    >
      <h3 className="text-2xl font-bold text-center mb-2 text-pink-600">
        🎫 Scratch & Win!
      </h3>
      <p className="text-sm text-gray-400 text-center mb-5">
        Scratch the card to reveal your prize!
      </p>

      {/* Scratch area */}
      <div className="relative mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-pink-200"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        {/* Prize underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          <motion.p
            animate={revealed ? { scale: [0.8, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg font-bold text-center px-4 leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #e6b980, #b8860b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {prize}
          </motion.p>
        </div>

        {/* Scratch canvas */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              key={gameKey}
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 cursor-pointer touch-none"
              style={{ width: '100%', height: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress */}
      {!revealed && scratchPercent > 0 && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div
              className="h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(scratchPercent, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">
            {Math.round(scratchPercent)}% scratched
          </p>
        </div>
      )}

      {/* Revealed celebration */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <p className="text-pink-500 text-sm mb-3">🎉 Congratulations! 🎉</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-medium shadow-md cursor-pointer"
            >
              Play Again ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
