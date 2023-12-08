import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DigitalCardComponent } from './digital-card/digital-card.component';
import { GlobalMessageComponent } from './global-message/global-message.component';
import { ReportComponent } from './report/report.component';
import { UserMappingDialogComponent } from './user-mapping/user-mapping-dialog/user-mapping-dialog.component';
import { UserMappingListComponent } from './user-mapping/user-mapping-list/user-mapping-list.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { MeetingBookingComponent } from './meeting-booking/meeting-booking.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { DeviceManagementComponent } from './device-management/device-management.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EmployeeRfidListComponent } from './rfid-details/rfid-employee-details/employee-rfid-list/employee-rfid-list.component';
import { EmployeeRfidDialogComponent } from './rfid-details/rfid-employee-details/employee-rfid-dialog/employee-rfid-dialog.component';
import { UnitRfidListComponent } from './rfid-details/rfid-unit-details/unit-rfid-list/unit-rfid-list.component';
import { UnitRfidDialogComponent } from './rfid-details/rfid-unit-details/unit-rfid-dialog/unit-rfid-dialog.component';
import { ManageUsersListComponent } from './manage-users/manage-users-list/manage-users-list.component';
import { ManageUsersDialogComponent } from './manage-users/manage-users-dialog/manage-users-dialog.component';




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
    path:'global-message',
    component:GlobalMessageComponent,
    loadChildren:()=>import('./global-message/global-message.module').then(x=>x.GlobalMessageModule)
  },
  {
    path:'seat-booking',
    component:SeatBookingComponent,
    loadChildren:()=>import('./seat-booking/seat-booking.module').then(x=>x.SeatBookingModule)
  },
  {
    path:'meeting-booking',
    component:MeetingBookingComponent,
    loadChildren:()=>import('./meeting-booking/meeting-booking.module').then(x=>x.MeetingBookingModule)
  },
  {
    path:'report',
    component:ReportComponent,
    loadChildren:()=>import('./report/report.module').then(x=>x.ReportModule)
  },
  {
    path:'permissions',
    component:PermissionsComponent,
    loadChildren:()=>import('./permissions/permissions.module').then(x=>x.PermissionsModule)
  },
  {
    path:'device-management',
    component:DeviceManagementComponent,
    loadChildren:()=>import('./device-management/device-management.module').then(x=>x.DeviceManagementModule)
  },

  {path:'user-mapping-list',component:UserMappingListComponent},
  {path:'user-mapping-dialog',component:UserMappingDialogComponent},
  {path:'employee-rfid-list',component:EmployeeRfidListComponent},
  {path:'employee-rfid-dialog',component:EmployeeRfidDialogComponent},
  {path:'unit-rfid-list',component:UnitRfidListComponent},
  {path:'unit-rfid-dialog',component:UnitRfidDialogComponent},
  {path:'manage-users-list',component:ManageUsersListComponent},
  {path:'manage-users-dialog',component:ManageUsersDialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
