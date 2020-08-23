import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Login} from '../login';
import { DataService } from '../services/data.service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;

  constructor(private authService: AuthService, private dataService: DataService) { }

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
