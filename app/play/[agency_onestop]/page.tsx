

import { getRequestContext } from '@cloudflare/next-on-pages';
export const runtime = 'edge';

import { KVNamespace } from '@cloudflare/workers-types'
import Game from "@/app/play/[agency_onestop]/game";
import {Route, RoutesResponse} from "@/lib/types/transitland";
import {beutifyAgencyName, sendDiscordWebhook} from "@/lib/utils";
import {agencyMap} from "@/lib/transit";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import {Button} from "@/components/ui/button";
import Link from 'next/link';


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


export default async function Page({params}: { params: Promise<{ agency_onestop: string }>}) {
    const { agency_onestop } = await params


    const { env } = getRequestContext();

    // get kv
    const kv = env.routleunlimited as KVNamespace;

    // data will be static, and so that we don't have to fetch it every time
    // lets make a map so that the parmams are matched to the correct data

    // get the json
    const json = agencyMap[agency_onestop] as RoutesResponse

    // check if the json is empty and return a 404
    if (!json) {
        return {
            status: 404,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ error: 'Not Found' }),
        }
    }


    // if json.routes is empty, return a "whoops, [agency] sucks" page
    if (json.routes.length === 0) {
        return <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-3xl font-bold mb-4">The agency sucks</h1>
            <Button asChild variant="outline" size="sm" className="">
                <Link
                    href="/play"
                    className="flex items-center space-x-2"
                >
                    Return to Play
                </Link>
            </Button>
        </div>
    }

    // if authenticated, get the user, else return null
    const {getUser, isAuthenticated} = getKindeServerSession();
    const user = (await isAuthenticated()) ? await getUser() : null;


    // get route id from kv, and then get the route from the json
    // if it doesn't exist, get a random route from the json and save it in kv

    let route_id = null
    try {
        route_id = await kv.get(`dailyroute:${agency_onestop}`, {type: 'text'})
        //console.log(route_id)
    } catch {
        // no route, get a random one
    }
    if (!route_id) {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // get route
        const route = json.routes[Math.floor(Math.random() * json.routes.length)]

        // if route.geometry is empty, reroll
        if (!route.geometry) {
            return {
                status: 302,
                headers: {
                    location: `/play/${agency_onestop}`,
                },
            }
        }

        route_id = route?.onestop_id ? route.onestop_id : `${route.id}`
        await kv.put(`dailyroute:${agency_onestop}`, `${route_id}`, {
            expirationTtl: 86400
        })

        // if the user is authenticated, log them in the kv as the person who rolled the route
        if (user) {
            await kv.put(`rolledby:${agency_onestop}`, `${user.id}`, {
                expirationTtl: 86400
            })
        }

        const expire = new Date() // now
        // add 24 hours in seconds
        expire.setSeconds(expire.getSeconds() + 86400)
        // get unix timestamp, for discord
        const expireTimestamp = Math.floor(expire.getTime() / 1000)


        // Example usage
        const webhookUrl = "https://discord.com/api/webhooks/1335878325570113589/cWprJA_f6yCu5J8LaZyTQ4D8yOGEl0lNAV5KBjmvo71kISpIwrVS5bRhjQdA5ASnSaRV"; // Replace with your actual webhook URL
        await sendDiscordWebhook(webhookUrl, `\`${agency_onestop}\` has been rerolled${user ? `by \`${user.given_name} ${String(user.family_name).at(0)}.\`` : ''} and will be rerolled <t:${expireTimestamp}:R>`, "RoutleUnlimited", "https://routleunlimited.com/routeslogo.png");









        // day count

        let daycount: string | null = await kv.get(`daycount:${agency_onestop}`)

        if (!daycount) {
            daycount = '1'
        } else {
            daycount = parseInt(daycount) + 1 + ''
        }

        await kv.put(`daycount:${agency_onestop}`, `${daycount}`)

    }

    console.log()

    // get route from json
    const currentRoute = json.routes.find(route => route.onestop_id === route_id) as Route
    const otherRoutes = sortRoutes(json.routes as Route[]) as Route[]



    return (
        <div className={'text-center w-full h-full'}>
            <Game currentRoute={currentRoute} routes={otherRoutes} />
        </div>
    )
}
