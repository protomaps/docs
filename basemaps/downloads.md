---
title: Basemap Downloads
outline: deep
---

# Basemap Downloads

## 1. Download an area

[Protomaps Downloads](https://app.protomaps.com/downloads/small_map) is a free service to download up-to-date basemap tilesets from OpenStreetMap. 

We'll focus on a small area of Berkeley, CA, but you can follow these instructions for any area. Use the search box and the rectangle or polygon tool to draw the area you're interested in:

(image)

## 2. Serve your file locally

You'll need to use any local HTTP server that supports Range Requests to test the file locally. the npm package `http-server` is a popular one:

```sh
npm install -g http-server
# from the directory containing your .pmtiles file
http-server . --cors
# your file is now available at http://localhost:8080/
```

You can also use the HTTP server built into your frontend framework, usually by placing the .pmtiles file into the `/public` folder.

## 3. Display the tiles in a map frontend

See the [Leaflet](/pmtiles/leaflet) or [MapLibre](/pmtiles/maplibre) documentation for how to load the PMTiles into a map rendering frontend library.

## Next steps

* [Deploy your tileset to the Internet via Cloud Storage](/pmtiles/cloud-storage).

* [Edit OpenStreetMap](https://openstreetmap.org) and download basemaps to get new data. Your improvements to the map are available for anyone!

* Learn how to customize your map's [Basemap Layers](/basemaps/layers).
