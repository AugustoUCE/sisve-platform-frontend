export interface ElectoralRoll {
  idElectoralRoll: number;
  idPollingStation: number;
  idElection: number;
  idVoter: number;
  cedula: string;
  fullName: string;
  institutionalEmail: string;
  participationStatus: string;
  enabledAt?: string;
  enabledBy?: string;
  votedAt?: string;
  blockedAt?: string;
  blockedBy?: string;
  blockReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PollingStationEligibility {
  idElection: number;
  idVoter: number;
  idPollingStation: number;
  eligible: boolean;
  participationStatus: string;
  pollingStationStatus: string;
}
