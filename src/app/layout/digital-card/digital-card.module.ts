import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalCardRoutingModule } from './digital-card-routing.module';
import { DigitalCardComponent } from './digital-card.component';
import { MastersModule } from './masters/masters.module';
import { BrochureModule } from './brochure/brochure.module';
import { VisitingCardModule } from './visiting-card/visiting-card.module';


@NgModule({
  declarations: [
    DigitalCardComponent,
  ],
  imports: [
    CommonModule,
    DigitalCardRoutingModule,
    MastersModule,
    BrochureModule,
    VisitingCardModule
  ]
})
export class DigitalCardModule { }
