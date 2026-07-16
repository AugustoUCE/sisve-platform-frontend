import { requestJson } from './http'
import type { ResultEntry, ResultSummaryStat, TimelineItem } from '@/interfaces/domain'
import { isMockDataEnabled, mockResultEntries, mockTimeline } from './mockData'

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
  entries: ResultEntry[]
  timeline: TimelineItem[]
}

export async function fetchResults(): Promise<ResultsPayload> {
  if (isMockDataEnabled) {
    return {
      entries: mockResultEntries,
      timeline: mockTimeline
    }
  }

  let elections: BackendElectionResponse[] = []
  try {
    elections = await requestJson<BackendElectionResponse[]>('election', '/activas')
  } catch {
    elections = []
  }

  let voteEvents: BackendAuditEventResponse[] = []
  try {
    voteEvents = await requestJson<BackendAuditEventResponse[]>(
      'audit',
      '/eventos?servicio=vote-service'
    )
  } catch {
    voteEvents = []
  }

  
  const entries: ResultEntry[] = mockResultEntries

  const timeline: TimelineItem[] = voteEvents.length > 0
    ? voteEvents
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
    : mockTimeline

  return {
    entries,
    timeline
  }
}
