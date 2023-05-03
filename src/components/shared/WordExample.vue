<template>
  <div
    class="w-full md:w-[70%] rounded-xl px-6 py-3 bg-black relative min-h-[10rem] overflow-hidden"
  >
    <div class="absolute right-0 top-0">
      <ChatsIconSolidBlur />
    </div>

    <div class="flex space-x-4 items-center">
      <ChatsIconSolid class="text-3xl" />
      <h1>Ví dụ</h1>
    </div>

    <template v-if="props.isLoading">
      <div
        v-for="n in 4"
        :key="n"
        class="bg-gray-800 tw-animate-pulse h-[50px] w-full rounded-xl mt-6"
      ></div>
    </template>
    <div v-else v-auto-animate>
      <div v-for="(item, index) in currentExample" :key="item.keyword_en" class="my-8">
        <Highlighter
          class="mt-4 block"
          highlightClassName="text-main bg-main/20 p-2 rounded-xl"
          :searchWords="[String(item?.keyword_vi)]"
          :autoEscape="true"
          :textToHighlight="`${index + 1} ${item.vi}`"
        />

        <Highlighter
          class="mt-4 block text-content"
          highlightClassName="text-main bg-main/20 p-2 rounded-xl"
          :searchWords="[String(item?.keyword_en)]"
          :autoEscape="true"
          :textToHighlight="item.en"
          :findChunks="findChunksAtBeginningOfWords"
        />
      </div>
    </div>

    <div v-if="props.examples.length > 4" class="w-full absolute-center">
      <button @click="handleAddMoreExamples" class="flex flex-col items-center">
        <span> {{ page === Math.ceil(props.examples.length / 4) ? 'Thu gọn' : 'Xem thêm' }}</span>
        <HeroiconsChevronDown
          :class="page === Math.ceil(props.examples.length / 4) && 'rotate-[180deg]'"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatsIconSolid from '@/components/icons/ChatsIconSolid.vue';
import ChatsIconSolidBlur from '@/components/icons/ChatsIconBlur.vue';
import Highlighter from 'vue-highlight-words';
import HeroiconsChevronDown from '@/components/icons/HeroiconsChevronDown.vue';
import type { Example } from '@/types/app';
import { ref, watch } from 'vue';
import { findChunksAtBeginningOfWords } from '@/utils/stringHelper';

const props = defineProps<{ isLoading: boolean; examples: Example[] }>();
const page = ref(1);
const currentExample = ref<Example[]>([]);

watch(
  () => props.examples,
  () => {
    page.value = 1;
    currentExample.value = [...props.examples].slice(page.value - 1, page.value * 4);
  },
  { immediate: true }
);

const handleAddMoreExamples = () => {
  ++page.value;

  if (page.value <= Math.ceil(props.examples.length / 4)) {
    currentExample.value = [
      ...currentExample.value,
      ...[...props.examples].slice((page.value - 1) * 4, page.value * 4)
    ];
  } else {
    currentExample.value = [...props.examples].slice(0, 4);
    page.value = 1;
  }
};
</script>
