import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean>;
  loggingIn: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService, private dataService: DataService) {
    this.loggedIn = new BehaviorSubject(false);
    this.loggingIn = new BehaviorSubject(true);
    this.loggingIn.subscribe((value) => console.log('loggin in: ', value))
    if (!this.jwtHelper.isTokenExpired()) {
      if (this.loggedIn.getValue()) {
        this.loggingIn.next(false);
      } else {
        this.dataService.userId = this.jwtHelper.decodeToken().userId;
        this.dataService.getUser().then(() => {
          this.dataService.getOpenSession().then((res) => {
            this.loggingIn.next(false);
            this.loggedIn.next(true);
          })
        });
      }
    } else {
      this.loggingIn.next(false);
      this.logout();
    }
  }

  login(details: Login) {
    return new Promise((resolve, reject) => {
      this.loggingIn.next(true);
      this._http.post('http://ec2-52-23-253-40.compute-1.amazonaws.com/api/auth/login', details).subscribe(
        (token) => {
          localStorage.setItem('Authorization', JSON.stringify(token['token']));
          this.dataService.getUser().then(() => {
            this.dataService.getOpenSession().then((res) => {
              this.loggingIn.next(false);
              this.loggedIn.next(true);
              resolve();
            })
          });
        },
        (err) => {
          this.loggedIn.next(false);
          this.loggingIn.next(false);
          console.log(err);
          reject();
        }
      );
    })
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.loggedIn.next(false);
  }
}
