import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin | Vahala Racing' };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
