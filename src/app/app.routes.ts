import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HomepagComponent } from './homepag/homepag.component';
import { HomePageComponent} from './features/home-page/home-page.component';
import { RecetteComponent } from './recette/recette.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepag', component: HomepagComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }];
