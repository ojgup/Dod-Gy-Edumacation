import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {AuthService} from '../auth.service';
import {Login} from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //form: FormGroup;
  userId: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let details: Login = {
      "userId": this.userId,
      "password": this.password
    } 
    this.authService.login(details);
  }
}
