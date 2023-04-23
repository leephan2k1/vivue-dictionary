<template>
  <TransitionRoot appear :show="props.open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-30 text-content">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[30rem] h-[20rem] transform overflow-x-hidden overflow-y-scroll rounded-2xl bg-black p-8 align-middle shadow-xl transition-all flex flex-col justify-between"
            >
              <DialogTitle
                as="h3"
                class="text-2xl text-center font-medium leading-6 text-white mb-2 flex items-center justify-between"
              >
                <h3>Xác nhận xoá tất cả lịch sử?</h3>
              </DialogTitle>

              <div class="flex space-x-6 justify-end">
                <button @click="deleteAll" class="p-4 rounded-xl border-2 border-rose-500">
                  Khá chắc
                </button>
                <button @click="closeModal" class="p-4 rounded-xl border-2 border-main">
                  Hông
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import getAPIUrl from '@/utils/getAPIUrl';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';
import { inject, ref } from 'vue';
import type { TranslationHistory } from '@/types/app';
import { useStorage } from '@vueuse/core';
import { useSession } from '@/stores/userSession';
import { toast } from 'vue-sonner';

const props = defineProps<{ open: boolean }>();
const emits = defineEmits(['setOpen']);

const localHistory = useStorage<TranslationHistory[]>('translations-history', []);
const sessionStore = useSession();

const localData = inject<TranslationHistory[] | null>('localData');
const fetchHistory = inject('refetchHistory');

const fallbackData = ref<TranslationHistory[]>([]);

const { mutate: deleteWord } = useMutation({
  mutationFn: async ({ word, deleteOption }: { word: string; deleteOption?: string }) => {
    return await (
      await axios.delete(`${getAPIUrl()}/api/users/translation-history`, {
        withCredentials: true,
        data: {
          word,
          deleteOption
        }
      })
    ).data;
  },
  onError: () => {
    //@ts-ignore
    localData.value = fallbackData.value;
    toast.error('Xoá tất cả thất bại! Thử lại sau...');
  },
  onSuccess: () => {
    if (fetchHistory && typeof fetchHistory === 'function') fetchHistory();
  }
});

function deleteAll() {
  toast.success('Xoá tất cả thành công');
  //@ts-ignore
  fallbackData.value = localData.value && [...localData.value];
  //@ts-ignore
  localData.value = [];
  localHistory.value = [];

  if (sessionStore.status === 'authenticated') {
    deleteWord({ word: '', deleteOption: 'deleteAll' });
  }

  closeModal();
}

function closeModal() {
  emits('setOpen', false);
}
</script>
