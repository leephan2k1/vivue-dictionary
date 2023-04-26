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
              class="w-[95vw] md:w-[40rem] h-[45rem] transform overflow-x-hidden overflow-y-scroll rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all flex flex-col space-y-4 justify-between"
            >
              <div class="flex flex-col space-y-4" v-auto-animate>
                <DialogTitle
                  as="div"
                  class="text-2xl font-medium leading-6 text-white mb-2 flex items-center justify-between"
                >
                  <h3 class="text-3xl">Tuỳ chọn lưu để luyện tập sau:</h3>

                  <button @click="closeModal" class="p-3 rounded-full bg-main-background">
                    <XMarkIcon class="w-6 h-6" />
                  </button>
                </DialogTitle>

                <h3>Chọn tag:</h3>

                <SelectTag :tags="['Mặc định', 'Tuỳ chỉnh']" @tag-change="handleTagChange" />

                <template v-if="option === 'tuỳ chỉnh'">
                  <p class="text-xl italic">
                    {{
                      20 - tagValue.length > 0
                        ? `Tối đa còn lại ${20 - tagValue.length} từ`
                        : `không thể vượt quá 20 từ`
                    }}
                  </p>

                  <input
                    v-model="tagValue"
                    type="text"
                    class="p-4 bg-main-background w-[20rem] mt-4 rounded-xl"
                    autofocus
                  />
                </template>

                <h3>Chọn tần suất ôn lại:</h3>

                <SelectTag :tags="['7 ngày', 'Tuỳ chỉnh']" @tag-change="handleDayOptionChange" />

                <div
                  class="flex space-x-4 items-center"
                  v-if="forgottenFrequencyOption === 'tuỳ chỉnh'"
                >
                  <input
                    v-model="forgottenFrequencyValue"
                    type="number"
                    min="1"
                    step="1"
                    class="p-4 bg-main-background w-[5rem] rounded-xl"
                    autofocus
                  />

                  <div class="flex flex-col space-y-2">
                    <button
                      @click="forgottenFrequencyValue = forgottenFrequencyValue + 1"
                      class="p-1 bg-main-background"
                    >
                      <ChevronUpIcon class="w-6 h-6" />
                    </button>
                    <button
                      @click="
                        forgottenFrequencyValue =
                          forgottenFrequencyValue > 1 ? forgottenFrequencyValue - 1 : 1
                      "
                      class="p-1 bg-main-background"
                    >
                      <ChevronDownIcon class="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div @click="handleSubmit" class="w-full flex justify-end">
                <button class="py-3 px-4 border border-main rounded-xl">Lưu</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { axiosClient } from '@/utils/httpClient';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import SelectTag from './SelectTag.vue';

const emits = defineEmits(['setOpen', 'onMutate']);
const props = defineProps<{ open: boolean }>();

const router = useRouter();
const option = ref('mặc định');
const forgottenFrequencyOption = ref('mặc định');
const tagValue = ref('');
const forgottenFrequencyValue = ref(7);

const { mutate: addPracticeWord } = useMutation({
  mutationKey: ['addPracticeWord'],
  mutationFn: async (payload: { word: string; tag?: string; numberOfDaysToForget?: number }) => {
    return await (
      await axiosClient.post(`/users/favorite`, payload, { withCredentials: true })
    ).data;
  },
  onError: () => {
    toast.error('Có lỗi xảy ra, không thể lưu, thử lại sau!');
    emits('onMutate', false);
  }
});

const handleTagChange = (tag: string) => {
  option.value = tag.toLowerCase();
};

const handleDayOptionChange = (opt: string) => {
  forgottenFrequencyOption.value = opt.toLowerCase();
};

const handleSubmit = () => {
  if (tagValue.value.length > 20) {
    toast.error('Không thể lưu tag lớn hơn 20 ký tự');
    return;
  }

  const { word } = router.currentRoute.value.params;

  const payload = {
    word: String(word),
    tag: tagValue.value && tagValue.value.length > 0 ? tagValue.value : 'default',
    numberOfDaysToForget: forgottenFrequencyValue.value
  };

  addPracticeWord(payload);

  //optimistic UI
  toast.success('Lưu thành công');
  closeModal();
  emits('onMutate', true);
};

function closeModal() {
  emits('setOpen', false);
}
</script>
