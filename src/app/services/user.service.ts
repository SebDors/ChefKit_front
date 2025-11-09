import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from '../models/recette.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; 

  constructor(private http: HttpClient) { }

  getRecipesByFridge(username: string): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${this.apiUrl}/${username}/recipes`);
  }
}
