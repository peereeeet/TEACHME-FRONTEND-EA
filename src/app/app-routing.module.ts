import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Componente principal
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component'; // CRUD usuarios
import { CrudAsignaturasComponent } from './crud-asignaturas/crud-asignaturas.component'; // CRUD asignaturas
import { PopulateComponent } from './populate/populate.component'; // Asignaturas dentro de usuario
import { AuthGuard } from './guards/auth.guard'; // Guard para login

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a Home
  { path: 'home', component: HomeComponent },
  { 
    path: 'crud-usuarios', 
    component: CrudUsuariosComponent,
    canActivate: [AuthGuard], // Protegido con un guard
    data: { isAdmin: true } // Solo para administradores
  },
  { 
    path: 'crud-asignaturas', 
    component: CrudAsignaturasComponent,
    canActivate: [AuthGuard],
    data: { isAdmin: true }
  },
  { 
    path: 'populate', 
    component: PopulateComponent,
    canActivate: [AuthGuard],
    data: { isAdmin: true }
  },
  { path: '**', redirectTo: '/home' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
