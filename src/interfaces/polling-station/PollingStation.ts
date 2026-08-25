export interface PollingStation {
  idPollingStation: number;
  idElection: number;
  code: string;
  name: string;
  location: string;
  status: string;
  openedAt?: string;
  closedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PollingStationMember {
  idPollingStationMember: number;
  idPollingStation: number;
  userIdentifier: string;
  fullName: string;
  institutionalEmail: string;
  role: string;
  status: boolean;
  createdAt?: string;
}

export interface PollingStationSummary {
  idPollingStation: number;
  idElection: number;
  total: number;
  pending: number;
  enabled: number;
  voted: number;
  blocked: number;
  status: string;
}
