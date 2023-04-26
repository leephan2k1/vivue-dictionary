<template>
  <button
    @click="handleFilterTag"
    :style="{
      color: COLORS_OPTIONS[idx % COLORS_OPTIONS.length],
      borderColor: COLORS_OPTIONS[idx % COLORS_OPTIONS.length]
    }"
    class="p-2 rounded-2xl border-2"
  >
    {{ tag === 'default' ? 'mặc định' : tag }}
  </button>
</template>

<script lang="ts" setup>
import { COLORS_OPTIONS } from '@/constants';

const props = defineProps<{ tag: string; idx: number }>();
const emits = defineEmits(['onClickFilter']);

const handleFilterTag = () => {
  emits('onClickFilter', props.tag);
};
</script>
