import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="print:hidden text-center py-4 text-sm text-gray-500">
      A thing by <a href="http://blackmad.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">blackmad</a>
      <span className="mx-2">•</span>
      <a 
        href="https://github.com/blackmad/pregnancy-calendar" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-gray-700 transition-colors"
      >
        View the source on GitHub
      </a>
    </footer>
  );
}; 