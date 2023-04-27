<template>
  <component :is="`container`" class="mt-6 py-6 min-h-screen h-fit md:pb-4 pb-32 px-3">
    <component :is="`logo`" class="text-5xl" />

    <h2 class="text-3xl mt-10 text-center">Oops! Ủa gì dợ? Vào đây chi?</h2>
    <p class="mt-10 text-5xl text-rose-500 text-center">404</p>

    <div class="flex flex-col mt-4 items-center space-y-6 px-4">
      <h3 class="text-center">Lỡ vào rồi, random cái meme chơi</h3>
      <button
        @click="fetchingNewMeme"
        class="py-3 px-4 rounded-xl border hover:border-none hover:outline hover:outline-2 hover:outline-main w-fit"
      >
        Random meme
      </button>

      <div class="w-[40rem] h-fit rounded-xl absolute-center overflow-hidden">
        <img
          v-if="status === 'success' && data"
          :src="data.url"
          alt=""
          class="w-auto h-auto rounded-xl"
        />
      </div>

      <div
        v-if="status === 'loading'"
        class="w-[45rem] h-[40rem] bg-white/20 tw-animate-pulse rounded-xl"
      ></div>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';

const { data, status, refetch } = useQuery({
  queryKey: ['fetching-meme'],
  queryFn: async () => {
    return await (
      await axios.get('https://meme-api.com/gimme')
    ).data;
  }
});

watchEffect(() => {
  //skip nsfw content:
  if (data.value && data.value?.nsfw) {
    refetch();
  }
});

const fetchingNewMeme = () => {
  refetch();
};
</script>
