export interface EnableVoterRequest {
  enabledBy: string;
}

export interface BlockVoterRequest {
  blockedBy: string;
  reason: string;
}

export interface CloseStationRequest {
  closedBy: string;
}

export interface OpenStationRequest {
  openedBy: string;
}
