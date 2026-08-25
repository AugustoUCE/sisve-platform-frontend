import { pollingStationApi } from "@/services/api";
import type {
  ElectoralRoll,
  PollingStationEligibility
} from "@/interfaces/polling-station/ElectoralRoll";
import type {
  PollingStation,
  PollingStationMember,
  PollingStationSummary
} from "@/interfaces/polling-station/PollingStation";
import type {
  BlockVoterRequest,
  CloseStationRequest,
  EnableVoterRequest,
  OpenStationRequest
} from "@/interfaces/polling-station/PollingStationRequests";

export async function getPollingStationsByElection(idElection: number): Promise<PollingStation[]> {
  const { data } = await pollingStationApi.get<PollingStation[]>(`/polling-stations/election/${idElection}`);
  return data;
}

export async function getPollingStation(idPollingStation: number): Promise<PollingStation> {
  const { data } = await pollingStationApi.get<PollingStation>(`/polling-stations/${idPollingStation}`);
  return data;
}

export async function getElectoralRoll(idPollingStation: number): Promise<ElectoralRoll[]> {
  const { data } = await pollingStationApi.get<ElectoralRoll[]>(`/polling-stations/${idPollingStation}/electoral-roll`);
  return data;
}

export async function getPollingStationMembers(idPollingStation: number): Promise<PollingStationMember[]> {
  const { data } = await pollingStationApi.get<PollingStationMember[]>(`/polling-stations/${idPollingStation}/members`);
  return data;
}

export async function searchVoter(idPollingStation: number, cedula: string): Promise<ElectoralRoll> {
  const { data } = await pollingStationApi.get<ElectoralRoll>(`/polling-stations/${idPollingStation}/voters/search`, { params: { cedula } });
  return data;
}

export async function checkEligibility(idElection: number, idVoter: number): Promise<PollingStationEligibility> {
  const { data } = await pollingStationApi.get<PollingStationEligibility>(`/polling-stations/election/${idElection}/voters/${idVoter}/eligibility`);
  return data;
}

export async function enableVoter(idPollingStation: number, idVoter: number, request: EnableVoterRequest): Promise<unknown> {
  const { data } = await pollingStationApi.post(`/polling-stations/${idPollingStation}/voters/${idVoter}/enable`, request);
  return data;
}

export async function blockVoter(idPollingStation: number, idVoter: number, request: BlockVoterRequest): Promise<unknown> {
  const { data } = await pollingStationApi.post(`/polling-stations/${idPollingStation}/voters/${idVoter}/block`, request);
  return data;
}

export async function markVoterAsVoted(idElection: number, idVoter: number): Promise<unknown> {
  const { data } = await pollingStationApi.post(`/polling-stations/election/${idElection}/voters/${idVoter}/mark-voted`);
  return data;
}

export async function closePollingStation(idPollingStation: number, request: CloseStationRequest): Promise<unknown> {
  const { data } = await pollingStationApi.post(`/polling-stations/${idPollingStation}/close`, request);
  return data;
}

export async function openPollingStation(idPollingStation: number, request: OpenStationRequest): Promise<unknown> {
  const { data } = await pollingStationApi.post(`/polling-stations/${idPollingStation}/open`, request);
  return data;
}

export async function getPollingStationSummary(idPollingStation: number): Promise<PollingStationSummary> {
  const { data } = await pollingStationApi.get<PollingStationSummary>(`/polling-stations/${idPollingStation}/summary`);
  return data;
}