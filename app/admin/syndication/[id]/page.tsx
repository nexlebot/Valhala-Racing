'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageCropper from '@/app/_components/ImageCropper';
import RichTextEditor from '@/app/_components/RichTextEditor';
import { Star, Trash2, StarOff } from 'lucide-react';

interface GalleryImage { url: string; isMain: boolean; }
interface Syndication {
    id: number;
    name: string;
    about?: string;
    videoUrl?: string;
    gallery?: GalleryImage[];
}

async function uploadImage(file: File, password: string): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    const res = await fetch('/api/syndications/upload', { method: 'POST', body: fd });
    if (!res.ok) return null;
    return (await res.json()).url;
}

function toEmbedUrl(url: string): string {
    try {
        if (url.includes('youtube.com/embed/')) return url;
        const short = url.match(/youtu\.be\/([^?&]+)/);
        if (short) return `https://www.youtube.com/embed/${short[1]}`;
        const watch = url.match(/[?&]v=([^?&]+)/);
        if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
    } catch { /* ignore */ }
    return url;
}

export default function SyndicationDetailAdmin() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [syn, setSyn] = useState<Syndication | null>(null);
    const [about, setAbout] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [cropTarget, setCropTarget] = useState<{ src: string; file: File } | null>(null);
    const [uploading, setUploading] = useState(false);

    const fetchSyn = useCallback(async () => {
        const res = await fetch(`/api/syndications/${id}`);
        if (!res.ok) { router.push('/admin'); return; }
        const data = await res.json();
        setSyn(data);
        setAbout(data.about || '');
        setVideoUrl(data.videoUrl || '');
        setVideoTitle(data.videoTitle || '');
        setGallery(data.gallery || []);
    }, [id, router]);

    useEffect(() => {
        const pw = sessionStorage.getItem('adminPw') || '';
        if (!pw) { router.push('/admin'); return; }
        setPassword(pw);
    }, [router]);

    useEffect(() => {
        if (!password) return;
        fetchSyn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    async function save(updatedGallery?: GalleryImage[]) {
        setSaving(true);
        await fetch(`/api/syndications/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ about, videoUrl: toEmbedUrl(videoUrl), videoTitle, gallery: updatedGallery ?? gallery, password }),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
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
        setGallery(gallery.map((g, i) => ({ ...g, isMain: i === index })));
    }

    function removeImage(index: number) {
        const updated = gallery.filter((_, i) => i !== index);
        if (gallery[index].isMain && updated.length > 0) updated[0].isMain = true;
        setGallery(updated);
    }

    if (!syn) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 lg:p-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <button onClick={() => router.push('/admin')} className="text-zinc-400 hover:text-white text-sm">← Back</button>
                <h1 className="text-2xl font-bold">Detail Page: <span className="text-[#1ADB04]">{syn.name}</span></h1>
            </div>

            {/* Gallery */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Gallery / Carousel Images</h2>
                <p className="text-zinc-400 text-sm mb-4">Click ★ to set as main image. First image is main by default.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {gallery.map((img, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden aspect-video bg-zinc-800">
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <button onClick={() => toggleMain(i)} className={`p-2 rounded-full ${img.isMain ? 'bg-[#1ADB04] text-black' : 'bg-zinc-700 text-white'}`}>
                                    {img.isMain ? <Star className="w-4 h-4" fill="currentColor" /> : <StarOff className="w-4 h-4" />}
                                </button>
                                <button onClick={() => removeImage(i)} className="p-2 rounded-full bg-red-600 text-white">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            {img.isMain && <span className="absolute top-2 left-2 bg-[#1ADB04] text-black text-xs font-bold px-2 py-0.5 rounded-full">Main</span>}
                        </div>
                    ))}
                    <label className="aspect-video rounded-xl border-2 border-dashed border-zinc-600 hover:border-[#1ADB04] flex items-center justify-center cursor-pointer transition-colors bg-zinc-800">
                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setCropTarget({ src: URL.createObjectURL(f), file: f }); }} />
                        {uploading ? <span className="text-zinc-400 text-sm">Uploading...</span> : <span className="text-zinc-400 text-sm">+ Add Image</span>}
                    </label>
                </div>
            </section>

            {/* About */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Content</h2>
                <RichTextEditor value={about} onChange={setAbout} placeholder={`Write about ${syn.name}...`} />
            </section>

            {/* Video */}
            <section className="bg-zinc-900 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-1">Highlight Video</h2>
                <p className="text-zinc-400 text-sm mb-4">Paste a YouTube URL — it will be converted automatically.</p>
                <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)}
                    placeholder="e.g. AZTEC RULER – Highlights"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none placeholder-zinc-500 mb-3" />
                <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=xxxxx"
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none placeholder-zinc-500 mb-4" />
                {videoUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video border border-zinc-700">
                        <iframe src={toEmbedUrl(videoUrl)} className="w-full h-full" allowFullScreen />
                    </div>
                )}
            </section>

            {/* Save */}
            <div className="bg-zinc-900 rounded-2xl px-6 py-4 flex items-center justify-end gap-4 mb-10">
                {saved && <span className="text-[#1ADB04] text-sm font-medium">✓ All changes saved</span>}
                <button onClick={() => save()} disabled={saving} className="bg-[#1ADB04] text-black font-bold px-8 py-2.5 rounded-lg disabled:opacity-50 text-sm">
                    {saving ? 'Saving...' : 'Save All'}
                </button>
            </div>

            {cropTarget && (
                <ImageCropper imageSrc={cropTarget.src} originalFile={cropTarget.file}
                    aspect={2089 / 1500} onDone={handleCropDone} onCancel={() => setCropTarget(null)} />
            )}
        </div>
    );
}
