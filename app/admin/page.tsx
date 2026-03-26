'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageCropper from '../_components/ImageCropper';

interface Horse {
    id: number;
    url: string;
    title: string;
    age: string;
    color: string;
    sire: string;
    dam: string;
    career: string;
}

const TEXT_FIELDS = ['title', 'age', 'color', 'sire', 'dam', 'career'] as const;
const PLACEHOLDERS: Record<string, string> = {
    title: 'Horse Name',
    age: 'e.g. 5 Years',
    color: 'e.g. Bay',
    sire: 'Sire Name',
    dam: 'Dam Name',
    career: 'e.g. 25 Starts, 7-8-2',
};

type FormState = { title: string; age: string; color: string; sire: string; dam: string; career: string; url: string };
const emptyForm: FormState = { title: '', age: '', color: '', sire: '', dam: '', career: '', url: '' };

async function uploadImage(file: File, password: string): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    const res = await fetch('/api/horses/upload', { method: 'POST', body: fd });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url;
}

export default function AdminPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false);
    const [horses, setHorses] = useState<Horse[]>([]);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [formFile, setFormFile] = useState<File | null>(null);
    const [formPreview, setFormPreview] = useState<string | null>(null);
    const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);
    const [cropTarget, setCropTarget] = useState<{ src: string; file: File; target: 'form' | 'edit' } | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleFileSelect(file: File, target: 'form' | 'edit') {
        const src = URL.createObjectURL(file);
        setCropTarget({ src, file, target });
    }

    function handleCropDone(croppedFile: File) {
        const preview = URL.createObjectURL(croppedFile);
        if (cropTarget?.target === 'form') {
            setFormFile(croppedFile);
            setFormPreview(preview);
        } else {
            setEditFile(croppedFile);
            setEditPreview(preview);
        }
        setCropTarget(null);
    }

    async function fetchHorses() {
        const res = await fetch('/api/horses');
        setHorses(await res.json());
    }

    useEffect(() => { if (authed) fetchHorses(); }, [authed]);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        let url = form.url;
        if (formFile) {
            const uploaded = await uploadImage(formFile, password);
            if (!uploaded) { setError('Image upload failed'); setLoading(false); return; }
            url = uploaded;
        }
        const res = await fetch('/api/horses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, url, password }),
        });
        setLoading(false);
        if (!res.ok) return setError('Failed to add horse');
        setForm(emptyForm);
        setFormFile(null);
        setFormPreview(null);
        fetchHorses();
    }

    async function handleEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editingHorse) return;
        setLoading(true);
        setError('');
        let url = editingHorse.url;
        if (editFile) {
            const uploaded = await uploadImage(editFile, password);
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
        setEditingHorse(null);
        setEditFile(null);
        setEditPreview(null);
        fetchHorses();
    }

    async function handleDelete(id: number) {
        if (!confirm('Delete this horse?')) return;
        await fetch('/api/horses', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password }),
        });
        fetchHorses();
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
                            if (res.status === 400) { setAuthed(true); setError(''); }
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
            <h1 className="text-3xl font-bold mb-8">Horse Admin Panel</h1>

            {/* Add Horse Form */}
            <form onSubmit={handleAdd} className="bg-zinc-900 p-6 rounded-2xl mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <h2 className="text-xl font-semibold col-span-full">Add New Horse</h2>
                {TEXT_FIELDS.map(f => (
                    <input
                        key={f}
                        required
                        placeholder={PLACEHOLDERS[f]}
                        value={form[f]}
                        onChange={e => setForm(prev => ({ ...prev, [f]: e.target.value }))}
                        className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500"
                    />
                ))}
                {/* Image upload */}
                <div className="col-span-full">
                    <label className="block text-zinc-400 text-sm mb-2">Horse Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'form'); }}
                        className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#1ADB04] file:text-black file:font-medium"
                    />
                    {formPreview && <img src={formPreview} className="mt-3 h-32 rounded-lg object-cover" alt="preview" />}
                </div>
                {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                <button type="submit" disabled={loading} className="col-span-full bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">
                    {loading ? 'Adding...' : 'Add Horse'}
                </button>
            </form>

            {/* Edit Modal */}
            {editingHorse && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <form onSubmit={handleEdit} className="bg-zinc-900 p-6 rounded-2xl w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                        <h2 className="text-xl font-semibold col-span-full">Edit Horse</h2>
                        {TEXT_FIELDS.map(f => (
                            <input
                                key={f}
                                required
                                placeholder={PLACEHOLDERS[f]}
                                value={editingHorse[f]}
                                onChange={e => setEditingHorse(prev => prev ? { ...prev, [f]: e.target.value } : prev)}
                                className="bg-zinc-800 px-4 py-3 rounded-lg outline-none text-white placeholder-zinc-500"
                            />
                        ))}
                        {/* Image upload in edit */}
                        <div className="col-span-full">
                            <label className="block text-zinc-400 text-sm mb-2">Replace Image (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f, 'edit'); }}
                                className="w-full bg-zinc-800 px-4 py-3 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-600 file:text-white file:font-medium"
                            />
                            <img
                                src={editPreview ?? editingHorse.url}
                                className="mt-3 h-32 rounded-lg object-cover"
                                alt="preview"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                        <button type="button" onClick={() => { setEditingHorse(null); setEditFile(null); setEditPreview(null); }} className="bg-zinc-700 text-white py-3 rounded-lg font-medium">Cancel</button>
                        <button type="submit" disabled={loading} className="bg-[#1ADB04] text-black font-bold py-3 rounded-lg disabled:opacity-50">{loading ? 'Saving...' : 'Save Changes'}</button>
                    </form>
                </div>
            )}

            {/* Image Cropper */}
            {cropTarget && (
                <ImageCropper
                    imageSrc={cropTarget.src}
                    originalFile={cropTarget.file}
                    onDone={handleCropDone}
                    onCancel={() => setCropTarget(null)}
                />
            )}

            {/* Horse List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {horses.map(horse => (
                    <div key={horse.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
                        <img src={horse.url} alt={horse.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-1">{horse.title}</h3>
                            <p className="text-zinc-400 text-sm">Age: {horse.age}</p>
                            <p className="text-zinc-400 text-sm">Color: {horse.color}</p>
                            <p className="text-zinc-400 text-sm">Sire / Dam: {horse.sire} × {horse.dam}</p>
                            <p className="text-zinc-400 text-sm mb-4">Career: {horse.career}</p>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => { sessionStorage.setItem('adminPw', password); router.push(`/admin/horse/${horse.id}`); }} className="w-full bg-[#1ADB04] text-black py-2 rounded-lg text-sm font-bold">Manage Detail Page</button>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingHorse(horse); setEditFile(null); setEditPreview(null); }} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-lg text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(horse.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
