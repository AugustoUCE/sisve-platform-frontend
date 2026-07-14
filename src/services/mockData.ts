import type {
  AdminElectionRow,
  AdminMetric,
  AuditEvent,
  QuickAction,
  ResultEntry,
  ResultSummaryStat,
  SessionResponse,
  TimelineItem
} from '@/types/domain'

export const isMockDataEnabled = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const mockSessionSeed: SessionResponse['user'] = {
  id: '1001',
  fullName: 'Juan Jarteaga',
  role: 'VOTER',
  code: '1712345678'
}

export function createMockSession(cedula: string): SessionResponse {
  const normalizedCedula = cedula.trim()

  return {
    token: `mock-token-${Date.now()}`,
    user: {
      ...mockSessionSeed,
      id: normalizedCedula || mockSessionSeed.id,
      code: normalizedCedula || mockSessionSeed.code
    }
  }
}

export const mockActiveElection = {
  idEleccion: 2026,
  nombre: 'Elecciones UCE 2026',
  descripcion: 'Facultad de Ingeniería y Ciencias Aplicadas',
  fechaInicio: '2026-07-10T08:00:00-05:00',
  fechaFin: '2026-07-10T17:00:00-05:00',
  estado: 'Activa'
}



export const mockResultEntries: ResultEntry[] = [
  { id: '1', position: 1, name: 'Ana Rodríguez Vega', party: 'Lista 3 · Fuerza Estudiantil', votes: 1824, percentage: 41.8, highlighted: true },
  { id: '2', position: 2, name: 'Carlos Méndez Torres', party: 'Lista 7 · Renovación UCE', votes: 1541, percentage: 35.4 },
  { id: '3', position: 3, name: 'Sofía Guerrero Pinto', party: 'Lista 12 · Unidos por la U', votes: 992, percentage: 22.8 }
]

export const mockTimeline: TimelineItem[] = [
  {
    id: 't1',
    title: '10/07/2026 08:00 - Apertura de mesa',
    detail: 'Proceso habilitado para sufragio estudiantil',
    tone: 'success'
  },
  {
    id: 't2',
    title: '10/07/2026 10:15 - Primer voto registrado',
    detail: 'Servicio vote-service confirmó la primera transacción',
    tone: 'info'
  },
  {
    id: 't3',
    title: '10/07/2026 12:30 - Validación biométrica',
    detail: 'Sesión verificada contra padrón simulado',
    tone: 'warning'
  },
  {
    id: 't4',
    title: '10/07/2026 16:45 - Cierre parcial',
    detail: 'Consolidación de actas en curso',
    tone: 'neutral'
  }
]

export const mockAdminMetrics: AdminMetric[] = [
  {
    label: 'Elecciones activas',
    value: '1',
    delta: 'Proceso en curso en la facultad',
    tone: 'up',
    highlight: true
  },
  {
    label: 'Elecciones programadas',
    value: '2',
    delta: 'Pendientes de apertura',
    tone: 'neutral'
  },
  {
    label: 'Elecciones cerradas',
    value: '1',
    delta: 'Historial consolidado',
    tone: 'neutral'
  },
  {
    label: 'Eventos de auditoría',
    value: '8',
    delta: 'Últimos eventos cargados',
    tone: 'up'
  }
]

export const mockQuickActions: QuickAction[] = [
  {
    id: 'refresh',
    title: 'Actualizar tablero',
    description: 'Recarga métricas y eventos simulados.',
    tone: 'blue'
  },
  {
    id: 'export',
    title: 'Exportar actas',
    description: 'Genera una salida de prueba para el flujo administrativo.',
    tone: 'purple'
  },
  {
    id: 'audit',
    title: 'Revisar auditoría',
    description: 'Consulta los últimos eventos de ejemplo.',
    tone: 'green'
  },
  {
    id: 'close',
    title: 'Cerrar proceso',
    description: 'Simula el cierre operativo de una elección.',
    tone: 'orange'
  }
]

export const mockAdminElections: AdminElectionRow[] = [
  {
    id: '2026-1',
    name: 'Elecciones UCE 2026',
    faculty: 'Ingeniería y Ciencias Aplicadas',
    date: '10 jul 2026',
    participation: '67.4%',
    status: 'active'
  },
  {
    id: '2026-2',
    name: 'Elecciones FCM 2026',
    faculty: 'Ciencias Médicas',
    date: '18 jul 2026',
    participation: '—',
    status: 'pending'
  },
  {
    id: '2025-4',
    name: 'Elecciones UCE 2025',
    faculty: 'Jurisprudencia',
    date: '21 nov 2025',
    participation: '74.1%',
    status: 'closed'
  }
]

export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'a1',
    action: 'LOGIN_SUCCESS',
    actor: 'auth-service',
    timestamp: '10/07/2026, 08:02',
    detail: 'Ingreso simulado del votante · IP 192.168.10.24'
  },
  {
    id: 'a2',
    action: 'BIOMETRIC_VALIDATED',
    actor: 'vote-service',
    timestamp: '10/07/2026, 08:06',
    detail: 'Coincidencia aprobada con padrón de prueba'
  },
  {
    id: 'a3',
    action: 'VOTE_RECORDED',
    actor: 'vote-service',
    timestamp: '10/07/2026, 08:08',
    detail: 'Hash de voto generado correctamente'
  },
  {
    id: 'a4',
    action: 'AUDIT_EXPORT',
    actor: 'audit-service',
    timestamp: '10/07/2026, 08:10',
    detail: 'Exportación de evidencia preparada'
  }
]