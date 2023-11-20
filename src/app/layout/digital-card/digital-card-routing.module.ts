import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrochureComponent } from './brochure/brochure.component';
import { MastersComponent } from './masters/masters.component';
import { VisitingCardComponent } from './visiting-card/visiting-card.component';

const routes: Routes = [
  {
    path: 'masters',
    component: MastersComponent,
    loadChildren: () => import('./masters/masters.module').then(x => x.MastersModule)
  },
  {
    path: 'brochure',
    component: BrochureComponent,
    loadChildren: () => import('./brochure/brochure.module').then(x => x.BrochureModule)
  },
  {
    path: 'visiting-card',
    component: VisitingCardComponent,
    loadChildren: () => import('./visiting-card/visiting-card.module').then(x => x.VisitingCardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalCardRoutingModule { }
