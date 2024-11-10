import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';
import { Asignatura } from './models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  // Método para obtener usuarios paginados
  getUsuariosPaginados(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}usuarios/listar-paginados`, { params });
  }

  // Método para obtener asignaturas paginadas
  getAsignaturasPaginadas(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}asignaturas/paginacion`, { params });
  }

  // Método para obtener asignaturas de un usuario con paginación
  getUsuarioAsignaturasPaginadas(usuarioId: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/paginacion`, { params });
  }

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

  // Obtener asignaturas de un usuario
  getUsuarioAsignaturas(usuarioId: string): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas`);
  }

  // Asignar asignatura a un usuario
  asignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`, {});
  }

  // Desasignar asignatura de un usuario
  desasignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`);
  }
}
