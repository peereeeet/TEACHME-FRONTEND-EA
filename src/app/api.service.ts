import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';
import { Asignatura } from './models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/'; 

  constructor(private http: HttpClient) {}

  // Métodos para el CRUD de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuarios`);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}usuarios/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuarios`, usuario);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}usuarios/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}usuarios/${id}`);
  }

  // Obtener todas las asignaturas
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}asignaturas`);
  }

  // Crear una nueva asignatura
  createAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.apiUrl}asignaturas`, asignatura);
  }

  // Eliminar una asignatura
  deleteAsignatura(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}asignaturas/${id}`);
  }

  getUsuarioAsignaturas(usuarioId: string): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas`);
  }

  // Asignar asignatura (cambiado a PUT)
  asignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`, {});
  }

  // Desasignar asignatura
  desasignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`);
  }
}
