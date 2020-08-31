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
  user: User;
  disableUserId: boolean;

  constructor(private dataService: DataService) {
    this.dataService.user.subscribe((value) => {
      this.user = value;
    });
  }

  ngOnInit(): void { }

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
