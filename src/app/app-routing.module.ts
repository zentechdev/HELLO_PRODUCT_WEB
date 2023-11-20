import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.gaurd';
import { LoginComponent } from './auth/component/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedComponent } from './shared/shared.component';
import { InviteVisitorComponent } from './visitor-management/template/invite-visitor/invite-visitor.component';
import { TokenExpiredDialogComponent } from './token-expired-dialog/token-expired-dialog.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path:'auth',
    component:AuthComponent,
    loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)
  },
  {
    path:'shared',
    component:SharedComponent,canActivate: [AuthGuard],
    loadChildren:()=>import('./shared/shared.module').then(x=>x.SharedModule)
  },
  {
    path:'layout',
    component:LayoutComponent,canActivate: [AuthGuard],
    loadChildren:()=>import('./layout/layout.module').then(x=>x.LayoutModule)
  },
  {path:'invite-visitor',component:InviteVisitorComponent},
  {path: 'token-expired-dialog', component: TokenExpiredDialogComponent},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
