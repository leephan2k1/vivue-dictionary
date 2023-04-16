<template>
  <button
    class="space-x-4 bg-black p-2 rounded-xl hover:outline hover:outline-[2px] hover:outline-main"
  >
    <slot />
    <span>{{ props.title }}</span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string }>();
</script>
