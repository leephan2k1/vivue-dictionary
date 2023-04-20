<template>
  <button
    @click="login({ provider: props.provider })"
    class="absolute-center space-x-4 border rounded-xl p-4 min-w-[22rem] smooth-effect hover:scale-[110%]"
  >
    <slot />
    <span>{{ props.title }}</span>
  </button>
</template>

<script lang="ts" setup>
import getAPIUrl from '@/utils/getAPIUrl';

const BASE_URL = getAPIUrl();
const props = defineProps<{ title: string; provider: 'google' | 'facebook' }>();

const login = ({ provider }: { provider: 'google' | 'facebook' }) => {
  window.location.replace(`${BASE_URL}/api/login/${provider}`);
};
</script>
