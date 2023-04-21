<template>
  <div class="flex flex-col bg-[#1e1e20] rounded-2xl p-8 relative">
    <textarea
      ref="textarea"
      v-model="input"
      class="bg-[#1e1e20] rounded-2xl text-content w-full md:min-h-[28rem] min-h-[11.2rem]"
      cols="30"
      autofocus
      @input="handleChange"
    >
    </textarea>

    <button
      @click="handleClearText"
      v-if="input && input.length > 0"
      class="absolute top-4 right-4 animate__zoomIn animate__animated animate__faster rounded-full p-3 bg-black/20"
    >
      <XMarkIcon class="w-8 h-8" />
    </button>

    <div class="w-full flex justify-end">
      <button @click="handleGetClipboardValue" class="w-fit rounded-xl p-4 bg-black/20">
        <HeroiconsClipboard class="w-8 h-8" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn, useTextareaAutosize } from '@vueuse/core';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import HeroiconsClipboard from '@/components/icons/HeroiconsClipboard.vue';
import { toast } from 'vue-sonner';

const { textarea, input } = useTextareaAutosize();
const emits = defineEmits(['onTyping', 'clearText']);

const debouncedFn = useDebounceFn(() => {
  emits('onTyping', false, input.value);
}, 800);

const handleGetClipboardValue = async () => {
  try {
    const text = await navigator.clipboard?.readText();

    if (text) {
      input.value = text;
      emits('onTyping', true, text);
      debouncedFn();
    }
  } catch (error) {
    toast.error('Firefox hoặc trình duyệt bạn đang dùng không hỗ trợ dán text!');
  }
};

const handleClearText = () => {
  input.value = '';
  emits('clearText');
};

const handleChange = () => {
  emits('onTyping', true, input.value);
  debouncedFn();
};
</script>
