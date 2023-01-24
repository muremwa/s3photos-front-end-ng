import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { UploadComponent } from "./components/upload/upload.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { UploadAvailableGuard } from "./utils/guards/upload-available.guard";
import { ErrorComponent } from "./components/error/error.component";

const routes: Routes = [
    { path: '', component: HomeComponent, title: 'S3photos | all posts' },
    { path: 'upload', component: UploadComponent, title: 'S3photos | upload', canActivate: [UploadAvailableGuard] },
    { path: 'error', component: ErrorComponent, title: 'S3photos | Error' },
    { path: '**', component: NotFoundComponent, title: '404 Error' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
