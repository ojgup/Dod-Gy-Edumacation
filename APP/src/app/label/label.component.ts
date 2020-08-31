import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  @Input() labelName: string;
  @Input() labelFor: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
