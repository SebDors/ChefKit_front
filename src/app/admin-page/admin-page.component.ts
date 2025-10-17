import { Component, OnInit, HostListener, inject } from '@angular/core'; // Removed 'inject' as it wasn't used
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { Recette } from '../models/recette.model';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  isScrolled = false;
  currentYear = new Date().getFullYear();

  // Nouvelle propriété pour gérer l'onglet actif
  activeSection: 'users' | 'recettes' | 'ingredients' = 'users'; // Par défaut, afficher les utilisateurs

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  usersCount:number = 0;
  recettesCount:number = 0;
  ingredientsCount:number = 0;

  // Models for the forms
  readUserModel = { username: '' };
  readUserResult: User | null = null;
  userError: string = '';
  createUserModel: Partial<User> = { nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  updateUserModel: Partial<User> & { usernameToUpdate: string } = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  deleteUserModel = { username: '' };

  //recettes
  readRecetteModel = { titre: '' };
  readRecetteResult: Recette | null = null;
  recetteError: string = '';
  createRecetteModel: Partial<Recette> = { titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  updateRecetteModel: Partial<Recette> & { titleToUpdate: string } = { titleToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  deleteRecetteModel = { title: '' };

  // Ingredients
  readIngredientModel = { nom_ingredient: '' };
  readIngredientResult: IngredientDetail | null = null;
  ingredientError: string = '';
  createIngredientModel: Partial<IngredientDetail> = { nomIngredient: '', categorie: '' };
  updateIngredientModel: Partial<IngredientDetail> & { nom_ingredientToUpdate: string } = { nom_ingredientToUpdate: '', nomIngredient: '', categorie: '' };
  deleteIngredientModel = { nom_ingredient: '' };

  private adminService: AdminService = inject(AdminService);

  ngOnInit(): void {
    this.adminService.getUserCount().subscribe(count => {
      this.usersCount = count;
    });
    this.adminService.getRecetteCount().subscribe(count => {
      this.recettesCount = count;
    });
    this.adminService.getIngredientCount().subscribe(count => {
      this.ingredientsCount = count;
    });
  }

  // Nouvelle méthode pour changer l'onglet actif
  setActiveSection(section: 'users' | 'recettes' | 'ingredients'): void {
    this.activeSection = section;
  }

  getUser(){
    this.adminService.getUser(this.readUserModel.username).subscribe(
      user => {
        console.log('User details:', user);
        this.readUserResult = user;
        this.userError = '';
        this.updateUserModel = {
          usernameToUpdate: user.nomUtilisateur,
          ...user
        };
      },
      error => {
        console.error('Error fetching user details', error);
        this.readUserResult = null;
        this.userError = error.error.message;
      }
    );
  }


  createUser() {
    this.adminService.createUser(this.createUserModel as User).subscribe(
      response => {
        console.log('User created successfully', response);
        this.adminService.getUserCount().subscribe(count => this.usersCount = count);
        this.createUserModel = { nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }

  updateUser() {
    const { usernameToUpdate, ...updatedData } = this.updateUserModel;
    this.adminService.updateUser(usernameToUpdate, updatedData as User).subscribe(
      response => {
        console.log('User updated successfully', response);

        this.updateUserModel = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }

  deleteUser() {
    this.adminService.deleteUser(this.deleteUserModel.username).subscribe(
      response => {
        console.log('User deleted successfully', response);
        this.adminService.getUserCount().subscribe(count => this.usersCount = count);
        this.deleteUserModel = { username: '' };
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }

  // Recette methods
  getRecette(){
    this.adminService.getRecette(this.readRecetteModel.titre).subscribe(
      recette => {
        console.log('Recette details:', recette);
        this.readRecetteResult = recette;
        this.recetteError = '';
        this.updateRecetteModel = {
          titleToUpdate: recette.titre,
          ...recette
        };
      },
      error => {
        console.error('Error fetching recette details', error);
        this.readRecetteResult = null;
        this.recetteError = error.error.message;
      }
    );
  }

  createRecette() {
    this.adminService.createRecette(this.createRecetteModel as Recette).subscribe(
      response => {
        console.log('Recette created successfully', response);
        this.adminService.getRecetteCount().subscribe(count => this.recettesCount = count);
        this.createRecetteModel = { titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
      },
      error => {
        console.error('Error creating recette', error);
      }
    );
  }

  updateRecette() {
    const { titleToUpdate, ...updatedData } = this.updateRecetteModel;
    this.adminService.updateRecette(titleToUpdate, updatedData as Recette).subscribe(
      response => {
        console.log('Recette updated successfully', response);
        this.updateRecetteModel = { titleToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
      },
      error => {
        console.error('Error updating recette', error);
      }
    );
  }

  deleteRecette() {
    this.adminService.deleteRecette(this.deleteRecetteModel.title).subscribe(
      response => {
        console.log('Recette deleted successfully', response);
        this.adminService.getRecetteCount().subscribe(count => this.recettesCount = count);
        this.deleteRecetteModel = { title: '' };
      },
      error => {
        console.error('Error deleting recette', error);
      }
    );
  }

  // Ingredient methods
  getIngredient() {
    this.adminService.getIngredientByName(this.readIngredientModel.nom_ingredient).subscribe(
      ingredient => {
        console.log('Ingredient details:', ingredient);
        this.readIngredientResult = ingredient;
        this.ingredientError = '';
        this.updateIngredientModel = {
          nom_ingredientToUpdate: ingredient.nomIngredient,
          ...ingredient
        };
      },
      error => {
        console.error('Error fetching ingredient details', error);
        this.readIngredientResult = null;
        this.ingredientError = error.error.message;
      }
    );
  }

  createIngredient() {
    this.adminService.createIngredient(this.createIngredientModel as IngredientDetail).subscribe(
      response => {
        console.log('Ingredient created successfully', response);
        this.adminService.getIngredientCount().subscribe(count => this.ingredientsCount = count);
        this.createIngredientModel = { nomIngredient: '', categorie: '' };
      },
      error => {
        console.error('Error creating ingredient', error);
      }
    );
  }

  updateIngredient() {
    const { nom_ingredientToUpdate, ...updatedData } = this.updateIngredientModel;
    this.adminService.updateIngredientByName(nom_ingredientToUpdate, updatedData as IngredientDetail).subscribe(
      response => {
        console.log('Ingredient updated successfully', response);
        this.updateIngredientModel = { nom_ingredientToUpdate: '', nomIngredient: '', categorie: '' };
      },
      error => {
        console.error('Error updating ingredient', error);
      }
    );
  }

  deleteIngredient() {
    this.adminService.deleteIngredientByName(this.deleteIngredientModel.nom_ingredient).subscribe(
      response => {
        console.log('Ingredient deleted successfully', response);
        this.adminService.getIngredientCount().subscribe(count => this.ingredientsCount = count);
        this.deleteIngredientModel = { nom_ingredient: '' };
      },
      error => {
        console.error('Error deleting ingredient', error);
      }
    );
  }
}
