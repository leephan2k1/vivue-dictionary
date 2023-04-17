<template>
  <div class="flex w-full flex-col mt-4 space-y-8">
    <WordContent
      :language="t[pair[0]]"
      :is-loading="isLoading"
      :word="pair[0] === 'en' && data ? data.wordContent : wordParam"
      :types-of-word="pair[0] === 'en' ? data?.typesOfWord : []"
    />
    <WordContent
      :language="t[pair[1]]"
      :is-loading="isLoading"
      :types-of-word="pair[1] === 'en' ? data?.typesOfWord : []"
      :word="data?.senses[0].sense || ''"
    />

    <template v-if="!data || isLoading">
      <div
        v-for="n in 3"
        :key="n"
        class="w-full min-h-[15rem] lg:w-[50%] md:w-[70%] rounded-xl p-4 space-y-4 bg-gray-800 tw-animate-pulse"
      ></div>
    </template>
    <template v-else>
      <WordSense v-for="item in data.senses" :word-sense="item" :key="item.sense" />
    </template>

    <LessFrequentSense
      :is-loading="isLoading"
      :less_frequent_senses="data?.less_frequent_senses || []"
    />

    <SimilarPhrase :is-loading="isLoading" :similar_phrases="data?.similar_phrases || []" />

    <WordExample
      v-if="data"
      :is-loading="isLoading"
      :key="data?.examples.length"
      :examples="data.examples"
    />

    <WordGrammar />
  </div>
</template>

<script lang="ts" setup>
import type { FetchingStatus, Word } from '@/types/app';
import getAPIUrl from '@/utils/getAPIUrl';
import axios from 'axios';
import LessFrequentSense from './LessFrequentSense.vue';
import SimilarPhrase from './SimilarPhrase.vue';
import WordContent from './WordContent.vue';
import WordExample from './WordExample.vue';
import WordGrammar from './WordGrammar.vue';
import WordSense from './WordSense.vue';

import { t } from '@/constants';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const API_END_POINT = getAPIUrl();
const router = useRouter();
const localStatus = ref<FetchingStatus>('idle');

const pair = computed(() => {
  const languages = router.currentRoute.value.query?.pair;
  return String(languages).split('-');
});

const wordParam = computed(() => {
  return String(router.currentRoute.value.params?.word);
});

const { data, status, refetch } = useQuery<Word>({
  queryKey: ['word-detail', wordParam.value],
  queryFn: async () => {
    return await (
      await axios.get(
        `${API_END_POINT}/api/words/translate/${encodeURIComponent(String(wordParam.value))}`,
        {
          params: {
            format: router.currentRoute.value.query?.pair
          }
        }
      )
    ).data;
  },
  onSuccess: () => {
    localStatus.value = 'success';
  }
});

watch(
  () => router.currentRoute.value,
  () => {
    localStatus.value = 'loading';
    refetch();
  }
);

onMounted(() => {
  localStatus.value = 'loading';
});

const isLoading = computed(() => {
  return status.value === 'loading' || !data.value || localStatus.value === 'loading';
});
</script>
