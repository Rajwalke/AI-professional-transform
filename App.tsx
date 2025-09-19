import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CameraCapture } from './components/CameraCapture';
import { transformImage } from './services/geminiService';
import type { Role } from './types';
import { ROLES, PROMPTS } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageMimeType, setOriginalImageMimeType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES[0]);
  const [prompt, setPrompt] = useState<string>(PROMPTS[ROLES[0]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const handleRoleChange = useCallback((newRole: Role) => {
    setSelectedRole(newRole);
    setPrompt(PROMPTS[newRole]);
  }, []);

  const handleImageUpload = (imageDataUrl: string, mimeType: string) => {
    setOriginalImage(imageDataUrl);
    setOriginalImageMimeType(mimeType);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerateClick = async () => {
    if (!originalImage || !originalImageMimeType) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Data = originalImage.split(',')[1];
      const newImageBase64 = await transformImage(base64Data, originalImageMimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetApp = () => {
    setOriginalImage(null);
    setOriginalImageMimeType(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
    setIsCameraOpen(false);
  }

  const handleImageCapture = (imageDataUrl: string, mimeType: string) => {
    handleImageUpload(imageDataUrl, mimeType);
    setIsCameraOpen(false);
  }

  const renderContent = () => {
    if (!originalImage) {
      if (isCameraOpen) {
        return <CameraCapture onImageCapture={handleImageCapture} onCancel={() => setIsCameraOpen(false)} />;
      }
      return <ImageUploader onImageUpload={handleImageUpload} onOpenCamera={() => setIsCameraOpen(true)} />;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <ImageDisplay originalImage={originalImage} generatedImage={generatedImage} />
        </div>
        <div className="lg:col-span-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 rounded-xl p-8">
              <LoadingSpinner />
              <p className="mt-4 text-lg font-semibold text-slate-600 animate-pulse">AI is working its magic...</p>
              <p className="text-sm text-slate-500 mt-2 text-center">This can take a moment. Please wait.</p>
            </div>
          ) : (
            <ControlPanel
              selectedRole={selectedRole}
              onRoleChange={handleRoleChange}
              onGenerate={handleGenerateClick}
              onReset={resetApp}
              hasGeneratedImage={!!generatedImage}
              generatedImageUrl={generatedImage}
            />
          )}
          {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          {renderContent()}
        </div>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Gemini AI. Created for entertainment purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;