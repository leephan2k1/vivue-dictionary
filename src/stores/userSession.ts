import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import type { SessionStatus } from '@/types/app';
import axios from 'axios';
import getAPIUrl from '@/utils/getAPIUrl';
import type { User } from '@/types/app';

export const useSession = defineStore('userSession', () => {
  const status = ref<SessionStatus>('loading');
  const user = ref<User | null>(null);

  onMounted(async () => {
    status.value = 'loading';
    try {
      const { data } = await axios.get(`${getAPIUrl()}/api/auth/user`, { withCredentials: true });

      user.value = data;
      status.value = 'authenticated';
    } catch (error) {
      status.value = 'unauthenticated';
    }
  });

  return { status, user };
});
