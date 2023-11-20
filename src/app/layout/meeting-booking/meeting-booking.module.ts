import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MeetingBookingRoutingModule } from './meeting-booking-routing.module';
import { MeetingBookingComponent } from './meeting-booking.component';
import { MeetingRoomTypeListComponent } from './masters/meeting-room-type/meeting-room-type-list/meeting-room-type-list.component';
import { MeetingRoomTypeDiloagComponent } from './masters/meeting-room-type/meeting-room-type-diloag/meeting-room-type-diloag.component';
import { MeetingRoomPriceDiloagComponent } from './masters/meeting-room-price/meeting-room-price-diloag/meeting-room-price-diloag.component';
import { MeetingRoomPriceListComponent } from './masters/meeting-room-price/meeting-room-price-list/meeting-room-price-list.component';
import { MeetingRoomListComponent } from './masters/meeting-room/meeting-room-list/meeting-room-list.component';
import { MeetingRoomDialogComponent } from './masters/meeting-room/meeting-room-dialog/meeting-room-dialog.component';
import { MeetingRoomBookingListComponent } from './meeting-room-booking/meeting-room-booking-list/meeting-room-booking-list.component';
import { MeetingRoomBookingDialogComponent } from './meeting-room-booking/meeting-room-booking-dialog/meeting-room-booking-dialog.component';
import { MeetingDialogComponent } from './meeting-room-booking/meeting-room-booking-dialog/meeting-dialog/meeting-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [
    MeetingBookingComponent,
    MeetingRoomTypeListComponent,
    MeetingRoomTypeDiloagComponent,
    MeetingRoomPriceDiloagComponent,
    MeetingRoomPriceListComponent,
    MeetingRoomListComponent,
    MeetingRoomDialogComponent,
    MeetingRoomBookingListComponent,
    MeetingRoomBookingDialogComponent,
    MeetingDialogComponent
  ],
  imports: [
    CommonModule,
    MeetingBookingRoutingModule,

    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableExporterModule
  ]
})
export class MeetingBookingModule { }
