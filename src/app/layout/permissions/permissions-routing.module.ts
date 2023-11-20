import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitingCardAccessDialogComponent } from './components/visiting-card-access/visiting-card-access-dialog/visiting-card-access-dialog.component';
import { VisitingCardAccessListComponent } from './components/visiting-card-access/visiting-card-access-list/visiting-card-access-list.component';
import { MeetingRoomAccessDialogComponent } from './components/meeting-room-access/meeting-room-access-dialog/meeting-room-access-dialog.component';
import { MeetingRoomAccessListComponent } from './components/meeting-room-access/meeting-room-access-list/meeting-room-access-list.component';


const routes: Routes = [
  {path:'visiting-card-access-dialog',component:VisitingCardAccessDialogComponent},
  {path:'visiting-card-access-list',component:VisitingCardAccessListComponent},
  {path:'meeting-room-access-dialog',component:MeetingRoomAccessDialogComponent},
  {path:'meeting-room-access-list',component:MeetingRoomAccessListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
