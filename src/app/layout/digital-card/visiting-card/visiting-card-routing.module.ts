import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitingCardListComponent } from './visiting-card-share/visiting-card-list/visiting-card-list.component';
import { VisitingCardShareComponent } from './visiting-card-share/visiting-card-share/visiting-card-share.component';

const routes: Routes = [
  {path:'visiting-card-share',component:VisitingCardShareComponent},
  {path:'visiting-card-list',component:VisitingCardListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitingCardRoutingModule { }
