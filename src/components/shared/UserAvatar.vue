<template>
  <RouterLink :to="{ name: 'login' }" v-if="sessionStore.status === 'unauthenticated'">
    <div
      class="rounded-2xl bg-black p-4 cursor-pointer hover:outline hover:outline-[2px] hover:outline-main"
    >
      <SolarUserRoundedBold class="text-2xl" />
    </div>
  </RouterLink>

  <figure
    @click="handleSetOpenModal(true)"
    v-if="sessionStore.status === 'authenticated'"
    :class="`${openMenu ? '' : 'hover:border-2 hover:border-main'}`"
    class="h-[3.5rem] rounded-2xl w-[3.5rem] cursor-pointer relative duration-50"
  >
    <img
      class="absolute inset-0 bg-cover bg-no-repeat bg-center rounded-2xl"
      :src="sessionStore.user?.image"
      alt="avatar"
    />

    <UserMenuModal :open="openMenu" @set-open="handleSetOpenModal" />
  </figure>

  <div
    v-if="sessionStore.status === 'loading'"
    class="rounded-2xl bg-gray-800 tw-animate-pulse h-[3.5rem] w-[3.5rem]"
  ></div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import SolarUserRoundedBold from '@/components/icons/SolarUserRoundedBold.vue';
import UserMenuModal from '@/components/shared/UserMenuModal.vue';
import { useSession } from '@/stores/userSession';
import { ref } from 'vue';

const openMenu = ref(false);
const sessionStore = useSession();

const handleSetOpenModal = (state: boolean) => {
  openMenu.value = state;
};
</script>
