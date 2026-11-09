export type PageState = 'welcome' | 'password' | 'main';

export interface Photo {
  id: string;
  src: string;
  caption: string;
  date?: string;
  emoji?: string;
}

export const BIRTHDAY_PASSWORD = '1011';

export function getBirthdayDate(refYear?: number): Date {
  const year = refYear ?? new Date().getFullYear();
  return new Date(year, 10, 10); // November 10
}

export const SAMPLE_PHOTOS: Photo[] = [
  { id: '1', src: '/photos/photo1', caption: 'A Beautiful Memory ❤️', date: '2026' },
  { id: '2', src: '/photos/photo2.jpeg', caption: 'Together, Always 💕', date: '2026' },
  { id: '3', src: '/photos/photo3.jpeg', caption: 'This Moment Was Perfect ✨', date: '2026' },
  { id: '4', src: '/photos/photo4.jpeg', caption: 'You Make Everything Better 🌹', date: '2026' },
  { id: '5', src: '/photos/photo5.jpeg', caption: 'My Favorite Smile 😊', date: '2026' },
  { id: '6', src: '/photos/photo6.jpeg', caption: 'Forever & Always 💫', date: '2026' },
];

export const ROMANTIC_MESSAGES = [
  "You make the world a better place just by being in it.",
  "Every moment with you is a memory I treasure.",
  "Your smile is my favorite thing in the entire universe.",
  "You are the reason I believe in magic.",
  "The world is more beautiful because you exist.",
  "You deserve all the happiness in the world.",
  "You're not just special — you're extraordinary.",
  "My heart smiles every time I think of you.",
  "You're the most beautiful surprise life ever gave me.",
  "Being around you feels like a warm hug for my soul.",
];

export const FLOWER_MESSAGES = [
  "Like this flower, you bloom wherever you go 🌸",
  "You bring color to every moment 🌺",
  "You're rare, like a flower that blooms once a century 🌹",
  "Every petal holds a wish just for you 🌷",
  "You make the world blossom 🌼",
  "Your beauty outshines every garden 💐",
];
