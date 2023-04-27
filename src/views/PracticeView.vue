<template>
  <component
    :is="`container`"
    class="mt-6 py-6 min-h-screen overflow-y-hidden md:pb-0 pb-32 px-3overflow-x-hidden"
  >
    <component :is="`logo`" class="text-4xl" />

    <PracticeMenu />
    <!-- nested components are here:  -->
    <RouterView />
  </component>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import PracticeMenu from '@/components/shared/PracticeMenu.vue';
</script>
