<template>
  <Listbox v-model="selected" multiple @update:model-value="handleUpdateValue">
    <div class="relative mt-1">
      <ListboxButton
        :class="stylesBtn"
        class="relative min-w-[10rem] min-h-[4.4rem] w-full cursor-default rounded-lg p-4 pr-10 text-left shadow-md"
      >
        <span class="block truncate"> {{ selected.map((s) => s).join(', ') }}</span>
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
            v-for="selection in selections"
            :key="selection"
            :value="selection"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-gray-700 text-white' : 'text-white/70',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                selection
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
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';

const props = defineProps<{
  stylesBtn?: string;
  selections: string[];
  defaultSelections?: string[];
}>();
const emits = defineEmits(['selectChange']);

const selected = ref(
  props.defaultSelections ? props.defaultSelections : [props.selections[0], props.selections[1]]
);

const handleUpdateValue = () => {
  emits('selectChange', selected.value);
};
</script>
