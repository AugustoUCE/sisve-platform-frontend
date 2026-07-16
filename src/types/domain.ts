export type UserRole = 'ADMIN' | 'AUDITOR' | 'VOTER'
export type ElectionStatus = 'Draft' | 'Scheduled' | 'Open' | 'Closed'

export interface UserProfile {
  id: string
  name: string
  role: UserRole
}

export interface ElectionSummary {
  id: string
  title: string
  status: ElectionStatus
  startDate: string
  endDate: string
}

export interface CandidateOption {
  id: string
  name: string
  list: string
}

export interface AuditEvent {
  id: string
  action: string
  actor: string
  timestamp: string
  detail: string
}

export interface LoginCredentials {
  cedula: string
  correoInstitucional: string
  remember: boolean
}

export interface SessionUser {
  id: string
  fullName: string
  role: UserRole
  code: string
}

export interface SessionResponse {
  token: string
  user: SessionUser
}

export interface BiometricStep {
  id: number
  label: string
  state: 'idle' | 'current' | 'done'
}

export interface VoterCandidate {
  id: number | string
  name: string
  party: string
  office: string
  description: string
  tags: string[]
  avatar: string
}

export interface ElectionProcess {
  id: string
  name: string
  faculty: string
  date: string
  turnout: string
  status: 'Open' | 'Upcoming' | 'Closed'
}

export interface ResultEntry {
  id: string
  position: number
  name: string
  party: string
  votes: number
  percentage: number
  highlighted?: boolean
}

export interface ResultSummaryStat {
  label: string
  value: string
  subtext: string
  accent?: boolean
}

export interface TimelineItem {
  id: string
  title: string
  detail: string
  tone: 'success' | 'info' | 'warning' | 'neutral'
}

export interface AdminMetric {
  label: string
  value: string
  delta: string
  tone: 'up' | 'neutral' | 'warn'
  highlight?: boolean
}

export interface QuickAction {
  id: string
  title: string
  description: string
  tone: 'blue' | 'purple' | 'green' | 'orange'
}

export interface AdminElectionRow {
  id: string
  name: string
  faculty: string
  date: string
  participation: string
  status: 'active' | 'pending' | 'closed'
}
