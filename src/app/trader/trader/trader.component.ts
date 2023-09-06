import { Component } from '@angular/core';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})
export class TraderComponent {
  currentYear = new Date().getFullYear();
}
