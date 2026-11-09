import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import FloatingParticles from '../particles/FloatingParticles';
import { SAMPLE_PHOTOS } from '../../types';
import type { Photo } from '../../types';

const GRADIENTS = [
  'linear-gradient(135deg, #fbb6ce 0%, #f687b3 50%, #d53f8c 100%)',
  'linear-gradient(135deg, #b794f4 0%, #9f7aea 50%, #805ad5 100%)',
  'linear-gradient(135deg, #fbd38d 0%, #f6ad55 50%, #ed8936 100%)',
  'linear-gradient(135deg, #9ae6b4 0%, #68d391 50%, #48bb78 100%)',
  'linear-gradient(135deg, #90cdf4 0%, #63b3ed 50%, #4299e1 100%)',
  'linear-gradient(135deg, #feb2b2 0%, #fc8181 50%, #f56565 100%)',
];

export default function MemoryTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-romantic-lavender via-romantic-cream to-romantic-blush" />

      {/* Particles */}
      <FloatingParticles type="sparkles" count={10} />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-serif text-romantic-velvet text-center mb-4 text-glow max-w-3xl leading-tight"
      >
        📸 Every Picture Has A Story
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-lg md:text-xl font-handwriting text-romantic-velvet/70 text-center mb-12"
      >
        And Every Memory Is Special.
      </motion.p>

      {/* Timeline Container */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Scroll Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center shadow-lg border border-romantic-candypink/20 hover:bg-white hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-romantic-velvet" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center shadow-lg border border-romantic-candypink/20 hover:bg-white hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-romantic-velvet" />
        </button>

        {/* Horizontal Timeline Line */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-romantic-candypink/40 to-transparent z-0" />

        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          className="flex md:flex-row flex-col md:overflow-x-auto overflow-visible gap-6 md:gap-8 px-6 py-8 md:snap-x md:snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {SAMPLE_PHOTOS.map((photo, index) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              index={index}
              gradient={GRADIENTS[index % GRADIENTS.length]}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mt-8 glass-panel rounded-xl px-6 py-4 max-w-lg mx-auto border border-romantic-candypink/20"
      >
        <p className="text-sm text-romantic-velvet/60 text-center">
          💡 Replace the photos in <span className="font-mono text-romantic-hotpink bg-romantic-softpink/50 px-1.5 py-0.5 rounded">/public/photos/</span> to add your own memories!
        </p>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <LightboxModal
            photo={selectedPhoto}
            gradient={GRADIENTS[SAMPLE_PHOTOS.findIndex((p) => p.id === selectedPhoto.id) % GRADIENTS.length]}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Polaroid Card ─── */
interface PolaroidCardProps {
  photo: Photo;
  index: number;
  gradient: string;
  onClick: () => void;
}

function PolaroidCard({ photo, index, gradient, onClick }: PolaroidCardProps) {
  const rotation = index % 2 === 0 ? -3 : 3;

  return (
    <motion.div
      className="md:snap-center flex-shrink-0 cursor-pointer"
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.07,
        rotate: 0,
        y: -12,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div
        className="bg-white rounded-sm p-3 pb-14 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        style={{ width: 240 }}
      >
        {/* Photo Area */}
        <div
          className="w-full aspect-[4/3] rounded-sm overflow-hidden relative"
          style={{ background: gradient }}
        >
          {/* Placeholder content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90">
            <motion.span
              className="text-4xl mb-2"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {['📷', '🌅', '✨', '💕', '🌸', '🎉'][index % 6]}
            </motion.span>
            <p className="text-xs font-medium text-center px-4 leading-relaxed opacity-80">
              {photo.caption}
            </p>
          </div>

          {/* Subtle shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
            }}
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-2 left-3 right-3">
          <p className="font-handwriting text-romantic-velvet text-base truncate">
            {photo.caption}
          </p>
          {photo.date && (
            <p className="text-[11px] text-romantic-velvet/40 mt-0.5 font-sans">
              {photo.date}
            </p>
          )}
        </div>

        {/* Tape effect on top */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm"
          style={{
            background: 'rgba(255,235,200,0.7)',
            backdropFilter: 'blur(2px)',
            transform: 'translateX(-50%) rotate(-1deg)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Lightbox Modal ─── */
interface LightboxModalProps {
  photo: Photo;
  gradient: string;
  onClose: () => void;
}

function LightboxModal({ photo, gradient, onClose }: LightboxModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-romantic-night/60 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 bg-white rounded-lg p-4 pb-8 shadow-2xl max-w-lg w-full"
        initial={{ scale: 0.5, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-romantic-softpink transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4 text-romantic-velvet" />
        </button>

        {/* Photo area */}
        <div
          className="w-full aspect-[4/3] rounded-md overflow-hidden relative"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-6xl mb-3">📸</span>
            <p className="text-sm font-medium opacity-80">Your photo will appear here</p>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Caption & Date */}
        <div className="mt-4 text-center">
          <p className="font-handwriting text-2xl text-romantic-velvet">{photo.caption}</p>
          {photo.date && (
            <p className="text-sm text-romantic-velvet/50 mt-1 font-sans">{photo.date}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
