import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalMessageDialogComponent } from './global-message-dialog/global-message-dialog.component';
import { GlobalMessageListComponent } from './global-message-list/global-message-list.component';

const routes: Routes = [
  {path:'global-message-dialog',component:GlobalMessageDialogComponent},
  {path:'global-message-list',component:GlobalMessageListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalMessageRoutingModule { }
