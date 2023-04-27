<template>
  <div class="px-4 lg:px-16 flex flex-col space-y-12">
    <div class="flex space-x-4 items-center">
      <MaterialSymbolsTranslateRounded />
      <h2 class="md:min-w-[18.5rem]">Luyện tập theo nghĩa:</h2>
      <SelectBox
        class="bg-black w-[15rem]"
        :selections="['Anh-Việt', 'Việt-Anh', 'Ngẫu nhiên']"
        @select-change="handleSelectFormatChange"
      />
    </div>

    <div class="flex space-x-4 items-center">
      <ArrowPathRoundedSquareIcon class="w-7 h-7" />
      <h2 class="md:min-w-[18.5rem]">Luyện tập theo thứ tự:</h2>
      <SelectBox
        class="bg-black w-[20rem]"
        :selections="['Ngẫu nhiên', 'Được thêm mới nhất']"
        @select-change="handlePracticeOrderSelect"
      />
    </div>

    <div class="flex gap-4 items-center flex-wrap" v-auto-animate>
      <TagIcon class="w-7 h-7" />
      <h2 class="md:min-w-[18.5rem]">Luyện tập theo tag:</h2>

      <template v-if="status === 'success' && data?.tags">
        <TagItem
          v-for="(item, idx) in data.tags"
          :key="item.tag"
          :tag="item.tag"
          :idx="idx"
          showTick
          :showTickIconState="!!tags.find((e) => e === 'all' || e === item.tag)"
          @on-click-filter="handleFilterTags"
        />
      </template>

      <template v-if="status === 'loading'">
        <div
          v-for="n in 5"
          :key="n"
          class="w-[80px] h-[40px] rounded-xl bg-white/20 tw-animate-pulse"
        ></div>
      </template>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="flex gap-4 items-center flex-wrap">
        <ArchiveBoxIcon class="w-7 h-7" />
        <h2 class="md:min-w-[18.5rem]">Luyện tập theo trạng thái:</h2>
        <MultiSelectBox
          class="bg-black w-[25rem]"
          :selections="DEFAULT_STATES"
          @select-change="handleMultiSelectChange"
        />
      </div>

      <div class="flex gap-4 items-center flex-wrap" v-auto-animate>
        <span class="p-2 border border-white rounded-xl">Chưa học</span>
        <span class="p-2 border border-white rounded-xl">Chưa nhớ</span>
        <span
          v-for="state in practiceSettings.states"
          :key="state"
          class="p-2 border border-white rounded-xl"
          >{{ state }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectBox from '@/components/shared/SelectBox.vue';
import TagItem from '../dashboard/TagItem.vue';
import MaterialSymbolsTranslateRounded from '@/components/icons/MaterialSymbolsTranslateRounded.vue';
import { ArrowPathRoundedSquareIcon, TagIcon, ArchiveBoxIcon } from '@heroicons/vue/24/solid';
import MultiSelectBox from '@/components/shared/MultiSelectBox.vue';
import { useStorage } from '@vueuse/core';
import { useDashboardData } from '@/hooks/useDashboardData';
import { watchEffect, ref } from 'vue';

const { refetch, data, status } = useDashboardData({ statusParam: 'NOT_PRACTICE' });
const DEFAULT_STATES = ['Khó nhớ', 'Tạm quên', 'Đã nhớ'];

//"showTickIcon" ^ in the template can not reactive with practiceSettings.tags?
const tags = ref(['all']);

const practiceSettings = useStorage('practiceSettings', {
  practiceOrder: 'Ngẫu nhiên',
  practiceFormat: 'en-vi',
  tags: tags.value,
  states: DEFAULT_STATES
});

watchEffect(() => {
  if (data.value) {
    tags.value = data.value.tags.map((e: any) => e.tag);
  }
});

const handleFilterTags = (tag: string) => {
  if (practiceSettings.value.tags.find((e) => e === 'all' || e === tag)) {
    tags.value = tags.value.filter((e: any) => e !== tag);
  } else {
    //@ts-ignore
    tags.value.push(tag);
  }

  if (tags.value.length === 0) tags.value = data.value.tags.map((e: any) => e.tag);
  practiceSettings.value.tags = tags.value;
};

const handlePracticeOrderSelect = (order: string) => {
  practiceSettings.value.practiceOrder = order;
};

const handleMultiSelectChange = (selections: string[]) => {
  practiceSettings.value.states = selections;
};

const handleSelectFormatChange = (s: string) => {
  practiceSettings.value.practiceFormat = s;
};
</script>
