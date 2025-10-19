import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Interface to define possible shapes of the user data from the API
interface UserResponse {
  nomUtilisateur?: string;
  username?: string;
  name?: string;
  role?: string;
  authorities?: { authority: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<{ nomUtilisateur: string, role: string } | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
      this.isLoggedIn.set(true);
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }

  login(credentials: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: UserResponse) => {
        this.isLoggedIn.set(true);
        
        let role = 'user';

        if (response.authorities && Array.isArray(response.authorities)) {
          const isAdmin = response.authorities.some(auth => auth.authority === 'ROLE_ADMIN' || auth.authority === 'admin');
          if (isAdmin) {
            role = 'admin';
          }
        } 
        else if (response.role && typeof response.role === 'string') {
          if (response.role.toLowerCase().includes('admin')) {
            role = 'admin';
          }
        }

        // Create a clean user object, using the username from the login form as requested.
        const user = {
            nomUtilisateur: credentials.nomUtilisateur,
            role: role
        };

        this.currentUser.set(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Login successful! Final user object:', user);
      }),
      catchError(error => {
        this.logout();
        console.error('Error during login:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}