import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Golos_Text } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const golos = Golos_Text({
  subsets: ['latin'],
  variable: '--font-golos',
});

export const metadata: Metadata = {
  title: "ASAP",
  description: "ASAP BY MEEKTURNA",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${golos.variable}`}>
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${golos.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
