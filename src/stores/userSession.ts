import type { SessionStatus, User } from '@/types/app';
import { axiosClient } from '@/utils/httpClient';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

export const useSession = defineStore('userSession', () => {
  const router = useRouter();
  const status = ref<SessionStatus>('loading');
  const user = ref<User | null>(null);

  onMounted(async () => {
    status.value = 'loading';
    try {
      const { data } = await axiosClient.get(`/auth/user`, { withCredentials: true });

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

      await axiosClient.get(`/logout`, { withCredentials: true });

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
