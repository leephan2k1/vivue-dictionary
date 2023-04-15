import '@/assets/global.scss';
import 'modern-normalize/modern-normalize.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import importComponents from '@/utils/importComponents';

const app = createApp(App);

// serve global components like <component :is="globalCompXYZ" />
importComponents(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
