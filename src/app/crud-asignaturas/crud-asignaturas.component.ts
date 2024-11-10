import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Asignatura } from '../models/asignatura.model';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-asignaturas',
  templateUrl: './crud-asignaturas.component.html',
  styleUrls: ['./crud-asignaturas.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Asegúrate de incluir FormsModule aquí
})
export class CrudAsignaturasComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura = { _id: '', nombre: '', descripcion: '', usuarios: [] };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAsignaturas();
  }

  loadAsignaturas() {
    this.apiService.getAsignaturas().subscribe((data) => (this.asignaturas = data));
  }

  submitForm() {
    this.apiService.createAsignatura(this.asignatura).subscribe(() => {
      this.loadAsignaturas();
      this.resetForm();
    });
  }

  deleteAsignatura(id: string) {
    this.apiService.deleteAsignatura(id).subscribe(() => this.loadAsignaturas());
  }

  resetForm() {
    this.asignatura = { _id: '', nombre: '', descripcion: '', usuarios: [] };
  }
}
