<template>
  <div
    class="bg-[#1e1e20] rounded-2xl p-8 min-h-[19.2rem] md:min-h-[27rem] flex flex-col justify-between"
  >
    <span>{{ props.result }}</span>

    <div
      v-if="props.result && props.result.length > 0"
      class="flex w-full md:justify-start justify-end"
    >
      <button @click="handleCopyTextToClipboard" class="rounded-xl p-4 bg-black/20 w-fit">
        <SolarCopyBold />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SolarCopyBold from '../icons/SolarCopyBold.vue';
import { toast } from 'vue-sonner';

const props = defineProps<{ result: string }>();

const handleCopyTextToClipboard = () => {
  try {
    navigator.clipboard.writeText(props.result);
    toast.success('Đã sao chép bản dịch');
  } catch (error) {
    toast.error('Trình duyệt của bạn không hỗ trợ sao chép!');
    console.error('error: ', error);
  }
};
</script>
