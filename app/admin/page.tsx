'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageCropper from '../_components/ImageCropper';
import RichTextEditor from '../_components/RichTextEditor';

interface Horse {
    id: number;
    url: string;
    title: string;
    age: string;
    color: string;
    sire: string;
    dam: string;
    career: string;
    stable: string;
}

interface Syndication {
    id: number;
    url: string;
    name: string;
    age: string;
    breed: string;
    sharePrice: string;
    description: string;
}

const HORSE_FIELDS = ['title', 'age', 'color', 'sire', 'dam', 'career', 'stable'] as const;
const HORSE_PLACEHOLDERS: Record<string, string> = {
    title: 'Horse Name', age: 'e.g. 5 Years', color: 'e.g. Bay',
    sire: 'Sire Name', dam: 'Dam Name', career: 'e.g. 25 Starts, 7-8-2', stable: 'Stable Name',
};

const SYN_FIELDS = ['name', 'age', 'breed', 'sharePrice'] as const;
const SYN_PLACEHOLDERS: Record<string, string> = {
    name: 'Horse Name', age: 'e.g. 3 Years Old Bay Colt',
    breed: 'e.g. Premium Thoroughbred', sharePrice: 'e.g. $9,850',
};

type HorseForm = { title: string; age: string; color: string; sire: string; dam: string; career: string; stable: string; url: string };
type SynForm = { name: string; age: string; breed: string; sharePrice: string; description: string; url: string };

const emptyHorseForm: HorseForm = { title: '', age: '', color: '', sire: '', dam: '', career: '', stable: '', url: '' };
const emptySynForm: SynForm = { name: '', age: '', breed: '', sharePrice: '', description: '', url: '' };

async function uploadImage(file: File, password: string, endpoint: string): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    const res = await fetch(endpoint, { method: 'POST', body: fd });
    if (!res.ok) return null;
    return (await res.json()).url;
}

