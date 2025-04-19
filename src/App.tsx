import React, { useState, useRef, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import type { PregnancyDate, DateMethod, ColorTheme } from './types';
import { colorThemes } from './constants';
import { calculatePregnancyDates } from './utils/dates';
import { Background } from './components/Background';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarControls } from './components/CalendarControls';
import { CalendarMonth } from './components/CalendarMonth';

// Storage keys
const STORAGE_KEYS = {
  inputDate: 'pregnancy-calendar-input-date',
  dateMethod: 'pregnancy-calendar-date-method',
  theme: 'pregnancy-calendar-theme',
  compactDisplay: 'pregnancy-calendar-compact-display',
  startOnMonday: 'pregnancy-calendar-start-monday',
  hideOutsideDays: 'pregnancy-calendar-hide-outside-days',
  showFruitSize: 'pregnancy-calendar-show-fruit-size',
};

function App() {
  // Initialize state with stored values
  const [inputDate, setInputDate] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.inputDate) || ''
  );
  const [dateMethod, setDateMethod] = useState<DateMethod>(() => 
    (localStorage.getItem(STORAGE_KEYS.dateMethod) as DateMethod) || 'lastPeriod'
  );
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    return storedTheme ? colorThemes.find(theme => theme.name === storedTheme) || colorThemes[0] : colorThemes[0];
  });
  const [compactDisplay, setCompactDisplay] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.compactDisplay) !== 'false'
  );
  const [startOnMonday, setStartOnMonday] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.startOnMonday) !== 'false'
  );
  const [hideOutsideDays, setHideOutsideDays] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.hideOutsideDays) !== 'false'
  );
  const [showFruitSize, setShowFruitSize] = useState(() => 
    localStorage.getItem(STORAGE_KEYS.showFruitSize) === 'true'
  );
  const [dates, setDates] = useState<PregnancyDate[]>([]);
  const [inputsTouched, setInputsTouched] = useState(false);
  const calendarRef = useRef(null);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.inputDate, inputDate);
    localStorage.setItem(STORAGE_KEYS.dateMethod, dateMethod);
    localStorage.setItem(STORAGE_KEYS.theme, selectedTheme.name);
    localStorage.setItem(STORAGE_KEYS.compactDisplay, String(compactDisplay));
    localStorage.setItem(STORAGE_KEYS.startOnMonday, String(startOnMonday));
    localStorage.setItem(STORAGE_KEYS.hideOutsideDays, String(hideOutsideDays));
    localStorage.setItem(STORAGE_KEYS.showFruitSize, String(showFruitSize));
  }, [inputDate, dateMethod, selectedTheme, compactDisplay, startOnMonday, hideOutsideDays, showFruitSize]);

  // Calculate dates on initial load if input date exists
  useEffect(() => {
    if (inputDate) {
      handleCalculate();
    }
  }, []); // Empty dependency array for initial load only

  const handleCalculate = () => {
    const newDates = calculatePregnancyDates(inputDate, dateMethod);
    setDates(newDates);
    setInputsTouched(false);
  };

  const handleInputChange = (newDate: string) => {
    setInputDate(newDate);
    setInputsTouched(true);
  };

  const handleDateMethodChange = (method: DateMethod) => {
    setDateMethod(method);
    setInputsTouched(true);
  };

  return (
    <Background theme={selectedTheme}>
      <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
        <CalendarHeader theme={selectedTheme.primary} />
        
        <CalendarControls
          dateMethod={dateMethod}
          setDateMethod={handleDateMethodChange}
          inputDate={inputDate}
          setInputDate={handleInputChange}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          compactDisplay={compactDisplay}
          setCompactDisplay={setCompactDisplay}
          startOnMonday={startOnMonday}
          setStartOnMonday={setStartOnMonday}
          hideOutsideDays={hideOutsideDays}
          setHideOutsideDays={setHideOutsideDays}
          showFruitSize={showFruitSize}
          setShowFruitSize={setShowFruitSize}
          colorThemes={colorThemes}
          onCalculate={handleCalculate}
          hasData={dates.length > 0}
          pregnancyDates={dates}
          calendarRef={calendarRef}
          inputsTouched={inputsTouched}
        />

        {dates.length > 0 && (
          <div ref={calendarRef} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 print:p-0 print:shadow-none">
            {Array.from(
              new Set(dates.map((d) => format(d.date, 'yyyy-MM')))
            ).map((monthStr) => (
              <CalendarMonth
                key={monthStr}
                monthDate={parseISO(monthStr)}
                pregnancyDates={dates}
                theme={selectedTheme}
                compactDisplay={compactDisplay}
                startOnMonday={startOnMonday}
                hideOutsideDays={hideOutsideDays}
                showFruitSize={showFruitSize}
              />
            ))}
          </div>
        )}
      </div>
    </Background>
  );
}

export default App