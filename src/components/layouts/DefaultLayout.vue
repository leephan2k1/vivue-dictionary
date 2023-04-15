<template>
  <div class="w-full min-h-screen bg-main-background text-white font-main">
    <HeaderView />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import HeaderView from '../partials/HeaderView.vue';
</script>
