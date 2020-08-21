import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Report} from '../report';

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

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  
  GetSessions(){
    this.dataService.getReport().subscribe((data) => {
      this.reports = data;
      this.days = this.reports.length;
    })
  }
}
