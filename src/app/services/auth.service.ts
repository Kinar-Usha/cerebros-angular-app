import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn: boolean = false;
  // clientId: String | null = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  register(client: any): Observable<Object> {
    const url = `${this.baseUrl}/client/register`;
    const body = client;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Object>(url, body, { headers }).pipe(
      tap((val: any) => {
        // this.isLoggedIn = true;
        // this.clientId = val.clientId;
        this.getClient(client.person.email).subscribe((client) => {
          console.log("Registered", client);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('client', JSON.stringify(client));
        })

        return val;
      }),
      catchError((error) => {
        if (error.status === 400) {
          return of("Invalid registration details");
        } else if (error.status === 409) {
          return of("User already exists");
        }
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<Object> {
    const url = `${this.baseUrl}/client/login`;
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

  // ------------------ CLIENT METHODS ------------------

  getClient(email: string): Observable<Object> {
    const url = `${this.baseUrl}/client/email/${email}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Object>(url, { headers }).pipe(
      tap((client: any) => {
        console.log(client);
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

  get client(): Client | null {
    const clientString = sessionStorage.getItem('client');

    if (clientString) {
      let clientJson = JSON.parse(clientString);

      let client = Object.assign(new Client(), clientJson);
      client.password = null;

      console.log(client);

      return client;
    }
    return null;
  }

  getCashBalance(clientId: string): Observable<Object> {
    const url = `${this.baseUrl}/cash/${clientId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<Object>(url, { headers }).pipe(
      tap((val: any) => {
        console.log(val.cashRemaining);
        if (val) {
          let cash = val.cashRemaining;
          console.log(cash);
          return cash;
        }
        return 0;
      })
    );
  }



}
