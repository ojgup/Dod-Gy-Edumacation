import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Session } from '../session';
import { User } from '../user';
import { Router } from '@angular/router';
import { BehaviorSubject, empty } from 'rxjs';
import { DateFilter } from 'ag-grid-community';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  roomNumber: string;

  hours: number;
  minutes: number;

  sessionType: string = "Class";

  session: Session;
  user: User;

  errorTimeTravel: boolean;
  errorFuture: boolean;
  errorStale: boolean;

  constructor(private dataService: DataService, private router: Router) {
    this.errorTimeTravel = false;
    this.errorFuture = false;
    this.errorStale = false;

    this.dataService.user.subscribe((value: User) => {
      this.user = value;
      console.log("just fetched user: ", this.user);
    });

    this.dataService.session.subscribe((value: Session) => {
      console.log(value);
      this.session = value;
      this.hours = null;
      this.minutes = null;
      if (!value) {
        this.roomNumber = null;
      }
    });
  }

  ngOnInit(): void {
    if (this.session != null) {
      this.roomNumber = this.session.roomCode;
    }
  }

  sessionEntered() {
    this.errorTimeTravel = false;
    this.errorFuture = false;
    this.errorStale = false;

    let date: Date = new Date();
    date.setHours(this.hours, this.minutes, 0, 0);

    let now = new Date();
    let diff: number = date.getTime() - now.getTime();

    if (now.getHours() < 6 && diff >= 18 * 60 * 60 * 1000) {
      console.log('yesterday');
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
      diff -= 24 * 60 * 60 * 1000;
    }
    if (diff < -6 * 60 * 60 * 1000) {
      console.log('too long ago');
      this.errorStale = true;
      return;
    }
    if (this.session && date.getTime() + date.getTimezoneOffset() * 60 * 1000 <= this.session.sessionStart.getTime()) {
      console.log('end before start');
      this.errorTimeTravel = true;
      return;
    }
    else if (diff > 0) {
      console.log('future time');
      this.errorFuture = true;
      return;
    }

    if (this.session == null) { //start session
      let enteredSession: Session =
      {
        'roomCode': this.roomNumber,
        'sessionStart': date,
        'userID': this.user.userId,
        'sessionType': this.sessionType,
      };

      this.dataService.postStartSession(enteredSession).catch((err) => console.log(err));
    }
    else { //end session
      this.session.sessionEnd = date;
      console.log(this.session);
      this.dataService.postEndSession(this.session).catch((err) => console.log(err));
    }
  }

  ClassButtonClicked() {
    this.sessionType = "Class";
  }

  OfficeButtonClicked() {
    this.sessionType = "Office";
  }
}
