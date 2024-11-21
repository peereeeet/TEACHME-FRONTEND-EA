import { Asignatura } from './asignatura.model';

export interface Usuario {
  _id?: string; // Opcional, ya que se genera en el backend
  nombre?: string;
  edad?: number;
  email: string;
  password?: string; // Opcional, solo se usa para login o actualizaciones
  isProfesor?: boolean;
  isAlumno?: boolean;
  isAdmin?: boolean;
  asignaturasImparte?: Asignatura[]; // Cambiar a un array de objetos `Asignatura`
}
