import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})
export class TraderComponent {
  currentYear = new Date().getFullYear();

  message: string;


  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  refreshMessage() {
    this.message = this.getMessage();
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
    this.router.navigate(['/login']);
  }
}
