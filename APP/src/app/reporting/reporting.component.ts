import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Report } from '../report';
import { User } from '../user';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  userID: string;
  StartDate: Date;
  EndDate: Date;
  days: number;

  columnDefs = [
    { headerName: 'Session Start', field: 'sessionStart' },
    { headerName: 'Session End', field: 'sessionEnd' },
    { headerName: 'Room', field: 'roomCode' },
    { headerName: 'Type', field: 'sessionType' },
    { headerName: 'Teacher', field: 'teacher' }
  ];

  reports: Array<Report>;
  user: User;
  disableUserId: boolean;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    console.log("Report OnInIt");
    
    this.user = this.dataService.user;
    console.log(this.user.userType);
    if (this.user.userType != "Staff") {
      this.disableUserId = true;
      this.userID = this.user.userid;
    }

  }

  GetSessions() {
    this.StartDate = new Date(this.StartDate);
    this.StartDate.setHours(0, 0, 0);
    this.EndDate = new Date(this.EndDate);
    this.EndDate.setHours(0, 0, 0);

    this.dataService.getReport(this.userID, this.StartDate.toJSON(), this.EndDate.toJSON()).subscribe((data) => {
      this.reports = data;
      this.days = this.reports.length;
    },
      err => alert(err.error))/*This returns the error if no reports found - use err.error to inform user with message*/
  }
}
