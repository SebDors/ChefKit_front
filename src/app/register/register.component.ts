import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor() {
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
      console.log('Formulaire valide, données à envoyer :', nomUtilisateur, email, password);

      setTimeout(() => {
        this.isLoading.set(false);
        this.errorMessage.set('Une erreur est survenue lors de l\'inscription (simulée).');
        this.registerForm.reset();
      }, 2000);

    } else {
      this.isLoading.set(false);
      this.errorMessage.set('Veuillez corriger les erreurs du formulaire.');
      this.registerForm.markAllAsTouched();
      console.log('Formulaire invalide');
    }
  }
}