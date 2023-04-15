<template>
  <div class="relative mt-4 flex items-center justify-between mx-auto w-fit p-4 space-x-8">
    <h3 :key="store.pair.current_language" class="min-w-[25px] animate__pulse animate__animated">
      {{ store.pair.current_language }}
    </h3>

    <button @click="store.switchLanguage" class="px-6 smooth-effect hover:bg-black rounded-xl">
      <SolarArrowToDownLeftLinear class="rotate-[-90deg]" />
      <SolarArrowToDownLeftLinear class="rotate-[90deg]" />
    </button>

    <h3 :key="store.pair.target_language" class="min-w-[25px] animate__pulse animate__animated">
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
