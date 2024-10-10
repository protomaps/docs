---
title: PMTiles for MapLibre GL
outline: deep
---

# PMTiles for MapLibre GL

## Installation

For reading PMTiles directly from cloud storage, you'll need the `pmtiles` JavaScript library.

The JavaScript library includes a plugin for MapLibre GL that uses its [`addProtocol` feature.](https://maplibre.org/maplibre-gl-js/docs/API/functions/addProtocol/)

```bash
npm install pmtiles
```

```js
import { Protocol } from "pmtiles";
```

```js
let protocol = new Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);
```

```json{5}
{
  "sources": {
    "protomaps": {
        "type": "vector",
        "url": "pmtiles://https://example.com/example.pmtiles",
    }
  }
}
```

Using the `pmtiles://` protocol will automatically derive a `minzoom` and `maxzoom` for your `Source`.

## React

`addProtocol` works best if it is **only called once** in the lifecycle of your application. A way to accomplish this in React is with a hook like this at the **root component:**

```js
import maplibregl from 'maplibre-gl';
import { Protocol } from 'pmtiles';

...

useEffect(() => {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles",protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    }
  }, []);
```

See this [CodeSandbox example](https://codesandbox.io/s/black-dream-oycvf2?file=/src/App.js) for a minimal working setup.

## Raster or Terrain PMTiles

For raster tiles you'll just need to change the `type` of your source to `raster`:

```json{5}
{
  "sources": {
    "protomaps": {
        "type": "raster",
        "url": "pmtiles://https://example.com/example.pmtiles",
    }
  }
}
```

Protomaps also distributes terrain tilesets in the [Terrarium RGB encoding](https://github.com/tilezen/joerd/blob/master/docs/formats.md). These have a special source type in MapLibre GL:


```json{5}
{
  "sources": {
    "protomaps": {
        "type": "raster-dem",
        "url": "pmtiles://https://example.com/example.pmtiles",
        "encoding": "terrarium"
    }
  }
}
```
