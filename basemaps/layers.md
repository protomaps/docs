---
title: Basemap Layers
outline: deep
---
<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
</script>

# Basemap Layers

OpenStreetMap layers documentation.

::: warning
This section is under construction.

For the previous version of the layers, see [Layers Version 2](/basemaps/layers_v2)
:::

<MaplibreMap/>

## boundaries

| Key                    | Values                                    | Description |
| ---------------------- | ----------------------------------------- | ----------- |
| `pmap:kind`            | `country`, `region`, `county`, `locality` |             |
| `pmap:kind_detail`     |                                           |             |
| `pmap:min_admin_level` |                                           |             |
| `pmap:brk_a3`          |                                           |             |
| `disputed`             | boolean                                   |             |

## buildings


Buildings from OpenStreetMap.

| Key          |             Values            |                                  Description |
| ------------ | :---------------------------: | -------------------------------------------: |
| `pmap:kind`  |  `building`, `building_part`  |  Whether it is a whole building or one part. |
| `height`     |             number            |         May be quantized at low zoom levels. |
| `min_height` |             number            |         May be quantized at low zoom levels. |
| `layer`      |            integer            |  Layer position relative to other buildings. |

## earth

Polygons from the Natural Earth 50m `land` theme for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `earth`  |              |

## landuse

`kind`

## natural

<MaplibreMap/>

## physical_line

::: warning
physical_line will be deprecated in v4.0.
:::

## physical_point

::: warning
physical_point will be deprecated in v4.0.
:::


## places

`kind`

## pois

`kind`

## roads

`kind`

## transit

`kind`

## water

Polygons from the Natural Earth 50m `lakes` and `ocean` themes for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.


| Key                |                    Values                    |  Description |
| ------------------ | :------------------------------------------: | -----------: |
| `pmap:kind`        |  `water`, `lake`, `playa`, `ocean`, `other`  |              |
| `pmap:kind_detail` |                                              |              |
| `reservoir`        |                                              |              |
| `alkaline`         |                                              |              |
| `intermittent`     |                                              |              |
| `bridge`           |                                              |              |
| `tunnel`           |                                              |              |
| `layer`            |                                              |              |
