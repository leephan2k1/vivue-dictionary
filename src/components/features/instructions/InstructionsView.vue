<template>
  <div class="px-4 md:px-8 lg:px-16 flex flex-col space-y-4 lg:max-w-[70%]">
    <h2 class="text-2xl">1. Cách thêm từ vào danh sách luyện tập</h2>
    <p class="text-content">
      - Ở trang /dictionary, chọn vào biểu tượng <StarIcon class="w-6 h-6 inline" /> để tuỳ chọn
      thêm vào danh sách.
    </p>
    <p class="text-content">- Có thể ôn và xem lại các từ đã lưu ở mục "Xem lại".</p>

    <h2 class="text-2xl">2. Cách luyện tập</h2>
    <p class="text-content">
      - Các từ vựng được chia ra từng thẻ, mỗi thẻ bao gồm nghĩa (Anh/Việt có thể một hoặc nhiều) và
      ô nhập nghĩa, chọn vào "Kiểm tra" sau khi nhập xong nghĩa.
    </p>
    <p class="text-content">
      - Đối với nhập nghĩa tiếng Việt, bạn không cần phải viết có dấu. Ví dụ từ hello là "xin chào",
      các nghĩa hợp lệ là "xin chao", "xin chào", "XIN CHAO",...
    </p>
    <p class="text-content">
      - Các nghĩa hợp lệ là có thể là nghĩa chính hoặc các nghĩa xuất hiện ít thường xuyên (Xem thêm
      ở trang /dictionary).
    </p>

    <h2 class="text-2xl">3. Trạng thái luyện tập</h2>
    <p class="text-content">
      - Trạng thái luyện tập được phân ra làm 5 loại “Chưa nhớ”, “Khó nhớ”, “Chưa học”, “Đã nhớ”,
      “Tạm quên”.
    </p>
    <ul class="list-inside list-disc text-content space-y-4">
      <li>“Chưa nhớ” là các từ làm sai trong quá trinh luyện tập.</li>
      <li>“Khó nhớ” là các từ có tần suất làm sai ≥ 3 lần.</li>
      <li>“Chưa học” là các từ chưa từng luyện tập.</li>
      <li>“Đã nhớ” là các từ làm đúng trong quá trình luyện tập.</li>
      <li>
        “Tạm quên” là các từ được tính từ lúc “đã nhớ” sau khoảng thời gian x (x mặc định là 7 ngày,
        có thể tuỳ chỉnh).
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/outline';
</script>
