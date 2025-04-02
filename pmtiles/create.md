---
title: Creating PMTiles
outline: deep
---

# Creating PMTiles 

## Tippecanoe

[Tippecanoe](https://github.com/felt/tippecanoe) is the supported tool for converting datasets into tiles. Tippecanoe version 2.17 and later supports direct PMTiles output.

An example of how to convert a Shapefile: [US Census Bureau Tabulation Areas](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html) in two steps, using GDAL's `ogr2ogr` command line tool:

```bash
ogr2ogr -t_srs EPSG:4326 cb_2018_us_zcta510_500k.json cb_2018_us_zcta510_500k.shp
# Creates a layer in the vector tiles named "zcta"
tippecanoe -zg --projection=EPSG:4326 -o cb_2018_us_zcta510_500k_nolimit.pmtiles -l zcta cb_2018_us_zcta510_500k.json
```

To merge multiple pmtiles files into a single file use [`tile-join` tool](https://github.com/felt/tippecanoe?tab=readme-ov-file#tile-join), which is shipped with Tippecanoe

```sh
# Merge all PMTiles files in current folder into single file
tile-join -o merged.pmtiles *.pmtiles
```

## MBTiles

the [`pmtiles` command line tool](/pmtiles/cli) converts MBTiles to PMTiles with this command:

`pmtiles convert INPUT.mbtiles OUTPUT.pmtiles`

## GeoTIFF

The [rio-pmtiles](https://pypi.org/project/rio-pmtiles/) package is a plugin for the [Rasterio](https://rasterio.readthedocs.io/en/stable/) python library and CLI.

Using a file from [OSGeo's GeoTIFF samples](https://download.osgeo.org/geotiff/samples/):

```sh
# convert single-band to 3-band RGB GeoTIFF
gdal_translate -expand rgb input.tif input_rgb.tif

pip install rio-pmtiles

rio pmtiles input_rgb.tif output.pmtiles --format PNG --resampling bilinear
```

Options:

* `--format`: One of `PNG` (lossless), `JPEG`, `WEBP`. `JPEG` is fastest to generate. Default `WEBP`.
* `--tile-size`: the dimensions in pixels. 512 is recommended for displaying in MapLibre GL. default `512`.
* `--resampling`: Choose `nearest` for discrete data. Default `bilinear`.
* `--silent`: Don't show a progress bar.
* `--zoom-levels`: Specify a range `10..12` to only generate those zoom levels. By default, generates all levels between 0 and the level to capture the full detail of the input.
* `--help`: Show other advanced options and GDAL flags.


## GDAL

GDAL has native support for PMTiles starting with version 3.8.0 (2023-11-13), see [gdal.org/drivers/vector/pmtiles](https://gdal.org/drivers/vector/pmtiles.html) for details.

**Using ogr2ogr to create vector PMTiles is recommended only for smaller datasets: the [tippecanoe](#tippecanoe) tool creates much more efficient overview tiles.**

GDAL's [`ogr2ogr`](https://gdal.org/programs/ogr2ogr.html#ogr2ogr) tool supports a wide range of formats as input for creating PMTiles. Below are examples of generating PMTiles from a Shapefile or multiple PostgreSQL/PostGIS tables.

```sh
# Convert shapefile to to pmtiles
ogr2ogr -dsco MINZOOM=10 -dsco MAXZOOM=15 -f "PMTiles" filename.pmtiles my_shapes.shp

# Merge all PostgreSQL/PostGIS tables in a schema into a single PMTiles file.
ogr2ogr -dsco MINZOOM=0 -dsco MAXZOOM=15 -f "PMTiles" filename.pmtiles "PG:host=my_host port=my_port dbname=my_database user=my_user password=my_password schemas=my_schema"
```

* `MAXZOOM=15` is sufficient for street-level mapping. Choosing less detail with a lower `MAXZOOM` will reduce the size of the final file.

## protomaps/basemaps

The [basemaps](https://github.com/protomaps/basemaps) repository on GitHub contains a java [Planetiler](https://github.com/onthegomap/planetiler) profile for generating planet-scale PMTiles from OpenStreetMap. The layers in this tileset are documented at [Basemap Layers](/basemaps/layers) and daily builds can be downloaded for free from [maps.protomaps.com/builds](https://maps.protomaps.com/builds).

Run the basemaps program on your own computer to modify the layers or generate only one specific area.

## Tilemaker

[Tilemaker](https://github.com/systemed/tilemaker) is a program for creating basemap tilesets from OpenStreetMap, though not ones that match the layers in the Protomaps [Basemap Layers](/basemaps/layers). The PMTiles archives that Tilemaker produces are currently not clustered, which may result in large, slower fetches when decoding in a web browser. For production use you should optimize the archive with [pmtiles cluster](/pmtiles/cli#cluster).