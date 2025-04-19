import { addDays, subDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { PREGNANCY_DURATION, PREGNANCY_DURATION_FROM_CONCEPTION } from '../constants';
import type { DateMethod, PregnancyDate } from '../types';

export const calculateStartDate = (inputDate: string, method: DateMethod): Date => {
  const date = new Date(inputDate);
  switch (method) {
    case 'lastPeriod':
      return addDays(date, -1);
    case 'dueDate':
      return subDays(date, PREGNANCY_DURATION + 1);
    case 'conception':
      return addDays(date, -1 - 14);
    default:
      return date;
  }
};

export const calculatePregnancyDates = (inputDate: string, dateMethod: DateMethod): PregnancyDate[] => {
  if (!inputDate) return [];
  
  const start = calculateStartDate(inputDate, dateMethod);
  const dueDate = addDays(start, PREGNANCY_DURATION + 1);
  
  const allDates = eachDayOfInterval({ start, end: dueDate });
  allDates.shift();
  
  return allDates.map((date) => {
    const daysPassed = differenceInDays(date, start);
    const week = Math.floor((daysPassed) / 7);
    const daysRemaining = PREGNANCY_DURATION - daysPassed ;
    const isNewWeek = daysPassed % 7 === 0;

    return {
      date,
      week,
      daysRemaining,
      isNewWeek,
    };
  });
};