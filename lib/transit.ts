import * as samtrans from '@/lib/transit/o-9q8-samtrans.json'
import * as sfmta from '@/lib/transit/o-9q8y-sfmta.json'
import * as actransit from '@/lib/transit/o-9q9-actransit.json'
import * as wheels from '@/lib/transit/o-9q9q-wheelsbus.json'
import * as mts from '@/lib/transit/o-9mu-mts.json'
import * as octa from '@/lib/transit/o-9mu-orangecountytransportationauthority.json'
import * as cota from '@/lib/transit/o-dphg-centralohiotransitauthority.json'
import * as kingc from '@/lib/transit/o-c23-metrotransit.json'
import * as trimet from '@/lib/transit/o-c20-trimet.json'
import * as vta from "@/lib/transit/o-9q9-vta.json";
import * as la from "@/lib/transit/o-9q5-metro~losangeles.json";
import * as cc from "@/lib/transit/o-9q9p-countyconnection.json";
// * as dc from "@/lib/transit/o-dqc-met.json";
import * as ct from "@/lib/transit/o-9q9-caltrain.json";
import * as ttc from "@/lib/transit/o-dpz8-ttc.json";
import * as foothill from "@/lib/transit/o-9qh1-foothilltransit.json";
import * as bart from "@/lib/transit/o-9q9-bart.json";
import * as bayferry from "@/lib/transit/o-9q9p-sanfranciscobayferry.json";
import * as sacrt from "@/lib/transit/o-9qce-sacramentoregionaltransit.json";
import * as omni from "@/lib/transit/o-9qh-omnitrans.json";
import * as uta from "@/lib/transit/o-9x0-utahtransitauthority.json";


import {RoutesResponse} from "@/lib/types/transitland";

/**
 * Agency data
 */
export const agencyMap: Record<string, RoutesResponse> = {
    'o-9q8-samtrans': samtrans,
    'o-9q8y-sfmta': sfmta,
    'o-9q9-actransit': actransit,
    'o-9q9q-wheelsbus': wheels,
    'o-9q9-vta': vta,
    'o-9mu-mts': mts,
    'o-9mu-orangecountytransportationauthority': octa,
    'o-dphg-centralohiotransitauthority': cota,
    'o-c23-metrotransit': kingc,
    'o-c20-trimet': trimet,
    'o-9q5-metro~losangeles': la,
    'o-9q9p-countyconnection': cc,
    'o-9q9-caltrain': ct,
    "o-dpz8-ttc": ttc,
    "o-9qh1-foothilltransit": foothill,
    "o-9q9-bart": bart,
    "o-9q9p-sanfranciscobayferry": bayferry,
    "o-9qce-sacramentoregionaltransit": sacrt,
    "o-9qh-omnitrans": omni,
    "o-9x0-utahtransitauthority": uta

    //'o-dqc-met': dc
}

export interface AgencyCard {
    title: string
    subtitle: string
    image: string
    onestop: string
    available: boolean
}

export const agencies: AgencyCard[] = [
    { title: "SFMTA", subtitle: "San Francisco Bay Area", image: "/sfmta-logo.svg", onestop: "o-9q8y-sfmta", available: true },
    { title: "SamTrans", subtitle: "San Francisco Bay Area", image: "/samtrans-logo.svg", onestop: "o-9q8-samtrans",available: true },
    { title: "AC Transit", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9-actransit",available: true },
    { title: "Wheels", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9q-wheelsbus",available: true },
    { title: "VTA", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9-vta",available: true },
    { title: "MTS", subtitle: "San Diego", image: "/placeholder.svg", onestop: "o-9mu-mts",available: true },
    { title: "King County Metro", subtitle: "Seattle, WA", image: "/placeholder.svg", onestop: "o-c23-metrotransit",available: true },
    { title: "TriMet", subtitle: "Portland, OR", image: "/placeholder.svg", onestop: "o-c20-trimet",available: true },
    { title: "LA Metro", subtitle: "Los Angeles, CA", image: "/placeholder.svg", onestop: "o-9q5-metro~losangeles", available: true },
    { title: "Central Ohio Transit Authority", subtitle: "Columbus, OH", image: "/placeholder.svg", onestop: "o-dphg-centralohiotransitauthority", available: true },
    { title: "Orange County Transportation Authority", subtitle: "Orange County, CA", image: "/placeholder.svg", onestop: "o-9mu-orangecountytransportationauthority", available: true },
    { title: "County Connection", subtitle: "Contra Costa County, CA", image: "/placeholder.svg", onestop: "o-9q9p-countyconnection", available: true },
    { title: "Caltrain", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9-caltrain", available: true },
    { title: "Toronto Transit Commission", subtitle: "Toronto, ON", image: "/placeholder.svg", onestop: "o-dpz8-ttc", available: true },

    { title: "Foothill Transit", subtitle: "San Gabriel Valley, CA", image: "/placeholder.svg", onestop: "o-9qh1-foothilltransit", available: false },
    { title: "BART", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9-bart", available: false },
    { title: "San Francisco Bay Ferry", subtitle: "San Francisco Bay Area", image: "/placeholder.svg", onestop: "o-9q9p-sanfranciscobayferry", available: false },
    { title: "Sacramento Regional Transit", subtitle: "Sacramento, CA", image: "/placeholder.svg", onestop: "o-9qce-sacramentoregionaltransit", available: false },
    { title: "Omnitrans", subtitle: "San Bernardino County, CA", image: "/placeholder.svg", onestop: "o-9qh-omnitrans", available: false },
    { title: "Utah Transit Authority", subtitle: "Salt Lake City, UT", image: "/placeholder.svg", onestop: "o-9x0-utahtransitauthority", available: false },

    //{ title: "WMATA", subtitle: "Washington DC", image: "/placeholder.svg", onestop: "o-dqc-met", available: true },
]
