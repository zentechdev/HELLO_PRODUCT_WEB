import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DigitalCardComponent } from './digital-card/digital-card.component';
import { ReportComponent } from './report/report.component';
import { UserMappingDialogComponent } from './user-mapping/user-mapping-dialog/user-mapping-dialog.component';
import { UserMappingListComponent } from './user-mapping/user-mapping-list/user-mapping-list.component';
import { DeviceManagementComponent } from './device-management/device-management.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EmployeeRfidListComponent } from './rfid-details/rfid-employee-details/employee-rfid-list/employee-rfid-list.component';
import { EmployeeRfidDialogComponent } from './rfid-details/rfid-employee-details/employee-rfid-dialog/employee-rfid-dialog.component';
import { UnitRfidListComponent } from './rfid-details/rfid-unit-details/unit-rfid-list/unit-rfid-list.component';
import { UnitRfidDialogComponent } from './rfid-details/rfid-unit-details/unit-rfid-dialog/unit-rfid-dialog.component';
import { ManageUsersListComponent } from './manage-users/manage-users-list/manage-users-list.component';
import { ManageUsersDialogComponent } from './manage-users/manage-users-dialog/manage-users-dialog.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { ParkingBookingListComponent } from './parking-booking/parking-booking-list/parking-booking-list.component';



const routes: Routes = [
  {
    path:'add-client',
    component:AddClientComponent,
    loadChildren:()=>import('./add-client/add-client.module').then(x=>x.AddClientModule)
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    loadChildren:()=>import('./dashboard/dashboard.module').then(x=>x.DashboardModule)
  },
  {
    path:'digital-card',
    component:DigitalCardComponent,
    loadChildren:()=>import('./digital-card/digital-card.module').then(x=>x.DigitalCardModule)
  },
  {
    path:'report',
    component:ReportComponent,
    loadChildren:()=>import('./report/report.module').then(x=>x.ReportModule)
  },
  {
    path:'device-management',
    component:DeviceManagementComponent,
    loadChildren:()=>import('./device-management/device-management.module').then(x=>x.DeviceManagementModule)
  },
  {
    path:'bulk-upload',
    component:BulkUploadComponent,
    loadChildren:()=>import('./bulk-upload/bulk-upload.module').then(x=>x.BulkUploadModule)
  },

  { path: 'user-mapping-list', component:UserMappingListComponent},
  { path: 'user-mapping-dialog', component:UserMappingDialogComponent},
  { path: 'employee-rfid-list', component:EmployeeRfidListComponent},
  { path: 'employee-rfid-dialog', component:EmployeeRfidDialogComponent},
  { path: 'unit-rfid-list', component:UnitRfidListComponent},
  { path: 'unit-rfid-dialog', component:UnitRfidDialogComponent},
  { path: 'manage-users-list', component:ManageUsersListComponent},
  { path: 'manage-users-dialog', component:ManageUsersDialogComponent},
  { path: 'parking-booking-list', component: ParkingBookingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
