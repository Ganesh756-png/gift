import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import FloatingParticles from '../particles/FloatingParticles';
import MagicButton from '../ui/MagicButton';
import { useConfetti } from '../../hooks/useConfetti';
import { getBirthdayDate } from '../../types';

interface WelcomePageProps {
  onOpen: () => void;
}

/* ─── Countdown helper ─── */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const thisYear = now.getFullYear();
  const bdayThisYear = getBirthdayDate(thisYear);

  // Check if today IS the birthday
  if (
    now.getDate() === bdayThisYear.getDate() &&
    now.getMonth() === bdayThisYear.getMonth()
  ) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  // Determine target date
  const target = now > bdayThisYear ? getBirthdayDate(thisYear + 1) : bdayThisYear;
  const diff = target.getTime() - now.getTime();

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isBirthday: false,
  };
}

/* ─── Sparkle around gift box ─── */
function GiftSparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (360 / 14) * i,
        distance: 70 + Math.random() * 40,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 3,
        duration: 1.8 + Math.random() * 2,
      })),
    [],
  );

  return (
    <>
      {sparkles.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = Math.cos(rad) * s.distance;
        const y = Math.sin(rad) * s.distance;
        return (
          <motion.span
            key={s.id}
            className="absolute pointer-events-none text-yellow-300"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              fontSize: `${s.size}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✦
          </motion.span>
        );
      })}
    </>
  );
}

/* ─── Floating gradient orbs ─── */
function GradientOrbs() {
  const orbs = useMemo(
    () => [
      { color: 'from-pink-300/30 to-rose-400/20', size: 'w-72 h-72', x: '10%', y: '15%', dur: 18 },
      { color: 'from-purple-300/25 to-violet-400/15', size: 'w-96 h-96', x: '70%', y: '60%', dur: 22 },
      { color: 'from-amber-200/25 to-yellow-300/15', size: 'w-64 h-64', x: '80%', y: '10%', dur: 15 },
      { color: 'from-rose-200/30 to-pink-300/20', size: 'w-80 h-80', x: '25%', y: '75%', dur: 20 },
      { color: 'from-fuchsia-200/20 to-pink-200/15', size: 'w-56 h-56', x: '55%', y: '30%', dur: 25 },
    ],
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} ${orb.size} blur-3xl`}
          style={{ left: orb.x, top: orb.y }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -35, 25, -15, 0],
            scale: [1, 1.15, 0.95, 1.08, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated headline (word by word) ─── */
const HEADLINE_WORDS = 'Someone Very Special Has A Surprise Waiting For You...'.split(' ');

function AnimatedHeadline() {
  return (
    <motion.h1
      className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-snug md:leading-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 drop-shadow-sm px-4 select-none"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
    >
      {HEADLINE_WORDS.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.35em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { type: 'spring', damping: 18, stiffness: 100 },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ─── Countdown display ─── */
function CountdownDisplay() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.isBirthday) {
    return (
      <motion.div
        className="text-center"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      >
        <motion.p
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-600 text-glow"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎂 Happy Birthday! Today Is Your Special Day! 🎂
        </motion.p>
      </motion.div>
    );
  }

  const segments = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 sm:gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      {segments.map((seg) => (
        <div
          key={seg.label}
          className="glass-panel rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] text-center"
        >
          <motion.span
            key={seg.value}
            className="block font-serif text-2xl sm:text-3xl md:text-4xl text-rose-600 font-bold"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {String(seg.value).padStart(2, '0')}
          </motion.span>
          <span className="text-xs sm:text-sm text-rose-400 font-medium tracking-wide">
            {seg.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Gift box ─── */
function GiftBox({ onClick }: { onClick: () => void }) {
  const controls = useAnimation();
  const glowControls = useAnimation();
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(async () => {
    if (clicked) return;
    setClicked(true);

    // Glow burst
    glowControls.start({
      scale: [1, 2.5, 3],
      opacity: [0.5, 0.9, 0],
      transition: { duration: 1.2, ease: 'easeOut' },
    });

    // Gift animation: scale up, rotate, then disappear
    await controls.start({
      scale: [1, 1.3, 1.4, 1.5],
      rotate: [0, -12, 12, -6, 0],
      filter: [
        'drop-shadow(0 0 20px rgba(244,63,94,0.5))',
        'drop-shadow(0 0 50px rgba(244,63,94,0.9))',
        'drop-shadow(0 0 80px rgba(255,215,0,1))',
        'drop-shadow(0 0 120px rgba(255,255,255,1))',
      ],
      transition: { duration: 1.4, ease: 'easeInOut' },
    });

    onClick();
  }, [clicked, controls, glowControls, onClick]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Sparkle particles around gift */}
      <GiftSparkles />

      {/* Pulsing glow behind the gift */}
      <motion.div
        className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-rose-400/40 via-pink-400/30 to-amber-300/30 blur-2xl"
        animate={
          clicked
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow burst ring on click */}
      <motion.div
        className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-rose-300/60"
        initial={{ scale: 1, opacity: 0 }}
        animate={glowControls}
      />

      {/* Gift box */}
      <motion.button
        className="relative z-10 cursor-pointer select-none focus:outline-none"
        animate={
          clicked
            ? controls
            : {
                y: [0, -12, 0],
              }
        }
        transition={
          clicked
            ? undefined
            : {
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        whileHover={
          clicked
            ? {}
            : {
                scale: 1.12,
                rotateY: 15,
                rotateX: -5,
                filter: 'drop-shadow(0 0 40px rgba(244,63,94,0.7))',
              }
        }
        whileTap={clicked ? {} : { scale: 0.95 }}
        onClick={handleClick}
        style={{ perspective: 600 }}
        aria-label="Open your surprise gift"
      >
        {/* Ribbon top bow */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl z-20 select-none"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎀
        </motion.div>

        {/* The gift emoji */}
        <span className="text-[100px] sm:text-[130px] md:text-[150px] block leading-none">
          🎁
        </span>

        {/* Shimmering overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 45%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.button>
    </div>
  );
}

/* ─── Main WelcomePage ─── */
export default function WelcomePage({ onOpen }: WelcomePageProps) {
  const { fireworks, fireGoldBurst, fireHearts } = useConfetti();
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    if (opened) return;
    setOpened(true);
    fireworks();
    setTimeout(() => fireGoldBurst(), 600);
    setTimeout(() => fireHearts(), 1000);
    setTimeout(() => onOpen(), 1800);
  }, [opened, onOpen, fireworks, fireGoldBurst, fireHearts]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #fff0f5 0%, #f3e8ff 25%, #ffe5ec 50%, #fffdfa 75%, #f3e8ff 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated gradient orbs */}
        <GradientOrbs />

        {/* Floating particles */}
        <FloatingParticles type="mixed" count={30} />

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 sm:gap-10 px-4 w-full max-w-3xl mx-auto">
          {/* Animated headline */}
          <AnimatedHeadline />

          {/* Gift box */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.8,
              type: 'spring',
              stiffness: 160,
              damping: 14,
            }}
          >
            <GiftBox onClick={handleOpen} />
          </motion.div>

          {/* Open button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8, ease: 'easeOut' }}
          >
            <MagicButton
              onClick={handleOpen}
              variant="primary"
              size="lg"
              className="text-lg sm:text-xl px-10 py-5 shadow-2xl shadow-rose-400/30"
            >
              Open Your Surprise ❤️
            </MagicButton>
          </motion.div>

          {/* Countdown section */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.8 }}
          >
            <p className="text-center font-serif text-rose-400 text-sm sm:text-base mb-3 tracking-wide">
              ✨ Counting down to your special day ✨
            </p>
            <CountdownDisplay />
          </motion.div>
        </div>

        {/* Subtle bottom decorative line */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-rose-300/60 text-xs sm:text-sm select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
        >
          <span>Made with</span>
          <motion.span
            className="text-rose-400 text-base"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ❤️
          </motion.span>
          <span>just for you</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

