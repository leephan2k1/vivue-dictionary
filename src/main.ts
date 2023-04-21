import 'modern-normalize/modern-normalize.css';
import '@/assets/global.scss';
import 'animate.css';
import 'tippy.js/dist/tippy.css';
import 'nprogress/nprogress.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import importComponents from '@/utils/importComponents';
import VueTippy from 'vue-tippy';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// serve global components like <component :is="globalCompXYZ" />
importComponents(app);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(autoAnimatePlugin);
app.use(
  VueTippy,
  // optional
  {
    theme: 'light',
    directive: 'tippy', // => v-tippy
    component: 'tippy' // => <tippy/>
  }
);
app.use(router);

app.mount('#app');
