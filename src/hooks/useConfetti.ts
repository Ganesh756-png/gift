import confetti from 'canvas-confetti';

const COLORS_ROMANTIC = ['#ff6b81', '#ff4757', '#ff6348', '#ffa502', '#ff69b4', '#f8a5c2', '#e056a0'];
const COLORS_GOLD = ['#ffd700', '#ffb347', '#e6b980', '#daa520', '#f0c27f', '#ffe9a0'];
const COLORS_PASTEL = ['#ffb3c6', '#ff8fab', '#fb6f92', '#f8a5c2', '#fcc5d8', '#ffe5ec'];

export function useConfetti() {
  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: COLORS_ROMANTIC,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: COLORS_ROMANTIC,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const fireBurst = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: COLORS_ROMANTIC,
    });
  };

  const fireGoldBurst = () => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5 },
      colors: COLORS_GOLD,
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });
  };

  const fireHearts = () => {
    const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
    confetti({
      shapes: [heart],
      particleCount: 30,
      spread: 160,
      origin: { y: 0.5 },
      scalar: 2,
      gravity: 0.6,
      ticks: 200,
    });
  };

  const fireworks = () => {
    const duration = 5000;
    const animEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = animEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 60 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.4 },
        colors: [...COLORS_ROMANTIC, ...COLORS_GOLD],
      });
    }, 250);
  };

  const fireStars = () => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { y: 0.4 },
      colors: COLORS_GOLD,
      shapes: ['star'],
      scalar: 1.5,
    });
  };

  const firePastel = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: COLORS_PASTEL,
      gravity: 0.5,
    });
  };

  return { fireConfetti, fireBurst, fireGoldBurst, fireHearts, fireworks, fireStars, firePastel };
}
