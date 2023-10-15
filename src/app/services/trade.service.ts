import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Trade } from '../models/trade.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Price } from '../models/price.mode';

@Injectable({
  providedIn: 'root'
})
export class TradeService {


  private baseUrl = 'http://localhost:8080/tradehistory/';
  private pricesUrl = 'http://localhost:8080/prices'
  private tradeUrl = 'http://localhost:8080/trade'
  constructor(private http: HttpClient) { }

  getTradeHistory(clientId: string): Observable<Trade[]> {
    const url = `${this.baseUrl}${clientId}`;
    return this.http.get<Trade[]>(url);
  }
  getPrices(): Observable<Price[]> {
    const url = this.pricesUrl;
    return this.http.get<Price[]>(url);
  }
  placeOrder(order: Order) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type as needed
      // Add any other headers if required
    });
    return this.http.post<any>(this.tradeUrl, order, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          throw new Error(error.error);
        }
        if (error.status === 406) {
          throw new Error(error.error);
        }
        // You can rethrow the error or handle other status codes as needed
        return throwError(error);
      })
    );
  }
}
