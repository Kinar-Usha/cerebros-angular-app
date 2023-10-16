import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from 'src/app/models/instrument.model';
import { Price } from 'src/app/models/price.mode';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-roboadvisor',
  templateUrl: './roboadvisor.component.html',
  styleUrls: ['./roboadvisor.component.css'],
  providers: [CommonModule]
})

export class RoboadvisorComponent {
  selectedAction: string = "";
  selectedPrice: number = 0;
  filterTerm: any;
  showTradeDialog: boolean = false;

  selectedInstrument: Instrument = {
    instrumentId: '',
    externalIdType: '',
    externalId: '',
    categoryId: '',
    instrumentDescription: '',
    maxQuantity: 0,
    minQuantity: 0,
  };
  stocks: any[] = []; // Modify the type according to the structure of your data
  bonds: any[] = []; // Modify the type according to the structure of your data
  cds: any[] = []; // Modify the type according to the structure of your data

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchStocks();
    // Call other functions if needed
  }
  fetchStocks() {
    const apiUrl = 'http://localhost:8080/roboadvisor/preferences/YOUR_CLIENTID?risk=HIGH&time=HIGH&income=HIGH';
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        this.stocks = data;
      },
      error: (error) => {
        console.error('Error fetching stocks:', error);
      }
    });
    console.log(this.stocks);
  }

  openTradeModal(selectedInstrument: Instrument, askPrice: number, action: string) {
    this.selectedInstrument = selectedInstrument;
    this.selectedPrice = askPrice;
    this.selectedAction = action;
    console.log(this.selectedInstrument);
    this.router.navigate(['http://127.0.0.1:4200/trader/trade'], {
      state: { selectedInstrument, selectedAction: this.selectedAction, selectedPrice: askPrice },
    });
  }

}
