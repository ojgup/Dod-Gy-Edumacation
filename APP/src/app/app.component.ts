import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dod&gy Edumacation | COVID-19 Contact Tracer';

  isLoggedIn: boolean;

  constructor(private authService: AuthService){
    this.authService.loggedIn.subscribe(state => {
      this.isLoggedIn = state;
      console.log("Logged in: " + this.isLoggedIn);
    })
  }

  logout(){
    this.authService.logout();
  }

  navlinkClicked(buttonName:String){
    
  }
}
