<script setup lang="ts">
import { PUBLIC_LAYOUT } from '@/constants';
import type { TranslationHistory } from '@/types/app';
import { useMutation } from '@tanstack/vue-query';
import { useStorage } from '@vueuse/core';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useSession } from './stores/userSession';
import getAPIUrl from './utils/getAPIUrl';

const route = useRoute();
const session = useSession();
const isUpdateHistory = ref(false);
const localHistory = useStorage<TranslationHistory[]>('translations-history', []);

const { mutate: addTranslationHistory } = useMutation({
  mutationFn: ({ payload }: { payload: TranslationHistory[] }) =>
    axios.post(
      `${getAPIUrl()}/api/users/translation-history`,
      {
        translations_history: payload,
        word: '',
        sense: '',
        targetLanguage: '',
        currentLanguage: ''
      },
      { withCredentials: true }
    ),
  onSuccess: () => {
    isUpdateHistory.value = true;
    localHistory.value = [];
  }
});

// support by assign global component
const layout = computed(() => (route.meta.layout || PUBLIC_LAYOUT) + '-layout');

// update history translations to remote server after login:
watch(
  () => session.status,
  () => {
    if (
      session.status === 'authenticated' &&
      !isUpdateHistory.value &&
      localHistory.value.length > 0
    ) {
      addTranslationHistory({ payload: localHistory.value });
    }
  }
);
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
