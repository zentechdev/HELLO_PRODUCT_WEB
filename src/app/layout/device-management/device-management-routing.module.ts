import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceConfigurationListComponent } from './device-configuration/device-configuration-list/device-configuration-list.component';
import { DeviceConfigurationDialogComponent } from './device-configuration/device-configuration-dialog/device-configuration-dialog.component';
import { UserManagementListComponent } from './user-management/user-management-list/user-management-list.component';
import { UserManagementDialogComponent } from './user-management/user-management-dialog/user-management-dialog.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';

const routes: Routes = [

  {path:'device-configuration-list',component:DeviceConfigurationListComponent},
  {path:'device-configuration-dialog',component:DeviceConfigurationDialogComponent},
  {path:'user-management-list',component:UserManagementListComponent},
  {path:'user-management-dialog',component:UserManagementDialogComponent},
  {path:'attendance-list',component:AttendanceListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceManagementRoutingModule { }
