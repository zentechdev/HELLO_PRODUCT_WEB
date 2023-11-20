import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { SelectCheckAllComponent } from './component/select-check-all/select-check-all.component';
import { ViewImageDialogComponent } from './component/view-image/view-image-dialog/view-image-dialog.component';



@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SelectCheckAllComponent,
    ViewImageDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,

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
    MatCheckboxModule,
    MatExpansionModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SelectCheckAllComponent,
    ViewImageDialogComponent
  ],
})
export class SharedModule {}
