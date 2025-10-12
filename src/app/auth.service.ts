import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users'; // remplacer par le bon URL de l'API

  constructor(private http: HttpClient) { }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
}

  login(credentials: any): Observable<string> {
  return this.http.post<string>(`${this.apiUrl}/login`, credentials, {
    responseType: 'text' as 'json'
  });
  }
}
