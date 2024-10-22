import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { ColorCodeListComponent } from './color-code/color-code-list/color-code-list.component';
import { ColorCodeComponent } from './color-code/color-code/color-code.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { StateComponent } from './state/state/state.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityComponent } from './city/city/city.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchComponent } from './branch/branch/branch.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { BrouchureTypeComponent } from './brochure-type/brouchure-type/brouchure-type.component';
import { BrouchureTypeListComponent } from './brochure-type/brouchure-type-list/brouchure-type-list.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { DesignationComponent } from './designation/designation/designation.component';
import { DepartmentComponent } from './department/department/department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { BloodGroupComponent } from './blood-group/blood-group/blood-group.component';
import { BloodGroupListComponent } from './blood-group/blood-group-list/blood-group-list.component';
import { GenderComponent } from './gender/gender/gender.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { StatusComponent } from './status/status/status.component';
import { StatusListComponent } from './status/status-list/status-list.component';
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
import {MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTreeModule } from "@angular/material/tree";
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDialogComponent } from './role/role-dialog/role-dialog.component';
import { ActionListComponent } from './action/action-list/action-list.component';
import { ActionDialogComponent } from './action/action-dialog/action-dialog.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuDialogComponent } from './menu/menu-dialog/menu-dialog.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { UserListComponent } from './manage-user-list/user-list/user-list.component';
import { PlanListComponent } from './plan/plan-list/plan-list.component';
import { PlanDialogComponent } from './plan/plan-dialog/plan-dialog.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleDialogComponent } from './module/module-dialog/module-dialog.component';
import { WingListComponent } from './wing/wing-list/wing-list.component';
import { WingDialogComponent } from './wing/wing-dialog/wing-dialog.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { FloorDialogComponent } from './floor/floor-dialog/floor-dialog.component';
import { UnitNumberListComponent } from './unit-number/unit-number-list/unit-number-list.component';
import { UnitNumberDialogComponent } from './unit-number/unit-number-dialog/unit-number-dialog.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitDialogComponent } from './unit/unit-dialog/unit-dialog.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { SiteDialogComponent } from './site/site-dialog/site-dialog.component';
import { OrganizationTypeListComponent } from './organization-type/organization-type-list/organization-type-list.component';
import { OrganizationTypeDialogComponent } from './organization-type/organization-type-dialog/organization-type-dialog.component';
import { TechnologyTypeListComponent } from './technology-type/technology-type-list/technology-type-list.component';
import { TechnologyTypeDialogComponent } from './technology-type/technology-type-dialog/technology-type-dialog.component';
import { CountryComponent } from './country/country/country.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { RfidListComponent } from './rfid/rfid-list/rfid-list.component';
import { RfidDialogComponent } from './rfid/rfid-dialog/rfid-dialog.component';
import { ParkingNumberDialogComponent } from './parking-number/parking-number-dialog/parking-number-dialog.component';
import { ParkingNumberListComponent } from './parking-number/parking-number-list/parking-number-list.component';
import { NotAllowNumberDirective } from './directive/not-allow-number.directive';
import { ParkingTypeListComponent } from './parking-Type/parking-type-list/parking-type-list.component';
import { ParkingTypeDialogComponent } from './parking-Type/parking-type-dialog/parking-type-dialog.component';
import { PermanentParkingBookingListComponent } from './permanent-parking/permanent-parking-booking-list/permanent-parking-booking-list.component';
import { PermanentParkingBookingDialogComponent } from './permanent-parking/permanent-parking-booking-dialog/permanent-parking-booking-dialog.component';
import { AssignParkingUnitComponent } from './assign-ParkingToUnit/assign-parking-unit/assign-parking-unit.component';
import { AssignParkingUnitDialogComponent } from './assign-ParkingToUnit/assign-parking-unit-dialog/assign-parking-unit-dialog.component';


@NgModule({
  declarations: [
    MastersComponent,
    ColorCodeListComponent,
    ColorCodeComponent,
    StateListComponent,
    StateComponent,
    CityListComponent,
    CityComponent,
    BranchListComponent,
    BranchComponent,
    CategoriesListComponent,
    CategoriesComponent,
    BrouchureTypeComponent,
    BrouchureTypeListComponent,
    DesignationListComponent,
    DesignationComponent,
    DepartmentComponent,
    DepartmentListComponent,
    BloodGroupComponent,
    BloodGroupListComponent,
    GenderComponent,
    GenderListComponent,
    StatusComponent,
    StatusListComponent,
    RoleListComponent,
    RoleDialogComponent,
    ActionListComponent,
    ActionDialogComponent,
    MenuListComponent,
    MenuDialogComponent,
    UserListComponent,
    PlanListComponent,
    PlanDialogComponent,
    ModuleListComponent,
    ModuleDialogComponent,
    WingListComponent,
    WingDialogComponent,
    FloorListComponent,
    FloorDialogComponent,
    UnitNumberListComponent,
    UnitNumberDialogComponent,
    UnitListComponent,
    UnitDialogComponent,
    SiteListComponent,
    SiteDialogComponent,
    OrganizationTypeListComponent,
    OrganizationTypeDialogComponent,
    TechnologyTypeListComponent,
    TechnologyTypeDialogComponent,
    CountryComponent,
    CountryListComponent,
    RfidListComponent,
    RfidDialogComponent,
    ParkingNumberDialogComponent,
    ParkingNumberListComponent,
    NotAllowNumberDirective,
    ParkingTypeListComponent,
    ParkingTypeDialogComponent,
    PermanentParkingBookingListComponent,
    PermanentParkingBookingDialogComponent,
    AssignParkingUnitComponent,
    AssignParkingUnitDialogComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
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
    MatTreeModule,
    MatExpansionModule,
    MatTableExporterModule
  ]
})
export class MastersModule { }
