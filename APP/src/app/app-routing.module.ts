import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeEnteredComponent } from './time-entered/time-entered.component';
import { TimeLeftComponent } from './time-left/time-left.component';

const routes: Routes = [
  {path: 'time-entered', component: TimeEnteredComponent},
  {path: 'time-left', component: TimeLeftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
