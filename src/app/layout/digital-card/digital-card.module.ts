import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalCardRoutingModule } from './digital-card-routing.module';
import { DigitalCardComponent } from './digital-card.component';
import { MastersModule } from './masters/masters.module';



@NgModule({
  declarations: [
    DigitalCardComponent
  ],
  imports: [
    CommonModule,
    DigitalCardRoutingModule,
    MastersModule,
  ]
})
export class DigitalCardModule { }
