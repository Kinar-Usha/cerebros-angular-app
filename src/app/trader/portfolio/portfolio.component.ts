import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  cash: number = 0;
  filterTerm: any
  totalHoldings: number = 0;
  totalAssets: number = 0
  public portfolio: Portfolio[] = []
  constructor(private portfolioService: PortfolioService, private authService: AuthService) { }
  ngOnInit(): void {
    this.loadPortfolio();

  }
  calculateHoldingsAndAssets() {
    const uniqueAssets = new Set<string>();
    this.portfolio.forEach(asset => {
      this.totalHoldings += asset.price * asset.holdings;
      uniqueAssets.add(asset.instrumentId)
    })
    this.totalAssets = uniqueAssets.size
  }

  loadPortfolio() {
    const client = this.authService.client;
    const clientId = client ? client.clientId : null;
    if (clientId) {
      this.portfolioService.getPortfolio(clientId).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.calculateHoldingsAndAssets();
      });
      this.portfolioService.getCash(clientId).subscribe(cash => {
        this.cash = cash ? (cash).cashRemaining : 0;
      });
    } else {
      console.error('clientId not found in session storage');
    }

  }
  downloadCSV() {
    let csvData = this.ConvertToCSV(this.portfolio);
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
  }

  ConvertToCSV(objArray: any) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in objArray[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') {
          line += ',';
        }
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

}
