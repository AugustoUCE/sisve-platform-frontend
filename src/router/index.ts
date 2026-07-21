import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/Login/LoginView.vue'

const router = createRouter({

    history:createWebHistory(),

    routes:[

        {

            path:'/',

            component:LoginView

        }

    ]

})

export default router