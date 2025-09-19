
import React from 'react';

interface DownloadButtonProps {
    imageUrl: string;
    filename?: string;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, filename = 'transformed-image.png' }) => {
    return (
        <a
            href={imageUrl}
            download={filename}
            className="flex w-full items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <DownloadIcon className="h-5 w-5 mr-2"/>
            Download Image
        </a>
    );
};
