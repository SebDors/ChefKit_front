import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // Pas nécessaire ici si seulement utilisé par des composants standalone qui l'importent eux-mêmes

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Si tu as besoin d'importer d'autres modules pour des services ou des modules d'eager loading, tu peux les ajouter ici
    // importProvidersFrom(...)
  ]
};