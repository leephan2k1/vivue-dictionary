import { DEFAULT_PRACTICE_SETTINGS, t } from '@/constants';
import type { Practice } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { useQuery } from '@tanstack/vue-query';
import { useStorage } from '@vueuse/core';
import { ref } from 'vue';

export function useFetchPracticeWords() {
  const page = ref(1);

  const practiceSettings = useStorage('practiceSettings', DEFAULT_PRACTICE_SETTINGS);

  return {
    page,
    query: useQuery<{ practices: Practice[]; totalPages: number }>({
      queryKey: ['fetching-practice-words', page],
      queryFn: async () => {
        return await (
          await axiosClient.get(`/users/practice`, {
            withCredentials: true,
            params: {
              page: page.value,
              tags: practiceSettings.value.tags.join('+'),
              status: ['chưa học']
                .concat(practiceSettings.value.states)
                .map((e) => t[e.toLowerCase()])
                .join('+')
            }
          })
        ).data;
      }
    })
  };
}
