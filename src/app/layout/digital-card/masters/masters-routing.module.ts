import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionDialogComponent } from './action/action-dialog/action-dialog.component';
import { ActionListComponent } from './action/action-list/action-list.component';
import { BloodGroupListComponent } from './blood-group/blood-group-list/blood-group-list.component';
import { BloodGroupComponent } from './blood-group/blood-group/blood-group.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchComponent } from './branch/branch/branch.component';
import { BrouchureTypeListComponent } from './brochure-type/brouchure-type-list/brouchure-type-list.component';
import { BrouchureTypeComponent } from './brochure-type/brouchure-type/brouchure-type.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityComponent } from './city/city/city.component';
import { ColorCodeListComponent } from './color-code/color-code-list/color-code-list.component';
import { ColorCodeComponent } from './color-code/color-code/color-code.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentComponent } from './department/department/department.component';
import { DesignationListComponent } from './designation/designation-list/designation-list.component';
import { DesignationComponent } from './designation/designation/designation.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { GenderComponent } from './gender/gender/gender.component';
import { MenuDialogComponent } from './menu/menu-dialog/menu-dialog.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { RoleDialogComponent } from './role/role-dialog/role-dialog.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { StateComponent } from './state/state/state.component';
import { StatusListComponent } from './status/status-list/status-list.component';
import { StatusComponent } from './status/status/status.component';
import { UserListComponent } from './manage-user-list/user-list/user-list.component';
import { PlanListComponent } from './plan/plan-list/plan-list.component';
import { PlanDialogComponent } from './plan/plan-dialog/plan-dialog.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleDialogComponent } from './module/module-dialog/module-dialog.component';
import { WingListComponent } from './wing/wing-list/wing-list.component';
import { WingDialogComponent } from './wing/wing-dialog/wing-dialog.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { FloorDialogComponent } from './floor/floor-dialog/floor-dialog.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitNumberDialogComponent } from './unit-number/unit-number-dialog/unit-number-dialog.component';
import { UnitNumberListComponent } from './unit-number/unit-number-list/unit-number-list.component';
import { UnitDialogComponent } from './unit/unit-dialog/unit-dialog.component';
import { OrganizationTypeListComponent } from './organization-type/organization-type-list/organization-type-list.component';
import { OrganizationTypeDialogComponent } from './organization-type/organization-type-dialog/organization-type-dialog.component';
import { TechnologyTypeListComponent } from './technology-type/technology-type-list/technology-type-list.component';
import { TechnologyTypeDialogComponent } from './technology-type/technology-type-dialog/technology-type-dialog.component';
import { CountryComponent } from './country/country/country.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { RfidListComponent } from './rfid/rfid-list/rfid-list.component';
import { RfidDialogComponent } from './rfid/rfid-dialog/rfid-dialog.component';
import { ParkingNumberListComponent } from './parking-number/parking-number-list/parking-number-list.component';
import { ParkingNumberDialogComponent } from './parking-number/parking-number-dialog/parking-number-dialog.component';


const routes: Routes = [
  {path:'color-code',component:ColorCodeComponent},
  {path:'color-code-list',component:ColorCodeListComponent},
  {path:'state',component:StateComponent},
  {path:'state-list',component:StateListComponent},
  {path:'country',component:CountryComponent},
  {path:'country-list',component:CountryListComponent},
  {path:'city',component:CityComponent},
  {path:'city-list',component:CityListComponent},
  {path:'branch',component:BranchComponent},
  {path:'branch-list',component:BranchListComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'categories-list',component:CategoriesListComponent},
  {path:'brochure-type',component:BrouchureTypeComponent},
  {path:'brochure-type-list',component:BrouchureTypeListComponent},
  {path:'designation',component:DesignationComponent},
  {path:'designation-list',component:DesignationListComponent},
  {path:'department',component:DepartmentComponent},
  {path:'department-list',component:DepartmentListComponent},
  {path:'blood-group',component:BloodGroupComponent},
  {path:'blood-group-list',component:BloodGroupListComponent},
  {path:'gender',component:GenderComponent},
  {path:'gender-list',component:GenderListComponent},
  {path:'status',component:StatusComponent},
  {path:'status-list',component:StatusListComponent},
  {path:'action-list',component:ActionListComponent},
  {path:'action-dialog',component:ActionDialogComponent},
  {path:'role-list',component:RoleListComponent},
  {path:'role-dialog',component:RoleDialogComponent},
  {path:'menu-list',component:MenuListComponent},
  {path:'menu-dialog',component:MenuDialogComponent},
  {path:'user-list',component:UserListComponent},
  {path:'plan-list', component:PlanListComponent},
  {path:'plan-dialog', component:PlanDialogComponent},
  {path:'module-list', component:ModuleListComponent},
  {path:'module-dialog', component:ModuleDialogComponent},
  {path:'wing-list', component:WingListComponent},
  {path:'wing-dialog', component:WingDialogComponent},
  {path:'floor-list', component:FloorListComponent},
  {path:'floor-dialog', component:FloorDialogComponent},
  {path:'unit-number-list', component:UnitNumberListComponent},
  {path:'unit-number-dialog', component:UnitNumberDialogComponent},
  {path:'unit-list',component:UnitListComponent},
  {path:'unit-dialog', component:UnitDialogComponent},
  {path:'organization-type-list', component:OrganizationTypeListComponent},
  {path:'organization-type-dialog', component:OrganizationTypeDialogComponent},
  {path:'technology-type-list', component:TechnologyTypeListComponent},
  {path:'technology-type-dialog', component:TechnologyTypeDialogComponent},
  {path:'rfid-list',component:RfidListComponent},
  {path:'rfid-dialog',component:RfidDialogComponent},
  {path:'parking-number-list',component:ParkingNumberListComponent},
  {path:'parking-number-dialog',component:ParkingNumberDialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
