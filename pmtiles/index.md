---
title: PMTiles Concepts
outline: deep
---

# PMTiles Concepts

PMTiles is a single-file archive format for pyramids of tiled data. A PMTiles archive can be hosted on a storage platform like S3, and enables low-cost, zero-maintenance map applications.

## Concepts

* PMTiles is a general format for tiled data addressed by Z/X/Y coordinates. This can be cartographic basemap vector tiles, remote sensing observations, JPEG images, or more. 

* PMTiles readers use [HTTP Range Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) to fetch only the relevant tile or metadata inside a PMTiles archive on-demand.

* The arrangement of tiles and directories is designed to minimize the amount of overhead requests when panning and zooming.

The current specification version of PMTiles is version 3, which you can [read on GitHub.](https://github.com/protomaps/PMTiles/blob/master/spec/v3/spec.md)

## Reading PMTiles

### PMTiles Viewer

The Viewer is a browser-based tool for visualizing PMTiles on a map, inspecting metadata, and debugging individual tiles.

You can access the Viewer at [protomaps.github.io/PMTiles/](https://protomaps.github.io/PMTiles/).

### Serving files locally

You can use any local HTTP server that supports Range Requests to serve files locally. the npm package `http-server` is a popular one:

```sh
npm install -g http-server
# from the directory containing your .pmtiles file
http-server . --cors
# your file is now available at http://localhost:8080/
```

You can also use the HTTP server built into frontend frameworks, usually by placing the .pmtiles file into the `/public` folder.

### pmtiles command line tool

See the [pmtiles cli](/pmtiles/cli).

### JavaScript

PMTiles is designed for being read directly in web browsers in conjunction with a JavaScript map library.

See the docs on viewing PMTiles in [Leaflet](/pmtiles/leaflet), [MapLibre GL JS](/pmtiles/maplibre) and [OpenLayers](/pmtiles/openlayers).

### Python

`pmtiles` is a python package for reading and writing PMTiles. [GitHub](https://github.com/protomaps/PMTiles/tree/master/python) and via the [Python Package Index](https://pypi.org/project/pmtiles/).

::: warning
The Python `pmtiles` package should be considered beta status.
:::

## Other Languages

These libraries are maintained by other individuals and organizations.

* Dart: [pub.dev/packages/pmtiles](https://pub.dev/packages/pmtiles)
