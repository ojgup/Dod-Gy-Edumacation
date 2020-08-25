import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loggedIn = new BehaviorSubject(false);
  }

  login(details: Login) {
    this._http.post('http://ec2-52-23-253-40.compute-1.amazonaws.com/api/auth/login', details).subscribe(
      (token) => {
        localStorage.setItem('Authorization', JSON.stringify(token['token']));
        this.loggedIn.next(true);
      },
      (err) => {
        this.loggedIn.next(false);
      }
    );
  }

  isLoggedIn() {
    if (!this.jwtHelper.isTokenExpired() && this.loggedIn.getValue()) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.loggedIn.next(false);
  }
}
