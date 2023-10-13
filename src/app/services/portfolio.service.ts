import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  

  private baseUrl = 'http://localhost:8080/portfolio/';

  constructor(private http: HttpClient) {}

  getPortfolio(clientId: string): Observable<Portfolio[]> {
    const url = `${this.baseUrl}${clientId}`; 
    return this.http.get<Portfolio[]>(url);
  }
}
