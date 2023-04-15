<template>
  <div class="mt-4 flex items-center justify-between mx-auto w-fit p-4 space-x-8">
    <h3>English</h3>

    <button class="px-6 smooth-effect hover:bg-black rounded-xl">
      <SolarArrowToDownLeftLinear class="rotate-[-90deg]" />
      <SolarArrowToDownLeftLinear class="rotate-[90deg]" />
    </button>

    <h3>Tiếng Việt</h3>
  </div>
</template>

<script lang="ts" setup>
import SolarArrowToDownLeftLinear from '@/components/icons/SolarArrowToDownLeftLinear.vue';
</script>

<style lang=""></style>
