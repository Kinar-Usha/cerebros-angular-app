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

  prefForm: FormGroup = new FormGroup({});
  client: Client | null = this.authService.client;
  cash: number = 0.0;

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
    if (this.client) {
    
      this.portfolioService.getCash(this.client.clientId).subscribe(cash => {
        this.cash = cash ? (cash).cashRemaining : 0;
        console.log(this.cash);
        console.log("cash");
      });

 
    }
    else {
      //TODO a better way to do this

      setTimeout(() => {
        this.ngOnInit();
      }, 500);
    }

    this.prefForm = this.formBuilder.group({
      purpose: ['', Validators.required],
      risk: ['', Validators.required],
      time: ['', Validators.required],
      income: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }


  savePreferences() {
    try {
      if(this.client){      
    this.authService.savePreferences(this.client.clientId,new Preferences(this.prefForm.value.purpose,this.prefForm.value.risk,this.prefForm.value.time,this.prefForm.value.income)).subscribe((data)=>{
    console.log(data)
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


