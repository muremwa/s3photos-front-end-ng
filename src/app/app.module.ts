import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbCollapseModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
