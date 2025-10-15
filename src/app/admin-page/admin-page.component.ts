import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { Recette } from '../models/recette.model';
import { Ingredient_unique } from '../models/ingredient_unique.model';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  usersCount: number = 0;
  recettesCount: number = 0;
  ingredientsCount: number = 0;

  // Models for the forms
  readUserModel = { username: '' };
  readUserResult: User | null = null;
  createUserModel: Partial<User> = { nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  updateUserModel: Partial<User> & { usernameToUpdate: string } = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  deleteUserModel = { username: '' };

  // Recettes
  readRecetteModel = { title: '' };
  readRecetteResult: Recette | null = null;
  createRecetteModel: Partial<Recette> = { titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  updateRecetteModel: Partial<Recette> & { titleToUpdate: string } = { titleToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  deleteRecetteModel = { title: '' };

  // Ingredients
  readIngredientModel = { nom_ingredient: '' };
  readIngredientResult: Ingredient_unique | null = null;
  createIngredientModel: Partial<Ingredient_unique> = { nomIngredient: '', categorie: '' };
  updateIngredientModel: Partial<Ingredient_unique> & { nom_ingredientToUpdate: string } = { nom_ingredientToUpdate: '', nomIngredient: '', categorie: '' };
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

  // User methods
  getUser() {
    this.adminService.getUser(this.readUserModel.username).subscribe(
      user => {
        console.log('User details:', user);
        this.readUserResult = user;
      },
      error => {
        console.error('Error fetching user details', error);
        this.readUserResult = null;
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
  getRecette() {
    this.adminService.getRecetteByTitle(this.readRecetteModel.title).subscribe(
      recette => {
        console.log('Recette details:', recette);
        this.readRecetteResult = recette;
        this.updateRecetteModel = {
          titleToUpdate: recette.titre,
          ...recette
        };
      },
      error => {
        console.error('Error fetching recette details', error);
        this.readRecetteResult = null;
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
    this.adminService.updateRecetteByTitle(titleToUpdate, updatedData as Recette).subscribe(
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
    this.adminService.deleteRecetteByTitle(this.deleteRecetteModel.title).subscribe(
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
        this.updateIngredientModel = {
          nom_ingredientToUpdate: ingredient.nomIngredient,
          ...ingredient
        };
      },
      error => {
        console.error('Error fetching ingredient details', error);
        this.readIngredientResult = null;
      }
    );
  }

  createIngredient() {
    this.adminService.createIngredient(this.createIngredientModel as Ingredient_unique).subscribe(
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
    this.adminService.updateIngredientByName(nom_ingredientToUpdate, updatedData as Ingredient_unique).subscribe(
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
