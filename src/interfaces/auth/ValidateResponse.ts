// src/interfaces/auth/ValidateResponse.ts

export interface ValidateResponse {
  valido: boolean;
  idVotante: number;
  cedula: number;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
}
