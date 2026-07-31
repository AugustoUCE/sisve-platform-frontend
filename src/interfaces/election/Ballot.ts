import type { Cargo } from "./Cargo";

export interface Ballot {
  idEleccion: number;
  cargos: Cargo[];
}