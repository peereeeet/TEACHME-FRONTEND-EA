import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudAsignaturasComponent } from './crud-asignaturas/crud-asignaturas.component';
import { PopulateComponent } from './populate/populate.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige por defecto al login
  { path: 'login', component: LoginComponent }, // Ruta pública para login
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'crud-usuarios', component: CrudUsuariosComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'crud-asignaturas', component: CrudAsignaturasComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: 'populate', component: PopulateComponent, canActivate: [AuthGuard] }, // Ruta protegida
  { path: '**', redirectTo: '/login' } // Redirige cualquier ruta desconocida al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

