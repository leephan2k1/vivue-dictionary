<template>
  <Teleport to="body">
    <TransitionRoot
      :show="props.open"
      as="template"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black bg-opacity-25 z-30" />
    </TransitionRoot>
  </Teleport>

  <TransitionRoot
    ref="target"
    appear
    :show="props.open"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0 scale-95"
    enter-to="opacity-100 scale-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100 scale-100"
    leave-to="opacity-0 scale-95"
  >
    <div
      class="absolute top-[130%] space-y-4 py-6 px-3 right-0 rounded-xl h-fit w-[13rem] bg-black flex flex-col z-[500]"
    >
      <RouterLink
        :to="{ name: 'profile' }"
        @click.stop="handleNagivate"
        class="p-3 hover:bg-main-background rounded-xl flex items-center space-x-2"
      >
        <InformationCircleIcon class="w-7 h-7" />
        <span>Thông tin</span>
      </RouterLink>
      <button
        @click.stop="handleLogout"
        class="p-3 hover:bg-main-background rounded-xl flex items-center space-x-2"
      >
        <SolarLogout2Bold class="rotate-180" />
        <span>Đăng xuất</span>
      </button>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import SolarLogout2Bold from '@/components/icons/SolarLogout2Bold.vue';
import { useSession } from '@/stores/userSession';
import { TransitionRoot } from '@headlessui/vue';
import { InformationCircleIcon } from '@heroicons/vue/20/solid';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{ open: boolean }>();
const emits = defineEmits(['setOpen']);

const target = ref(null);
const sessionStore = useSession();

const handleLogout = () => {
  emits('setOpen', false);
  sessionStore.logout();
};

const handleNagivate = () => {
  emits('setOpen', false);
};

onClickOutside(target, () => {
  emits('setOpen', false);
});
</script>
