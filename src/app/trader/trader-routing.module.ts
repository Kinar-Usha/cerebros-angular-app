import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraderComponent } from './trader/trader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { authGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';
import { RoboadvisorComponent } from './roboadvisor/roboadvisor.component';

const routes: Routes = [
  {
    path: 'trader',
    component: TraderComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'trade', component: TradeDialogComponent },
          { path: 'portfolio', component: PortfolioComponent },
          { path: 'tradeHistory', component: TradeHistoryComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'roboadvisor', component: RoboadvisorComponent },
          {
            path: '**',
            component: PageNotFoundComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraderRoutingModule { }
