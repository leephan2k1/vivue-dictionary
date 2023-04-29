<template>
  <div class="relative flex items-center justify-between w-fit overflow-hidden space-x-8 z-30">
    <h3
      :key="store.pair.current_language"
      :class="`${
        store.pair.current_language === 'English' ? 'animate__slideInDown' : 'animate__slideInUp'
      }`"
      class="min-w-[25px] animate__animated"
    >
      {{ store.pair.current_language }}
    </h3>

    <button @click="store.switchLanguage" class="px-6 smooth-effect hover:bg-black rounded-xl">
      <SolarArrowToDownLeftLinear class="rotate-[-90deg]" />
      <SolarArrowToDownLeftLinear class="rotate-[90deg]" />
    </button>

    <h3
      :key="store.pair.target_language"
      :class="`${
        store.pair.current_language === 'English' ? 'animate__slideInUp' : 'animate__slideInDown'
      }`"
      class="min-w-[25px] animate__animated"
    >
      {{ store.pair.target_language }}
    </h3>
  </div>
</template>

<script lang="ts" setup>
import SolarArrowToDownLeftLinear from '@/components/icons/SolarArrowToDownLeftLinear.vue';
import { useLanguagePair } from '@/stores/languages';

const store = useLanguagePair();
</script>

<style lang=""></style>
