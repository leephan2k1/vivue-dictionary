<template>
  <div v-if="!error" class="flex w-full flex-col mt-4 space-y-8">
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
      :word="data?.senses[0]?.sense || 'Không tìm thấy nghĩa'"
    />

    <p v-if="data?.senses.length === 0">
      Bạn đang cố gắng dịch câu hay từ chuyên ngành? Hãy thử chức năng dịch câu!
    </p>

    <button
      v-if="data && data?.senses.length > 0"
      @click="setOpenEngSenseModal(true)"
      class="absolute-center space-x-2 w-fit p-4 bg-black rounded-xl hover:outline hover:outline-[1.8px] hover:outline-main"
    >
      <PlusCircleIcon class="w-6 h-6" /> <span>Nghĩa Anh</span>
    </button>

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

  <div v-if="error" class="absolute-center flex-col space-y-6 mt-28 px-6">
    <SolarSadSquareLinear class="w-10 h-10 text-rose-400" />
    <h1 class="text-center text-rose-400">Oh không tìm thấy gì cả! Có chắc bạn đã tìm đúng từ?</h1>
  </div>
  <EnglishSenseModal
    :word-in-english="pair[0] === 'en' && data ? data.wordContent : data?.senses[0].sense || ''"
    :open="openEnglishSenseModal"
    @set-open="setOpenEngSenseModal"
  />
</template>

<script lang="ts" setup>
import SolarSadSquareLinear from '@/components/icons/SolarSadSquareLinear.vue';
import type { FetchingStatus, TranslationHistory, Word } from '@/types/app';
import { PlusCircleIcon } from '@heroicons/vue/20/solid';
import { useStorage } from '@vueuse/core';
import EnglishSenseModal from './EnglishSenseModal.vue';
import LessFrequentSense from './LessFrequentSense.vue';
import SimilarPhrase from './SimilarPhrase.vue';
import WordContent from './WordContent.vue';
import WordExample from './WordExample.vue';
import WordGrammar from './WordGrammar.vue';
import WordSense from './WordSense.vue';

import { t } from '@/constants';
import { useSession } from '@/stores/userSession';
import { axiosClient } from '@/utils/httpClient';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const localStatus = ref<FetchingStatus>('idle');
const openEnglishSenseModal = ref(false);
const sessionStore = useSession();

const pair = computed(() => {
  const languages = router.currentRoute.value.query?.pair;
  return String(languages).split('-');
});

const wordParam = computed(() => {
  return String(router.currentRoute.value.params?.word);
});

const { data, status, refetch, error } = useQuery<Word>({
  queryKey: ['word-detail', wordParam.value],
  queryFn: async () => {
    return await (
      await axiosClient.get(`/words/translate/${encodeURIComponent(String(wordParam.value))}`, {
        params: {
          format: router.currentRoute.value.query?.pair
        }
      })
    ).data;
  },
  onSuccess: () => {
    localStatus.value = 'success';
  },
  retry: 2
});

const isLoading = computed(() => {
  return (
    (status.value === 'loading' || !data.value || localStatus.value === 'loading') && !data.value
  );
});

const { mutate: addTranslationHistory } = useMutation({
  mutationFn: ({ payload }: { payload: TranslationHistory }) =>
    axiosClient.post(`/users/translation-history`, payload, { withCredentials: true })
});

const localHistory = useStorage<TranslationHistory[]>('translations-history', []);

//insert word to history local/remote
watch(localStatus, () => {
  if (data.value?.senses.length === 0 || !data.value?.wordContent) return;

  const payload = {
    currentLanguage: pair.value[0],
    targetLanguage: pair.value[1],
    word: data.value?.wordContent,
    sense: data.value?.senses[0].sense
  };

  if (sessionStore.status === 'authenticated' && localStatus.value === 'success') {
    addTranslationHistory({
      payload
    });
  }
  //for unauthenticated
  else if (!localHistory.value.find((e) => e.word === payload.word)) {
    localHistory.value.unshift(payload);
  }
});

const setOpenEngSenseModal = (state: boolean) => {
  openEnglishSenseModal.value = state;
};

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
</script>
