import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraCaptureProps {
    onImageCapture: (imageDataUrl: string, mimeType: string) => void;
    onCancel: () => void;
}

const CaptureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.792V12a9 9 0 10-9 9h.792m.192 0a9.013 9.013 0 003.536-1.588M21 12.792a9.013 9.013 0 01-1.588 3.536m-3.728 0A9 9 0 0112 21a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9c0 .792-.102 1.564-.294 2.299" />
    </svg>
);


export const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const getCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access the camera. Please check your browser permissions.");
            }
        };

        getCamera();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = useCallback(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas && video.readyState >= 2) {
            const context = canvas.getContext('2d');
            if (context) {
                const { videoWidth, videoHeight } = video;
                canvas.width = videoWidth;
                canvas.height = videoHeight;

                // Flip the context horizontally to counteract the CSS mirror effect
                context.translate(videoWidth, 0);
                context.scale(-1, 1);
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                
                // Get the image data
                const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                onImageCapture(imageDataUrl, 'image/jpeg');
            }
        } else {
            setError("Camera is not ready yet. Please wait a moment.");
        }
    }, [onImageCapture]);

    return (
        <div className="flex w-full flex-col items-center justify-center p-8 text-center">
             <h2 className="text-3xl font-bold text-slate-800 mb-2">Capture Your Photo</h2>
             <p className="text-slate-500 mb-6 max-w-md">Position your face in the center of the frame and ensure good lighting for the best results.</p>

            <div className="relative w-full max-w-lg overflow-hidden rounded-xl shadow-lg aspect-square bg-slate-800">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover transform -scale-x-100" // Mirrored for user-friendliness
                />
                <canvas ref={canvasRef} className="hidden" />
            </div>

            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

            <div className="mt-6 flex w-full max-w-lg items-center justify-center space-x-4">
                <button
                    onClick={onCancel}
                    className="rounded-lg bg-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-300"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCapture}
                    className="flex items-center justify-center rounded-lg bg-cyan-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-cyan-700"
                >
                    <CaptureIcon className="h-6 w-6 mr-2" />
                    Take Photo
                </button>
            </div>
        </div>
    );
};
