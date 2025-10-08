import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HomepagComponent } from './homepag/homepag.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepag', component: HomepagComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }];
