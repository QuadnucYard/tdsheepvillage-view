<template>
  <div class="tower-info" :style="{ color: colorFromUint(tower.color) }">
    <p v-for="(line, i) in tower.skillInfo.split('\n')" :key="i">{{ line }}</p>
  </div>
</template>

<script setup lang="ts">
import { Tower } from "@/tdsheep/module/unit/Tower";
import { colorFromUint } from "@/utils/colorful";

defineProps<{ tower: Tower }>();
</script>

<style scoped>
.tower-info {
  line-height: 1em;
}
</style>
