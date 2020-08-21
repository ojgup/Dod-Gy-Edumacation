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
  reports: Array<Report>;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  
  GetSessions(){
    this.dataService.getReport().subscribe((data) => {
      this.reports = data;
      console.log(this.reports);
    })
  }
}
