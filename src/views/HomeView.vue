<script setup lang="ts">
import HomeBanner from '@/components/partials/HomeBanner.vue';
import SearchInput from '@/components/shared/SearchInput.vue';
import LanguagePairOption from '@/components/shared/LanguagePairOption.vue';
import SearchHint from '@/components/shared/SearchHint.vue';
</script>

<template>
  <main>
    <HomeBanner>
      <LanguagePairOption class="mx-auto mt-4 p-4" />
      <SearchInput class="mt-20" />

      <SearchHint />
    </HomeBanner>
  </main>
</template>
