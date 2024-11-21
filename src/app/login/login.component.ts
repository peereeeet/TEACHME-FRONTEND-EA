import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Para usar funciones comunes de Angular

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegurarse de incluir los módulos necesarios
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.saveToken(token); // Guarda el token en localStorage
        this.router.navigate(['/home']); // Redirige al home tras login exitoso
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      },
    });
  }
  
}
