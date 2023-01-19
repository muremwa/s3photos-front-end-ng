import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

import { PhotosService } from "../../utils/services/photos.service";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
    uploadForm = new FormGroup({
        file: new FormControl(null, { nonNullable: true }),
        caption: new FormControl('', { nonNullable: true }),
        yourName: new FormControl('', { nonNullable: true }),
    })

    constructor(private photoService: PhotosService, private router: Router) {}

    async submitPost(event_: SubmitEvent) {
        if (this.uploadForm.valid) {
            const formData = new FormData(event_.target as HTMLFormElement);

            this.photoService.uploadPost(formData).subscribe((response) => {
                if (response.success) {
                    this.router.navigate([''])
                }
            });
        }
    }

}
