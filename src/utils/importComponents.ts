import { AUTH_LAYOUT, PUBLIC_LAYOUT } from '@/constants';
import type { App } from 'vue';
import { defineAsyncComponent } from 'vue';

export default function assignGlobalComponents(app: App) {
  app.component(
    `${PUBLIC_LAYOUT}-layout`,
    defineAsyncComponent(() => import('@/components/layouts/DefaultLayout.vue'))
  );

  app.component(
    `${AUTH_LAYOUT}-layout`,
    defineAsyncComponent(() => import('@/components/layouts/AuthLayout.vue'))
  );
}
