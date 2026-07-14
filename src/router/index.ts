import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/vue/Auth/LoginView.vue'
import DashboardView from '@/views/vue/Vote/DashboardView.vue'
import ElectionsView from '@/views/vue//Elections/ElectionsView.vue'
import AuditView from '@/views/vue/Audit/AuditView.vue'
import NotFoundView from '@/views/vue/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/results', name: 'results', component: ElectionsView },
    { path: '/elections', redirect: '/results' },
    { path: '/admin', name: 'admin', component: AuditView },
    { path: '/audit', redirect: '/admin' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})

export default router
