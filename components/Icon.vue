<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from "vue";

const canvasRef = ref(null);

const props = defineProps<{
  kind?: string;
  sprites?: Promise<[any, any]>;
}>();

onMounted(async () => {
  const ctx = canvasRef.value.getContext("2d");
  const [j, i] = await props.sprites;
  if (props.kind in j) {
    const data = j[props.kind];
    ctx.drawImage(i, data.x, data.y, data.width, data.height, 0, 0, 38, 38);
  } else {
    ctx.strokeStyle = "steelblue";
    ctx.setLineDash([2, 2]);
    ctx.strokeWidth = 2;
    ctx.rect(0,0,38,38);
    ctx.stroke();
  }
});
</script>

<template>
  <canvas ref="canvasRef" width="38" height="38"></canvas>
</template>

<style scoped>
canvas {
  width: 19px;
  height: 19px;
}
</style>
