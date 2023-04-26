<template lang="">
  <div class="w-[25rem] h-[15rem] bg-black rounded-2xl absolute-center flex-col">
    <h2>{{ props.title }}</h2>
    <CountUp :end-val="data" duration="1"></CountUp>
  </div>
</template>

<script lang="ts" setup>
import CountUp from 'vue-countup-v3';

const props = defineProps<{ title: string; data: number }>();
</script>
