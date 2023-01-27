import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgbCollapseModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ObjectEntriesPipe } from './utils/pipes/object-entries.pipe';
import { PreviewImageDirective } from './utils/directives/preview-image.directive';
import { ErrorComponent } from './components/error/error.component';
import { ProgressInterceptor } from "./utils/services/progress.interceptor";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        UploadComponent,
        NotFoundComponent,
        ObjectEntriesPipe,
        PreviewImageDirective,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbCollapseModule,
        NgbAlertModule,
        RouterModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({ cookieName: 'csrftoken', headerName: 'X-CSRFToken' }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
