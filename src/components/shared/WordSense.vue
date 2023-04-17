<template>
  <div class="w-full md:w-[70%] border border-dashed border-gray-200 rounded-xl p-4 space-y-4">
    <div class="flex space-x-4 items-center">
      <h2 class="meaning">{{ props.wordSense.sense }}</h2>

      <span
        v-if="props.wordSense?.typeOfWord"
        class="p-2 text-main rounded-2xl outline outline-2 outline-main/40"
      >
        {{ props.wordSense.typeOfWord }}
      </span>
    </div>

    <i v-if="props.wordSense?.category" class="text-lg">{{ props.wordSense.category }}</i>

    <p v-if="props.wordSense.example?.vi">
      {{ props.wordSense.example.vi }}
    </p>
    <p class="text-content" v-if="props.wordSense.example?.en">
      {{ props.wordSense.example?.en }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Sense } from '@/types/app';

const props = defineProps<{ wordSense: Sense }>();
</script>

<style lang="scss" scoped>
.meaning::first-letter {
  text-transform: capitalize;
}
</style>
