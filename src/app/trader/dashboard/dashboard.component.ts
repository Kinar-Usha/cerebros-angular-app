import { Component } from '@angular/core';
import { Instrument } from 'src/app/models/instrument.model';
import { Price } from 'src/app/models/price.mode';
import { TradeService } from 'src/app/services/trade.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedAction: string = "";
  selectedPrice: number = 0;
  filterTerm: any;
  stocks: Price[] = [];
  bonds: Price[] = [];
  cds: Price[] = [];
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

  constructor(private tradeService: TradeService, private router: Router, private authService: AuthService) { }

  // order: any = {
  //   instrumentId: null,
  //   quantity: 1,
  //   targetPrice: 1,
  //   direction: '',
  //   orderId: '',
  //   clientId: ''
  // };

  ngOnInit() {
    const client = this.authService.client;
    console.log(client);


    this.tradeService.getPrices().subscribe((prices) => {
      prices.forEach(price => {
        const category = price.instrument.categoryId;

        if (category === "STOCK") {
          this.stocks.push(price);
        } else if (category === "CD") {
          this.cds.push(price);
        } else if (category === "GOVT") {
          this.bonds.push(price);
        }
      });
    })
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

  // openSellTradeModal(selectedInstrument: Instrument, bidPrice: number) {
  //   this.selectedInstrument = selectedInstrument;
  //   this.priceLimits = [bidPrice * 0.99, bidPrice];
  //   this.order.instrumentId = selectedInstrument.instrumentId;
  //   this.order.targetPrice = bidPrice;
  //   this.order.direction = 'S';
  //   this.order.quantity = selectedInstrument.minQuantity;
  //   this.showTradeDialog=true;

  //   // const button = document.getElementById('sellModalButton');
  //   // if (button) {
  //   //   button.click();
  //   // }
  // }


}
