import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../src/environments/environment.development';

const AUTH_API = environment.apiURL;
const TOKEN_KEY = 'auth-token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private isAuthenticated: boolean = false;

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/auth/login', {
      email,
      password
    }, httpOptions).pipe(
      tap((res: any) => {
        this.isAuthenticated = true;
        const { token } = res;
        localStorage.setItem(TOKEN_KEY, token);
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
