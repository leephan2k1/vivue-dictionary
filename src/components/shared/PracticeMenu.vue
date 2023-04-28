<template>
  <div class="w-full h-[5rem] my-10 lg:px-16 px-4">
    <ul
      class="flex p-2 bg-black rounded-xl w-fit max-w-[100%] relative overflow-x-scroll flex-nowrap"
    >
      <li
        ref="pointer"
        class="absolute left-[10px] top-[5px] bg-white/10 rounded-xl w-[86px] h-[39px] z-20 duration-200"
      ></li>
      <RouterLink
        :to="{ name: 'dashboard' }"
        @click="handleItemClick"
        id="dashboard"
        :class="`${routeName === 'dashboard' ? 'text-white' : 'text-content'}`"
        class="min-w-[95px] cursor-pointer p-3 z-30 text-center"
      >
        Xem lại
      </RouterLink>
      <RouterLink
        :to="{ name: 'challenge' }"
        @click="handleItemClick"
        id="challenge"
        :class="`${routeName === 'challenge' ? 'text-white' : 'text-content'}`"
        class="min-w-[95px] cursor-pointer p-3 z-30 ml-4 text-center"
      >
        Luyện tập
      </RouterLink>
      <RouterLink
        :to="{ name: 'settings' }"
        @click="handleItemClick"
        id="settings"
        :class="`${routeName === 'settings' ? 'text-white' : 'text-content'}`"
        class="min-w-[95px] cursor-pointer p-3 z-30 ml-4 text-center"
      >
        Cài đặt
      </RouterLink>
      <RouterLink
        :to="{ name: 'instructions' }"
        @click="handleItemClick"
        id="instructions"
        :class="`${routeName === 'instructions' ? 'text-white' : 'text-content'}`"
        class="min-w-[95px] cursor-pointer p-3 z-30 ml-4 text-center"
      >
        Hướng dẫn
      </RouterLink>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const pointer = ref(null);
const router = useRouter();

const routeName = computed(() => {
  return router.currentRoute.value.name;
});

//active pointer effect
onMounted(() => {
  const name = router.currentRoute.value.name;

  if (name !== 'dashboard') {
    const elem = document.getElementById(String(name));

    if (elem && pointer.value) {
      //@ts-ignore
      pointer.value.style.transform = `translateX(${elem.offsetLeft - 5}px)`;
    }
  }
});

const handleItemClick = (e: MouseEvent) => {
  //@ts-ignore
  pointer.value.style.transform = `translateX(${e.currentTarget.offsetLeft - 5}px)`;
};
</script>
