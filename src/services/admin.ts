import { requestJson, safeRequestJson } from './http'
import type { AdminElectionRow, AdminMetric, AuditEvent, QuickAction } from '@/types/domain'

interface BackendElectionResponse {
  idEleccion: number
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  estado: string
}

interface BackendAuditEventResponse {
  idAuditoria: number
  tipoEvento: string
  descripcion: string | null
  fechaEvento: string
  ipOrigen: string | null
  servicioOrigen: string
}

export const quickActions: QuickAction[] = []

function mapElectionToRow(election: BackendElectionResponse): AdminElectionRow {
  return {
    id: String(election.idEleccion),
    name: election.nombre,
    faculty: election.descripcion || 'Sin descripción',
    date: new Intl.DateTimeFormat('es-EC', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(election.fechaInicio)),
    participation: election.estado.toLowerCase() === 'activo' ? 'Activa' : '—',
    status: election.estado.toLowerCase() === 'activo' ? 'active' : election.estado.toLowerCase() === 'programada' ? 'pending' : 'closed'
  }
}

function mapAuditEventToRow(event: BackendAuditEventResponse): AuditEvent {
  return {
    id: String(event.idAuditoria),
    action: event.tipoEvento,
    actor: event.servicioOrigen,
    timestamp: new Intl.DateTimeFormat('es-EC', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(event.fechaEvento)),
    detail: [event.descripcion, event.ipOrigen ? `IP ${event.ipOrigen}` : ''].filter(Boolean).join(' · ')
  }
}

async function fetchActiveElections(): Promise<AdminElectionRow[]> {
  const elections = await requestJson<BackendElectionResponse[]>('election', '/activas')
  return elections.map(mapElectionToRow)
}

async function fetchAuditEvents(): Promise<AuditEvent[]> {
  const serviceNames = ['auth-service', 'election-service', 'vote-service', 'audit-service']

  const batches = await Promise.all(
    serviceNames.map(async serviceName => {
      try {
        return await requestJson<BackendAuditEventResponse[]>('audit', `/eventos?servicio=${encodeURIComponent(serviceName)}`)
      } catch {
        return [] as BackendAuditEventResponse[]
      }
    })
  )

  return batches
    .flat()
    .sort((left, right) => new Date(right.fechaEvento).getTime() - new Date(left.fechaEvento).getTime())
    .slice(0, 8)
    .map(mapAuditEventToRow)
}

export async function fetchAdminDashboard() {
  const [elections, events] = await Promise.all([
    fetchActiveElections(),
    fetchAuditEvents()
  ])

  const activeElections = elections.filter(item => item.status === 'active').length
  const pendingElections = elections.filter(item => item.status === 'pending').length
  const closedElections = elections.filter(item => item.status === 'closed').length

  const adminMetrics: AdminMetric[] = [
    {
      label: 'Elecciones activas',
      value: String(activeElections),
      delta: 'Procesos actualmente en curso',
      tone: activeElections > 0 ? 'up' : 'neutral',
      highlight: true
    },
    {
      label: 'Elecciones programadas',
      value: String(pendingElections),
      delta: 'Pendientes de inicio',
      tone: 'neutral'
    },
    {
      label: 'Elecciones cerradas',
      value: String(closedElections),
      delta: 'Procesos finalizados',
      tone: 'neutral'
    },
    {
      label: 'Eventos de auditoría',
      value: String(events.length),
      delta: 'Últimos eventos recopilados',
      tone: events.length > 0 ? 'up' : 'warn'
    }
  ]

  return {
    metrics: adminMetrics,
    quickActions,
    elections,
    events
  }
}
