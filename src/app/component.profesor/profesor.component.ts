import { Component, OnInit } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { ApiService } from '../api.service'; 
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-profesor',
  standalone: true,  // Asegúrate de que es standalone
  imports: [FormsModule, CommonModule],  // Importa FormsModule y CommonModule aquí
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})

export class ProfesorComponent implements OnInit {
  profesores: Profesor[] = [];
  profesor: Profesor = {
    _id: '0',  // Asegúrate de que haya un id inicializado
    nombre: '',
    edad: 0,
    asignaturasImparte: []
  };


  constructor(private apiService: ApiService, private router: Router) {} // Inyecta Router

  ngOnInit(): void {
    this.apiService.getProfesores().subscribe((profesores: Profesor[]) => {
      this.profesores = profesores;
      console.log(this.profesores); // Para verificar que se están obteniendo correctamente

    });
  }

  //añade todos los métodos que tengo en la api

  prepararActualizarProfesor(profesor: Profesor): void {
    this.profesor = { ...profesor }; // Clona el objeto profesor seleccionado
  }
  

  /////////////////////////////////////////CREAR PROFESOR////////////////////////////////////////
  crearProfesor(nombre: string, edad: number): void {
    const edadNumero = Number(edad); // Asegúrate de convertir 'edad' a número
    if (isNaN(edadNumero)) {
      console.error('La edad debe ser un número válido.');
      return; // Detener la ejecución si no es un número
    }
    this.apiService.crearProfesor(nombre, edadNumero).subscribe((profesor: Profesor) => {
      console.log(profesor);
    });
  }
  ////////////////////////////////////////////////////VER PROFESOR POR NOMBRE////////////////////////////////////////
  verProfesorPorNombre(nombre: string): void {
    this.apiService.getProfesorByName(nombre).subscribe((profesor: Profesor) => {
      this.profesor = profesor;
      console.log(profesor);
    });
  }
  ////////////////////////////////////////////////////LISTAR PROFESORES////////////////////////////////////////
  listarProfesores(): void {
    this.apiService.listarProfesores().subscribe((profesores: Profesor[]) => {
      this.profesores = profesores; // Asigna los datos recibidos al array profesores
      console.log(profesores);
    });
  }
/////////////////////////////////////////ACTUALIZAR PROFESOR///////////////////////////////////////////
actualizarProfesor(id: string, nombre: string, edad: number): void {
  if (!id) {
    console.error('El id del profesor es necesario para la actualización.');
    return; // Detener la ejecución si no hay un id
}
const profesorActualizado: Profesor = { 
    _id: id,  // Asegúrate de que el id no sea undefined
    nombre, 
    edad, 
    asignaturasImparte: [] 
};
this.apiService.actualizarProfesorPorId(id, profesorActualizado).subscribe((profesor: Profesor) => {
    console.log('Profesor actualizado:', profesor);
    this.profesor = profesor; // Asigna el profesor actualizado
    // Aquí podrías agregar lógica para actualizar la lista de profesores o redirigir
});
}

  ////////////////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR////////////////////////////////////////
  asignarAsignaturasAProfesor(nombreProfesor: string, nombresAsignaturas: string[]): void {
    this.apiService.asignarAsignaturasAProfesor(nombreProfesor, nombresAsignaturas).subscribe((profesor: Profesor) => {
      console.log(profesor);
    });
  }
  ///////////////////////////////ACTUALIZAR ASIGNATURAS DE PROFESOR POR NOMBRE///////////////////////////
  actualizarAsignaturasProfesorPorNombre(nombreProfesor: string, nuevasAsignaturas: string[]): void {
    this.apiService.actualizarAsignaturasProfesorPorNombre(nombreProfesor, nuevasAsignaturas).subscribe((profesor: Profesor) => {
      console.log(profesor);
    });
  }
  
  /////////////////////////////////////////BORRAR PROFESOR COMPLETO POR NOMBRE////////////////////////////////////////
  borrarProfesor(nombre: string): void {
    this.apiService.borrarProfesor(nombre).subscribe((profesor: Profesor) => {
      console.log(profesor);
    });
  }
  /////////////////////////////////////////BORRAR ASIGNATURA DE PROFESOR POR NOMBRE////////////////////////////////////////
  borrarAsignaturaDeProfesor(nombreProfesor: string, nombreAsignatura: string): void {
    this.apiService.borrarAsignaturaDeProfesor(nombreProfesor, nombreAsignatura).subscribe((profesor: Profesor) => {
      console.log(profesor);
    });
  }

}
