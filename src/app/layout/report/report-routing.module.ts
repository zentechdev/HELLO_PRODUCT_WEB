import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkInVisitorComponent } from './visitor/walk-in-visitor/walk-in-visitor.component';
import { InvitedVisitorComponent } from './visitor/invited-visitor/invited-visitor.component';

const routes: Routes = [
  {path:'walk-in-visitor',component:WalkInVisitorComponent},
  {path:'invited-visitor',component:InvitedVisitorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
