import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from 'src/app/models/instrument.model';
import { Price } from 'src/app/models/price.mode';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';





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
  stocks: any[] = [];
  price: any[] = [];
  bonds: any[] = [];
  cds: any[] = [];

  client = this.authService.client;
  clientId: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    if (this.client) {
      this.clientId = this.client.clientId;
    }
  }

  ngOnInit() {
    this.fetchStocks();
  }
  fetchStocks() {
    const preferences = this.authService.getPreferences(this.clientId);

    preferences.subscribe((preferencesData: { risk: any; time: any; income: any; }) => {
      const { risk, time, income } = preferencesData;
      console.log(preferencesData);
      const apiUrl = `http://localhost:8082/roboadvisor/preferences/${this.clientId}?risk=${risk}&time=${time}&income=${income}`;

      this.http.get<any>(apiUrl).subscribe((instrument) => {
        instrument.forEach((price: { instrument: { categoryId: any } }) => {
          const category = price.instrument.categoryId;
          if (risk === 'LOW' && (category === 'GOVT' || category === 'CD')) {
            if (category === 'STOCK') {
              this.stocks.push(price);
            } else if (category === 'CD') {
              this.cds.push(price);
            } else if (category === 'GOVT') {
              this.bonds.push(price);
            }
          } else if (risk === 'MEDIUM' && category === 'STOCK') {
            this.stocks.push(price);
          } else {
            if (category === 'STOCK') {
              this.stocks.push(price);
            }
            else if (category === 'GOVT') {
              this.bonds.push(price);
            }
          };
        });

        console.log(this.cds);
      });
    });
  }



  openTradeModal(selectedInstrument: Instrument, askPrice: number, action: string) {
    this.selectedInstrument = selectedInstrument;
    this.selectedPrice = askPrice;
    this.selectedAction = action;
    console.log(this.selectedInstrument);
    this.router.navigate(['/trader/trade'], {
      state: { selectedInstrument, selectedAction: this.selectedAction, selectedPrice: askPrice },
    });
  }



}