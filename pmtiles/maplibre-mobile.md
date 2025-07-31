---
title: PMTiles for MapLibre GL on Mobile
outline: deep
---

# PMTiles for MapLibre GL

Support for PMTiles has been build directly into recent versions of MapLibre GL.

PMTiles is designed to be read directly in the browser by the MapLibre GL renderer, for either thematic overlay tilesets or basemap tilesets.

PMTiles can be used directly in maplibre by installing a using a relatively new version of the library with support built in.

- Android: [v11.8.0](https://github.com/maplibre/maplibre-native/releases/tag/android-v11.8.0)
- iOS: [v6.1.0.1](https://github.com/maplibre/maplibre-native/releases/tag/ios-v6.10.0)
- React Native: [v10.1.0](https://github.com/maplibre/maplibre-react-native/releases)


## React Native

It's worth pointing out that React Native MapLibre is using the iOS/Android versions of MapLibre under the hood which has slightly different APIs than the javascript API on web. Simply use the `pmtiles://...` url directly in react native, there is no need for plugins:

```js
import {
  LineLayer,
  MapView,
  VectorSource,
} from "@maplibre/maplibre-react-native";

export function ExampleMap() {
  return (
    <MapView style={{ flex: 1 }}>
      <VectorSource
        id="fireCentreSource"
        url="pmtiles://https://nrs.objectstore.gov.bc.ca/lwzrin/psu/pmtiles/fireCentres.pmtiles"
      >
        <LineLayer
          id="border-fire-centres"
          sourceLayerID="tippecanoe_input"
          style={{ lineColor: "red" }}
        />
      </VectorSource>
    </MapView>
  );
}
```
