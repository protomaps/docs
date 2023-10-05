---
title: Getting Started
outline: deep
---

# Getting Started

## 1. Install the CLI

The **pmtiles CLI tool** is a single binary you can download at [GitHub Releases](https://github.com/protomaps/go-pmtiles/releases).

## 2. Find the latest daily planet

Go to [maps.protomaps.com/builds](https://maps.protomaps.com/builds/) and find a recent daily basemap build.

Use the pmtiles CLI to inspect that archive:

```bash
pmtiles show https://build.protomaps.com/20231001.pmtiles
```

```
...
planetiler:osm:osmosisreplicationtime 2023-10-01T05:00:00Z
...
```

The above metadata shows that the file contains [OpenStreetMap](http://openstreetmap.org) data up to that day.

## 3. Extract any area

We can now create a subset of the planet file, `my_area.pmtiles`, with just tiles matching the bounding box `4.742883,51.830755,5.552837,52.256198` centered around Utrecht, Netherlands.

```
pmtiles extract https://build.protomaps.com/20231001.pmtiles my_area.pmtiles --bbox=4.742883,51.830755,5.552837,52.256198
```

## 4. View the basemap

[maps.protomaps.com](https://maps.protomaps.com) is a viewer for basemaps. Drag our file `my_area.pmtiles` onto the `Drop Zone` to view the map:

![utrecht image](./utrecht.png)

## Next Steps

* Upload your tiles to cloud storage: [Cloud Storage](/pmtiles/cloud-storage)
* Change the appearance or theme of the basemap: [Basemap Styles](/basemaps/styles)
* Bring your own datasets: [Creating PMTiles](/pmtiles/create)
