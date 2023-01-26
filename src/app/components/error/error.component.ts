import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
    errorReason: string = 'Unexpected';

    constructor(private currentRoute: ActivatedRoute) {}

    ngOnInit() {
        this.currentRoute.queryParams.subscribe(({ error }) => {
            this.errorReason = error? error: 'Unexpected'
        });
    }
}
