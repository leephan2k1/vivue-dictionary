<template>
  <div
    class="w-full h-fit mt-6 flex flex-wrap gap-y-4 gap-x-8 items-center md:justify-start justify-center px-4 lg:px-16"
  >
    <StatusCard :data="data?.statusCounting || 0" />
    <StatusCardStatic title="Số từ đã lưu" :data="data?.favoriteCounting || 0" />
    <StatusCardStatic title="Số từ đã tra" :data="data?.historyCounting || 0" />

    <TagsContainer :isLoading="status === 'loading'" :tags="data?.tags" />

    <div class="flex space-x-2 w-full mt-4 items-center">
      <h3>Xem lại từ {{ practiceStatus }}</h3>
      <SwitchButton @onChange="handleOnChangePreview" :defaultState="enablePreviewWord" />
    </div>

    <template v-if="enablePreviewWord">
      <WordPreview />
    </template>
  </div>
</template>

<script lang="ts" setup>
import StatusCard from './StatusCard.vue';
import StatusCardStatic from './StatusStaticCard.vue';
import WordPreview from './WordPreview.vue';
import TagsContainer from './TagsContainer.vue';
import { useQuery } from '@tanstack/vue-query';
import { axiosClient } from '@/utils/httpClient';
import SwitchButton from '@/components/shared/SwitchButton.vue';
import { ref, provide, watch } from 'vue';
import { t } from '@/constants';
import { useStorage } from '@vueuse/core';

const practiceStatus = ref('chưa học');
const enablePreviewWord = useStorage('enablePreviewWord', false);

const { refetch, data, status } = useQuery({
  queryKey: ['fetching-dashboard-data'],
  queryFn: async () => {
    return await (
      await axiosClient.get(`/users/dashboard`, {
        withCredentials: true,
        params: {
          status: t[practiceStatus.value]
        }
      })
    ).data;
  }
});

provide('practiceStatus', practiceStatus);
provide('refetchDashboard', refetch);

const handleOnChangePreview = (state: boolean) => {
  enablePreviewWord.value = state;
};

watch(practiceStatus, () => refetch());
</script>
