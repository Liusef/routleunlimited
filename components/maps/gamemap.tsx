'use client';
import {
    MapContainer,
    TileLayer,
} from 'react-leaflet';
import React from 'react';

// @ts-ignore
import fullmap from '@/lib/vectortiles/fullmap.js'
import watermap from '@/lib/vectortiles/watermap.js' 

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapLibreTileLayer } from '@/lib/vectortiles/maplibretilelayer';

const DEFAULT_ZOOM = 12;

const Map = ({ lat, lng, children, showTiles = false, bounds }: { lat: number; lng: number; children?: React.ReactNode, showTiles: boolean, bounds?: never}) => {


    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (<MapContainer bounds={bounds} center={[lat, lng]}
            zoom={DEFAULT_ZOOM}
            className="w-screen h-full z-10"
            dragging={!showTiles}
            scrollWheelZoom={!showTiles}
            doubleClickZoom={false}
            zoomControl={!showTiles}
            attributionControl={false}
            // @ts-ignore
            backgroundColor={'#000'}

            boundsOptions={{padding: [100, 100]}}
        >

            {children}

            {
                // @ts-ignore
                <MapLibreTileLayer url={showTiles ? fullmap : watermap} />
            }


        </MapContainer>
    );
};

export default Map;