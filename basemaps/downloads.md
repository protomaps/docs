---
title: Basemap Downloads
outline: deep
---

# Basemap Downloads

## Intro

The **Protomaps Basemap** is a general purpose vector *base map* - city labels, roads, water features and other essential location context derived from [OpenStreetMap](https://openstreetmap.org). It's available as a single PMTiles archive, distributed as an [Open Database License](https://opendatacommons.org/licenses/odbl/) Produced Work (OpenStreetMap attribution required)

A full planet file is roughly **120 gigabytes**, including zoom levels from 0 to 15.

Please note that **URLs may change** and hotlinking to these downloads are discouraged. Instead, you should copy the tileset to your own [Cloud Storage](/pmtiles/cloud-storage).

* The generation of the planet basemap is open source at [github.com/protomaps/basemaps](http://github.com/protomaps/basemaps).


## Current Version

The Version 4 Protomaps basemap daily build channel is available at [maps.protomaps.com/builds](https://maps.protomaps.com/builds). This is compatible with `protomaps-themes-base` style v4.0.0 and newer.

A mirror in the AWS `us-west-2` is available on [Source Cooperative (beta)](https://beta.source.coop) at the [protomaps/openstreetmap](https://beta.source.coop/repositories/protomaps/openstreetmap/) repository. This mirrors the most recent daily build only.

## Partial Downloads

To download a cutout of a specific region, rather than the entire world map, see the CLI's [extract command](/pmtiles/cli#extract).

If you don't need all 16 zoom levels of detail, use the `--maxzoom` option of `pmtiles extract`. Each additional zoom level roughly doubles the size of the file.
