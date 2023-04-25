<template>
  <div class="flex flex-col">
    <div class="flex space-x-4 items-center">
      <h3 class="text-content">{{ props.language }}</h3>
      <StarButton v-if="props.language === 'English' && status === 'success'" />
    </div>

    <div class="flex items-center space-x-4 mt-4">
      <div
        v-if="isLoading"
        class="tw-animate-pulse bg-gray-800 w-[150px] h-[30px] rounded-xl"
      ></div>
      <h1 v-else class="text-4xl font-bold">{{ props.word }}</h1>

      <span
        v-if="props.language === 'English' && props.isLoading"
        class="tw-animate-pulse bg-gray-800 w-[40px] h-[30px] rounded-xl"
      ></span>

      <template v-if="props.typesOfWord && props.typesOfWord?.length > 0">
        <span
          v-for="tWord in props.typesOfWord"
          :key="tWord"
          class="p-2 text-main rounded-2xl outline outline-2 outline-main/40"
          >{{ tWord }}</span
        >
      </template>
    </div>

    <div class="w-[15rem] my-4" v-if="props.language === 'English'">
      <SelectSource
        :sources="sources"
        button-styles="bg-black"
        @source-change="handleSourceChange"
      />
    </div>

    <div v-if="props.language === 'English'" class="flex items-center space-x-4 mt-4 text-content">
      <template v-if="status === 'loading' || localStatus === 'loading'">
        <template v-for="n in 2" :key="n">
          <button>
            <SolarVolumeLoudBold class="lg:text-3xl text-4xl" />
          </button>
          <span class="tw-animate-pulse bg-gray-800 w-[70px] h-[24px] rounded-xl"></span>
        </template>
      </template>

      <template v-if="status === 'success' && audios && audios.length > 0">
        <template v-for="a in audios" :key="a?.author">
          <span>{{ shortHandAuthor(a?.author) }}</span>
          <button class="hover:text-main smooth-effect" @click="handlePlayAudio(a.url)">
            <SolarVolumeLoudBold class="lg:text-3xl text-4xl" />
          </button>
          <span>{{ a?.phrase }}</span>

          <button
            @click="() => (openAudioModel = true)"
            v-if="source === 'glosbe'"
            v-tippy="'Xem thêm'"
          >
            <PlusCircleIcon class="w-6 h-6" />
          </button>
        </template>
      </template>
    </div>
  </div>

  <AudioModel
    :audios="audiosData?.audios || []"
    :open="openAudioModel"
    @set-open="(state) => (openAudioModel = state)"
  />
</template>

<script lang="ts" setup>
import SolarVolumeLoudBold from '../icons/SolarVolumeLoudBold.vue';
import SelectSource from '@/components/shared/SelectSource.vue';
import StarButton from './StarButton.vue';
import getAPIUrl from '@/utils/getAPIUrl';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import type { Audio, FetchingStatus, Source } from '@/types/app';
import { ref, watch } from 'vue';
import { PlusCircleIcon } from '@heroicons/vue/20/solid';
import AudioModel from './AudioModel.vue';
import { toast } from 'vue-sonner';
import { sources } from '@/constants';

const props = defineProps<{
  language: string;
  word: string;
  isLoading: boolean;
  typesOfWord?: string[];
}>();

const API_END_POINT = getAPIUrl();
const audios = ref<Audio[]>([]);
const localStatus = ref<FetchingStatus>('idle');
const source = ref<Source>('cambridge');
const openAudioModel = ref(false);

const {
  status,
  refetch,
  data: audiosData
} = useQuery<{ audios: Audio[] }>({
  queryKey: [`fetching-audio`, props.word],
  queryFn: async () => {
    return await (
      await axios.get(`${API_END_POINT}/api/words/audio/${encodeURIComponent(props.word)}`, {
        params: { source: source.value }
      })
    ).data;
  },
  onSuccess: (data) => {
    if (source.value === 'glosbe') {
      audios.value = data.audios[0] ? [data.audios[0]] : [];
    } else {
      audios.value = data.audios;
    }

    localStatus.value = 'success';
  },
  enabled: props.language === 'English'
});

const handlePlayAudio = (src: string) => {
  try {
    const audio = new Audio(src);
    audio.play();
  } catch (error) {
    toast.error('Xảy ra lỗi! Thử lại sau bạn nhé!');
  }
};

const handleSourceChange = (src: Source) => {
  source.value = src;
};

const shortHandAuthor = (author: string) => {
  if (!author) return;

  if (author.includes('English')) return 'UK';
  if (author.includes('American')) return 'US';

  return author;
};

watch([() => props.word, () => source.value], () => {
  localStatus.value = 'loading';
  audios.value = [];
  refetch();
});
</script>
