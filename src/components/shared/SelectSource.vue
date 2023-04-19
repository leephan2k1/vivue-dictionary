<template>
  <Listbox v-model="selectedPSource">
    <div class="relative mt-1">
      <ListboxButton
        :class="props?.buttonStyles ? props.buttonStyles : ''"
        class="relative w-full min-w-[15rem] cursor-default rounded-lg p-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
      >
        <span class="block truncate">{{ selectedPSource }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg z-20"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="source in sources"
            :key="source"
            :value="source"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-gray-700 text-white' : 'text-white/70',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                source
              }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-main"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import type { Source } from '@/types/app';
//@ts-ignore
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{ buttonStyles?: string; sources: Source[] }>();
const emits = defineEmits(['sourceChange']);

const selectedPSource = ref(props.sources[0]);

watchEffect(() => {
  emits('sourceChange', selectedPSource.value);
});
</script>
