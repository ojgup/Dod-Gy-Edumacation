import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Login} from '../login';
import { DataService } from '../services/data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {
    this.dataService.user.subscribe((value) => {
      this.router.navigate(['/session']);
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    let details: Login = {
      "userId": this.userId,
      "password": this.password
    }

    this.authService.login(details);
    this.dataService.userId = this.userId;
  }
}
