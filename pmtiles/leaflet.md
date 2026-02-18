---
title: PMTiles for Leaflet
outline: deep
---

# PMTiles for Leaflet

## Why use Leaflet?

[Leaflet.js](https://leafletjs.com) is the simplest full-featured map library for web browsers, with a wide range of [plugins](https://leafletjs.com/plugins.html). If you're looking for a WebGL-powered library with a smooth-zooming experience like Google or Apple Maps, check out [MapLibre GL](/pmtiles/maplibre).


## Raster PMTiles

The base distribution of Leaflet only supports raster images for tiled data sources.

Add a raster PMTiles archive using the `pmtiles` library:

```js
import { PMTiles, leafletRasterLayer } from 'pmtiles';
const p = new PMTiles('https://example.com/data.pmtiles');
leafletRasterLayer(p).addTo(map)
````

## Vector PMTiles

:::warning
The `protomaps-leaflet` library for displaying vector tiles is in maintenance mode. You should only use it for legacy projects that depend heavily on Leaflet - otherwise use [MapLibre GL JS](/pmtiles/maplibre).
:::

Protomaps publishes a lightweight Leaflet plugin, [protomaps-leaflet](https://github.com/protomaps/protomaps-leaflet), that implements **vector drawing and text labels** built on the Canvas API and Web Fonts.

Note that the protomaps-leaflet library is **designed for non-interactive layers**, because it renders vector tiles to Canvas (image) elements.

For basemap display as a substitute for server-rendered tiles, see [Basemaps for Leaflet](/basemaps/leaflet).

For fully interactive vector overlay tiles you should use [MapLibre GL JS](/pmtiles/maplibre).
