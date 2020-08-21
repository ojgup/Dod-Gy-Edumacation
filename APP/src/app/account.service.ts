import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from './user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {DataService} from './data.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient, private dataService: DataService) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
     return this.userSubject.value;
  }

  login(username, password) {
    return this.http.post<User>(this.dataService.apiURL, {username, password} )
    .pipe(map(user=> {

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}