import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Session} from '../session';


@Component({
  selector: 'app-time-entered',
  templateUrl: './time-entered.component.html',
  styleUrls: ['./time-entered.component.css']
})
export class TimeEnteredComponent implements OnInit {

  userID: string;
  roomNumber: string;
  dateEntered: Date;

  hourLeft: number;
  minutesLeft: number;

  hourEntered: number;
  minutesEntered: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  sessionEntered(){

                      
    this.dateEntered.setHours(this.hourEntered, this.minutesEntered);
    
    let enteredSession: Session;

    enteredSession.roomCode = this.roomNumber;
    enteredSession.sessionStart = enteredSession;
    enteredSession.sessionEnd = new Date().setHours(this.hourLeft, this.minutesLeft);
    enteredSession.userID = this.userID;

    this.dataService.postSession(enteredSession);
  }

}
