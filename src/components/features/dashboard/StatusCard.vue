<template>
  <div class="w-[25rem] h-[15rem] bg-black rounded-2xl absolute-center flex-col space-y-2">
    <div class="flex space-x-4 items-center">
      <h2>Số từ:</h2>

      <SelectBox
        :selections="['Chưa học', 'Chưa nhớ', 'Khó nhớ', 'Đã nhớ', 'Tạm quên']"
        @select-change="handleTagChange"
        styles-btn="bg-main-background min-w-[13rem]"
      />
    </div>

    <CountUp :end-val="data" duration="0.8"></CountUp>
  </div>
</template>

<script lang="ts" setup>
import SelectBox from '@/components/shared/SelectBox.vue';
import CountUp from 'vue-countup-v3';
import { inject } from 'vue';

defineProps<{ data: number }>();
const practiceStatus = inject('practiceStatus');
const refetchDashboard = inject('refetchDashboard');

const handleTagChange = (tag: string) => {
  //@ts-ignore
  practiceStatus.value = tag.toLowerCase();
  if (refetchDashboard && typeof refetchDashboard === 'function') {
    refetchDashboard();
  }
};
</script>
