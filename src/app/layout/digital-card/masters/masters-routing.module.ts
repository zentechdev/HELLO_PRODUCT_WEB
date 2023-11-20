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

const routes: Routes = [
  {path:'color-code',component:ColorCodeComponent},
  {path:'color-code-list',component:ColorCodeListComponent},
  {path:'state',component:StateComponent},
  {path:'state-list',component:StateListComponent},
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
