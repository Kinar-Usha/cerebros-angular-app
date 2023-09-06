import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TraderComponent } from './trader/trader/trader.component';
import { PortfolioComponent } from './trader/portfolio/portfolio.component';
import { DashboardComponent } from './trader/dashboard/dashboard.component';

const routes: Routes = [
  
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'trader',
    // loadChildren: () => import('./trader/trader.module').then(m => m.TraderModule),
    component: TraderComponent,
  },

  // {
  //   path: 'trader',
  //   component: TraderComponent,
  //   children: [
  //     {
  //       path: 'trader',
  //       children: [
  //         { path: 'portfolio', component: PortfolioComponent },
  //         { path: '', component: DashboardComponent },
  //       ],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
