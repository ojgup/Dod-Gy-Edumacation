import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  apiURL = "https://ec2-52-23-253-40.compute-1.amazonaws.com/api";
  sessionPosted: EventEmitter<boolean>;

  constructor(private _http: HttpClient) {
    this.user = new BehaviorSubject(null);
    this.session = new BehaviorSubject(null);
    this.sessionPosted = new EventEmitter();
  }

  getUser() {
    this._http.get<any>(this.apiURL + "/DGE/user/" + this.userId).subscribe((data) => {
      let user: User = {
        "userId": data.userid,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "userType": data.userType,
      }
      this.user.next(user);
      this.getOpenSession()
    });
  }

  /*Returns 404 error('No open sessions found') when no open sessions*/
  getOpenSession() {
    this._http.get<Session>(this.apiURL + "/DGE/open/" + this.user.getValue().userId).subscribe(
      (session) => {
        if (session) {
          this.session.next(<Session>session);
        } else {
          this.session.next(null);
          console.log("no session");
        }
      },
      err => {
        console.log(err.error);
      },
      () => {}
    )
  }

  postStartSession(sessionEntered: Session) {
    let message: string;
    this._http.post(this.apiURL + "/DGE/start", sessionEntered, { responseType: 'text' }).subscribe(
      res => {
        this.sessionPosted.emit();
        console.log('HTTP response', res);
        message = "Successfully entered";
      },
      err => {
        console.log('HTTP error', err.error.text);
        message = "Error";
      },
      () => {
        console.log('HTTP request completed');
        alert(message);
      }
    );
    /*Can return something in completed request handler*/
    //alert("Session Started");
  }

  postEndSession(sessionEnd: Session) {
    this._http.put(this.apiURL + "/DGE/end", sessionEnd).subscribe(
      res => {
        this.sessionPosted.emit();
      },
    err => {/*retrieve error message and alert*/},
      () => {},
    );
    alert("Session Ended");
  }

  getReport(userId: string, start: string, end: string) {
    var url = this.apiURL + "/DGE/report?" + "userId=" +
      userId + "&start=" + start + "&end=" + end;
    return this._http.get<Array<Report>>(url);
  }
}
