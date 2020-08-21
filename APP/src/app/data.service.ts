import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Session} from './session';
import {User} from './user';
import {Report} from './report';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = "https://localhost:5001/api";

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<User[]>(this.apiURL)
  }

  postSession(sessionEntered: Session){
    this._http.post("https://localhost:5001/api/DGE/start", sessionEntered).subscribe();
  }

  getReport(/*userId: string, start: Date, end: Date*/){
    return this._http.get<Array<Report>>("https://localhost:5001/api/DGE/report?userId=103043778"
    + "&start=2020-01-05T00:00:00&end=2020-01-09T00:00:00");
  }
}
