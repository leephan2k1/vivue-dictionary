<template>
  <div
    class="flex flex-col space-y-4 full-size justify-center items-center"
    :style="{
      backgroundColor: COLORS_OPTIONS[index % COLORS_OPTIONS.length]
    }"
  >
    <div class="flex flex-col max-h-[10rem] overflow-y-scroll px-2">
      <h2 v-for="content in words" :key="content">{{ content }}</h2>
    </div>

    <span class="text-xl">Nghĩa:</span>

    <input
      :disabled="isRemembered"
      v-model="sense"
      autofocus
      type="text"
      class="w-3/4 p-3 rounded-xl text-gray-900 text-2xl"
    />

    <div class="w-3/4 text-2xl flex justify-end">
      <button
        v-if="!isRemembered"
        @click="checkSense"
        class="p-3 rounded-xl border border-white hover:scale-[110%] smooth-effect"
      >
        Kiểm tra
      </button>
      <div v-else class="flex space-x-2">
        <span>Đã nhớ</span>
        <span class="p-3 rounded-full bg-green-500"><CheckIcon class="w-4 h-4" /></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shuffle } from 'radash';
import type { Practice } from '@/types/app';
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { t } from '@/constants';
import { removeAccents } from '@/utils/stringHelper';
import { toast } from 'vue-sonner';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { axiosClient } from '@/utils/httpClient';
import { useMutation } from '@tanstack/vue-query';

const practiceSettings = useStorage('practiceSettings', {
  practiceOrder: 'Ngẫu nhiên',
  practiceFormat: 'Anh-Việt',
  tags: [],
  states: ['Khó nhớ', 'Tạm quên', 'Đã nhớ']
});

const props = defineProps<{ w: Pick<Practice, 'word'>; index: number }>();
const isRemembered = ref(false);
const sense = ref('');

const { mutate: updatePracticeStatus } = useMutation({
  mutationKey: ['update-practice-status'],
  mutationFn: async (status: string) => {
    return await (
      await axiosClient.patch(
        `/users/practice`,
        {
          wordContent: props.w.word.wordContent,
          status
        },
        { withCredentials: true }
      )
    ).data;
  },
  onError: () => {
    toast.error('Có lỗi cập nhật! Thử lại sau!');
  }
});

const checkSense = () => {
  const localFormat = practiceSettings.value.practiceFormat.toLowerCase();
  let checkTarget: string[];

  //get senses
  if (localFormat === 'mặc định' || t[localFormat] === props.w.word.format) {
    checkTarget = [
      ...props.w.word.senses.map((e) => e.sense),
      ...props.w.word.less_frequent_senses.map((e) => e.sense)
    ];
  } else {
    checkTarget = [props.w.word.wordContent];
  }

  //normalize & check
  if (
    checkTarget.find((e) => {
      return (
        removeAccents(e.trim().toLowerCase()) === removeAccents(sense.value.trim().toLowerCase())
      );
    })
  ) {
    //call API update(status: 'REMEMBERED')
    updatePracticeStatus('REMEMBERED');
    isRemembered.value = true;
  } else {
    //call API update(status: 'FORGOT')
    updatePracticeStatus('FORGOT');
    toast.error('Sai rồi, hãy ôn lại bạn nhé!');
  }
};

const words = computed(() => {
  if (!props.w?.word) return [];

  const localFormat = practiceSettings.value.practiceFormat.toLowerCase();

  if (localFormat === 'mặc định' || t[localFormat] === props.w.word.format) {
    return [props.w.word.wordContent];
  }

  return props.w.word.senses.map((e) => e.sense);
});

const COLORS_OPTIONS = shuffle([
  '#991b1b',
  '#9a3412',
  '#92400e',
  '#854d0e',
  '#3f6212',
  '#166534',
  '#065f46',
  '#115e59',
  '#155e75',
  '#075985',
  '#1e40af',
  '#3730a3',
  '#3730a3',
  '#5b21b6',
  '#6b21a8',
  '#86198f',
  '#9d174d',
  '#9f1239'
]);
</script>
