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

  errorDetails: boolean;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {
    this.errorDetails = false;
  }

  ngOnInit(): void { }

  onSubmit(){
    let details: Login = {
      "userId": this.userId,
      "password": this.password
    }

    this.errorDetails = false;

    this.authService.login(details).catch(() => {
      this.errorDetails = true;
    });

    this.dataService.userId = this.userId;
  }
}
