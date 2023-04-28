<template>
  <div
    class="w-full h-fit mt-6 flex flex-wrap gap-y-4 gap-x-8 items-center md:justify-start justify-center px-4 lg:px-16"
  >
    <StatusCard :data="data?.statusCounting || 0" />
    <StatusCardStatic title="Số từ đã lưu" :data="data?.favoriteCounting || 0" />
    <StatusCardStatic title="Số từ đã tra" :data="data?.historyCounting || 0" />

    <TagsContainer :isLoading="status === 'loading'" :tags="data?.tags" />

    <div class="flex space-x-2 w-full mt-4 items-center">
      <h3>Xem lại từ {{ statusParam }}</h3>
      <SwitchButton @onChange="handleOnChangePreview" :defaultState="enablePreviewWord" />
    </div>

    <template v-if="enablePreviewWord">
      <WordPreview />
    </template>
  </div>
</template>

<script lang="ts" setup>
import SwitchButton from '@/components/shared/SwitchButton.vue';
import { t } from '@/constants';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useStorage } from '@vueuse/core';
import { provide, ref, watch } from 'vue';
import StatusCard from './StatusCard.vue';
import StatusCardStatic from './StatusStaticCard.vue';
import TagsContainer from './TagsContainer.vue';
import WordPreview from './WordPreview.vue';

const enablePreviewWord = useStorage('enablePreviewWord', false);

const { query, statusParam } = useDashboardData();
const { refetch, data, status } = query;

provide('practiceStatus', statusParam);
provide('refetchDashboard', refetch);

const handleOnChangePreview = (state: boolean) => {
  enablePreviewWord.value = state;
};
</script>
