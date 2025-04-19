export const PREGNANCY_DURATION = 280; // 40 weeks in days

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAYS_MON = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const FRUIT_SIZES: { [key: number]: { name: string; emoji: string } } = {
  4: { name: 'poppy seed', emoji: '🌱' },
  5: { name: 'sesame seed', emoji: '⚪' },
  6: { name: 'lentil seed', emoji: '🫘' },
  7: { name: 'blueberry', emoji: '🫐' },
  8: { name: 'raspberry', emoji: '🫐' },
  9: { name: 'grape', emoji: '🍇' },
  10: { name: 'date', emoji: '🍯' },
  11: { name: 'lime', emoji: '🍋' },
  12: { name: 'plum', emoji: '🫐' },
  13: { name: 'kiwi fruit', emoji: '🥝' },
  14: { name: 'peach', emoji: '🍑' },
  15: { name: 'pear', emoji: '🍐' },
  16: { name: 'avocado', emoji: '🥑' },
  17: { name: 'naval orange', emoji: '🍊' },
  18: { name: 'pomegranate', emoji: '🫐' },
  19: { name: 'grapefruit', emoji: '🍊' },
  20: { name: 'mango', emoji: '🥭' },
  21: { name: 'rockmelon', emoji: '🍈' },
  22: { name: 'eggplant', emoji: '🍆' },
  23: { name: 'eggplant', emoji: '🍆' },
  24: { name: 'eggplant', emoji: '🍆' },
  25: { name: 'papaya', emoji: '🫐' },
  26: { name: 'papaya', emoji: '🫐' },
  27: { name: 'papaya', emoji: '🫐' },
  28: { name: 'papaya', emoji: '🫐' },
  29: { name: 'pumpkin', emoji: '🎃' },
  30: { name: 'pumpkin', emoji: '🎃' },
  31: { name: 'pumpkin', emoji: '🎃' },
  32: { name: 'pumpkin', emoji: '🎃' },
  33: { name: 'honeydew', emoji: '🍈' },
  34: { name: 'honeydew', emoji: '🍈' },
  35: { name: 'honeydew', emoji: '🍈' },
  36: { name: 'honeydew', emoji: '🍈' },
  37: { name: 'watermelon', emoji: '🍉' },
  38: { name: 'watermelon', emoji: '🍉' },
  39: { name: 'watermelon', emoji: '🍉' },
  40: { name: 'watermelon', emoji: '🍉' },
};

export const colorThemes = [
  {
    name: 'Pink Blossom',
    primary: 'pink-800',
    secondary: 'pink-700',
    accent: 'pink-100',
    accentAlt: 'rose-50',
    background: 'pink-50',
    gradient: 'from-pink-50',
  },
  {
    name: 'Lavender Dream',
    primary: 'purple-800',
    secondary: 'purple-700',
    accent: 'purple-100',
    accentAlt: 'violet-50',
    background: 'purple-50',
    gradient: 'from-purple-50',
  },
  {
    name: 'Spring Garden',
    primary: 'emerald-800',
    secondary: 'emerald-700',
    accent: 'emerald-100',
    accentAlt: 'green-50',
    background: 'emerald-50',
    gradient: 'from-emerald-50',
  },
  {
    name: 'Golden Sunset',
    primary: 'amber-800',
    secondary: 'amber-700',
    accent: 'amber-100',
    accentAlt: 'yellow-50',
    background: 'amber-50',
    gradient: 'from-amber-50',
  },
];

export const flowerImages = [
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=200',
  'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=200',
  'https://images.unsplash.com/photo-1613539246066-78db6ec4ff0f?auto=format&fit=crop&w=200',
];

export const flowerPatterns = {
  pattern1: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'%3E%3Cpath d='M398.7 240c30.3-26.7 53.8-61 67.6-99.8a60 60 0 0 0-47-79.5 60 60 0 0 0-79.5-47A240.4 240.4 0 0 0 240 81.3a240.3 240.3 0 0 0-99.8-67.6 60 60 0 0 0-79.5 47 60 60 0 0 0-47 79.5C27.5 179 51 213.2 81.3 240a240.3 240.3 0 0 0-67.6 99.8 60 60 0 0 0 47 79.5 60 60 0 0 0 79.5 47c38.8-13.8 73-37.3 99.8-67.6 26.7 30.3 61 53.8 99.8 67.6a60 60 0 0 0 79.5-47 60 60 0 0 0 47-79.5 240.4 240.4 0 0 0-67.6-99.8ZM240 300a60 60 0 1 1 0-120 60 60 0 0 1 0 120Z' fill='%23ff69b4' fill-opacity='0.04'/%3E%3C/svg%3E`,
  pattern2: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'%3E%3Cpath d='M480 240a169.2 169.2 0 0 0-120-49.7 169.2 169.2 0 0 0 49.7-120c-46.9 0-89.3 19-120 49.7 0-43.4-16.6-86.9-49.7-120a169.2 169.2 0 0 0-49.7 120 169.2 169.2 0 0 0-120-49.7c0 46.8 19 89.3 49.7 120-43.4 0-86.9 16.6-120 49.7a169.2 169.2 0 0 0 120 49.7 169.2 169.2 0 0 0-49.7 120c46.8 0 89.3-19 120-49.7 0 43.4 16.6 86.9 49.7 120a169.2 169.2 0 0 0 49.7-120 169.2 169.2 0 0 0 120 49.7c0-46.9-19-89.3-49.7-120 43.4 0 86.9-16.6 120-49.7Z' fill='%23ff69b4' fill-opacity='0.03'/%3E%3C/svg%3E`,
  pattern3: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'%3E%3Cpath d='m349.4 276.5 54.7 18.2a57.7 57.7 0 1 0 0-109.4l-54.7 18.2a57.4 57.4 0 0 1-27.1 2.4c5.1-7 12-13 20.8-17.5l51.6-25.8a57.7 57.7 0 1 0-77.3-77.3l-25.8 51.6a57.4 57.4 0 0 1-17.5 20.8 57.4 57.4 0 0 1 2.4-27.1l18.2-54.7a57.6 57.6 0 1 0-109.4 0l18.2 54.7a57.4 57.4 0 0 1 2.4 27.1 57.3 57.3 0 0 1-17.5-20.8l-25.8-51.6a57.7 57.7 0 1 0-77.3 77.3l51.5 25.8a57.4 57.4 0 0 1 21 17.5c-8.7 1.4-18 .7-27.2-2.4l-54.7-18.2a57.7 57.7 0 1 0 0 109.4l54.7-18.2a57.4 57.4 0 0 1 27.1-2.4 57.3 57.3 0 0 1-20.8 17.5l-51.6 25.8a57.7 57.7 0 1 0 77.3 77.3l25.8-51.5a57.4 57.4 0 0 1 17.5-21c1.4 8.7.7 18-2.4 27.2l-18.2 54.7a57.7 57.7 0 1 0 109.4 0l-18.2-54.7a57.4 57.4 0 0 1-2.4-27.1c7 5.1 13 12 17.5 20.9l25.8 51.5a57.7 57.7 0 1 0 77.4-77.4l-51.6-25.7a57.4 57.4 0 0 1-21-17.5c8.7-1.4 18-.7 27.2 2.4Z' fill='%23ff69b4' fill-opacity='0.02'/%3E%3C/svg%3E`,
};