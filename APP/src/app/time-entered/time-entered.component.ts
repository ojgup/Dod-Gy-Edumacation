import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Session } from '../session';


@Component({
  selector: 'app-time-entered',
  templateUrl: './time-entered.component.html',
  styleUrls: ['./time-entered.component.css']
})
export class TimeEnteredComponent implements OnInit {

  userID: string;
  roomNumber: string;
  dateEntered: Date;

  /*hourLeft: number;
  minutesLeft: number;*/

  hourEntered: number;
  minutesEntered: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  sessionEntered() {
    /*Input fields should be type='number' with min and max attributes limiting user input*/
    //Must check session type and validate all inputs
    //Check date format being sent correctly

    this.dateEntered = new Date();
    this.dateEntered.setHours(this.hourEntered, this.minutesEntered, 0, 0);

    let enteredSession: Session =
    {
      'roomCode': this.roomNumber,
      'sessionStart': this.dateEntered.toJSON(),//'2019-01-06T17:16:40'
      'userID': this.userID,
      'sessionType': 'Class'
    };

    console.log(this.dateEntered.toJSON());
    this.dataService.postSession(enteredSession);
  }

}
