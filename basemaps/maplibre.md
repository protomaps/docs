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

The `sprite` key references a URL specific to one of [the default themes](/basemaps/themes):

```js
sprite: "https://protomaps.github.io/basemaps-assets/sprites/v3/light"
```

These are required for townspots, highway shields and point of interest icons.

## Loading styles as JSON

Because [MapLibre styles](https://maplibre.org/maplibre-style-spec/) are JSON documents, the simplest way to define a style in your application is with static JSON. You can use the `Get style JSON` feature of [maps.protomaps.com](maps.protomaps.com) to generate static JSON for a specific theme and style package version.

## Creating styles programatically

For more control and less code, you can add use the [`protomaps-themes-base`](https://www.npmjs.com/package/protomaps-themes-base) NPM package as a dependency.

### Using the npm package

```bash
npm install protomaps-themes-base
```

```js
import layers from 'protomaps-themes-base';
```

```js
style: {
    version: 8,
    glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v3/light",
    sources: {
        "protomaps": {
            type: "vector",
            url: "pmtiles://https://example.com/example.pmtiles",
            //       ^-- Remember to prefix the URL with pmtiles://
            attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
    },
    layers: layers("protomaps","light")
}
```

the default export from `protomaps-themes-base` is a function that takes 2 arguments:

* the source name of the basemap, like `protomaps` in the `sources` example above.

* the [theme](/basemaps/themes), one of `light`, `dark`, `white`, `black`, `grayscale`.

### Using a CDN

Loading the `protomaps-themes-base` package from NPM will define the `protomaps_themes_base` global variable.

```html
<script src="https://unpkg.com/protomaps-themes-base@3/dist/protomaps-themes-base.js" crossorigin="anonymous"></script>
```

```js
layers: protomaps_themes_base.default("protomaps","light")
````
