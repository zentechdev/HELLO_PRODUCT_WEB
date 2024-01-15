import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters/masters.component';

const routes: Routes = [
  {
    path: 'masters',
    component: MastersComponent,
    loadChildren: () => import('./masters/masters.module').then(x => x.MastersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalCardRoutingModule { }
