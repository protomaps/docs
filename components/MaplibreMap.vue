<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { ref, onMounted, onUpdated, watch } from "vue";
import { default as layers } from "protomaps-themes-base";
import { language_script_pairs } from "protomaps-themes-base";
import { useData } from "vitepress";

const { isDark } = useData();

const mapRef = ref(null);
var map;

const lang = ref("en");
const currentZoom = ref(0);

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

const style = (passedTheme?: string, highlightLayer?: string, lang?: lang) => {
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
    sprite: `https://protomaps.github.io/basemaps-assets/sprites/v4/${theme}`,
    sources: {
      protomaps: {
        type: "vector",
        url: "https://api.protomaps.com/tiles/v4.json?key=e6cd5633d51d8e24",
      },
    },
    transition: {
      duration: 0,
    },
    layers: layers("protomaps", theme, lang).concat(
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
  langSelect?: boolean;
  showZoom?: boolean;
}>();

onMounted(() => {
  if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.js",
      false,
    );
  }
  currentZoom.value = props.zoom;
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

  map.on("zoom", () => {
    currentZoom.value = map.getZoom().toFixed(2);
  })
});

watch([isDark, lang], () => {
  map.setStyle(style(props.theme, props.highlightLayer, lang.value));
});

language_script_pairs.sort((a, b) => a.full_name.localeCompare(b.full_name));
</script>

<template>
  <select v-if="props.langSelect" v-model="lang">
    <option
      v-for="option in language_script_pairs"
      :key="option.lang"
      :value="option.lang"
    >
      {{ option.full_name }}
    </option>
  </select>
  <div class="map-container">
    <div ref="mapRef" class="maplibre-map"></div>
    <div v-if="props.showZoom" class="zoom-display">z={{ currentZoom }}</div>
  </div>
</template>

<style>
@import "maplibre-gl/dist/maplibre-gl.css";
</style>

<style>
.map-container {
  position:relative;
}

.maplibre-map {
  height: 300px;
  width: 100%;
}

.zoom-display {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
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

.dark .maplibregl-ctrl-attrib, .dark .zoom-display {
  background-color: hsla(0, 0%, 0%, 0.5);
}
.dark .maplibregl-ctrl-attrib a {
  color: rgba(235, 235, 245, 0.6);
}

select {
  background: var(--vp-sidebar-bg-color);
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
