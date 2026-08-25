// src/interfaces/auth/ValidateResponse.ts

export interface ValidateResponse {
  valido: boolean;
  idVotante: number;
  cedula: string;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
}
