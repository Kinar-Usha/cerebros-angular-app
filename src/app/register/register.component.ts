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
  validationError: any = {};

  client: Client = new Client();

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

  validateEmail() {
    let email = this.client.person.email;
    const regex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if (email === '') {
      this.validationError.email = 'Email is required';
    } else if (!regex.test(email)) {
      this.validationError.email = 'Invalid email format';
    } else {
      this.validationError.email = '';
    }
  }

  validateDateOfBirth() {
    // must be above 18 years
    let dateOfBirth = this.client.person.dateOfBirth;

    if (dateOfBirth === '') {
      this.validationError.dateOfBirth = 'Date of birth is required';
    } else {
      let today = new Date();
      let birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      let month = today.getMonth() - birthDate.getMonth();

      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.validationError.dateOfBirth = 'Must be above 18 years';
      } else {
        this.validationError.dateOfBirth = '';
      }
    }
  }

  validateIdentificationNumber() {
    // Set identification type based on country
    if (this.client.person.country === 'INDIA') {
      this.client.clientIdentifications[0].type = 'AADHAAR';

      // Validate aadhaar number regex XXXX-XXXX-XXXX
      let aadhaarNumber = this.client.clientIdentifications[0].value;
      const regex = new RegExp('^[0-9]{4}-[0-9]{4}-[0-9]{4}$');

      if (aadhaarNumber === '') {
        this.validationError.identificationNumber = 'Identification number is required';
      } else if (!regex.test(aadhaarNumber)) {
        this.validationError.identificationNumber = 'Invalid Aadhaar number format';
      } else {
        this.validationError.identificationNumber = '';
      }

    } else if (this.client.person.country === 'USA') {
      this.client.clientIdentifications[0].type = 'SSN';

      // Validate SSN number regex XXX-XX-XXXX
      let ssnNumber = this.client.clientIdentifications[0].value;
      const regex = new RegExp('^[0-9]{3}-[0-9]{2}-[0-9]{4}$');

      if (ssnNumber === '') {
        this.validationError.identificationNumber = 'Identification number is required';
      } else if (!regex.test(ssnNumber)) {
        this.validationError.identificationNumber = 'Invalid SSN number format';
      } else {
        this.validationError.identificationNumber = '';
      }

    } else if (this.client.person.country === 'IRELAND') {
      this.client.clientIdentifications[0].type = 'PASSPORT';

      // Validate passport number regex A1234567
      let passportNumber = this.client.clientIdentifications[0].value;
      const regex = new RegExp('^[A-Z][0-9]{7}$');

      if (passportNumber === '') {
        this.validationError.identificationNumber = 'Identification number is required';
      } else if (!regex.test(passportNumber)) {
        this.validationError.identificationNumber = 'Invalid Passport number format';
      } else {
        this.validationError.identificationNumber = '';
      }
    }
  }

  validatePassword() {
    // min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    let password = this.client.password;
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');

    if (password === '') {
      this.validationError.password = 'Password is required';
    } else if (password.length < 8) {
      this.validationError.password = 'Password must be at least 8 characters';
    } else if (!regex.test(password)) {
      this.validationError.password = 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character';
    } else {
      this.validationError.password = '';
    }
  }

  register() {
    this.error = '';

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
