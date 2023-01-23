import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

import { PhotosService } from "../../utils/services/photos.service";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
    uploadForm = new FormGroup({
        file: new FormControl(null, { nonNullable: true }),
        caption: new FormControl('', { nonNullable: true }),
        yourName: new FormControl('', { nonNullable: true }),
    })

    constructor(private photoService: PhotosService, private router: Router, private currentRoute: ActivatedRoute) {}

    ngOnInit() {
        this.currentRoute.queryParams.subscribe(({ as: asParam }) => {
            if (asParam) {
                this.uploadForm.controls.yourName.setValue(asParam);
            }
        })
    }

    submitPost(event_: SubmitEvent) {
        if (this.uploadForm.valid) {
            const formData = new FormData(event_.target as HTMLFormElement);

            this.photoService.uploadPost(formData).subscribe(async (response) => {
                if (response.success) {
                    await this.router.navigate(['']);
                }
            });
        }
    }
}
