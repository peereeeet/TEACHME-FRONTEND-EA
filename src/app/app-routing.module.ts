import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudAsignaturasComponent } from './crud-asignaturas/crud-asignaturas.component';
import { PopulateComponent } from './populate/populate.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto que redirige a Home
  { path: 'home', component: HomeComponent },
  { path: 'crud-usuarios', component: CrudUsuariosComponent },
  { path: 'crud-asignaturas', component: CrudAsignaturasComponent },
  { path: 'populate', component: PopulateComponent },
  { path: '**', redirectTo: '/home' } // Ruta para redirigir cualquier ruta desconocida a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

