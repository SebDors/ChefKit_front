import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../models/user.model';

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
  createUserModel: Partial<User> = { nomUtilisateur: '', email: '', motDePasse: '', role: '' };
  updateUserModel: Partial<User> & { usernameToUpdate: string } = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: '' };
  deleteUserModel = { username: '' };

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

  createUser() {
    this.adminService.createUser(this.createUserModel as User).subscribe(
      response => {
        console.log('User created successfully', response);
        // Optionally, refresh user count or clear the form
        this.adminService.getUserCount().subscribe(count => this.usersCount = count);
        this.createUserModel = { nomUtilisateur: '', email: '', motDePasse: '', role: '' };
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
        // Optionally, clear the form
        this.updateUserModel = { usernameToUpdate: '', nomUtilisateur: '', email: '', motDePasse: '', role: '' };
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
}
