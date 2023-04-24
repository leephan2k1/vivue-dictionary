<template>
  <component :is="`container`" class="mt-6 py-6 min-h-screen overflow-y-hidden md:pb-0 pb-32 px-3">
    <component :is="`logo`" class="text-4xl" />

    <h2 class="text-center my-6">Các bản dịch đã thực hiện</h2>

    <div class="w-full md:px-6 px-2 flex space-x-4">
      <RouterLink
        :to="{ name: 'login' }"
        v-if="sessionStore.status === 'unauthenticated'"
        class="p-4 flex space-x-2 rounded-xl bg-black w-fit hover:outline hover:outline-main hover:outline-[1.8px]"
      >
        <SolarCloudUploadBold class="text-3xl" />
        <span>Đăng nhập để đồng bộ</span>
      </RouterLink>

      <button
        @click="deleteAll"
        v-if="localData && localData.length > 0"
        class="p-4 flex space-x-2 rounded-xl bg-black w-fit hover:outline hover:outline-rose-500 hover:outline-[1.8px]"
      >
        <SolarTrashBin2Bold class="text-3xl" />
        <span>Xoá tất cả</span>
      </button>
    </div>

    <KeepAlive>
      <WordHistoryContainer :is-loading="localData === null" :translations="localData || []" />
    </KeepAlive>

    <div class="w-full my-4" v-if="totalPages">
      <FancyPagination :total-pages="totalPages" />
    </div>
  </component>

  <ConfirmModal :open="openConfirmModal" @set-open="handleSetOpenCFModal" />
</template>

<script lang="ts" setup>
import SolarCloudUploadBold from '@/components/icons/SolarCloudUploadBold.vue';
import SolarTrashBin2Bold from '@/components/icons/SolarTrashBin2Bold.vue';
import ConfirmModal from '@/components/shared/ConfirmModal.vue';
import FancyPagination from '@/components/shared/FancyPagination.vue';
import WordHistoryContainer from '@/components/shared/WordHistoryContainer.vue';
import { useSession } from '@/stores/userSession';
import type { FetchingStatus, TranslationHistory } from '@/types/app';
import getAPIUrl from '@/utils/getAPIUrl';
import { useQuery } from '@tanstack/vue-query';
import { useMediaQuery, useStorage } from '@vueuse/core';
import axios from 'axios';
import { cluster } from 'radash';
import { computed, provide, ref, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const sessionStore = useSession();
const localData = ref<TranslationHistory[] | null>(null);
const localStatus = ref<FetchingStatus>('idle');
const totalPages = ref(0);
const currentPage = ref(1);
const openConfirmModal = ref(false);
const localHistory = useStorage<TranslationHistory[]>('translations-history', []);

const limit = computed(() => {
  return isLargeScreen.value ? 18 : 20;
});

const { refetch } = useQuery({
  queryKey: ['fetching-translations-history'],
  queryFn: async () => {
    localStatus.value = 'loading';
    return (
      await axios.get(`${getAPIUrl()}/api/users/translation-history`, {
        withCredentials: true,
        params: { limit: limit.value, page: currentPage.value }
      })
    ).data;
  },
  onSuccess: (data) => {
    localData.value = data.translations;
    totalPages.value = data.totalPages;
    localStatus.value = 'success';
  },
  onError: () => {
    localStatus.value = 'error';
  },
  enabled: sessionStore.status === 'authenticated'
});

const deleteAll = () => {
  openConfirmModal.value = true;
};

const handleSetOpenCFModal = (state: boolean) => {
  openConfirmModal.value = state;
};

//WordCard need to refresh when delete
provide('refetchHistory', refetch);
//serve optimistic delete
provide('localData', localData);

watchEffect(() => {
  if (sessionStore.status === 'authenticated') {
    refetch();
  } else if (sessionStore.status === 'unauthenticated') {
    const localPagination = cluster(localHistory.value, limit.value);
    localData.value = localPagination[0];
    totalPages.value = localPagination.length;
  }
});

watchEffect(() => {
  const { page } = router.currentRoute.value.query;
  currentPage.value = page ? Number(page) : 1;
  if (sessionStore.status === 'authenticated') {
    localData.value = null;
    refetch();
  } else if (sessionStore.status === 'unauthenticated') {
    const localPagination = cluster(localHistory.value, limit.value);
    if (localPagination[currentPage.value - 1]) {
      localData.value = localPagination[currentPage.value - 1];
    }
  }
});
</script>
