<template>
  <div class="flex flex-col">
    <h3 class="text-content">{{ props.language }}</h3>

    <div class="flex items-center space-x-4 mt-4">
      <div
        v-if="isLoading"
        class="tw-animate-pulse bg-gray-800 w-[150px] h-[30px] rounded-xl"
      ></div>
      <h1 v-else class="text-4xl font-bold">{{ props.word }}</h1>

      <span
        v-if="props.language === 'English' && props.isLoading"
        class="tw-animate-pulse bg-gray-800 w-[40px] h-[30px] rounded-xl"
      ></span>

      <template v-if="props.typesOfWord && props.typesOfWord?.length > 0">
        <span
          v-for="tWord in props.typesOfWord"
          :key="tWord"
          class="p-2 text-main rounded-2xl outline outline-2 outline-main/40"
          >{{ tWord }}</span
        >
      </template>
    </div>

    <div v-if="props.language === 'English'" class="flex items-center space-x-4 mt-4 text-content">
      <!-- <span>/stɑːf/</span> -->
      <span class="tw-animate-pulse bg-gray-800 w-[70px] h-[24px] rounded-xl"></span>

      <button>
        <SolarVolumeLoudBold class="lg:text-3xl text-4xl" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SolarVolumeLoudBold from '../icons/SolarVolumeLoudBold.vue';

const props = defineProps<{
  language: string;
  word: string;
  isLoading: boolean;
  typesOfWord?: string[];
}>();
</script>
