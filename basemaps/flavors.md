---
title: Basemap Flavors
outline: deep
---

<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
</script>

# Basemap Flavors

These examples use the preferred [MapLibre GL JS](/basemaps/maplibre) library.

The `Flavor` TypeScript interface is the preferred way to customize the basemap style. See the shape of the interface at the [@protomaps/basemaps TypeScript docs](https://maps.protomaps.com/typedoc/interfaces/Flavor.html).

A `Flavor` is a plain object of color definitions and optional properties such as font names, landcover shades and POI properties. You can define a `Flavor` yourself for a custom style, similar to a text editor color scheme, or use one of the default named flavors as a base.

## Default Flavors

These flavors are included as part of the `@protomaps/basemaps` package.

### light

A general-purpose basemap with icons.

<MaplibreMap flavor="light" :zoom=13 :lat="51.509" :lng="-0.14"/>

### dark

A general-purpose basemap with icons.

<MaplibreMap flavor="dark" :zoom=13 :lat="51.509" :lng="-0.14"/>

### white

A flavor for data visualization.

<MaplibreMap flavor="white" :zoom=13 :lat="51.509" :lng="-0.14"/>

### grayscale

A flavor for data visualization.

<MaplibreMap flavor="grayscale" :zoom=13 :lat="51.509" :lng="-0.14"/>

### black

A flavor for data visualization.

<MaplibreMap flavor="black" :zoom=13 :lat="51.509" :lng="-0.14"/>

## Overriding Defaults

Use [ES6 spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to override any part of the Flavor object. For example, to color buildings red:

```ts
import { namedFlavor } from "@protomaps/basemaps"
let flavor = {...namedFlavor("light"),buildings:"red"}
```
