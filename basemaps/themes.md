---
title: Basemap Themes
outline: deep
---

<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
</script>

# Basemap Themes

These examples use the preferred [MapLibre GL JS](/basemaps/maplibre) library.

## Default Styles

### light

A general-purpose basemap style with icons.

<MaplibreMap theme="light" :zoom=13 :lat="51.509" :lng="-0.14"/>

### dark

A general-purpose basemap style with icons.

<MaplibreMap theme="dark" :zoom=13 :lat="51.509" :lng="-0.14"/>

### white

A style for data visualization.

<MaplibreMap theme="white" :zoom=13 :lat="51.509" :lng="-0.14"/>

### grayscale

A style for data visualization.

<MaplibreMap theme="grayscale" :zoom=13 :lat="51.509" :lng="-0.14"/>

### black

A style for data visualization.

<MaplibreMap theme="black" :zoom=13 :lat="51.509" :lng="-0.14"/>