// src/interfaces/auth/BackendLoginResponse.ts

export interface BackendLoginResponse {
  token: string;
  idVotante: number;
  cedula?: string;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
  voto: boolean;
}
