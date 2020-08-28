import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Report } from '../report';
import { User } from '../user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  userId: string;
  StartDate: Date;
  EndDate: Date;
  days: number;

  columnDefs = [
    { headerName: 'Session Start', field: 'sessionStart', suppressMovable: true },
    { headerName: 'Session End', field: 'sessionEnd', suppressMovable: true },
    { headerName: 'Room', field: 'roomCode', suppressMovable: true },
    { headerName: 'Type', field: 'sessionType', suppressMovable: true },
    { headerName: 'Teacher', field: 'teacher', suppressMovable: true }
  ];

  reports: Array<Report>;
  user: BehaviorSubject<User>;
  disableUserId: boolean;

  constructor(private dataService: DataService) {
    this.user = this.dataService.user;
  }

  ngOnInit(): void {
    console.log("Report OnInIt");
    this.user = this.dataService.user;
    console.log(this.user.getValue().userType);

    if (this.user.getValue().userType != "Staff") {
      this.disableUserId = true;
      this.userId = this.user.getValue().userId;
    }

  }

  GetSessions() {
    this.StartDate = new Date(this.StartDate);
    this.StartDate.setHours(0, 0, 0);
    this.EndDate = new Date(this.EndDate);
    this.EndDate.setHours(0, 0, 0);
    this.dataService.getReport(this.userId, this.StartDate, this.EndDate).then((data: Array<Report>) => {
      this.reports = data;
      this.days = data.length;
    })
    .catch(err => console.log(err))
  }
}
