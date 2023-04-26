<template>
  <Switch
    v-model="enabled"
    @update:model-value="handleUpdate"
    :class="enabled ? 'bg-main' : 'bg-main/20'"
    class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <span
      aria-hidden="true"
      :class="enabled ? 'translate-x-8' : 'translate-x-1'"
      class="pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    />
  </Switch>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Switch } from '@headlessui/vue';

const emits = defineEmits(['onChange']);
const props = defineProps<{ defaultState?: boolean }>();

const enabled = ref(Boolean(props.defaultState));

const handleUpdate = () => {
  emits('onChange', enabled.value);
};
</script>
