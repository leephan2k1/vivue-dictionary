<template>
  <div
    class="fixed bottom-4 w-[90vw] relative-x-center h-[50px] bg-black md:hidden z-20 rounded-2xl smooth-effect flex items-center justify-between px-4"
  >
    <HeaderButton
      link-to="practice"
      class="flex items-center justify-center text-xl"
      title="Luyện tập"
    >
      <SolarPenNewRoundLinear class="text-content" />
    </HeaderButton>

    <HeaderButton
      link-to="history"
      class="flex items-center justify-center text-xl"
      title="Lịch sử"
    >
      <SolarHistoryBold class="text-content" />
    </HeaderButton>

    <HeaderButton
      link-to="translation"
      class="flex items-center justify-center text-xl"
      title="Dịch câu"
    >
      <SolarDocumentTextOutline class="text-content" />
    </HeaderButton>
  </div>
</template>

<script lang="ts" setup>
import HeaderButton from '@/components/shared/HeaderButton.vue';
import SolarDocumentTextOutline from '@/components/icons/SolarDocumentTextOutline.vue';
import SolarHistoryBold from '@/components/icons/SolarHistoryBold.vue';
import SolarPenNewRoundLinear from '@/components/icons/SolarPenNewRoundLinear.vue';
</script>
