import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrochureVideoListComponent } from './brochure-video/brochure-video-list/brochure-video-list.component';
import { BrochureVideoComponent } from './brochure-video/brochure-video/brochure-video.component';
import { BrochureListComponent } from './brochure/brochure-list/brochure-list.component';
import { BrochureUploadComponent } from './brochure/brochure-upload/brochure-upload.component';


const routes: Routes = [
  {path:'brochure-upload',component:BrochureUploadComponent},
  {path:'brochure-list',component:BrochureListComponent},
  {path:'brochure-video-list',component:BrochureVideoListComponent},
  {path:'brochure-video',component:BrochureVideoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrochureRoutingModule { }
