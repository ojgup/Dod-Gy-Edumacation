import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Session } from '../session';
import { User } from '../user';
import { Report } from '../report';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  user: User;
  userId: string;
  session: Session;
  apiURL = "https://localhost:5001/api";
  sessionType: string;

  userType: string;

  constructor(private _http: HttpClient) {
  }

  getUser(userId: string) {
    return this._http.get<User>(this.apiURL + "/DGE/user/" + userId).subscribe((user) => {
      this.user = <User>user;
      this.userId = user.userid;
    });
  }

  getOpenSession(userId: string) {
    return this._http.get<Session>(this.apiURL + "/DGE/open/" + userId).subscribe((session) => {
      this.session = <Session>session;
      console.log(this.session);
      /*Returns 404 error('No open sessions found') when no open sessions*/ 
    });
  }

  postStartSession(sessionEntered: Session) {
    this._http.post(this.apiURL + "/DGE/start", sessionEntered, {responseType: 'text'}).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP error', err.error.text),
      () => console.log('HTTP request completed')
    );
    /*Can return something in completed request handler*/
    alert("Session STarted");
  }

  postEndSession(sessionEnd: Session) {
    this._http.put(this.apiURL + "/DGE/end", sessionEnd).subscribe();
    alert("Session Ended");
  }

  getReport(userId: string, start: string, end: string) {
    var url = this.apiURL + "/DGE/report?" + "userId=" +
      userId + "&start=" + start + "&end=" + end;
    return this._http.get<Array<Report>>(url);
  }
}
