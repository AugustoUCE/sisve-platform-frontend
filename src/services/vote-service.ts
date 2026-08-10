// src/services/vote.service.ts

const VOTE_API_URL = import.meta.env.VITE_VOTE_API_URL;

export type SpecialVoteType = "BLANCO" | "NULO";

export interface VoteRequest {
  idVotante: number;
  idEleccion: number;
  idCargo: number;
  idCandidato: number | null;
  tipoVoto?: SpecialVoteType;
}

export async function emitVote(request: VoteRequest) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${VOTE_API_URL}/votos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
}
