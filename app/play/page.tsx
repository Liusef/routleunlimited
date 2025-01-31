import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {agencies} from "@/lib/transit";


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
