import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HomepagComponent } from './homepag/homepag.component';
import { HomePageComponent} from './home-page/home-page.component';
import { RecetteComponent } from './recette/recette.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepag', component: HomepagComponent },
  { path: 'homepage', component: HomePageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { path: "ingredient", component: IngredientsComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }];
