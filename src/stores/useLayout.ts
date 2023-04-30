import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayouts = defineStore('layouts', () => {
  const showMobileMenu = ref(false);

  return { showMobileMenu };
});
