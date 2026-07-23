import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({

    history:createWebHistory(),

  routes: [
    {
      path: "/",
      component: () => import("../layouts/baseShellLayout.vue"),

      children: [
        {
          path: "",
          redirect: { name: "login" },
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/login/loginView.vue"),
        },
         {
          path: "ballot",
          name: "ballot",
          component: () => import("../views/dashboard/ballotView.vue"),
        }, 
      ],
    },
  ],

})

export default router