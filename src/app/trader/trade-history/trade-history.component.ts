import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade.model';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit {
  filterTerm: any;
  trades: Trade[] = []
  constructor(private tradeService: TradeService) {

  }
  ngOnInit(): void {
    this.loadTradeHistory()

  }
  loadTradeHistory() {
    const clientId = sessionStorage.getItem('clientId');
    if (clientId) {
      this.tradeService.getTradeHistory(clientId).subscribe(data => {
        //sort trades based on tradeid,tradeid is string convert it to number to sort it.

        this.trades = data;
        this.trades = this.trades.sort((a, b) => {
          // Convert tradeId to numbers for comparison
          const tradeIdA = +a.tradeId; // Using the unary plus operator
          const tradeIdB = +b.tradeId;

          return tradeIdA - tradeIdB; // Sort in descending order
        });


        console.log(this.trades)
      })
    }
    else {
      console.error('clientId not found in session storage');
    }
  }
}
