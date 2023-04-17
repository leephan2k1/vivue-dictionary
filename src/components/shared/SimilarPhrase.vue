<template>
  <div class="w-full md:w-[70%] rounded-xl p-4 space-y-4">
    <div class="flex space-x-4 items-center">
      <PhSparkle />
      <h2>Cụm từ tương tự</h2>
    </div>

    <template v-if="props.isLoading">
      <p class="h-[2.5rem] w-[25rem] bg-gray-800 tw-animate-pulse rounded-xl"></p>
    </template>
    <template v-else>
      <p v-for="item in props.similar_phrases" :key="item.en">- {{ item.en }}: {{ item.vi }}</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import PhSparkle from '../icons/PhSparkle.vue';
import type { SimilarPhrase } from '@/types/app';

const props = defineProps<{ isLoading: boolean; similar_phrases: SimilarPhrase[] }>();
</script>
