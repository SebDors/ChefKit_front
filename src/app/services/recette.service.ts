import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from '../models/recette.model';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8080/api/recettes';

  constructor(private http: HttpClient) { }

  getRecetteById(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.apiUrl}/${id}`);
  }

}


