import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraderRoutingModule } from './trader-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TraderComponent } from './trader/trader.component';
import { ProfileComponent } from './profile/profile.component';
import { TableFilterPipe } from '../pipes/table-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';
import { IdMaskPipe } from '../pipes/id-mask.pipe';
import { RoboadvisorComponent } from './roboadvisor/roboadvisor.component';


@NgModule({
  declarations: [TraderComponent, DashboardComponent, PortfolioComponent, ProfileComponent, TableFilterPipe, IdMaskPipe, TradeHistoryComponent, TradeDialogComponent, RoboadvisorComponent],
  imports: [CommonModule, TraderRoutingModule, FormsModule, ReactiveFormsModule],
})
export class TraderModule {}
