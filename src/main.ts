import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ProfesorComponent } from './app/component.profesor/profesor.component'; // Importa directamente ProfesorComponent
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module'; // Importa tu módulo de enrutamiento
import { importProvidersFrom } from '@angular/core'; // Importa para poder usar importProvidersFrom
import { AppComponent } from './app/app.component'; // Importa directamente AppComponent

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(AppRoutingModule) // Usa el módulo de enrutamiento aquí

  ]
}).catch(err => console.error(err));