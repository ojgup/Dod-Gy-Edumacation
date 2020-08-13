import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeEnteredComponent } from './time-entered/time-entered.component';
import { TimeLeftComponent } from './time-left/time-left.component';
import { ReportingComponent } from './reporting/reporting.component'

const routes: Routes = [
  {path: 'time-entered', component: TimeEnteredComponent},
  {path: 'time-left', component: TimeLeftComponent},
  {path: 'reporting', component: ReportingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
