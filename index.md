---
title: Protomaps Documentation
outline: deep
---

<script setup>
  import MaplibreMap from './components/MaplibreMap.vue'
</script>

# Protomaps

Protomaps is an open source system for interactive web maps, like this one:

<MaplibreMap/>

There are three major parts of Protomaps:

* **PMTiles**, an open archive format for pyramids of tile data, accessible via [HTTP Range Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests).
* An **ecosystem of tools and libraries** for creating, serving and manipulating PMTiles.
* A **cartographic "basemap"** showing features in the world like roads, water bodies and labels, based on the OpenStreetMap dataset, and delivered as one big PMTiles archive.

Each of these parts has a corresponding section in the documentation.

If it's your first time trying Protomaps, the [Getting Started](/guide/getting-started) guide will demonstrate all parts of the system.


