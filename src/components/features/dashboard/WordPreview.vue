<template>
  <div
    class="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 sm:grid-cols-3 mt-10 gap-6 p-2 md:p-6 lg:p-8 w-full"
  >
    <template v-if="status === 'success' && localData">
      <PreviewCard
        v-for="w in localData.words"
        :key="w.word.wordContent"
        :translation="{
          word: w.word.wordContent,
          sense: w.word.senses[0].sense,
          currentLanguage: w.word.format?.split('-')[0],
          targetLanguage: w.word.format?.split('-')[1]
        }"
      />
    </template>

    <template v-if="status === 'loading'">
      <div
        v-for="n in limit"
        :key="n"
        class="bg-white/10 tw-animate-pulse rounded-xl aspect-h-3 aspect-w-4"
      ></div>
    </template>
  </div>

  <FancyPagination v-if="data?.totalPages && data?.totalPages > 0" :totalPages="data?.totalPages" />
</template>

<script lang="ts" setup>
import FancyPagination from '@/components/shared/FancyPagination.vue';
import { t } from '@/constants';
import type { WordPreview } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { useQuery } from '@tanstack/vue-query';
import { useMediaQuery } from '@vueuse/core';
import { computed, inject, provide, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import PreviewCard from './PreviewCard.vue';

const router = useRouter();
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const practiceStatus = inject('practiceStatus');
const localData = ref<{ words: { word: WordPreview }[]; totalPages: number } | null>(null);

const page = computed(() => {
  const _page_ = router.currentRoute.value.query?.page;
  return _page_ ? _page_ : 1;
});

const tag = computed(() => {
  const _tag_ = router.currentRoute.value.query?.tag;
  return _tag_ ? _tag_ : undefined;
});

const limit = computed(() => {
  return isLargeScreen.value ? 18 : 20;
});

const { status, data, refetch } = useQuery<{ words: { word: WordPreview }[]; totalPages: number }>({
  queryKey: ['fetching-word-preview'],
  queryFn: async () => {
    return await (
      await axiosClient.get(`/users/word-preview`, {
        withCredentials: true,
        params: {
          //@ts-ignore
          status: t[practiceStatus.value],
          limit: limit.value,
          page: page.value,
          tag: tag.value
        }
      })
    ).data;
  },
  onSuccess: (data) => {
    localData.value = data;
  }
});

watch([page, tag], () => {
  refetch();
});

watch(
  //@ts-ignore
  () => practiceStatus.value,
  () => {
    refetch();
  }
);

//use for optimistic delete in preview-card
provide('wordsPreview', localData);
provide('refetchWordsPreview', refetch);

onMounted(() => {
  if (data.value) {
    localData.value = data.value;
  }
});
</script>
