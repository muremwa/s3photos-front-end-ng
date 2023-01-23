import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UploadComponent } from './upload.component';
import { PhotosService } from "../../utils/services/photos.service";
import {IUploadErrors} from "../../types/iupload-errors";


describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;
    let photoSpy: jasmine.SpyObj<PhotosService>;
    let router: Router;

    beforeEach(async () => {
        photoSpy = jasmine.createSpyObj('PhotoService', ['uploadPost']);
        await TestBed.configureTestingModule({
            declarations: [UploadComponent],
            providers: [
                { provide: PhotosService, useValue: photoSpy }
            ],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(UploadComponent);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        router.navigate([], {
            queryParams: { 'as': 'SAMPLE_AS_NAME'}
        });
        expect(component).toBeTruthy();
    });

    it('should upload', (done) => {
        const post = {
            id: 1,
            likingUrl: "/photos/like-actions/1/",
            cleanTime: "January 11, 2023, 09:30 AM",
            uploadedBy: "Griffin X",
            imageFile: "/media/photos/IMG_20180628_122515_2.jpg",
            caption: "Double",
            likes: 0,
            time: "2023-01-11T12:30:38.772560+03:00",
            liked: true
        }
        photoSpy.uploadPost.and.returnValue(of({ success: true, post, errors: {} as IUploadErrors }));
        const subEvent = new SubmitEvent('submit');
        Object.defineProperty(subEvent, 'target', { writable: false, value: document.createElement('form')});
        component.submitPost(subEvent)
        expect(component).toBeTruthy();
        done();
    })
});
