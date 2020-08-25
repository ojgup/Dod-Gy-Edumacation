import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../login';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean>;

  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loggedIn = new EventEmitter();
  }

  login(details: Login){
    console.log(details);
    this._http.post('https://ec2-52-23-253-40.compute-1.amazonaws.com/api/auth/login', details).subscribe((token) => {
      localStorage.setItem('Authorization', JSON.stringify(token['token']));
      this.loggedIn.emit(true);
    });
  }

  isLoggedIn(){
    return !this.jwtHelper.isTokenExpired();
  }

  logout(){
    localStorage.removeItem('Authorization');
    this.loggedIn.emit(false);
  }
}
