import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from './models/profesor.model';
import { Asignatura } from './models/asignatura.models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}api/profesores`);
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.apiUrl}api/profesores`, profesor);
  }
//añade todos los métodos que tengo en la api

  /////////////////////////////////////////VER PROFESOR POR NOMBRE/////////////////////////////////////
  getProfesorByName(nombre: string): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}api/profesores/${nombre}`);
  }
  /////////////////////////////////////////LISTAR PROFESORES//////////////////////////////////////
  listarProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.apiUrl}api/profesores`);
  }

  /////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR/////////////////////////////////////
  asignarAsignaturasAProfesor(nombreProfesor: string, nombresAsignaturas: string[]): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}api/profesores/${nombreProfesor}/asignaturas`, nombresAsignaturas);
  }
  ///////////////////////////////ACTUALIZAR ASIGNATURAS DE PROFESOR POR NOMBRE///////////////////////////
  actualizarAsignaturasProfesorPorNombre(nombreProfesor: string, nuevasAsignaturas: string[]): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}api/profesores/${nombreProfesor}/asignaturas`, nuevasAsignaturas);
  }
  /////////////////////////////////////////CREAR PROFESOR////////////////////////////////////////
  crearProfesor(nombre: string, edad: number): Observable<Profesor> {
    return this.http.post<Profesor>(`${this.apiUrl}api/profesores`, { nombre, edad });
  }
  /////////////////////////////////////////BORRAR PROFESOR COMPLETO POR NOMBRE////////////////////////////////////////
  borrarProfesor(nombre: string): Observable<Profesor> {
    return this.http.delete<Profesor>(`${this.apiUrl}api/profesores/${nombre}`);
  }
  /////////////////////////////////////////BORRAR ASIGNATURA DE PROFESOR POR NOMBRE////////////////////////////////////////
  borrarAsignaturaDeProfesor(nombreProfesor: string, nombreAsignatura: string): Observable<Profesor> {
    return this.http.delete<Profesor>(`${this.apiUrl}api/profesores/${nombreProfesor}/asignaturas/${nombreAsignatura}`);
  }
/////////////////////////////////////////ACTUALIZAR PROFESOR POR ID///////////////////////////////////////////
actualizarProfesorPorId(id: string, profesor: Profesor): Observable<Profesor> {
  return this.http.put<Profesor>(`${this.apiUrl}api/profesores/${id}`, profesor);
}
///////////////////////////////////////// CRUD DE ASIGNATURAS ///////////////////////////////////////

  // Obtener todas las asignaturas
  listarAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}api/asignaturas`);
  }

  // Crear una nueva asignatura
  crearAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.apiUrl}api/asignaturas`, asignatura);
  }

  // Obtener una asignatura por ID
  obtenerAsignaturaPorId(id: string): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}api/asignaturas/${id}`);
  }

  // Actualizar una asignatura por ID
  actualizarAsignatura(id: string, asignatura: Asignatura): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${this.apiUrl}api/asignaturas/${id}`, asignatura);
  }

  // Eliminar una asignatura por ID
  borrarAsignatura(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/asignaturas/${id}`);
  }
}

