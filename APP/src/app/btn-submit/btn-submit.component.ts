import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../session';

@Component({
  selector: 'app-btn-submit',
  templateUrl: './btn-submit.component.html',
  styleUrls: ['./btn-submit.component.css']
})
export class BtnSubmitComponent implements OnInit {
  @Input() name: string;

  constructor() { }


  ngOnInit(): void {
  }
}
