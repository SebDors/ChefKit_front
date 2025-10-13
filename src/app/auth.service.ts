import { Injectable,signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users'; // remplacer par le bon URL de l'API

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<any | null>(null);

  constructor(private http: HttpClient, private router: Router) { 
    
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
}

  login(credentials: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/login`, credentials, {
    responseType: 'text' as 'json'
  }).pipe(
      tap((response: string) => {
        // En cas de succès, met à jour l'état de connexion
        this.isLoggedIn.set(true);
        // Stocke des infos utilisateur basiques (si l'API renvoie plus, tu peux ajuster)
        this.currentUser.set({ nomUtilisateur: credentials.nomUtilisateur }); 
        console.log('Connexion réussie ! Réponse API :', response);
      }),
      catchError(error => {
        // En cas d'erreur, assure-toi que l'état de connexion est faux
        this.logout(); // Appelle logout pour nettoyer l'état
        console.error('Erreur de connexion dans le service :', error);
        return throwError(() => error);
      })
    );
  }

  // Méthode de déconnexion
  logout(): void {
    this.isLoggedIn.set(false); // Met à jour le signal de connexion
    this.currentUser.set(null); // Efface les informations de l'utilisateur
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  // Pas besoin de getToken() ni checkLoginStatus() si pas de JWT/localStorage
  
  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}