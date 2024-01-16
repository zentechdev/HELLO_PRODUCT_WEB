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
import { ReportModule } from './report/report.module';
import { UserMappingListComponent } from './user-mapping/user-mapping-list/user-mapping-list.component';
import { UserMappingDialogComponent } from './user-mapping/user-mapping-dialog/user-mapping-dialog.component';
import { DeviceManagementModule } from './device-management/device-management.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgSelect2Module } from 'ng-select2';
import { AddClientModule } from './add-client/add-client.module';
import { EmployeeRfidListComponent } from './rfid-details/rfid-employee-details/employee-rfid-list/employee-rfid-list.component';
import { EmployeeRfidDialogComponent } from './rfid-details/rfid-employee-details/employee-rfid-dialog/employee-rfid-dialog.component';
import { UnitRfidListComponent } from './rfid-details/rfid-unit-details/unit-rfid-list/unit-rfid-list.component';
import { UnitRfidDialogComponent } from './rfid-details/rfid-unit-details/unit-rfid-dialog/unit-rfid-dialog.component';
import { ManageUsersListComponent } from './manage-users/manage-users-list/manage-users-list.component';
import { ManageUsersDialogComponent } from './manage-users/manage-users-dialog/manage-users-dialog.component';
import { BulkUploadModule } from './bulk-upload/bulk-upload.module';



@NgModule({
    declarations: [
        LayoutComponent,
        UserMappingListComponent,
        UserMappingDialogComponent,
        EmployeeRfidListComponent,
        EmployeeRfidDialogComponent,
        UnitRfidListComponent,
        UnitRfidDialogComponent,
        ManageUsersListComponent,
        ManageUsersDialogComponent
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
        ReportModule,
        MatTableExporterModule,
        NgSelect2Module,
        AddClientModule,
        BulkUploadModule
    ]
})
export class LayoutModule { }
