---
title: What is Protomaps?
outline: deep
---
<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
  import { useData } from 'vitepress'
  const { frontmatter } = useData()
</script>

# {{ frontmatter.title }}

<MaplibreMap/>
