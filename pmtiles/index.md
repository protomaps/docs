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

* PMTiles is a **read-only** format. It is not possible to update an archive in-place without re-writing the entire file, similar to CSV, JSON and Parquet. If you need transactional updates, use a database like SQLite or [PostgreSQL](http://postgis.net) + [ST_asMVT](https://postgis.net/docs/ST_AsMVT.html).

The current specification version of PMTiles is version 3, which you can [read on GitHub.](https://github.com/protomaps/PMTiles/blob/master/spec/v3/spec.md)

## Comparisons

### Individual files

An alternative to PMTiles is uploading each tile separately in a directory tree like `/Z/X/Y.mvt`. This works great for small tilesets, but uploading full global pyramid, such as 300 million tiles, could cost 1,500 USD in request fees and take days. PMTiles is a single file to upload and de-duplicates tiles internally, reducing size by 70%+ or more for global vector basemaps.

### MBTiles

[MBTiles](https://github.com/mapbox/mbtiles-spec) is a container format for tiled data, just like PMTiles, but based on SQLite. MBTiles are designed to be accessed on disk from a running server process, while PMTiles is designed to be read remotely over HTTP, with at most two cacheable intermediate requests.

### Cloud Optimized GeoTIFF

A [Cloud Optimized GeoTIFF (COG)](https://www.cogeo.org) is a raster TIFF file with an internal organization that enables remote reads from cloud storage. PMTiles is similar to COG, but stores arbitrary tiled data, such as vector MVT tiles. However, COG is backwards compatible with most GIS software that deals with GeoTIFF.

## Reading PMTiles

### PMTiles Viewer

The Viewer is a browser-based tool for visualizing PMTiles on a map, inspecting metadata, and debugging individual tiles.

You can access the Viewer at [pmtiles.io](https://pmtiles.io/).

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

PMTiles is designed for being viewed directly in web browsers in conjunction with a JavaScript map rendering library, including:

* [MapLibre GL JS](/pmtiles/maplibre) - the recommended library for building smooth experiences and custom styling.
* [Leaflet](/pmtiles/leaflet) - a lightweight map display library with many plugins.
* [OpenLayers](/pmtiles/openlayers) - has the most GIS-related features.

Each of the client integrations uses the [JavaScript pmtiles library](https://github.com/protomaps/PMTiles/tree/main/js).

[JavaScript Library API documentation](https://pmtiles.io/typedoc/)

### Python

`pmtiles` is a python package for reading and writing PMTiles. It is available via [GitHub](https://github.com/protomaps/PMTiles/tree/main/python) and the [Python Package Index](https://pypi.org/project/pmtiles/).

::: warning
The Python `pmtiles` package should be considered beta status.
:::

## Other Languages

These libraries are maintained by other individuals and organizations.

* Dart: [pub.dev/packages/pmtiles](https://pub.dev/packages/pmtiles)
* Rust: [stadiamaps/pmtiles-rs](https://github.com/stadiamaps/pmtiles-rs)
