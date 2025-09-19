
import React from 'react';

const CaduceusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.5 9c1.3 0 2.5-1.1 2.5-2.5S15.8 4 14.5 4s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5zM12 11.5c-1.9 0-3.5 1.6-3.5 3.5v.5h7v-.5c0-1.9-1.6-3.5-3.5-3.5zM14.5 0C10.9 0 8 3.1 8 7s4 13 4 13s4-9.4 4-13s-3.1-7-7.5-7zM12 8.5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zM9.5 9c-1.4 0-2.5-1.1-2.5-2.5S8.1 4 9.5 4s2.5 1.1 2.5 2.5-1.2 2.5-2.5 2.5z"/>
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center md:justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5a.5.5 0 01-1 0V18a.5.5 0 011 0v.5zM12 5.5a.5.5 0 01-1 0V5a.5.5 0 011 0v.5zM18.5 12a.5.5 0 010-1H18a.5.5 0 010 1h.5zM5.5 12a.5.5 0 010-1H5a.5.5 0 010 1h.5z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M16.53 7.47a.5.5 0 01-.707 0L15.5 7.177a.5.5 0 01.707-.707l.323.323a.5.5 0 010 .707zM7.47 16.53a.5.5 0 01-.707 0L6.5 16.177a.5.5 0 01.707-.707l.263.263a.5.5 0 010 .707z" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 ml-3 tracking-tight">
          AI Professional <span className="text-cyan-600">Transformer</span>
        </h1>
      </div>
    </header>
  );
};
