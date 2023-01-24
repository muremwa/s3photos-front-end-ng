import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { PhotosService } from "../services/photos.service";

@Injectable({
    providedIn: 'root'
})
export class UploadAvailableGuard implements CanActivate {
    constructor(private photoService: PhotosService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.photoService.uploadPostStatus().pipe(map((isAvailable) => {
            if (!isAvailable) {
                return this.router.parseUrl('error');
            }
            return true;
        }))
    }
}
