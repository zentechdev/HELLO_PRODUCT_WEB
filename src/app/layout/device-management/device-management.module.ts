import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableExporterModule } from 'mat-table-exporter';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceManagementComponent } from './device-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { DeviceConfigurationListComponent } from './device-configuration/device-configuration-list/device-configuration-list.component';
import { DeviceConfigurationDialogComponent } from './device-configuration/device-configuration-dialog/device-configuration-dialog.component';
import { UserManagementListComponent } from './user-management/user-management-list/user-management-list.component';
import { UserManagementDialogComponent } from './user-management/user-management-dialog/user-management-dialog.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';


@NgModule({
  declarations: [
    DeviceManagementComponent,
    DeviceConfigurationListComponent,
    DeviceConfigurationDialogComponent,
    UserManagementListComponent,
    UserManagementDialogComponent,
    AttendanceListComponent,
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatTableExporterModule
  ]
})
export class DeviceManagementModule { }
