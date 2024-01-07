import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import * as jsPDF from 'jspdf';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertifyService } from './service/alertify/alertify.service';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { TokeninterceptorService } from './service/token-interceptor/tokeninterceptor.service';
import { InviteVisitorComponent } from './visitor-management/template/invite-visitor/invite-visitor.component';
import { DatePipe } from '@angular/common';
import { MatTableExporterModule } from 'mat-table-exporter';
import { TokenExpiredDialogComponent } from './token-expired-dialog/token-expired-dialog.component';
import { NgSelect2Module } from 'ng-select2';
import { ApproveVisitorComponent } from './visitor-management/template/approve-visitor/approve-visitor.component';
import { QrCodePassComponent } from './visitor-management/template/qr-code-pass/qr-code-pass.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    InviteVisitorComponent,
    TokenExpiredDialogComponent,
    ApproveVisitorComponent,
    QrCodePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    LayoutModule,

    NgSelect2Module,
    FormsModule,
    BrowserAnimationsModule,
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
    NgbTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxQRCodeModule,
    MatTableExporterModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
  
  ],
  providers: [AlertifyService,{provide:HTTP_INTERCEPTORS,useClass:TokeninterceptorService,multi:true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
