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
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "ASAP",
  description: "ASAP BY MEEKTURNA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${golos.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
