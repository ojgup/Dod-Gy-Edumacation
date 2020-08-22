import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    //let headers = new HttpHeaders();
    //headers.append('Authorization', 'Bearers ' + JSON.stringify(localStorage.getItem('Authorization')));
    return this._http.get<User>(this.apiURL + "/DGE/user/" + userId/*, {headers: headers}*/).subscribe((user) => {
      this.user = <User>user;
      console.log(this.user);
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
