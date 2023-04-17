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
        <div class="flex min-h-full items-center justify-center p-4 text-center">
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
              class="w-[95vw] md:w-[60rem] h-[50rem] transform overflow-x-hidden overflow-y-scroll rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all flex flex-col"
            >
              <DialogTitle
                as="div"
                class="text-2xl font-medium leading-6 text-white mb-6 flex items-center justify-between"
              >
                <h3>Các mẫu phát âm từ tự điển Glosbe</h3>

                <button @click="closeModal" class="p-3 rounded-full bg-main-background">
                  <XMarkIcon class="w-6 h-6" />
                </button>
              </DialogTitle>

              <ul class="h-fit w-full list-inside list-decimal space-y-6">
                <li
                  v-for="audio in audios"
                  :key="audio.author"
                  class="flex gap-x-4 items-center flex-wrap"
                >
                  <span>{{ audio.author }}</span>
                  <button class="hover:text-main smooth-effect" @click="handlePlayAudio(audio.url)">
                    <SolarVolumeLoudBold class="lg:text-3xl text-4xl" />
                  </button>
                  <span>{{ audio.phrase }}</span>
                </li>
              </ul>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import SolarVolumeLoudBold from '../icons/SolarVolumeLoudBold.vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { toast } from 'vue-sonner';
import type { Audio } from '@/types/app';

const props = defineProps<{ open: boolean; audios: Audio[] }>();
const emits = defineEmits(['setOpen']);

function closeModal() {
  emits('setOpen', false);
}
function handlePlayAudio(src: string) {
  try {
    const audio = new Audio(src);
    audio.play();
  } catch (error) {
    toast.error('Xảy ra lỗi! Thử lại sau bạn nhé!');
  }
}
</script>
