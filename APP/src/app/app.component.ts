import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { _ } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dod&gy Edumacation | COVID-19 Contact Tracer';

  loggedIn: boolean;
  loggingIn: boolean;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {
    this.authService.loggingIn.subscribe((value) => {
      this.loggingIn = value;
    })
    this.authService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
      if (value) {
        this.router.navigate(['/session']);
      } else {
        this.dataService.user.next(null);
        this.router.navigate(["/login"])
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
