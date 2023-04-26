<template>
  <div v-auto-animate class="w-full mt-6 flex items-center gap-x-4 flex-wrap gap-y-4">
    <TagIcon class="w-8 h-8" />
    <button
      v-if="resetButtonState"
      @click="resetTags"
      class="p-3 rounded-xl bg-black hover:outline hover:outline-[1.8px] hover:outline-main"
    >
      Đặt lại
    </button>

    <TagItem
      v-for="(item, idx) in tags"
      :key="item.tag"
      :tag="item?.tag"
      :idx="idx"
      @on-click-filter="handleFilterChange"
    />

    <template v-if="isLoading">
      <div
        v-for="n in 5"
        :key="n"
        class="w-[80px] h-[40px] rounded-xl bg-white/20 tw-animate-pulse"
      ></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { TagIcon } from '@heroicons/vue/24/solid';
import TagItem from './TagItem.vue';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{ isLoading: boolean; tags: { tag: string }[] }>();
const tags = ref(props.tags);
const resetButtonState = ref(false);

watchEffect(() => {
  if (props.tags) {
    tags.value = props.tags;
  }
});

const handleFilterChange = (tag: string) => {
  tags.value = tags.value.filter((e) => e.tag === tag);
  resetButtonState.value = true;
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      tag
    }
  });
};

const resetTags = () => {
  tags.value = props.tags;
  resetButtonState.value = false;
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      tag: ''
    }
  });
};
</script>
