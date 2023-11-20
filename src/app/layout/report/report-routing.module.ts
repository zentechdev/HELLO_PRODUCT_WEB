import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitingCardScanDialogComponent } from './visiting-card/visiting-card-scan/visiting-card-scan-dialog/visiting-card-scan-dialog.component';
import { VisitingCardScanListComponent } from './visiting-card/visiting-card-scan/visiting-card-scan-list/visiting-card-scan-list.component';
import { VisitingCardShareDialogComponent } from './visiting-card/visiting-card-share/visiting-card-share-dialog/visiting-card-share-dialog.component';
import { VisitingCardShareListComponent } from './visiting-card/visiting-card-share/visiting-card-share-list/visiting-card-share-list.component';
import { AppDownloadListComponent } from './app-download/app-download-list/app-download-list.component';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { VisitorDetailsComponent } from './visitor/visitor-details/visitor-details.component';
import { VisitingCardExternalListComponent } from './visiting-card/visiting-card-external-share/visiting-card-external-list/visiting-card-external-list.component';
import { VisitorDetailsDialogComponent } from './visitor/visitor-details-dialog/visitor-details-dialog.component';
import { BrochureShareReportComponent } from './brochure-share-report/brochure-share-report/brochure-share-report.component';

const routes: Routes = [
  {path:'visiting-card-scan-dialog',component:VisitingCardScanDialogComponent},
  {path:'visiting-card-scan-list',component:VisitingCardScanListComponent},
  {path:'visiting-card-share-list',component:VisitingCardShareListComponent},
  {path:'visiting-card-external-list', component:VisitingCardExternalListComponent},
  {path:'visiting-card-share-dialog',component:VisitingCardShareDialogComponent},
  {path:'app-download',component:AppDownloadListComponent},
  {path:'booking-report', component:BookingReportComponent},
  {path:'visitor-details', component:VisitorDetailsComponent},
  {path:'visitor-details-dialog', component:VisitorDetailsDialogComponent},
  {path:'brochure-share-report', component:BrochureShareReportComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
