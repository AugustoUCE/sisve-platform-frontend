import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/LoginView.vue'
import DashboardView from '@/views/Voto/DashboardView.vue'
import ElectionsView from '@/views/Elecciones/ElectionsView.vue'
import AuditView from '@/views/Auditoria/AuditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
