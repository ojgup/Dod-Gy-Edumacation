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

  constructor(private dataService: DataService, private router: Router) {
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

  // sessionEntered() {
  //   var date: Date = new Date();
  //   date.setHours(this.hours, this.minutes, 0, 0);

  //   var difference = new Date();
  //   difference.setHours(difference.getHours() - 6);

  //   //Close Session
  //   if (this.session != null) {
  //     date.setHours(date.getHours());
  //     this.session.sessionEnd = date.toJSON();
  //     console.log(this.session);
  //     this.dataService.postEndSession(this.session);
  //     this.roomNumber = "";
  //     this.hours = null;
  //     this.minutes = null;
  //   }

  //   //Start Session
  //   if (date > difference) {
  //     date.setHours(date.getHours());
  //     if (this.session == null) {//Time acceptable
  //       let enteredSession: Session =
  //       {
  //         'roomCode': this.roomNumber,
  //         'sessionStart': date.toJSON(),
  //         'userID': this.user.userId,
  //         'sessionType': this.sessionType,
  //       };

  //       this.dataService.postStartSession(enteredSession);
  //       this.hours = null;
  //       this.minutes = null;
  //       //Need to navigate to Home if successful session, otherwise display error
  //     }
  //   }
  //   else
  //     alert("You cannot enter a session time more than 6 hours before your current time");
  // }
  sessionEntered() {
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
      return;
    }
    else if (diff > 0) {
      console.log('try logging it when you have left');
      return;
    }

    if (this.session == null) { //start session
      let enteredSession: Session =
      {
        'roomCode': this.roomNumber,
        'sessionStart': date.toJSON(),
        'userID': this.user.userId,
        'sessionType': this.sessionType,
      };

      this.dataService.postStartSession(enteredSession);
    }
    else { //end session
      this.session.sessionEnd = date.toJSON();
      console.log(this.session);
      this.dataService.postEndSession(this.session);
    }
  }

  ClassButtonClicked() {
    this.sessionType = "Class";
  }

  OfficeButtonClicked() {
    this.sessionType = "Office";
  }
}
