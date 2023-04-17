<template>
  <Toaster position="top-center" theme="dark" />
  <div class="w-full min-h-screen bg-main-background text-gray-300 font-main">
    <HeaderView />
    <slot />

    <MobileMenu />
  </div>
</template>

<script lang="ts" setup>
import HeaderView from '../partials/HeaderView.vue';
import MobileMenu from '../shared/MobileMenu.vue';
import { Toaster } from 'vue-sonner';
</script>
