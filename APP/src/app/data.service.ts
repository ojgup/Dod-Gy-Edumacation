import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Session} from './session';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = '';

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<User[]>(this.apiURL)
  }

  postSession(sessionEntered: Session){
    return this._http.post<Session>(this.apiURL, sessionEntered);
  }
}
