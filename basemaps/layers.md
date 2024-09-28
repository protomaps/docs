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
This section is under construction for Version 4.
:::

## boundaries

<MaplibreMap highlightLayer="boundaries"/>

| Key           | Values                                    | Description                       |
| ------------- | ----------------------------------------- | --------------------------------- |
| `kind`        | `country`, `region`, `county`, `locality` |                                   |
| `kind_detail` | integer                                   | the minimum admin_level from OSM  |
| `brk_a3`      |                                           | `brk_a3` value from Natural Earth |
| `disputed`    | boolean                                   |                                   |



## buildings

<MaplibreMap highlightLayer="buildings"/>

Buildings from OpenStreetMap. z0-14 contains merged buildings, even disconnected ones. z15+ contains invidiual osm equivalent buildings.

| Key          |             Values            |                                  Description |
| ------------ | :---------------------------: | -------------------------------------------: |
| `kind`       |  `building`, `building_part`  |  Whether it is a whole building or one part. |
| `height`     |             number            |         May be quantized at low zoom levels. |
| `min_height` |             number            |         May be quantized at low zoom levels. |
| `layer`      |            integer            |  Layer position relative to other buildings. |


## earth

<MaplibreMap highlightLayer="earth"/>

Polygons from the Natural Earth 50m `land` theme for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.

| Key    |   Values  |  Description |
| ------ | :-------: | -----------: |
| `kind` |  `earth`  |              |


## landcover

<MaplibreMap highlightLayer="landcover"/>

Polygons from the Daylight distribution's [landcover](https://daylightmap.org/2023/10/11/landcover.html) theme, for z0-z7.

| Key    |                                      Values                                     |  Description |
| ------ | :-----------------------------------------------------------------------------: | -----------: |
| `kind` |  `barren`, `farmland`, `forest`, `glacier`, `grassland`, `scrub`, `urban_area`  |              |


_NOTE: It's recommended to pair with **natural** layer polygons in from OpenStreetMap at mid- and high-zooms._

## landuse

<MaplibreMap highlightLayer="landuse"/>

Polygons from OpenStreetMap, from a curated subset of `aeroway`, `amenity`, `area:aeroway`, `boundary`, `highway`, `landuse`, `leisure`, `man_made`, `natural`, `place`, `railway`, `tourism` tags, for all zooms.

| Key     |    Values   |                          Description |
| ------- | :---------: | -----------------------------------: |
| `kind`  |  See below  |                                      |
| `sport` |    string   |  Which sports are played on a pitch. |


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

<MaplibreMap highlightLayer="places"/>

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `kind` |  `country`, `region`, `locality`, `macrohood`, `neighbourhood`  |              |
| `kind_detail` |  `allotments`, `city`, `country`, `farm`, `hamlet`, `hamlet`, `isolated_dwelling`, `locality`, `neighbourhood`, `province`, `quarter`, `scientific_station`, `state`, `town`, `village` |              |
| `capital` |  string  |              |
| `population` |  int  |              |
| `population_rank` |  int  |              |
| `wikidata` |  string  |              |

_NOTE: Additional keys are available for each original OSM tags (when available), but those will be deprecated in the next major version so should not be used for styling._

## pois

Points from OpenStreetMap, from a curated subset of aeroway, amenity, attraction, boundary, craft, highway, historic, landuse, leisure, natural, railway, shop, tourism tags, for all zooms.

<MaplibreMap highlightLayer="pois"/>

| Key        |    Values   |  Description |
| ---------- | :---------: | -----------: |
| `kind`     |  See below  |              |
| `cuisine`  |    string   |              |
| `religion` |    string   |              |
| `sport`    |    string   |              |
| `iata`     |    string   |              |

_NOTE: The list of kind values is not comprehensive as some raw OSM tag values are passed through in the current version._

| kind                     |
| ------------------------ |
| `aerodrome`              |
| `adult_gaming_centre`    |
| `airfield`               |
| `alpine_hut`             |
| `amusement_ride`         |
| `animal`                 |
| `art`                    |
| `artwork`                |
| `atm`                    |
| `attraction`             |
| `atv`                    |
| `baby_hatch`             |
| `bakery`                 |
| `bbq`                    |
| `beauty`                 |
| `bed_and_breakfast`      |
| `bench`                  |
| `bicycle_parking`        |
| `bicycle_rental`         |
| `bicycle_repair_station` |
| `boat_storage`           |
| `bookmaker`              |
| `books`                  |
| `bureau_de_change`       |
| `bus_stop`               |
| `butcher`                |
| `cafe`                   |
| `camp_site`              |
| `car_parts`              |
| `car_rental`             |
| `car_repair`             |
| `car_sharing`            |
| `car_wash`               |
| `car`                    |
| `carousel`               |
| `cemetery`               |
| `chalet`                 |
| `charging_station`       |
| `childcare`              |
| `clinic`                 |
| `clothes`                |
| `college`                |
| `computer`               |
| `convenience`            |
| `customs`                |
| `dentist`                |
| `district`               |
| `doctors`                |
| `dog_park`               |
| `drinking_water`         |
| `emergency_phone`        |
| `fashion`                |
| `firepit`                |
| `fishing`                |
| `florist`                |
| `forest`                 |
| `fuel`                   |
| `gambling`               |
| `garden_centre`          |
| `gift`                   |
| `golf_course`            |
| `golf`                   |
| `greengrocer`            |
| `grocery`                |
| `guest_house`            |
| `hairdresser`            |
| `hanami`                 |
| `harbourmaster`          |
| `hifi`                   |
| `hospital`               |
| `hostel`                 |
| `hotel`                  |
| `hunting_stand`          |
| `information`            |
| `jewelry`                |
| `karaoke_box`            |
| `karaoke`                |
| `landmark`               |
| `library`                |
| `life_ring`              |
| `lottery`                |
| `marina`                 |
| `maze`                   |
| `memorial`               |
| `military`               |
| `mobile_phone`           |
| `money_transfer`         |
| `motorcycle_parking`     |
| `motorcycle`             |
| `national_park`          |
| `naval_base`             |
| `newsagent`              |
| `optician`               |
| `park`                   |
| `parking`                |
| `perfumery`              |
| `picnic_site`            |
| `picnic_table`           |
| `pitch`                  |
| `playground`             |
| `post_box`               |
| `post_office`            |
| `ranger_station`         |
| `recycling`              |
| `roller_coaster`         |
| `sanitary_dump_station`  |
| `school`                 |
| `scuba_diving`           |
| `shelter`                |
| `ship_chandler`          |
| `shower`                 |
| `slipway`                |
| `snowmobile`             |
| `social_facility`        |
| `stadium`                |
| `stationery`             |
| `studio`                 |
| `summer_toboggan`        |
| `supermarket`            |
| `swimming_area`          |
| `taxi`                   |
| `telephone`              |
| `tobacco`                |
| `toilets`                |
| `townhall`               |
| `trail_riding_station`   |
| `travel_agency`          |
| `university`             |
| `viewpoint`              |
| `waste_basket`           |
| `waste_disposal`         |
| `water_point`            |
| `water_slide`            |
| `watering_place`         |
| `wayside_cross`          |
| `wilderness_hut`         |


