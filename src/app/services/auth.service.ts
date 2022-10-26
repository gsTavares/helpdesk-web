import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/Credenciais';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  // Como a resposta não foi tipada, o Angular interpreta o tipo do Observable como HttpResponse<Object>
  authenticate(creds: Credenciais): Observable<HttpResponse<string>> {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text' // redefine o tipo do HttpResponse para <string>
    })
  }

  successfullLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }
}
