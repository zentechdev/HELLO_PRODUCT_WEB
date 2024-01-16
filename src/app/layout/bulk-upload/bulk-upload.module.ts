import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkUploadRoutingModule } from './bulk-upload-routing.module';
import { BulkUploadComponent } from './bulk-upload.component';
import { EmployeeBulkUploadComponent } from './component/employee-bulk-upload/employee-bulk-upload.component';


@NgModule({
  declarations: [
    BulkUploadComponent,
    EmployeeBulkUploadComponent
  ],
  imports: [
    CommonModule,
    BulkUploadRoutingModule
  ]
})
export class BulkUploadModule { }
