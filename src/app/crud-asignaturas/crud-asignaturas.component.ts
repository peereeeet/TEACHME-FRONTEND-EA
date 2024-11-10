import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Asignatura } from '../models/asignatura.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-asignaturas',
  templateUrl: './crud-asignaturas.component.html',
  styleUrls: ['./crud-asignaturas.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CrudAsignaturasComponent implements OnInit {
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura = { _id: '', nombre: '', descripcion: '', usuarios: [] };
  page = 1;
  limit = 3;
  totalPages = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAsignaturas();
  }

  loadAsignaturas() {
    this.apiService.getAsignaturasPaginadas(this.page, this.limit).subscribe((data) => {
      this.asignaturas = data.asignaturas;
      this.totalPages = data.totalPages;
    });
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

  goToPage(page: number) {
    this.page = page;
    this.loadAsignaturas();
  }
}
