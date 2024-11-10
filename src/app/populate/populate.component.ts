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
  feedbackMessage: string = '';
  showNotification: boolean = false;
  page = 1;
  limit = 3;
  totalPages = 1;

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
    this.page = 1; // Reinicia la página al cambiar de usuario
    this.loadUsuarioAsignaturas();
  }

  loadUsuarioAsignaturas() {
    if (this.selectedUsuarioId) {
      this.apiService.getUsuarioAsignaturasPaginadas(this.selectedUsuarioId, this.page, this.limit)
        .subscribe((data) => {
          this.asignaturasAsignadas = data.asignaturas;
          this.totalPages = data.totalPages;
          this.clearNotification();
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
        this.apiService.asignarAsignatura(this.selectedUsuarioId, this.selectedAsignaturaId)
          .subscribe(() => {
            this.loadUsuarioAsignaturas();
            this.showFeedback('Asignatura asignada con éxito.');
            this.selectedAsignaturaId = '';
          });
      }
    }
  }

  desasignarAsignatura(asignaturaId: string) {
    if (this.selectedUsuarioId && asignaturaId) {
      this.apiService.desasignarAsignatura(this.selectedUsuarioId, asignaturaId)
        .subscribe(() => {
          this.loadUsuarioAsignaturas();
          this.showFeedback('Asignatura desasignada con éxito.');
        });
    }
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.page = page;
      this.loadUsuarioAsignaturas();
    }
  }

  showFeedback(message: string) {
    this.feedbackMessage = message;
    this.showNotification = true;
    setTimeout(() => this.clearNotification(), 3000);
  }

  clearNotification() {
    this.feedbackMessage = '';
    this.showNotification = false;
  }
}
