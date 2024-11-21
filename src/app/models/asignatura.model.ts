export interface Asignatura {
  _id?: string;
  nombre: string;
  descripcion?: string;
  usuariosAsignados?: string[]; // IDs de usuarios
}
