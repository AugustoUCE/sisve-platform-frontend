// src/services/vote.service.ts

import { voteApi } from "@/services/api";
import type { ResponseVote } from "@/interfaces/vote/ResponseVote";

export interface VoteRequest {
  idVotante: number;
  idEleccion: number;
  idCargo: number;
  idCandidato: number;
}

export async function emitVote(request: VoteRequest): Promise<ResponseVote> {
  const { data } = await voteApi.post<ResponseVote>("/votos", request);
  return data;
}

export async function verifyIntegrity(idEleccion: number): Promise<boolean> {
  const { data } = await voteApi.get<{ integridadValida: boolean }>(
    `/votos/eleccion/${idEleccion}/verificar-integridad`
  );
  return data.integridadValida;
}
