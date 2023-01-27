import {TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UploadAvailableGuard } from './upload-available.guard';
import { PhotosService } from "../services/photos.service";


describe('UploadAvailableGuard', () => {
    let guard: UploadAvailableGuard;
    let photoSpy: jasmine.SpyObj<PhotosService>;
    let router: Router;

    beforeEach(() => {
        photoSpy = jasmine.createSpyObj('PhotoService', ['uploadPostStatus'])
        TestBed.configureTestingModule({
            providers: [
                { provide: PhotosService, useValue: photoSpy }
            ]
        });
        guard = TestBed.inject(UploadAvailableGuard);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should accept on true', (done) => {
        photoSpy.uploadPostStatus.and.returnValue(of(true));

        guard.canActivate().subscribe((response) => {
            expect(typeof response).toBe("boolean");
            expect(response).toBeTrue();
            done();
        });
    })

    it('should reroute on false', (done) => {
        photoSpy.uploadPostStatus.and.returnValue(of(false));

        guard.canActivate().subscribe((response) => {
            expect(typeof response).toBe("object");
            expect(response).toEqual(router.parseUrl('error'));
            done();
        });
    })
});
