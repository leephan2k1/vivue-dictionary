import { useQuery } from '@tanstack/vue-query';
import { axiosClient } from '@/utils/httpClient';
import { useStorage } from '@vueuse/core';
import { t } from '@/constants';
import type { Practice } from '@/types/app';
import { ref } from 'vue';

export function useFetchPracticeWords() {
  const page = ref(1);
  const DEFAULT_STATES = ['Khó nhớ', 'Tạm quên', 'Đã nhớ'];

  const practiceSettings = useStorage('practiceSettings', {
    practiceOrder: 'Ngẫu nhiên',
    practiceFormat: 'en-vi',
    tags: [],
    states: DEFAULT_STATES
  });

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
