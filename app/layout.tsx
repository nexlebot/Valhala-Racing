import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";
import NewsLetter from "./_components/newsLetter";

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
    default: 'Valhalla Racing | Own, Race, Win',
    template: '%s | Valhalla Racing',
  },
  description: 'Valhalla Racing is a professional thoroughbred racing stable offering ownership opportunities, expert horse training, and high-performance racing across Australia.',
  keywords: ['horse racing', 'thoroughbred', 'horse ownership', 'racing syndication', 'Australia racing', 'Valhalla Racing'],
  authors: [{ name: 'Valhalla Racing' }],
  openGraph: {
    type: 'website',
    siteName: 'Valhalla Racing',
    title: 'Valhalla Racing | Own, Race, Win',
    description: 'Professional thoroughbred racing stable offering ownership opportunities and expert horse training across Australia.',
    images: ['/heroImage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valhalla Racing | Own, Race, Win',
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
        <NewsLetter />
        <Footer />
      </body>
    </html>
  );
}
