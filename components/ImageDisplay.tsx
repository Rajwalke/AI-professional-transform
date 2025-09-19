
import React from 'react';

interface ImageDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
}

const ImageCard: React.FC<{ src: string | null; title: string; isPlaceholder?: boolean }> = ({ src, title, isPlaceholder = false }) => (
  <div className="w-full">
    <h3 className="text-center text-lg font-semibold text-slate-600 mb-3">{title}</h3>
    <div className="aspect-square w-full rounded-xl bg-slate-200 shadow-inner overflow-hidden flex items-center justify-center">
      {isPlaceholder ? (
        <div className="text-slate-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-2 text-sm">AI Result Appears Here</p>
        </div>
      ) : src ? (
        <img src={src} alt={title} className="h-full w-full object-cover" />
      ) : null}
    </div>
  </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      <ImageCard src={originalImage} title="Before" />
      <ImageCard src={generatedImage} title="After" isPlaceholder={!generatedImage} />
    </div>
  );
};
