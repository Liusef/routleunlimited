import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {AuthProvider, Profile} from "@/components/kinde";
import routesvg from "@/public/routle.svg";
import Image from "next/image";
import Link from "next/link";
import {Footer} from "@/components/footer";

const departureMono = localFont({
    src: "./fonts/DepartureMono-Regular.woff",
    variable: "--font-departure-mono",
});




const title = "Routle Unlimited"
const description = "Test your knowledge of transit agencies"

export const metadata: Metadata = {
    title: title,
    description:description,
    openGraph: {
        title: title,
        description: description,
        url: "https://routleunlimited.com",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: 'summary',
        title: title,
        description: description,
        siteId: '1467726470533754880',
        creator: '@duckdoquack',
    },
    icons: {
        icon: "/favicons/apple-touch-icon.png",
        shortcut: "/favicons/favicon-16x16.png",
        apple: "/favicons/apple-touch-icon.png",
    },
    category: 'technology',
    keywords: [
        "routle",
        "trivia",
        "transit trivia",
        "transit",
        "transportation",
        "transportation trivia",
        "public transportation",
        "public transportation trivia",
        "agency trivia",
        "agency",
        "bus trivia",
        "bus",
        "train trivia",
        "train",
        "subway trivia",
        "subway",
        "light rail trivia",
        "light rail",
        "commuter rail trivia",
        "commuter rail",
    ],
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    themeColor: '#18181b'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <html lang="en">
            <body
                className={` font-[family-name:var(--font-departure-mono)] ${departureMono.variable}  antialiased bg-zinc-900 w-screen`}
            >
            <nav className="bg-zinc-900 top-0 left-0 right-0 z-100 sticky">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <Link className="text-xl font-bold text-white flex gap-2" href={'/'}>
                                <Image alt={'logo'} src={routesvg} width={32} height={32}/>
                                Routle Unlimited</Link>
                        </div>
                        <div className="flex items-center">
                            <Profile/>
                        </div>
                    </div>
                </div>
            </nav>
                <main className="flex-grow min-h-screen bg-zinc-900 text-white">
                    {children}
                <Footer />
                </main>

            </body>
        </html>
      </AuthProvider>
  );
}
