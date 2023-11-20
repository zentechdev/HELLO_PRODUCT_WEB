import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRoomDialogComponent } from './masters/meeting-room/meeting-room-dialog/meeting-room-dialog.component';
import { MeetingRoomListComponent } from './masters/meeting-room/meeting-room-list/meeting-room-list.component';
import { MeetingRoomPriceDiloagComponent } from './masters/meeting-room-price/meeting-room-price-diloag/meeting-room-price-diloag.component';
import { MeetingRoomPriceListComponent } from './masters/meeting-room-price/meeting-room-price-list/meeting-room-price-list.component';
import { MeetingRoomTypeDiloagComponent } from './masters/meeting-room-type/meeting-room-type-diloag/meeting-room-type-diloag.component';
import { MeetingRoomTypeListComponent } from './masters/meeting-room-type/meeting-room-type-list/meeting-room-type-list.component';
import { MeetingRoomBookingDialogComponent } from './meeting-room-booking/meeting-room-booking-dialog/meeting-room-booking-dialog.component';
import { MeetingRoomBookingListComponent } from './meeting-room-booking/meeting-room-booking-list/meeting-room-booking-list.component';

const routes: Routes = [
  {path:'meeting-room-dialog',component:MeetingRoomDialogComponent},
  {path:'meeting-room-list',component:MeetingRoomListComponent},
  {path:'meeting-room-price-dialog',component:MeetingRoomPriceDiloagComponent},
  {path:'meeting-room-price-list',component:MeetingRoomPriceListComponent},
  {path:'meeting-room-type-dialog',component:MeetingRoomTypeDiloagComponent},
  {path:'meeting-room-type-list',component:MeetingRoomTypeListComponent},
  {path:'meeting-room-booking-dialog',component:MeetingRoomBookingDialogComponent},
  {path:'meeting-room-booking-list',component:MeetingRoomBookingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingBookingRoutingModule { }
