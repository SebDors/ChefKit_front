import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoading = signal(false);
  errorMessage = signal('');

  registerForm = new FormGroup({
    nomUtilisateur: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
        this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
    this.registerForm.get('confirmPassword')?.addValidators(
      (control) => this.passwordMatchValidator(control as FormControl)
    );
  }

  passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!this.registerForm) {
      return null;
    }
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    if (this.registerForm.valid) {
      const { nomUtilisateur, email, password } = this.registerForm.value;
      const userDataToSend = {
        idUtilisateur: 0, // ou null, selon ce que le backend attend
        nomUtilisateur: nomUtilisateur, 
        email: email,
        motDePasse: password,
        dateCreation: new Date().toISOString() // ou une autre valeur par défaut appropriée
      };

      console.log('Données envoyées au backend:', userDataToSend);

      this.authService.register(userDataToSend).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Erreur lors de l\'inscription', error);
          if (error.status === 409) {
              this.errorMessage.set('Cet email ou nom d\'utilisateur est déjà enregistré.');
            } else if (error.error && error.error.message) {
              this.errorMessage.set(error.error.message);
            } else {
              this.errorMessage.set('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
            }
          }
        });

    } else {
      this.isLoading.set(false);
      this.errorMessage.set('Veuillez corriger les erreurs du formulaire.');
      this.registerForm.markAllAsTouched();
      console.log('Formulaire invalide');
    }
  }
}