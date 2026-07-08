import { requestJson } from './http'
import { saveSession } from './session'
import type { LoginCredentials, SessionResponse } from '@/types/domain'

interface BackendLoginResponse {
  token: string
  idVotante: number
  nombres: string
  apellidos: string
}

export async function login(credentials: LoginCredentials): Promise<SessionResponse> {
  const backendResponse = await requestJson<BackendLoginResponse>('auth', '/login', {
    method: 'POST',
    body: JSON.stringify({
      cedula: credentials.cedula,
      correoInstitucional: credentials.correoInstitucional
    })
  })

  const fullName = [backendResponse.nombres, backendResponse.apellidos].filter(Boolean).join(' ').trim()
  const session: SessionResponse = {
    token: backendResponse.token,
    user: {
      id: String(backendResponse.idVotante),
      fullName,
      role: 'VOTER',
      code: credentials.cedula
    }
  }

  saveSession(session, credentials.remember)
  return session
}
