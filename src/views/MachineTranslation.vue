<template>
  <component :is="`container`" class="mt-6 py-6 min-h-[calc(100vh-7rem)] md:pb-0 pb-32 px-3">
    <component :is="`logo`" class="text-4xl" />

    <div class="flex items-center space-x-4 md:px-20 lg:px-32 mt-6">
      <button
        @click.stop="handleSelectSource('google')"
        class="absolute-center space-x-2 p-3 bg-black rounded-xl min-h-[4.5rem] smooth-effect outline outline-[1.8px] outline-main"
      >
        <SimpleIconsGoogletranslate class="text-3xl text-blue-400" />
        <span>Google translate</span>
      </button>

      <!-- <button
        :key="source"
        @click.stop="handleSelectSource('glosbe')"
        :class="`${source === 'glosbe' && 'outline outline-[1.8px] outline-main'}`"
        class="absolute-center space-x-2 p-3 bg-black rounded-xl min-h-[4.5rem] smooth-effect"
      >
        <GlosbeLogo />
        <span>Glosbe</span>
      </button> -->
    </div>

    <div class="flex md:flex-row flex-col mt-6 gap-4 relative h-fit justify-center">
      <TranslateInput
        @on-typing="onTyping"
        @clear-text="handleClearText"
        class="w-full md:w-[40%]"
      />

      <div class="overflow-hidden absolute-center">
        <div
          :class="(isTyping || localStatus === 'loading') && 'animate-spin text-main'"
          class="px-6 smooth-effect rounded-xl z-30"
        >
          <SolarArrowToDownLeftLinear class="rotate-[-90deg] text-4xl font-bold" />
          <SolarArrowToDownLeftLinear class="rotate-[90deg] text-4xl font-bold" />
        </div>
      </div>

      <TranslateResult
        class="w-full md:w-[40%]"
        :result="resultTranslation ? resultTranslation[source] : ''"
      />
    </div>
  </component>
</template>

<script lang="ts" setup>
import GlosbeLogo from '@/components/icons/GlosbeLogo.vue';
import SimpleIconsGoogletranslate from '@/components/icons/SimpleIconsGoogletranslate.vue';
import SolarArrowToDownLeftLinear from '@/components/icons/SolarArrowToDownLeftLinear.vue';
import TranslateInput from '@/components/shared/TranslateInput.vue';
import TranslateResult from '@/components/shared/TranslateResult.vue';
import { t } from '@/constants';
import { useLanguagePair } from '@/stores/languages';
import type { FetchingStatus, Source } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';
import { ref, watch } from 'vue';

const sentence = ref('');
const isTyping = ref(false);
const localStatus = ref<FetchingStatus>('idle');
const source = ref<Source>('google');
const resultTranslation = ref<{ glosbe: string; google: string } | null>(null);
const languagesStore = useLanguagePair();

const debounceValue = refDebounced(sentence, 500);

const { refetch } = useQuery({
  queryKey: ['fetching-sentence-sense'],
  queryFn: async () => {
    return await (
      await axiosClient.post(
        `/words/machine_translation?format=${t[languagesStore.pair.current_language]}-${
          t[languagesStore.pair.target_language]
        }`,
        {
          sentence: debounceValue.value
        }
      )
    ).data;
  },
  onSuccess: (data) => {
    resultTranslation.value = data;
    localStatus.value = 'success';
  },
  onError: () => {
    localStatus.value = 'error';
  },
  enabled: Boolean(debounceValue.value && debounceValue.value.length > 0)
});

const handleClearText = () => {
  resultTranslation.value = null;
  sentence.value = '';
};

const onTyping = (state: boolean, value: string) => {
  isTyping.value = state;
  sentence.value = value;
};

const handleSelectSource = (src: Source) => {
  source.value = src;
};

watch(
  () => debounceValue.value,
  () => {
    localStatus.value = 'loading';
    if (debounceValue.value && debounceValue.value.length > 0) {
      refetch();
    } else {
      localStatus.value = 'idle';
    }
  }
);
</script>
