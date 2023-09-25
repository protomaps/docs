<script setup lang="ts">
import { Map } from "maplibre-gl";
import { ref, onMounted } from "vue";

const map = ref(null);

onMounted(() => {
  new Map({
    container: map.value,
    style: "https://demotiles.maplibre.org/style.json"
  });
});
</script>

<template>
  <div ref="map" class="maplibre-map"></div>
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
