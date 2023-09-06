import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraderComponent } from './trader/trader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { authGuard } from '../auth/auth.guard';

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
          { path: 'portfolio', component: PortfolioComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraderRoutingModule {}
