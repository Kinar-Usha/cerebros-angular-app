import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  message: string;
  email: any;
  password: any;
  user: any;

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/trader']);
    }
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.email, this.password).subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/trader';

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
