import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-box',
  templateUrl: './button-box.component.html',
  styleUrls: ['./button-box.component.css']
})
export class ButtonBoxComponent implements OnInit {

  constructor() { }

  ClassButtonClicked() {
    let Classbtn = document.getElementById("ClassButton");
    let OfficeBtn = document.getElementById("OfficeButton");
    Classbtn.style.backgroundColor = "grey";
    OfficeBtn.style.backgroundColor = "#3454D1";
  }
  OfficeButtonClicked(){
    let Classbtn = document.getElementById("ClassButton");
    let OfficeBtn = document.getElementById("OfficeButton");
    Classbtn.style.backgroundColor = "#D1345B";
    OfficeBtn.style.backgroundColor = "grey";
  }

  ngOnInit(): void {
    let Classbtn = document.getElementById("ClassButton");
    Classbtn.style.backgroundColor = "grey";
  }

}
