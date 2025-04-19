import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getWeeksInMonth } from 'date-fns';
import type { PregnancyDate, ColorTheme } from '../types';
import { WEEKDAYS, WEEKDAYS_MON, FRUIT_SIZES, floralBorders } from '../constants';

interface CalendarMonthProps {
  monthDate: Date;
  pregnancyDates: PregnancyDate[];
  theme: ColorTheme;
  compactDisplay: boolean;
  startOnMonday: boolean;
  hideOutsideDays: boolean;
  showFruitSize: boolean;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  monthDate,
  pregnancyDates,
  theme,
  compactDisplay,
  startOnMonday,
  hideOutsideDays,
  showFruitSize,
}) => {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: startOnMonday ? 1 : 0 });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: startOnMonday ? 1 : 0 });
  const monthDays = eachDayOfInterval({ start, end });
  const weekDays = startOnMonday ? WEEKDAYS_MON : WEEKDAYS;
  const weeksInMonth = getWeeksInMonth(monthDate, { weekStartsOn: startOnMonday ? 1 : 0 });

  return (
    <div key={format(monthDate, 'yyyy-MM')} className="month-container mb-8 relative">

      <div className="calendar-grid h-full p-8">
        <h3 className={`text-2xl font-semibold text-${theme.secondary} mb-4 print:text-4xl print:mb-6 print:text-center`}>
          {format(monthDate, 'MMMM yyyy')}
        </h3>
        <div 
          className="days-grid grid grid-cols-7 gap-1 print:gap-2"
          style={{
            display: 'grid',
            gridTemplateRows: `auto repeat(${weeksInMonth}, 1fr)`,
            height: '100%',
            minHeight: '100%'
          }}
        >
          {weekDays.map((day) => (
            <div key={day} className={`p-2 text-center font-medium text-${theme.secondary} print:text-lg`}>
              {day}
            </div>
          ))}
          {monthDays.map((day) => {
            const pregnancyDate = pregnancyDates.find(
              (d) => format(d.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );
            const isCurrentMonth = format(day, 'M') === format(monthDate, 'M');
            const weekNumber = pregnancyDate?.week || 0;
            const isAlternateWeek = weekNumber % 2 === 0;
            const isDueDate = pregnancyDate?.daysRemaining === 0;
            const fruitSize = showFruitSize && FRUIT_SIZES[weekNumber];

            const showNumWeeks = pregnancyDate?.isNewWeek && !isDueDate && weekNumber > 1 && weekNumber < 40;

            if (hideOutsideDays && !isCurrentMonth) {
              return <div key={format(day, 'yyyy-MM-dd')} className="calendar-day" />;
            }

            return (
              <div
                key={format(day, 'yyyy-MM-dd')}
                className={`calendar-day p-2 min-h-[100px] print:min-h-0 border rounded-lg relative flex flex-col ${
                  !isCurrentMonth
                    ? 'bg-gray-100 border-gray-200 opacity-50'
                    : pregnancyDate
                    ? isDueDate
                      ? `bg-gradient-to-br from-${theme.accent} via-${theme.accentAlt} to-${theme.accent} border-${theme.primary} border-2`
                      : `${isAlternateWeek ? `bg-${theme.accent}` : `bg-${theme.accentAlt}`} 
                         ${isAlternateWeek ? `border-${theme.accent}` : `border-${theme.accentAlt}`} 
                         print:bg-${isAlternateWeek ? theme.accent : theme.accentAlt}`
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-sm print:text-base font-medium ml-auto">
                  {format(day, 'd')}
                </div>
                {pregnancyDate && (
                  <div className="mt-1 text-xs print:text-sm flex-1 flex flex-col justify-center">
                    {isDueDate && (
                      <div className={`font-bold text-${theme.primary} text-center mb-1`}>
                        🎉 Due Date! 🎉
                        <div className="text-lg mt-1">
                          👶 🎈 🎀
                        </div>
                      </div>
                    )}
                    {showNumWeeks && (
                      <div className={`text-center font-bold text-${theme.secondary} mb-1 print:text-xs`}>
                        {`${weekNumber} Weeks Pregnant!`}
                        {fruitSize && (
                          <>
                            <div className="mt-1 hidden print:block print:text-xxs print:opacity-75">
                              {fruitSize.emoji} {fruitSize.name}
                            </div>
                            <div className="mt-1 print:hidden">
                              {fruitSize.emoji} Size of a {fruitSize.name}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    {!compactDisplay && !isDueDate && (
                      <div className="text-gray-600">
                        {pregnancyDate.daysRemaining} days to go
                      </div>
                    )}
                    {pregnancyDate && compactDisplay && !showNumWeeks && pregnancyDate.daysRemaining > 0 && (
                      <div className="text-xs print:text-sm mt-auto">
                        👶 {pregnancyDate.daysRemaining}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};