import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import {MatStepperModule} from '@angular/material/stepper';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { DigitalCardModule } from './digital-card/digital-card.module';
import { SharedModule } from '../shared/shared.module';
import { GlobalMessageModule } from './global-message/global-message.module';
import { ReportModule } from './report/report.module';
import { UserMappingListComponent } from './user-mapping/user-mapping-list/user-mapping-list.component';
import { UserMappingDialogComponent } from './user-mapping/user-mapping-dialog/user-mapping-dialog.component';
import { SeatBookingModule } from './seat-booking/seat-booking.module';
import { MeetingBookingModule } from './meeting-booking/meeting-booking.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DeviceManagementModule } from './device-management/device-management.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
    declarations: [
        LayoutComponent,
        UserMappingListComponent,
        UserMappingDialogComponent,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        DashboardModule,
        DigitalCardModule,
        SharedModule,
        DeviceManagementModule,

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
        MatStepperModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        
        GlobalMessageModule,
        ReportModule,
        SeatBookingModule,
        MeetingBookingModule,
        PermissionsModule,
        MatTableExporterModule,
        NgSelect2Module
    ]
})
export class LayoutModule { }
