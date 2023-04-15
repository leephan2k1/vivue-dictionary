<template>
  <div class="w-full flex items-center justify-center mt-20">
    <div
      class="px-4 rounded-2xl overflow-hidden lg:w-[30%] md:w-[50%] w-[70%] flex items-center space-x-2 bg-black text-[#9ca3af]"
    >
      <input
        type="text"
        v-model="searchValue"
        placeholder="Tìm kiếm từ vựng..."
        class="rounded-xl py-4 bg-transparent w-full z-20 focus:px-2 smooth-effect focus:placeholder:text-transparent"
      />
      <HeroiconsMagnifyingGlassSolid />
    </div>

    <button
      @click="handleGetCliboardValue"
      class="p-5 md:p-4 ml-4 bg-black rounded-xl z-20"
      v-tippy="'Dán'"
    >
      <HeroiconsClipboard />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HeroiconsMagnifyingGlassSolid from '@/components/icons/HeroiconsMagnifyingGlassSolid.vue';
import HeroiconsClipboard from '@/components/icons/HeroiconsClipboard.vue';
import { toast } from 'vue-sonner';

const searchValue = ref('');

const handleGetCliboardValue = async () => {
  try {
    const text = await navigator.clipboard?.readText();

    if (text) {
      searchValue.value = text;
    }
  } catch (error) {
    toast.error('Firefox hoặc trình duyệt bạn đang dùng không hỗ trợ dán link!');
  }
};
</script>

<style lang=""></style>
