// src/services/auth.service.ts

import type { RequestLogin } from "@/interfaces/auth/RequestLogin";
import type { ResponseLogin } from "@/interfaces/auth/ResponseLogin";
import type { Student } from "@/interfaces/auth/Student";
import { authApi } from "@/services/api";

import type { BackendLoginResponse } from "@/interfaces/auth/BackendLoginResponse";
import type { ValidateResponse } from "@/interfaces/auth/ValidateResponse";

export async function login(request: RequestLogin): Promise<ResponseLogin> {
  try {
    const { data } = await authApi.post<BackendLoginResponse>("/auth/login", request);

    const student: Student = {
      idVotante: data.idVotante,
      correoInstitucional: data.correoInstitucional,
      nombres: data.nombres,
      apellidos: data.apellidos,
      voto:data.voto
      
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("student", JSON.stringify(student));

    return {
      success: true,
      message: "Inicio de sesión correcto.",
      token: data.token,
      student
    };
  } catch (error) {
    console.error("Error conectando con auth-service:", error);

    return {
      success: false,
      message: "No se pudo conectar con auth-service."
    };
  }
}

export async function validateToken(): Promise<Student | null> {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const { data } = await authApi.get<ValidateResponse>("/auth/validate");

    if (!data.valido) {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
      return null;
    }

    const student: Student = {
      idVotante: data.idVotante,
      cedula: data.cedula,
      correoInstitucional: data.correoInstitucional,
      nombres: data.nombres,
      apellidos: data.apellidos,
      voto:data.voto

    };

    localStorage.setItem("student", JSON.stringify(student));

    return student;
  } catch (error) {
    console.error("Error validando token:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("student");
    return null;
  }
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem("token");

  if (token) {
    await authApi.post("/auth/logout", {});
  }

  localStorage.removeItem("token");
  localStorage.removeItem("student");

}
