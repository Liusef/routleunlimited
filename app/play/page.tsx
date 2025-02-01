import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {agencies} from "@/lib/transit";
import { getRequestContext } from "@cloudflare/next-on-pages";
import {CountdownTimer} from "@/components/countdown";

export const runtime = 'edge';
export const dynamic = 'force-dynamic'

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60


export default async function Play() {
    const { env } = getRequestContext();
    // get kv
    const kv = env.routleunlimited as KVNamespace;

    // get
    const timeReminaingKeys = await kv.list({prefix: 'dailyroute:'});

    //console.log(timeReminaingKeys.keys)


    /**
     * timeReminaingKeys.keys =
     * [
     *   { name: 'dailyroute:o-9mu-mts', expiration: 1738485635 },
     *   { name: 'dailyroute:o-9q8-samtrans', expiration: 1738485625 },
     *   { name: 'dailyroute:o-c20-trimet', expiration: 1738485640 }
     * ]
     */

    /**
     * it shoudl look like this
     *
     * {
     *     "o-9mu-mts": 1738485635,
     *     "o-9q8-samtrans": 1738485625,
     *     "o-c20-trimet": 1738485640
     * }
     */

    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const times: Record<string, number> = timeReminaingKeys.keys.reduce((acc, key) => {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, agency] = key.name.split(':');
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        acc[agency] = parseInt(key.expiration) * 1000;
        return acc;
    });


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
                                        <p className="text-sm text-zinc-400">{agency.subtitle} <CountdownTimer targetDate={times[agency.onestop]} /></p>
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
