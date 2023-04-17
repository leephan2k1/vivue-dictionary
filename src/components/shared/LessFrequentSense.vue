<template>
  <div class="w-full md:w-[70%] rounded-xl p-4 space-y-4">
    <div class="flex space-x-4 items-center my-6">
      <HeroiconsArrowTrendingDown20Solid />
      <h2>Bản dịch ít thường xuyên hơn</h2>
    </div>

    <div v-if="props.isLoading" class="w-full flex gap-4 flex-wrap">
      <span
        v-for="n in 5"
        :key="n"
        class="bg-gray-800 tw-animate-pulse w-[13rem] h-[4.5rem] rounded-xl"
      ></span>
    </div>
    <div v-else class="w-full flex gap-4 flex-wrap">
      <span
        v-for="sense in props.less_frequent_senses"
        :key="sense"
        class="border border-gray-600 w-fit p-2 rounded-xl hover:border-main hover:text-main"
        >{{ sense }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeroiconsArrowTrendingDown20Solid from '@/components/icons/HeroiconsArrowTrendingDown20Solid.vue';

const props = defineProps<{ isLoading: boolean; less_frequent_senses: string[] }>();
</script>
