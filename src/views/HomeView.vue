<script setup lang="ts">
import HomeBanner from '@/components/partials/HomeBanner.vue';
import SearchInput from '@/components/shared/SearchInput.vue';
import LanguagePairOption from '@/components/shared/LanguagePairOption.vue';
</script>

<template>
  <main>
    <HomeBanner>
      <LanguagePairOption />
      <SearchInput />
    </HomeBanner>
  </main>
</template>
