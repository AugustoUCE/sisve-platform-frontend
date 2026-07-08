import { requestJson } from './http'
import { clearStoredSession, getStoredSession } from './session'
import type { BiometricStep, VoterCandidate } from '@/types/domain'

interface ActiveElectionResponse {
  idEleccion: number
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  estado: string
}

interface BackendVoteResponse {
  mensaje: string
  hashActual: string
  fechaRegistro: string
}

interface BackendValidateResponse {
  valido: boolean
}

export const biometricSteps: BiometricStep[] = [
  { id: 1, label: 'Cámara activada y lista', state: 'idle' },
  { id: 2, label: 'Rostro detectado en el encuadre', state: 'idle' },
  { id: 3, label: 'Análisis biométrico completado', state: 'idle' },
  { id: 4, label: 'Coincidencia con padrón electoral', state: 'idle' }
]

export const voterCandidates: VoterCandidate[] = [
  { id: 1, name: 'Ana Rodríguez Vega', party: 'Lista 3 · Fuerza Estudiantil', description: 'Propone modernización de laboratorios, bienestar estudiantil y convenios internacionales.', tags: ['Tecnología', 'Becas', 'Inclusión'], avatar: '👩‍🎓' },
  { id: 2, name: 'Carlos Méndez Torres', party: 'Lista 7 · Renovación UCE', description: 'Enfocado en reducción de costos académicos, transporte y cafetería universitaria.', tags: ['Economía', 'Transporte', 'Salud'], avatar: '👨‍🎓' },
  { id: 3, name: 'Sofía Guerrero Pinto', party: 'Lista 12 · Unidos por la U', description: 'Prioriza conectividad, espacios de estudio y mayor participación en decisiones académicas.', tags: ['Infraestructura', 'Wi-Fi', 'Democracia'], avatar: '👩‍💼' }
]

export async function verifyBiometric(): Promise<boolean> {
  const session = getStoredSession()

  if (!session) {
    return false
  }

  try {
    const response = await requestJson<BackendValidateResponse>('auth', '/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    })

    return Boolean(response.valido)
  } catch {
    return false
  }
}

export async function fetchActiveElection(): Promise<ActiveElectionResponse | null> {
  try {
    const elections = await requestJson<ActiveElectionResponse[]>('election', '/activas')
    return elections[0] ?? null
  } catch {
    return null
  }
}

export async function submitVote(payload: { idEleccion: number; idCandidato: number; idVotante: number }): Promise<BackendVoteResponse> {
  const session = getStoredSession()

  if (!session) {
    throw new Error('Debes iniciar sesión antes de votar.')
  }

  const response = await requestJson<BackendVoteResponse>('vote', '/votos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`
    },
    body: JSON.stringify(payload)
  })

  clearStoredSession()
  return response
}
