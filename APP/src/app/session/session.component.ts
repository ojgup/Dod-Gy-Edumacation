import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Session } from '../session';
import { User } from '../user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DateFilter } from 'ag-grid-community';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  roomNumber: string;

  hourEntered: number;
  minutesEntered: number;

  hourLeft: number;
  minutesLeft: number;

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
    });
  }

  ngOnInit(): void {
    if (this.session != null)
      this.roomNumber = this.session.roomCode;

    this.dataService.sessionPosted.subscribe(
      (event) => {
        this.dataService.getOpenSession();
      }
    );
  }

  sessionEntered() {
    let date: Date = new Date();
    date.setHours(this.hourEntered, this.minutesEntered, 0, 0);

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
      alert('try logging it when you have left');
      return;
    }

    //start session
    if (this.session == null) {
      let enteredSession: Session =
      {
        'roomCode': this.roomNumber,
        'sessionStart': date.toJSON(),
        'userID': this.user.userId,
        'sessionType': this.sessionType,
      };

      this.dataService.postStartSession(enteredSession);
      //Need to navigate to Home if successful session, otherwise display error
    }
    //end session
    else {
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
