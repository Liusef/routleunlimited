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
]
