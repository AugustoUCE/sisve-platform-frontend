import { computed, onMounted, ref } from 'vue'
import type { AdminElectionRow, AdminMetric, AuditEvent, QuickAction } from '@/types/domain'
import { quickActions, fetchAdminDashboard } from '@/services/admin'

const sidebarSections = [
  {
    title: 'Principal',
    items: [
      { label: 'Dashboard', badge: '' },
      { label: 'Elecciones', badge: '1' },
      { label: 'Candidatos', badge: '' },
      { label: 'Padrón Electoral', badge: '' }
    ]
  },
  {
    title: 'Monitoreo',
    items: [
      { label: 'Resultados en vivo', badge: '' },
      { label: 'Actas y reportes', badge: '' },
      { label: 'Log de auditoría', badge: '' }
    ]
  },
  {
    title: 'Sistema',
    items: [
      { label: 'Configuración', badge: '' },
      { label: 'Cerrar sesión', badge: '' }
    ]
  }
]

export function useAdminPanel() {
  const query = ref('')
  const activeRoute = ref('Dashboard')
  const metrics = ref<AdminMetric[]>([])
  const actions = ref<QuickAction[]>(quickActions)
  const elections = ref<AdminElectionRow[]>([])
  const recentEvents = ref<AuditEvent[]>([])

  const filteredElections = computed<AdminElectionRow[]>(() => {
    const term = query.value.trim().toLowerCase()
    if (!term) return elections.value
    return elections.value.filter(item => [item.name, item.faculty, item.date, item.status].some(value => value.toLowerCase().includes(term)))
  })

  onMounted(async () => {
    const dashboard = await fetchAdminDashboard()
    metrics.value = dashboard.metrics
    actions.value = dashboard.quickActions
    elections.value = dashboard.elections
    recentEvents.value = dashboard.events
  })

  function setActiveRoute(label: string) {
    activeRoute.value = label
  }

  function handleQuickAction(action: QuickAction) {
    window.alert(`${action.title} no está conectado aún al backend.`)
  }

  return {
    query,
    activeRoute,
    filteredElections,
    metrics,
    actions,
    recentEvents,
    sidebarSections,
    setActiveRoute,
    handleQuickAction
  }
}