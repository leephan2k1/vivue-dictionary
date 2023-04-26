<template>
  <div class="w-fit mx-auto">
    <ul class="flex flex-wrap space-x-4 relative">
      <li
        ref="pointer"
        :class="totalPages > 1 ? 'left-[56px]' : 'left-[10px]'"
        class="absolute h-[3.6rem] w-[3.6rem] top-0 bg-main rounded-2xl z-10 backface-hidden ease-in-out duration-300"
      ></li>

      <li
        @click="handleBackPrevPage"
        v-if="totalPages > 1"
        class="z-20 h-[3.6rem] w-[3.6rem] p-2 rounded-2xl bg-black absolute-center cursor-pointer select-none"
      >
        <ChevronLeftIcon class="w-6 h-6" />
      </li>

      <li
        @click="handleGoToPage(1)"
        id="page-1"
        :class="[currentPage === 1 ? ' text-gray-800' : 'bg-black', totalPages >= 100 && 'text-xl']"
        class="z-20 h-[3.6rem] w-[3.6rem] p-2 rounded-2xl absolute-center cursor-pointer select-none"
      >
        <span>1</span>
      </li>

      <li
        v-if="currentPage > 4"
        class="h-[3.6rem] w-[3.6rem] p-2 rounded-2xl bg-black absolute-center"
      >
        <EllipsisHorizontalIcon class="w-6 h-6" />
      </li>

      <li
        v-for="page in pagesInView"
        :key="page"
        :id="`page-${page}`"
        @click="handleGoToPage(page)"
        :class="[
          currentPage === page ? 'text-gray-800' : 'bg-black',
          totalPages >= 100 && 'text-xl'
        ]"
        class="z-20 h-[3.6rem] w-[3.6rem] p-2 rounded-2xl absolute-center cursor-pointer select-none"
      >
        <span>{{ page }}</span>
      </li>

      <li
        v-if="totalPages - currentPage > 3"
        class="h-[3.6rem] w-[3.6rem] p-2 rounded-2xl bg-black absolute-center"
      >
        <EllipsisHorizontalIcon class="w-6 h-6" />
      </li>

      <li
        v-if="totalPages > 1"
        @click="handleGoToPage(totalPages)"
        :id="`page-${totalPages}`"
        :class="[
          currentPage === totalPages ? ' text-gray-800' : 'bg-black',
          totalPages >= 100 && 'text-xl'
        ]"
        class="h-[3.6rem] w-[3.6rem] p-2 rounded-2xl absolute-center cursor-pointer select-none z-20"
      >
        <span>{{ totalPages }}</span>
      </li>

      <li
        @click="handleNextPage"
        v-if="totalPages > 1"
        class="h-[3.6rem] w-[3.6rem] p-2 rounded-2xl bg-black absolute-center cursor-pointer select-none"
      >
        <ChevronRightIcon class="w-6 h-6" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ref, computed, watchEffect, onMounted } from 'vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

const props = defineProps<{ totalPages: number }>();

const totalPages = ref(props.totalPages);
const currentPage = ref(1);
const pointer = ref();
const router = useRouter();

const handleMovePointer = () => {
  const elem = document.getElementById(`page-${currentPage.value}`);
  if (elem) {
    setTimeout(() => {
      pointer.value.style.transform = `translateX(${elem?.offsetLeft - 56}px)`;
    }, 1);

    setTimeout(() => {
      elem.classList.add('zoom-in-out-effect', 'bg-main');
    }, 200);
  }
};

const pagesInView = computed(() => {
  return [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2
  ].filter((e) => e > 1 && e < totalPages.value);
});

const handleGoToPage = (page: number) => {
  currentPage.value = page;
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      page: currentPage.value
    }
  });
};

const handleBackPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        page: currentPage.value
      }
    });
  }
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = currentPage.value + 1;
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        page: currentPage.value
      }
    });
  }
};

watchEffect(handleMovePointer);

watchEffect(() => {
  const { page } = router.currentRoute.value.query;
  currentPage.value = page ? Number(page) : 1;
});

watchEffect(() => {
  totalPages.value = props.totalPages;
});

onMounted(() => {
  if (totalPages.value > 1) handleMovePointer();
});
</script>
