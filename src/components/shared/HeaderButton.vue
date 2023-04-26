<template>
  <RouterLink
    :key="String(isActive)"
    :to="{ name: props.linkTo }"
    :class="isActive && 'outline-main outline-[2px] outline'"
    class="space-x-4 bg-black p-2 rounded-xl hover:outline hover:outline-[2px] hover:outline-main"
  >
    <slot />
    <span>{{ props.title }}</span>
  </RouterLink>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { watchEffect, ref } from 'vue';

const props = defineProps<{ title: string; linkTo: string }>();
const router = useRouter();
const isActive = ref(false);

watchEffect(() => {
  const routerName = router.currentRoute.value.name;

  isActive.value =
    (routerName === 'translation' && props.title.toLowerCase() === 'dịch câu') ||
    (routerName === 'history' && props.title.toLowerCase() === 'lịch sử') ||
    (['dashboard', 'instructions', 'challenge', 'settings'].includes(String(routerName)) &&
      props.title.toLowerCase() === 'luyện tập');
}, {});
</script>
