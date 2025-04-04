---
title: Basemaps for Leaflet
outline: deep
---

# Basemaps for Leaflet

The simplest way to include a map in your application via script includes tag:

```js
<script src="https://unpkg.com/protomaps-leaflet@5.0.0/dist/protomaps-leaflet.js"></script>
<script>
    const map = L.map('map')
    var layer = protomapsL.leafletLayer({url:'FILE.pmtiles OR ENDPOINT/{z}/{x}/{y}.mvt', flavor: 'light', lang: 'en'})
    layer.addTo(map)
</script>
```

To use with a bundler:

```
npm add protomaps-leaflet
```

## Customization

The `flavor` option must be one of `light`, `dark`, `white`, `grayscale`, `black`.

The `lang` option can be one of the [supported languages](/basemaps/localization).

