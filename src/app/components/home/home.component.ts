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
        let globalSearch = true; // avoid double calls to the API

        this.postQuerySubscription = this.photoService.postQuery.subscribe((value) => {
            this.postQuery = value;
        });

        // listen to change in params
        this.currentRoute.queryParams.subscribe((data) => {
            const postQueryParam = data['post-query'];

            // if the param is empty/undefined don't set it
            // unless there's a value on postQuery
            if (postQueryParam || (!postQueryParam && this.postQuery)) {
                globalSearch = false;
                this.photoService.postQuery.next(postQueryParam);
                this.fetchPosts();
            }
        });

        if (globalSearch) {
            // fetch posts if there's no post-query
            this.fetchPosts();
        }
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

    reactToPost(likingUrl: string, postId: number) {
        const post = this.posts.find((post) => post.id === postId);

        if (post) {
            this.photoService.postReaction(likingUrl).subscribe(({ success, likes, liked }) => {
                if (success) {
                    post.likes = likes;
                    post.liked = liked
                }
            });
        }
    }
}
