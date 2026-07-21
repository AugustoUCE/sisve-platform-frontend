import { createRouter, createWebHistory } from 'vue-router'

import FundSisveView from '@/views/FundSisveView.vue'

const router = createRouter({

    history:createWebHistory(),

    routes:[

        {

            path:'/',

            component:FundSisveView


        },
        


    ]

})

export default router