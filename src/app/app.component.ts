import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cerebros';
  currentYear = new Date().getFullYear();

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    document.documentElement.classList.add('dark');
  }
}
