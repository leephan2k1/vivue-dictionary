<script setup lang="ts">
import { computed } from 'vue';
import { PUBLIC_LAYOUT } from '@/constants';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

// support by assign global component
const layout = computed(() => (route.meta.layout || PUBLIC_LAYOUT) + '-layout');
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
