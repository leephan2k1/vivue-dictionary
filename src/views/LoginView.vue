<template>
  <ContainerView class="min-h-[calc(100vh-6rem)] absolute-center">
    <LoginForm />
  </ContainerView>
</template>

<script lang="ts" setup>
import ContainerView from '@/components/shared/ContainerView.vue';
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
