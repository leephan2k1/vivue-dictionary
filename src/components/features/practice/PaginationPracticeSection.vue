<template>
  <div class="flex space-x-4 mt-6">
    <button
      @click="handleNagivatePage('prev')"
      class="hover:outline hover:outline-2 hover:outline-main py-3 px-4 rounded-xl items-center bg-black flex space-x-2 border-2 border-white/20"
    >
      <ChevronLeftIcon class="w-6 h-6" />
      <span>Nhóm từ trước</span>
    </button>
    <button
      @click="handleNagivatePage('next')"
      class="hover:outline hover:outline-2 hover:outline-main py-3 px-4 rounded-xl items-center bg-black flex space-x-2 border-2 border-white/20"
    >
      <span>Nhóm từ tiếp theo</span>
      <ChevronLeftIcon class="w-6 h-6 rotate-[180deg]" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

const emits = defineEmits(['onUpdatePage']);

const handleNagivatePage = (direction: 'next' | 'prev') => {
  emits('onUpdatePage', direction);
};
</script>
