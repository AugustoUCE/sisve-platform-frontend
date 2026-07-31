import type { Election } from "@/interfaces/election/Election";
import type { Cargo } from "@/interfaces/election/Cargo";
import type { Candidate } from "@/interfaces/election/Candidate";


// Obtener elecciones
export async function getActiveElection(): Promise<Election> {

  const response = await fetch(
    "/mockdata/election-service/elections.json"
  );

  if (!response.ok) {
    throw new Error("No se pudo cargar la elección");
  }

  const elections: Election[] = await response.json();

  return elections.find(
    (e) => e.estado === "ACTIVA"
  )!;
}


// Obtener cargos de una elección
export async function getCargos(
  idEleccion: number
): Promise<Cargo[]> {

  const response = await fetch(
    "/mockdata/election-service/cargos.json"
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar los cargos");
  }

  const cargos: Cargo[] = await response.json();

  return cargos.filter(
    (c) => c.idEleccion === idEleccion
  );
}


// Obtener candidatos de un cargo
export async function getCandidates(
  idCargo: number
): Promise<Candidate[]> {

  const response = await fetch(
    "/mockdata/election-service/candidates.json"
  );

  if (!response.ok) {
    throw new Error("No se pudieron cargar candidatos");
  }

  const candidates: Candidate[] = await response.json();

  return candidates.filter(
    (c) => c.idCargo === idCargo
  );
}