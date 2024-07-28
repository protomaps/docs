---
title: Basemaps for Leaflet
outline: deep
---

# Basemaps for Leaflet

The simplest way to include a map in your application via script includes tag:

```js
// check for the latest version on github...
<script src="https://unpkg.com/protomaps@4.0.1/dist/protomaps-leaflet.js"></script>
<script>
    const map = L.map('map')
    var layer = protomapsL.leafletLayer({url:'FILE.pmtiles OR ENDPOINT/{z}/{x}/{y}.mvt', theme: 'light'})
    layer.addTo(map)
</script>
```

## Themes

The `theme` option must be one of `light`, `dark`, `white`, `grayscale`, `black`.

This will assume the set of basemap layers described at [Basemap Layers](/basemaps/layers).

