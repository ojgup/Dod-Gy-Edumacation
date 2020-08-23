import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Session } from '../session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  userID: string;
  roomNumber: string;

  hourEntered: number;
  minutesEntered: number;

  hourLeft: number;
  minutesLeft: number;

  constructor(private dataService: DataService) { }

  session: Session;

  ngOnInit(): void {
    this.session = this.dataService.session;
    
  }

  sessionEntered() {
    /*Input fields should be type='number' with min and max attributes limiting user input*/
    //Must check session type and validate all inputs
    //Check date format being sent correctly

    /*let now: Date = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);*/

    let date: Date = new Date();
    date.setHours(this.hourEntered + 10, this.minutesEntered, 0, 0);

    //let diff: number = date.getTime() - now.getTime();

/*     if (now.getHours() < 6 && diff >= 18*60*60*1000) {
      console.log('yesterday');
      date.setTime(date.getTime() - 24*60*60*1000);
      diff -= 24*60*60*1000;
    }
    if (diff < -6*60*60*1000) {
      console.log('too long ago');
      return;
    }
    else if (diff > 0) {
      alert('try logging it when you have left');
      return;
    } */

    if(this.session == null){
      let enteredSession: Session =
      {
        'roomCode': this.roomNumber,
        'sessionStart': date.toJSON(),
        'userID': this.userID,
        'sessionType': 'Class',
      };
  
      this.dataService.postStartSession(enteredSession);
    }
    else{
      this.session.sessionEnd = date.toJSON();
      console.log(this.session);
      this.dataService.postEndSession(this.session);
    }
  }
}
