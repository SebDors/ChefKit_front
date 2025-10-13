import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = 'http://localhost:8080/ingredients';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }
}
