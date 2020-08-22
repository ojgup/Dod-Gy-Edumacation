import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { ReportingComponent } from './reporting/reporting.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {path: 'session', component: SessionComponent, canActivate: [AuthGuard]},
  {path: 'reporting', component: ReportingComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
