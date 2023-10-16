import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Preferences } from 'src/app/models/preferences';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  purpose = ['Investment', 'Savings', 'Retirement', 'Other'];
  risk = ['Low', 'Moderate', 'High'];
  time = ['Short-term', 'Medium-term', 'Long-term'];
  income = ['Low', 'Middle', 'High'];

  prefMessage: string = '';
  cashMessage: string = '';

  prefForm: FormGroup = new FormGroup({});
  client: Client | null = this.authService.client;
  cash: number = 0.0;

  addCash: number = 0.0;

  // preferences = new Preferences(null, null, null, null);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.client);
    this.client = this.authService.client;
    this.prefForm = this.formBuilder.group({
      purpose: ['', Validators.required],
      risk: ['', Validators.required],
      time: ['', Validators.required],
      income: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
    });
    // get prefereces from sessionStorage

    if (this.client) {

      this.portfolioService.getCash(this.client.clientId).subscribe(cash => {
        this.cash = cash ? (cash).cashRemaining : 0;
        console.log(this.cash);
        console.log("cash");
      });
      console.log(this.client.preferences);
      const prefs = sessionStorage.getItem(this.client.clientId + 'preferences');

      if (prefs) {
        const parsedPrefs = JSON.parse(prefs); // parse the string into an object
        this.prefForm.setValue({
          purpose: parsedPrefs.purpose,
          risk: parsedPrefs.risk,
          time: parsedPrefs.time,
          income: parsedPrefs.income,
          agreeTerms:false,
        });
      }
      else {
        this.authService.getPreferences(this.client.clientId).subscribe((data) => {
          console.log(data);
          this.prefForm.setValue({
            purpose: data.purpose,
            risk: data.risk,
            time: data.time,
            income: data.income,
            agreeTerms: false,
          });
          sessionStorage.setItem(this.client?.clientId+'preferences', JSON.stringify(data));
        });


      }

    }
    else {
      //TODO a better way to do this

      setTimeout(() => {
        this.ngOnInit();
      }, 500);
    }

   
  }

  updateCashBalance() {
    if (this.client) {
      this.portfolioService.updateCash(this.client.clientId, this.addCash + this.cash).subscribe((data) => {
        console.log(data);
        this.cash += this.addCash;
        this.addCash = 0;

        this.cashMessage = "Cash Added Successfully";

        setTimeout(() => {
          this.cashMessage = "";
        }, 3000);
      });
    }
  }


  savePreferences() {
    try {
      if (this.client) {
        this.authService.savePreferences(this.client.clientId, new Preferences(this.prefForm.value.purpose, this.prefForm.value.risk, this.prefForm.value.time, this.prefForm.value.income)).subscribe((data) => {
          console.log(data)
          this.prefMessage = "Preferences Saved";

          setTimeout(() => {
            this.prefMessage = "";
          }, 3000);
        });
      }
    }
    catch (error) {
      console.log(error);
      alert(error);
      //Done change to a notification system.
    }
  }




}


