import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import VoteView from '@/views/VoteView.vue'
import ElectionsView from '@/views/ElectionsView.vue'
import AuditView from '@/views/AuditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/vote', name: 'vote', component: VoteView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/results', name: 'results', component: ElectionsView },
    { path: '/elections', redirect: '/results' },
    { path: '/admin', name: 'admin', component: AuditView },
    { path: '/audit', redirect: '/admin' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})

export default router
