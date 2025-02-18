---
title: Basemaps for MapLibre
outline: deep
---

# Basemaps for MapLibre

## Assets

To render a full basemap, you'll need not only a style and a tileset, but also MapLibre [fontstack](https://maplibre.org/maplibre-style-spec/glyphs/) and [spritesheet](https://maplibre.org/maplibre-style-spec/sprite/) assets.

The assets referenced by the `glyphs` and `sprite` style properties can be downloaded as ZIP files at the [basemaps-assets](http://github.com/protomaps/basemaps-assets) repository, if you need to host them yourself or offline.

### Fonts

The `glyphs` key references a URL hosting pre-compiled fontstacks, required for displaying text labels in MapLibre. Fontstacks can be created with the [font-maker](https://github.com/maplibre/font-maker) tool.

```js
glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf'
```

When a style layer defines a `text-font` like `Noto Sans Regular`, this will create requests for a URL like `https://protomaps.github.io/basemaps-assets/fonts/Noto%20Sans%20Regular/0-255.pbf`.


You can view a list of available fonts [in the GitHub repository](https://github.com/protomaps/basemaps-assets/tree/main/fonts).

### Sprites

The `sprite` key references a URL specific to one of [the default flavors](/basemaps/flavors):

```js
sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light"
```

These are required for townspots, highway shields and point of interest icons.

## Loading styles as JSON

Because [MapLibre styles](https://maplibre.org/maplibre-style-spec/) are JSON documents, the simplest way to define a style in your application is with static JSON. You can use the `Get style JSON` feature of [maps.protomaps.com](https://maps.protomaps.com) to generate static JSON for a specific flavor and style package version.

## Creating styles programatically

For more control and less code, you can add use the [`@protomaps/basemaps`](https://www.npmjs.com/package/@protomaps/basemaps) NPM package as a dependency.

### Using the npm package

```bash
npm install @protomaps/basemaps
```

```js
import { layers, namedFlavor } from '@protomaps/basemaps';
```

```js
style: {
    version: 8,
    glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    sources: {
        "protomaps": {
            type: "vector",
            url: "pmtiles://https://example.com/example.pmtiles",
            //       ^-- Remember to prefix the URL with pmtiles://
            attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
    },
    layers: layers("protomaps",namedFlavor("light"),{lang:"en"})
}
```

the `layers` from `@protomaps/basemaps` is a function that takes 3 arguments:

* the source name of the basemap, like `protomaps` in the `sources` example above.

* A [flavor object](/basemaps/flavors); the defaults can be fetched `namedFlavor` with `light`, `dark`, `white`, `black`, `grayscale`.

* An options object: to display labels. pass a `lang` key. Pass `labelsOnly` to display only labels.

### Using a CDN

Loading the `@protomaps/basemaps` package from NPM will define the `basemaps` global variable.

```html
<script src="https://unpkg.com/@protomaps/basemaps@5/dist/basemaps.js" crossorigin="anonymous"></script>
```

```js
layers: basemaps.layers("protomaps",basemaps.namedFlavor("light"),{lang:"en"})
````
