import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Session } from '../session';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  userID: string;
  StartDate: Date;
  EndDate: Date;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  GetSessions(){

  }
}
