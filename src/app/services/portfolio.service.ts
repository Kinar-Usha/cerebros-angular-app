import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {


  private baseUrl = 'http://localhost:8082/portfolio/';
  private cashUrl = 'http://localhost:8082/';


  constructor(private http: HttpClient) { }

  getPortfolio(clientId: string): Observable<Portfolio[]> {
    const url = `${this.baseUrl}${clientId}`;
    return this.http.get<Portfolio[]>(url);
  }
  getCash(clientId: string): Observable<any> {
    const url = `${this.cashUrl}cash/${clientId}`;
    return this.http.get<any>(url);
  }
}
