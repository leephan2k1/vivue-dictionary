import { useQuery } from '@tanstack/vue-query';
import { axiosClient } from '@/utils/httpClient';

export function useDashboardData({ statusParam }: { statusParam: string }) {
  const query = useQuery({
    queryKey: ['fetching-dashboard-data'],
    queryFn: async () => {
      return await (
        await axiosClient.get(`/users/dashboard`, {
          withCredentials: true,
          params: {
            status: statusParam
          }
        })
      ).data;
    }
  });

  return query;
}
