<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { ref, onMounted, onUpdated, watch } from "vue";
import { default as layers } from "protomaps-themes-base";
import { useData } from "vitepress";

const { isDark } = useData();

const mapRef = ref(null);
var map;

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
      },
    },
  ];
};

const style = (passedTheme?: string, highlightLayer?: string) => {
  const theme = passedTheme || (isDark.value ? "dark" : "light");
  return {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: `https://protomaps.github.io/basemaps-assets/sprites/v3/${theme}`,
    sources: {
      protomaps: {
        type: "vector",
        url: "https://api.protomaps.com/tiles/v3.json?key=e6cd5633d51d8e24",
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
}>();

onMounted(() => {
  map = new maplibregl.Map({
    container: mapRef.value,
    style: style(props.theme, props.highlightLayer),
    cooperativeGestures: true,
    attributionControl: false,
  });
  map.addControl(new maplibregl.AttributionControl({ compact: false }));
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

<style scoped>
.maplibre-map {
  height: 300px;
  width: 100%;
}
</style>
