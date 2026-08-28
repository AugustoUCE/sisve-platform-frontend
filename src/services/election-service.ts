import type { Election } from "@/interfaces/election/Election";
import type { Cargo } from "@/interfaces/election/Cargo";
import type { Candidate } from "@/interfaces/election/Candidate";
import { electionApi } from "@/services/api";


// Obtener elecciones
export async function getActiveElection(): Promise<Election> {

  const { data } = await electionApi.get<Election[]>("/elecciones/activas");
  const election = data[0];
  if (!election) throw new Error("No existe una elección activa");
  return election;
}


// Obtener cargos de una elección
export async function getCargos(
  idEleccion: number
): Promise<Cargo[]> {

  const { data } = await electionApi.get<Cargo[]>(`/elecciones/${idEleccion}/cargos`);
  return data;
}


// Obtener candidatos de un cargo
export async function getCandidates(
  idCargo: number
): Promise<Candidate[]> {

  const { data } = await electionApi.get<Candidate[]>(`/cargos/${idCargo}/candidatos`);
  return data.filter((candidate) => candidate.estado !== false).map((candidate) => ({
    ...candidate,
    nombre: `${candidate.nombres} ${candidate.apellidos}`.trim(),
    descripcion: candidate.lista || "",
    logo: candidate.logo || ""
  }));
}

export async function getElectionById(idEleccion: number): Promise<Election> {
  const { data } = await electionApi.get<Election>(`/elecciones/${idEleccion}`);
  return data;
}

export async function getParticipationStatus(idEleccion: number, idVotante: number) {
  const { data } = await electionApi.get(`/elecciones/${idEleccion}/votantes/${idVotante}/estado`);
  return data;
}