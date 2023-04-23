<template>
  <div
    class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 sm:grid-cols-3 mt-10 gap-6 p-2 md:p-6 lg:p-8"
  >
    <template v-if="isLoading">
      <div
        v-for="n in limit"
        :key="n"
        class="bg-white/10 tw-animate-pulse rounded-xl aspect-h-3 aspect-w-4"
      ></div>
    </template>
    <template v-if="!isLoading && props.translations && props.translations.length > 0">
      <WordCard v-for="t in props.translations" :key="t.word" :translation="t" />
    </template>

    <h2
      class="text-center lg:col-span-6 md:col-span-4 col-span-2"
      v-if="!isLoading && props.translations && props.translations.length === 0"
    >
      Bạn chưa có bản dịch nào trong lịch sử!
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import WordCard from './WordCard.vue';
import type { TranslationHistory } from '@/types/app';

const props = defineProps<{
  limit?: number;
  isLoading: boolean;
  translations: TranslationHistory[];
}>();

const limit = computed(() => {
  return props.limit || 18;
});
</script>
