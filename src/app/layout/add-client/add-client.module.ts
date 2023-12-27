import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddClientRoutingModule } from './add-client-routing.module';
import { AddClientComponent } from './add-client.component';
import { InquiryOrganizationListComponent } from './inquiry-organization/inquiry-organization-list/inquiry-organization-list.component';
import { InquiryOrganizationDialogComponent } from './inquiry-organization/inquiry-organization-dialog/inquiry-organization-dialog.component';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDialogComponent } from './organization/organization-dialog/organization-dialog.component';
import { PlanDetailsListComponent } from './plan-details/plan-details-list/plan-details-list.component';
import { PlanDetailsDialogComponent } from './plan-details/plan-details-dialog/plan-details-dialog.component';
import { SiteDetailsListComponent } from './site-details/site-details-list/site-details-list.component';
import { SiteDetailsDialogComponent } from './site-details/site-details-dialog/site-details-dialog.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AddClientComponent,
    InquiryOrganizationListComponent,
    InquiryOrganizationDialogComponent,
    OrganizationListComponent,
    OrganizationDialogComponent,
    PlanDetailsListComponent,
    PlanDetailsDialogComponent,
    SiteDetailsListComponent,
    SiteDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AddClientRoutingModule,

    MatPaginatorModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AddClientModule { }
