import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LabelComponent} from './label/label.component';
import {InputBoxComponent} from './input-box/input-box.component';
import { ButtonBoxComponent } from './button-box/button-box.component';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import {DataService} from './data.service';
import { SessionComponent } from './session/session.component';
import { ReportingComponent } from './reporting/reporting.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    InputBoxComponent,
    ButtonBoxComponent,
    BtnSubmitComponent,
    SessionComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
