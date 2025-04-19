import React, { useRef, useState } from 'react';
import { Calendar, Printer, Download, X, RefreshCw } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import type { ColorTheme, DateMethod } from '../types';
import { generateICalFile } from '../utils/ical';
import { flowerPatterns } from '../constants';

interface CalendarControlsProps {
  dateMethod: DateMethod;
  setDateMethod: (method: DateMethod) => void;
  inputDate: string;
  setInputDate: (date: string) => void;
  selectedTheme: ColorTheme;
  setSelectedTheme: (theme: ColorTheme) => void;
  compactDisplay: boolean;
  setCompactDisplay: (compact: boolean) => void;
  startOnMonday: boolean;
  setStartOnMonday: (startOnMonday: boolean) => void;
  hideOutsideDays: boolean;
  setHideOutsideDays: (hide: boolean) => void;
  showFruitSize: boolean;
  setShowFruitSize: (show: boolean) => void;
  colorThemes: ColorTheme[];
  onCalculate: () => void;
  hasData: boolean;
  pregnancyDates: any[];
  calendarRef: React.RefObject<HTMLDivElement>;
  inputsTouched: boolean;
}

export const CalendarControls: React.FC<CalendarControlsProps> = ({
  dateMethod,
  setDateMethod,
  inputDate,
  setInputDate,
  selectedTheme,
  setSelectedTheme,
  compactDisplay,
  setCompactDisplay,
  startOnMonday,
  setStartOnMonday,
  hideOutsideDays,
  setHideOutsideDays,
  showFruitSize,
  setShowFruitSize,
  colorThemes,
  onCalculate,
  hasData,
  pregnancyDates,
  calendarRef,
  inputsTouched,
}) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const getDateLabel = () => {
    switch (dateMethod) {
      case 'dueDate':
        return 'Due Date';
      default:
        return 'Last Menstrual Period';
    }
  };

  const handleDownloadICal = async () => {
    if (hasData) {
      const blob = await generateICalFile(pregnancyDates);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pregnancy-calendar.ics';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setShowInstructions(true);
    }
  };

  const commonPrintStyles = `
    @media print {
      html, body {
        height: auto !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .month-container {
        height: 100vh;
        page-break-after: always;
        page-break-inside: avoid;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        background-image: url("${flowerPatterns.pattern1}"), url("${flowerPatterns.pattern2}");
        background-repeat: repeat, repeat;
        background-size: 52px 26px, 20px 20px;
        background-color: white;
      }
      .month-container:last-child {
        page-break-after: avoid;
      }
      .no-print {
        display: none !important;
      }
      .calendar-grid {
        flex: 1;
        display: grid;
        height: 100%;
        min-height: 100%;
        grid-template-rows: auto 1fr;
        background-color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .days-grid {
        height: 100%;
        min-height: 100%;
        display: grid;
        grid-template-rows: auto repeat(6, 1fr);
        grid-auto-rows: 0;
        overflow: hidden;
      }
      .calendar-day {
        height: 100%;
        display: flex;
        flex-direction: column;
        break-inside: avoid;
      }
    }
  `;

  const handlePrintPortrait = useReactToPrint({
    content: () => calendarRef.current,
    pageStyle: `
      @page {
        size: portrait;
        margin: 0.5cm;
      }
      ${commonPrintStyles}
    `,
  });

  const handlePrintLandscape = useReactToPrint({
    content: () => calendarRef.current,
    pageStyle: `
      @page {
        size: landscape;
        margin: 0.5cm;
      }
      ${commonPrintStyles}
    `,
  });

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 no-print">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Type
            </label>
            <select
              value={dateMethod}
              onChange={(e) => setDateMethod(e.target.value as DateMethod)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="conception">Conception Date</option>
              <option value="lastPeriod">Last Menstrual Period</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getDateLabel()}
            </label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose Theme
            </label>
            <select
              value={selectedTheme.name}
              onChange={(e) => setSelectedTheme(colorThemes.find(theme => theme.name === e.target.value) || colorThemes[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            >
              {colorThemes.map(theme => (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Options
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="compactDisplay"
                  checked={compactDisplay}
                  onChange={(e) => setCompactDisplay(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="compactDisplay" className="ml-2 block text-sm text-gray-900">
                  Compact days remaining (👶)
                </label>
              </div>
              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showFruitSize"
                  checked={showFruitSize}
                  onChange={(e) => setShowFruitSize(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="showFruitSize" className="ml-2 block text-sm text-gray-900">
                  Show fruit size comparison
                </label>
              </div> */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="startOnMonday"
                  checked={startOnMonday}
                  onChange={(e) => setStartOnMonday(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="startOnMonday" className="ml-2 block text-sm text-gray-900">
                  Start week on Monday
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hideOutsideDays"
                  checked={hideOutsideDays}
                  onChange={(e) => setHideOutsideDays(e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="hideOutsideDays" className="ml-2 block text-sm text-gray-900">
                  Hide days outside month
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCalculate}
              disabled={!inputDate || (!inputsTouched && hasData)}
              className={`px-4 py-2 bg-${selectedTheme.secondary} text-white rounded-md hover:bg-${selectedTheme.primary} flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {hasData ? <RefreshCw size={20} /> : <Calendar size={20} />}
              {hasData ? 'Recalculate' : 'Calculate'}
            </button>
            {hasData && (
              <>
                <button
                  onClick={handlePrintPortrait}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                  title="Print in portrait orientation"
                >
                  <Printer size={20} />
                  Portrait
                </button>
                <button
                  onClick={handlePrintLandscape}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                  title="Print in landscape orientation"
                >
                  <Printer size={20} className="rotate-90" />
                  Landscape
                </button>
                <button
                  onClick={handleDownloadICal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                >
                  <Download size={20} />
                  iCal
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Google Calendar Import Instructions */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Import to Google Calendar</h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                To import your pregnancy calendar events to Google Calendar:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Open <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Calendar</a></li>
                <li>Click the gear icon (⚙️) in the top right to open Settings</li>
                <li>Click "Import & Export" in the left sidebar</li>
                <li>Click "Select file from your computer" and choose the downloaded 'pregnancy-calendar.ics' file</li>
                <li>Select which calendar to add the events to (or create a new one)</li>
                <li>Click "Import" to add all your pregnancy milestones to Google Calendar</li>
              </ol>
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Tip:</strong> Consider creating a new calendar specifically for your pregnancy events to keep them organized and easily shareable with family members.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};