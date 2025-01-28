

import { getRequestContext } from '@cloudflare/next-on-pages';
export const runtime = 'edge';

import { KVNamespace } from '@cloudflare/workers-types'
import Game from "@/app/play/[agency_onestop]/game";
import {Route, RoutesResponse} from "@/lib/types/transitland";


import * as samtrans from '@/lib/transit/o-9q8-samtrans.json'
import * as sfmta from '@/lib/transit/o-9q8y-sfmta.json'
import * as actransit from '@/lib/transit/o-9q9-actransit.json'
import * as wheels from '@/lib/transit/o-9q9q-wheelsbus.json'
import * as mts from '@/lib/transit/o-9mu-mts.json'
import * as octa from '@/lib/transit/o-9mu-orangecountytransportationauthority.json'
import * as cota from '@/lib/transit/o-dphg-centralohiotransitauthority.json'
import * as kingc from '@/lib/transit/o-c23-metrotransit.json'
import * as trimet from '@/lib/transit/o-c20-trimet.json'

const agencyMap: Record<string, RoutesResponse> = {
    'o-9q8-samtrans': samtrans,
    'o-9q8y-sfmta': sfmta,
    'o-9q9-actransit': actransit,
    'o-9q9q-wheelsbus': wheels,
    'o-9mu-mts': mts,
    'o-9mu-orangecountytransportationauthority': octa,
    'o-dphg-centralohiotransitauthority': cota,
    'o-c23-metrotransit': kingc,
    'o-c20-trimet': trimet
}


export async function generateMetadata({params}: { params: Promise<{ agency_onestop: string }>}) {

    const { agency_onestop } = await params
    console.log(agency_onestop)

    // get agency name from a route
    const json = agencyMap[agency_onestop] as RoutesResponse

    let agency_name = json.routes[0].agency.agency_name

    // clean up
    if (agency_name === 'San Francisco Municipal Transportation Agency') {
        agency_name = 'SFMTA'
    }
    if (agency_name === 'AC TRANSIT') {
        agency_name = 'AC Transit'
    }
    if (agency_name === 'Livermore Amador Valley Transit Authority') {
        agency_name = 'Wheels'
    }
    if (agency_name === 'Metro Transit') {
        agency_name = 'King County Metro'
    }


    console.log(json.routes[0].agency)

    return {
        title: `${agency_name} Routle`,
        description: `Test your knowledge of ${agency_name} transit routes`,
    }
}

export default async function Page({params}: { params: Promise<{ agency_onestop: string }>}) {
    const { agency_onestop } = await params
    console.log(agency_onestop)


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


    // get route id from kv, and then get the route from the json
    // if it doesn't exist, get a random route from the json and save it in kv


    let route_id = null //await kv.get(`dailyroute:${agency_onestop}`)
    if (!route_id) {
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // get route
        const route = json.routes[Math.floor(Math.random() * json.routes.length)]
        route_id = route?.onestop_id ? route.onestop_id : `${route.id}`
        await kv.put(`dailyroute:${agency_onestop}`, `${route_id}`, {
            expirationTtl: 86400
        })



        /*
        // day count

        let daycount = await kv.get(`daycount:${agency_onestop}`)

        if (!daycount) {
            daycount = 1
        } else {
            daycount += 1
        }

        await kv.put(`daycount:${agency_onestop}`, daycount)


        */
    }

    console.log()

    // get route from json
    const currentRoute = json.routes.find(route => route.onestop_id === route_id) as Route
    const otherRoutes = json.routes as Route[]

    return (
        <div className={'text-center w-full h-full'}>
            <Game currentRoute={currentRoute} routes={otherRoutes} />
        </div>
    )
}
