<template>
  <RouterLink to="/">
    <h1 class="font-bold text-center font-sans dictionary-title z-20">Từ điển ViVue</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.dictionary-title {
  background: -webkit-linear-gradient(315deg, #42d392 50%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
