'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Rabbit, Users, LogOut, Menu } from 'lucide-react';

const NAV = [
    { label: 'Our Horses', href: '/admin', icon: Rabbit },
    { label: 'Ownership', href: '/admin?tab=syndications', icon: Users },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        const pw = sessionStorage.getItem('adminPw');
        if (pw) {
            setAuthed(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logout() {
        sessionStorage.removeItem('adminPw');
        router.push('/admin');
        setAuthed(false);
    }

    if (!authed) return <>{children}</>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-60 bg-[#111] border-r border-zinc-800 z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-zinc-800">
                    <img src="/logo.png" alt="Valhalla" className="w-8 h-8 object-contain" />
                    <div>
                        <p className="text-white font-bold text-sm leading-tight">Valhalla Racing</p>
                        <p className="text-zinc-500 text-xs">Admin Panel</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest px-4 mb-3">Content</p>
                    {NAV.map(({ label, href, icon: Icon }) => {
                        const isActive = href.includes('tab=syndications')
                            ? tab === 'syndications'
                            : pathname === '/admin' && tab !== 'syndications';
                        return (
                            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all select-none ${isActive ? 'bg-[#1ADB04]/10 text-[#1ADB04] border border-[#1ADB04]/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}>
                                <Icon className="w-4 h-4 shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="px-3 py-4 border-t border-zinc-800 space-y-1">
                    <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all">
                        <LayoutDashboard className="w-4 h-4" />
                        View Website
                    </a>
                    <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-400/10 w-full transition-all">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="sticky top-0 z-10 bg-[#111]/80 backdrop-blur-md border-b border-zinc-800 px-6 h-14 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-zinc-400 hover:text-white">
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="hidden lg:flex items-center gap-2 text-zinc-500 text-sm">
                        <span>Admin</span>
                        <span>/</span>
                        <span className="text-white capitalize">
                            {pathname.includes('/admin/horse/') ? 'Our Horses / Detail'
                            : pathname.includes('/admin/syndication/') ? 'Ownership / Detail'
                            : tab === 'syndications' ? 'Ownership'
                            : 'Our Horses'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1ADB04] animate-pulse" />
                        <span className="text-zinc-500 text-xs">Live</span>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </Suspense>
    );
}
