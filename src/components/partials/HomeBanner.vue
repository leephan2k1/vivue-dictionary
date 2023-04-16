<template>
  <!-- 5 rem is header's height  -->
  <section class="relative w-full h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
    <LogoView class="text-7xl mt-20" />

    <h2 class="text-center my-4 z-20">
      Cho người Việt, hỗ trợ bởi
      <a href="https://vuejs.org" target="_blank" class="hover:text-main smooth-effect">VueJS</a>
    </h2>

    <MaterialSymbolsTranslateRounded
      class="text-[300px] absolute right-5 top-[-60px] rotate-[-30deg] text-white/25 z-10"
    />
    <SolarNotebookMinimalisticLineDuotone
      class="text-white/25 text-[300px] bottom-[-60px] -left-11 absolute rotate-[30deg] z-10"
    />
    <slot />
  </section>
</template>

<script lang="ts" setup>
import MaterialSymbolsTranslateRounded from '@/components/icons/MaterialSymbolsTranslateRounded.vue';
import SolarNotebookMinimalisticLineDuotone from '@/components/icons/SolarNotebookMinimalisticLineDuotone.vue';
import LogoView from '../shared/LogoView.vue';
</script>
