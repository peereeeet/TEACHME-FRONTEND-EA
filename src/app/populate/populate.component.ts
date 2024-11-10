import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Usuario } from '../models/usuario.model';
import { Asignatura } from '../models/asignatura.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PopulateComponent implements OnInit {
  usuarios: Usuario[] = [];
  asignaturas: Asignatura[] = [];
  selectedUsuarioId: string = '';
  selectedAsignaturaId: string = '';
  asignaturasAsignadas: Asignatura[] = [];
  feedbackMessage: string = ''; // Mensaje de notificación
  showNotification: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsuarios();
    this.loadAsignaturas();
  }

  loadUsuarios() {
    this.apiService.getUsuarios().subscribe((data) => (this.usuarios = data));
  }

  loadAsignaturas() {
    this.apiService.getAsignaturas().subscribe((data) => (this.asignaturas = data));
  }

  onUsuarioChange() {
    if (this.selectedUsuarioId) {
      this.apiService.getUsuarioAsignaturas(this.selectedUsuarioId).subscribe((data) => {
        this.asignaturasAsignadas = data;
        this.clearNotification(); // Limpia la notificación al cambiar de usuario
      });
    } else {
      this.asignaturasAsignadas = [];
      this.clearNotification();
    }
  }

  asignarAsignatura() {
    if (this.selectedUsuarioId && this.selectedAsignaturaId) {
      const asignaturaYaAsignada = this.asignaturasAsignadas.some(
        (asignatura) => asignatura._id === this.selectedAsignaturaId
      );

      if (asignaturaYaAsignada) {
        this.showFeedback('La asignatura ya estaba previamente asignada a este usuario.');
      } else {
        this.apiService.asignarAsignatura(this.selectedUsuarioId, this.selectedAsignaturaId).subscribe(() => {
          this.onUsuarioChange();
          this.showFeedback('Asignatura asignada con éxito.');
          this.selectedAsignaturaId = '';
        });
      }
    }
  }

  desasignarAsignatura(asignaturaId: string) {
    if (this.selectedUsuarioId && asignaturaId) {
      this.apiService.desasignarAsignatura(this.selectedUsuarioId, asignaturaId).subscribe(() => {
        this.onUsuarioChange();
        this.showFeedback('Asignatura desasignada con éxito.');
      });
    }
  }

  showFeedback(message: string) {
    this.feedbackMessage = message;
    this.showNotification = true;
    setTimeout(() => this.clearNotification(), 3000); // Desaparece después de 3 segundos
  }

  clearNotification() {
    this.feedbackMessage = '';
    this.showNotification = false;
  }
}
