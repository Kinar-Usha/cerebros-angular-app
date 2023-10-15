import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Preferences } from 'src/app/models/preferences';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  purpose = ['Retirement', 'Education', 'Home Purchase', 'Other'];
  risk = ['Low', 'Medium', 'High'];
  time = ['1-3 years', '3-5 years', '5-10 years', '10+ years'];
  income = ['Less than $50,000', '$50,000 - $100,000', '$100,000+'];

  prefForm: FormGroup = new FormGroup({});
  client: Client | null = this.authService.client;
  cash: number = 0.0;

  // preferences = new Preferences(null, null, null, null);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.client)
      this.authService.getCashBalance(this.client.clientId).subscribe((cash: any) => {
        console.log(cash);
        if (cash != null) {
          this.cash = cash;
        }
      })

    this.prefForm = this.formBuilder.group({
      purpose: ['', Validators.required],
      risk: ['', Validators.required],
      time: ['', Validators.required],
      income: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  savePreferences() {
    console.log(this.prefForm.value);
    try {
      // this.clientService.updatePreferences(
      //   'john.doe@gmail.com',
      //   new Preferences(
      //     this.prefForm.value.purpose,
      //     this.prefForm.value.risk,
      //     this.prefForm.value.time,
      //     this.prefForm.value.income
      //   )
      // );
      // alert('Success!');
      // this.router.navigate(['/'])

      // console.log(this.clientService.clientsData['john.doe@gmail.com']);
    } catch (error) {
      console.log(error);
      alert(error);


      //Done change to a notification system.
    }
    this.prefForm.reset();
  }
}
