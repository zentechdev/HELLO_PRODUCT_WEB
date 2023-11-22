import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client.component';
import { InquiryOrganizationListComponent } from './inquiry-organization/inquiry-organization-list/inquiry-organization-list.component';
import { InquiryOrganizationDialogComponent } from './inquiry-organization/inquiry-organization-dialog/inquiry-organization-dialog.component';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';
import { OrganizationDialogComponent } from './organization/organization-dialog/organization-dialog.component';
import { PlanDetailsListComponent } from './plan-details/plan-details-list/plan-details-list.component';
import { PlanDetailsDialogComponent } from './plan-details/plan-details-dialog/plan-details-dialog.component';
import { SiteDetailsListComponent } from './site-details/site-details-list/site-details-list.component';
import { SiteDetailsDialogComponent } from './site-details/site-details-dialog/site-details-dialog.component';

const routes: Routes = [
  {path:'add-client', component:AddClientComponent},
  {path:'inquiry-organization-list', component:InquiryOrganizationListComponent},
  {path:'inquiry-organization-dialog', component:InquiryOrganizationDialogComponent},
  {path:'organization-list', component:OrganizationListComponent},
  {path:'organization-dialog', component:OrganizationDialogComponent},
  {path:'plan-details-list', component:PlanDetailsListComponent},
  {path:'plan-details-dialog', component:PlanDetailsDialogComponent},
  {path:'site-details-list', component:SiteDetailsListComponent},
  {path:'site-details-dialog', component:SiteDetailsDialogComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddClientRoutingModule { }
