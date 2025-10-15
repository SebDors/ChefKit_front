import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Recette } from '../models/recette.model';

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

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/username/${username}`);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }
  updateUser(username: string, user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/update/${username}`, user);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${username}`);
  }

  //recettes
  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}/recettes/${id}`);
  }
  getAllRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiUrl}/recettes`);
  }
  createRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(`${this.apiUrl}/recettes`, recette);
  }
  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(`${this.apiUrl}/recettes/${id}`, recette);
  }
  deleteRecette(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recettes/${id}`);
  }

  getRecetteByTitle(title: string): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}/recettes/titre/${title}`);
  }

  updateRecetteByTitle(title: string, recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(`${this.apiUrl}/recettes/titre/${title}`, recette);
  }

  deleteRecetteByTitle(title: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recettes/titre/${title}`);
  }
}