export default function AdminPage() {
    const router = useRouter();
    const [tab, setTab] = useState<'horses' | 'syndications'>('horses');
    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Horses state
    const [horses, setHorses] = useState<Horse[]>([]);
    const [horseForm, setHorseForm] = useState<HorseForm>(emptyHorseForm);
    const [horseFormFile, setHorseFormFile] = useState<File | null>(null);
    const [horseFormPreview, setHorseFormPreview] = useState<string | null>(null);
    const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
    const [editHorseFile, setEditHorseFile] = useState<File | null>(null);
    const [editHorsePreview, setEditHorsePreview] = useState<string | null>(null);

    // Syndications state
    const [syndications, setSyndications] = useState<Syndication[]>([]);
    const [synForm, setSynForm] = useState<SynForm>(emptySynForm);
    const [synFormFile, setSynFormFile] = useState<File | null>(null);
    const [synFormPreview, setSynFormPreview] = useState<string | null>(null);
    const [editingSyn, setEditingSyn] = useState<Syndication | null>(null);
    const [editSynFile, setEditSynFile] = useState<File | null>(null);
    const [editSynPreview, setEditSynPreview] = useState<string | null>(null);

    // Shared crop state
    const [cropTarget, setCropTarget] = useState<{ src: string; file: File; target: string } | null>(null);

    function handleFileSelect(file: File, target: string) {
        setCropTarget({ src: URL.createObjectURL(file), file, target });
    }

    function handleCropDone(croppedFile: File) {
        const preview = URL.createObjectURL(croppedFile);
        if (cropTarget?.target === 'horseForm') { setHorseFormFile(croppedFile); setHorseFormPreview(preview); }
        else if (cropTarget?.target === 'horseEdit') { setEditHorseFile(croppedFile); setEditHorsePreview(preview); }
        else if (cropTarget?.target === 'synForm') { setSynFormFile(croppedFile); setSynFormPreview(preview); }
        else if (cropTarget?.target === 'synEdit') { setEditSynFile(croppedFile); setEditSynPreview(preview); }
        setCropTarget(null);
    }

    async function fetchHorses() {
        const res = await fetch('/api/horses');
        setHorses(await res.json());
    }

    async function fetchSyndications() {
        const res = await fetch('/api/syndications');
        setSyndications(await res.json());
    }

    useEffect(() => {
        const pw = sessionStorage.getItem('adminPw');
        if (pw) { setPassword(pw); setAuthed(true); }
    }, []);

    useEffect(() => {
        if (!authed) return;
        fetchHorses();
        fetchSyndications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authed]);

    // --- Horse handlers ---
    async function handleAddHorse(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        let url = horseForm.url;
        if (horseFormFile) {
            const uploaded = await uploadImage(horseFormFile, password, '/api/horses/upload');
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/horses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...horseForm, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to add horse');
        setHorseForm(emptyHorseForm); setHorseFormFile(null); setHorseFormPreview(null);
        fetchHorses();
    }

    async function handleEditHorse(e: React.FormEvent) {
        e.preventDefault();
        if (!editingHorse) return;
        setLoading(true); setError('');
        let url = editingHorse.url;
        if (editHorseFile) {
            const uploaded = await uploadImage(editHorseFile, password, '/api/horses/upload');
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/horses', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editingHorse, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to update horse');
        setEditingHorse(null); setEditHorseFile(null); setEditHorsePreview(null);
        fetchHorses();
    }

    async function handleDeleteHorse(id: number) {
        if (!confirm('Delete this horse?')) return;
        await fetch('/api/horses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, password }) });
        fetchHorses();
    }

    // --- Syndication handlers ---
    async function handleAddSyn(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setError('');
        let url = synForm.url;
        if (synFormFile) {
            const uploaded = await uploadImage(synFormFile, password, '/api/syndications/upload');
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/syndications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...synForm, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to add syndication');
        setSynForm(emptySynForm); setSynFormFile(null); setSynFormPreview(null);
        fetchSyndications();
    }

    async function handleEditSyn(e: React.FormEvent) {
        e.preventDefault();
        if (!editingSyn) return;
        setLoading(true); setError('');
        let url = editingSyn.url;
        if (editSynFile) {
            const uploaded = await uploadImage(editSynFile, password, '/api/syndications/upload');
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/syndications', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editingSyn, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to update syndication');
        setEditingSyn(null); setEditSynFile(null); setEditSynPreview(null);
        fetchSyndications();
    }

    async function handleDeleteSyn(id: number) {
        if (!confirm('Delete this syndication?')) return;
        await fetch('/api/syndications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, password }) });
        fetchSyndications();
    }

    if (!authed) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-sm">
                    <h1 className="text-white text-2xl font-bold mb-6">Admin Login</h1>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
                    />
                    {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
                    <button
                        onClick={async () => {
                            const res = await fetch('/api/horses', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ password, _check: true }),
                            });
                            if (res.status === 400) { sessionStorage.setItem('adminPw', password); setAuthed(true); setError(''); }
                            else setError('Wrong password');
                        }}
                        className="w-full bg-[#1ADB04] text-black font-bold py-3 rounded-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                {(['horses', 'syndications'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => { setTab(t); setError(''); }}
                        className={`px-6 py-2 rounded-lg font-semibold capitalize transition-colors ${tab === t ? 'bg-[#1ADB04] text-black' : 'bg-zinc-800 text-white'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* ── HORSES TAB ── */}
            {tab === 'horses' && (
                <>
                    <form onSubmit={handleAddHorse} className="bg-zinc-900 p-6 rounded-2xl mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h2 className="text-xl font-semibold col-span-full">Add New Horse</h2>
                        {HORSE_FIELDS.map(f => (
                            <input key={f} required placeholder={HORSE_PLACEHOLDERS[f]} value={horseForm[f]}
                                onChange={e => setHorseForm(prev => ({ ...prev, [f]: e.target.value }))}
                                className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500" />
                        ))}
                        <div className="col-span-full">
                            <label className="block text-zinc-400 text-sm mb-2">Horse Image</label>
                            <input type="file" accept="image/*" required
                                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'horseForm'); }}
                                className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#1ADB04] file:text-black file:font-medium" />
                            {horseFormPreview && <img src={horseFormPreview} className="mt-3 h-32 rounded-lg object-cover" alt="preview" />}
                        </div>
                        {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                        <button type="submit" disabled={loading} className="col-span-full bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add Horse'}
                        </button>
                    </form>

                    {editingHorse && (
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
                            <form onSubmit={handleEditHorse} className="bg-zinc-900 p-6 rounded-2xl w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                                <h2 className="text-xl font-semibold col-span-full">Edit Horse</h2>
                                {HORSE_FIELDS.map(f => (
                                    <input key={f} required placeholder={HORSE_PLACEHOLDERS[f]} value={editingHorse[f]}
                                        onChange={e => setEditingHorse(prev => prev ? { ...prev, [f]: e.target.value } : prev)}
                                        className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500" />
                                ))}
                                <div className="col-span-full">
                                    <label className="block text-zinc-400 text-sm mb-2">Replace Image (optional)</label>
                                    <input type="file" accept="image/*"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'horseEdit'); }}
                                        className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-600 file:text-white file:font-medium" />
                                    <img src={editHorsePreview ?? editingHorse.url} className="mt-3 h-32 rounded-lg object-cover" alt="preview" />
                                </div>
                                {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                                <button type="button" onClick={() => { setEditingHorse(null); setEditHorseFile(null); setEditHorsePreview(null); }} className="bg-zinc-700 text-white py-3 rounded-lg font-medium">Cancel</button>
                                <button type="submit" disabled={loading} className="bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">{loading ? 'Saving...' : 'Save Changes'}</button>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {horses.map(horse => (
                            <div key={horse.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
                                <img src={horse.url} alt={horse.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-1">{horse.title}</h3>
                                    <p className="text-zinc-400 text-sm">Age: {horse.age}</p>
                                    <p className="text-zinc-400 text-sm">Color: {horse.color}</p>
                                    <p className="text-zinc-400 text-sm">Sire / Dam: {horse.sire} × {horse.dam}</p>
                                    <p className="text-zinc-400 text-sm">Career: {horse.career}</p>
                                    <p className="text-zinc-400 text-sm mb-4">Stable: {horse.stable}</p>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => { sessionStorage.setItem('adminPw', password); router.push(`/admin/horse/${horse.id}`); }} className="w-full bg-[#1ADB04] text-black py-2 rounded-lg text-sm font-bold">Manage Detail Page</button>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingHorse(horse); setEditHorseFile(null); setEditHorsePreview(null); }} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg text-sm font-medium">Edit</button>
                                            <button onClick={() => handleDeleteHorse(horse.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* ── SYNDICATIONS TAB ── */}
            {tab === 'syndications' && (
                <>
                    <form onSubmit={handleAddSyn} className="bg-zinc-900 p-6 rounded-2xl mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h2 className="text-xl font-semibold col-span-full">Add Ownership Syndication</h2>
                        {SYN_FIELDS.map(f => (
                            <input key={f} required placeholder={SYN_PLACEHOLDERS[f]} value={synForm[f]}
                                onChange={e => setSynForm(prev => ({ ...prev, [f]: e.target.value }))}
                                className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500" />
                        ))}
                        <div className="col-span-full">
                            <label className="block text-zinc-400 text-sm mb-2">Description</label>
                            <RichTextEditor value={synForm.description} onChange={v => setSynForm(prev => ({ ...prev, description: v }))} placeholder="Description" />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-zinc-400 text-sm mb-2">Horse Image</label>
                            <input type="file" accept="image/*" required
                                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'synForm'); }}
                                className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#1ADB04] file:text-black file:font-medium" />
                            {synFormPreview && <img src={synFormPreview} className="mt-3 h-32 rounded-lg object-cover" alt="preview" />}
                        </div>
                        {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                        <button type="submit" disabled={loading} className="col-span-full bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add Syndication'}
                        </button>
                    </form>

                    {editingSyn && (
                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
                            <form onSubmit={handleEditSyn} className="bg-zinc-900 p-6 rounded-2xl w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                                <h2 className="text-xl font-semibold col-span-full">Edit Syndication</h2>
                                {SYN_FIELDS.map(f => (
                                    <input key={f} required placeholder={SYN_PLACEHOLDERS[f]} value={editingSyn[f]}
                                        onChange={e => setEditingSyn(prev => prev ? { ...prev, [f]: e.target.value } : prev)}
                                        className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500" />
                                ))}
                                <div className="col-span-full">
                                    <label className="block text-zinc-400 text-sm mb-2">Description</label>
                                    <RichTextEditor value={editingSyn.description} onChange={v => setEditingSyn(prev => prev ? { ...prev, description: v } : prev)} placeholder="Description" />
                                </div>
                                <div className="col-span-full">
                                    <label className="block text-zinc-400 text-sm mb-2">Replace Image (optional)</label>
                                    <input type="file" accept="image/*"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'synEdit'); }}
                                        className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-600 file:text-white file:font-medium" />
                                    <img src={editSynPreview ?? editingSyn.url} className="mt-3 h-32 rounded-lg object-cover" alt="preview" />
                                </div>
                                {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                                <button type="button" onClick={() => { setEditingSyn(null); setEditSynFile(null); setEditSynPreview(null); }} className="bg-zinc-700 text-white py-3 rounded-lg font-medium">Cancel</button>
                                <button type="submit" disabled={loading} className="bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">{loading ? 'Saving...' : 'Save Changes'}</button>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {syndications.map(s => (
                            <div key={s.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
                                <img src={s.url} alt={s.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-1">{s.name}</h3>
                                    <p className="text-zinc-400 text-sm">Age: {s.age}</p>
                                    <p className="text-zinc-400 text-sm">Breed: {s.breed}</p>
                                    <p className="text-[#1ADB04] text-sm font-semibold mb-2">Share Price: {s.sharePrice}</p>
                                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{s.description}</p>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => { sessionStorage.setItem('adminPw', password); router.push(`/admin/syndication/${s.id}`); }} className="w-full bg-[#1ADB04] text-black py-2 rounded-lg text-sm font-bold">Manage Detail Page</button>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setEditingSyn(s); setEditSynFile(null); setEditSynPreview(null); }} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg text-sm font-medium">Edit</button>
                                            <button onClick={() => handleDeleteSyn(s.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Shared Image Cropper */}
            {cropTarget && (
                <ImageCropper
                    imageSrc={cropTarget.src}
                    originalFile={cropTarget.file}
                    aspect={cropTarget.target.startsWith('horse') ? 3 / 2 : 2089 / 1500}
                    onDone={handleCropDone}
                    onCancel={() => setCropTarget(null)}
                />
            )}
        </div>
    );
}
