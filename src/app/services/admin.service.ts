import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrlUsers = 'http://localhost:8080/users';
  private apiUrlRecettes = 'http://localhost:8080/recettes';
  private apiUrlIngredients = 'http://localhost:8080/ingredients';
  constructor(private http: HttpClient) { }
  

  
  //Fais un un get de tous les utilisateurs puis retourne juste le nombre d'utilisateurs
  getUserCount(): Observable<number> {
    return this.http.get<number>(this.apiUrlUsers);
  }
  //Fais un un get de toutes les recettes puis retourne juste le nombre de recettes
  getRecetteCount(): Observable<number>{
    return this.http.get<number>(this.apiUrlRecettes);
  }
  //Fais un un get de tous les ingrédients puis retourne juste le nombre d'ingrédients
  getIngredientCount(): Observable<number>{
    return this.http.get<number>(this.apiUrlIngredients);
  }
}
