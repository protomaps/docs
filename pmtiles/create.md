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

Using a file from [OSGeo's GeoTIFF samples](https://download.osgeo.org/geotiff/samples/) and the [rio-mbtiles](https://github.com/mapbox/rio-mbtiles) Python tool:

```sh
# convert single-band to 3-band RGB GeoTIFF
gdal_translate -expand rgb input.tif input_rgb.tif

# in this example create 512x512 PNG tiles from zooms 0 to 16.
rio mbtiles input_rgb.tif output.mbtiles --format PNG --zoom-levels 0..16 --tile-size 512 --resampling bilinear

pmtiles convert output.mbtiles output.pmtiles
```

## GDAL

GDAL has native support for PMTiles starting with version 3.8.0 (2023-11-13), see [gdal.org/drivers/vector/pmtiles](https://gdal.org/drivers/vector/pmtiles.html) for details.

GDAL's [`ogr2ogr`](https://gdal.org/programs/ogr2ogr.html#ogr2ogr) tool supports a wide range of formats as input for creating PMTiles. Below is examples of generating PMTiles from a shape file and based on multiple PostgreSQL/Postgis tables.

```sh
# Convert shapefile to to pmtiles
ogr2ogr -dsco MINZOOM=10 -dsco MAXZOOM=20 -f "PMTiles" filename.pmtiles my_shapes.shp

# Merge all PostgreSQL/PostGIS tables in a schema into a single PMTiles file.
ogr2ogr -dsco MINZOOM=0 -dsco MAXZOOM=22 -f "PMTiles" filename.pmtiles "PG:host=my_host port=my_port dbname=my_database user=my_user password=my_password schemas=my_schema"
```

## Other

::: warning
This section is under construction.
:::
