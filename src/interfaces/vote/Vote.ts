export interface Vote {
  idVoto: number;
  idVotante: number;
  idEleccion: number;
  idCargo: number;
  idCandidato: number;
  fechaRegistro: string;
  hashActual: string;
}