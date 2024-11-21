import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Ruta al backend

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
        tap((response: any) => {
            const token = response.token;
            if (token) {
                this.saveToken(token); // Guarda el token
                console.log('Token guardado:', token); // Log para depuración
            } else {
                console.error('No se recibió token en la respuesta.');
            }
        })
    );
}
  saveToken(token: string): void {
    localStorage.setItem('auth-token', token); // Asegúrate de que se guarde con esta clave
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si hay un token almacenado
  }
  

  logout(): void {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
