<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { ref, onMounted, onUpdated, watch } from "vue";
import { default as layers } from "protomaps-themes-base";
import { useData } from "vitepress";

const { isDark } = useData();

const mapRef = ref(null);
var map;

const style = () => {
  return {
    version: 8,
    glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
    sources: {
      protomaps: {
        type: "vector",
        tiles: [
          "https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=e6cd5633d51d8e24",
        ],
        maxzoom: 15,
      },
    },
    transition: {
      duration: 0,
    },
    layers: layers("protomaps", isDark.value ? "dark" : "light")
  };
};

onMounted(() => {
  map = new maplibregl.Map({
    container: mapRef.value,
    style: style(),
    cooperativeGestures: true,
  });
});

watch(isDark, () => {
  map.setStyle(style());
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
