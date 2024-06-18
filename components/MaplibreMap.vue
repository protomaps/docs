<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { ref, onMounted, onUpdated, watch } from "vue";
import { default as layers } from "protomaps-themes-base";
import { useData } from "vitepress";

const { isDark } = useData();

const mapRef = ref(null);
var map;

const style = (passedTheme: string) => {
  const theme = passedTheme || (isDark.value ? "dark" : "light");
  return {
    version: 8,
    glyphs: "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite: `https://protomaps.github.io/basemaps-assets/sprites/v3/${theme}`,
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
    layers: layers("protomaps", theme),
  };
};

const props = defineProps<{
  theme: string;
}>();

onMounted(() => {
  map = new maplibregl.Map({
    container: mapRef.value,
    style: style(props.theme),
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
