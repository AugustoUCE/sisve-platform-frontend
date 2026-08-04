import type { Student } from "./Student";

export interface ResponseLogin {
  success: boolean;
  message: string;
  token?: string;
  student?: Student;
}
