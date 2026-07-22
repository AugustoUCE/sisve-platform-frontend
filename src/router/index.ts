import { createRouter, createWebHistory } from 'vue-router'

import BaseShellLayout from '../layouts/BaseShellLayout.vue'

const router = createRouter({

    history:createWebHistory(),

  routes: [
    {
      path: "/",
      component: () => import("../layouts/BaseShellLayout.vue"),

      children: [
        {
          path: "",
          redirect: { name: "login" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/login/LoginView.vue"),
        },
       /*  {
          path: "home",
          name: "home",
          component: () => import("../views/Login/HomeView.vue"),
        }, */
      ],
    },
  ],

})

export default router