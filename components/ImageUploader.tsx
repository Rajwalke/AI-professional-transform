import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string, mimeType: string) => void;
  onOpenCamera: () => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onOpenCamera }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageUpload(e.target.result, file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Start Your Transformation</h2>
      <p className="text-slate-500 mb-8 max-w-md">Upload or capture a clear, front-facing photo to begin the AI-powered transformation into a medical professional.</p>
      
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative block w-full max-w-lg cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center transition-colors duration-300 hover:border-cyan-500 hover:bg-cyan-50 ${isDragging ? 'border-cyan-500 bg-cyan-50' : ''}`}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
        <span className="mt-4 block font-semibold text-slate-600">
          Drop your image here or <span className="text-cyan-600">browse files</span>
        </span>
        <span className="mt-1 block text-xs text-slate-500">PNG, JPG, WEBP accepted</span>
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
        />
      </label>

      <div className="my-6 flex w-full max-w-lg items-center">
        <div className="flex-grow border-t border-slate-300"></div>
        <span className="flex-shrink mx-4 font-semibold text-slate-500">OR</span>
        <div className="flex-grow border-t border-slate-300"></div>
      </div>
      
      <button 
        onClick={onOpenCamera}
        className="flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <CameraIcon className="h-5 w-5 mr-2" />
        Use Your Camera
      </button>

    </div>
  );
};
