import { Component, OnInit } from '@angular/core';

import { ProgressService } from "./utils/services/progress.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    requestProgress = 0;

    constructor(private progress: ProgressService) {}

    ngOnInit() {
        this.progress.progressIndicator.subscribe((value) => this.requestProgress = value);
    }
}
