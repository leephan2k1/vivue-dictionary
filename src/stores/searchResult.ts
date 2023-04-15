import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FetchingStatus } from '@/types/app';

export const useSearchResult = defineStore('searchResult', () => {
  const result = ref<string[]>([]);
  const status = ref<FetchingStatus>('idle');

  const setResult = (data: string[]) => {
    result.value = data;
  };

  const setStatus = (st: FetchingStatus) => {
    status.value = st;
  };

  return { result, setResult, status, setStatus };
});
