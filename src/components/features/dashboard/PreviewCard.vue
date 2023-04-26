<template lang="">
  <div
    @click="handleGoToDictionaryView"
    class="bg-black rounded-xl aspect-h-3 aspect-w-4 group cursor-pointer"
  >
    <div class="full-size p-6 flex flex-col space-y-2">
      <div class="flex justify-between items-center">
        <div class="space-x-2 flex items-center text-content md:text-xl text-lg">
          <span>{{ t[props.translation.currentLanguage] }}</span>
          <ArrowLongRightIcon class="w-6 h-6" />
          <span>{{ t[props.translation.targetLanguage] }}</span>
        </div>
      </div>

      <h3 class="line-clamp-1 md:text-2xl text-xl">{{ props.translation.word }}</h3>
      <h3 class="text-content line-clamp-1 md:text-2xl text-xl">{{ props.translation.sense }}</h3>

      <div class="justify-end lg:hidden flex group-hover:flex smooth-effect">
        <button
          @click.stop="handleDeleteWord"
          class="w-fit p-2 hover:bg-gray-800 rounded-full animate__zoomIn animate__animated animate__faster"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLongRightIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import type { TranslationHistory } from '@/types/app';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import { axiosClient } from '@/utils/httpClient';
import { toast } from 'vue-sonner';
import { inject } from 'vue';

const props = defineProps<{
  translation: TranslationHistory;
}>();
const router = useRouter();
const wordsPreview = inject('wordsPreview');
const refetchWordsPreview = inject('refetchWordsPreview');
const refetchDashboard = inject('refetchDashboard');

const { mutate: deleteFvWord } = useMutation({
  mutationKey: ['delete-fv-word'],
  mutationFn: async ({ word }: { word: string }) => {
    return await (
      await axiosClient.delete(`/users/favorite`, {
        data: { word },
        withCredentials: true
      })
    ).data;
  },
  onError: () => {
    if (refetchWordsPreview && typeof refetchWordsPreview === 'function') refetchWordsPreview();
  },
  onSuccess: () => {
    if (refetchWordsPreview && typeof refetchWordsPreview === 'function') refetchWordsPreview();
    if (refetchDashboard && typeof refetchDashboard === 'function') refetchDashboard();
  }
});

const handleGoToDictionaryView = () => {
  router.push({
    name: 'dictionary',
    params: { word: props.translation.word },
    query: {
      pair: `${props.translation.currentLanguage}-${props.translation.targetLanguage}`
    }
  });
};

const handleDeleteWord = () => {
  //@ts-ignore
  wordsPreview.value.words = wordsPreview.value.words.filter(
    (e: any) => e.word.wordContent !== props.translation.word
  );

  toast.success(`Xoá từ ${props.translation.word} thành công!`);

  deleteFvWord({ word: props.translation.word });
};

const t: { [key: string]: string } = {
  en: 'Anh',
  vi: 'Việt'
};
</script>
