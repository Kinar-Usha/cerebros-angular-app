import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraderComponent } from './trader/trader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
  // {
  //   path: 'trader',
  //   component: TraderComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardComponent
  //     },
  //     {
  //       path: 'portfolio',
  //       component: PortfolioComponent
  //     }
  //   ]
  // }

  {
    path: 'trader',
    component: TraderComponent,
    children: [
      {
        path: '',
        // redirectTo: 'dashboard',
      component: DashboardComponent,
        children: [
          { path: 'portfolio', component: PortfolioComponent },
          // { path: 'dashboard', component: DashboardComponent },
          // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
