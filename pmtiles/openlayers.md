---
title: PMTiles for OpenLayers
outline: deep
---

# PMTiles for OpenLayers

See [the openlayers/ directory](https://github.com/protomaps/PMTiles/tree/main/openlayers) in the PMTiles repository for using PMTiles with OpenLayers.

## Quick Example

Example of vector tiles (New Zealand buildings): [Live demo](https://protomaps.github.io/PMTiles/examples/openlayers/vector.html)

Example of raster tiles (RGB Terrain): [Live demo](https://protomaps.github.io/PMTiles/examples/openlayers/raster.html)

## Using with a Bundler

It's recommended to use OpenLayers with a build system to reduce the final size of the JavaScript code. To get started with PMTiles, follow the OpenLayers [Quick Start](https://openlayers.org/doc/quickstart.html).

Add `ol-pmtiles` to your project:

```
npm install ol-pmtiles
```

Then create a source depending on whether your data source is vector or raster tiles:

```js
import "./style.css";
import { Map, View } from "ol";
import WebGLTile from "ol/layer/WebGLTile";
import { PMTilesRasterSource } from "ol-pmtiles";
import { useGeographic } from 'ol/proj';

const rasterLayer = new WebGLTile({
  source: new PMTilesRasterSource({
    url:"https://r2-public.protomaps.com/protomaps-sample-datasets/terrarium_z9.pmtiles",
    attributions:["https://github.com/tilezen/joerd/blob/master/docs/attribution.md"],
    tileSize: [512,512]
  })
});

useGeographic();

const map = new Map({
  target: "map",
  layers: [rasterLayer],
  view: new View({
    center: [0,0],
    zoom: 1,
  }),
});
```

```js
import "./style.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { Style, Stroke, Fill } from 'ol/style';
import { useGeographic } from 'ol/proj';

const vectorLayer = new VectorTile({
  declutter: true,
  source: new PMTilesVectorSource({
    url: "https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles",
    attributions: ["© Land Information New Zealand"],
  }),
  style: new Style({
    stroke: new Stroke({
      color: "gray",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(20,20,20,0.9)",
    }),
  }),
});

useGeographic();

const map = new Map({
  target: "map",
  layers: [vectorLayer],
  view: new View({
    center: [172.606201,-43.556510],
    zoom: 7,
  }),
});
```