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

  columnDefs = [
    { headerName: 'Session Start', field: 'SStart' },
    { headerName: 'Session End', field: 'SEnd' },
    { headerName: 'Room', field: 'Room' },
    { headerName: 'Type', field: 'Type' },
    { headerName: 'Teacher', field: 'Teacher' }
  ];

  rowData = [
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" },
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" },
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" },
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" },
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" },
    { SStart: '05/01/1974 12:00', SEnd: '05/01/1974 06:00', Room: "DD224", Type: "Class", Teacher: "Boutros Gahli" }
  ];

}