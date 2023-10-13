import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  filterTerm:any
  totalHoldings:number=0;
  totalAssets:number=0
  public portfolio:Portfolio[]=[]
  constructor(private portfolioService:PortfolioService){}
  ngOnInit(): void {
    this.loadPortfolio();
  }
  calculateHoldingsAndAssets(){
    const uniqueAssets=new Set<string>();
    this.portfolio.forEach(asset=>{
      this.totalHoldings+=asset.holdings;
      uniqueAssets.add(asset.instrumentId)
    })
    this.totalAssets=uniqueAssets.size
  }

  loadPortfolio(){
    const clientId = sessionStorage.getItem('clientId');
    if (clientId) {
      this.portfolioService.getPortfolio(clientId).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.calculateHoldingsAndAssets();
      });
    } else {
      console.error('clientId not found in session storage');
    }
  }

}
