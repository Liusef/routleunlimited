

import { getCloudflareContext as getRequestContext } from '@opennextjs/cloudflare';

//export const runtime = 'edge';

import { KVNamespace } from '@cloudflare/workers-types'
import Game from "@/app/play/[agency_onestop]/game";
import {Route, RoutesResponse} from "@/lib/types/transitland";
import {beutifyAgencyName} from "@/lib/utils";
import {agencyMap} from "@/lib/transit";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {KindeLogin} from "@/components/kinde";

export const dynamic = 'force-dynamic'
export const revalidate = 60


export async function generateMetadata({params}: { params: Promise<{ agency_onestop: string }>}) {

    const { agency_onestop } = await params
    console.log(agency_onestop)

    // get agency name from a route
    const json = agencyMap[agency_onestop] as RoutesResponse

    const agency_name = beutifyAgencyName(json.routes[0].agency.agency_name)




    console.log(json.routes[0].agency)
    const title = `Routle Unlimited - ${agency_name}`
    const description = `Test your knowledge of ${agency_name}`

    return {
        title: title,
        description:description,
        openGraph: {
            title: title,
            description: description,
            url: "https://routleunlimited.com/play/" + agency_onestop,
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
            `${agency_name} trivia`,
            `${agency_name}`,
            `${agency_name} route trivia`,
            `${agency_name} routes`
        ],
    }
}

function sortRoutes(routes: Route[]) {
    const numNum: Route[] = [];
    const letterLetter: Route[] = [];
    const numLetter: Route[] = [];
    const irregular: Route[] = [];

    routes.forEach(route => {
        const str = route.route_short_name || route.route_long_name || '';
        if (!str) return; // Skip if empty

        const firstChar = str.charAt(0);
        const lastChar = str.charAt(str.length - 1);
        const isFirstNum = firstChar >= '0' && firstChar <= '9';
        const isLastNum = lastChar >= '0' && lastChar <= '9';

        if (isFirstNum && isLastNum) {
            numNum.push(route);
        } else if (!isFirstNum && !isLastNum) {
            letterLetter.push(route);
        } else if (isFirstNum && !isLastNum) {
            numLetter.push(route);
        } else {
            irregular.push(route);
        }
    });

    // Sorting logic
    numNum.sort((a, b) => {
        const aStr = a.route_short_name || a.route_long_name || '';
        const bStr = b.route_short_name || b.route_long_name || '';
        return Number(aStr) - Number(bStr);
    });

    letterLetter.sort((a, b) => {
        const aStr = a.route_short_name || a.route_long_name || '';
        const bStr = b.route_short_name || b.route_long_name || '';
        return aStr.localeCompare(bStr);
    });

    numLetter.sort((a, b) => {
        const aStr: string = a.route_short_name || a.route_long_name || '';
        const bStr: string = b.route_short_name || b.route_long_name || '';

        // Primary sort: numeric part
        const numA = parseInt(aStr, 10);
        const numB = parseInt(bStr, 10);
        if (numA !== numB) return numA - numB;

        // Secondary sort: alphabetical comparison
        return aStr.localeCompare(bStr);
    });

    // Return sorted array
    return [...numNum, ...numLetter, ...letterLetter, ...irregular];
}


export default async function Page({ params }: { params: Promise<{ agency_onestop: string }> }) {
    const { agency_onestop } = await params;
    const { env } = getRequestContext();
    const kv = env.routleunlimited as KVNamespace;
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
                <p className="mb-4">You must be signed in to access practice mode.</p>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <KindeLogin >
                        Login
                    </KindeLogin>
                </Button>
            </div>
        );
    }

    const user = await getUser();
    const lastRolled = await kv.get(`rolledby:${agency_onestop}`);
    if (lastRolled === user.id) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Nuh Uh</h1>
                <p className="mb-4">You have rolled this agency in the last 24 hours. Come back later.</p>
                <Button asChild variant="outline" size="sm" className="">
                    <Link
                        href="/play"
                        className="flex items-center space-x-2"
                    >
                        Return to Play
                    </Link>
                </Button>
            </div>
        );
    }

    const json = agencyMap[agency_onestop] as RoutesResponse;
    if (!json) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Not Found</h1>
                <p className="mb-4">The agency you are looking for does not exist.</p>
                <Button asChild variant="outline" size="sm" className="">
                    <Link
                        href="/"

                        className="flex items-center space-x-2"
                    >
                        Go Home
                    </Link>
                </Button>
            </div>
        );
    }

    let practiceRoute = null;
    while (!practiceRoute || practiceRoute.onestop_id === await kv.get(`dailyroute:${agency_onestop}`)) {
        practiceRoute = json.routes[Math.floor(Math.random() * json.routes.length)];
    }

    const otherRoutes = sortRoutes(json.routes as Route[]);
    return (
        <div className={'text-center w-full h-full'}>
            <Game currentRoute={practiceRoute} routes={otherRoutes} />
        </div>
    );
}
