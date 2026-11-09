import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomePage from './components/sections/WelcomePage';
import PasswordEntry from './components/sections/PasswordEntry';
import FlowerWonderland from './components/sections/FlowerWonderland';
import GiftGallery from './components/sections/GiftGallery';
import BirthdayCake from './components/sections/BirthdayCake';
import MemoryTimeline from './components/sections/MemoryTimeline';
import ToyWonderland from './components/sections/ToyWonderland';
import GrandFinale from './components/sections/GrandFinale';
import MusicPlayer from './components/extras/MusicPlayer';
import ScratchCard from './components/extras/ScratchCard';
import SpinWheel from './components/extras/SpinWheel';
import BirthdayQuiz from './components/extras/BirthdayQuiz';
import GreetingCard from './components/extras/GreetingCard';
import type { PageState } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('welcome');

  const handleOpen = useCallback(() => {
    setCurrentPage('password');
  }, []);

  const handleUnlock = useCallback(() => {
    setCurrentPage('main');
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setCurrentPage('welcome'), 500);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomePage onOpen={handleOpen} />
          </motion.div>
        )}

        {currentPage === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <PasswordEntry onUnlock={handleUnlock} />
          </motion.div>
        )}

        {currentPage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Floating Music Player */}
            <MusicPlayer />

            {/* Main scrollable sections */}
            <div className="relative">
              {/* Section 1: Flower Wonderland */}
              <section id="flowers">
                <FlowerWonderland />
              </section>

              {/* Section 2: Gift Gallery */}
              <section id="gifts">
                <GiftGallery />
              </section>

              {/* Section 3: Birthday Cake */}
              <section id="cake">
                <BirthdayCake />
              </section>

              {/* Section 4: Memory Timeline */}
              <section id="memories">
                <MemoryTimeline />
              </section>

              {/* Section 5: Extras - Fun Interactive Games */}
              <section id="extras" className="min-h-screen bg-gradient-to-b from-romantic-blush via-white to-romantic-lavender py-20 px-4">
                <motion.div
                  className="max-w-6xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-serif text-4xl md:text-5xl text-center text-gray-800 mb-4">
                    🎮 Fun & Surprises
                  </h2>
                  <p className="text-center text-gray-500 mb-12 text-lg">
                    Play mini games, scratch cards, and more!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <GreetingCard />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <ScratchCard />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <SpinWheel />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <BirthdayQuiz />
                    </motion.div>
                  </div>
                </motion.div>
              </section>

              {/* Section 6: Toy Wonderland */}
              <section id="toys">
                <ToyWonderland />
              </section>

              {/* Section 7: Grand Finale */}
              <section id="finale">
                <GrandFinale onReplay={handleReplay} />
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
