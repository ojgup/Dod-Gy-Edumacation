import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    // this.accountService.login()
  }

}
