import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/components/features/dashboard/DashboardView.vue';
import NProgress from 'nprogress';
import { useSession } from '@/stores/userSession';
import { checkAuth } from '@/utils/checkAuth';
import type { SessionStatus } from '@/types/app';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dictionary/:word',
      name: 'dictionary',
      component: () => import('@/views/DictionaryView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/machine-translation',
      name: 'translation',
      component: () => import('@/views/MachineTranslation.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue')
    },
    {
      path: '/practice',
      name: 'practice',
      component: () => import('@/views/PracticeView.vue'),
      beforeEnter: async (to, from, next) => {
        const session = useSession();

        if (session.status === 'authenticated') {
          next();
        } else {
          const { status, user } = await checkAuth();

          if (!user && status === 'unauthenticated') {
            session.status = 'unauthenticated';
            next({ name: 'login' });
            return;
          }
          session.status = status as SessionStatus;
          session.user = user;
          next();
        }
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'instructions',
          name: 'instructions',
          component: () => import('@/components/features/instructions/InstructionsView.vue')
        },
        {
          path: 'challenge',
          name: 'challenge',
          component: () => import('@/components/features/practice/PracticeView.vue')
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/components/features/settings/SettingsView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  }
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
