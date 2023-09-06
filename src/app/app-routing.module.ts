import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function excludeTraderRoutes(url: UrlSegment[]) {
  return url.length > 0 && url[0].path.startsWith('trader') ? null : { consumed: url };
}

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
    matcher: excludeTraderRoutes,
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
