// src/interfaces/auth/BackendLoginResponse.ts

export interface BackendLoginResponse {
  token: string;
  idVotante: number;
  cedula: number;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
}
