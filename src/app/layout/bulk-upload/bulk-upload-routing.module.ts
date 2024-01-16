import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeBulkUploadComponent } from './component/employee-bulk-upload/employee-bulk-upload.component';

const routes: Routes = [
  {path:'employee-bulk-upload',component:EmployeeBulkUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkUploadRoutingModule { }
