type ApiDomain = 'auth' | 'election' | 'vote' | 'audit'

// Replace these values with the real backend base URLs for each service.
// auth: login/validation endpoints.
// election: election lookup and metadata endpoints.
// vote: vote submission endpoints.
// audit: traceability and events endpoints.
const domainBaseUrls: Record<ApiDomain, string> = {
  auth: import.meta.env.VITE_AUTH_API_URL ?? '/api/auth/auth',
  election: import.meta.env.VITE_ELECTION_API_URL ?? '/api/election/elecciones',
  vote: import.meta.env.VITE_VOTE_API_URL ?? '/api/vote',
  audit: import.meta.env.VITE_AUDIT_API_URL ?? '/api/audit/auditoria'
}

export function buildApiUrl(domain: ApiDomain, path: string) {
  const baseUrl = domainBaseUrls[domain].replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}

export async function requestJson<T>(domain: ApiDomain, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildApiUrl(domain, path), {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function safeRequestJson<T>(domain: ApiDomain, path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    return await requestJson<T>(domain, path, init)
  } catch {
    return fallback
  }
}
