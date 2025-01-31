import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-400 ">
            <div className="container mx-auto px-4 mb-5 bottom-0">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="text-center sm:text-left">
                        <Link
                            href="https://bsky.app/profile/quacksire"
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
