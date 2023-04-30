<template>
  <div
    ref="container"
    class="mx-auto mt-10 lg:w-[40%] justify-center md:w-[50%] w-[86%] flex gap-4 flex-wrap z-20"
  >
    <div v-if="searchResultStore.status === 'loading'" class="dot-falling"></div>

    <div
      v-if="searchResultStore.result.length > 0"
      class="rounded-2xl w-full max-h-[30vh] overflow-x-hidden overflow-y-scroll flex flex-col p-4 space-y-4 bg-black"
    >
      <RouterLink
        v-for="word in searchResultStore.result"
        :key="word"
        @click="emit('onSelectWord')"
        :to="{
          name: 'dictionary',
          params: { word },
          query: {
            pair: `${t[languagePairStore.pair.current_language]}-${
              t[languagePairStore.pair.target_language]
            }`
          }
        }"
        class="text-content smooth-effect hover:bg-gray-800 px-4 py-2 rounded-2xl"
        >{{ word }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchResult } from '@/stores/searchResult';
import { RouterLink } from 'vue-router';
import { useLanguagePair } from '@/stores/languages';
import { t } from '@/constants';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const container = ref(null);

const emit = defineEmits(['onSelectWord']);

const languagePairStore = useLanguagePair();
const searchResultStore = useSearchResult();

onClickOutside(container, () => {
  emit('onSelectWord');
  searchResultStore.result = [];
});
</script>
