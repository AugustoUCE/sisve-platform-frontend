// src/services/auth.service.ts

import type { RequestLogin } from "@/interfaces/auth/RequestLogin";
import type { ResponseLogin } from "@/interfaces/auth/ResponseLogin";
import type { Student } from "@/interfaces/auth/Student";

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

interface BackendLoginResponse {
  token: string;
  idVotante: number;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
  estado: boolean;
  voto: boolean;
}

interface ValidateResponse {
  valido: boolean;
  idVotante: number;
  cedula: string;
  correoInstitucional: string;
  nombres: string;
  apellidos: string;
  estado: boolean;
  voto: boolean;
  
}

export async function login(request: RequestLogin): Promise<ResponseLogin> {
  try {
    const response = await fetch(`${AUTH_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Credenciales incorrectas."
      };
    }

    const data: BackendLoginResponse = await response.json();

    const student: Student = {
      idVotante: data.idVotante,
      correoInstitucional: data.correoInstitucional,
      nombres: data.nombres,
      apellidos: data.apellidos,
      estado: data.estado,
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
    const response = await fetch(`${AUTH_API_URL}/auth/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
      return null;
    }

    const data: ValidateResponse = await response.json();

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
      estado: data.estado,
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
    await fetch(`${AUTH_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: "{}"
    });
  }

  localStorage.removeItem("token");
  localStorage.removeItem("student");
}


/*export async function verificarVoto(
  request: RequestLogin
): Promise<boolean> {
  const response = await fetch("/mockdata/auth-service/studentData.json");

  if (!response.ok) {
    throw new Error("No se pudo cargar el listado de estudiantes.");
  }

  const data = await response.json();

  const estudiante = data.students.find(
    (e: any) => e.cedula === request.cedula
  );

  return estudiante?.yaVoto ?? false;
}*/