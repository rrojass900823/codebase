// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import UserList from '@/views/UserList.vue';
import NotFound from '@/views/NotFound.vue';
import Profile from '@/views/Profile.vue';
import Store from '@/views/Store.vue';
import { appRoutes } from "@/constants";
import store from '@/store';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'home',
        name: 'HOME',
        component:Home,
        meta: {
            requiresAuth: false,
        },
      },
      {
        path: 'dashboard',
        name: 'DASHBOARD',
        component:Dashboard,
        meta: {
            requiresAuth: true,
        },
      },
      {
        path: 'userlist',
        name: 'USERLIST',
        component:UserList,
        meta: {
            requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'PROFILE',
        component:Profile,
        meta: {
            requiresAuth: true,
        },
      },
      {
        path: 'store',
        name: 'STORE',
        component:Store,
        meta: {
            requiresAuth: true,
        },
      },
      {
          path: '/:pathMatch(.*)*',
          name: 'NOTFOUND',
          component: NotFound,
          meta: {
              requiresAuth: false,
          },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
//TODO
 router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) next();
  else {
    if (store.getters['auth/isLoggedIn']) next();
    else {
          //store.dispatch('auth/tryAutoLogin');
          if (store.getters['auth/isLoggedIn']) next();
          else next('/');
      }
  }
});

export default router
