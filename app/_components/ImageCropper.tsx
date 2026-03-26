'use client';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface Area { x: number; y: number; width: number; height: number; }

async function getCroppedBlob(imageSrc: string, cropArea: Area, originalFile: File): Promise<File> {
    const image = await new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = imageSrc;
    });
    const canvas = document.createElement('canvas');
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height);
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(new File([blob!], originalFile.name, { type: originalFile.type }));
        }, originalFile.type);
    });
}

interface Props {
    imageSrc: string;
    originalFile: File;
    onDone: (croppedFile: File) => void;
    onCancel: () => void;
}

export default function ImageCropper({ imageSrc, originalFile, onDone, onCancel }: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    async function handleDone() {
        if (!croppedAreaPixels) return;
        const file = await getCroppedBlob(imageSrc, croppedAreaPixels, originalFile);
        onDone(file);
    }

    return (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-4">
            <p className="text-white text-sm mb-4 text-zinc-400">Drag to reposition · Scroll to zoom</p>
            <div className="relative w-full max-w-lg h-[420px] rounded-xl overflow-hidden">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>
            {/* Zoom slider */}
            <div className="flex items-center gap-3 mt-5 w-full max-w-lg">
                <span className="text-zinc-400 text-sm">Zoom</span>
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="flex-1 accent-[#1ADB04]"
                />
            </div>
            <div className="flex gap-3 mt-5 w-full max-w-lg">
                <button onClick={onCancel} className="flex-1 bg-zinc-700 text-white py-3 rounded-lg font-medium">Cancel</button>
                <button onClick={handleDone} className="flex-1 bg-[#1ADB04] text-black font-bold py-3 rounded-lg">Crop & Use</button>
            </div>
        </div>
    );
}
