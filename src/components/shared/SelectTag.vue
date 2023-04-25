<template>
  <Listbox v-model="selectedTag">
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-[15rem] min-w-[10rem] cursor-default rounded-lg p-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 bg-main-background"
      >
        <span class="block truncate">{{ selectedTag }}</span>
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
          class="absolute mt-1 max-h-60 w-[15rem] overflow-auto rounded-md bg-black py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg z-20"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="tag in tags"
            :key="tag"
            :value="tag"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-gray-700 text-white' : 'text-white/70',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                tag
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

<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import { ref, watchEffect } from 'vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{ tags: string[] }>();
const emits = defineEmits(['tagChange']);

const selectedTag = ref(props.tags[0]);

watchEffect(() => {
  emits('tagChange', selectedTag.value);
});
</script>
