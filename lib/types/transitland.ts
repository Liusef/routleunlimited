

export interface Meta {
    after: number;
    next: string;
}

export interface Agency {
    agency_id?: string | null | undefined;
    agency_name:  string | null | undefined;
    id?: number;
    onestop_id:  string | null | undefined;
}

export interface Feed {
    id: number;
    onestop_id: string;
}

export interface FeedVersion {
    feed: Feed;
    fetched_at: string;
    id: number;
    sha1: string;
}

export interface Geometry {
    type: string; // Allow general strings instead of "MultiLineString"
    coordinates: number[][][];
}

export interface Route {
    agency: Agency;
    continuous_drop_off: null | string;
    continuous_pickup: null | string;
    feed_version: FeedVersion;
    id: number;
    onestop_id: string | null;
    route_color: null | string;
    route_desc: null | string;
    route_id: string | null;
    route_long_name: string | null;
    route_short_name: string | null;
    route_sort_order: null | number;
    route_text_color: null | string;
    route_type: number | null;
    route_url: null | string;
    geometry?: Geometry | null; // Optional geometry property
}

export interface RoutesResponse {
    meta?: Meta;
    routes: Route[];
}
