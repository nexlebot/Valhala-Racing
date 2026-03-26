'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageCropper from '@/app/_components/ImageCropper';
import { Star, Trash2, StarOff } from 'lucide-react';

interface GalleryImage { url: string; isMain: boolean; }
interface Horse {
    id: number;
    title: string;
    url: string;
    about?: string;
    videoUrl?: string;
    gallery?: GalleryImage[];
}

async function uploadImage(file: File, password: string): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    const res = await fetch('/api/horses/upload', { method: 'POST', body: fd });
    if (!res.ok) return null;
    return (await res.json()).url;
}

function toEmbedUrl(url: string): string {
    try {
        // Already embed
        if (url.includes('youtube.com/embed/')) return url;
        // youtu.be/ID
        const short = url.match(/youtu\.be\/([^?&]+)/);
        if (short) return `https://www.youtube.com/embed/${short[1]}`;
        // youtube.com/watch?v=ID
        const watch = url.match(/[?&]v=([^?&]+)/);
        if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
    } catch { /* ignore */ }
    return url;
}

export default function HorseDetailAdmin() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [password, setPassword] = useState('');

    const [horse, setHorse] = useState<Horse | null>(null);
    const [about, setAbout] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [cropTarget, setCropTarget] = useState<{ src: string; file: File } | null>(null);
    const [uploading, setUploading] = useState(false);

    const fetchHorse = useCallback(async () => {
        const res = await fetch(`/api/horses/${id}`);
        if (!res.ok) { router.push('/admin'); return; }
        const data = await res.json();
        setHorse(data);
        setAbout(data.about || '');
        setVideoUrl(data.videoUrl || '');
        setGallery(data.gallery || []);
    }, [id, router]);

    useEffect(() => {
        const pw = sessionStorage.getItem('adminPw') || '';
        if (!pw) { router.push('/admin'); return; }
        setPassword(pw);
    }, [router]);

    useEffect(() => { if (password) fetchHorse(); }, [fetchHorse, password]);

    async function save(updatedGallery?: GalleryImage[]) {
        setSaving(true);
        await fetch(`/api/horses/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ about, videoUrl: toEmbedUrl(videoUrl), gallery: updatedGallery ?? gallery, password }),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function handleFileSelect(file: File) {
        setCropTarget({ src: URL.createObjectURL(file), file });
    }

    async function handleCropDone(croppedFile: File) {
        setCropTarget(null);
        setUploading(true);
        const url = await uploadImage(croppedFile, password);
        setUploading(false);
        if (!url) return;
        const updated = [...gallery, { url, isMain: gallery.length === 0 }];
        setGallery(updated);
        await save(updated);
    }

    function toggleMain(index: number) {
        const updated = gallery.map((g, i) => ({ ...g, isMain: i === index }));
        setGallery(updated);
    }

    function removeImage(index: number) {
        const updated = gallery.filter((_, i) => i !== index);
        // if removed was main, set first as main
        if (gallery[index].isMain && updated.length > 0) updated[0].isMain = true;
        setGallery(updated);
    }

    if (!horse) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 lg:p-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <button onClick={() => router.push('/admin')} className="text-zinc-400 hover:text-white text-sm">← Back</button>
                <h1 className="text-2xl font-bold">Detail Page: <span className="text-[#1ADB04]">{horse.title}</span></h1>
            </div>

            {/* Gallery */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Gallery / Carousel Images</h2>
                <p className="text-zinc-400 text-sm mb-4">Click ★ to set as main image (shown on ownership page). First image is main by default.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {gallery.map((img, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden aspect-video bg-zinc-800">
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button
                                    onClick={() => toggleMain(i)}
                                    title={img.isMain ? 'Main image' : 'Set as main'}
                                    className={`p-2 rounded-full ${img.isMain ? 'bg-[#1ADB04] text-black' : 'bg-zinc-700 text-white'}`}
                                >
                                    {img.isMain ? <Star className="w-4 h-4" fill="currentColor" /> : <StarOff className="w-4 h-4" />}
                                </button>
                                <button onClick={() => removeImage(i)} className="p-2 rounded-full bg-red-600 text-white">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            {img.isMain && (
                                <span className="absolute top-2 left-2 bg-[#1ADB04] text-black text-xs font-bold px-2 py-0.5 rounded-full">Main</span>
                            )}
                        </div>
                    ))}

                    {/* Upload tile */}
                    <label className="aspect-video rounded-xl border-2 border-dashed border-zinc-600 hover:border-[#1ADB04] flex items-center justify-center cursor-pointer transition-colors bg-zinc-800">
                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
                        {uploading ? <span className="text-zinc-400 text-sm">Uploading...</span> : <span className="text-zinc-400 text-sm">+ Add Image</span>}
                    </label>
                </div>

                <button onClick={() => save()} disabled={saving} className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Gallery Order'}
                </button>
            </section>

            {/* About */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">About {horse.title}</h2>
                <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    rows={10}
                    placeholder={`Write about ${horse.title}...`}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none placeholder-zinc-500 resize-y text-sm leading-relaxed"
                />
                <p className="text-zinc-500 text-xs mt-2 mb-4">Basic HTML supported: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;</p>
                <button onClick={() => save()} disabled={saving} className="bg-[#1ADB04] text-black font-bold px-6 py-2 rounded-lg disabled:opacity-50">
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save About'}
                </button>
            </section>

            {/* Video */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-1">Highlight Video</h2>
                <p className="text-zinc-400 text-sm mb-4">Paste a YouTube embed URL or direct video URL.</p>
                <input
                    type="text"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/embed/xxxxx"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none placeholder-zinc-500 mb-4"
                />
                {videoUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video mb-4 border border-zinc-700">
                        <iframe src={videoUrl} className="w-full h-full" allowFullScreen />
                    </div>
                )}
                <button onClick={() => save()} disabled={saving} className="bg-[#1ADB04] text-black font-bold px-6 py-2 rounded-lg disabled:opacity-50">
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Video'}
                </button>
            </section>

            {/* Cropper */}
            {cropTarget && (
                <ImageCropper
                    imageSrc={cropTarget.src}
                    originalFile={cropTarget.file}
                    onDone={handleCropDone}
                    onCancel={() => setCropTarget(null)}
                />
            )}
        </div>
    );
}
