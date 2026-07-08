import { requestJson } from './http'
import type { ResultEntry, ResultSummaryStat, TimelineItem } from '@/types/domain'

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

interface ResultsPayload {
  stats: ResultSummaryStat[]
  entries: ResultEntry[]
  timeline: TimelineItem[]
}

export async function fetchResults(): Promise<ResultsPayload> {
  const elections = await requestJson<BackendElectionResponse[]>('election', '/activas')

  let voteEvents: BackendAuditEventResponse[] = []
  try {
    voteEvents = await requestJson<BackendAuditEventResponse[]>(
      'audit',
      '/eventos?servicio=vote-service'
    )
  } catch {
    voteEvents = []
  }

  const stats: ResultSummaryStat[] = [
    {
      label: 'Elecciones activas',
      value: String(elections.length),
      subtext: 'procesos obtenidos del backend',
      accent: true
    },
    {
      label: 'Eventos de voto',
      value: String(voteEvents.length),
      subtext: 'registrados por audit-service'
    }
  ]

  const entries: ResultEntry[] = []

  const timeline: TimelineItem[] = voteEvents
    .sort(
      (left, right) =>
        new Date(right.fechaEvento).getTime() - new Date(left.fechaEvento).getTime()
    )
    .slice(0, 8)
    .map((event, index) => ({
      id: String(event.idAuditoria),
      title: `${new Date(event.fechaEvento).toLocaleString('es-EC')} — ${event.tipoEvento}`,
      detail: [event.descripcion ?? '', event.ipOrigen ? `IP ${event.ipOrigen}` : '']
        .filter(Boolean)
        .join(' · '),
      tone: index === 0 ? 'success' : 'info'
    }))

  return {
    stats,
    entries,
    timeline
  }
}