## roads

Linear transportation features designed for movement, including highways, streets,
 railways and piers from OpenStreetMap. This layer represents built infrastructure including railways. Refer to the [transit](#transit) layer for passenger services.

<MaplibreMap highlightLayer="roads"/>

| Key                  |                                                                                                                                                                                                            Values                                                                                                                                                                                                            |  Description |
| -------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------: |
| `kind`               |                                                                                                                                                                                    `highway`, `major_road`, `minor_road`, `path`, `other`                                                                                                                                                                                    |              |
| `kind_detail`        |  `motorway`, `motorway_link`, `trunk`, `trunk_link`, `primary`, `primary_link`, `secondary`, `secondary_link`, `tertiary`, `tertiary_link`, `residential`, `service`, `unclassified`, `road`, `raceway`, `pedestrian`, `track`, `path`, `cycleway`, `bridleway`, `steps`, `corridor`, `sidewalk`, `crossing`, `driveway`, `parking_aisle`, `alley`, `drive-through`, `emergency_access`, `utility`, `irrigation`, `slipway`  |              |
| `ref`                |                                                                                                                                                                                                            string                                                                                                                                                                                                            |              |
| `shield_text_length` |                                                                                                                                                                                                             int                                                                                                                                                                                                              |              |
| `network`            |                                                                                                                                                                                                            string                                                                                                                                                                                                            |              |
| `layer`              |                                                                                                                                                                                                             int                                                                                                                                                                                                              |              |
| `oneway`             |                                                                                                                                                                                                            string                                                                                                                                                                                                            |              |
| `service`            |                                                                                                                                                                                                            string                                                                                                                                                                                                            |              |
| `link`               |                                                                                                                                                                                                             int                                                                                                                                                                                                              |              |
| `level`              |                                                                                                                                                                                                        `-1`, `0`, `1`                                                                                                                                                                                                        |              |

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

## transit

<MaplibreMap highlightLayer="transit"/>

Lines representing scheduled passenger services suitable for rendering on the map, even at lower zoom levels. For physical infrastructure, like highways and railways, see the [roads](#roads) layer.

Lines from OpenStreetMap, from a curated subset of railway, aerialway, man_made, route, and aeroway tags, for mid- and high-zooms.

| Key           |                                                           Values                                                          |  Description |
| ------------- | :-----------------------------------------------------------------------------------------------------------------------: | -----------: |
| `kind`        |           `aerialway`, `cable_car`, `crossover`, `ferry`, `pier`, `rail`, `runway`, `siding`, `taxiway`, `yard`           |              |
| `kind_detail` |  `disused`, `funicular`, `light_rail`, `miniature`, `monorail`, `narrow_gauge`, `preserved`, `railway`, `subway`, `tram`  |              |
| `ref`         |                                                           string                                                          |              |
| `network`     |                                                           string                                                          |              |
| `layer`       |                                                            int                                                            |              |
| `route`       |                                                           string                                                          |              |
| `service`     |                                                           string                                                          |              |

## water

<MaplibreMap highlightLayer="water"/>

Polygons from the Natural Earth 50m `lakes` and `ocean` themes for z0-z4, 10m for z5, preprocessed land polygons from [OSMCoastline](https://osmdata.openstreetmap.de) for z6+.

| Key                |                    Values                    |  Description |
| ------------------ | :------------------------------------------: | -----------: |
| `kind`        |  `water`, `lake`, `playa`, `ocean`, `other`  |              |
| `kind_detail` |  `basin`, `canal`, `ditch`, `dock`, `drain`, `lake`, `reservoir`, `river`, `riverbank`, `stream`                                        |              |
| `reservoir`        | boolean                                      |              |
| `alkaline`         | boolean                                      |              |
| `intermittent`     | boolean                                      |              |
| `bridge`           | string                                       |              |
| `tunnel`           | string                                       |              |
| `layer`            | int                                          |              |
