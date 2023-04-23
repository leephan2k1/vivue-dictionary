<template>
  <button @click="handleShowInput" v-if="!showInput">
    <EllipsisHorizontalIcon class="w-6 h-6" />
  </button>

  <input
    v-if="showInput"
    ref="inputRef"
    autofocus
    type="number"
    min="{1}"
    class="rounded-xl h-[3.6rem] w-[3.6rem] py-2 px-3 bg-black text-xl"
    @keyup.enter="handleSetPage"
  />
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';

const emits = defineEmits(['updatePageValue']);

const inputRef = ref<HTMLInputElement | null>(null);
const showInput = ref(false);

const handleShowInput = () => {
  showInput.value = true;
};

const handleSetPage = () => {
  if (inputRef.value) {
    emits('updatePageValue', inputRef.value?.value);
  }
};

watchEffect(() => {
  if (showInput.value) {
    inputRef.value && inputRef.value.focus();
  }
});

onClickOutside(inputRef, () => {
  showInput.value = false;
});
</script>
