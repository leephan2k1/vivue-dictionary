import { useQuery } from '@tanstack/vue-query';
import { axiosClient } from '@/utils/httpClient';
import { ref } from 'vue';
import { t } from '@/constants';

export function useDashboardData() {
  const statusParam = ref('chưa học');

  const query = useQuery({
    queryKey: ['fetching-dashboard-data'],
    queryFn: async () => {
      return await (
        await axiosClient.get(`/users/dashboard`, {
          withCredentials: true,
          params: {
            status: t[statusParam.value]
          }
        })
      ).data;
    }
  });

  return { query, statusParam };
}
