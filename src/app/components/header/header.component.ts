import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { PhotosService } from "../../utils/services/photos.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
    @ViewChild('topNav') navBar: ElementRef;
    postQuery: string;
    isMenuCollapsed = true;
    routeActiveOptions: IsActiveMatchOptions = {
        paths: 'exact',
        queryParams: 'subset',
        matrixParams: 'ignored',
        fragment: 'ignored'
    }

    constructor(public router: Router, public photoService: PhotosService) {}

    ngOnInit() {
        this.photoService.postQuery.subscribe((value) => {
            this.postQuery = value;
            this.navBar.nativeElement.scrollIntoView(); // navigate to top of page
        });
    }

    async queryPosts(submitEvent: Event) {
        const postQueryValue = (new FormData(submitEvent.target as HTMLFormElement)).get('post-query')?.toString();

        if (postQueryValue) {
            await this.router.navigate([''], {
                queryParams: { 'post-query': postQueryValue }
            });
        }
    }
}
