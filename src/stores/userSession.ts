import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import type { SessionStatus } from '@/types/app';
import axios from 'axios';
import getAPIUrl from '@/utils/getAPIUrl';
import type { User } from '@/types/app';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

export const useSession = defineStore('userSession', () => {
  const router = useRouter();
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

  const logout = async () => {
    const fallback = user.value;
    try {
      status.value = 'unauthenticated';
      user.value = null;

      await axios.get(`${getAPIUrl()}/api/logout`, { withCredentials: true });

      router.push({ name: 'home' });
    } catch (error) {
      toast.error('Oops!, có gì đó không đúng? Thử lại nhé :>');
      console.error(error);
      //reverse value
      status.value = 'authenticated';
      user.value = fallback;
    }
  };

  return { status, user, logout };
});
