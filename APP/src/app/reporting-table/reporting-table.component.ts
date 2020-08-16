import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Session } from '../session';

@Component({
  selector: 'app-reporting-table',
  templateUrl: './reporting-table.component.html',
  styleUrls: ['./reporting-table.component.css']
})
export class ReportingTableComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}