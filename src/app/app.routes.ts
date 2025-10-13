import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HomepagComponent } from './homepag/homepag.component';
import { HomepageComponent} from './features/home-page/home-page.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepag', component: HomepagComponent },
  { path: 'homepage', component: HomepageComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }];
