<template>
  <div
    ref="target"
    class="w-full md:w-[70%] rounded-xl px-6 py-3 bg-black relative min-h-[10rem] overflow-hidden"
  >
    <div class="absolute right-0 top-0">
      <DocumentsIconBlurSolid />
    </div>

    <div class="flex space-x-4 items-center">
      <DocumentsIconSolid class="text-3xl" />
      <h1>Ngữ pháp</h1>
    </div>

    <template v-if="status === 'loading' || localStatus === 'loading'">
      <div
        v-for="n in 4"
        :key="n"
        class="bg-gray-800 tw-animate-pulse h-[50px] w-full rounded-xl mt-6"
      ></div>
    </template>
    <template v-if="status === 'success' && localData?.grammars && localData?.grammars.length > 0">
      <p v-for="grammar in localData.grammars" :key="grammar" class="mt-6">- {{ grammar }}</p>
    </template>

    <p class="mt-6" v-if="data?.grammars && data.grammars.length === 0 && status === 'success'">
      Từ vựng này chưa có ngữ pháp
    </p>
  </div>
</template>

<script lang="ts" setup>
import DocumentsIconSolid from '@/components/icons/DocumentsIconSolid.vue';
import type { FetchingStatus } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { useQuery } from '@tanstack/vue-query';
import { useIntersectionObserver } from '@vueuse/core';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import DocumentsIconBlurSolid from '../icons/DocumentsIconBlurSolid.vue';

const refWord = ref('');
const target = ref(null);
const targetIsVisible = ref(false);
const router = useRouter();
const localStatus = ref<FetchingStatus>('idle');
const localData = ref<{ grammars: string[] }>({ grammars: [] });

const wordParam = computed(() => {
  return String(router.currentRoute.value.params?.word);
});

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
});

const { status, refetch, data } = useQuery<{ grammars: string[] }>({
  queryKey: ['fetch-grammars'],
  queryFn: async () => {
    return await (
      await axiosClient.get(`/words/grammar/${encodeURIComponent(wordParam.value)}`)
    ).data;
  },
  enabled: targetIsVisible.value,
  onSuccess: (data) => {
    localStatus.value = 'success';
    localData.value = data;
  }
});

// refresh state & data when router change
watch(
  () => router.currentRoute.value,
  () => {
    localStatus.value = 'loading';
    localData.value = { grammars: [] };
  }
);

// just fetching when user scroll to grammar section
watchEffect(() => {
  if (targetIsVisible.value && refWord.value !== wordParam.value) {
    refetch();
    refWord.value = wordParam.value;
  }
});
</script>
