import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar Router aquí
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar ngModel

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, FormsModule]  // Importa RouterOutlet y FormsModule aquí

})
export class AppComponent {

  constructor(private router: Router) {}  // El Router debe ser inyectado aquí

  goToProfesor(): void {
    this.router.navigate(['/profesor']);  
  }
}