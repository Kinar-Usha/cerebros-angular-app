import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn: boolean = false;
  // clientId: String | null = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  register(client: any): Observable<Object> {
    const url = 'http://localhost:8080/client/register';
    const body = client;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Object>(url, body, { headers }).pipe(
      tap((val: any) => {
        // this.isLoggedIn = true;
        // this.clientId = val.clientId;
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('client', JSON.stringify(client));
        return val;
      }),
      catchError((error) => {
        if (error.status === 400) {
          return of("Invalid registration details");
        }else if (error.status === 409) {
          return of("User already exists");
        }
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<Object> {
    const url = 'http://localhost:8080/client/login';
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Object>(url, body, { headers }).pipe(
      tap((client: any) => {
        // this.isLoggedIn = true;
        // this.clientId = val.clientId;
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('client', JSON.stringify(client));
      }),
      catchError((error) => {
        if (error.status === 401) {
          return of(false);
        }
        throw error;
      })
    );
  }

  logout(): void {
    // this.isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('client');
  }

  get isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  get client(): Object | null {
    const clientString = sessionStorage.getItem('client');
    if (clientString) {
      console.log(JSON.parse(clientString));
      return JSON.parse(clientString);
    }
    return null;
  }


}
