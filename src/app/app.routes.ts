import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepagComponent } from './homepag/homepag.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./features/home-page/home-page.component")
      .then(m => m.HomePageComponent)
  },
];