import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from './login'; 
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean>;

  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(details: Login){
    console.log(details);
    this._http.post('https://localhost:5001/api/auth/login', details).subscribe((token) => {
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
