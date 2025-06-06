import {
    type LayerProps,
    createElementObject,
    createTileLayerComponent,
    updateGridLayer,
    withPane,
} from '@react-leaflet/core'
// @ts-ignore
import L from 'leaflet'
import '@maplibre/maplibre-gl-leaflet'

export interface MapLibreTileLayerProps extends L.LeafletMaplibreGLOptions, LayerProps {
    url: string,
    
}

export const MapLibreTileLayer = createTileLayerComponent<
    L.MaplibreGL,
    MapLibreTileLayerProps
>(
    function createTileLayer({ url, ...options }, context) {
        // @ts-ignore
        const layer = L.maplibreGL({style: url, attribution: "", noWrap: true}, withPane(options, context))
        return createElementObject(layer, context)
    },
    function updateTileLayer(layer, props, prevProps) {
        // @ts-ignore
        updateGridLayer(layer, props, prevProps)

        const { url } = props
        if (url != null && url !== prevProps.url) {
            layer.getMaplibreMap().setStyle(url)
        }

    },
)