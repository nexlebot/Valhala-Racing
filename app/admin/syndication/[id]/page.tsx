'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ImageCropper from '@/app/_components/ImageCropper';
import RichTextEditor from '@/app/_components/RichTextEditor';
import AdminLayout from '@/app/admin/_components/AdminLayout';
import { Star, Trash2, StarOff, Upload, ArrowLeft, Save, Video, FileText, Images } from 'lucide-react';

interface GalleryImage { url: string; isMain: boolean; }
interface Syndication {
    id: number; name: string; url: string;
    about?: string; videoUrl?: string; videoTitle?: string; gallery?: GalleryImage[];
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
    const [activeSection, setActiveSection] = useState<'gallery' | 'about' | 'video'>('gallery');

    const fetchSyn = useCallback(async () => {
        const res = await fetch(`/api/syndications/${id}`);
        if (!res.ok) { router.push('/admin?tab=syndications'); return; }
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
        setTimeout(() => setSaved(false), 2500);
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

    if (!syn) return (
        <AdminLayout>
            <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-3 text-zinc-500">
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-[#1ADB04] rounded-full animate-spin" />
                    Loading...
                </div>
            </div>
        </AdminLayout>
    );

    const SECTIONS = [
        { key: 'gallery' as const, label: 'Gallery', icon: Images },
        { key: 'about' as const, label: 'About', icon: FileText },
        { key: 'video' as const, label: 'Video', icon: Video },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin?tab=syndications')} className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="w-px h-5 bg-zinc-700" />
                    <div className="flex items-center gap-3">
                        <img src={syn.url} alt={syn.name} className="w-10 h-10 rounded-xl object-cover border border-zinc-700" />
                        <div>
                            <h1 className="text-white font-bold text-xl leading-tight">{syn.name}</h1>
                            <p className="text-zinc-500 text-xs">Detail Page Editor</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => save()}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold px-5 py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save All'}
                </button>
            </div>

            <div className="flex gap-6 flex-col lg:flex-row">
                {/* Section tabs */}
                <div className="lg:w-48 shrink-0">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-2 flex lg:flex-col gap-1">
                        {SECTIONS.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition-all select-none ${activeSection === key ? 'bg-[#1ADB04]/10 text-[#1ADB04] border border-[#1ADB04]/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                    {/* Gallery */}
                    {activeSection === 'gallery' && (
                        <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-white font-bold text-lg">Carousel Images</h2>
                                <span className="text-zinc-500 text-sm">{gallery.length} image{gallery.length !== 1 ? 's' : ''}</span>
                            </div>
                            <p className="text-zinc-500 text-sm mb-6">Hover an image to set it as main or delete it. The main image is shown on the ownership page.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                {gallery.map((img, i) => (
                                    <div key={i} className="relative group rounded-xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button onClick={() => toggleMain(i)}
                                                className={`p-2 rounded-lg transition-all ${img.isMain ? 'bg-[#1ADB04] text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                                                {img.isMain ? <Star className="w-4 h-4" fill="currentColor" /> : <StarOff className="w-4 h-4" />}
                                            </button>
                                            <button onClick={() => removeImage(i)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {img.isMain && <span className="absolute top-2 left-2 bg-[#1ADB04] text-black text-xs font-bold px-2 py-0.5 rounded-full">Main</span>}
                                    </div>
                                ))}
                                <label className="aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-zinc-900/50">
                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) setCropTarget({ src: URL.createObjectURL(f), file: f }); }} />
                                    {uploading
                                        ? <div className="w-5 h-5 border-2 border-zinc-600 border-t-[#1ADB04] rounded-full animate-spin" />
                                        : <><Upload className="w-5 h-5 text-zinc-600" /><span className="text-zinc-600 text-xs">Add Image</span></>
                                    }
                                </label>
                            </div>

                            <button onClick={() => save()} disabled={saving} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50">
                                <Save className="w-4 h-4" />
                                {saving ? 'Saving...' : 'Save Gallery'}
                            </button>
                        </div>
                    )}

                    {/* About */}
                    {activeSection === 'about' && (
                        <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-white font-bold text-lg mb-1">About {syn.name}</h2>
                            <p className="text-zinc-500 text-sm mb-5">This text appears on the syndication&apos;s public detail page.</p>
                            <RichTextEditor
                                value={about}
                                onChange={setAbout}
                                placeholder={`Write about ${syn.name}...`}
                            />
                            <div className="flex justify-end mt-4">
                                <button onClick={() => save()} disabled={saving} className="flex items-center gap-2 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold px-5 py-2 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save About'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Video */}
                    {activeSection === 'video' && (
                        <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-white font-bold text-lg mb-1">Highlight Video</h2>
                            <p className="text-zinc-500 text-sm mb-5">Paste any YouTube URL — it will be converted to an embed automatically.</p>

                            <div className="flex flex-col gap-1.5 mb-4">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Video Title</label>
                                <input
                                    type="text"
                                    value={videoTitle}
                                    onChange={e => setVideoTitle(e.target.value)}
                                    placeholder="e.g. Farnan x Feel The Rush – Highlights"
                                    className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 placeholder-zinc-600 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 mb-5">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">YouTube URL</label>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={e => setVideoUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 placeholder-zinc-600 transition-all"
                                />
                            </div>

                            {videoUrl && (
                                <div className="rounded-xl overflow-hidden aspect-video border border-zinc-800 mb-5">
                                    <iframe src={toEmbedUrl(videoUrl)} className="w-full h-full" allowFullScreen />
                                </div>
                            )}

                            <button onClick={() => save()} disabled={saving} className="flex items-center gap-2 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold px-5 py-2 rounded-xl text-sm disabled:opacity-50 transition-all">
                                <Save className="w-4 h-4" />
                                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Video'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {cropTarget && (
                <ImageCropper imageSrc={cropTarget.src} originalFile={cropTarget.file}
                    onDone={handleCropDone} onCancel={() => setCropTarget(null)} />
            )}
        </AdminLayout>
    );
}
