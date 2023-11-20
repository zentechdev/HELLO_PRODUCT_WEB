import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrochureUploadComponent } from './brochure/brochure-upload/brochure-upload.component';
import { BrochureListComponent } from './brochure/brochure-list/brochure-list.component';

import { BrochureRoutingModule } from './brochure-routing.module';
import { BrochureComponent } from './brochure.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import { BrochureVideoListComponent } from './brochure-video/brochure-video-list/brochure-video-list.component';
import { BrochureVideoComponent } from './brochure-video/brochure-video/brochure-video.component';
import { BrochurePdfDialogComponent } from './brochure/brochure-upload/brochure-pdf-dialog/brochure-pdf-dialog.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    BrochureComponent,
    BrochureUploadComponent,
    BrochureListComponent,
    BrochureVideoListComponent,
    BrochureVideoComponent,
    BrochurePdfDialogComponent
  ],
  imports: [
    CommonModule,
    BrochureRoutingModule,

    FormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    MatTableExporterModule
  ]
})
export class BrochureModule { }
