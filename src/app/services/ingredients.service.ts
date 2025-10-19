import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<IngredientDetail[]> {
    return this.http.get<IngredientDetail[]>(`${this.apiUrl}/ingredients`);
  }

  getFridgeIngredients(username: string): Observable<IngredientDetail[]> {
    return this.http.get<IngredientDetail[]>(`${this.apiUrl}/users/${username}/fridge`);
  }

  saveFridgeIngredients(username: string, ingredientIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${username}/fridge`, ingredientIds);
  }
}
