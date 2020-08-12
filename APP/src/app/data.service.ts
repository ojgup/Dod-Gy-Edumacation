import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Session} from './session';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = "https://localhost:5001/api/DGE/start";

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<User[]>(this.apiURL)
  }

  postSession(sessionEntered: Session){
    this._http.post("https://localhost:5001/api/DGE/start", sessionEntered).subscribe();
  }
}
