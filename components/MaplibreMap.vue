<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { ref, onMounted, onUpdated, watch } from "vue";
import { default as layers } from "protomaps-themes-base";
import { useData } from "vitepress";

const { isDark } = useData();

const mapRef = ref(null);
var map;

const tableFromProps = (props: unknown) => {
  let tableHTML = "<table>";

  Object.entries(props).forEach(([key, value]) => {
    tableHTML += `
      <tr>
        <td>${key}</td>
        <td>${typeof value === "boolean" ? JSON.stringify(value) : value}</td>
      </tr>`;
  });

  tableHTML += "</table>";
  return tableHTML;
};

const highlightLayers = (sourceName: string, highlightName?: string) => {
  if (!highlightName) return [];
  return [
    {
      id: "highlight_circle",
      type: "circle",
      filter: ["==", ["geometry-type"], "Point"],
      source: sourceName,
      "source-layer": highlightName,
      paint: {
        "circle-color": "steelblue",
        "circle-opacity": 0.7,
      },
    },
    {
      id: "highlight_stroke",
      type: "line",
      filter: ["==", ["geometry-type"], "LineString"],
      source: sourceName,
      "source-layer": highlightName,
      paint: {
        "line-color": "steelblue",
        "line-opacity": 0.7,
      },
    },
    {
      id: "highlight_fill",
      type: "fill",
      filter: ["==", ["geometry-type"], "Polygon"],
      source: sourceName,
      "source-layer": highlightName,
      paint: {
        "fill-color": "steelblue",
        "fill-opacity": 0.7,
      },
    },
  ];
};

const style = (passedTheme?: string, highlightLayer?: string) => {
  const theme =
    passedTheme ||
    (isDark.value
      ? highlightLayer
        ? "black"
        : "dark"
      : highlightLayer
      ? "white"
      : "light");
  return {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: `https://protomaps.github.io/basemaps-assets/sprites/v3/${theme}`,
    sources: {
      protomaps: {
        type: "vector",
        url: "https://api.protomaps.com/tiles/v4.json?key=e6cd5633d51d8e24",
      },
    },
    transition: {
      duration: 0,
    },
    layers: layers("protomaps", theme).concat(
      highlightLayers("protomaps", highlightLayer),
    ),
  };
};

const props = defineProps<{
  theme?: string;
  highlightLayer?: string;
  center?: number;
  zoom?: number;
  lat?: number;
  lng?: number;
}>();

onMounted(() => {
  if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.js",
      false,
    );
  }
  map = new maplibregl.Map({
    container: mapRef.value,
    style: style(props.theme, props.highlightLayer),
    cooperativeGestures: true,
    attributionControl: false,
    center: props.lng && props.lat ? [props.lng, props.lat] : [0, 0],
    zoom: props.zoom || 0,
  });
  map.addControl(new maplibregl.AttributionControl({ compact: false }));

  const popup = new maplibregl.Popup({
    className: "docs-popup",
    closeButton: false,
    closeOnClick: false,
  });

  map.on(
    "mouseenter",
    ["highlight_circle", "highlight_stroke", "highlight_fill"],
    (e) => {
      map.getCanvas().style.cursor = "pointer";
      const properties = e.features[0].properties;
      popup.setLngLat(e.lngLat).setHTML(tableFromProps(properties)).addTo(map);
    },
  );

  map.on(
    "mouseleave",
    ["highlight_circle", "highlight_stroke", "highlight_fill"],
    () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    },
  );
});

watch(isDark, () => {
  map.setStyle(style(props.theme, props.highlightLayer));
});
</script>

<template>
  <div ref="mapRef" class="maplibre-map"></div>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";
</style>

<style>
.maplibre-map {
  height: 300px;
  width: 100%;
}

.docs-popup .maplibregl-popup-content {
  padding: 4px;
}

.dark .docs-popup .maplibregl-popup-content {
  background-color: rgb(22, 22, 24);
}

.dark .docs-popup .maplibregl-popup-tip {
  border-top-color: rgb(22, 22, 24);
  border-bottom-color: rgb(22, 22, 24);
}

.dark .maplibregl-ctrl-attrib {
  background-color: hsla(0, 0%, 0%, 0.5);
}
.dark .maplibregl-ctrl-attrib a {
  color: rgba(235, 235, 245, 0.6);
}
</style>
