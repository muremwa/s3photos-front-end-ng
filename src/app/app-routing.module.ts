import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UploadComponent} from "./components/upload/upload.component";

const routes: Routes = [
    { path: '', component: HomeComponent, title: 'S3photos | all posts' },
    { path: 'upload', component: UploadComponent, title: 'S3photos | upload' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
