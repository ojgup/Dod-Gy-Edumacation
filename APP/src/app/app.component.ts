import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dod&gy Edumacation | COVID-19 Contact Tracer';

  isLoggedIn: boolean;

  constructor(private authService: AuthService, private dataService: DataService){
    this.authService.loggedIn.subscribe(state => {
      this.isLoggedIn = state;
      if(this.isLoggedIn){
          this.dataService.getUser(this.dataService.userId);
          
        }     
        else
          this.dataService.user = null;  
      }
    );
  }

  getSession(){
    this.dataService.getOpenSession(this.dataService.userId);
  }

  logout(){
    this.authService.logout();
  }

  navlinkClicked(buttonName:String){
    
  }
}
