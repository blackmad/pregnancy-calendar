import React from 'react';
import { flowerPatterns } from '../constants';
import type { ColorTheme } from '../types';

interface BackgroundProps {
  theme: ColorTheme;
  children: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ theme, children }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.gradient} to-white print:bg-none print:min-h-0 relative`}>
      {/* Pattern Layer 1 - Large flowers with slow rotation */}
      <div 
        className="absolute inset-0 animate-[spin_120s_linear_infinite]"
        style={{
          backgroundImage: `url("${flowerPatterns.pattern1}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
          opacity: 0.04,
        }}
      />
      
      {/* Pattern Layer 2 - Medium flowers with reverse rotation */}
      <div 
        className="absolute inset-0 animate-[spin_90s_linear_infinite_reverse]"
        style={{
          backgroundImage: `url("${flowerPatterns.pattern2}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          transform: 'translateX(60px) translateY(60px)',
          opacity: 0.03,
        }}
      />
      
      {/* Pattern Layer 3 - Small flowers with faster rotation */}
      <div 
        className="absolute inset-0 animate-[spin_60s_linear_infinite]"
        style={{
          backgroundImage: `url("${flowerPatterns.pattern3}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
          transform: 'translateX(30px) translateY(30px)',
          opacity: 0.02,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};