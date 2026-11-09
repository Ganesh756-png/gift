import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/birthday.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.addEventListener('error', () => setHasError(true));
    audio.addEventListener('canplaythrough', () => setHasError(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener('error', () => setHasError(true));
      audio.removeEventListener('canplaythrough', () => setHasError(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasError(true));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, hasError]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="glass-panel rounded-2xl p-4 mb-3 w-64 shadow-xl"
          >
            <h3 className="text-base font-semibold text-pink-600 mb-3 text-center">
              Birthday Playlist 🎶
            </h3>

            {/* Now playing */}
            <div className="bg-pink-50 rounded-xl px-3 py-2 mb-3">
              <p className="text-xs text-gray-400 mb-0.5">Now playing</p>
              <p className="text-sm text-gray-700 font-medium truncate">
                Happy Birthday To You 🎂
              </p>
            </div>

            {/* Play/Pause */}
            <div className="flex items-center justify-center mb-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                disabled={hasError}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${
                  hasError
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-300/40 hover:shadow-xl cursor-pointer'
                }`}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #fb7185 0%, #fb7185 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                }}
              />
              <span className="text-xs text-gray-400">🔊</span>
            </div>

            {/* Error or instructions */}
            {hasError ? (
              <p className="text-xs text-amber-600 text-center bg-amber-50 rounded-lg px-2 py-1.5">
                🎵 No music file found
              </p>
            ) : (
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                🎵 Add your own music file to<br />
                <code className="text-pink-400 bg-pink-50 px-1 rounded text-[10px]">/public/music/birthday.mp3</code>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-pink-300/50 flex items-center justify-center text-xl cursor-pointer relative"
      >
        <motion.span
          animate={!isOpen ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🎵
        </motion.span>
        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-pink-400"
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
