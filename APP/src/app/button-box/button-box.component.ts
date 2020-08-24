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
    Classbtn.style.backgroundColor = "#d1cbcb";
    OfficeBtn.style.backgroundColor = "#3454D1";
    OfficeBtn.style.color = "white";
    Classbtn.style.color = "black";
  }
  OfficeButtonClicked(){
    let Classbtn = document.getElementById("ClassButton");
    let OfficeBtn = document.getElementById("OfficeButton");
    Classbtn.style.backgroundColor = "#D1345B";
    Classbtn.style.color = "white";
    OfficeBtn.style.backgroundColor = "#d1cbcb";
    OfficeBtn.style.color = "black";
  }

  ngOnInit(): void {
    let Classbtn = document.getElementById("ClassButton");
  }
}
