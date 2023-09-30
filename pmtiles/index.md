---
title: PMTiles Concepts
outline: deep
---
<script setup>
  import { useData } from 'vitepress'
  const { frontmatter } = useData()
</script>

# {{ frontmatter.title }}


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

### pmtiles command line tool

The official tool for reading and writing PMTiles is the `pmtiles` command line utility.

Download pre-compiled binaries for your platform at [GitHub Releases](https://github.com/protomaps/go-pmtiles/releases).

Examples and source code for `pmtiles` are in the README for [go-pmtiles](https://github.com/protomaps/go-pmtiles) on GitHub.

### JavaScript

PMTiles is designed for being read directly in web browsers in conjunction with a JavaScript map library.

See the docs on viewing PMTiles in [Leaflet](/docs/frontends/leaflet), [MapLibre GL JS](/docs/frontends/maplibre) and [OpenLayers](/docs/frontends/openlayers).

### Python

`pmtiles` is a python package for reading and writing PMTiles. [GitHub](https://github.com/protomaps/PMTiles/tree/master/python) and via the [Python Package Index](https://pypi.org/project/pmtiles/).

Documentation is available on [GitHub](https://github.com/protomaps/PMTiles/tree/master/python).

## Downloading basemaps

### 1. Download an area

[Protomaps Downloads](https://app.protomaps.com/downloads/small_map) is a free service to download up-to-date basemap tilesets from OpenStreetMap. 

We'll focus on a small area of Berkeley, CA, but you can follow these instructions for any area. Use the search box and the rectangle or polygon tool to draw the area you're interested in:


![step 1](/images/BundleStep1.png)

### 2. Serve your file locally

You'll need to use any local HTTP server that supports Range Requests to test the file locally. the npm package `http-server` is a popular one:

```sh
npm install -g http-server
# from the directory containing your .pmtiles file
http-server . --cors
# your file is now available at http://localhost:8080/
```

You can also use the HTTP server built into your frontend framework, usually by placing the .pmtiles file into the `/public` folder.

### 3. Display the tiles in a map frontend

See the [Leaflet](/docs/frontends/leaflet) or [MapLibre](/docs/frontends/maplibre) documentation for how to load the PMTiles into a map rendering frontend library.

## With your own data

### From MBTiles

the [`pmtiles` command line tool](#pmtiles-command-line-tool) converts MBTiles to PMTiles with this command:

`pmtiles convert INPUT.mbtiles OUTPUT.pmtiles`

### GeoTIFF

Using a file from [OSGeo's GeoTIFF samples](https://download.osgeo.org/geotiff/samples/) and the [rio-mbtiles](https://github.com/mapbox/rio-mbtiles) Python tool:

```sh
# convert single-band to 3-band RGB GeoTIFF
gdal_translate -expand rgb input.tif input_rgb.tif

# in this example create 512x512 PNG tiles from zooms 0 to 16.
rio mbtiles input_rgb.tif output.mbtiles --format PNG --zoom-levels 0..16 --tile-size 512 --resampling bilinear

pmtiles convert output.mbtiles output.pmtiles
```

### Tippecanoe

[Tippecanoe](https://github.com/felt/tippecanoe) is the supported tool for converting datasets into tiles. Tippecanoe version 2.17 and later supports direct PMTiles output.

An example of how to convert a Shapefile: [US Census Bureau Tabulation Areas](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html) in two steps, using GDAL's `ogr2ogr` command line tool:

```bash
ogr2ogr -t_srs EPSG:4326 cb_2018_us_zcta510_500k.json cb_2018_us_zcta510_500k.shp
# Creates a layer in the vector tiles named "zcta"
tippecanoe -zg --projection=EPSG:4326 -o cb_2018_us_zcta510_500k_nolimit.pmtiles -l zcta cb_2018_us_zcta510_500k.json
```

## Next steps

* [Deploy your tileset to the Internet via Cloud Storage](/docs/pmtiles/cloud-storage).

* [Edit OpenStreetMap](https://openstreetmap.org) and download basemaps to get new data. Your improvements to the map are available for anyone!

* Learn how to customize your map's [Basemap Layers](/docs/frontends/basemap-layers).

