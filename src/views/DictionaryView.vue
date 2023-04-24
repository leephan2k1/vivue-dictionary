<template>
  <component :is="`container`" class="mt-10 md:px-14 lg:px-36 px-2 py-4 pb-[8rem]">
    <component :is="`logo`" class="text-4xl" />

    <SearchInput
      @on-change="handleShowWordsHint"
      @on-press-enter-key="handlePressEnterKey"
      class="mt-4"
    >
      <SearchHint
        @on-select-word="isWordSelected = false"
        class="absolute top-[80%]"
        v-if="isWordSelected"
      />
    </SearchInput>

    <DictionaryContainer />
  </component>
</template>

<script lang="ts" setup>
import DictionaryContainer from '@/components/shared/DictionaryContainer.vue';
import SearchHint from '@/components/shared/SearchHint.vue';
import SearchInput from '@/components/shared/SearchInput.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
//disable words hint when user select word
const isWordSelected = ref(false);

//check query "pair" exist or not
onMounted(() => {
  if (!router.currentRoute.value.query?.pair) {
    router.push({ name: 'notFound' });
  }
  //check is valid if exist
  else if (!['vi-en', 'en-vi'].includes(String(router.currentRoute.value.query?.pair))) {
    router.push({ name: 'notFound' });
  }
});

const handlePressEnterKey = () => {
  isWordSelected.value = false;
};

const handleShowWordsHint = () => {
  if (!isWordSelected.value) isWordSelected.value = true;
};
</script>
