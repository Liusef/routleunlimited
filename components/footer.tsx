import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-400 w-full content-center">
            <div className="container mx-auto px-4 mb-5 bottom-0 ">
                <div className="flex justify-between items-center space-y-4 ">
                    <div className="text-center sm:text-left">
                        <Link
                            href="https://bsky.app/profile/quacksire.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            Made with ❤️ in 🌉 by quacksire
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
