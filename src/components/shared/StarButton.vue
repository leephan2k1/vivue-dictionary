<template>
  <button @click="handleToggleStar" class="p-4" v-tippy="'Lưu vào luyện tập'">
    <StarIcon v-if="!isStar" class="w-8 h-8" />
    <StarIconSolid v-else class="w-8 h-8 text-main" />
  </button>

  <StarOptions :open="openOptions" @set-open="handleSetOpen" @on-mutate="handleOnMutate" />
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import StarOptions from './StarOptions.vue';
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import getAPIUrl from '@/utils/getAPIUrl';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { useSession } from '@/stores/userSession';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter();
const session = useSession();
const openOptions = ref(false);
const isStar = ref(false);

const { word } = router.currentRoute.value.params;

const { refetch, data } = useQuery({
  queryKey: ['fetching-fv-status', word],
  queryFn: async () => {
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
    if (data) {
      isStar.value = true;
    }
  }
});

onMounted(() => {
  //get from cache
  if (data.value) {
    isStar.value = true;
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
