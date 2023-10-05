---
title: Vector Basemap Layers
description: customizing your vector basemaps
---

# Layers (Version 2)

## Intro

Every feature in a map tile belongs to one **layer** as defined in the [MVT vector tile specification.](https://github.com/mapbox/vector-tile-spec)

Every feature may have any number of **tags** expressed as key-value pairs. Keys are always strings; values may be strings, integers or decimal numbers. In order to capture the full range of data in OpenStreetMap, feature tags in Protomaps are a *schemaless* system; some keys may only be present in a subset of features. 

To aid cartographic design, certain special keys prefixed with `pmap:` are included.

The organization of features with layers and tags is specific to Protomaps services; this means that map styles are not directly portable with other systems such as [OpenMapTiles](https://openmaptiles.org/schema/) or [Mapzen tiles](https://tilezen.readthedocs.io/en/latest/). The organization of features as described here, independent of any particular implementation, download, or service, is published under a [CC0 license](https://creativecommons.org/publicdomain/zero/1.0/).

## Name Tags

`name:` tags are always included. Keys that begin with `name` such as `name:en` or `name:es` for multilingual names are also included.


## Basemap Layers

### natural

This layer contains **▩ polygons** of physical features like forests, wetlands and glaciers.

#### Conditions

- `natural in wood, glacier, scrub, sand, wetland, bare_rock`

- `landuse in forest, meadow`

- `boundary in national_park,protected_area `

#### Keys

`natural`, `boundary`, `landuse`

### landuse

This layer contains **▩ polygons** of manmade features like parks, schools and farms as well as abstract residential areas.

#### Conditions

- `aeroway`: `aerodrome`, `runway`

- `area:aeroway`: `taxiway`, `runway`

- `amenity`: `hospital`, `school`, `kindergarten`, `university`, `college`

- `landuse`: `recreation_ground`, `industrial`, `brownfield`, `railway`, `cemetery`, `commercial`, `grass`, `orchard`, `farmland`

- `leisure`: `park`, `garden`, `golf_course`, `residential`, `dog_park`, `playground`, `pitch`

- `man_made`: `pier`

- `place`: `neighbourhood`

- `railway`: `platform`

- `highway = pedestrian AND area=yes`

- `highway = footway AND area=yes`

- `man_made = bridge AND area=yes`

#### Keys

`landuse`, `leisure`, `aeroway`, `area:aeroway`, `amenity`, `highway`, `man_made`, `place`, `railway`, `sport`

### water

This layer contains **▩ polygons** of lakes, oceans, wide rivers, and manmade bodies of water such as pools and reservoirs.

#### Conditions

- `has water`

- `has waterway`

- `natural = water`

- `landuse = reservoir`

- `leisure = swimming_pool`

#### Keys
`natural`, `landuse`, `leisure`, `water`, `waterway`

### buildings
This layer contains **▩ polygon** features for manmade buildings.

#### Conditions
- `has building`

#### Keys

`height`,`building:part`,`layer`

### physical_line

This layer contains **⟋ lines** of physical features such as embankments and waterway centerlines.

#### Conditions

- `has waterway AND waterway not in riverbank, reservoir`

- `natural in strait, cliff`

#### Keys

- `waterway,natural`

- `pmap:kind IN waterway, natural`

### roads

This layer contains **⟋ line** features of manmade roads.

#### Conditions

- `has highway AND highway not in construction, proposed`

#### Keys

- `highway`,`bridge`,`tunnel`,`layer`,`oneway`,`ref`

- `pmap:level in 1, 0, -1` for bridges, ground level or tunnels

- `pmap:kind in highway, major_road, medium_road, minor_road, other`

### transit

This layer contains **⟋ line** features for railways, runways and other features used by non-private vehicles.

#### Conditions

- `has railway AND railway not in abandoned,construction,platform,proposed`

- `aerialway = cable_car`

- `route = ferry`

- `aeroway in runway, taxiway`

#### Keys

- `railway`,`route`,`aeroway`,`service`,`aerialway`,`network`,`ref`,`highspeed`,`layer`

- `pmap:kind in aeroway,railway,ferryway,aerialway,other`

### boundaries

This layer contains **⟋ lines**  for human-defined administrative boundaries such as countries and states.

#### Conditions

- `boundary=adminstrative AND natural!=coastline AND maritime!=yes`

#### Keys

- `pmap:min_admin_level`

### places

This layer contains **• points** for neighborhoods, cities, countries and neighborhoods, useful for labeling.

#### Conditions

- `has place`

#### Keys

- `place`, `country_code_iso3166_1_alpha_2`, `population`, `capital`

- `pmap:kind in neighbourhood,city,country,state`

- `pmap:rank in 1,2`

### physical_point

This layer contains **• points** for natural features such as mountain peaks or labels for seas.

#### Conditions

- `place in sea, ocean`

- `natural=peak`

#### Keys

`place`,`natural`,`ele`

### pois

This layer contains **• points** for points of interests such as transit stations and amenities.

#### Conditions

- `has amenity`

- `has shop`

- `has tourism`

- `railway=station`

#### Keys

`amenity`,`shop`,`railway`,`cuisine`,`religion`,`tourism`
