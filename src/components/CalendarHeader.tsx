import React from 'react';
import { flowerImages } from '../constants';

interface CalendarHeaderProps {
  theme: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ theme }) => (
  <div className="text-center mb-8 no-print relative overflow-hidden">
    <h1 className={`text-4xl font-bold text-${theme} mb-2 relative z-10`}>
      Pregnancy Calendar
    </h1>
    
    <div className="absolute inset-0 overflow-hidden">
      {flowerImages.map((url, index) => (
        <React.Fragment key={url}>
          <div 
            className="absolute h-32 w-32 opacity-10 bg-contain bg-no-repeat bg-center transform"
          />
          <div 
            className="absolute h-32 w-32 opacity-10 bg-contain bg-no-repeat bg-center transform"
          />
        </React.Fragment>
      ))}
    </div>
  </div>
);