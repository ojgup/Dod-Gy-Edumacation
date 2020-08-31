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
    if (this.session != null) {
      this.roomNumber = this.session.roomCode;
    }
  }

  sessionEntered() {
    var date: Date = new Date();
    date.setHours(this.hourEntered, this.minutesEntered, 0, 0);

    var difference = new Date();
    difference.setHours(difference.getHours() - 6);

    //Close Session
    if (this.session != null) {
      date.setHours(date.getHours());
      this.session.sessionEnd = date.toJSON();
      console.log(this.session);
      this.dataService.postEndSession(this.session);
      this.roomNumber = "";
      this.hourEntered = null;
      this.minutesEntered = null;
    }

    //Start Session
    if (date > difference) {
      date.setHours(date.getHours());
      if (this.session == null) {//Time acceptable
        let enteredSession: Session =
        {
          'roomCode': this.roomNumber,
          'sessionStart': date.toJSON(),
          'userID': this.user.userId,
          'sessionType': this.sessionType,
        };

        this.dataService.postStartSession(enteredSession);
        this.hourEntered = null;
        this.minutesEntered = null;
        //Need to navigate to Home if successful session, otherwise display error
      }
    }
    else
      alert("You cannot enter a session time more than 6 hours before your current time");
  }

  ClassButtonClicked() {
    this.sessionType = "Class";
  }

  OfficeButtonClicked() {
    this.sessionType = "Office";
  }
}
