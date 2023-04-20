<template>
  <div
    v-if="sessionStore.status === 'unauthenticated'"
    class="rounded-2xl bg-black p-4 cursor-pointer hover:outline hover:outline-[2px] hover:outline-main"
  >
    <SolarUserRoundedBold class="text-2xl" />
  </div>

  <figure
    v-if="sessionStore.status === 'authenticated'"
    class="h-[3.5rem] overflow-hidden rounded-2xl w-[3.5rem] hover:border-2 hover:border-main cursor-pointer relative"
  >
    <img
      class="absolute inset-0 bg-cover bg-no-repeat bg-center"
      :src="sessionStore.user?.image"
      alt="avatar"
    />
  </figure>

  <div
    v-if="sessionStore.status === 'loading'"
    class="rounded-2xl bg-gray-800 tw-animate-pulse h-[3.5rem] w-[3.5rem]"
  ></div>
</template>

<script lang="ts" setup>
import SolarUserRoundedBold from '@/components/icons/SolarUserRoundedBold.vue';
import { useSession } from '@/stores/userSession';
import { watchEffect } from 'vue';

const sessionStore = useSession();

watchEffect(() => {
  console.log('sessionStore: ', sessionStore.status);
});
</script>
