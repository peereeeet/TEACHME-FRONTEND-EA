import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';
import { Asignatura } from './models/asignatura.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token') || '';
    console.log('Token enviado en el encabezado:', token); // Log para verificar
    return new HttpHeaders().set('auth-token', token); // Cambiar a 'auth-token'
}
  // Métodos para CRUD de usuarios
  createUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.post<Usuario>(`${this.apiUrl}usuarios`, usuario, { headers });
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    const headers = this.getAuthHeaders();
    return this.http.put<Usuario>(`${this.apiUrl}usuarios/${id}`, usuario, { headers });
  }

  deleteUsuario(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}usuarios/${id}`, { headers });
  }

  // Métodos para CRUD de asignaturas
  createAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    const headers = this.getAuthHeaders();
    return this.http.post<Asignatura>(`${this.apiUrl}asignaturas`, asignatura, { headers });
  }

  deleteAsignatura(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}asignaturas/${id}`, { headers });
  }
// Agrega este método a api.service.ts
getUsuarios(): Observable<Usuario[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Usuario[]>(`${this.apiUrl}usuarios`, { headers });
}

// Agrega este método a api.service.ts
getAsignaturas(): Observable<Asignatura[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Asignatura[]>(`${this.apiUrl}asignaturas`, { headers });
}

// Agrega este método a api.service.ts
getUsuarioAsignaturasPaginadas(usuarioId: string, page: number, limit: number): Observable<any> {
  const headers = this.getAuthHeaders();
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<any>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/paginacion`, { headers, params });
}

  // Métodos adicionales que ya existían...
  getUsuariosPaginados(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}usuarios/listar-paginados`, { params, headers });
  }

  getAsignaturasPaginadas(page: number, limit: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}asignaturas/paginacion`, { headers });
  }

  // Métodos para asignar/desasignar asignaturas...
  asignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`, {}, { headers });
  }

  desasignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`, { headers });
  }
}
