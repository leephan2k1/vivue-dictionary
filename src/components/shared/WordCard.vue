<template>
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

        <button class="p-2 rounded-full hover:bg-gray-900">
          <StarIcon class="w-6 h-6" />
        </button>
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
import { useSession } from '@/stores/userSession';
import type { TranslationHistory } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { ArrowLongRightIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { StarIcon } from '@heroicons/vue/24/outline';
import { useMutation } from '@tanstack/vue-query';
import { useStorage } from '@vueuse/core';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const localHistory = useStorage<TranslationHistory[]>('translations-history', []);
const props = defineProps<{ translation: TranslationHistory }>();
const fetchHistory = inject('refetchHistory');
const localData = inject<TranslationHistory[] | null>('localData');
const fallbackData = ref<TranslationHistory[]>([]);
const sessionStore = useSession();
const router = useRouter();

const { mutate: deleteWord } = useMutation({
  mutationFn: async ({ word, deleteOption }: { word: string; deleteOption?: string }) => {
    return await (
      await axiosClient.delete(`/users/translation-history`, {
        withCredentials: true,
        data: {
          word,
          deleteOption
        }
      })
    ).data;
  },
  onError: () => {
    //@ts-ignore
    localData.value = fallbackData.value;
    toast.error('Xoá thất bại! Thử lại sau...');
  },
  onSuccess: () => {
    if (fetchHistory && typeof fetchHistory === 'function') fetchHistory();
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
  toast.success(`Xoá từ ${props.translation.word} thành công!`);
  if (sessionStore.status === 'authenticated') {
    //@ts-ignore
    if (localData && localData.value) {
      //@ts-ignore
      fallbackData.value = [...localData.value];
      //@ts-ignore
      localData.value = localData.value.filter((e) => e.word !== props.translation.word);
      deleteWord({ word: props.translation.word });
    }
  } else if (sessionStore.status === 'unauthenticated') {
    //@ts-ignore
    localData.value = localData.value.filter((e) => e.word !== props.translation.word);
    localHistory.value = localHistory.value.filter((e) => e.word !== props.translation.word);
  }
};

const t: { [key: string]: string } = {
  en: 'Anh',
  vi: 'Việt'
};
</script>
