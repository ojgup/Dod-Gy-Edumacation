import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  {path: 'session', component: SessionComponent},
  {path: 'reporting', component: ReportingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
