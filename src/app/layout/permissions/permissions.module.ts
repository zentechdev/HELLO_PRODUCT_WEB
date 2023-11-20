import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { VisitingCardAccessDialogComponent } from './components/visiting-card-access/visiting-card-access-dialog/visiting-card-access-dialog.component';
import { VisitingCardAccessListComponent } from './components/visiting-card-access/visiting-card-access-list/visiting-card-access-list.component';
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
import { MatTableExporterModule } from 'mat-table-exporter';
import { MeetingRoomAccessListComponent } from './components/meeting-room-access/meeting-room-access-list/meeting-room-access-list.component';
import { MeetingRoomAccessDialogComponent } from './components/meeting-room-access/meeting-room-access-dialog/meeting-room-access-dialog.component';



@NgModule({
  declarations: [
    PermissionsComponent,
    VisitingCardAccessDialogComponent,
    VisitingCardAccessListComponent,
    MeetingRoomAccessListComponent,
    MeetingRoomAccessDialogComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,

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
    MatTableExporterModule
  ]
})
export class PermissionsModule { }
