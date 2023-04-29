<template>
  <button
    @click="handleFilterTag"
    :style="{
      color: COLORS_OPTIONS[idx % COLORS_OPTIONS.length],
      borderColor: COLORS_OPTIONS[idx % COLORS_OPTIONS.length]
    }"
    class="p-2 rounded-2xl border-2 relative w-fit"
  >
    {{ tag === 'default' ? 'mặc định' : tag }}

    <span
      v-if="showTick"
      :class="showTickIconState ? 'animate__zoomIn' : 'animate__zoomOut'"
      class="p-2 rounded-full bg-main text-gray-800 absolute -top-4 -right-4 animate__faster animate__animated"
      ><CheckIcon class="w-4 h-4"
    /></span>
  </button>
</template>

<script lang="ts" setup>
import { COLORS_OPTIONS } from '@/constants';
import { CheckIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  tag: string;
  idx: number;
  showTickIconState?: boolean;
  showTick?: boolean;
}>();
const emits = defineEmits(['onClickFilter']);

const handleFilterTag = () => {
  emits('onClickFilter', props.tag);
};
</script>
