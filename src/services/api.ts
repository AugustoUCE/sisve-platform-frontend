import axios from 'axios'

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL
})

export const electionApi = axios.create({
  baseURL: import.meta.env.VITE_ELECTION_API_URL
})

export const voteApi = axios.create({
  baseURL: import.meta.env.VITE_VOTE_API_URL
})

export const auditApi = axios.create({
  baseURL: import.meta.env.VITE_AUDIT_API_URL
})

export const pollingStationApi = axios.create({
  baseURL: import.meta.env.VITE_POLLING_STATION_API_URL
})

const addToken = (api: any) => {
  api.interceptors.request.use((config: any) => {
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
