'use client';
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ImageCropper from '../_components/ImageCropper';
import AdminLayout from './_components/AdminLayout';
import { Plus, Pencil, Trash2, Settings2, ChevronRight, Image as ImageIcon, Users } from 'lucide-react';

interface Horse {
    id: number; url: string; title: string; age: string;
    color: string; sire: string; dam: string; stable: string; career: string;
    gallery?: { url: string }[];
    videoUrl?: string;
    about?: string;
}

interface Syndication {
    id: number; url: string; name: string; age: string;
    breed: string; sharePrice: string; description: string;
    gallery?: { url: string }[];
    videoUrl?: string;
    about?: string;
}

interface Testimonial {
    id: number; text: string; name: string; role: string; image?: string;
}

const HORSE_FIELDS = ['title', 'age', 'color', 'sire', 'dam', 'stable', 'career'] as const;
const HORSE_PLACEHOLDERS: Record<string, string> = {
    title: 'Horse Name', age: 'e.g. 6yo Gelding', color: 'Bay',
    sire: 'Sire Name', dam: 'Dam Name', stable: 'Stable Name', career: 'e.g. 32 Starts: 7-6-2',
};

const HORSE_LABELS: Record<string, string> = {
    title: 'Horse Name', age: 'Age', color: 'Colour',
    sire: 'Sire', dam: 'Dam', stable: 'Stable Name', career: 'Career',
};

const SYN_FIELDS = ['name', 'age', 'breed', 'sharePrice'] as const;
const SYN_LABELS: Record<string, string> = {
    name: 'Horse Name', age: 'Age', breed: 'Breed', sharePrice: 'Share Price',
};
const SYN_PLACEHOLDERS: Record<string, string> = {
    name: 'Horse Name', age: 'N/A', breed: 'Premium', sharePrice: 'Purchased for $90,000.00 at the 2026 Melbourne Inglis Premier Yearling Sale',
};

type HorseForm = { title: string; age: string; color: string; sire: string; dam: string; stable: string; career: string; url: string };
const emptyHorseForm: HorseForm = { title: '', age: '', color: '', sire: '', dam: '', stable: '', career: '', url: '' };

type SynForm = { name: string; age: string; breed: string; sharePrice: string; url: string };
const emptySynForm: SynForm = { name: '', age: '', breed: '', sharePrice: '', url: '' };

async function uploadImage(file: File, password: string): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    const res = await fetch('/api/horses/upload', { method: 'POST', body: fd });
    if (!res.ok) return null;
    return (await res.json()).url;
}

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</label>
            <input {...props} className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 placeholder-zinc-600 transition-all" />
        </div>
    );
}

function AdminPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') === 'syndications' ? 'syndications' : searchParams.get('tab') === 'subscribers' ? 'subscribers' : searchParams.get('tab') === 'testimonials' ? 'testimonials' : 'horses';
    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false);
    const [horses, setHorses] = useState<Horse[]>([]);
    const [syndications, setSyndications] = useState<Syndication[]>([]);
    const [subscribers, setSubscribers] = useState<{ name: string; email: string; subscribedAt: string }[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [testimonialForm, setTestimonialForm] = useState({ text: '', name: '', role: '', image: '' });
    const [testimonialFormFile, setTestimonialFormFile] = useState<File | null>(null);
    const [testimonialFormPreview, setTestimonialFormPreview] = useState<string | null>(null);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [editTestimonialFile, setEditTestimonialFile] = useState<File | null>(null);
    const [editTestimonialPreview, setEditTestimonialPreview] = useState<string | null>(null);
    const [confirmDeleteTestimonial, setConfirmDeleteTestimonial] = useState<Testimonial | null>(null);
    const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
    const [subPage, setSubPage] = useState(1);
    const SUB_PAGE_SIZE = 20;
    const [confirmDelete, setConfirmDelete] = useState<{ id: number; type: 'horse' | 'syndication'; name: string } | null>(null);
    const [horseForm, setHorseForm] = useState<HorseForm>(emptyHorseForm);
    const [horseFormFile, setHorseFormFile] = useState<File | null>(null);
    const [horseFormPreview, setHorseFormPreview] = useState<string | null>(null);
    const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
    const [editHorseFile, setEditHorseFile] = useState<File | null>(null);
    const [editHorsePreview, setEditHorsePreview] = useState<string | null>(null);
    const [editingSyn, setEditingSyn] = useState<Syndication | null>(null);
    const [editSynFile, setEditSynFile] = useState<File | null>(null);
    const [editSynPreview, setEditSynPreview] = useState<string | null>(null);
    const [cropTarget, setCropTarget] = useState<{ src: string; file: File; target: string } | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [synForm, setSynForm] = useState<SynForm>(emptySynForm);
    const [synFormFile, setSynFormFile] = useState<File | null>(null);
    const [synFormPreview, setSynFormPreview] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const pw = sessionStorage.getItem('adminPw');
        if (pw) {
            setPassword(pw);
            setAuthed(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!authed) return;
        const pw = sessionStorage.getItem('adminPw') ?? '';
        fetch('/api/horses').then(r => r.json()).then(setHorses);
        fetch('/api/syndications').then(r => r.json()).then(setSyndications);
        fetch('/api/newsletter', { headers: { Authorization: `Bearer ${pw}` } }).then(r => r.json()).then(d => Array.isArray(d) ? setSubscribers(d) : null);
        fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
    }, [authed]);

    function handleFileSelect(file: File, target: string) {
        setCropTarget({ src: URL.createObjectURL(file), file, target });
    }

    function handleCropDone(croppedFile: File) {
        const preview = URL.createObjectURL(croppedFile);
        if (cropTarget?.target === 'horseForm') { setHorseFormFile(croppedFile); setHorseFormPreview(preview); }
        else if (cropTarget?.target === 'horseEdit') { setEditHorseFile(croppedFile); setEditHorsePreview(preview); }
        else if (cropTarget?.target === 'synEdit') { setEditSynFile(croppedFile); setEditSynPreview(preview); }
        else if (cropTarget?.target === 'synForm') { setSynFormFile(croppedFile); setSynFormPreview(preview); }
        else if (cropTarget?.target === 'testimonialForm') { setTestimonialFormFile(croppedFile); setTestimonialFormPreview(preview); }
        else if (cropTarget?.target === 'testimonialEdit') { setEditTestimonialFile(croppedFile); setEditTestimonialPreview(preview); }
        setCropTarget(null);
    }

    async function handleAddHorse(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        let url = horseForm.url;
        if (horseFormFile) {
            const uploaded = await uploadImage(horseFormFile, password);
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/horses', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...horseForm, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to add horse');
        setHorseForm(emptyHorseForm); setHorseFormFile(null); setHorseFormPreview(null);
        setShowAddForm(false);
        fetch('/api/horses').then(r => r.json()).then(setHorses);
    }

    async function handleEditHorse(e: React.FormEvent) {
        e.preventDefault();
        if (!editingHorse) return;
        setLoading(true); setError('');
        let url = editingHorse.url;
        if (editHorseFile) {
            const uploaded = await uploadImage(editHorseFile, password);
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/horses', {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editingHorse, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to update horse');
        setEditingHorse(null); setEditHorseFile(null); setEditHorsePreview(null);
        fetch('/api/horses').then(r => r.json()).then(setHorses);
    }

    async function handleAddSyn(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        let url = synForm.url;
        if (synFormFile) {
            const uploaded = await uploadImage(synFormFile, password);
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/syndications', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...synForm, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to add ownership');
        setSynForm(emptySynForm); setSynFormFile(null); setSynFormPreview(null);
        setShowAddForm(false);
        fetch('/api/syndications').then(r => r.json()).then(setSyndications);
    }

    async function handleEditSyn(e: React.FormEvent) {
        e.preventDefault();
        if (!editingSyn) return;
        setLoading(true); setError('');
        let url = editingSyn.url;
        if (editSynFile) {
            const uploaded = await uploadImage(editSynFile, password);
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/syndications', {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editingSyn, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to update ownership');
        setEditingSyn(null); setEditSynFile(null); setEditSynPreview(null);
        fetch('/api/syndications').then(r => r.json()).then(setSyndications);
    }

    async function handleDeleteHorse(id: number) {
        await fetch('/api/horses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, password }) });
        fetch('/api/horses').then(r => r.json()).then(setHorses);
    }

    // ── Login screen ──
    if (!authed) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <img src="/logo.png" alt="Vahala Racing" className="w-16 h-16 object-contain mb-4" />
                        <h1 className="text-white text-2xl font-bold">Welcome back</h1>
                        <p className="text-zinc-500 text-sm mt-1">Sign in to your admin panel</p>
                    </div>

                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                        <div className="flex flex-col gap-1.5 mb-4">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && document.getElementById('loginBtn')?.click()}
                                className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 placeholder-zinc-600 transition-all"
                            />
                        </div>
                        {loginError && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
                                <p className="text-red-400 text-sm">{loginError}</p>
                            </div>
                        )}
                        <button
                            id="loginBtn"
                            onClick={async () => {
                                const res = await fetch('/api/horses', {
                                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ password, _check: true }),
                                });
                                if (res.status === 400) { sessionStorage.setItem('adminPw', password); setAuthed(true); setLoginError(''); }
                                else setLoginError('Incorrect password. Please try again.');
                            }}
                            className="w-full bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-lg transition-colors text-sm"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AdminLayout>
            {/* Page header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-white text-2xl font-bold">
                        {tab === 'horses' ? 'Our Horses' : tab === 'syndications' ? 'Ownership' : tab === 'testimonials' ? 'Testimonials' : 'Subscribers'}
                    </h1>
                    <p className="text-zinc-500 text-sm mt-0.5">
                        {tab === 'horses' ? `${horses.length} horse${horses.length !== 1 ? 's' : ''} in stable`
                        : tab === 'syndications' ? 'Manage ownership horses'
                        : tab === 'testimonials' ? `${testimonials.length} testimonial${testimonials.length !== 1 ? 's' : ''}`
                        : `${subscribers.length} subscriber${subscribers.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                {tab !== 'subscribers' && tab !== 'testimonials' && (
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 bg-[#1ADB04] hover:bg-[#15c203] text-black font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    {tab === 'horses' ? 'Add Horse' : 'Add Ownership'}
                </button>
                )}
            </div>

            {/* Stats row */}
            {tab === 'horses' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Horses', value: horses.length },
                    { label: 'With Gallery', value: horses.filter(h => (h.gallery?.length ?? 0) > 0).length },
                    { label: 'With Video', value: horses.filter(h => h.videoUrl).length },
                    { label: 'With About', value: horses.filter(h => h.about).length },
                ].map(stat => (
                    <div key={stat.label} className="bg-[#111] border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">{stat.label}</p>
                        <p className="text-white text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
            )}
            {tab === 'syndications' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Ownership', value: syndications.length },
                    { label: 'With Gallery', value: syndications.filter(s => (s.gallery?.length ?? 0) > 0).length },
                    { label: 'With Video', value: syndications.filter(s => s.videoUrl).length },
                    { label: 'With About', value: syndications.filter(s => s.about).length },
                ].map(stat => (
                    <div key={stat.label} className="bg-[#111] border border-zinc-800 rounded-xl p-4">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">{stat.label}</p>
                        <p className="text-white text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
            )}

            {/* Horse grid */}
            {tab === 'horses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {horses.map(horse => (
                    <div key={horse.id} className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors group">
                        {/* Image */}
                        <div className="relative aspect-[3/2] overflow-hidden bg-zinc-900">
                            <img src={horse.url} alt={horse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{horse.title}</h3>
                        </div>

                        {/* Details */}
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                                {[['Age', horse.age], ['Colour', horse.color], ['Sire', horse.sire], ['Dam', horse.dam], ['Stable', horse.stable]].map(([k, v]) => (
                                    <div key={k}>
                                        <span className="text-zinc-600 text-xs">{k}</span>
                                        <p className="text-zinc-300 text-sm font-medium truncate">{v}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-zinc-800/50 rounded-lg px-3 py-2 mb-4">
                                <span className="text-zinc-500 text-xs">Career</span>
                                <p className="text-[#1ADB04] text-sm font-semibold">{horse.career}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => { sessionStorage.setItem('adminPw', password); router.push(`/admin/horse/${horse.id}`); }}
                                    className="flex items-center justify-between w-full bg-[#1ADB04]/10 hover:bg-[#1ADB04]/20 border border-[#1ADB04]/20 text-[#1ADB04] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                >
                                    <span className="flex items-center gap-2"><Settings2 className="w-4 h-4" /> Manage Detail Page</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setEditingHorse(horse); setEditHorseFile(null); setEditHorsePreview(null); }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white py-2 rounded-xl text-sm font-medium transition-all"
                                    >
                                        <Pencil className="w-3.5 h-3.5" /> Edit
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete({ id: horse.id, type: 'horse', name: horse.title })}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-xl text-sm font-medium transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}

            {/* Syndications tab */}
            {tab === 'syndications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {syndications.length === 0 && (
                        <div className="col-span-full bg-[#111] border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                            <Users className="w-12 h-12 text-zinc-700 mb-4" />
                            <h2 className="text-white font-bold text-lg mb-2">No Ownership Yet</h2>
                            <p className="text-zinc-500 text-sm">Click &quot;Add Syndication&quot; to get started.</p>
                        </div>
                    )}
                    {syndications.map(s => (
                        <div key={s.id} className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors group">
                            <div className="relative aspect-[3/2] overflow-hidden bg-zinc-900">
                                <img src={s.url} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{s.name}</h3>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                                    {[['Age', s.age], ['Breed', s.breed]].map(([k, v]) => (
                                        <div key={k}>
                                            <span className="text-zinc-600 text-xs">{k}</span>
                                            <p className="text-zinc-300 text-sm font-medium truncate">{v}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-zinc-800/50 rounded-lg px-3 py-2 mb-4">
                                    <span className="text-zinc-500 text-xs">Share Price</span>
                                    <p className="text-[#1ADB04] text-sm font-semibold">{s.sharePrice}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { sessionStorage.setItem('adminPw', password); router.push(`/admin/syndication/${s.id}`); }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#1ADB04]/10 hover:bg-[#1ADB04]/20 border border-[#1ADB04]/20 text-[#1ADB04] py-2 rounded-xl text-sm font-semibold transition-all"
                                    >
                                        <Settings2 className="w-3.5 h-3.5" /> Manage
                                    </button>
                                    <button
                                        onClick={() => { setEditingSyn(s); setEditSynFile(null); setEditSynPreview(null); }}
                                        className="flex items-center justify-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-2 rounded-xl text-sm transition-all"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete({ id: s.id, type: 'syndication', name: s.name })}
                                        className="flex items-center justify-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded-xl text-sm transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Horse Modal */}
            {showAddForm && tab === 'horses' && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-xl my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-white font-bold text-lg">Add New Horse</h2>
                            <button onClick={() => setShowAddForm(false)} className="text-zinc-500 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={handleAddHorse} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {HORSE_FIELDS.map(f => (
                                <InputField key={f} label={HORSE_LABELS[f]} placeholder={HORSE_PLACEHOLDERS[f]}
                                    value={horseForm[f]} required
                                    onChange={e => setHorseForm(prev => ({ ...prev, [f]: e.target.value }))} />
                            ))}
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Horse Image</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-6 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" required className="hidden"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'horseForm'); }} />
                                    {horseFormPreview
                                        ? <img src={horseFormPreview} className="h-32 rounded-lg object-cover" alt="preview" />
                                        : <><ImageIcon className="w-8 h-8 text-zinc-600" /><span className="text-zinc-500 text-sm">Click to upload image</span></>
                                    }
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    {loading ? 'Adding...' : 'Add Horse'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Ownership Modal */}
            {showAddForm && tab === 'syndications' && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-xl my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-white font-bold text-lg">Add New Ownership</h2>
                            <button onClick={() => setShowAddForm(false)} className="text-zinc-500 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={handleAddSyn} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SYN_FIELDS.map(f => (
                                <InputField key={f} label={SYN_LABELS[f]} placeholder={SYN_PLACEHOLDERS[f]}
                                    value={synForm[f]} required
                                    onChange={e => setSynForm(prev => ({ ...prev, [f]: e.target.value }))} />
                            ))}
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Horse Image</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-6 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" required className="hidden"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'synForm'); }} />
                                    {synFormPreview
                                        ? <img src={synFormPreview} className="h-32 rounded-lg object-cover" alt="preview" />
                                        : <><ImageIcon className="w-8 h-8 text-zinc-600" /><span className="text-zinc-500 text-sm">Click to upload image</span></>
                                    }
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    {loading ? 'Adding...' : 'Add Ownership'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Horse Modal */}
            {editingHorse && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-xl my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-white font-bold text-lg">Edit — {editingHorse.title}</h2>
                            <button onClick={() => setEditingHorse(null)} className="text-zinc-500 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={handleEditHorse} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {HORSE_FIELDS.map(f => (
                                <InputField key={f} label={HORSE_LABELS[f]} placeholder={HORSE_PLACEHOLDERS[f]}
                                    value={editingHorse[f]} required
                                    onChange={e => setEditingHorse(prev => prev ? { ...prev, [f]: e.target.value } : prev)} />
                            ))}
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Replace Image (optional)</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-4 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" className="hidden"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'horseEdit'); }} />
                                    <img src={editHorsePreview ?? editingHorse.url} className="h-28 rounded-lg object-cover" alt="preview" />
                                    <span className="text-zinc-500 text-xs">Click to replace</span>
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full flex gap-3 pt-2">
                                <button type="button" onClick={() => setEditingHorse(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Syndication Modal */}
            {editingSyn && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-xl my-8">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-white font-bold text-lg">Edit — {editingSyn.name}</h2>
                            <button onClick={() => setEditingSyn(null)} className="text-zinc-500 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={handleEditSyn} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {SYN_FIELDS.map(f => (
                                <InputField key={f} label={SYN_LABELS[f]} placeholder={SYN_PLACEHOLDERS[f]}
                                    value={editingSyn[f]} required
                                    onChange={e => setEditingSyn(prev => prev ? { ...prev, [f]: e.target.value } : prev)} />
                            ))}
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Replace Image (optional)</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-4 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" className="hidden"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'synEdit'); }} />
                                    <img src={editSynPreview ?? editingSyn.url} className="h-28 rounded-lg object-cover" alt="preview" />
                                    <span className="text-zinc-500 text-xs">Click to replace</span>
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full flex gap-3 pt-2">
                                <button type="button" onClick={() => setEditingSyn(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Testimonials tab */}
            {tab === 'testimonials' && (
                <div className="space-y-4">
                    {/* Add form */}
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">
                        <h2 className="text-white font-bold text-base mb-4">Add Testimonial</h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true); setError('');
                            let image = testimonialForm.image;
                            if (testimonialFormFile) {
                                const uploaded = await uploadImage(testimonialFormFile, password);
                                if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
                                image = uploaded;
                            }
                            const res = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...testimonialForm, image, password }) });
                            setLoading(false);
                            if (!res.ok) return setError('Failed to add testimonial');
                            setTestimonialForm({ text: '', name: '', role: '', image: '' });
                            setTestimonialFormFile(null); setTestimonialFormPreview(null);
                            fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
                        }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-full flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Testimonial Text</label>
                                <textarea required rows={3} value={testimonialForm.text} onChange={e => setTestimonialForm(p => ({ ...p, text: e.target.value }))} placeholder="What they said..." className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 placeholder-zinc-600 transition-all resize-none" />
                            </div>
                            <InputField label="Name" required value={testimonialForm.name} onChange={e => setTestimonialForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Sheikh Owais" />
                            <InputField label="Role" required value={testimonialForm.role} onChange={e => setTestimonialForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Owner" />
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Profile Image (optional)</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-4 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'testimonialForm'); }} />
                                    {testimonialFormPreview
                                        ? <img src={testimonialFormPreview} className="h-20 w-20 rounded-full object-cover" alt="preview" />
                                        : <><ImageIcon className="w-6 h-6 text-zinc-600" /><span className="text-zinc-500 text-xs">Click to upload photo</span></>
                                    }
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full">
                                <button type="submit" disabled={loading} className="bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold px-6 py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">
                                    {loading ? 'Adding...' : 'Add Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* List */}
                    {testimonials.map(t => (
                        <div key={t.id} className="bg-[#111] border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3">
                            <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white text-sm font-semibold">{t.name}</p>
                                    <p className="text-zinc-500 text-xs">{t.role}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingTestimonial(t)} className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg text-xs transition-all"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                                    <button onClick={() => setConfirmDeleteTestimonial(t)} className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs transition-all"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {testimonials.length === 0 && (
                        <div className="bg-[#111] border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                            <p className="text-zinc-500 text-sm">No testimonials yet. Add one above.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Edit Testimonial Modal */}
            {editingTestimonial && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                            <h2 className="text-white font-bold text-lg">Edit Testimonial</h2>
                            <button onClick={() => setEditingTestimonial(null)} className="text-zinc-500 hover:text-white text-xl leading-none">×</button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true); setError('');
                            let image = editingTestimonial.image ?? '';
                            if (editTestimonialFile) {
                                const uploaded = await uploadImage(editTestimonialFile, password);
                                if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
                                image = uploaded;
                            }
                            const res = await fetch('/api/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editingTestimonial, image, password }) });
                            setLoading(false);
                            if (!res.ok) return setError('Failed to update');
                            setEditingTestimonial(null); setEditTestimonialFile(null); setEditTestimonialPreview(null);
                            fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
                        }} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-full flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Testimonial Text</label>
                                <textarea required rows={3} value={editingTestimonial.text} onChange={e => setEditingTestimonial(p => p ? { ...p, text: e.target.value } : p)} className="bg-zinc-800/60 border border-zinc-700/50 text-white px-3.5 py-2.5 rounded-lg text-sm outline-none focus:border-[#1ADB04]/50 focus:ring-1 focus:ring-[#1ADB04]/20 transition-all resize-none" />
                            </div>
                            <InputField label="Name" required value={editingTestimonial.name} onChange={e => setEditingTestimonial(p => p ? { ...p, name: e.target.value } : p)} />
                            <InputField label="Role" required value={editingTestimonial.role} onChange={e => setEditingTestimonial(p => p ? { ...p, role: e.target.value } : p)} />
                            <div className="col-span-full">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wide block mb-2">Replace Photo (optional)</label>
                                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-700 hover:border-[#1ADB04]/50 rounded-xl p-4 cursor-pointer transition-colors bg-zinc-800/30">
                                    <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'testimonialEdit'); }} />
                                    <img src={editTestimonialPreview ?? editingTestimonial.image ?? '/profile1.jpg'} className="h-20 w-20 rounded-full object-cover" alt="preview" />
                                    <span className="text-zinc-500 text-xs">Click to replace</span>
                                </label>
                            </div>
                            {error && <div className="col-span-full bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><p className="text-red-400 text-sm">{error}</p></div>}
                            <div className="col-span-full flex gap-3">
                                <button type="button" onClick={() => setEditingTestimonial(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 bg-[#1ADB04] hover:bg-[#15c203] text-black font-bold py-2.5 rounded-xl text-sm disabled:opacity-50 transition-all">{loading ? 'Saving...' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirm Delete Testimonial */}
            {confirmDeleteTestimonial && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4"><Trash2 className="w-5 h-5 text-red-400" /></div>
                        <h2 className="text-white font-bold text-lg mb-1">Delete Testimonial?</h2>
                        <p className="text-zinc-400 text-sm mb-6">By <span className="text-white font-medium">{confirmDeleteTestimonial.name}</span> will be permanently deleted.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDeleteTestimonial(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                            <button onClick={async () => {
                                await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: confirmDeleteTestimonial.id, password }) });
                                setConfirmDeleteTestimonial(null);
                                fetch('/api/testimonials').then(r => r.json()).then(setTestimonials);
                            }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subscribers tab */}
            {tab === 'subscribers' && (() => {
                const totalPages = Math.ceil(subscribers.length / SUB_PAGE_SIZE);
                const paginated = subscribers.slice((subPage - 1) * SUB_PAGE_SIZE, subPage * SUB_PAGE_SIZE);
                const pageEmails = paginated.map(s => s.email);
                const allPageSelected = pageEmails.length > 0 && pageEmails.every(e => selectedEmails.has(e));

                function toggleEmail(email: string) {
                    setSelectedEmails(prev => { const n = new Set(prev); n.has(email) ? n.delete(email) : n.add(email); return n; });
                }
                function togglePage() {
                    setSelectedEmails(prev => {
                        const n = new Set(prev);
                        allPageSelected ? pageEmails.forEach(e => n.delete(e)) : pageEmails.forEach(e => n.add(e));
                        return n;
                    });
                }
                function downloadCSV(list: typeof subscribers) {
                    const csv = ['Name,Email,Subscribed At', ...list.map(s => `${s.name},${s.email},${new Date(s.subscribedAt).toLocaleDateString('en-AU')}`)];
                    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
                    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                    a.download = 'subscribers.csv'; a.click();
                }
                async function deleteSelected() {
                    const pw = sessionStorage.getItem('adminPw') ?? '';
                    await fetch('/api/newsletter', { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` }, body: JSON.stringify({ emails: [...selectedEmails] }) });
                    setSubscribers(prev => prev.filter(s => !selectedEmails.has(s.email)));
                    setSelectedEmails(new Set());
                    setSubPage(1);
                }

                return (
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-zinc-800">
                            <span className="text-zinc-400 text-sm">
                                {selectedEmails.size > 0 ? <span className="text-[#1ADB04] font-medium">{selectedEmails.size} selected</span> : `${subscribers.length} total`}
                            </span>
                            <div className="flex gap-2">
                                {selectedEmails.size > 0 && (
                                    <>
                                        <button onClick={() => downloadCSV(subscribers.filter(s => selectedEmails.has(s.email)))}
                                            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                                            ↓ Download Selected
                                        </button>
                                        <button onClick={deleteSelected}
                                            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                                            <Trash2 className="w-3.5 h-3.5" /> Delete Selected
                                        </button>
                                    </>
                                )}
                                <button onClick={() => downloadCSV(subscribers)}
                                    className="flex items-center gap-1.5 bg-[#1ADB04]/10 hover:bg-[#1ADB04]/20 text-[#1ADB04] border border-[#1ADB04]/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                                    ↓ Download All
                                </button>
                            </div>
                        </div>

                        {subscribers.length === 0 ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <Users className="w-12 h-12 text-zinc-700 mb-4" />
                                <h2 className="text-white font-bold text-lg mb-2">No Subscribers Yet</h2>
                                <p className="text-zinc-500 text-sm">Subscribers will appear here once users sign up.</p>
                            </div>
                        ) : (
                            <>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-800">
                                            <th className="px-6 py-3 w-10">
                                                <input type="checkbox" checked={allPageSelected} onChange={togglePage}
                                                    className="accent-[#1ADB04] w-4 h-4 cursor-pointer" />
                                            </th>
                                            <th className="text-left text-zinc-500 text-xs uppercase tracking-wide px-4 py-3">#</th>
                                            <th className="text-left text-zinc-500 text-xs uppercase tracking-wide px-4 py-3">Name</th>
                                            <th className="text-left text-zinc-500 text-xs uppercase tracking-wide px-4 py-3">Email</th>
                                            <th className="text-left text-zinc-500 text-xs uppercase tracking-wide px-4 py-3">Subscribed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map((s, i) => (
                                            <tr key={s.email} className={`border-b border-zinc-800/50 transition-colors cursor-pointer ${ selectedEmails.has(s.email) ? 'bg-[#1ADB04]/5' : 'hover:bg-zinc-800/30'}`}
                                                onClick={() => toggleEmail(s.email)}>
                                                <td className="px-6 py-3" onClick={e => e.stopPropagation()}>
                                                    <input type="checkbox" checked={selectedEmails.has(s.email)} onChange={() => toggleEmail(s.email)}
                                                        className="accent-[#1ADB04] w-4 h-4 cursor-pointer" />
                                                </td>
                                                <td className="px-4 py-3 text-zinc-600">{(subPage - 1) * SUB_PAGE_SIZE + i + 1}</td>
                                                <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                                                <td className="px-4 py-3 text-[#1ADB04]">{s.email}</td>
                                                <td className="px-4 py-3 text-zinc-400">{new Date(s.subscribedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
                                        <span className="text-zinc-500 text-xs">Page {subPage} of {totalPages}</span>
                                        <div className="flex gap-2">
                                            <button disabled={subPage === 1} onClick={() => setSubPage(p => p - 1)}
                                                className="px-3 py-1.5 rounded-lg text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all">← Prev</button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <button key={p} onClick={() => setSubPage(p)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${ p === subPage ? 'bg-[#1ADB04] text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}>{p}</button>
                                            ))}
                                            <button disabled={subPage === totalPages} onClick={() => setSubPage(p => p + 1)}
                                                className="px-3 py-1.5 rounded-lg text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Next →</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })()}

            {cropTarget && (
                <ImageCropper imageSrc={cropTarget.src} originalFile={cropTarget.file}
                    onDone={handleCropDone} onCancel={() => setCropTarget(null)} />
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl w-full max-w-sm p-6">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <Trash2 className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-white font-bold text-lg mb-1">Delete {confirmDelete.type === 'horse' ? 'Horse' : 'Syndication'}?</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            <span className="text-white font-medium">{confirmDelete.name}</span> will be permanently deleted. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all">Cancel</button>
                            <button
                                onClick={async () => {
                                    if (confirmDelete.type === 'horse') {
                                        await handleDeleteHorse(confirmDelete.id);
                                    } else {
                                        await fetch('/api/syndications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: confirmDelete.id, password }) });
                                        fetch('/api/syndications').then(r => r.json()).then(setSyndications);
                                    }
                                    setConfirmDelete(null);
                                }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default function AdminPage() {
    return (
        <Suspense>
            <AdminPageInner />
        </Suspense>
    );
}
