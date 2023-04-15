<template>
  <div class="mx-auto mt-10 lg:w-[40%] justify-center md:w-[50%] w-[86%] flex gap-4 flex-wrap z-20">
    <div v-if="searchResultStore.status === 'loading'" class="dot-falling"></div>

    <div
      v-if="searchResultStore.result.length > 0"
      class="rounded-2xl w-full max-h-[30vh] overflow-x-hidden overflow-y-scroll flex flex-col p-4 space-y-4 bg-black"
    >
      <span
        v-for="word in searchResultStore.result"
        :key="word"
        class="cursor-pointer text-content smooth-effect hover:bg-gray-800 px-4 py-2 rounded-2xl"
        >{{ word }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchResult } from '@/stores/searchResult';

const searchResultStore = useSearchResult();
</script>
