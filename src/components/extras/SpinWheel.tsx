import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import MagicButton from '../ui/MagicButton';

const SEGMENTS = [
  { label: '❤️ Hug', color: '#ffb3c6' },
  { label: '💋 Kiss', color: '#c4b5fd' },
  { label: '🌹 Rose', color: '#fca5a5' },
  { label: '🍰 Cake', color: '#fde68a' },
  { label: '🎵 Song', color: '#a7f3d0' },
  { label: '💌 Letter', color: '#93c5fd' },
  { label: '⭐ Wish', color: '#fcd34d' },
  { label: '🎁 Gift', color: '#f9a8d4' },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // Random extra rotation: 5-8 full spins + random angle
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const randomAngle = Math.random() * 360;
    const newRotation = rotation + extraSpins + randomAngle;
    setRotation(newRotation);

    // Determine winner after spin completes
    setTimeout(() => {
      // The pointer is at top (0 degrees). After rotation, we need to figure out
      // which segment is at top. Normalize the final angle.
      const normalizedAngle = newRotation % 360;
      // The wheel rotates clockwise, so the segment at top is determined by:
      // (360 - normalizedAngle) normalized to 0-360
      const pointerAngle = (360 - normalizedAngle + 360) % 360;
      const winnerIndex = Math.floor(pointerAngle / SEGMENT_ANGLE) % SEGMENTS.length;
      setResult(SEGMENTS[winnerIndex].label);
      setIsSpinning(false);
    }, 4200);
  }, [isSpinning, rotation]);

  const spinAgain = useCallback(() => {
    setResult(null);
    spin();
  }, [spin]);

  // Build conic-gradient
  const conicGradient = SEGMENTS.map((seg, i) => {
    const start = (i * SEGMENT_ANGLE);
    const end = ((i + 1) * SEGMENT_ANGLE);
    return `${seg.color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel rounded-3xl p-6 md:p-8 max-w-sm mx-auto text-center"
    >
      <h3 className="text-2xl font-bold text-pink-600 mb-2">
        🎡 Spin The Wheel!
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Spin to win a cute reward!
      </p>

      {/* Wheel container */}
      <div className="relative mx-auto mb-6" style={{ width: 260, height: 280 }}>
        {/* Pointer/arrow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '24px solid #e11d48',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          />
        </div>

        {/* Wheel */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ rotate: rotation }}
            transition={{
              duration: 4,
              ease: [0.17, 0.67, 0.12, 0.99],
            }}
            className="relative rounded-full shadow-xl border-4 border-white"
            style={{
              width: 250,
              height: 250,
              background: `conic-gradient(${conicGradient})`,
            }}
          >
            {/* Segment labels */}
            {SEGMENTS.map((seg, i) => {
              const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: '0 0',
                  }}
                >
                  <span
                    className="absolute text-xs font-bold text-gray-800 whitespace-nowrap"
                    style={{
                      left: '35px',
                      top: '-8px',
                      textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                    }}
                  >
                    {seg.label}
                  </span>
                </div>
              );
            })}

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-3 border-rose-300 flex items-center justify-center text-sm">
              🎀
            </div>

            {/* Segment divider lines */}
            {SEGMENTS.map((_, i) => (
              <div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  transform: `rotate(${i * SEGMENT_ANGLE}deg)`,
                  width: '50%',
                  height: '1px',
                  background: 'rgba(255,255,255,0.6)',
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Spin button */}
      {!result ? (
        <MagicButton
          onClick={spin}
          disabled={isSpinning}
          variant="primary"
        >
          {isSpinning ? '🎡 Spinning...' : '🎡 SPIN!'}
        </MagicButton>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <motion.p
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="text-lg font-bold text-pink-600 mb-4"
          >
            You won: {result}! 🎉
          </motion.p>
          <MagicButton onClick={spinAgain} variant="outline" size="sm">
            Spin Again ✨
          </MagicButton>
        </motion.div>
      )}
    </motion.div>
  );
}
