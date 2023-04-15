<template>
  <!-- 5 rem is header's height  -->
  <section class="relative w-full h-[calc(100vh-5rem)] flex flex-col overflow-hidden space-y-4">
    <MaterialSymbolsTranslateRounded
      class="text-[300px] absolute right-5 top-[-60px] rotate-[-30deg] text-white/25"
    />
    <SolarNotebookMinimalisticLineDuotone
      class="text-white/25 text-[300px] bottom-[-60px] -left-11 absolute rotate-[30deg]"
    />
  </section>
</template>

<script lang="ts" setup>
import MaterialSymbolsTranslateRounded from '@/components/icons/MaterialSymbolsTranslateRounded.vue';
import SolarNotebookMinimalisticLineDuotone from '@/components/icons/SolarNotebookMinimalisticLineDuotone.vue';
// console.log(
//   'languageCodes: ',
//   Object.keys(languageCodes).map((key) => languageCodes[key].nativeName)
// );
</script>
