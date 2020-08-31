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

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(){
    let details: Login = {
      "userId": this.userId,
      "password": this.password
    }

    this.authService.login(details).catch(() => {
      let elements = [
        document.querySelector('.user-id'),
        document.querySelector('.password'),
      ]
      elements.forEach((element: HTMLElement) => {
        element.classList.add('invalid');
      })

      document.querySelector('.alert').classList.remove('hidden');
    });
    this.dataService.userId = this.userId;
  }
}
