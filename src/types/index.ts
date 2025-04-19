export type PregnancyDate = {
  date: Date;
  week: number;
  daysRemaining: number;
  isNewWeek: boolean;
};

export type ColorTheme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  accentAlt: string;
  background: string;
  gradient: string;
};

export type DateMethod = 'conception' | 'lastPeriod' | 'dueDate';