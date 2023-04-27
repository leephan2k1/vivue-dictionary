<template>
  <Listbox v-model="selection">
    <div class="relative mt-1">
      <ListboxButton
        :class="stylesBtn"
        class="relative min-w-[10rem] w-full cursor-default rounded-lg p-4 pr-10 text-left shadow-md"
      >
        <span class="block truncate">{{ selection }}</span>
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
            v-for="tag in selections"
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

const props = defineProps<{ selections: string[]; stylesBtn?: string }>();
const emits = defineEmits(['selectChange']);

const selection = ref(props.selections[0]);

watchEffect(() => {
  emits('selectChange', selection.value);
});
</script>
