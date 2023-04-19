<template>
  <button
    class="absolute-center space-x-4 border rounded-xl p-4 min-w-[22rem] smooth-effect hover:scale-[110%]"
  >
    <slot />
    <span>{{ props.title }}</span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string }>();
</script>
