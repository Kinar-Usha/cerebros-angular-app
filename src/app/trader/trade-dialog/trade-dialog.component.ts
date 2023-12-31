import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from 'src/app/models/instrument.model';
import { Order } from 'src/app/models/trade.model';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.css']
})
export class TradeDialogComponent implements OnInit {

  constructor(private tradeService: TradeService, private router: Router, private route: ActivatedRoute) {
    const extras = this.router.getCurrentNavigation()?.extras.state;
    if (extras) {
      this.selectedInstrument = extras['selectedInstrument'];
      this.selectedAction = extras['selectedAction'];
      this.selectedPrice = extras['selectedPrice'];
      this.selectedOrder.direction = this.selectedAction;

      if (this.selectedAction == "S") {
        this.priceLimits = [this.selectedPrice * 0.99, this.selectedPrice];
      }
      else {

        this.priceLimits = [this.selectedPrice, this.selectedPrice * 1.01];
      }

      const client = sessionStorage.getItem('client');
      const clientId = client ? JSON.parse(client).clientId : null;

      this.selectedOrder.clientId = clientId;
      this.selectedOrder.instrumentId = this.selectedInstrument.instrumentId;
      this.selectedOrder.quantity = this.quantity;
      this.selectedOrder.targetPrice = this.selectedPrice;
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnInit(): void {

  }

  selectedOrder: Order = {
    instrumentId: '',
    quantity: 0,
    targetPrice: 0,
    direction: '',
    orderId: '',
    clientId: ''
  };
  selectedInstrument: Instrument = {
    instrumentId: '',
    externalIdType: '',
    externalId: '',
    categoryId: '',
    instrumentDescription: '',
    maxQuantity: 0,
    minQuantity: 0,
  };
  selectedPrice: number = 0;
  selectedAction: string = '';
  isOrderValid: boolean = false;
  quantity: number = 1;
  priceLimits: number[] = [];
  statusMessage: string = '';

  placeOrder() {
    console.log(this.selectedOrder)
    this.tradeService.placeOrder(this.selectedOrder).subscribe(data => {
      //check if status code is not 409
      console.log(data);

      this.statusMessage = 'Placed Order';

      setTimeout(() => {
        this.router.navigate(['/trader/portfolio']);
      }, 1000);
    },
      error => {
        console.log(error);
        this.statusMessage = error;
      });


  }

}
