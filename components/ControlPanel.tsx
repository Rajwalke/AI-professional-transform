import React from 'react';
import type { Role } from '../types';
import { ROLES } from '../constants';

interface ControlPanelProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
  onGenerate: () => void;
  onReset: () => void;
  hasGeneratedImage: boolean;
  generatedImageUrl: string | null;
}

const StartOverIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-5.26M20 15a9 9 0 01-14.13 5.26" />
    </svg>
);

const GenerateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.466V19a2 2 0 11-4 0v-.534c0-.897.358-1.747.989-2.372l.548-.547z" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedRole,
  onRoleChange,
  onGenerate,
  onReset,
  hasGeneratedImage,
  generatedImageUrl,
}) => {
  return (
    <div className="flex h-full flex-col space-y-6 rounded-xl bg-slate-50 p-6">
      <div>
        <label className="text-lg font-semibold text-slate-700">Choose a Role</label>
        <p className="text-sm text-slate-500 mb-3">Select a profession to transform into.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                selectedRole === role
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow"></div>

      <div className="space-y-3 pt-4 border-t border-slate-200">
        {hasGeneratedImage && generatedImageUrl && (
           <a
                href={generatedImageUrl}
                download="transformed-image.png"
                className="flex w-full items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
                <DownloadIcon className="h-5 w-5 mr-2"/>
                Download Image
            </a>
        )}
        <button
          onClick={onGenerate}
          className="flex w-full items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <GenerateIcon className="h-5 w-5 mr-2"/>
          {hasGeneratedImage ? 'Regenerate' : 'Generate Image'}
        </button>
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center rounded-lg bg-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <StartOverIcon className="h-5 w-5 mr-2"/>
          Start Over
        </button>
      </div>
    </div>
  );
};