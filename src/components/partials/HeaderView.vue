<template>
  <header
    class="w-full min-h-[5rem] flex items-center justify-end px-6 lg:px-14 space-x-6 md:space-x-8"
  >
    <LanguagePairOption class="text-2xl" v-if="routePathName !== 'home'" />

    <HeaderButton
      link-to="practice"
      class="md:flex items-center justify-center hidden"
      title="Luyện tập"
    >
      <SolarPenNewRoundLinear class="text-content" />
    </HeaderButton>

    <HeaderButton
      link-to="history"
      class="md:flex items-center justify-center hidden"
      title="Lịch sử"
    >
      <SolarHistoryBold class="text-content" />
    </HeaderButton>

    <HeaderButton
      class="md:flex items-center justify-center hidden"
      link-to="translation"
      title="Dịch câu"
    >
      <SolarDocumentTextOutline class="text-content" />
    </HeaderButton>

    <UserAvatar />
  </header>
</template>

<script lang="ts" setup>
import SolarDocumentTextOutline from '@/components/icons/SolarDocumentTextOutline.vue';
import SolarHistoryBold from '@/components/icons/SolarHistoryBold.vue';
import SolarPenNewRoundLinear from '@/components/icons/SolarPenNewRoundLinear.vue';
import HeaderButton from '@/components/shared/HeaderButton.vue';
import LanguagePairOption from '@/components/shared/LanguagePairOption.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import UserAvatar from '../shared/UserAvatar.vue';

const router = useRouter();

const routePathName = computed(() => {
  return router.currentRoute.value.name;
});
</script>
