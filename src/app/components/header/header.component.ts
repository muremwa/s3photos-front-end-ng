import { Component } from '@angular/core';
import {IsActiveMatchOptions, Router} from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
    isMenuCollapsed = true;
    routeActiveOptions: IsActiveMatchOptions = {
        paths: 'exact',
        queryParams: 'subset',
        matrixParams: 'ignored',
        fragment: 'ignored'
    }

    constructor(private router: Router) {}

    async queryPosts(submitEvent: Event) {
        const postQuery = (new FormData(submitEvent.target as HTMLFormElement)).get('post-query');

        if (postQuery) {
            await this.router.navigate([''], {
                queryParams: { 'post-query': postQuery }
            });
        }
    }
}
