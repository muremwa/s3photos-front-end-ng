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

    constructor(private currentRoute: ActivatedRoute, public photoService: PhotosService) {}

    ngOnInit(): void {
        this.currentRoute.queryParams.subscribe((data) => {
            this.photoService.postQuery = data['post-query'];
        });
    }
}
