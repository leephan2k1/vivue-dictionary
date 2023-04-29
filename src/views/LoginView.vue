<template>
  <component :is="`container`" class="min-h-[calc(100vh-6rem)] absolute-center overflow-hidden">
    <LoginForm />
  </component>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/shared/LoginForm.vue';
import { useSession } from '@/stores/userSession';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const sessionStore = useSession();
const router = useRouter();

watchEffect(() => {
  if (sessionStore.status === 'authenticated') {
    router.push({ name: 'home' });
  }
});
</script>
