import { Asignatura } from './asignatura.model';

export interface Usuario {
  _id: string;
  nombre: string;
  edad: number;
  email: string;
  password: string;
  isProfesor: boolean;
  isAlumno: boolean;
  isAdmin: boolean;
  asignaturasImparte: Asignatura[]; // Cambiado para contener objetos de tipo Asignatura
}
