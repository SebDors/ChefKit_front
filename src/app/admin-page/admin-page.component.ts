import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../models/user.model';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
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
  readRecetteModel = { title: '' };
  readRecetteResult: Recette | null = null;
  createRecetteModel: Partial<Recette> = { titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  updateRecetteModel: Partial<Recette> & { titleToUpdate: string } = { titleToUpdate: '', titre: '', description: '', instructions: '', tempsPreparationMinutes: 0, tempsCuissonMinutes: 0, nombrePersonnes: 0, pathImage: '' };
  deleteRecetteModel = { title: '' };

  private adminService: AdminService = inject(AdminService);
  
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
    this.adminService.getRecetteByTitle(this.readRecetteModel.title).subscribe(
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
}
