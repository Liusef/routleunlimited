const fullmap = {
  "version": 8,
  "name": "Routle Finish",
  "metadata": {
    "mapbox:autocomposite": false,
    "openmaptiles:version": "3.x",
    "maputnik:renderer": "mlgljs"
  },
  "center": [10.184401828277087, -1.1368683772161605e-13],
  "zoom": 0.89026415,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "scheme": "xyz",
      "url": "https://tiles.stadiamaps.com/data/openmaptiles.json"
    }
  },
  "sprite": "https://tiles.stadiamaps.com/styles/alidade-smooth-dark/sprite",
  "glyphs": "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?KEY=inh31t4stQFyrhrNR0hw",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {"background-color": "hsl(220, 10%, 15%)"}
    },
    {
      "id": "boundary_state",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": ["==", "admin_level", 4],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(353, 34%, 80%, 30%)",
        "line-width": {"base": 1.3, "stops": [[3, 1], [22, 15]]},
        "line-blur": 0.4,
        "line-dasharray": [2, 2],
        "line-opacity": 1
      }
    },
    {
      "id": "boundary_country",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": ["==", "admin_level", 2],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "hsla(353, 34%, 80%, 30%)",
        "line-width": {"base": 1.1, "stops": [[3, 1], [22, 20]]},
        "line-blur": {"base": 1, "stops": [[0, 0.4], [22, 4]]},
        "line-opacity": 1
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": ["==", "$type", "Polygon"],
      "layout": {"visibility": "visible"},
      "paint": {"fill-antialias": true, "fill-color": "hsl(240, 4%, 10%)"}
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": ["==", "$type", "LineString"],
      "layout": {"visibility": "visible"},
      "paint": {"line-color": "#222"}
    },
    {
      "id": "building",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 12,
      "filter": ["==", "$type", "Polygon"],
      "layout": {"visibility": "none"},
      "paint": {
        "fill-color": "hsl(95, 5%, 22%)",
        "fill-outline-color": "hsla(0, 0%, 40%, 50%)",
        "fill-antialias": true
      }
    },
    {
      "id": "tunnel_motorway_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-width": {"base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 35]]},
        "line-opacity": 1,
        "line-color": "hsla(0, 0%, 0%, 50%)"
      }
    },
    {
      "id": "tunnel_motorway_inner",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(60, 1%, 21%, 10%)",
        "line-width": {"base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]]}
      }
    },
    {
      "id": "highway_path",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "path", "footway", "construction"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsl(0, 0%, 0%)",
        "line-width": {"base": 1.2, "stops": [[13, 1], [20, 10]]},
        "line-opacity": 0.9
      }
    },
    {
      "id": "highway_minor",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 8,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "minor", "service", "track"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": {
          "base": 1,
          "stops": [[13, "hsl(0, 0%, 10%)"], [16, "hsl(0, 0%, 5%)"]]
        },
        "line-width": {"base": 1.55, "stops": [[13, 1], [18, 8]]},
        "line-opacity": 0.9
      }
    },
    {
      "id": "highway_major_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 30%, 80%)",
        "line-dasharray": [12, 0],
        "line-width": {"base": 1.3, "stops": [[10, 3], [20, 20]]}
      }
    },
    {
      "id": "highway_major_inner",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 12,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#000000",
        "line-width": {"base": 1.3, "stops": [[10, 2], [20, 18]]}
      }
    },
    {
      "id": "highway_major_subtle",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "maxzoom": 12,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["in", "class", "primary", "secondary", "tertiary", "trunk"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {"line-color": "hsla(0, 0%, 3%, 70%)", "line-width": 1}
    },
    {
      "id": "highway_motorway_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        [
          "all",
          ["!in", "brunnel", "bridge", "tunnel"],
          ["==", "class", "motorway"]
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 20%, 80%)",
        "line-width": {"base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 30]]},
        "line-dasharray": [2, 0],
        "line-opacity": 1
      }
    },
    {
      "id": "highway_motorway_inner",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        [
          "all",
          ["!in", "brunnel", "bridge", "tunnel"],
          ["==", "class", "motorway"]
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#000000",
        "line-width": {"base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 25]]}
      }
    },
    {
      "id": "highway_motorway_subtle",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "maxzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "motorway"]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 0%, 0.53)",
        "line-width": {"base": 1.4, "stops": [[4, 0.75], [5, 1.5]]}
      }
    },
    {
      "id": "railway_service",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "class", "rail"], ["has", "service"]]
      ],
      "layout": {"visibility": "visible", "line-join": "round"},
      "paint": {"line-color": "#545353", "line-width": 3}
    },
    {
      "id": "railway_service_dashline",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["==", "class", "rail"],
        ["has", "service"]
      ],
      "layout": {"visibility": "visible", "line-join": "round"},
      "paint": {
        "line-color": "#7f7d7e",
        "line-width": 2,
        "line-dasharray": [3, 3]
      }
    },
    {
      "id": "railway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["!has", "service"], ["==", "class", "rail"]]
      ],
      "layout": {"visibility": "visible", "line-join": "round"},
      "paint": {
        "line-color": "#333",
        "line-width": {"base": 1.3, "stops": [[16, 3], [20, 7]]}
      }
    },
    {
      "id": "railway_dashline",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["!has", "service"], ["==", "class", "rail"]]
      ],
      "layout": {"visibility": "none", "line-join": "round"},
      "paint": {
        "line-color": "#7f7d7e",
        "line-width": {"base": 1.3, "stops": [[16, 2], [20, 6]]},
        "line-dasharray": [3, 3]
      }
    },
    {
      "id": "aeroway_line",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "filter": ["==", "$type", "LineString"],
      "layout": {"visibility": "visible"},
      "paint": {"line-color": "#000000"}
    },
    {
      "id": "highway_motorway_bridge_casing",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "hsla(0, 0%, 20%, 80%)",
        "line-width": {"base": 1.4, "stops": [[5.8, 0], [6, 5], [20, 35]]},
        "line-dasharray": [2, 0],
        "line-opacity": 1
      }
    },
    {
      "id": "highway_motorway_bridge_inner",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        ["==", "$type", "LineString"],
        ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-width": {"base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]]},
        "line-color": "#000000"
      }
    },
    {
      "id": "highway_name_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "!in",
          "class",
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary"
        ],
        ["==", "$type", "LineString"]
      ],
      "layout": {
        "symbol-avoid-edges": true,
        "text-size": 12,
        "text-max-angle": 30,
        "text-transform": "uppercase",
        "symbol-spacing": 350,
        "text-font": ["Stadia Regular"],
        "symbol-placement": "line",
        "visibility": "visible",
        "text-rotation-alignment": "map",
        "text-pitch-alignment": "viewport",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", " ", ["get", "name:nonlatin"]],
            ""
          ]
        ]
      },
      "paint": {
        "text-color": "#aaa",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-translate": [0, 0],
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "water_name_line",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["==", "$type", "LineString"],
      "layout": {
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55,
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-rotation-alignment": "map",
        "text-pitch-alignment": "viewport",
        "symbol-spacing": 500,
        "text-font": ["Cairo Bold"],
        "text-size": 14,
        "text-letter-spacing": 0.25,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#999",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "water_name_nonocean",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["all", ["==", "$type", "Point"], ["!in", "class", "ocean"]],
      "layout": {
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55,
        "symbol-placement": "point",
        "symbol-avoid-edges": true,
        "text-font": ["Cairo Bold"],
        "text-letter-spacing": 0.1,
        "text-size": {"stops": [[0, 14], [6, 16]]},
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#999",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "water_name_ocean",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "ocean"]],
      "layout": {
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55,
        "symbol-placement": "point",
        "symbol-avoid-edges": true,
        "text-font": ["Cairo Bold"],
        "text-size": 18,
        "text-letter-spacing": 0.2
      },
      "paint": {
        "text-color": "#999",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "poi_gen1",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "minzoom": 15,
      "filter": [
        "all",
        ["in", "class", "park"],
        ["<=", "rank", 3],
        ["==", "$type", "Point"]
      ],
      "layout": {
        "text-size": 14,
        "symbol-avoid-edges": true,
        "text-font": ["Stadia Regular"],
        "text-justify": "center",
        "visibility": "visible",
        "text-anchor": "center",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#aaa",
        "text-halo-color": "#333",
        "text-translate": [0, 0],
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "poi_gen0_parks",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "filter": [
        "all",
        ["==", "subclass", "park"],
        ["==", "rank", 1],
        ["==", "$type", "Point"]
      ],
      "layout": {
        "text-size": 14,
        "symbol-avoid-edges": true,
        "text-font": ["Stadia Regular"],
        "text-justify": "center",
        "visibility": "visible",
        "text-anchor": "center",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#aaa",
        "text-halo-color": "#333",
        "text-translate": [0, 0],
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "poi_gen0_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "poi",
      "filter": [
        "all",
        ["in", "subclass", "university", "hospital"],
        ["<=", "rank", 3],
        ["==", "$type", "Point"]
      ],
      "layout": {
        "text-size": 14,
        "symbol-avoid-edges": true,
        "text-font": ["Stadia Regular"],
        "text-justify": "center",
        "visibility": "visible",
        "text-anchor": "center",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#aaa",
        "text-halo-color": "#333",
        "text-translate": [0, 0],
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "highway_name_major",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        ["in", "class", "trunk", "primary", "secondary", "tertiary"],
        ["==", "$type", "LineString"]
      ],
      "layout": {
        "text-size": 13,
        "text-max-angle": 30,
        "text-transform": "uppercase",
        "symbol-avoid-edges": true,
        "symbol-spacing": 350,
        "text-font": ["Stadia Regular"],
        "symbol-placement": "line",
        "visibility": "visible",
        "text-rotation-alignment": "map",
        "text-pitch-alignment": "viewport",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", " ", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#ccc",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-translate": [0, 0],
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "highway_shield_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 8,
      "filter": [
        "all",
        ["<=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["!in", "network", "us-highway", "us-state", "us-interstate"]
      ],
      "layout": {
        "icon-image": "road_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "icon-size": 1,
        "symbol-avoid-edges": true,
        "symbol-placement": {"base": 1, "stops": [[10, "point"], [11, "line"]]},
        "text-field": "{ref}",
        "text-font": ["Stadia Regular"],
        "text-rotation-alignment": "viewport",
        "text-size": 10
      }
    },
    {
      "id": "highway_shield_us_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 9,
      "filter": [
        "all",
        ["<=", "ref_length", 6],
        ["==", "$type", "LineString"],
        ["in", "network", "us-highway", "us-state"]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": "{network}_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "text-font": ["Stadia Regular"],
        "symbol-placement": {"base": 1, "stops": [[10, "point"], [11, "line"]]},
        "symbol-avoid-edges": true,
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}"
      }
    },
    {
      "id": "highway_shield_us_interstate",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "minzoom": 7,
      "filter": [
        "all",
        ["<=", "ref_length", 3],
        ["==", "$type", "LineString"],
        ["==", "network", "us-interstate"]
      ],
      "layout": {
        "text-size": 10,
        "icon-image": "{network}_{ref_length}",
        "icon-rotation-alignment": "viewport",
        "text-font": ["Stadia Regular"],
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-rotation-alignment": "viewport",
        "icon-size": 1,
        "text-field": "{ref}"
      }
    },
    {
      "id": "place_suburb",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "suburb"]],
      "layout": {
        "text-size": {"stops": [[3, 10], [14, 13]], "base": 1},
        "symbol-avoid-edges": true,
        "text-font": ["Stadia Regular"],
        "text-justify": "center",
        "visibility": "visible",
        "text-offset": [0.5, 0],
        "text-anchor": "center",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-opacity": 0.7,
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_village",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "village"]],
      "layout": {
        "text-size": {"stops": [[3, 10], [14, 13]], "base": 1},
        "symbol-avoid-edges": true,
        "text-font": ["Stadia Regular"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 0.4,
        "text-anchor": "left",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 2,
        "text-halo-blur": 1,
        "icon-opacity": 0.6
      }
    },
    {
      "id": "airport_label_gen0",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "aerodrome_label",
      "minzoom": 10,
      "filter": ["all", ["has", "iata"]],
      "layout": {
        "text-padding": 2,
        "text-font": ["Cairo Semi Bold"],
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-size": 13,
        "text-max-width": 9,
        "text-line-height": 1.55,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "#777",
        "text-halo-color": "#222",
        "text-translate": [0, 0],
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_town",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "town"]],
      "layout": {
        "text-size": {"stops": [[3, 10], [14, 13]], "base": 1},
        "icon-image": {"base": 1, "stops": [[0, "circle-alt-11"], [8, ""]]},
        "symbol-avoid-edges": true,
        "text-font": ["Cairo Semi Bold"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 0.4,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-width": 2,
        "text-halo-blur": 1,
        "icon-opacity": 0.6,
        "text-halo-color": "#222"
      }
    },
    {
      "id": "place_city",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["all", ["!=", "capital", 2], ["==", "class", "city"], [">", "rank", 3]]
      ],
      "layout": {
        "text-size": {"stops": [[3, 10], [14, 18]], "base": 1},
        "icon-image": {"base": 1, "stops": [[0, "circle-alt-11"], [8, ""]]},
        "text-transform": "uppercase",
        "text-font": ["Cairo Bold"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 0.4,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-color": "#222",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_city_large",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        [
          "all",
          ["!=", "capital", 2],
          ["<=", "rank", 3],
          ["==", "class", "city"]
        ]
      ],
      "layout": {
        "text-size": {"stops": [[4, 11], [12, 18], [14, 22]], "base": 1},
        "icon-image": {"base": 1, "stops": [[0, "circle-alt-11"], [8, ""]]},
        "text-transform": "uppercase",
        "text-font": ["Cairo Extra Bold"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 0.4,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_capital_gen1",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 4,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["all", ["==", "capital", 2], ["==", "class", "city"], [">", "rank", 3]]
      ],
      "layout": {
        "text-size": {"stops": [[3, 13], [14, 24]], "base": 1},
        "icon-image": {"base": 1, "stops": [[0, "star-alt-11"], [8, ""]]},
        "text-transform": "uppercase",
        "symbol-avoid-edges": true,
        "text-font": ["Cairo Extra Bold"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 1,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_capital_gen0",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "filter": [
        "all",
        ["==", "$type", "Point"],
        [
          "all",
          ["==", "capital", 2],
          ["==", "class", "city"],
          ["<=", "rank", 3]
        ]
      ],
      "layout": {
        "text-size": {"stops": [[3, 13], [14, 24]], "base": 1},
        "icon-image": {"base": 1, "stops": [[0, "star-alt-11"], [8, ""]]},
        "text-transform": "uppercase",
        "text-font": ["Cairo Extra Bold"],
        "text-justify": "left",
        "visibility": "visible",
        "text-offset": [0.5, 0.2],
        "icon-size": 1,
        "text-anchor": {"base": 1, "stops": [[0, "left"], [8, "center"]]},
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55
      },
      "paint": {
        "text-color": "#9aa2ac",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.7
      }
    },
    {
      "id": "place_state",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": ["all", ["==", "$type", "Point"], ["==", "class", "state"]],
      "layout": {
        "visibility": "visible",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "symbol-avoid-edges": true,
        "text-line-height": 1.55,
        "text-font": ["Cairo Bold"],
        "text-transform": "uppercase",
        "text-size": 10
      },
      "paint": {
        "text-color": "#97a1ac",
        "text-halo-color": "hsl(0, 0%, 20%)",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_country_other",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["all", ["==", "class", "country"], [">=", "rank", 2]]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.05,
        "text-font": ["Cairo Bold"],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.05,
        "symbol-avoid-edges": true,
        "text-size": {"base": 1, "stops": [[0, 12], [6, 14], [9, 24]]},
        "text-padding": 10
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "hsl(0, 0%, 15%)",
        "text-color": {"base": 1, "stops": [[3, "#d4d4dc"], [4, "#c4c4c4"]]}
      }
    },
    {
      "id": "place_country_major",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": [
        "all",
        ["==", "$type", "Point"],
        ["all", ["<=", "rank", 1], ["==", "class", "country"]]
      ],
      "layout": {
        "visibility": "visible",
        "text-field": [
          "concat",
          ["get", "name:latin"],
          [
            "case",
            [
              "all",
              ["has", "name:nonlatin"],
              ["is-supported-script", ["get", "name:nonlatin"]]
            ],
            ["concat", "\n", ["get", "name:nonlatin"]],
            ""
          ]
        ],
        "text-line-height": 1.55,
        "text-font": ["Cairo Extra Bold"],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.05,
        "symbol-avoid-edges": true,
        "text-size": {"base": 1.4, "stops": [[0, 12], [6, 16], [9, 24]]},
        "text-anchor": "center"
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "hsl(0, 0%, 15%)",
        "text-color": {"base": 1, "stops": [[3, "#d4d4dc"], [4, "#c4c4c4"]]}
      }
    },
    {
      "id": "place-continent",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 1,
      "filter": ["==", "class", "continent"],
      "layout": {
        "text-font": ["Cairo Extra Bold"],
        "text-field": "{name:latin}",
        "text-size": 16,
        "text-max-width": 6.25,
        "text-transform": "uppercase",
        "visibility": "visible",
        "text-letter-spacing": 0.1
      },
      "paint": {
        "text-halo-width": 1.4,
        "text-halo-color": "hsl(0, 0%, 15%)",
        "text-color": "rgb(157,169,177)"
      }
    }
  ],
  "id": "2edqyqg"
}

export default fullmap;