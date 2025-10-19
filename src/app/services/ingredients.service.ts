import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = 'http://localhost:8080/ingredients';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<IngredientDetail[]> {
    return this.http.get<IngredientDetail[]>(this.apiUrl);
  }
}
