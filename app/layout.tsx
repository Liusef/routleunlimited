import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Profile} from "@/components/kinde";
import Link from "next/link";

const departureMono = localFont({
    src: "./fonts/DepartureMono-Regular.woff",
    variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  title: "Routle Unlimited",
  description: "Test your knowledge of transit agencies",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#18181b'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={` font-[family-name:var(--font-departure-mono)] ${departureMono.variable}  antialiased bg-zinc-900 w-screen`}
    >
    <nav className="bg-zinc-900 top-0 left-0 right-0 z-100 sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                    <Link className="text-xl font-bold text-white" href={'/'}>Routle Unlimited</Link>
                </div>
                <div className="flex items-center">
                    <Profile/>
                </div>
            </div>
        </div>
    </nav>
    <main className="flex-grow min-h-screen bg-zinc-900 text-white">{children}</main>
    </body>
    </html>
  );
}
