import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = new FormGroup({
    // CHANGEMENT ICI : Utilise nomUtilisateur au lieu de email
    nomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]), // Ajoute une validation de longueur minimale si tu le souhaites
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    if (this.loginForm.valid) {
      // CHANGEMENT ICI : Récupère nomUtilisateur au lieu de email
      const { nomUtilisateur, password } = this.loginForm.value;

      const credentialsToSend = {
        nomUtilisateur: nomUtilisateur, 
        motDePasse: password
      };

      this.authService.login(credentialsToSend)
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            console.log('Connexion réussie !', response);
            this.router.navigate(['/homepage']); // Rediriger
          },
          error: (error) => {
            this.isLoading.set(false);
            console.error('Erreur lors de la connexion :', error);
            if (error.status === 401) {
              this.errorMessage.set('Nom d\'utilisateur ou mot de passe incorrect.'); 
            } else if (error.error && error.error.message) {
              this.errorMessage.set(error.error.message);
            } else {
              this.errorMessage.set('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
            }
          }
        });

    } else {
      this.isLoading.set(false);
      this.errorMessage.set('Veuillez entrer un nom d\'utilisateur et un mot de passe valides.');
      this.loginForm.markAllAsTouched();
    }
  }
}