import type { SessionResponse } from '@/interfaces/domain'

const localStorageKey = 'sisve.session'
const sessionStorageKey = 'sisve.session.temp'

function readStorage(storage: Storage, key: string): SessionResponse | null {
  const rawValue = storage.getItem(key)
  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as SessionResponse
  } catch {
    storage.removeItem(key)
    return null
  }
}

export function saveSession(session: SessionResponse, remember: boolean) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(localStorageKey)
  window.sessionStorage.removeItem(sessionStorageKey)

  const storage = remember ? window.localStorage : window.sessionStorage
  const key = remember ? localStorageKey : sessionStorageKey
  storage.setItem(key, JSON.stringify(session))
}

export function getStoredSession(): SessionResponse | null {
  if (typeof window === 'undefined') {
    return null
  }

  return readStorage(window.localStorage, localStorageKey) ?? readStorage(window.sessionStorage, sessionStorageKey)
}

export function clearStoredSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(localStorageKey)
  window.sessionStorage.removeItem(sessionStorageKey)
}