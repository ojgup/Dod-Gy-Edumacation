import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Session } from '../session';
import { User } from '../user';
import { Report } from '../report';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  user: BehaviorSubject<User>;
  userId: string;
  session: BehaviorSubject<Session>;
  apiURL = "http://ec2-52-23-253-40.compute-1.amazonaws.com/api";

  constructor(private _http: HttpClient) {
    this.user = new BehaviorSubject(null);
    this.session = new BehaviorSubject(null);
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this._http.get<any>(this.apiURL + "/DGE/user/" + this.userId).subscribe((data) => {
        let user: User = {
          "userId": data.userid,
          "firstName": data.firstName,
          "lastName": data.lastName,
          "userType": data.userType,
        }
        this.user.next(user);
        resolve();
      });
    })
  }

  /*Returns 404 error('No open sessions found') when no open sessions*/
  getOpenSession() {
    return new Promise((resolve, reject) => {
      this._http.get<Session>(this.apiURL + "/DGE/open/" + this.user.getValue().userId).subscribe(
        (session) => {
          if (session) {
            this.session.next(<Session>session);
          } else {
            this.session.next(null);
            console.log("no session");
          }
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      )
    })
  }

  postStartSession(sessionEntered: Session) {
    this._http.post(this.apiURL + "/DGE/start", sessionEntered, { responseType: 'text' }).subscribe(
      res => {
        this.getOpenSession();
        console.log('HTTP response', res);
      },
      err => {
        console.log('HTTP error', err.error.text);
      }
    );
  }

  postEndSession(sessionEnd: Session) {
    this._http.put(this.apiURL + "/DGE/end", sessionEnd).subscribe(
      res => {
        this.getOpenSession();
        console.log("Session Ended");
      },
      err => {console.log(err)}
    );
  }

  getReport(userId: string, start: Date, end: Date) {
    return new Promise((resolve, reject) => {
      this._http.get<Array<Report>>(
        this.apiURL + "/DGE/report",
        { params: new HttpParams().append('userId', userId).append('start', start.toUTCString()).append('end', end.toUTCString()) }
      ).subscribe(
        (res) => {resolve(res)},
        (err) => {reject()}
      )
    })
  }
}
