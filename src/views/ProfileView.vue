<template>
  <component
    :is="`container`"
    class="mt-6 py-6 min-h-screen overflow-y-hidden md:pb-0 pb-32 px-3overflow-x-hidden"
  >
    <component :is="`logo`" class="text-4xl" />

    <div class="flex flex-col justify-center items-center mt-10 space-y-4">
      <img :src="session.user?.image" alt="user avatar" class="w-[10rem] h-[10rem] rounded-full" />
      <h2 class="text-3xl">{{ session.user?.name }}</h2>
      <p>Ngày tham gia {{ new Date(String(session.user?.createdAt)).toLocaleDateString('vi') }}</p>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { useSession } from '@/stores/userSession';

const session = useSession();
</script>
