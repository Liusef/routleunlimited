import Link from "next/link"

/**
 * Footer is a component that displays the footer of the website
 * @returns {Element}
 * @constructor
 */
export function Footer() {
    return (
        <footer className="bg-zinc-900 text-zinc-400 w-screen">
            <div className="container mx-auto px-4 mb-5 bottom-0 w-screen">
                <div className="flex items-center flex-wrap justify-evenly">
                    <div className="text-center">
                        <Link
                            href="https://bsky.app/profile/quacksire.dev"
                            target="_blank"
                            className="hover:text-primary transition-colors"
                        >
                            Made with ❤️ in 🌉 by quacksire ↗
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            href="https://ko-fi.com/quacksire"
                            target="_blank"
                        >
                           Buy me a coffee ☕ ↗
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
