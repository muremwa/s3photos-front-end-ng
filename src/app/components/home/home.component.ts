import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { IPost } from "../../types/ipost";
import { PhotosService } from "../../utils/services/photos.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    posts: Array<IPost> = [];
    postQuery: string;

    constructor(private currentRoute: ActivatedRoute, public photoService: PhotosService) {}

    ngOnInit(): void {
        // listen to change in params
        this.currentRoute.queryParams.subscribe((data) => {
            this.photoService.postQuery.next(data['post-query']);
            this.fetchPosts();
        });

        this.photoService.postQuery.subscribe((value) => {
            this.postQuery = value;
        })

        this.fetchPosts();
    }

    fetchPosts () {
        this.photoService.fetchPosts(this.postQuery).subscribe(({ success, posts }) => {
            if (success) {
                this.posts = posts
            } else {
                console.log("An error occurred")
            }
        });
    }
}
