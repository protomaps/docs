---
title: Basemap Layers
outline: deep
---

<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
  import Icon from '../components/Icon.vue'

  const fetchImage = async (url) => {
    return new Promise((resolve,reject) => {
      if (typeof window !== 'undefined') {
        const img = new Image();
        img.onload = () => { resolve(img); }
        img.src = url;
      } else {
        resolve(null);
      }
    })
  }

  const SPRITES_BASE = "https://protomaps.github.io/basemaps-assets/sprites/v4";

  const sprites = Promise.all([
    fetch(`${SPRITES_BASE}/light@2x.json`).then(resp => resp.json()),
    fetchImage(`${SPRITES_BASE}/light@2x.png`),
    fetch(`${SPRITES_BASE}/dark@2x.json`).then(resp => resp.json()),
    fetchImage(`${SPRITES_BASE}/dark@2x.png`)
  ]);
</script>

# Basemap Layers

The Protomaps basemap is built on [OpenStreetMap](https://openstreetmap.org) and [Natural Earth](https://naturalearthdata.com) data. It does not include all data and tags from OSM; instead it is designed to strike a balance between tile size and completeness, for use as a general-purpose context map.

The organization of layers and tags is derived from the [open source Tilezen project](https://tilezen.readthedocs.io/en/latest/layers/). The scope of contents and choice of data inclusion at certain zoom levels is intended to mirror the reference implementations of Tilezen styles such as [Bubble Wrap](https://tangrams.github.io/bubble-wrap/).

The current version is **Version 4**.

## Common Tags

| Key                                                | Values  | Description                                |
| -------------------------------------------------- | ------- | ------------------------------------------ |
| `name`, `name*`, `name:*`, `pgf:name:*`, `script*` | string  | see [Localization](/basemaps/localization) |
| `sort_rank`                                        | integer | Importance ranking used for rendering      |
| `min_zoom`                                         | integer | Suggested zoom level to limit display      |

## boundaries

<MaplibreMap highlightLayer="boundaries" :zoom=5 :showZoom="true" :lat="52" :lng="4"/>

| Key           | Values                                    | Description                       |
| ------------- | ----------------------------------------- | --------------------------------- |
| `kind`        | `country`, `region`, `county`, `locality` |                                   |
| `kind_detail` | integer                                   | the minimum admin_level from OSM  |
| `brk_a3`      |                                           | `brk_a3` value from Natural Earth |
| `disputed`    | boolean                                   |                                   |

## buildings

<MaplibreMap highlightLayer="buildings" :zoom=14 :showZoom="true" :lat="51.5" :lng="-0.2"/>

Buildings and address points from OpenStreetMap. z0-14 contains merged buildings, even disconnected ones. z15+ contains individual OSM equivalent buildings.

| Key                |                  Values                  |                                                  Description |
| ------------------ | :--------------------------------------: | -----------------------------------------------------------: |
| `kind`             |  `address`, `building`, `building_part`  |  Whether it is an address point, whole building or one part. |
| `addr_housenumber` |                  string                  |                           Address number for `kind=address`. |
| `height`           |                  number                  |                         May be quantized at low zoom levels. |
| `min_height`       |                  number                  |                         May be quantized at low zoom levels. |
| `layer`            |                 integer                  |                  Layer position relative to other buildings. |


## earth

<MaplibreMap highlightLayer="earth" :zoom=3 :showZoom="true" :lat="-4.5" :lng="127"/>

Polygons from the Natural Earth 50m `land` theme for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.

| Key    | Values  | Description |
| ------ | :-----: | ----------: |
| `kind` | `earth` |             |

## landcover

<MaplibreMap highlightLayer="landcover" :zoom=2 :showZoom="true" :lat="38" :lng="-100"/>

Polygons from the Daylight distribution's [landcover](https://daylightmap.org/2023/10/11/landcover.html) theme, for z0-z7.

| Key    |                                    Values                                     | Description |
| ------ | :---------------------------------------------------------------------------: | ----------: |
| `kind` | `barren`, `farmland`, `forest`, `glacier`, `grassland`, `scrub`, `urban_area` |             |

_NOTE: It's recommended to pair with **natural** layer polygons in from OpenStreetMap at mid- and high-zooms._

## landuse

<MaplibreMap highlightLayer="landuse" :zoom=13 :showZoom="true" :lat="-1.28" :lng="36.8"/>

Polygons from OpenStreetMap, from a curated subset of `aeroway`, `amenity`, `area:aeroway`, `boundary`, `highway`, `landuse`, `leisure`, `man_made`, `natural`, `place`, `railway`, `tourism` tags, for all zooms.

| Key     |  Values   |                         Description |
| ------- | :-------: | ----------------------------------: |
| `kind`  | See below |                                     |
| `sport` |  string   | Which sports are played on a pitch. |

### Kinds

| Kind                |
| ------------------- |
| `aerodrome`         |
| `attraction`        |
| `bare_rock`         |
| `beach`             |
| `cafe`              |
| `camp_site`         |
| `cemetery`          |
| `college`           |
| `commercial`        |
| `dog_park`          |
| `farmland`          |
| `farmyard`          |
| `footway`           |
| `forest`            |
| `garden`            |
| `glacier`           |
| `golf_course`       |
| `grass`             |
| `grocery`           |
| `hospital`          |
| `hotel`             |
| `industrial`        |
| `kindergarten`      |
| `library`           |
| `marina`            |
| `meadow`            |
| `military`          |
| `national_park`     |
| `nature_reserve`    |
| `neighbourhood`     |
| `orchard`           |
| `other`             |
| `park`              |
| `pedestrian`        |
| `pier`              |
| `pitch`             |
| `platform`          |
| `playground`        |
| `post_office`       |
| `protected_area`    |
| `railway`           |
| `recreation_ground` |
| `residential`       |
| `runway`            |
| `sand`              |
| `school`            |
| `scrub`             |
| `stadium`           |
| `supermarket`       |
| `taxiway`           |
| `townhall`          |
| `university`        |
| `wetland`           |
| `wood`              |
| `zoo`               |

## places

Points from OpenStreetMap and Natural Earth, from a curated subset of place tags, for all zooms.

<MaplibreMap highlightLayer="places" :zoom=2 :showZoom="true" :lat="-24.6" :lng="134"/>

| Key               |                                                                                         Values                                                                                         | Description |
| ----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------: |
| `kind`            |                                                             `country`, `region`, `locality`, `macrohood`, `neighbourhood`                                                              |             |
| `kind_detail`     | `allotments`, `city`, `country`, `farm`, `hamlet`, `hamlet`, `isolated_dwelling`, `locality`, `neighbourhood`, `province`, `quarter`, `scientific_station`, `state`, `town`, `village` |             |
| `capital`         |                                                                                         string                                                                                         |             |
| `population`      |                                                                                          int                                                                                           |             |
| `population_rank` |                                                                                          int                                                                                           |             |
| `wikidata`        |                                                                                         string                                                                                         |             |

## pois

Points from OpenStreetMap, from a curated subset of aeroway, amenity, attraction, boundary, craft, highway, historic, landuse, leisure, natural, railway, shop, tourism tags, for all zooms.

<MaplibreMap highlightLayer="pois"  :zoom=16 :showZoom="true" :lat="52.525" :lng="13.41"/>

| Key        |  Values   | Description |
| ---------- | :-------: | ----------: |
| `kind`     | See below |             |
| `cuisine`  |  string   |             |
| `religion` |  string   |             |
| `sport`    |  string   |             |
| `iata`     |  string   |             |

_NOTE: The list of kind values is not comprehensive as some raw OSM tag values are passed through in the current version._

### Kinds

| kind                     | icon                                             |
| ------------------------ | ------------------------------------------------ |
| `aerodrome`              | <Icon kind="aerodrome" :sprites="sprites"/>      |
| `adult_gaming_centre`    |                                                  |
| `airfield`               |                                                  |
| `alpine_hut`             |                                                  |
| `amusement_ride`         |                                                  |
| `animal`                 |                                                  |
| `art`                    |                                                  |
| `artwork`                |                                                  |
| `atm`                    |                                                  |
| `attraction`             |                                                  |
| `atv`                    |                                                  |
| `baby_hatch`             |                                                  |
| `bakery`                 |                                                  |
| `bbq`                    |                                                  |
| `beach`                  | <Icon kind="beach" :sprites="sprites"/>          |
| `beauty`                 |                                                  |
| `bed_and_breakfast`      |                                                  |
| `bench`                  |                                                  |
| `bicycle_parking`        |                                                  |
| `bicycle_rental`         |                                                  |
| `bicycle_repair_station` |                                                  |
| `boat_storage`           |                                                  |
| `bookmaker`              |                                                  |
| `books`                  |                                                  |
| `bureau_de_change`       |                                                  |
| `bus_stop`               |                                                  |
| `butcher`                |                                                  |
| `cafe`                   |                                                  |
| `camp_site`              |                                                  |
| `car_parts`              |                                                  |
| `car_rental`             |                                                  |
| `car_repair`             |                                                  |
| `car_sharing`            |                                                  |
| `car_wash`               |                                                  |
| `car`                    |                                                  |
| `carousel`               |                                                  |
| `cemetery`               |                                                  |
| `chalet`                 |                                                  |
| `charging_station`       |                                                  |
| `childcare`              |                                                  |
| `clinic`                 |                                                  |
| `clothes`                |                                                  |
| `college`                | <Icon kind="fire_station" :sprites="sprites"/>   |
| `computer`               |                                                  |
| `convenience`            |                                                  |
| `customs`                |                                                  |
| `dentist`                |                                                  |
| `district`               |                                                  |
| `doctors`                |                                                  |
| `dog_park`               |                                                  |
| `drinking_water`         |                                                  |
| `emergency_phone`        |                                                  |
| `fashion`                |                                                  |
| `firepit`                |                                                  |
| `fire_station`           | <Icon kind="fire_station" :sprites="sprites"/>   |
| `fishing`                |                                                  |
| `florist`                |                                                  |
| `forest`                 | <Icon kind="forest" :sprites="sprites"/>         |
| `fuel`                   |                                                  |
| `gambling`               |                                                  |
| `garden_centre`          |                                                  |
| `gift`                   |                                                  |
| `golf_course`            |                                                  |
| `golf`                   |                                                  |
| `greengrocer`            |                                                  |
| `grocery`                |                                                  |
| `guest_house`            |                                                  |
| `hairdresser`            |                                                  |
| `hanami`                 |                                                  |
| `harbourmaster`          |                                                  |
| `hifi`                   |                                                  |
| `hospital`               | <Icon kind="hospital" :sprites="sprites"/>       |
| `hostel`                 |                                                  |
| `hotel`                  |                                                  |
| `hunting_stand`          |                                                  |
| `information`            |                                                  |
| `jewelry`                |                                                  |
| `karaoke_box`            |                                                  |
| `karaoke`                |                                                  |
| `landmark`               |                                                  |
| `library`                | <Icon kind="library" :sprites="sprites"/>        |
| `life_ring`              |                                                  |
| `lottery`                |                                                  |
| `marina`                 | <Icon kind="marina" :sprites="sprites"/>         |
| `maze`                   |                                                  |
| `memorial`               |                                                  |
| `military`               |                                                  |
| `mobile_phone`           |                                                  |
| `money_transfer`         |                                                  |
| `motorcycle_parking`     |                                                  |
| `motorcycle`             |                                                  |
| `national_park`          | <Icon kind="national_park" :sprites="sprites"/>  |
| `nature_reserve`         | <Icon kind="nature_reserve" :sprites="sprites"/> |
| `naval_base`             |                                                  |
| `newsagent`              |                                                  |
| `optician`               |                                                  |
| `park`                   | <Icon kind="park" :sprites="sprites"/>           |
| `parking`                |                                                  |
| `peak`                   | <Icon kind="peak" :sprites="sprites"/>           |
| `perfumery`              |                                                  |
| `picnic_site`            |                                                  |
| `picnic_table`           |                                                  |
| `pitch`                  |                                                  |
| `playground`             |                                                  |
| `post_box`               |                                                  |
| `post_office`            | <Icon kind="post_office" :sprites="sprites"/>    |
| `ranger_station`         |                                                  |
| `recycling`              |                                                  |
| `roller_coaster`         |                                                  |
| `sanitary_dump_station`  |                                                  |
| `school`                 | <Icon kind="school" :sprites="sprites"/>         |
| `scuba_diving`           |                                                  |
| `shelter`                |                                                  |
| `ship_chandler`          |                                                  |
| `shower`                 |                                                  |
| `slipway`                |                                                  |
| `snowmobile`             |                                                  |
| `social_facility`        |                                                  |
| `stadium`                | <Icon kind="stadium" :sprites="sprites"/>        |
| `station`                | <Icon kind="station" :sprites="sprites"/>        |
| `stationery`             |                                                  |
| `studio`                 |                                                  |
| `summer_toboggan`        |                                                  |
| `supermarket`            |                                                  |
| `swimming_area`          |                                                  |
| `taxi`                   |                                                  |
| `telephone`              |                                                  |
| `tobacco`                |                                                  |
| `toilets`                |                                                  |
| `townhall`               | <Icon kind="townhall" :sprites="sprites"/>       |
| `trail_riding_station`   |                                                  |
| `travel_agency`          |                                                  |
| `university`             | <Icon kind="university" :sprites="sprites"/>     |
| `viewpoint`              |                                                  |
| `waste_basket`           |                                                  |
| `waste_disposal`         |                                                  |
| `water_point`            |                                                  |
| `water_slide`            |                                                  |
| `watering_place`         |                                                  |
| `wayside_cross`          |                                                  |
| `wilderness_hut`         |                                                  |
| `zoo`                    | <Icon kind="zoo" :sprites="sprites"/>            |

## roads

Linear transportation features designed for movement, including highways, streets,
railways and piers from OpenStreetMap. This layer represents built infrastructure including railways. Refer to the [transit](#transit) layer for passenger services.

<MaplibreMap highlightLayer="roads" :zoom=13 :showZoom="true" :lat="35.68" :lng="139.76"/>

| Key           |                                                                                                                                                                                                                                                                                        Values                                                                                                                                                                                                                                                                                        |              Description |
| ------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------------: |
| `kind`        |                                                                                                                                                                                                                                                                                   See kinds below                                                                                                                                                                                                                                                                                    |                          |
| `kind_detail` |  `motorway`, `motorway_link`, `trunk`, `trunk_link`, `primary`, `primary_link`, `secondary`, `secondary_link`, `tertiary`, `tertiary_link`, `residential`, `service`, `unclassified`, `road`, `raceway`, `pedestrian`, `track`, `path`, `cycleway`, `bridleway`, `steps`, `corridor`, `sidewalk`, `crossing`, `driveway`, `parking_aisle`, `alley`, `drive-through`, `emergency_access`, `utility`, `irrigation`, `slipway`, `cable_car`, `pier`, `runway`, `taxiway`, `disused`, `funicular`, `light_rail`, `miniature`, `monorail`, `narrow_gauge`, `preserved`, `subway`, `tram`  |                          |
| `ref`         |                                                                                                                                                                                                                                                                                        string                                                                                                                                                                                                                                                                                        |                          |
| `shield_text` |                                                                                                                                                                                                                                                                                        string                                                                                                                                                                                                                                                                                        |  see [shields](#shields) |
| `network`     |                                                                                                                                                                                                                                                                                        string                                                                                                                                                                                                                                                                                        |  see [shields](#shields) |
| `oneway`      |                                                                                                                                                                                                                                                                                        string                                                                                                                                                                                                                                                                                        |                          |
| `service`     |                                                                                                                                                                                                                                                                            `siding`, `crossover`, `yard`                                                                                                                                                                                                                                                                             |                          |
| `is_link`     |                                                                                                                                                                                                                                                                                       boolean                                                                                                                                                                                                                                                                                        |                          |
| `is_tunnel`   |                                                                                                                                                                                                                                                                                       boolean                                                                                                                                                                                                                                                                                        |                          |
| `is_bridge`   |                                                                                                                                                                                                                                                                                       boolean                                                                                                                                                                                                                                                                                        |                          |


### Kinds

| kind         |
| ------------ |
| `highway`    |
| `major_road` |
| `minor_road` |
| `path`       |
| `aerialway`  |
| `ferry`      |
| `pier`       |
| `rail`       |
| `aeroway`    |

### Shields

The `network` and `shield_text` are designed for displaying localized highway shields. The values are derived from the OpenStreetMap `ref` tag, and a spatial join with administrative boundaries.

Example `network` values:

| Value       |                        Sprite                       | Description                                                                                                  |
| ----------- | :-------------------------------------------------: | ------------------------------------------------------------------------------------------------------------ |
| `US`        |                                                     | United States [Numbered Highway System](https://en.wikipedia.org/wiki/United_States_Numbered_Highway_System) |
| `US:I`      |     <Icon kind="US:I-1char" :sprites="sprites"/>    | United States [Interstate Highway System](https://en.wikipedia.org/wiki/Interstate_Highway_System)           |
| `NL:S-road` |  <Icon kind="NL:S-road-1char" :sprites="sprites"/>  | Dutch S-road network                                                                                         |
                                                                                     |
                                                                                      |

For example, an [OpenStreetMap way](https://www.openstreetmap.org/way/584348895) with the tag `ref=S100` where the way is contained within the Netherlands polygon as defined by [ideditor.codes](https://ideditor.codes) will gain the tags `network=NL:S-road`, `shield_text=S100`.

## transit

Lines representing scheduled passenger services suitable for rendering on the map, even at lower zoom levels. For physical infrastructure, like highways and railways, see the [roads](#roads) layer.

This layer is currently empty.

| Key           | Values | Description |
| ------------- | :----: | ----------: |
| `kind_detail` |        |             |
| `ref`         | string |             |
| `network`     | string |             |
| `layer`       |  int   |             |
| `route`       | string |             |
| `service`     | string |             |

## water

<MaplibreMap highlightLayer="water" :zoom=6 :showZoom="true" :lat="-1.3" :lng="-49"/>

* Polygons, lines and point labels from OpenStreetMap.

* Polygons from the Natural Earth 50m `lakes` and `ocean` themes for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.

| Key            |                                             Values                                              | Description |
| -------------- | :---------------------------------------------------------------------------------------------: | ----------: |
| `kind`         |                           `water`, `lake`, `playa`, `ocean`, `other`                            |             |
| `kind_detail`  | `basin`, `canal`, `ditch`, `dock`, `drain`, `lake`, `reservoir`, `river`, `riverbank`, `stream` |             |
| `reservoir`    |                                             boolean                                             |             |
| `alkaline`     |                                             boolean                                             |             |
| `intermittent` |                                             boolean                                             |             |
| `bridge`       |                                             string                                              |             |
| `tunnel`       |                                             string                                              |             |
| `layer`        |                                               int                                               |             |
