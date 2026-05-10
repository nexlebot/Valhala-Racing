import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import PublicFooter from "./_components/PublicFooter";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.valhallaracing.com.au'),
  title: {
    default: 'Vahala Racing | Own, Race, Win',
    template: '%s | Vahala Racing',
  },
  description: 'Vahala Racing is a professional thoroughbred racing stable offering ownership opportunities, expert horse training, and high-performance racing across Australia.',
  keywords: ['horse racing', 'thoroughbred', 'horse ownership', 'racing syndication', 'Australia racing', 'Vahala Racing'],
  authors: [{ name: 'Vahala Racing' }],
  openGraph: {
    type: 'website',
    siteName: 'Vahala Racing',
    title: 'Vahala Racing | Own, Race, Win',
    description: 'Professional thoroughbred racing stable offering ownership opportunities and expert horse training across Australia.',
    images: ['/heroImage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vahala Racing | Own, Race, Win',
    description: 'Professional thoroughbred racing stable offering ownership opportunities and expert horse training across Australia.',
    images: ['/heroImage.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        {children}
        <PublicFooter />
        <div dangerouslySetInnerHTML={{ __html: '<script src="https://nexle.netlify.app/agent-widget.js" agent-id="e9f06666-10aa-4dae-a90a-ce12e613b6cb"></script>' }} />
      </body>
    </html>
  );
}
