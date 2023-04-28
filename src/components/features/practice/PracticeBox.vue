<template>
  <div class="flex flex-col" v-if="status === 'success' && data" :key="String(page)">
    <p class="px-4 text-center" v-if="data?.practices.length === 0">
      Bạn chưa có từ vựng nào để luyện tập! Hãy cài đặt lại trạng thái hoặc tra thêm từ!
    </p>

    <swiper :effect="'cards'" :grabCursor="true" :modules="[EffectCards]" class="mySwiper">
      <swiper-slide v-for="(p, index) in practices" :key="p.id">
        <PracticeCard :w="p" :index="index" />
      </swiper-slide>
    </swiper>

    <PaginationPracticeSection
      v-if="data && data?.totalPages > 1"
      @onUpdatePage="handleUpdatePage"
    />
  </div>

  <div
    v-if="status === 'loading'"
    class="w-[24rem] h-[32rem] rounded-xl bg-white/20 tw-animate-pulse"
  ></div>
</template>

<script lang="ts" setup>
import { DEFAULT_PRACTICE_SETTINGS } from '@/constants';
import { useFetchPracticeWords } from '@/hooks/useFetchPracticeWords';
import type { Practice } from '@/types/app';
import { useStorage } from '@vueuse/core';
import { shuffle } from 'radash';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, watchEffect } from 'vue';
import { toast } from 'vue-sonner';
import PaginationPracticeSection from './PaginationPracticeSection.vue';
import PracticeCard from './PracticeCard.vue';

const practiceSettings = useStorage('practiceSettings', DEFAULT_PRACTICE_SETTINGS);

const practices = ref<Practice[]>([]);

const { query, page } = useFetchPracticeWords();
const { data, status, refetch } = query;

const handleUpdatePage = (direction: 'next' | 'prev') => {
  if (!data.value) return;

  if (direction === 'next' && page.value < data.value?.totalPages) {
    page.value = page.value + 1;
    refetch();
    return;
  } else if (page.value > 1 && direction === 'prev') {
    page.value = page.value - 1;
    refetch();
    return;
  }

  if (direction === 'next') toast.error('Đã là số từ cuối cùng');
  else toast.error('Đang là số từ đầu tiên');
};

watchEffect(() => {
  if (data.value) {
    practices.value = data.value.practices;
    if (practiceSettings.value.practiceOrder.toLocaleLowerCase() === 'ngẫu nhiên') {
      practices.value = shuffle(practices.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.swiper {
  width: 240px;
  height: 320px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
</style>
