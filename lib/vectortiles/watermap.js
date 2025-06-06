const watermap = {
    "bearing": 0,
    "center": [
        10.184401828277087,
        -1.1368683772161605e-13
    ],
    "glyphs": "https://tiles.stadiamaps.com/fonts/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": "hsl(220, 10%, 15%)"
            }
        },
        {
            "id": "water",
            "type": "fill",
            "source": "openmaptiles",
            "source-layer": "water",
            "filter": [
                "==",
                "$type",
                "Polygon"
            ],
            "layout": {
                "visibility": "visible"
            },
            "paint": {
                "fill-color": "hsl(240, 4%, 10%)",
                "fill-antialias": true
            }
        },
    ],
    "metadata": {
        "mapbox:autocomposite": false,
        "openmaptiles:version": "3.x"
    },
    "name": "Alidade Smooth",
    "pitch": 0,
    "sources": {
        "openmaptiles": {
            "type": "vector",
            "scheme": "xyz",
            "url": "https://tiles.stadiamaps.com/data/openmaptiles.json"
        }
    },
    "sprite": "https://tiles.stadiamaps.com/styles/alidade-smooth-dark/sprite",
    "version": 8,
    "zoom": 0.89026415
}

export default watermap;