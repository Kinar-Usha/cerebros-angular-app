import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraderRoutingModule } from './trader-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TraderComponent } from './trader/trader.component';

@NgModule({
  declarations: [TraderComponent, DashboardComponent, PortfolioComponent],
  imports: [CommonModule, TraderRoutingModule],
})
export class TraderModule {}
