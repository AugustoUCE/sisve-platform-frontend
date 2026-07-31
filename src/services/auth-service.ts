//primero interfaces 
import type { RequestLogin } from "@/interfaces/auth/RequestLogin";
import type { ResponseLogin } from "@/interfaces/auth/ResponseLogin";
import type { Student } from "@/interfaces/auth/Student";

interface StudentData {
  students: Student[];
}
export async function login(
  request: RequestLogin
): Promise<ResponseLogin> {

  const response = await fetch("/mockdata/auth-service/studentData.json");

  const data: StudentData = await response.json();

  const student = data.students.find(
    (s) =>
      s.cedula === request.cedula &&
      s.correoInstitucional === request.correoInstitucional
  );

  if (!student) {
    return {
      success: false,
      message: "Credenciales incorrectas."
    };
  }
return {
    success: true,
    message: "Inicio de sesión correcto.",
    token: "mock-jwt-token",
    student
  };
}