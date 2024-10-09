<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from "vue";
import { useData } from "vitepress";
const { isDark } = useData();

const canvasRef = ref(null);

const props = defineProps<{
  kind: string;
  sprites: Promise<[unknown, HTMLImageElement, unknown, HTMLImageElement]>;
}>();

const drawIcon = async () => {
  const ctx = canvasRef.value.getContext("2d");
  ctx.clearRect(0,0,38,38);
  const sprites = await props.sprites;
  const json = isDark.value ? sprites[2] : sprites[0];
  const image = isDark.value ? sprites[3] : sprites[1];

  if (props.kind in json) {
    const data = json[props.kind];
    ctx.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, 38, 38);
  } else {
    ctx.strokeStyle = "steelblue";
    ctx.setLineDash([2, 2]);
    ctx.strokeWidth = 4;
    ctx.rect(0, 0, 38, 38);
    ctx.stroke();
  }
};

onMounted(async () => {
  drawIcon();
});

watch(isDark, () => {
  drawIcon();
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
