import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   username = '';
  password = '';
  errorMessage = '';

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.errorMessage = '';
      alert('Connexion réussie !');
    } else {
      this.errorMessage = 'Identifiants invalides';
    }
  }
}