import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from './component.profesor/profesor.component'; 

const routes: Routes = [
  { path: 'profesor', component: ProfesorComponent },
  // Otras rutas aquí...

];

export const AppRoutingModule = RouterModule.forRoot(routes);
