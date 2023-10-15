import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Client } from '../models/client';
import { ClientIdentification } from '../models/client-identification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  message: string = '';
  error: any;

  client: Client = new Client();

  name: any;
  email: any;
  dateOfBirth: any;
  country: any;
  postalCode: any;

  identificationType: any;
  identificationNumber: any;

  password: any;
  confirmPassword: any;

  countries: string[] = ['INDIA', "USA", 'IRELAND'];


  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
    this.client.clientIdentifications.push(new ClientIdentification());
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/trader']);
    }
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  register() {
    this.error = '';
    
    if (this.client.person.country === 'INDIA') {
      this.client.clientIdentifications[0].type = 'AADHAAR';
    } else if (this.client.person.country === 'USA') {
      this.client.clientIdentifications[0].type = 'SSN';
    } else if (this.client.person.country === 'IRELAND') {
      this.client.clientIdentifications[0].type = 'PASSPORT';
    }

    this.authService.register(this.client).subscribe((data) => {
      console.log(data);
      this.error = data;

      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/trader/profile';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });

  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
