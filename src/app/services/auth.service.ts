import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { }

  login(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      catchError(({ error }) => throwError(() => error))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
