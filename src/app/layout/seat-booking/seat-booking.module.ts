import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatBookingRoutingModule } from './seat-booking-routing.module';
import { SeatBookingComponent } from './seat-booking.component';
import { SeatTypeDialogComponent } from './masters/seat-type/seat-type-dialog/seat-type-dialog.component';
import { SeatTypeListComponent } from './masters/seat-type/seat-type-list/seat-type-list.component';
import { SeatPriceListComponent } from './masters/seat-price/seat-price-list/seat-price-list.component';
import { SeatPriceDialogComponent } from './masters/seat-price/seat-price-dialog/seat-price-dialog.component';
import { SeatBookingListComponent } from './seat-booking/seat-booking-list/seat-booking-list.component';
import { SeatBookingDialogComponent } from './seat-booking/seat-booking-dialog/seat-booking-dialog.component';
import { SeatListComponent } from './masters/seat/seat-list/seat-list.component';
import { SeatDialogComponent } from './masters/seat/seat-dialog/seat-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableExporterModule } from 'mat-table-exporter';
import { BookingDialogComponent } from './seat-booking/seat-booking-dialog/booking-dialog/booking-dialog.component';
import { PermanentBookingListComponent } from './masters/permanent-booking/permanent-booking-list/permanent-booking-list.component';
import { PermanentBookingDialogComponent } from './masters/permanent-booking/permanent-booking-dialog/permanent-booking-dialog.component';



@NgModule({
  declarations: [
    SeatBookingComponent,
    SeatTypeDialogComponent,
    SeatTypeListComponent,
    SeatPriceListComponent,
    SeatPriceDialogComponent,
    SeatBookingListComponent,
    SeatBookingDialogComponent,
    SeatListComponent,
    SeatDialogComponent,
    BookingDialogComponent,
    PermanentBookingListComponent,
    PermanentBookingDialogComponent
  ],
  imports: [
    CommonModule,
    SeatBookingRoutingModule,

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
    MatTableExporterModule,
    MatStepperModule
  ]
})
export class SeatBookingModule { }
