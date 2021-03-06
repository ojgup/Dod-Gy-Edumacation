import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Report } from '../report';
import { User } from '../user';
import { BehaviorSubject } from 'rxjs';
import { formatDate } from '../formatDate';

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
  reports: any[];
  user: User;
  disableUserId: boolean;
  noResults: boolean;

  columnDefs = [
    { headerName: 'Session Start', field: 'sessionStart', suppressMovable: true },
    { headerName: 'Session End', field: 'sessionEnd', suppressMovable: true },
    { headerName: 'Room', field: 'roomCode', suppressMovable: true },
    { headerName: 'Type', field: 'sessionType', suppressMovable: true },
    { headerName: 'Teacher', field: 'teacher', suppressMovable: true }
  ];


  constructor(private dataService: DataService) {
    this.dataService.user.subscribe((value) => {
      this.user = value;
      if (this.user.userType == 'Admin') {
        this.userId = '';
      } else {
        this.userId = this.user.userId;
      }
    });
  }

  ngOnInit(): void { }

  GetSessions() {
    this.StartDate = new Date(this.StartDate);
    this.StartDate.setHours(0, 0, 0);
    this.EndDate = new Date(this.EndDate);
    this.EndDate.setHours(0, 0, 0);
    this.EndDate.setTime(this.EndDate.getTime() + 24 * 60 * 60 * 1000);
    this.dataService.getReport(this.userId, this.StartDate, this.EndDate).then((data: Report[]) => {
      if (!data) {
        this.reports = null;
        this.days = null;
        this.noResults = true;
      } else {
        this.reports = data.map((report) => {
          return {
            ...report,
            sessionStart: formatDate(report.sessionStart),
            sessionEnd: formatDate(report.sessionEnd),
          };
        });
        this.noResults = false;
      }
      this.days = data.length;
    }).catch(err => console.log(err))
  }
}
