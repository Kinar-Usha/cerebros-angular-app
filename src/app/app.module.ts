import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TraderModule } from './trader/trader.module';
import { TraderRoutingModule } from './trader/trader-routing.module';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, TraderRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
