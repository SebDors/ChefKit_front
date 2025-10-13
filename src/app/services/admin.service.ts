import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  getRecetteCount(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/recettes/count`);
  }

  getIngredientCount(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/ingredients/count`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(username: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${username}`, user);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`);
  }
}
