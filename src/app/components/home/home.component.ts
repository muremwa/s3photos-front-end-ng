import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { IPost } from "../../types/ipost";
import { PhotosService } from "../../utils/services/photos.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
    posts: Array<IPost> = [];
    postQuerySubscription: Subscription;
    postQuery: string;

    constructor(private currentRoute: ActivatedRoute, public photoService: PhotosService) {}

    ngOnInit(): void {
        // listen to change in params
        this.currentRoute.queryParams.subscribe((data) => {
            const postQueryParam = data['post-query'];

            // if the param is empty/undefined don't set it
            // unless there's a value on postQuery
            if (postQueryParam || (!postQueryParam && this.postQuery)) {
                this.photoService.postQuery.next(postQueryParam);
                this.fetchPosts();
            }
        });

        this.postQuerySubscription = this.photoService.postQuery.subscribe((value) => {
            this.postQuery = value;
        });

        this.fetchPosts();
    }

    ngOnDestroy() {
        this.postQuerySubscription.unsubscribe();
    }

    fetchPosts () {
        this.photoService.fetchPosts(this.postQuery).subscribe(({ success, posts }) => {
            if (success) {
                this.posts = posts
            }
        });
    }
}
