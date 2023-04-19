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
                class="text-2xl font-medium leading-6 text-white mb-2 flex items-center justify-between"
              >
                <h3 class="text-3xl">
                  Các bản dịch từ tự điển <span class="capitalize">{{ source }}</span>
                </h3>

                <button @click="closeModal" class="p-3 rounded-full bg-main-background">
                  <XMarkIcon class="w-6 h-6" />
                </button>
              </DialogTitle>
              <div class="w-fit my-2 flex items-center space-x-3">
                <span>Từ điển: </span>
                <SelectSource
                  :sources="sources.filter((s) => s !== 'glosbe')"
                  button-styles="bg-main-background"
                  @source-change="handleSourceChange"
                />
              </div>

              <div class="flex items-center space-x-4 mt-4 mb-4">
                <template v-if="localStatus === 'loading'">
                  <div class="tw-animate-pulse bg-gray-800 w-[150px] h-[30px] rounded-xl"></div>
                  <span class="tw-animate-pulse bg-gray-800 w-[40px] h-[30px] rounded-xl"></span>
                </template>
                <template v-if="localStatus === 'success' && localData">
                  <h1 class="text-3xl font-bold">{{ localData.wordContent }}</h1>

                  <span
                    v-for="item in localData.typesOfWord"
                    :key="item"
                    class="p-2 text-main rounded-2xl outline outline-2 outline-main/40"
                    >{{ item }}</span
                  >
                </template>
              </div>

              <template v-if="localStatus === 'loading'">
                <div
                  v-for="n in 2"
                  :key="n"
                  class="w-full min-h-[15rem] my-4 rounded-xl p-4 space-y-4 bg-gray-800 tw-animate-pulse"
                ></div>
              </template>

              <template v-if="localStatus === 'success' && localData">
                <div
                  v-for="item in localData.senses"
                  :key="item.sense"
                  class="border border-dashed rounded-xl p-3 flex flex-col space-y-4 my-4"
                >
                  <span class="p-2 text-main rounded-2xl outline outline-2 outline-main/40 w-fit">{{
                    item.typeOfWord
                  }}</span>
                  <h2 class="text-white/80">
                    {{ item.sense }}
                  </h2>

                  <template v-if="item.examples.length > 0">
                    <h2 class="text-white/80">Examples:</h2>
                    <ul class="space-y-4">
                      <li class="" v-for="ex in item.examples" :key="ex">
                        <Highlighter
                          class="mt-2 block text-content"
                          highlightClassName="text-main bg-main/20 p-2 rounded-xl"
                          :searchWords="
                            ex.match(new RegExp(`${localData.wordContent}(\\w+)*`, 'gi')) || []
                          "
                          :autoEscape="true"
                          :textToHighlight="ex"
                        />
                      </li>
                    </ul>
                  </template>
                </div>
              </template>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue';
import SelectSource from '@/components/shared/SelectSource.vue';
import { sources } from '@/constants';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import type { Source, WordInEnglish, FetchingStatus } from '@/types/app';
import { useQuery } from '@tanstack/vue-query';
import getAPIUrl from '@/utils/getAPIUrl';
import axios from 'axios';
import Highlighter from 'vue-highlight-words';

const props = defineProps<{ open: boolean; wordInEnglish: string }>();
const emits = defineEmits(['setOpen']);

const API_END_POINT = getAPIUrl();

const source = ref<Source>('cambridge');
const localData = ref<WordInEnglish | null>(null);
const localStatus = ref<FetchingStatus>('idle');

const { refetch } = useQuery<WordInEnglish>({
  queryKey: ['fetching-english-sense', props.wordInEnglish],
  queryFn: async () => {
    return await (
      await axios.get(
        `${API_END_POINT}/api/words/translate/${encodeURIComponent(props.wordInEnglish)}`,
        {
          params: {
            format: 'en-en',
            source: source.value
          }
        }
      )
    ).data;
  },
  onSuccess: (data) => {
    localData.value = data;
    localStatus.value = 'success';
  },
  enabled: props.open
});

watch([() => props.open, () => source.value], () => {
  if (props.open) {
    refetch();
    localStatus.value = 'loading';
  }
});

const handleSourceChange = (src: Source) => {
  source.value = src;
};

function closeModal() {
  emits('setOpen', false);
}
</script>
