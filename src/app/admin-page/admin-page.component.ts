import { Component, inject, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../models/user.model';
import { Recette } from '../models/recette.model';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add FormsModule
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
  isScrolled = false;
  currentYear = new Date().getFullYear();

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
  createUserModel: Partial<User> = { nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  updateUserModel: Partial<User> & { usernameToUpdate: string } = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: 'user' };
  deleteUserModel = { username: '' };

  //recettes
  readRecetteModel = { titre: '' };
  readRecetteResult: Recette | null = null;
  createRecetteModel: Partial<Recette> = { titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  updateRecetteModel: Partial<Recette> & { titreToUpdate: string } = { titreToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  deleteRecetteModel = { titreToDelete: '' };

  //ingredients
  readIngredientModel = { id: 0 };
  readIngredientResult: IngredientDetail | null = null;
  createIngredientModel: IngredientDetail = { nomIngredient: '', categorie: '' };
  updateIngredientModel = { idToUpdate: 0, nomIngredient: '', categorie: '' };
  deleteIngredientModel = { id: 0 };


  constructor(private adminService: AdminService) { }
  
  ngOnInit(): void {

  //appeler les services pour récupérer les données
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

  getRecette(){
    this.adminService.getRecette(this.readRecetteModel.titre).subscribe(
      recette => {
        console.log('Recette details:', recette);
        this.readRecetteResult = recette;
      },
      error => {
        console.error('Error fetching recette details', error);
        this.readRecetteResult = null;
      }
    );
  }

  getUser(){
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

  getIngredient(){
    this.adminService.getIngredientById(this.readIngredientModel.id).subscribe(
      ingredient => {
        console.log('Ingredient details:', ingredient);
        this.readIngredientResult = ingredient;
      },
      error => {
        console.error('Error fetching ingredient details', error);
        this.readIngredientResult = null;
      }
    );
  }

  createUser() {
    this.adminService.createUser(this.createUserModel as User).subscribe(
      response => {
        console.log('User created successfully', response);
        // Optionally, refresh user count or clear the form
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

    const payload: Partial<User> = {};
    if (updatedData.nomUtilisateur) {
      payload.nomUtilisateur = updatedData.nomUtilisateur;
    }
    if (updatedData.email) {
      payload.email = updatedData.email;
    }
    if (updatedData.motDePasse) {
      payload.motDePasse = updatedData.motDePasse;
    }
    if (updatedData.role) {
      payload.role = updatedData.role;
    }

    this.adminService.updateUser(usernameToUpdate, payload as User).subscribe(
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
        // Optionally, refresh user count or clear the form
        this.adminService.getUserCount().subscribe(count => this.usersCount = count);
        this.deleteUserModel = { username: '' };
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }

  //recettes
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
    const { titreToUpdate, ...updatedData } = this.updateRecetteModel;
    this.adminService.updateRecette(titreToUpdate, updatedData as Recette).subscribe(
      response => {
        console.log('Recette updated successfully', response);
        this.updateRecetteModel = { titreToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
      },
      error => {
        console.error('Error updating recette', error);
      }
    );
  }

  deleteRecette() {
    this.adminService.deleteRecette(this.deleteRecetteModel.titreToDelete).subscribe(
      response => {
        console.log('Recette deleted successfully', response);
        this.adminService.getRecetteCount().subscribe(count => this.recettesCount = count);
        this.deleteRecetteModel = { titreToDelete: '' };
      },
      error => {
        console.error('Error deleting recette', error);
      }
    );
  }

  //ingredients
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
    const { idToUpdate, ...updatedData } = this.updateIngredientModel;
    this.adminService.updateIngredient(idToUpdate, updatedData as IngredientDetail).subscribe(
      response => {
        console.log('Ingredient updated successfully', response);
        this.updateIngredientModel = { idToUpdate: 0, nomIngredient: '', categorie: '' };
      },
      error => {
        console.error('Error updating ingredient', error);
      }
    );
  }

  deleteIngredient() {
    this.adminService.deleteIngredient(this.deleteIngredientModel.id).subscribe(
      response => {
        console.log('Ingredient deleted successfully', response);
        this.adminService.getIngredientCount().subscribe(count => this.ingredientsCount = count);
        this.deleteIngredientModel = { id: 0 };
      },
      error => {
        console.error('Error deleting ingredient', error);
      }
    );
  }

}


  
