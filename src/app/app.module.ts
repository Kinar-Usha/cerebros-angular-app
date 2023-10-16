import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TraderModule } from './trader/trader.module';
import { TraderRoutingModule } from './trader/trader-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IdMaskPipe } from './pipes/id-mask.pipe';
import { HyphenatePipe } from './pipes/hyphenate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    RegisterComponent,
    HyphenatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TraderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
