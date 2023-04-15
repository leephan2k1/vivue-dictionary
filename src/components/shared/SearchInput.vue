<template>
  <div class="w-full flex items-center justify-center mt-20 z-20">
    <div
      class="px-4 rounded-2xl overflow-hidden lg:w-[30%] md:w-[50%] w-[70%] flex items-center space-x-2 bg-black text-[#9ca3af]"
    >
      <input
        type="text"
        @input="handleChange"
        v-model="searchValue"
        placeholder="Tìm kiếm từ vựng..."
        class="rounded-xl py-4 bg-transparent w-full focus:px-2 smooth-effect focus:placeholder:text-transparent"
      />

      <button
        v-if="searchValue.length > 0"
        @click="handleClearContent"
        class="p-3 mr-4 animate__fadeIn animate__animated animate__faster"
      >
        <HeroiconsXCircle class="text-content text-4xl font-bold" />
      </button>
      <HeroiconsMagnifyingGlassSolid />
    </div>

    <button
      @click="handleGetClipboardValue"
      class="p-5 md:p-4 ml-4 bg-black rounded-xl"
      v-tippy="'Dán'"
    >
      <HeroiconsClipboard />
    </button>
  </div>
</template>

<script lang="ts" setup>
import HeroiconsClipboard from '@/components/icons/HeroiconsClipboard.vue';
import HeroiconsMagnifyingGlassSolid from '@/components/icons/HeroiconsMagnifyingGlassSolid.vue';
import HeroiconsXCircle from '@/components/icons/HeroiconsXCircle.vue';
import { t } from '@/constants';
import { useLanguagePair } from '@/stores/languages';
import getAPIUrl from '@/utils/getAPIUrl';
import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';
import axios from 'axios';
import { ref, watch, onUnmounted, watchEffect } from 'vue';
import { toast } from 'vue-sonner';
import { useSearchResult } from '@/stores/searchResult';

const API_END_POINT = getAPIUrl();
const searchResultStore = useSearchResult();
const languageStore = useLanguagePair();
const searchValue = ref('');
const debounceValue = refDebounced(searchValue, 350);

const { refetch, status: fetchingStatus } = useQuery({
  queryKey: ['search-word'],
  queryFn: async function () {
    return await (
      await axios.get(`${API_END_POINT}/api/words/search`, {
        params: {
          word: debounceValue.value,
          format: `${t[languageStore.pair.current_language]}-${
            t[languageStore.pair.target_language]
          }`
        }
      })
    ).data;
  },
  enabled: debounceValue.value.length > 0 && debounceValue.value,
  onSuccess: (data) => {
    searchResultStore.setResult(data.words);
    searchResultStore.setStatus('success');
  },
  onError: () => {
    searchResultStore.setStatus('error');
  }
});

watch(debounceValue, () => {
  if (debounceValue.value.length > 0) refetch();
});

watchEffect(() => {
  if (fetchingStatus.value !== 'loading') {
    searchResultStore.setStatus(fetchingStatus.value);
  }
});

onUnmounted(() => {
  searchResultStore.setResult([]);
  searchResultStore.setStatus('idle');
});

const handleChange = () => {
  searchResultStore.setResult([]);
  searchResultStore.setStatus('loading');
};

const handleClearContent = () => {
  searchResultStore.setResult([]);
  searchValue.value = '';
};

const handleGetClipboardValue = async () => {
  handleChange();
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
