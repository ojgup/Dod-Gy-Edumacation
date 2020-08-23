import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Session} from '../session';
import {User} from '../user';
import {Report} from '../report';
import { UserComponentFactory } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  user: User;
  userId: string;
  session: Session;
  apiURL = "https://localhost:5001/api";

  constructor(private _http: HttpClient) { 
  }

  getUser(userId: string) {
    return this._http.get<User>(this.apiURL + "/DGE/user/" + userId).subscribe((user) => {
      this.user = <User>user;
      this.userId = user.userid;
    });
  }

  getOpenSession(userId: string){
    return this._http.get<Session>(this.apiURL + "/DGE/open/" + userId).subscribe((session) => {
      this.session = <Session>session;
      console.log(this.session);
    });
  }

  postStartSession(sessionEntered: Session){
    this._http.post(this.apiURL + "/DGE/start", sessionEntered).subscribe();
  }

  getReport(userId: string, start: string, end: string){
    var url = this.apiURL + "/DGE/report?" + "userId=" + 
    userId + "&start=" + start + "&end=" + end;
    return this._http.get<Array<Report>>(url);
  }
}
