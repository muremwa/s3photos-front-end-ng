import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        UploadComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgbCollapseModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
