<template>
  <div class="w-fit my-auto h-fit flex flex-col p-[5rem] md:p-[10rem] square relative">
    <i style="--clr: #00ff0a"></i>
    <i style="--clr: #42d392"></i>
    <i style="--clr: #647eff"></i>

    <LogoView class="text-4xl z-30" />
    <h2 class="text-center mt-4 z-30 select-none">Đăng nhập</h2>

    <div class="flex-1 flex flex-col items-center mt-16 space-y-8 z-30">
      <LoginButton title="Đăng nhập với Google" class="group" provider="google">
        <PhGoogleLogoFill class="text-3xl group-hover:text-yellow-400 smooth-effect" />
      </LoginButton>
      <LoginButton title="Đăng nhập với Facebook" class="group" provider="facebook">
        <TeenyiconsFacebookSolid class="text-3xl group-hover:text-sky-500 smooth-effect" />
      </LoginButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LogoView from './LogoView.vue';
import PhGoogleLogoFill from '@/components/icons/PhGoogleLogoFill.vue';
import TeenyiconsFacebookSolid from '@/components/icons/TeenyiconsFacebookSolid.vue';
import LoginButton from './LoginButton.vue';
</script>

<style lang="scss" scoped>
// i'm so lazy to design so i take it from https://youtu.be/TbLcudv0HIY
// thanks for sharing!
.square i {
  position: absolute;
  inset: 0;
  border: 2px solid #fff;
  transition: 0.5s;
  z-index: 10;
}

.square i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}
.square i:nth-child(2) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}
.square i:nth-child(3) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate2 10s linear infinite;
}

.square:hover i {
  border: 6px solid var(--clr);
  filter: drop-shadow(0 0 20px var(--clr));
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
