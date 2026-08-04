// src/services/vote.service.ts

const VOTE_API_URL = import.meta.env.VITE_VOTE_API_URL;

export interface VoteRequest {
  idVotante: number;
  idEleccion: number;
  idCargo: number;
  idCandidato: number;
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

  localStorage.removeItem("token");
  localStorage.removeItem("student");

  return await response.json();
}
