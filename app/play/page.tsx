import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface AgencyCard {
    title: string
    subtitle: string
    image: string
    onestop: string
    available: boolean
}

const agencies: AgencyCard[] = [
    { title: "SFMTA", subtitle: "San Francisco Bay Area", image: "/sfmta-logo.svg", onestop: "o-9q8y-sfmta", available: true },
    { title: "SamTrans", subtitle: "San Francisco Bay Area", image: "/samtrans-logo.svg", onestop: "o-9q8-samtrans",available: true },
    { title: "AC Transit", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9-actransit",available: true },
    { title: "Wheels", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9q-wheelsbus",available: true },
    { title: "MTS", subtitle: "San Diego", image: "/placeholder.svg", onestop: "o-9mu-mts",available: true },
    { title: "King County Metro", subtitle: "Seattle, WA", image: "/placeholder.svg", onestop: "o-c23-metrotransit",available: true },
    { title: "TriMet", subtitle: "Portland, OR", image: "/placeholder.svg", onestop: "o-c20-trimet",available: true },
    { title: "More coming soon!", subtitle: "", image: "/placeholder.svg", onestop: "",available: false },
]

export default function Play() {
    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <h1 className="text-4xl font-bold mb-8">Choose an Agency</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agencies.map((agency, index) => (
                    <Card
                        key={index}
                        className={`overflow-hidden bg-background ${agency.available ? "hover:ring-2 hover:ring-primary cursor-pointer" : "opacity-50"}`}
                    >
                        <CardContent className="p-0">
                            {agency.available ? (
                                <Link href={`/play/${agency.onestop}`} className="flex items-center p-4">
                                    {/*}
                                    <Image
                                        src={agency.image || "/placeholder.svg"}
                                        alt={agency.title}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                    {*/}
                                    <div className="ml-4">
                                        <h2 className="text-xl font-semibold text-white">{agency.title}</h2>
                                        <p className="text-sm text-zinc-400">{agency.subtitle}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex items-center p-4">
                                    {/*}<Image
                                        src={agency.image || "/placeholder.svg"}
                                        alt={agency.title}
                                        width={64}
                                        height={64}
                                        className="rounded-full filter grayscale"
                                    />
                                    {*/}
                                    <div className="ml-4">
                                        <h2 className="text-xl font-semibold text-white">{agency.title}</h2>
                                        <p className="text-sm text-zinc-400">{agency.subtitle}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
