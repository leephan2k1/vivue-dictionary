import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Language } from '@/types/app';

export const useLanguagePair = defineStore('languagePair', () => {
  const pair = ref<{ current_language: Language; target_language: Language }>({
    current_language: 'English',
    target_language: 'Tiếng Việt'
  });

  const switchLanguage = () => {
    if (pair.value.current_language === 'English') {
      pair.value = { current_language: 'Tiếng Việt', target_language: 'English' };
    } else {
      pair.value = { current_language: 'English', target_language: 'Tiếng Việt' };
    }
  };

  return { pair, switchLanguage };
});
