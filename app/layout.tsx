import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Profile} from "@/components/kinde";
import Link from "next/link";

const departureMono = localFont({
    src: "./fonts/DepartureMono-Regular.woff",
    variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  title: "Route Unlimited",
  description: "Test your knowledge of transit agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={` font-[family-name:var(--font-departure-mono)] ${departureMono.variable}  antialiased`}
    >
    <nav className="bg-zinc-900 absolute top-0 left-0 right-0 z-100">
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
    <main className="flex-grow pt-16 min-h-screen bg-zinc-900 text-white">{children}</main>
    </body>
    </html>
  );
}
