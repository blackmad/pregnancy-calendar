import { createEvents } from 'ics';
import { format, addDays } from 'date-fns';
import type { PregnancyDate } from '../types';
import { FRUIT_SIZES } from '../constants';

export const generateICalFile = async (pregnancyDates: PregnancyDate[]): Promise<Blob> => {
  const events = pregnancyDates
    .filter(date => date.isNewWeek || date.daysRemaining === -1)
    .map(date => {
      const startDateStr = format(date.date, 'yyyy-M-d').split('-').map(Number);
      const endDate = date.daysRemaining === -1 ? date.date : addDays(date.date, 7);
      const endDateStr = format(endDate, 'yyyy-M-d').split('-').map(Number);
      const fruitSize = FRUIT_SIZES[date.week];
      
      if (date.daysRemaining === -1) {
        return {
          start: startDateStr,
          end: endDateStr,
          title: '👶 Due Date!',
          description: '🎉 Due Date! 👶',
          calName: 'Pregnancy Calendar',
        };
      }

      const weekNumber = date.week;
      const description = `Pregnancy Week ${weekNumber}${
        fruitSize ? `\n${fruitSize.emoji} Baby is the size of a ${fruitSize.name}` : ''
      }`;

      return {
        start: startDateStr,
        end: endDateStr,
        title: `🤰 Pregnancy Week ${weekNumber}`,
        description,
        calName: 'Pregnancy Calendar',
      };
    });

  const { error, value } = createEvents(events);
  
  if (error || !value) {
    throw new Error('Failed to generate iCal file');
  }

  return new Blob([value], { type: 'text/calendar;charset=utf-8' });
};