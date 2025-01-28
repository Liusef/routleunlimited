'use client';
import {
    MapContainer,
    TileLayer,
} from 'react-leaflet';
import React from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const DEFAULT_ZOOM = 12;

const Map = ({ lat, lng, children, showTiles = false, bounds }: { lat: number; lng: number; children?: React.ReactNode, showTiles: boolean, bounds?: never}) => {


    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return (<MapContainer bounds={bounds} center={[lat, lng]}
            zoom={DEFAULT_ZOOM}
            className="w-screen h-full z-10"
            dragging={!showTiles}
            scrollWheelZoom={!showTiles}
            doubleClickZoom={false}
            zoomControl={!showTiles}
            attributionControl={false}
            backgroundColor={'#000'}

            boundsOptions={{padding: [100, 100]}}
        >



            {children}

            {showTiles &&  <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpbGRxdWFjayIsImEiOiJja21mNmxsYmoyend6MzNvY3gzcmd0cTVxIn0.CAIKNdp3JZdHCMuD2MGorg`}
            />}
        </MapContainer>
    );
};

export default Map;
