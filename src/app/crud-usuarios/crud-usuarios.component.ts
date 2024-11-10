import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Usuario } from '../models/usuario.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CrudUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  user: Usuario = { 
    _id: '', 
    nombre: '', 
    edad: 0, 
    email: '', 
    password: '', 
    isProfesor: false, 
    isAlumno: false, 
    isAdmin: false, 
    asignaturasImparte: [] 
  };
  confirmPassword = ''; 
  isEditMode = false;
  passwordErrorMessage = ''; // Mensaje de error para la contraseña

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.apiService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  submitForm() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(this.user.email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    // Validación de longitud de contraseña
    if (this.user.password.length < 7) {
      this.passwordErrorMessage = "La contraseña debe tener al menos 7 caracteres.";
      return;
    } else {
      this.passwordErrorMessage = ''; // Resetea el mensaje de error si la longitud es válida
    }

    if (!this.isEditMode && (!this.user.nombre || !this.user.edad || !this.user.email || !this.user.password || this.user.password !== this.confirmPassword)) {
      alert("Por favor, rellena todos los campos y asegúrate de que las contraseñas coincidan.");
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateUsuario(this.user._id, this.user).subscribe(() => this.loadUsuarios());
    } else {
      this.apiService.createUsuario(this.user).subscribe(() => this.loadUsuarios());
    }
    this.resetForm();
  }

  editUsuario(usuario: Usuario) {
    this.user = { ...usuario };
    this.confirmPassword = this.user.password;
    this.isEditMode = true;
  }

  deleteUsuario(id: string) {
    this.apiService.deleteUsuario(id).subscribe(() => this.loadUsuarios());
  }

  resetForm() {
    this.user = { 
      _id: '', 
      nombre: '', 
      edad: 0, 
      email: '', 
      password: '',               
      isProfesor: false, 
      isAlumno: false, 
      isAdmin: false, 
      asignaturasImparte: []       
    };
    this.confirmPassword = ''; 
    this.isEditMode = false;
    this.passwordErrorMessage = ''; // Resetea el mensaje de error
  }
}
