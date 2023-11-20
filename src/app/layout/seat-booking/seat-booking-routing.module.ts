import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatListComponent } from './masters/seat/seat-list/seat-list.component';
import { SeatDialogComponent } from './masters/seat/seat-dialog/seat-dialog.component';
import { SeatPriceDialogComponent } from './masters/seat-price/seat-price-dialog/seat-price-dialog.component';
import { SeatPriceListComponent } from './masters/seat-price/seat-price-list/seat-price-list.component';
import { SeatTypeDialogComponent } from './masters/seat-type/seat-type-dialog/seat-type-dialog.component';
import { SeatTypeListComponent } from './masters/seat-type/seat-type-list/seat-type-list.component';
import { SeatBookingDialogComponent } from './seat-booking/seat-booking-dialog/seat-booking-dialog.component';
import { SeatBookingListComponent } from './seat-booking/seat-booking-list/seat-booking-list.component';
import { PermanentBookingListComponent } from './masters/permanent-booking/permanent-booking-list/permanent-booking-list.component';
import { PermanentBookingDialogComponent } from './masters/permanent-booking/permanent-booking-dialog/permanent-booking-dialog.component';

const routes: Routes = [
  {path:'seat-list',component:SeatListComponent},
  {path:'seat-dialog',component:SeatDialogComponent},
  {path:'seat-price-dialog',component:SeatPriceDialogComponent},
  {path:'seat-price-list',component:SeatPriceListComponent},
  {path:'seat-type-dialog',component:SeatTypeDialogComponent},
  {path:'seat-type-list',component:SeatTypeListComponent},
  {path:'seat-booking-dialog',component:SeatBookingDialogComponent},
  {path:'seat-booking-list',component:SeatBookingListComponent},
  {path:'permanent-booking-list',component:PermanentBookingListComponent},
  {path:'permanent-booking-dialog',component:PermanentBookingDialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatBookingRoutingModule { }
