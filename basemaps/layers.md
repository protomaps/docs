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

## landcover

Polygons from the Daylight distribution's [landcover](https://daylightmap.org/2023/10/11/landcover.html) theme, for z0-z7.

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `barren`, `farmland`, `forest`, `glacier`, `grassland`, `scrub`, `urban_area`  |              |

_NOTE: It's recommended to pair with **natural** layer polygons from OpenStreetMap at mid- and high-zooms._

## landuse

Polygons from OpenStreetMap, from a curated subset of aeroway, amenity, area:aeroway, boundary, highway, landuse, leisure, man_made, natural, place, railway, tourism tags, for all zooms.

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `aerodrome`, `attraction`, `beach`, `cafe`, `camp_site`, `cemetery`, `college`, `commercial`, `dog_park`, `farmland`, `farmyard`, `footway`, `forest`, `garden`, `golf_course`, `grass`, `grocery`, `hospital`, `hotel`, `industrial`, `kindergarten`, `library`, `marina`, `military`, `national_park`, `nature_reserve`, `neighbourhood`, `orchard`, `other`, `park`, `pedestrian`, `pier`, `pitch`, `platform`, `playground`, `post_office`, `protected_area`, `railway`, `recreation_ground`, `residential`, `runway`, `school`, `stadium`, `supermarket`, `taxiway`, `townhall`, `university`, `zoo` |              |
| `sport`     |            string            |  Which sports are played on a pitch. |

_NOTE: Additional keys are available for each original OSM tags (when available), but those will be deprecated in the next major version so should not be used for styling._

## natural

Polygons from OpenStreetMap, from a curated subset of natural and landuse tags, for all zooms.

<MaplibreMap/>

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `wood`, `glacier`, `grass`, `scrub`, `sand`, `wetland`, `bare_rock`, `forest`, `meadow`, `grass`  |              |

_NOTE: It's recommended to pair with **landcover** layer polygons from Daylight at low-zooms._

## physical_line

::: warning
physical_line will be deprecated in v4.0.
:::

## physical_point

::: warning
physical_point will be deprecated in v4.0.
:::

## places

Points from OpenStreetMap and Natural Earth, from a curated subset of place tags, for all zooms.


| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `country`, `region`, `locality`, `macrohood`, `neighbourhood`  |              |
| `pmap:kind_detail` |  `city`, `country`, `hamlet`, `neighbourhood`, `province`, `quarter`, `scientific_station`, `state`, `town`, `village`  |              |
| `capital` |  string  |              |
| `population` |  int  |              |
| `pmap:population_rank` |  int  |              |
| `wikidata` |  string  |              |

_NOTE: Additional keys are available for each original OSM tags (when available), but those will be deprecated in the next major version so should not be used for styling._

## pois

Points from OpenStreetMap, from a curated subset of aeroway, amenity, attraction, boundary, craft, highway, historic, landuse, leisure, natural, railway, shop, tourism tags, for all zooms.

| Key         |   Values  |  Description |
| ----------- | :-------: | -----------: |
| `pmap:kind` |  `aerodrome`, `adult_gaming_centre`, `airfield`, `alpine_hut`, `amusement_ride`, `animal`, `art`, `artwork`, `atm`, `attraction`, `atv`, `baby_hatch`, `bakery`, `bbq`, `beauty`, `bed_and_breakfast`, `bench`, `bicycle_parking`, `bicycle_rental`, `bicycle_repair_station`, `boat_storage`, `bookmaker`, `books`, `bureau_de_change`, `bus_stop`, `butcher`, `cafe`, `camp_site`, `car_parts`, `car_rental`, `car_repair`, `car_sharing`, `car_wash`, `car`, `carousel`, `cemetery`, `chalet`, `charging_station`, `childcare`, `clinic`, `clothes`, `college`, `computer`, `convenience`, `customs`, `dentist`, `district`, `doctors`, `dog_park`, `drinking_water`, `emergency_phone`, `fashion`, `firepit`, `fishing`, `florist`, `forest`, `fuel`, `gambling`, `garden_centre`, `gift`, `golf_course`, `golf`, `greengrocer`, `grocery`, `guest_house`, `hairdresser`, `hanami`, `harbourmaster`, `hifi`, `hospital`, `hostel`, `hotel`, `hunting_stand`, `information`, `jewelry`, `karaoke_box`, `karaoke`, `landmark`, `library`, `life_ring`, `lottery`, `marina`, `maze`, `memorial`, `military`, `mobile_phone`, `money_transfer`, `motorcycle_parking`, `motorcycle`, `national_park`, `naval_base`, `newsagent`, `optician`, `park`, `parking`, `perfumery`, `picnic_site`, `picnic_table`, `pitch`, `playground`, `post_box`, `post_office`, `ranger_station`, `recycling`, `roller_coaster`, `sanitary_dump_station`, `school`, `scuba_diving`, `shelter`, `ship_chandler`, `shower`, `slipway`, `snowmobile`, `social_facility`, `stadium`, `stationery`, `studio`, `summer_toboggan`, `supermarket`, `swimming_area`, `taxi`, `telephone`, `tobacco`, `toilets`, `townhall`, `trail_riding_station`, `travel_agency`, `university`, `viewpoint`, `waste_basket`, `waste_disposal`, `water_point`, `water_slide`, `watering_place`, `wayside_cross`, `wilderness_hut`   |              |
| `cuisine`   |  string  |              |
| `religion`  |  string  |              |
| `sport`     |  string  |              |
| `iata`      |  string  |              |

_NOTE: The list of kind values is not comprehensive as some raw OSM tag values are passed through in the current version._

## roads

Lines from OpenStreetMap, from a curated subset of highway tags, for mid- and high-zooms.

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
