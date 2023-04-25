<template>
  <button
    @click="handleToggleStar"
    class="p-4"
    v-tippy="'Lưu vào luyện tập'"
    :disabled="localStatus === 'loading'"
  >
    <StarIcon v-if="!isStar" class="w-8 h-8" />
    <StarIconSolid v-else class="w-8 h-8 text-main" />
  </button>

  <StarOptions :open="openOptions" @set-open="handleSetOpen" @on-mutate="handleOnMutate" />
</template>

<script lang="ts" setup>
import { useSession } from '@/stores/userSession';
import getAPIUrl from '@/utils/getAPIUrl';
import { StarIcon } from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import { useMutation, useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import StarOptions from './StarOptions.vue';
import type { FetchingStatus } from '@/types/app';

const router = useRouter();
const session = useSession();
const openOptions = ref(false);
const isStar = ref(false);
const localStatus = ref<FetchingStatus>('idle');

const { word } = router.currentRoute.value.params;

const { refetch } = useQuery({
  queryKey: ['fetching-fv-status', word],
  queryFn: async () => {
    localStatus.value = 'loading';
    return await (
      await axios.get(`${getAPIUrl()}/api/users/favorite`, {
        withCredentials: true,
        params: {
          word
        }
      })
    ).data;
  },
  enabled: session.status === 'authenticated',
  onSuccess: (data) => {
    localStatus.value = 'success';
    if (data) {
      isStar.value = true;
    }
  },
  onError: () => {
    localStatus.value = 'error';
  }
});

const { mutate: deleteFvWord } = useMutation({
  mutationKey: ['delete-fv-word'],
  mutationFn: async () => {
    return await (
      await axios.delete(`${getAPIUrl()}/api/users/favorite`, {
        data: { word },
        withCredentials: true
      })
    ).data;
  },
  onError: () => {
    toast.error('Xoá thất bại! Thử lại sau!');
  }
});

//fetch status info for toggle star icon
watch(
  () => session.status,
  () => {
    if (session.status === 'authenticated') {
      refetch();
    }
  }
);

const handleOnMutate = (state: boolean) => {
  isStar.value = state;
};

const handleSetOpen = (state: boolean) => {
  openOptions.value = state;
};

const handleToggleStar = () => {
  if (!isStar.value) {
    openOptions.value = true;
  } else {
    isStar.value = false;
    //delete fv word:
    deleteFvWord();
    toast.success('Xoá khỏi luyện tập thành công!');
  }
};
</script>
