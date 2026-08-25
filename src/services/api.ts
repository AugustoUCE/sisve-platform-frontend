import axios from 'axios'

const createApi = (envName: string, fallback: string) => axios.create({
  baseURL: import.meta.env[envName] || fallback,
  headers: { 'Content-Type': 'application/json' }
})

export const authApi = createApi('VITE_AUTH_API_URL', 'http://localhost:8081')

export const electionApi = createApi('VITE_ELECTION_API_URL', 'http://localhost:8082')

export const voteApi = createApi('VITE_VOTE_API_URL', 'http://localhost:8083')

export const auditApi = createApi('VITE_AUDIT_API_URL', 'http://localhost:8084')

export const pollingStationApi = createApi('VITE_POLLING_STATION_API_URL', 'http://localhost:8085')

const addToken = (api: ReturnType<typeof axios.create>) => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
}

addToken(authApi)
addToken(electionApi)
addToken(voteApi)
addToken(auditApi)
addToken(pollingStationApi)
