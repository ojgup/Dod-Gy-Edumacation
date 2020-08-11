import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LabelComponent} from './label/label.component';
import {InputBoxComponent} from './input-box/input-box.component';
import { ButtonBoxComponent } from './button-box/button-box.component';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import {TimeEnteredComponent} from './time-entered/time-entered.component';
import {TimeLeftComponent} from './time-left/time-left.component';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    InputBoxComponent,
    ButtonBoxComponent,
    BtnSubmitComponent,
    TimeEnteredComponent,
    TimeLeftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
