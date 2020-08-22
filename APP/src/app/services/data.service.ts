import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Session} from '../session';
import {User} from '../user';
import {Report} from '../report';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  user: User;
  apiURL = "https://localhost:5001/api";

  constructor(private _http: HttpClient) { }

  getUser(userId: string) {
    return this._http.get<User>(this.apiURL + "/DGE/user/" + userId).subscribe((user) => {
      this.user = user;
    });
  }

  postSession(sessionEntered: Session){
    this._http.post(this.apiURL + "/DGE/start", sessionEntered);
  }

  getReport(userId: string, start: string, end: string){
    var url = this.apiURL + "/DGE/report?" + "userId=" + 
    userId + "&start=" + start + "&end=" + end;
    return this._http.get<Array<Report>>(url);
  }
}
